'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:FullcalendarCtrl
 * @description
 * # FullcalendarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivityController', function ($scope, ActivityService) {
  	console.log('funcs should exist');
    ActivityService.get_all_activity().then(function (activity) {
    	$scope.activity = activity;
    });
});