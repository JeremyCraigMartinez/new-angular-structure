// app/assets/javascripts/app/controllers/PatientsCtrl.js

'use strict';

angular.module('clientApp')
  .controller('AdminPatientsController',
    function ($scope, PatientService, $state, $rootScope, $q) {
      $scope.Math = window.Math;
      PatientService.patients().then(function(patients) {
        $scope.patients = [];
        var all = [];
        for (var patient in patients) {
          all.push(PatientService.patient_info(patients[patient]));
        }
        $q.all(all).then(function (info) {
          $scope.patients = info;
        });
      });

      $scope.predicate = 'last_name';
      $scope.reverse = true;
      $scope.order = function (predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };

      $scope.search = $rootScope.globals.search || "";

      $scope.firstContainsSecond = function (patient,search) {
        delete patient._id;
        delete patient.__v;
        if (!search) { return true; }

        var keys = Object.keys(patient);
        for (var each in keys) {
          if (typeof patient[keys[each]] === 'string') {
            if (patient[keys[each]].includes(search)) { return true; }
          }
          else if (typeof patient[keys[each]] === 'number') {
            if (patient[keys[each]] === search) { return true; }
          }
          else {
            for (var each_group in patient[keys[each]]) {
              if (patient[keys[each]][each_group].includes(search)) { return true; }
            }
          }
        }
      };

      $scope.patient_profile = function (email) {
        $state.go('patient_profile', {id:email});
      };
  });