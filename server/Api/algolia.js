// var dotenv = require('dotenv');
var db = require("./db");
var algoliasearch = require('algoliasearch');
// configure algolia
var algoliaConfig = {
	ALGOLIA_APP_ID: '8VW1FG2TY0',
	ALGOLIA_API_KEY: 'e1e213a6045bf90c61163c2a905e344b'
};

var algolia = algoliasearch(algoliaConfig.ALGOLIA_APP_ID, algoliaConfig.ALGOLIA_API_KEY);

module.exports = algolia;
