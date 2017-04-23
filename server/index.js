var express = require('express');
var app = express();
var request = require("request")
var path = require('path');
var bodyParser = require('body-parser');
var md5 = require('md5');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.route('/api/qna').get(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var qna = require('./Api/qna');
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
        res.setStatus(400);
        res.send(error);
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

    // var count = 0;
    // while(count < 30) {
    //     var data = {
    //         "content": "Lorem ipsum dolor sit amet, __consectetur__ adipiscing elit. Cras imperdiet nec erat ac condimentum. Nulla vel rutrum ligula. Sed hendrerit interdum orci a posuere. Vivamus ut velit aliquet, mollis purus eget, iaculis nisl. Proin posuere malesuada ante. Proin auctor orci eros, ac molestie lorem dictum nec. Vestibulum sit amet erat est. Morbi luctus sed elit ac luctus. Proin blandit, enim vitae egestas posuere, neque elit ultricies dui, vel mattis nibh enim ac lorem. Maecenas molestie nisl sit amet velit dictum lobortis. Aliquam erat volutpat.",
    //         "create_at": new Date().getTime(),
    //         "title": "Question " + count++,
    //         "uid": 1
    //     };
    //     qna.add(data).then(function(){
    //         res.send(data);
    //     }).catch(function(error){
    //         res.status(400);
    //         res.send(error);
    //     });
    // }  

});



app.listen(process.env.PORT || 5000); //the port you want to use
