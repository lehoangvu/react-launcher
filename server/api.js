var express = require('express');
var app = express();
var request = require("request")
var path = require('path');
var bodyParser = require('body-parser');
var qna = require('./Api/qna');
var mongo = require('./db/mongo');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


mongo.connect().then(function() {
    console.log('Connect Mongo Success and listerning to connection to API!');
    // app.listen(process.env.PORT || 5000); //the port you want to use

    // var count = 1;
    // while(count < 100000) {
    //     qna.add({
    //         title: 'Title 1',
    //         create_at: new Date().getTime(),
    //         uid: 12412
    //     });
    //     console.log(count);
    //     count++;
    // }

    // mongo.find('qna');
    // mongo.index('qna', {
    //     'title': 'text'
    // });

    qna.add({
        title: 'Awesome title',
        create_at: new Date().getTime(),
        uid: 9999
    });

}).catch(function(err) {
    console.log(err);
});
