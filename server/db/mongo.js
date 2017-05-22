// Retrieve
var mongoIns = require('mongodb');
var MongoClient = mongoIns.MongoClient;
var database;
// mongodb://<dbuser>:<dbpassword>@ds127101.mlab.com:27101/qna_development
var mongoDB = {
    toObjectId: (id) => {
    	try {
        	return new mongoIns.ObjectId(id.toString());
		}
		catch(err) {
		    return false;
		}
    },
	_: mongoIns,
	connect: () => {
		var connectionString = 'mongodb://dev:1234qwerasdfzxcv@ds127101.mlab.com:27101/qna_development';
		return new Promise(function(resolve, reject) {
			// Connect to the db
			MongoClient.connect(connectionString, {
				connectTimeoutMS: 480000,
			}, (err, di) => {
			  if(err) {
			  	return reject({
			  		error: err
			  	});
			  }
			  database = di;
			  return resolve();
			});		
			
		})
	},
	addDocument: (collectionName, doc) => {
        doc['create_at'] = new Date().getTime();
        doc['update_at'] = new Date().getTime();
		var collection = database.collection(collectionName);
		return new Promise((resolve, reject) => {
			collection.insert(doc, {w: 1}, (err, result) => {
				if(err) {
					return reject(err);
				}
				return resolve(result);
			});
			
		})
	},
	count: (collectionName, text, type) => {
		var collection = database.collection(collectionName);
		var query;
		if(text === '')
			query = collection.find();
		else
			query = collection.find({$text: {$search: text}}, {score: {$meta: "textScore"}});
		return new Promise((resolve, reject) => {
			query.count((err, count) => {
				if(err) {
					return reject(err);
				}
				return resolve(count);
			})
		});
	},
	countv2: (collectionName, query) => {
		var collection = database.collection(collectionName);
		return new Promise((resolve, reject) => {
			collection.find(query).count((err, count) => {
				if(err) {
					return reject(err);
				}
				return resolve(count);
			})
		});
	},
	search: (collectionName, text, sorts, skip, limit, type, question_id) => {
		var collection = database.collection(collectionName);
		var originResults;
		var countQuery;

		if(text === '') {
			var query = {};
			if(type !== null) {
				query['type'] = type;
			}
			if(question_id !== false) {
				query['question_id'] = question_id;
			}
			countQuery = collection.find(query);
			originResults = countQuery.sort(sorts).skip(skip).limit(limit);
		} else {
			var query = {$text: {$search: text}};
			if(type !== null) {
				query['type'] = type;
			}
			if(question_id !== false) {
				query['question_id'] = question_id;
			}
			countQuery = collection.find(query, {score: {$meta: "textScore"}});
			originResults = countQuery.sort(sorts).skip(skip).limit(limit);
		}

		return new Promise((resolve, reject) => {
			countQuery.count((err, count) => {
				if(err) {
					return reject(err);
				}
				originResults.toArray((err, items) => {
					if(err) {
						return reject(err);
					}
					var userfulResults = {
						total: count,
						limit: limit,
						data: items
					}
					return resolve(userfulResults);
				});
			});
			// mongoDB.count(collectionName, text, type).then((total) => {
			// })
			
		});
		
		
	},
	index: (collectionName, description) => {
		var collection = database.collection(collectionName);
		collection.createIndex(description);
	},
	updateDocument: (collectionName, data, _id) => {
		var collection = database.collection(collectionName);
		return new Promise((resolve, reject) => {
			collection.update({_id: mongoDB.toObjectId(id)}, data, (err, result)=>{
				if(err) {
					return reject(err);
				}
				return resolve(result);
			})
		})
	},
	findOne: (collectionName, query) => {
		var collection = database.collection(collectionName);
		return new Promise((resolve, reject) => {
			var result = collection.findOne(query, (err, result) => {
				if(err) {
					return reject(err);
				}
				if(result)
					return resolve(result);
				return resolve(false);
			});
		})
	}
	// findAndModify: (collectionName, query, updateQuery) => {
	// 	var collection = database.collection(collectionName);
	// 	// var groupQuery = {
	// 	// 	query: query,
	// 	// 	sort: {create_at: 1},
	// 	// 	update: updateQuery,
	// 	// 	upsert: true
	// 	// };
	// 	// console.log(groupQuery);
	// 	return new Promise((resolve, reject) => {
	// 		var result = collection.findAndModify(query, {create_at: 1}, updateQuery, {upsert: false}, (err, result) => {
	// 			if(err) {
	// 				return reject(err);
	// 			}
	// 			if(result)
	// 				return resolve(result);
	// 			return resolve(false);
	// 		});
	// 	})
	// }
}

module.exports = mongoDB; 