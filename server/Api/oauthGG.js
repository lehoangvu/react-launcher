require('dotenv').config();

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;


function getInfo (token) {
	return new Promise(function(resolve, reject) {
		var oauth2Client = new OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			process.env.GOOGLE_REDIRECT_URL
		);
		var plus = google.plus({
			version: 'v1',
			auth: oauth2Client
		});
		oauth2Client.setCredentials({
			access_token: token
		});
		plus.people.get({
			userId: 'me'
		}, function (err, me) {
			if (err) {
				console.log(err);
				return reject({
					error: 'Token invalid or exprire'
				});
			}
			var info = {
				email: me.emails[0].value,
				fullname: me.displayName,
				image: me.image,
				source: 'google'
			}
			return resolve(info);
		});
		
	});
}

var oauthGG = {
	getInfo: getInfo
};

module.exports = oauthGG;