// app/assets/javascripts/app/controllers/doctorsCtrl.js

'use strict';

angular.module('clientApp')
  .controller('AdminDoctorsController',
    function ($scope, DoctorService, $state, $rootScope, $q) {
      $scope.Math = window.Math;
      DoctorService.doctors().then(function(doctors) {
        $scope.doctors = [];
        var all = [];
        for (var doctor in doctors) {
          all.push(DoctorService.info(doctors[doctor]));
        }
        $q.all(all).then(function (info) {
          $scope.doctors = info;
          console.log(info);
        });
      });

      $scope.predicate = 'last_name';
      $scope.reverse = true;
      $scope.order = function (predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };

      $scope.search = $rootScope.globals.search || "";

      $scope.firstContainsSecond = function (doctor,search) {
        delete doctor._id;
        delete doctor.__v;
        if (!search) { return true; }

        var keys = Object.keys(doctor);
        for (var each in keys) {
          if (typeof doctor[keys[each]] === 'string') {
            if (doctor[keys[each]].includes(search)) { return true; }
          }
          else if (typeof doctor[keys[each]] === 'number') {
            if (doctor[keys[each]] === search) { return true; }
          }
          else {
            for (var each_group in doctor[keys[each]]) {
              if (doctor[keys[each]][each_group].includes(search)) { return true; }
            }
          }
        }
      };

      $scope.doctor_profile = function (email) {
        $state.go('doctor_profile', {id:email});
      };
  });