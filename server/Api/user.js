var mongo = require('./../db/mongo');

module.exports = {
	get: function(id, fields) {
		return new Promise(function(resolve, reject) {
			mongo.findOne('user', {_id: id}).then(function(result) {
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
	}
}