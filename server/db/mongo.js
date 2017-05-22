// Retrieve
var mongoIns = require('mongodb');
var MongoClient = mongoIns.MongoClient;
var database;
// mongodb://<dbuser>:<dbpassword>@ds127101.mlab.com:27101/qna_development
var mongoDB = {
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
					console.log(err);
					process.exit();
					return reject(err);
				}
				return resolve(result);
			});
			
		})
	},
	count: (collectionName, text) => {
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
	search: (collectionName, text, sorts, skip, limit) => {
		var collection = database.collection(collectionName);
		var originResults;

		if(text === '')
			originResults = collection.find().sort(sorts).skip(skip).limit(limit);
		else
			originResults = collection.find({$text: {$search: text}}, {score: {$meta: "textScore"}}).sort(sorts).skip(skip).limit(limit);

		return new Promise((resolve, reject) => {
			mongoDB.count(collectionName, text).then((total) => {
				originResults.toArray((err, items) => {
					if(err) {
						return reject(err);
					}
					var userfulResults = {
						total: total,
						limit: limit,
						data: items
					}
					return resolve(userfulResults);
				});
			})
			
		});
		
		
	},
	index: (collectionName, description) => {
		var collection = database.collection(collectionName);
		collection.createIndex(description);
	},
	updateDocument: (collectionName, data, _id) => {
		var collection = database.collection(collectionName);
		return new Promise((resolve, reject) => {
			collection.update({_id: mongoIns.ObjectID(_id)}, data, (err, result)=>{
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
}

module.exports = mongoDB; 