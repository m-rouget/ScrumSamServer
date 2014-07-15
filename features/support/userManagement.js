/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var http = require('http');
var request = require('request');
var should = require('should');

module.exports = function() {

  var url = 'http://localhost:9080/api/users';

  var getUserList = function(cucucallback, callIfOK) {
    request({
      url: url,
      json: true
    }, function(error, response, body) {
      if (error)
        cucucallback.fail(new Error("GET failed: " + url));
      else if (response.statusCode === 200)
        callIfOK(body);
      else
        cucucallback.fail(new Error("GET failed (" + response.statusCode + "): " + url));
    });
  };

  var clearUserList = function(callback) {
    request({
      url: url,
      method: 'DELETE'
    }, function(error, response, body) {
      if (error)
        callback.fail(new Error("DELETE failed: " + url));
      else if (response.statusCode === 200)
        callback();
      else
        callback.fail(new Error("DELETE failed (" + response.statusCode + "): " + url));
    });
  };

  this.Given(/^an user list with at least (\d+) user$/, function(arg1, callback) {
    getUserList(callback, function(users) {
      if (users.length >= arg1)
        callback();
      else
        callback.fail(new Error("Expected an user list with at least " + arg1 + " items, got " + users.length));
    });
  });

  this.When(/^I clear the user list$/, function(callback) {
    clearUserList(callback);
  });

  this.Then(/^the list contains (\d+) elements$/, function(arg1, callback) {
    getUserList(callback, function(users) {
      if (users.length === arg1)
        callback();
      else
        callback.fail(new Error("Expected an user list with " + arg1 + " items, got " + users.length));
    });
  });

  this.Given(/^an empty user list$/, function(callback) {
    getUserList(callback, function(users) {
      if (users.length === 0)
        callback();
      else
        callback.fail(new Error("Expected an empty user list, got " + users.length));
    });
  });

  this.Given(/^an user list without user "([^"]*)"$/, function(arg1, callback) {
    getUserList(callback, function(users) {
      var found = false;
      users.forEach(function(user) {
        if (user.email === arg1)
          found = true;
      });

      found.should.be.false;
      callback();
    });
  });

  this.When(/^I create user "([^"]*)"$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^the user list contains "([^"]*)"$/, function(arg1, callback) {
    getUserList(callback, function(users) {
      var found = false;
      users.forEach(function(user) {
        if (user.email === arg1)
          found = true;
      });

      found.should.be.true;
      callback();
    });
  });

 

};
