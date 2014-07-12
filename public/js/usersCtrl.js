/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function UsersCtrl($scope, $http, $timeout) {
  $scope.message = "-";

  $scope.refresh = function() {
    $http({method: 'GET', url: '/api/users'}).success(function(data, status, headers, config) {
      $scope.users = data;
    }).error(function(data, status, headers, config) {

    });
  };

  $scope.delete = function(item) {
    $http.delete(item.link).success(function(data, status, headers, config) {
      $scope.refresh();
      $scope.message = "DELETE SUCCESS " + item.link;
    }).error(function(data, status, headers, config) {
      $scope.message = "DELETE FAILURE " + item.link;
    });
  };

  $scope.create = function(item) {
    $http.post('/api/users', item).success(function(data, status, headers, config) {
      $scope.refresh();
    }).error(function(data, status, headers, config) {
    });
  };

  $scope.createRandom = function() {
    $scope.create({
      name: chance.name(),
      email: chance.email()
    });
  };
  
  // Poll backend to auto-update the list
  (function pollUsers() {
    $scope.refresh();
    $scope.promise = $timeout(pollUsers, 1000);
  })();
}

