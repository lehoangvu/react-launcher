var Helper = require('./../Helper');
var mongo = require('./../db/mongo');
var user = require('./user');
var collectionName = 'qna';
var limit = 20;
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
                var userPromises = [];
                results.data.forEach(function(item) {
                    var pr = user.get(new mongo._.ObjectID(item.uid), ['email', 'fullname']);
                    userPromises.push(pr);
                });
                Promise.all(userPromises).then(function(users){
                    results.data.forEach(function(item, index) {
                        results.data[index]['user'] = users[index];
                    });
                    console.log(results);
                    return resolve(results);
                }).catch(function(err) {
                    console.log(err);

                });
            }).catch(function(err) {
                console.log(err);
                return reject({
                    error: '1Something when wrong'
                })
            });
        });
    },
    add: function(data) {
        var postData = {
            'title': data.title,
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