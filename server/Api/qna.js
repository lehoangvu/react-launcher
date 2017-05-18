var shortid = require('shortid');
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
                    var pr = user.get(new mongo._.ObjectID(item.uid), ['fullname', 'nickname']);
                    userPromises.push(pr);
                });
                Promise.all(userPromises).then(function(users){
                    results.data.forEach(function(item, index) {
                        results.data[index]['user'] = users[index];
                    });
                    return resolve(results);
                }).catch(function(err) {
                    return reject({
                        error: 'Something when wrong'
                    })
                });
            }).catch(function(err) {
                return reject({
                    error: 'Something when wrong'
                })
            });
        });
    },
    get: function(id) {
        return new Promise(function(resolve, reject) {
            mongo.findOne(collectionName, {_id:id}).then((result)=>{
                if(!result) {
                    return reject({
                        error: 'Something went wrong!'
                    })
                }
                var pr = user.get(new mongo._.ObjectID(result.uid), ['fullname', 'nickname', 'image']);
                pr.then((user)=>{
                    result.user = user;
                    return resolve(result);
                });
            }).catch((err)=>{
                return reject({
                    error: 'Something went wrong!'
                })
            });
        });
    },
    add: function(data) {
        return new Promise(function(resolve, reject) {
            data.create_at = new Date().getTime();
            data.update_at = new Date().getTime();
            data.view = 0;
            data.vote = 0;
            data.down_vote = 0;
            data.reply = 0;
            data._id = shortid.generate();
            // check id
            mongo.findOne(collectionName, {_id: data._id}).then(function(result) {
                if(!result) {
                    mongo.addDocument('qna', data).then(function(snapshot) {
                        if(snapshot.insertedIds.length === 1)
                            return resolve(data);
                        else
                            return reject({
                                error: '1Something whent wrong'
                            });
                    }).catch(function() {
                        return reject({
                            error: '2Something whent wrong'
                        });
                    });
                } else {
                    return reject({
                        error: '3Something whent wrong'
                    });
                }
            }).catch(function(err) {
                return reject({
                    error: '4Something whent wrong'
                });
            });
        });
    },
}

module.exports = qna;