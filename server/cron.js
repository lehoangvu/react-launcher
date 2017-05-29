"use strict";
var express = require('express');
var app = express();
var request = require("request")
var bodyParser = require('body-parser');
var Updater = require('./Helper/Updater');
var mongo = require('./db/mongo');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  next();
});


app.route('/update').post(function (req, res) {
    var action = req.body.action;
    switch(action) {
        case 'view': {
            var qid = req.body.id;
            Updater.createCronUpdateView(mongo.toObjectId(qid));
        }
        break;
        case 'vote': {
            var qid = req.body.id;
            Updater.createCronUpdateVote(mongo.toObjectId(qid));
        }
        break;
        case 'answer': {
            var qid = req.body.id;
            Updater.createCronUpdateAnswer(mongo.toObjectId(qid));
        }
        break;
            
        default:
            break;
    }
    res.send('ok');
});

mongo.connect().then(function() {
    console.log('Connect Mongo Success and listerning to connection to CRON!');
    app.listen(process.env.PORT || 5200); //the port you want to use

}).catch(function(err) {
    console.log(err);
});
