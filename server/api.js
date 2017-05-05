var express = require('express');
var app = express();
var request = require("request")
var path = require('path');
var bodyParser = require('body-parser');
var qna = require('./Api/qna');
var oauthGG = require('./Api/oauthGG');
var mongo = require('./db/mongo');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

function response(res, data, success) {
    res.setHeader('Content-Type', 'application/json');
    if(!success)
        res.status(400);
    res.send(data);
}

app.route('/api/qna/search').get(function (req, res) {
    var query = {
        q: req.query || '',
        sort: req.query.sort || 'newest',
        page: req.page || 1
    };
    qna.search(req.query).then(function(results) {
        response(res, results, true);
    }).catch(function(err) {
        response(res, err, false);
    });
});

app.route('/api/user/login-google').get(function (req, res) {
    var token = req.query.token || false;
    console.log(req.query);
    if(!token) {
        return response(res, {
            error: 'Token is require'
        }, false);
    }
    oauthGG.getInfo(token).then(function(results) {
        response(res, results, true);
    }).catch(function(err) {
        response(res, err, false);
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
