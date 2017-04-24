var firebase = require('./firebase');

var oauth = {
	getRedirectUrl: function() {
  		var provider = new firebase.auth.FacebookAuthProvider();
  		console.log(provider);
		provider.addScope('user_birthday');
		provider.setCustomParameters({
		  'display': 'popup'
		});
		return firebase.auth().signInWithRedirect(provider);
	}
};

module.exports = oauth;