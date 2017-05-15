var crypto = require('crypto');
var mongo = require('./../db/mongo');
var collectionName = 'user';
var oauthGG = require('./oauthGG');


function getToken() {
    return crypto.randomBytes(48).toString('hex');
}

function createAccessToken(id) {
    var token = getToken();
    return new Promise(function(resolve, reject) {
        var tokenData = {
            value: token,
            expire: new Date().getTime() + (3600 * 24 * 60 * 1000),
            uid: id
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
                mongo.findOne('user', {_id: result.uid}).then(function(result) {
                    // console.log(result);
                    if(!result) {
                        return reject({
                            error: 'Token invalid!'
                        });
                    }
                    var userData = {
                        email: result.email,
                        fullname: result.fullname,
                        image: result.image,
                        source: result.source,
                        notice: result.notice
                    };
                    return resolve(userData);
                }).catch(function(err) {
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
