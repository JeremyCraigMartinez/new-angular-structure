'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:FullcalendarCtrl
 * @description
 * # FullcalendarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('DietAndFoodController', function ($scope, LoginService, DietService, $stateParams) {
		var userType = LoginService.getType();

		if (userType === 'patient') {
	    DietService.get_diets().then(function (diets) {
	    	$scope.diets = diets;
	    });
	  }
	  
		if (userType === 'doctor') {
	    DietService.get_diets_fromDoc($stateParams['id']).then(function (diets) {
	    	$scope.diets = diets;
	    });
	  }
	  
		if (userType === 'admin') {
	    DietService.get_diets_fromAdmin($stateParams['id']).then(function (diets) {
	    	$scope.diets = diets;
	    });
	  }
	  
});