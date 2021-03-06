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
    .state('account', {
        url: "/account",
        templateUrl: 'views/account.html',
        controller: 'AccountController'
    })
});