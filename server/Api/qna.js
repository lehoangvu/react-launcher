var Helper = require('./../Helper');
var db = require('./db');
var algolia = require('./algolia');

var limit = 10;
var qna = {
    listeningToIndexAlgolia: function() {
        var index = algolia.initIndex('qna');
        var qnaRef = db.ref("/qna");

        qnaRef.on('child_added', addOrUpdateIndexRecord);
        qnaRef.on('child_changed', addOrUpdateIndexRecord);
        qnaRef.on('child_removed', deleteIndexRecord);

        function addOrUpdateIndexRecord(snapshot) {
          // Get Firebase object
          var firebaseObject = {
            objectID: snapshot.key,
            title: snapshot.val().title,
            create_at: snapshot.val().create_at,
            vote: snapshot.val().vote,
            down_vote: snapshot.val().down_vote,
            uid: snapshot.val().uid
          };
          // Add or update object
          index.saveObject(firebaseObject, function(err, content) {
            if (err) {
              throw err;
            }
            console.log('Firebase object indexed in Algolia', firebaseObject.objectID);
          });
        }
        function deleteIndexRecord(snapshot) {
          // Get Algolia's objectID from the Firebase object key
          var objectID = snapshot.key;
          // Remove the object from Algolia
          index.deleteObject(objectID, function(err, content) {
            if (err) {
              throw err;
            }
            console.log('Firebase object deleted from Algolia', objectID);
          });
        }

    },
    search: function(q, sorts) {
        var index = algolia.initIndex('qna');

        var searchSetting = {
            'customRanking': []
        };

        Object.keys(sorts).forEach(function(field){
            var orderBy = sorts[field];
            if(orderBy === 'desc')
                searchSetting.customRanking.push('desc('+field+')');
            else
                searchSetting.customRanking.push('asc('+field+')');
                
        })
        console.log(searchSetting);
        index.setSettings(searchSetting);
        
        return new Promise(function(resolve, reject) {
                // .setSettings({"attributesForFaceting":["searchable(brand)", "price_range", "categories", "type", "price", "free_shipping", "rating", "popularity", "hierachicalCategories"]});
            index.search(q, function(err, content) {
                if (err) {
                    return reject({
                        error: 'Algolia search error'
                    });
                }
                return resolve(content.hits);
            });
        });
    },
    filter: function(options) {
        return new Promise(function(resolve, reject) {
            var sort_table = 'qna_field_create_at_desc';
            var last_key = false;
            switch(options.sort) {
                case 'oldest':
                    sort_table = 'qna_field_create_at';
                    break;
                case 'vote':
                    sort_table = '-vote';
                    break;
                case 'down-vote':
                    sort_table = '-down_vote';
                    break;
                case 'reply':
                    sort_table = '-reply_count';
                    break;
                default:
                    sort_table = 'qna_field_create_at_desc';
            }
            if(typeof options.from !== 'undefined'){
                last_key = options.from;
            }

            var query = db.ref(sort_table).orderByKey();
            if(last_key !== false){
                query = query.startAt(null, last_key);
            }
            query.limitToFirst(limit)
            .once('value').then(function(snapshot) {
                var dataOrdered = []
                snapshot.forEach(function(child) {
                    dataOrdered.push({data: child.val(), key: child.key});
                });
                return resolve(dataOrdered);
            }, function() {
                return reject({
                    error: 'Something whent wrong'
                });
            });
        });
    },
    add: function(data) {
        var postData = {
            'title': data.title,
            'create_at': data.create_at,
            'update_at': data.create_at,
            'view': Helper.random(0, 300),
            'vote': Helper.random(1, 125),
            'down_vote': Helper.random(1, 125),
            'reply_count': Helper.random(0, 20),
            'uid': data.uid
        };
        return new Promise(function(resolve, reject) {
            db.ref('qna').push(postData).then(function(snapshot) {
                // back update key
                var key = snapshot.key;
                postData['_key'] = key;
                var updates = {};
                updates['qna/' + key] = postData;
                db.ref().update(updates).then(function(){
                    // save content to qna_content
                    var contentData = {};
                    contentData['qna_content/' + key] = data.content;
                    db.ref().update(contentData).then(function(){
                        return resolve({key: key});
                    }, function(){
                        return reject({
                            error: 'Cannot update content back'
                        });
                    })
                    return resolve();
                }, function(){
                    return reject({
                        error: 'Something whent wrong'
                    });
                })
            }, function() {
                return reject({
                    error: 'Something whent wrong'
                });
            });
        });  
    },
    first: function() {

    },
    updateTitle: function(key, uid, title) {
        return new Promise(function(resolve, reject) {
            db.ref('qna')
            .orderByChild('_key')
            .equalTo(key)
            .limitToFirst(1)
            .once('value').then(function(snapshot){
                    if(snapshot.exists()){
                        var lists = snapshot.val();
                        var item = lists[key];
                        if(item.uid == uid){
                            var postData = item;
                            var updates = {};
                            var currentTimestame = new Date().getTime();
                            var oldUpdateAt = item.update_at;
                            updates['qna/' + key + '/title'] = title;
                            updates['qna/' + key + '/update_at'] = currentTimestame;
                            db.ref().update(updates).then(function(){
                                qna.indexByField(key, 'update_at', oldUpdateAt, currentTimestame, 'desc').then(function(){
                                    qna.indexByField(key, 'update_at', oldUpdateAt, currentTimestame, 'asc').then(function(){
                                        return resolve({key: key});
                                    }).catch(function(error){
                                        return reject(error);
                                    });
                                    
                                }).catch(function(error){
                                    return resolve(error);
                                });
                            }, function(){
                                return reject({
                                    error: 'Something whent wrong'
                                });
                            });
                        }else{
                            return reject({
                                error: 'Something whent wrong'
                            });
                        }
                    } else {
                        return reject({
                            error: 'Something whent wrong'
                        });
                    }
                    
                }, function(){
                    return reject({
                        error: 'Something whent wrong'
                    });
                })
            });
    },
    updateContent: function(key, uid, content) {
        return new Promise(function(resolve, reject) {
            db.ref('qna')
            .orderByChild('_key')
            .equalTo(key)
            .limitToFirst(1)
            .once('value').then(function(snapshot){
                    if(snapshot.exists()){
                        var lists = snapshot.val();
                        var item = lists[key];
                        if(item.uid == uid){
                            var postData = item;
                            var updates = {};
                            var currentTimestame = new Date().getTime();
                            var oldUpdateAt = item.update_at;
                            updates['qna_content/' + key] = content;
                            updates['qna/' + key + '/update_at'] = currentTimestame;
                            db.ref().update(updates).then(function(){
                                qna.indexByField(key, 'update_at', oldUpdateAt, currentTimestame, 'desc').then(function(){
                                    qna.indexByField(key, 'update_at', oldUpdateAt, currentTimestame, 'asc').then(function(){
                                        return resolve({key: key});
                                    }).catch(function(error){
                                        return reject(error);
                                    });
                                    
                                }).catch(function(error){
                                    return resolve(error);
                                });
                            }, function(){
                                return reject({
                                    error: 'Something whent wrong'
                                });
                            });
                        }else{
                            return reject({
                                error: 'Something whent wrong'
                            });
                        }
                    } else {
                        return reject({
                            error: 'Something whent wrong'
                        });
                    }
                    
                }, function(){
                    return reject({
                        error: 'Something whent wrong'
                    });
                })
            });
    },
    updateVote: function(action) {

    },
    updateDownVote: function(action) {

    },
    delete: function(key, uid) {
        return new Promise(function(resolve, reject) {
            db.ref('qna')
            .orderByChild('_key')
            .equalTo(key)
            .once('value').then(function(snapshot){
                    if(snapshot.exists()){
                        var lists = snapshot.val();
                        var item = lists[key];
                        if(item.uid == uid){
                            var updates = {};
                            updates['qna/' + key] = null;
                            updates['qna_content/' + key] = null;
                            db.ref().update(updates).then(function(){
                                return resolve({});
                            }, function(){
                                return reject({
                                    error: 'Something whent wrong'
                                });
                            });
                        }else{
                            return reject({
                                error: 'Something whent wrong'
                            });
                        }
                    } else {
                        return reject({
                            error: 'Something whent wrong'
                        });
                    }
                    
                }, function(){
                    return reject({
                        error: 'Something whent wrong'
                    });
                })
            });
    },
    indexByField: function(key, field, odlValue, value, sort) {
        return new Promise(function(resolve, reject) {
            var updates = {};
            var brand = 'qna_field_' + field;
            var path;
            if(sort === 'desc') {
                brand += '_desc';
                path = (9007199254740991 - value) + '-' + key;
            } else {
                path = value + '-' + key;
            }
            updates[path] = key;
            
            // remove old record
            if(odlValue !== null) {
                var oldPath;
                if(sort === 'desc') {
                    oldPath = (9007199254740991 - odlValue) + '-' + key;
                } else {
                    oldPath = odlValue + '-' + key;
                }
                updates[oldPath] = null;
            }
            db.ref(brand).update(updates).then(function(){
                return resolve({});
            }, function(){
                return reject({
                    error: 'Cannot index ' + field
                });
            });
        });
    }
}
module.exports = qna;