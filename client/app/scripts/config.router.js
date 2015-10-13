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
    .state('patients_home', {
        url: "/patients_home",
        templateUrl: 'views/patients_home.html',
        controller: 'PatientsHomeController'
    })
    .state('groups', {
        url: "/groups",
        templateUrl: 'views/groups.html',
        controller: 'GroupController'
    })
    .state('admin', {
        url: "/admin",
        templateUrl: 'views/admin.html',
        controller: 'AdminController'
    })
    .state('admin.doctors', {
        url: "/admin/doctors",
        templateUrl: 'views/partials/admin.doctors.html',
        controller: 'AdminDoctorsController'
    })
    .state('admin.patients', {
        url: "/admin/patients",
        templateUrl: 'views/partials/admin.patients.html',
        controller: 'AdminPatientsController'
    })
    .state('doctor_profile', {
        url: "/doctor_profile/:id",
        templateUrl: 'views/doctor_profile.html',
        controller: 'DoctorProfileController'
    })
    .state('patient_profile', {
        url: "/patient_profile/:id",
        templateUrl: 'views/patient_profile.html',
        controller: 'PatientProfileController'
    })
    .state('patient_profile.diet', {
        url: "/patient_profile/:id/diet",
        templateUrl: 'views/partials/patients_home.bottomleft.html',
        controller: 'DietAndFoodController'
    })
    /*.state('patient_profile.diet', {
        url: "/patient_profile/:id/diet",
        templateUrl: 'views/partials/patient_profile.diet.html',
        controller: 'PatientProfile_DietController'
    })*/
    .state('patient_profile.activity', {
        url: "/patient_profile/:id/activity",
        templateUrl: 'views/partials/patient_profile.activity.html',
        controller: 'PatientProfile_ActivityController'
    })
    .state('account', {
        url: "/account",
        templateUrl: 'views/account.html',
        controller: 'AccountController'
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