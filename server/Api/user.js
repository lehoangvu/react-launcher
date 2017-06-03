var mongo = require('./../db/mongo');
// var firebase = require('./firebase');
// var db = firebase.database();
var Raven = require('./raven');

module.exports = {
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
    }
}
