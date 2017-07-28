"use strict";
console.log('API starting ...');
var compression = require('compression');
var express = require('express');
var app = express();
var request = require("request")
var bodyParser = require('body-parser');
var oauth = require('./Api/oauth');
var mongo = require('./db/mongo');
var User = require('./Api/user');
var qna = require('./Api/qna');
var expressValidator = require('express-validator');
var apicache = require('apicache');
var appCache = require('./Helper/cache');
var moment = require('moment');
// var oauthFB = require('./Api/oauthFB');
// oauthFB.getInfo("EAAIPZCBIIt5gBANOls1lokoIMvLNuRv7i5pHAuvdaitJ5CjtMtXO5CdLLakd2Nf2dnrVf1ZAL2WdK3tPVkuAXXbZAbZA9PQMWGyvgZBRp50Yjmhu5JWWyLxKE3EnX1JUFrkloCCUBdhpzORkZBI6LwNfXiZBDNxj5WqD9ryCNCm8XkGFJCz3JKdzvuR1vhcqRMZD");

var cache = apicache.middleware;

// app.use(cache('5 minutes'));

app.use(require('express-status-monitor')());

app.use(compression({filter: (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}}));

app.use(expressValidator());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "x-customer-token");
  next();
});

app.route('/api/auth/login-google').post(function (req, res) {
    var token = req.body.token || false;
    if(!token) {
        res.status(400);
        res.send({
            error: 'Token is require'
        });
    }
    oauth.socialLogin(token, 'google')
    .then(function(results) {
        res.send(results);
    }).catch(function(err) {
        res.sendStatus(400);
        res.send(err);
    });
});
app.route('/api/auth/login-facebook').post(function (req, res) {
    var token = req.body.token || false;
    if(!token) {
        res.status(400);
        res.send({
            error: 'Token is require'
        });
    }
    oauth.socialLogin(token, 'facebook')
    .then(function(results) {
        res.send(results);
    }).catch(function(err) {
        res.sendStatus(400);
        res.send(err);
    });
});

app.route('/api/customer/me' ).post(function (req, res) {
    var token = req.body.token || false;
    if(!token) {
        res.status(400);
        res.send({
            error: 'Token is require'
        });
    }
    oauth.fetch(token)
    .then(function(result) {
        console.log(result);
        res.send(result);
    }).catch(function(err) {
        res.status(400).send(err);
    });
});

app.route('/api/account/:nickname' ).get(function (req, res) {
    var nickname = req.params.nickname;
    User.getByNickname(nickname).then(function(user) {
        User.getActivitySummary(user._id).then(function(activity) {
            user.activity = activity;
            delete user._id;
            res.send(user);
        }).catch(function(err) {
            res.status(400).send(err);
        });
    }).catch(function(err) {
        res.status(400).send(err);
    });
});

app.route('/api/customer/me/notice').get(function (req, res) {
    // console.log(req.header);
    var token = req.headers['x-customer-token'] || false;
    if(!token) {
        res.status(400);
        res.send({
            error: 'Token is require'
        });
    }
    var page = req.query.page || 1;
    User.getNotice(token, page)
    .then((result) => {
        var nprs = [];
        result.data.map((item) => {
            // console.log(item.oid);
            var spr = qna._get(item.oid).then((question) => {
                item.target_title = question.title;
                item.target_url = '/questions/'+question.id+'/'+question.url;
                delete item.oid;
            }).catch((err) => {
                console.log(err);
            });
            nprs.push(spr);
        });
        Promise.all(nprs).then(() => {
            res.send(result);             
        }).catch((err) => {
            res.status(400).send(err);
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});


app.route('/api/customer/me/notice/read').post(function (req, res) {
    // console.log(req.header);
    var token = req.headers['x-customer-token'] || false;
    var notice_id = req.body.notice_id || false;
    if(!token) {
        res.status(400);
        res.send({
            error: 'Token is require'
        });
    }
    if(!notice_id) {
        res.status(400);
        res.send({
            error: 'Data invalid'
        });
    }
    User.markNoticeReaded(notice_id, token).then((result) => {
        res.send({
            success: true
        });
    }).catch((err) => {
        res.status(400);
        res.send({
            error: 'Something went wrong'
        });
    });
});

app.route('/api/github-trend' ).get(appCache(), function (req, res) {
    request({
        url: 'https://api.github.com/search/repositories?sort=stars&order=desc&q=created:>'+moment().add(-2, 'day').endOf('day').format("YYYY-MM-DD")+'&page=1',
        headers: {
            'User-Agent': 'Qna Api'
        }
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = [];
            var promises = [];
            var items = JSON.parse(body);
            if(items.items .length > 0) {
                items.items.map((item) => {
                    var tmp = {
                        full_name: item.full_name,
                        url: item.html_url,
                        description: item.description,
                        contributors_url: item.contributors_url,
                        contributors: [],
                        star: item.stargazers_count,
                        fork: item.forks_count,
                        language: item.language
                    };
                    data.push(tmp);
                    promises.push(new Promise((resolve, reject) => {
                        request({
                            url: item.contributors_url,
                            headers: {
                                'User-Agent': 'Qna Api',
                                Authorization: 'token ' + process.env.GITHUB_TOKEN
                            }
                        }, (error, response, body) => {
                            if (!error && response.statusCode == 200) {
                                return resolve(JSON.parse(body));
                            }
                            return resolve([]);
                        });
                    }));
                });
            }
            Promise.all(promises).then((resuls) => {
                resuls.map((users, index) => {
                    data[index]['contributors'] = users;
                });
                res.send(data);
            });
        }else {
            res.status(400);
            res.send({
                error: 'Something went wrong'
            });
        }
    })
});

app.route('/api/status' ).get(function (req, res) {
    var pid = process.pid;
    require('usage').lookup(pid, function(err, result) {
        res.send(result);
    });
});

mongo.connect().then(function() {
    console.log('Connect Mongo Success and listerning to connection to API!');
    require('./controllers/QnaController')(app);
    require('./controllers/StaticController')(app);
    // require('./controllers/SurveyController')(app);
    app.listen(process.env.PORT || 5100); //the port you want to use
}).catch(function(err) {
    console.log(err);
});
