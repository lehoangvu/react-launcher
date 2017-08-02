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

app.use((req,res,next) => { 
    req.url = req.url.replace(/[/]+/g, '/'); 
    next(); 
});

app.use('/public', express.static('./public'))
app.use('/dist', express.static('./dist'))
app.use('/favicon.ico', express.static('./favicon.ico'))
app.use('/loaderio-a9e0809dcfd872451be241b95e98bfac.txt', express.static('./loaderio-a9e0809dcfd872451be241b95e98bfac.txt'))
app.use(require('express-status-monitor')())

app.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname + '/../') //where your static content is located in your filesystem
);

// app.use(
//     "*", //the URL throught which you want to access to you static content
//     express.static(__dirname + '/../') //where your static content is located in your filesystem
// );

app.listen(process.env.PORT || 5000); //the port you want to use
console.log('SERVER ready !');