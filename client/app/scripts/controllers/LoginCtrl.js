'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginController', function ($scope) {
  	console.log('here');
  	$scope.func = function () {
  		alert('hello');
  	}
  });
