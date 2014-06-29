/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var pjson = require('./package.json');
var path = require('path');

/* Initialize mongodb connection */
var mongo = require('mongoskin');
var db = mongo.db("mongodb://sam-main:sam-main@ds053479.mongolab.com:53479/m-rouget-scrumsam", {native_parser:true});

/* Initialize express.js */
var express = require('express');


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var routes = require('./routes/index');
app.use('/', routes);

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

var users = require('./routes/users');
app.use('/users', users);


//app.get('/', function(req, res) {
//  res.send('Hello from ScrumSamServer');
//});

/* Start application */
var server = app.listen(9080, function () {
    console.log('%s %s - running at port %d', pjson.name, pjson.version, server.address().port)
});


