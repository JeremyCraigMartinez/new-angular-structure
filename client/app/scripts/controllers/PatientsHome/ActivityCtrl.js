'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:FullcalendarCtrl
 * @description
 * # FullcalendarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivityController', function ($scope, ActivityService, LoginService, $stateParams) {
		var userType = LoginService.getType();

		if (userType === 'patient') {
	    ActivityService.get_all_activity().then(function (activity) {
	    	$scope.activity = activity;
	    });
	  };
	  
		if (userType === 'doctor') {
	    ActivityService.get_all_activity_fromDoc($stateParams['id']).then(function (activity) {
	    	$scope.activity = activity;
	    });
	  }

		if (userType === 'admin') {
	    ActivityService.get_all_activity_fromAdmin($stateParams['id']).then(function (activity) {
	    	$scope.activity = activity;
	    });
	  }
	});