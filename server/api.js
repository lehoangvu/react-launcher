var express = require('express');
var app = express();
var request = require("request")
var bodyParser = require('body-parser');
var oauth = require('./Api/oauth');
var mongo = require('./db/mongo');
var user = require('./Api/user');
var expressValidator = require('express-validator');

app.use(expressValidator());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
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


// routerLoader(app, './controllers/QnaController');

mongo.connect().then(function() {
    console.log('Connect Mongo Success and listerning to connection to API!');
    // qna.search({
    //     q: '',
    //     sort: 'newest',
    //     page: 1
    // }).then(function(res){console.log(res)}).catch(function(res){console.log(res)});

    require('./controllers/QnaController')(app);

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
