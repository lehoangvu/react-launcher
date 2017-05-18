var mongo = require('./../db/mongo');

module.exports = {
	get: function(id, fields) {
		return new Promise(function(resolve, reject) {
			mongo.findOne('user', {_id: new mongo._.ObjectID(id)}).then(function(result) {
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
	getByToken: function(token, fields) {
		return new Promise(function(resolve, reject) {
            mongo.findOne('user_token', {value: token})
            .then(function(result) {
                if(!result) {
                    return reject({
                        error: 'Token invalid!'
                    });
                }
                mongo.findOne('user', {_id: result.uid}).then(function(result) {
                    // console.log(result);
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
	}
}