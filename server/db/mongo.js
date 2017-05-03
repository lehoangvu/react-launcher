// Retrieve
var MongoClient = require('mongodb').MongoClient;
var database;

var mongoDB = {
	connect: function() {
		var connectionString = 'mongodb://localhost:27017/qna';
		return new Promise(function(resolve, reject) {
			// Connect to the db
			MongoClient.connect(connectionString, function(err, di) {
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
					return reject(err);
				}
				return resolve(result);
			});
			
		})
	},
	find: function(collectionName) {
		var collection = database.collection(collectionName);
		collection.find().toArray(function(err, items) {
			console.log(items);
		});
	},
	ensureIndex: function(collectionName, field) {
		var collection = database.collection(collectionName);
		collection.ensureIndex(field);
	},
	index: function(collectionName, description) {
		var collection = database.collection(collectionName);
		collection.createIndex(description);
	}
}

module.exports = mongoDB; 