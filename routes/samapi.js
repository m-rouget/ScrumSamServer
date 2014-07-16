/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var router = express.Router();

// ----------------------------------------------------------------------------
// Top level user list operation
// ----------------------------------------------------------------------------

router.get('/users', function(req, res) {
  var db = req.db;
  db.collection('samUsers').find().toArray(function(err, items) {
    if (items) {
      items.forEach(function(item) {
        // UGLY UGLY UGLY UGLY UGLY UGLY UGLY UGLY UGLY
        // Comes from http://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express-js
        item.link = req.protocol + "://" + req.get('host')+"/api" + req.path + "/" + item._id;
      });
    }
    res.json(items);
  });
});

// POST : create a new user
router.post('/users', function(req, res) {
  var item = {
    'email': req.body.email,
    'name': req.body.name
  };

  var db = req.db;
  db.collection('samUsers').insert(item, {}, function(err, result) {
    if (err)
      return next(err);
    res.send(201);
  });
});

// DELETE : clear the whole user list
router.delete('/users', function(req, res) {
  var db = req.db;
  db.collection('samUsers').remove(function(err, result) {
    if (err)
      return next(err);
    
    console.log("DELETE /users. Deleted "+result+" users");
    res.send(200);
  });
});

// ----------------------------------------------------------------------------
// Individial users operations
// ----------------------------------------------------------------------------
router.get('/users/:id', function(req, res, next) {
  var db = req.db;
  db.collection('samUsers').findById(req.params.id, function(err, result) {
    if (err) {
      console.log('find error:', err);
      return next(err);
    }
    res.json(result);
  });
})

router.delete('/users/:id', function(req, res, next) {
  var db = req.db;
  db.collection('samUsers').removeById(req.params.id, function(err) {
    if (err) {
      console.log('remove error:', err);
      return next(err);
    }
  });

  res.json(true);
});

module.exports = router;


