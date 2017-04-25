var ES = require('elasticsearch');
require('es6-promise').polyfill();
var elasticClient = new ES.Client({  
    host: 'localhost:9200',
    log: 'info'
});

var indexName = "randomindex";

/**
* Delete an existing index
*/
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexName
    });
}

/**
* create the index
*/
function initIndex() {  
    return elasticClient.indices.create({
        index: indexName
    });
}

/**
* check if the index exists
*/
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexName
    });
}
initIndex();
// indexExists.then(function (exists) {  
//   if (exists) { 
//     return deleteIndex(); 
//   } 
// }).then(initIndex);

// module.exports = {
//     deleteIndex : deleteIndex,
//     indexExists: indexExists,
//     initIndex : initIndex
// };  