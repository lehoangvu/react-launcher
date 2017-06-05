var User = require('./user');
var shortid = require('shortid');
var Helper = require('./../Helper');

var mongo = require('./../db/mongo');
var collectionName = 'qna';
var limit = 20;
var qna = {
    search: (query) => {
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
            case 'oldest':
                sortOps = {
                    create_at: 1,
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
        var type = typeof query.type !== 'undefined' ? query.type : 'question'; 
        var question_id = typeof query.question_id !== 'undefined' ? query.question_id : false; 
        return new Promise(function(resolve, reject) {
            mongo.search(collectionName, q, sortOps, skip, limit, type, question_id).then(function(results) {
                var userPromises = [];
                results.data.forEach(function(item) {
                    var pr = User.get(item.uid, ['fullname', 'nickname', 'image']);
                    userPromises.push(pr);
                });
                Promise.all(userPromises).then(function(users){

                    results.data.forEach(function(item, index) {
                        results.data[index]['user'] = users[index];
                    });
                    return resolve(results);
                }).catch(function(err) {
                    return reject({
                        err: err,
                        error: 'Something when wrong'
                    })
                });
            }).catch(function(err) {
                return reject({
                    error: ' Something when wrong'
                })
            });
        });
    },
    getVote: (_id, token) => {
        return new Promise((resolve, reject) => {
            if(token === null) {
                return resolve(false);
            }
            user.getByToken(token, ['_id']).then(function(user) {
                mongo.findOne('user_react_question', {
                    uid: user._id,
                    action: 'vote',
                    question_id: mongo.toObjectId(_id)
                }).then((result)=>{
                    return resolve(result);
                }).catch((err)=>{
                    return reject(err);
                })
            });
        });
    },
    get: (id) => {
        return new Promise((resolve, reject) => {
            mongo.findOne(collectionName, {id: id}).then((result)=>{
                if(!result) {
                    return reject({
                        error: 'Something went wrong!'
                    })
                }
                var question = result;
                return resolve(question);
            }).catch((err)=>{
                return reject({
                    error: 'Something went wrong!'
                })
            });
        });
    },
    _get: (_id) => {
        return new Promise((resolve, reject) => {
            mongo.findOne(collectionName, {_id: mongo.toObjectId(_id)}).then((result)=>{
                if(!result) {
                    return reject({
                        error: 'Something went wrong!'
                    })
                }
                var question = result;
                return resolve(question);
            }).catch((err)=>{
                return reject({
                    error: 'Something went wrong!'
                })
            });
        });
    },
    add: (data) => {
        return new Promise((resolve, reject) => {
            data.create_at = new Date().getTime();
            data.update_at = new Date().getTime();
            data.view = 0;
            data.vote = 0;
            data.down_vote = 0;
            data.reply = 0;
            data.id = shortid.generate();
            // check id
            mongo.findOne(collectionName, {id: data.id}).then((result) => {
                if(!result) {
                    mongo.addDocument('qna', data).then((snapshot) => {
                        if(snapshot.insertedIds.length === 1)
                            return resolve(data);
                        else
                            return reject({
                                error: 'Something whent wrong'
                            });
                    }).catch(() => {
                        return reject({
                            error: 'Something whent wrong'
                        });
                    });
                } else {
                    return reject({
                        error: 'Something whent wrong'
                    });
                }
            }).catch((err) => {
                return reject({
                    error: 'Something whent wrong'
                });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            data.update_at = new Date().getTime();
            // check id
            mongo.findOne(collectionName, {id: data.id}).then((result) => {
                if(result && result.uid.toString() === data.uid.toString()) {
                    mongo.updateDocument('qna', {$set: data}, result._id).then((snapshot) => {
                        return resolve({
                            title: data.title,
                            content: data.content,
                            tags: data.tags
                        });
                    }).catch((err) => {
                        return reject({
                            error: 'Something whent wrong'
                        });
                    });
                } else {
                    return reject({
                        error: 'Something whent wrong'
                    });
                }
            }).catch((err) => {
                return reject({
                    error: 'Something whent wrong'
                });
            });
        });
    },
    vote: (question_id, vote) => {
        
    }
}
module.exports = qna;