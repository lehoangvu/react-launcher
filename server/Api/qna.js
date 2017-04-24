var db = require('./db');
var Pagination = require('./pagination');
var limit = 5;
var qna = {
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
            '-create_at': - data.create_at,
            'update_at': data.create_at,
            '-update_at': - data.create_at,
            'view': 0,
            '-view': 0,
            'vote': 0,
            '-vote': 0,
            'down_vote': 0,
            '-down_vote': 0,
            'reply_count': 0,
            '-reply_count': 0,
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
                        qna.indexByField(key, 'create_at', data.create_at, 'desc').then(function(){
                            qna.indexByField(key, 'create_at', data.create_at, 'asc').then(function(){
                                return resolve({key: key});
                            }).catch(function(error){
                                return reject(error);
                            });
                            
                        }).catch(function(error){
                            return resolve(error);
                        });

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
    addVote: function() {

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
            console.log(sort, updates);
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