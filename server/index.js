var express = require('express');
var app = express();
var request = require("request")
var path = require('path');

// app.use(
//     __dirname + "../", //the URL throught which you want to access to you static content
//     express.static(__dirname) //where your static content is located in your filesystem
// );
app.use('/', express.static(path.join(__dirname, '../')));


app.listen(process.env.PORT || 5000); //the port you want to use
