"use strict";
console.log('API starting ...');
var compression = require('compression');
var express = require('express');
var app = express();
var request = require("request")
var bodyParser = require('body-parser');
var oauth = require('./Api/oauth');
var mongo = require('./db/mongo');
var user = require('./Api/user');
var expressValidator = require('express-validator');
var apicache = require('apicache');

// var oauthFB = require('./Api/oauthFB');
// oauthFB.getInfo("EAAIPZCBIIt5gBANOls1lokoIMvLNuRv7i5pHAuvdaitJ5CjtMtXO5CdLLakd2Nf2dnrVf1ZAL2WdK3tPVkuAXXbZAbZA9PQMWGyvgZBRp50Yjmhu5JWWyLxKE3EnX1JUFrkloCCUBdhpzORkZBI6LwNfXiZBDNxj5WqD9ryCNCm8XkGFJCz3JKdzvuR1vhcqRMZD");

var cache = apicache.middleware;

// app.use(cache('5 minutes'));


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
        return response(res, {
            error: 'Token is require'
        }, false);
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
        return response(res, {
            error: 'Token is require'
        }, false);
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
        return response(res, {
            error: 'Token is require'
        }, false);
    }
    oauth.fetch(token)
    .then(function(result) {
        res.send(result);
    }).catch(function(err) {
        res.status(400).send(err);
    });
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

    // user.addNotice({
    //     uid: mongo.toObjectId('591dcf82bf91441b481baa8e1'),
    //     type: 'answer'
    // })

    app.listen(process.env.PORT || 5100); //the port you want to use
}).catch(function(err) {
    console.log(err);
});
