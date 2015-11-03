'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:FullcalendarCtrl
 * @description
 * # FullcalendarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('DietAndFoodController', function ($scope, DietService) {
    DietService.get_diets().then(function (diets) {
    	$scope.diets = diets;
    });
});