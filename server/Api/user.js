var mongo = require('./../db/mongo');
// var qna = require('./qna');
// var db = firebase.database();
var Raven = require('./raven');
var User = {
	get: (_id, fields) => {
		return new Promise(function(resolve, reject) {
			mongo.findOne('user', {_id: mongo.toObjectId(_id)}).then(function(result) {
				if(!result)
					return resolve(false);
				var data = {};
				fields.forEach(function(field) {
					data[field] = result[field];
				});
				return resolve(data);
			}).catch(function(err) {
				return reject(err);
			})
		});
	},
    getByToken: (token, fields) => {
        return new Promise(function(resolve, reject) {
            mongo.findOne('user_token', {value: token})
            .then(function(result) {
                if(!result) {
                    return reject({
                        error: 'Token invalid!'
                    });
                }
                mongo.findOne('user', {_id: result.uid}).then(function(result) {
                    if(!result) {
                        return reject({
                            error: 'Token invalid!'
                        });
                    }
                    var userData = {};
                    fields.forEach(function(field) {
                        userData[field] = result[field];
                    });
                    return resolve(userData);
                }).catch(function(err) {
                    return reject({
                        error: 'Cannot find user!'
                    });
                });
            })
            .catch(function(err) {
                return reject({
                    error: 'Something went wrong!'
                });
            });
        });
    },
    getByNickname: (nickname) => {
        return new Promise(function(resolve, reject) {
            mongo.findOne('user', {nickname: nickname})
            .then(function(result) {
                if(!result) {
                    return reject({
                        error: 'User not exist!'
                    });
                }
                var userData = {
                    _id: result._id,
                    fullname: result.fullname,
                    email: result.email,
                    nickname: result.nickname,
                    image: result.image,
                    create_at: result.create_at
                };
                return resolve(userData);
            }).catch(function(err) {
                return reject({
                    error: 'Something went wrong!'
                });
            });
        });
    },
	getActivitySummary: (_id) => {
		return new Promise(function(resolve, reject) {
            // get activity in user_react_question
            mongo
            .getCollection('user_react_question')
            .find({uid: _id})
            .sort({create_at: 1})
            .toArray((err, results) => {
                if(err) {
                    return reject(err);
                }
                var activity = results.map((item) => {
                    return {
                        action: item.action,
                        create_at: item.create_at
                    }
                });
                return resolve(activity);
            })
        });
	},
    addNotice: (data) => {
        // TODO: Ensure this not readed
        data.readed = false;
        return new Promise((resolve, reject) => {
            // add to user
            mongo.addDocument('user_notice', data).then((result) => {
                // update count
                mongo.countv2('user_notice', {readed: false, uid: data.uid}).then((count) => {
                    mongo.updateDocument('user', {$set: {notice: count}}, data.uid).then((result) => {
                        return resolve(result);
                    }).catch((err) => {
                        return reject(err);
                    })
                }).catch((err) => {
                    return reject(err);
                })
            }).catch((err) => {
                return reject(err);
            })

        })
    },
    getNotice: (token, page) => {
        var limit = 10;
        return new Promise((resolve, reject) => {
            User.getByToken(token, ['_id']).then((user)=>{
                var query = mongo.getCollection('user_notice').find({
                    uid: user._id
                });
                // count
                query.count((err, count) => {
                    if(err) {
                        return reject(err);
                    }
                    var originResults = query.sort({create_at: -1}).skip((page - 1) * limit).limit(limit);
                    originResults.toArray((err, items) => {
                        if(err) {
                            return reject(err);
                        }

                        var nprs = [];
                        var data = [];
                        items.map((item) => {
                            var _item = {
                                _id: item._id.toString(),
                                type: item.type,
                                create_at: item.create_at,
                                readed: item.readed,
                                oid: item.oid
                            };
                            data.push(_item);
                            
                            var upr = User.get(item.sid, ['fullname']).then((user) => {
                                _item.user = user;
                            }).catch((err) => {
                                // TODO: handle err
                            });
                            nprs.push(upr);
                            switch(item.type) {

                                case 'answer': {
                                    _item.action = 'trả lời';
                                }break;
                                case 'vote': {
                                    _item.action = 'vote';
                                }break;
                            }
                            return _item;
                        });
                        Promise.all(nprs).then(() => {
                            var userfulResults = {
                                total: count,
                                limit: limit,
                                data: data
                            }
                            return resolve(userfulResults);                  
                        });
                    });
                });
            }).catch((err)=>{
                return reject(err);
            })
        });
    },
    markNoticeReaded: (notice_id, token) => {
        return new Promise((resolve, reject) => {
            User.getByToken(token, ['_id']).then((user)=>{
                mongo.getCollection('user_notice').find({
                    uid: user._id,
                    _id: mongo.toObjectId(notice_id)
                }).toArray((err, notices) => {
                    if(err) {
                        return reject(err);
                    }
                    if(notices.length === 1) {
                        mongo.updateDocument('user_notice', {$set: {readed: true}}, mongo.toObjectId(notice_id)).then(()=>{
                            mongo.countv2('user_notice', {readed: false, uid: user._id}).then((count) => {
                                mongo.updateDocument('user', {$set: {notice: count}}, user._id);
                            }).catch((err) => {
                                // TODO: No check err
                                console.log(err);
                            });

                            return resolve(true);
                        }).catch((err)=>{
                            return reject(err);
                        })
                    }
                });
            }).catch((err)=> {
                return reject(err);
            });
        });
    }
}
module.exports = User;
