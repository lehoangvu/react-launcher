var express = require('express');
var app = express();
var request = require("request")
// var path = require('path');
var bodyParser = require('body-parser');
var qna = require('./Api/qna');
var oauth = require('./Api/oauth');
var mongo = require('./db/mongo');
// app.use(require('express-promise')());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.route('/api/qna/search').get(function (req, res) {
    var query = {
        q: req.query || '',
        sort: req.query.sort || 'newest',
        page: req.page || 1
    };
    qna.search(req.query).then(function(results) {
        res.send(results).bind(res);
    }).catch(function(err) {
        res.sendStatus(400).bind(res);
        res.send(err).bind(res);
    });
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

app.route('/api/customer/me').post(function (req, res) {
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
        res.sendStatus(400);
        res.send(err);
    });
});

// app.route('/api/qna/create').get(function (req, res) {
//     qna.add({
//         title: 'Title ' + from,
//         create_at: new Date().getTime(),
//         uid: 12412
//     }).then(function(snap) {
//         console.log(snap.title);
//     }).catch(function(err) {
//         console.log(err);
//     });
// });
mongo.connect().then(function() {
    console.log('Connect Mongo Success and listerning to connection to API!');
    app.listen(process.env.PORT || 5100); //the port you want to use

    

    // mongo.count('qna', '').then(function(results) {
    //     console.log(results);
    // }).catch(function(err) {
    //     console.log(err);
    // })

    // qna.add({
    //     title: 'Awesome title 1',
    //     create_at: new Date().getTime(),
    //     uid: 9999
    // });

}).catch(function(err) {
    console.log(err);
});
