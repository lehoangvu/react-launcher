var express = require('express');
var app = express();
var request = require("request")
var path = require('path');
var bodyParser = require('body-parser');
var md5 = require('md5');
var qna = require('./Api/qna');
// qna.index();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.route('/api/qna/search').get(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var sortAble = ['vote', 'down_vote', 'create_at'];
    var sorts = {};
    var page = req.query.page || 1;
    if(req.query.sort) {
        var sortLists = req.query.sort.trim().split(',');
        sortLists.forEach(function(sortOption){
            var sortArray = sortOption.split('|');
            if(sortArray.length === 2 && sortAble.indexOf(sortArray[0].trim()) !== -1 && (sortArray[1] === 'desc' || sortArray[1] === 'asc')) {
                sorts[sortArray[0].trim()] = sortArray[1].trim();
            }
        })
    }
    qna.search(req.query.q || '', sorts, page).then(function(data){
        res.send(data);
    }).catch(function(error){
        res.send(error);
    });
});

// res.setHeader('Content-Type', 'application/json');
// var count = 0;
// while(count < 3000) {
//     var data = {
//         "content": "Lorem ipsum dolor sit amet, __consectetur__ adipiscing elit. Cras imperdiet nec erat ac condimentum",
//         "create_at": new Date().getTime(),
//         "title": "Question " + count++,
//         "uid": 1
//     };
//     qna.add(data).then(function(key){
//         // res.send({key:key});
//     }).catch(function(error){
//         // res.status(400);
//         // res.send(error);
//     });
// } 

app.route('/api/qna/create').get(function (req, res) {
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
    var sortAble = ['vote', 'down_vote', 'create_at'];
    var sorts = {};
    if(req.query.sort) {
        var sortLists = req.query.sort.trim().split(',');
        sortLists.forEach(function(sortOption){
            var sortArray = sortOption.split('|');
            if(sortArray.length === 2 && sortAble.indexOf(sortArray[0].trim()) !== -1 && (sortArray[1] === 'desc' || sortArray[1] === 'asc')) {
                sorts[sortArray[0].trim()] = sortArray[1].trim();
            }
        })
    }
    qna.browser(sorts, req.query.cursor).then(function(data){
        res.send(data);
    }).catch(function(error){
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



app.listen(process.env.PORT || 5100); //the port you want to use
