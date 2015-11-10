'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:FullcalendarCtrl
 * @description
 * # FullcalendarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('RawActivityController', function ($scope, RawActivityService, LoginService, $stateParams) {
		var userType = LoginService.getType();

		if (userType === 'patient') {
	    RawActivityService.get_all_raw_activity().then(function (activity) {
	    	$scope.activity = activity;
	    });
	  };
	  
		if (userType === 'doctor') {
	    /*ActivityService.get_all_activity_raw_fromDoc($stateParams['id']).then(function (activity) {
	    	$scope.activity = activity;
	    });*/
	  }

		if (userType === 'admin') {
	    /*ActivityService.get_all_activity_raw_fromAdmin($stateParams['id']).then(function (activity) {
	    	$scope.activity = activity;
	    });*/
	  }
	});