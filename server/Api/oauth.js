var crypto = require('crypto');
var mongo = require('./../db/mongo');
var collectionName = 'user';
var oauthGG = require('./oauthGG');
var oauthFB = require('./oauthFB');
var user = require('./user');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNickName(email) {
    var emailArr = email.split('@');
    var ext;
    switch(emailArr[1]) {
        case 'gmail.com': 
            ext = getRandomInt(200, 300);
            break;
            
        case 'yahoo.com': 
            ext = getRandomInt(100, 200);
            break;

        default: 
            ext = getRandomInt(300, 400);
    }
    return emailArr[0] + '.' + ext;
}

function getToken() {
    return crypto.randomBytes(48).toString('hex');
}
function createAccessToken(_id) {
    _id = mongo.toObjectId(_id);
    var token = getToken();
    return new Promise(function(resolve, reject) {
        var tokenData = {
            value: token,
            expire: new Date().getTime() + (3600 * 24 * 60 * 1000),
            uid: _id
        };
        mongo.addDocument('user_token', tokenData).then(function(result) {
            if(result.insertedCount === 1) {
                return resolve({
                    value: tokenData.value,
                    expire: tokenData.expire,
                });
            }
            return reject({
                error: 'Something went wrong!'
            });
        }).catch(function(err) {
            return reject({
                error: 'Something went wrong!'
            });
        });
    })
}

var oauth = {
    socialLogin: function(token, type) {
        return new Promise(function(resolve, reject) {
            // get info by token
            var socialPromise;
            switch(type) {
                case 'google':
                    socialPromise = oauthGG.getInfo(token);
                    break;
                case 'facebook':
                    socialPromise = oauthFB.getInfo(token);
                    break;
                default:
                    socialPromise = oauthGG.getInfo(token);

            };

            // check user exist
            socialPromise.then(function(results) {
                mongo.findOne(collectionName, {email: results.email})
                .then(function(result) {
                    if(!result) {
                        // add user to mongo
                        var userData = {
                            email: results.email,
                            fullname: results.fullname,
                            nickname: getNickName(results.email),
                            image: results.image,
                            source: results.source,
                            notice: 0
                        };
                        mongo.addDocument(collectionName, userData)
                        .then(function(result) {
                            if(result.insertedCount === 1) {
                                // console.log(result);
                                createAccessToken(result.insertedIds[0]).then(function(token) {
                                    return resolve({
                                        me: userData,
                                        token: token
                                    });
                                }).catch(function(err) {
                                    return reject({
                                        error: 'Something went wrong!'
                                    })
                                });
                            }
                        }).catch(function(err) {
                            return reject({
                                error: 'Something went wrong!'
                            })
                        });
                    } else {
                        createAccessToken(result._id).then(function(token) {
                            return resolve({
                                me: result,
                                token: token
                            });
                        }).catch(function(err) {
                            return reject({
                                error: 'Something went wrong!'
                            })
                        });
                    }
                })
                .catch(function(err) {
                    return reject({
                        error: 'Something went wrong!'
                    });
                });
            }).catch(function(err) {
                res.sendStatus(400);
                res.send(err);
            });
        });
    },
    fetch: function(token) {
        return new Promise(function(resolve, reject) {
            mongo.findOne('user_token', {value: token})
            .then(function(result) {
                if(!result) {
                    return reject({
                        error: 'Token invalid!'
                    });
                }
                user.get(result.uid, ['email', 'fullname', 'nickname', 'image', 'source', 'notice']).then((userResult) => {
                    if(!userResult) {
                        return reject({
                            error: 'Token invalid!'
                        });
                    }
                    var userData = {
                        email: userResult.email,
                        fullname: userResult.fullname,
                        nickname: userResult.nickname,
                        image: userResult.image,
                        source: userResult.source,
                        notice: userResult.notice
                    };
                    return resolve(userData);
                }).catch((err) => {
                    return reject({
                        error: 'Cannot find user!'
                    });
                });
            })
            .catch(function(err) {
                return reject({
                    error: 'Something went wrong!'
                });
            });
        });
    }
};

module.exports = oauth;
