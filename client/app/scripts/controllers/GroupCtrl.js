// app/assets/javascripts/app/controllers/GroupCtrl.js

'use strict';

angular.module('clientApp')
  .controller('GroupController',
    function ($scope, GroupService, $q, LoginService, $rootScope, $state) {
      $scope.Math = window.Math;
      GroupService.groups().then(function(groups) {
        $scope.groups = [];
        for (var group in groups) {
          $scope.groups.push(groups[group]._id);
        }
      });
      $scope.userType = LoginService.getType();

      $scope.add_group = function (id) {
        GroupService.add_group(id).then(function (res) {
          $scope.groups.push(id);
        });
      };

      $scope.remove_group = function (id) {
        if (confirm("Are you sure you want to delete "+id+" as a group?")) {
          GroupService.remove_group(id).then(function (res) {
            $scope.groups.splice($scope.groups.indexOf(id),1);
          });
        }
      };

      $scope.firstContainsSecond = function (str, substr) {
        return str.includes(substr);
      };
      $scope.search = "";

      $scope.searchPatientsInGroup = function (group) {
        $rootScope.globals.search = group;
        var type = LoginService.getType();

        if (type === 'doctor') { $state.go('doctors_home'); }
        else if (type === 'admin') { $state.go('app'); }
        else if (type === 'patients') { $state.go('app'); }        
      };
  });