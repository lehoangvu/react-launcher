var graph = require('fbgraph');
graph.setVersion("2.9");

function getInfo (token) {
	graph.setAccessToken(token);
	return new Promise(function(resolve, reject) {
		// pass it in as part of the url
	    graph.get('me?fields=name,email', function(err, res) {
	        if(err) {
	        	return reject({
	        		error: err
	        	});
	        }
	        console.log(res);
			var user = {
				email: res.email,
				fullname: res.name,
				image: "https://graph.facebook.com/"+res.id+"/picture",
				source: 'facebook'
			};
			return resolve(user);
	    });
	});
}


module.exports = {
	getInfo: getInfo
};