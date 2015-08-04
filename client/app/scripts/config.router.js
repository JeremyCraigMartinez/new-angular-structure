'use strict';

var clientApp = angular.module('clientApp', ["ui.router","ngCookies"]);
clientApp.config(function($stateProvider, $urlRouterProvider){
  
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/app");
  
  $stateProvider
    .state('app', {
        url: "/app",
        templateUrl: 'views/app.html',
        controller: 'AppController'
    })
    .state('login', {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .state('about', {
        url: "/about",
        templateUrl: 'views/about.html'
    })
    .state('contact', {
        url: "/contact",
        templateUrl: 'views/contact.html'
    })
    .state('doctors_home', {
        url: "/doctors_home",
        templateUrl: 'views/doctors_home.html',
        controller: 'DoctorsHomeController'
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
    });
});