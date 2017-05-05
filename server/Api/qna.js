var Helper = require('./../Helper');
var mongo = require('./../db/mongo');
var collectionName = 'qna';
var limit = 3;
var qna = {
    search: function(query) {
        var q = typeof query.q !== 'undefined' ? query.q.trim() : '';
        var sortString = typeof query.sort !== 'undefined' ? query.sort : 'newest';
        var sortOps;
        switch(sortString) {
            case 'useful':
                sortOps = {
                    vote: -1,
                    reply: -1,
                    create_at: -1
                };
                break;
            case 'feedback':
                sortOps = {
                    reply: -1,
                    vote: -1
                };
                break;
            case 'newest':
                sortOps = {
                    create_at: -1,
                    vote: -1
                };
                break;
            default:
                sortOps = {
                    create_at: -1,
                    vote: -1
                };
            
        }
        var page = typeof query.page !== 'undefined' ? query.page : 1; 
        var skip = (page - 1) * limit;
        var searchData;
        return new Promise(function(resolve, reject) {
            mongo.search(collectionName, q, sortOps, skip, limit).then(function(results) {
                return resolve(results);
            }).catch(function(err) {
                return reject({
                    error: 'Something when wrong'
                })
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
            'reply': Helper.random(0, 20),
            'uid': data.uid
        };
        return new Promise(function(resolve, reject) {
            mongo.addDocument('qna', postData).then(function(snapshot) {
                postData._id = snapshot.insertedIds;
                return resolve(postData);
            }).catch(function() {
                return reject({
                    error: 'Something whent wrong'
                });
            });
        });  
    },
}

module.exports = qna;