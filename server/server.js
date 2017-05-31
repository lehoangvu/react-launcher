console.log('SERVER starting ...');
var compression = require('compression');
var express = require('express');
var app = express();
var request = require("request");

app.use(compression({filter: (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}}));

app.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname + '/../') //where your static content is located in your filesystem
);
app.use(
    "*", //the URL throught which you want to access to you static content
    express.static(__dirname + '/../') //where your static content is located in your filesystem
);

app.listen(process.env.PORT || 5000); //the port you want to use
console.log('SERVER ready !');
