var db = require('./db');
var Pagination = require('./pagination');
var limit = 10;
var qna = {
    filter: function(options) {
        return new Promise(function(resolve, reject) {
            var orderByChild = '-create_at';
            // switch(options.sort) {
            //     case 'oldest':
            //         orderByChild = 'create_at';
            //         break;
            //     case 'vote':
            //         orderByChild = '-vote';
            //         break;
            //     case 'down-vote':
            //         orderByChild = '-down_vote';
            //         break;
            //     case 'reply':
            //         orderByChild = '-reply_count';
            //         break;
            //     default:
            //         orderByChild = '-create_at';
            // }
            // if(typeof options.from !== 'undefined'){
            //     console.log(options.from);
            //     console.log(options.from);
            // }
            var query = db.ref('qna')
            .orderByChild(orderByChild)
            .startAt(options.from)
            .limitToFirst(limit)
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
                    return resolve(db.ref().update(contentData));
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
    update: function(key, uid, data) {
        return new Promise(function(resolve, reject) {
            db.ref('qna')
            .orderByChild('_key')
            .equalTo(key)
            .once('value').then(function(snapshot){
                    if(snapshot.exists()){
                        var lists = snapshot.val();
                        var item = lists[key];
                        if(item.uid == uid){
                            var postData = item;
                            Object.keys(data).forEach(function(key) {
                                if(key !== 'content'){
                                    item[key] = data[key];
                                }
                            });
                            var updates = {};
                            updates['qna/' + key] = postData;
                            if(typeof data.content !== 'undefined') {
                                updates['qna_content/' + key] = data.content;
                            }
                            db.ref().update(updates).then(function(){
                                return resolve(data);
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
    }
}
module.exports = qna;