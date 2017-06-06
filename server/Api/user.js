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
                        console.log(err);
                        Raven.captureException({
                            error: 'Update user notice count',
                            env: 'API'
                        });
                        return reject(err);
                    })
                }).catch((err) => {
                    console.log(err);
                    Raven.captureException({
                        error: 'Count user notice',
                        env: 'API'
                    });
                    return reject(err);
                })
            }).catch((err) => {
                console.log(err);
                Raven.captureException({
                    error: 'Add user notice',
                    env: 'API'
                });
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
    }
}
module.exports = User;
