var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/booklist').success(function(response) {
    console.log("I got the data I requested");
    $scope.booklist = response;
    $scope.book = "";
  });
};

refresh();

$scope.addBook = function() {
  console.log($scope.book);
  $http.post('/booklist', $scope.book).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/booklist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/booklist/' + id).success(function(response) {
    $scope.book = response;
  });
};  

$scope.update = function() {
  console.log($scope.book._id);
  $http.put('/booklist/' + $scope.book._id, $scope.book).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.book = "";
}

}]);﻿