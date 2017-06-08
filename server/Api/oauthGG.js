var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var Helper = require('./../Helper');


function getInfo (token) {
	return new Promise(function(resolve, reject) {
		var oauth2Client = new OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			process.env.GOOGLE_REDIRECT_URL,
			'profile'
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

			var avatar = me.image.url;
			// default is male
			if(me.image.isDefault) {
				avatar = '/public/img/avatar_default/man'+Helper.random(1, 40) + '.png';
			}

			if(typeof me.gender !== 'undefined' && me.image.isDefault) {
				if(me.gender === 'male') {
					avatar = '/public/img/avatar_default/man'+Helper.random(1, 40) + '.png';
				}
				if(me.gender === 'female') {
					avatar = '/public/img/avatar_default/woman'+Helper.random(1, 38) + '.png';
				}
			}

			var user = {
				email: me.emails[0].value,
				fullname: me.displayName,
				image: avatar,
				source: 'google'
			};
			return resolve(user);
		});
		
	});
}

var oauthGG = {
	getInfo: getInfo
};

module.exports = oauthGG;