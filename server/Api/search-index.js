require('es6-promise').polyfill();
var searchIndex = require('search-index');
var JSONStream = require('JSONStream');
var chalk = require('chalk');
var request = require('request');
var tc = require('term-cluster');

function getInstance(ops) {
	return new Promise(function(resolve, reject){
		if(typeof global.indexInstance !== 'undefined') {
			return resolve(global.indexInstance);
		}
	    var indexFunc = function(err, newIndex) {
	        if (!err) {
	        	global.indexInstance = newIndex;
	            return resolve(newIndex);
	        }
	        return reject(err);
	    }

	    searchIndex(ops, indexFunc);

	});
}
function flush(ops) {
	getInstance(ops).then(function(instance) {
		instance.flush(function(err) {
		  	if (!err) console.log('flush success!')
		})
	}).catch(function(err) {
		console.log('flush err!')
	})
}
function countAll(ops) {

	getInstance(ops).then(function(instance) {
		instance.countDocs(function (err, count) {
		  console.log('this index contains ' + count + ' documents')
		})
	}).catch(function(err) {

	})
	
}
module.exports = {
	getInstance: getInstance,
	flush: flush,
	countAll: countAll
};