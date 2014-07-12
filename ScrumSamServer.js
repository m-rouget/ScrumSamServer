/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var pjson = require('./package.json');
var path = require('path');
var bodyParser = require('body-parser');

/* Initialize mongodb connection */
var mongo = require('mongoskin');
var db = mongo.db("mongodb://sam-main:sam-main@ds053479.mongolab.com:53479/m-rouget-scrumsam", {native_parser: true});

/* Initialize express.js app */
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* Make the mongo db accessible to the expressjs router */
app.use(function(req, res, next) {
  req.db = db;
  next();
});

/* Initialize routes */
var routes = require('./routes/index');
app.use('/', routes);

var samapi = require('./routes/samapi');
app.use('/api', samapi);

/* Start the webapp */
var server = app.listen(9080, function() {
  console.log('This is %s v%s - running at port %d', pjson.name, pjson.version, server.address().port);
});
