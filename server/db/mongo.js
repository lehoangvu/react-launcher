// Retrieve
var MongoClient = require('mongodb').MongoClient;
var database;
// mongodb://<dbuser>:<dbpassword>@ds127101.mlab.com:27101/qna_development
var mongoDB = {
	connect: function() {
		var connectionString = 'mongodb://dev:1234qwerasdfzxcv@ds127101.mlab.com:27101/qna_development';
		return new Promise(function(resolve, reject) {
			// Connect to the db
			MongoClient.connect(connectionString, {
				connectTimeoutMS: 480000,
			}, function(err, di) {
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
	addDocument: function(collectionName, doc) {
		var collection = database.collection(collectionName);
		return new Promise(function(resolve, reject) {
			collection.insert(doc, {w: 1}, function(err, result) {
				if(err) {
					console.log(err);
					process.exit();
					return reject(err);
				}
				return resolve(result);
			});
			
		})
	},
	count: function(collectionName, text) {
		var collection = database.collection(collectionName);
		var query;
		if(text === '')
			query = collection.find();
		else
			query = collection.find({$text: {$search: text}}, {score: {$meta: "textScore"}});
		return new Promise(function(resolve, reject) {
			query.count(function(err, count) {
				if(err) {
					return reject(err);
				}
				return resolve(count);
			})
		});
	},
	search: function(collectionName, text, sorts, skip, limit) {
		var collection = database.collection(collectionName);
		var originResults;

		if(text === '')
			originResults = collection.find().sort(sorts).skip(skip).limit(limit);
		else
			originResults = collection.find({$text: {$search: text}}, {score: {$meta: "textScore"}}).sort(sorts).skip(skip).limit(limit);

		return new Promise(function(resolve, reject) {
			mongoDB.count(collectionName, text).then(function(total) {
				originResults.toArray(function(err, items) {
					if(err) {
						return reject(err);
					}
					var userfulResults = {
						total: total,
						data: items
					}
					return resolve(userfulResults);
				});
			})
			
		});
		
		
	},
	index: function(collectionName, description) {
		var collection = database.collection(collectionName);
		collection.createIndex(description);
	},
	updateDocument: function(collectionName, doc) {

	}
}

module.exports = mongoDB; 