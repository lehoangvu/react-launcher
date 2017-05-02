var express = require('express');
var app = express();
var request = require("request")
var path = require('path');
var bodyParser = require('body-parser');
var qna = require('./Api/qna');
qna.listeningToIndexAlgolia();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.route('/api/qna/search').get(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var sortAble = ['vote', 'reply', 'newest'];

    var query = {};

    if(req.query.q){
        query.q = req.query.q;
    }

    if(req.query.sort) {
        var sort = req.query.sort;
        if(sortAble.indexOf(sort) !== -1) {
            query.sort = sort;
        }
    }
    qna.search(query).then(function(data){
        res.send(data);
    }).catch(function(error){
        res.send(error);
    });
});

app.route('/api/qna/create').get(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var count = 0;
    while(count < 1000) {
        var data = {
            "content": "Lorem ipsum dolor sit amet, __consectetur__ adipiscing elit. Cras imperdiet nec erat ac condimentum",
            "create_at": new Date().getTime(),
            "title": "Question " + count++,
            "uid": 1
        };
        qna.add(data).then(function(key){
            res.send({key:key});
        }).catch(function(error){
            res.status(400);
            res.send(error);
        });
    }  
});

app.route('/api/qna/update/title').get(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    qna.updateTitle(req.query.key, req.query.uid, req.query.title).then(function(data){
        res.send(data);
    }).catch(function(error){
        res.sendStatus(400);
        res.send(error);
    });
});

app.route('/api/qna/update/content').get(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    qna.updateContent(req.query.key, req.query.uid, req.query.content).then(function(data){
        res.send(data);
    }).catch(function(error){
        res.sendStatus(400);
        res.send(error);
    });
});

app.route('/api/qna').get(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var dataFilter = {
        q: req.query.q || '',
        sort: req.query.sort || 'newest'
    };
    if(req.query.from){
        dataFilter.from = req.query.from;
    }
    qna.filter(dataFilter).then(function(data){
        res.send(data);
    }).catch(function(error){
        res.status(400);
        res.send(error);
    });
});



// qna.delete('-KiNFlHUlGYGkPZ2oeZF', 1).then(function(){
//     res.send('ok');
// }).catch(function(){
//     res.send('faild');
// });

// qna.update('-KiNFq5dZeHVUp2k3JWE', 1, {title: 'updated 2', content: 'content updateed', thank: 1}).then(function(){
//     res.send('ok');
// }).catch(function(){
//     res.send('faild');
// });

// const crypto = require('crypto');
// crypto.randomBytes(32, function(err, buf) {
//   if (err) throw err;
//   console.log(buf.toString('hex'));
// });


app.listen(process.env.PORT || 5000); //the port you want to use
