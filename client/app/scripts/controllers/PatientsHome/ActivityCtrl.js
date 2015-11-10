'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:FullcalendarCtrl
 * @description
 * # FullcalendarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivityController', function ($scope, $rootScope, ActivityService, LoginService, $stateParams) {
		var userType = LoginService.getType();

		if (userType === 'patient') {
	    ActivityService.get_all_activity().then(function (activity) {
	    	$scope.data = activity;
	    	console.log(activity);
	    });
	  };
	  
		if (userType === 'doctor') {
			console.log($stateParams['id']);
	    ActivityService.get_all_activity_fromDoc($stateParams['id']).then(function (activity) {
	    	$scope.data = activity;
	    	console.log(activity);
	    });
	  }

		if (userType === 'admin') {
	    ActivityService.get_all_activity_fromAdmin($stateParams['id']).then(function (activity) {
	    	$scope.data = activity;
	    	console.log(activity);
	    });
	  }

	  $scope.mode = "see calories";
    $scope.options = {width: 500, height: 300};
    $scope.hovered = function(d){
      $scope.barValue = d;
      $scope.$apply();
    };
    $scope.barValue = 'None';
	});