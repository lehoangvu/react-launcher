console.log('SERVER starting ...');
var express = require('express');
var app = express();
var request = require("request");

app.use((req, res, next) => {
  res.header("cache-control", "max-age=604800");
  res.header("content-encoding", "gzip");
  next();
});

app.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname + '/../') //where your static content is located in your filesystem
);
app.use(
    "*", //the URL throught which you want to access to you static content
    express.static(__dirname + '/../') //where your static content is located in your filesystem
);

console.log('SERVER ready !');
app.listen(process.env.PORT || 5000); //the port you want to use
