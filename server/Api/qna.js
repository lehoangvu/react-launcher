var Helper = require('./../Helper');
var db = require('./db');
var algolia = require('./algolia');

var indexInstance; 
var searchIndex = require('./search-index');
// searchIndex.flush({
//     indexPath: 'qna'
// });
// ({
//     indexPath: 'qna',
//     logLevel: 'error'
// }).then(function(instance) {
//     console.log('Create search instance success!');
//     indexInstance = instance;
// }, function(err) {
//     console.log('Cannot create search instance!');
//     console.log(err);
// });

var EventEmitter = require('events');
var indexEmiter = new EventEmitter();

var qna = {
    listeningToIndexLocal: function() {

        
        

        // Create instance
        searchIndex.getInstance({
            indexPath: 'qna'
        }).then(function(instance) {
            indexInstance = instance;
            indexEmiter.on('triggerIndex', function (data) {
                instance.concurrentAdd({}, [data], function(err) {
                    if (err) {
                        console.log('Cannot index', error);
                    } else {
                        console.log('Index success', data.key);
                        instance.countDocs(function (err, count) {
                          console.log('this index contains ' + count + ' documents')
                        })
                    }
                });
            });
        }).catch(function(error) {
            console.log('Cannot create instance', error);
        })
    },
    listeningToIndexAlgolia: function() {
        var index = algolia.initIndex('qna');
        var qnaRef = db.ref("/qna");

        qnaRef.on('child_added', addOrUpdateIndexRecord);
        qnaRef.on('child_changed', addOrUpdateIndexRecord);
        qnaRef.on('child_removed', deleteIndexRecord);

        function addOrUpdateIndexRecord(snapshot) {
            console.log('child add trigger');
            return;
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
            // console.log('Firebase object indexed in Algolia', firebaseObject.objectID);
          });
        }
        function deleteIndexRecord(snapshot) {
            console.log('child remove trigger');
            return;
          // Get Algolia's objectID from the Firebase object key
          var objectID = snapshot.key;
          // Remove the object from Algolia
          index.deleteObject(objectID, function(err, content) {
            if (err) {
              throw err;
            }
            // console.log('Firebase object deleted from Algolia', objectID);
          });
        }

    },
    deleteIndex(snapshot) {
      // Get Algolia's objectID from the Firebase object key
      var objectID = snapshot.key;
      // Remove the object from Algolia
      index.deleteObject(objectID, function(err, content) {
        if (err) {
          throw err;
        }
        // console.log('Firebase object deleted from Algolia', objectID);
      });
    },
    index: function(object) {
        // Create instance
        searchIndex.getInstance({
            indexPath: 'qna'
        }).then(function(instance) {
            instance.concurrentAdd({}, [object], function(err) {
                if (err) {
                    console.log('Cannot index', error);
                } else 
                    console.log('Index success', object.key);
            });
        }).catch(function(error) {
            console.log('Cannot create instance', error);
        })
    },
    browser: function(sorts, cursor) {
        var index = algolia.initIndex('qna');
        index.clearCache();

        var searchSetting = {
            'customRanking': [],
            'hitsPerPage': 2,

        };

        Object.keys(sorts).forEach(function(field){
            var orderBy = sorts[field];
            if(orderBy === 'desc')
                searchSetting.customRanking.push('desc('+field+')');
            else
                searchSetting.customRanking.push('asc('+field+')');
                
        });

        if(searchSetting.customRanking.length === 0){
            searchSetting.customRanking.push('desc(create_at)');
        }

        index.setSettings(searchSetting);

        return new Promise(function(resolve, reject) {
            var browser;
            if(cursor) 
                browser = index.browseFrom(cursor, onResult);
            else{
                browser = index.browse({
                              query: '',
                              hitsPerPage: 2
                            }, onResult);
            }

            function onResult(err, content) {
                if (err) {
                    return reject({
                        error: 'Algolia search error'
                    });
                }
                return resolve({
                    data: content.hits,
                    cursor: content.cursor || undefined,
                    total: content.nbHits,
                    pages: content.nbPages,
                    current_page: content.page,
                    limit: content.hitsPerPage
                });
            }
        });
    },
    search: function(q, sorts, page) {
        return new Promise(function(resolve, reject) {
            console.log(1);
            indexInstance.search({
              query: [{
                AND: {
                  'title': [q]   // search for "search" and "words" in all ("*") fields
                }
              }],
              // offset: ((page - 1) * limit ),
              // pageSize: limit
            }).on('data', function(data) {
                return resolve(data);
            })
        });

        return;
        var index = algolia.initIndex('qna');

        var searchSetting = {
            'customRanking': [],
            'hitsPerPage': 2,

        };

        Object.keys(sorts).forEach(function(field){
            var orderBy = sorts[field];
            if(orderBy === 'desc')
                searchSetting.customRanking.push('desc('+field+')');
            else
                searchSetting.customRanking.push('asc('+field+')');
                
        })
        index.setSettings(searchSetting);
        return new Promise(function(resolve, reject) {
            // var browser = index.browseAll();
            // browser.on('result', function onResult(content) {
            //     return resolve(content.hits);
            // });
            
            index.search(q, function(err, content) {
                if (err) {
                    return reject({
                        error: 'Algolia search error'
                    });
                }
                return resolve({
                    data: content.hits,
                    total: content.nbHits,
                    pages: content.nbPages,
                    current_page: content.page,
                    limit: content.hitsPerPage
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
                        postData.key = snapshot.key;
                        indexEmiter.emit('triggerIndex', postData);
                        return resolve({key: key});
                    }, function(){
                        return reject({
                            error: 'Cannot update content back'
                        });
                    });
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
qna.listeningToIndexLocal();
module.exports = qna;