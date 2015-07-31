'use strict';

var clientApp = angular.module('clientApp', ["ui.router"])
clientApp.config(function($stateProvider, $urlRouterProvider){
  
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/state1")
  
  $stateProvider
    .state('state1', {
        url: "/state1",
        templateUrl: "views/partials/state1.html"
    })
      .state('state1.list', {
          url: "/list",
          templateUrl: "views/partials/state1.list.html",
          controller: function($scope){
            $scope.items = ["A", "List", "Of", "Items"];
          }
      })
      
    .state('state2', {
        url: "/state2",
        templateUrl: "views/partials/state2.html"
    })
      .state('state2.list', {
          url: "/list",
          templateUrl: "views/partials/state2.list.html",
          controller: function($scope){
            $scope.things = ["A", "Set", "Of", "Things"];
          }
      })
})