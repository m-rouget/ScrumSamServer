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

  var createUser = function(callback, user) {
    request({
      url: url,
      method: 'POST',
      json: true,
      body: user
    }, function(error, response, body) {
      if (error)
        callback.fail(new Error("POST failed: " + url));
      else if (response.statusCode === 201)
        callback();
      else
        callback.fail(new Error("POST failed (" + response.statusCode + "): " + url));
    });
  };

  var deleteUser = function(callback, userUrl) {
    request({
      url: userUrl,
      method: 'DELETE'
    }, function(error, response, body) {
      if (error)
        callback.fail(new Error("DELETE failed: " + userUrl));
      else if (response.statusCode === 200)
        callback();
      else
        callback.fail(new Error("DELETE failed (" + response.statusCode + "): " + userUrl));
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
      if (users.length == arg1) // Legitimate ==
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
        clearUserList(callback);
    });
  });

  this.Given(/^an user list without user "([^"]*)"$/, function(arg1, callback) {
    getUserList(callback, function(users) {
      var matchingUser = null;
      users.forEach(function(user) {
        if (user.email === arg1) {
          matchingUser = user;
        }
      });

      // If user exist, delete it
      if (matchingUser)
        deleteUser(callback, matchingUser.link);
      else
        callback();
    });
  });

  this.When(/^I create user "([^"]*)"$/, function(arg1, callback) {
    createUser(callback, {
      name: arg1,
      email: arg1
    });
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

  this.Given(/^an user list with user "([^"]*)"$/, function(arg1, callback) {
    getUserList(callback, function(users) {
      var found = false;
      users.forEach(function(user) {
        if (user.email === arg1)
          found = true;
      });

      if (found)
        callback();
      else
        createUser(callback, {
          name: arg1,
          email: arg1
        });
    });
  });

  this.When(/^I delete user "([^"]*)"$/, function(arg1, callback) {
    getUserList(callback, function(users) {
      var matchingUser = null;
      users.forEach(function(user) {
        if (user.email === arg1) {
          matchingUser = user;
        }
      });

      // If user exist, delete it
      if (matchingUser)
        deleteUser(callback, matchingUser.link);
      else
        callback.fail(new Error("User <"+arg1+"> not found. Cannot delete"));
    });
  });

  this.Then(/^the user list does not contains "([^"]*)"$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.When(/^I try to create user "([^"]*)"$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^I receive a "([^"]*)" error message$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });



};
