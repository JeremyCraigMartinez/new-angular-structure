'use strict';

//Sidebar Collapse
angular.module('clientApp')
  .directive('chartForm', function() {
    return {
      restrict: 'E',
      replace: true,
      controller: function AppCtrl ($scope, $rootScope, ActivityService) {
        ActivityService.activity_for_all_users().then(function (activity) {
          $scope.mode = "see calories";
          console.log('asdf');
          $scope.update = function () {
            console.log('fdas');
            if ($scope.mode === "see calories") {
              $scope.mode = "see duration";
            }
            else if ($scope.mode === "see duration") {
              $scope.mode = "see calories";
            }
          };
        });
      },
      template: '<div class="form">' +
	              '<br /><button ng-click="update()">{{mode}}</button>' +
	              '<br />Hovered bar data: {{barValue}}</div>'
    }
	});