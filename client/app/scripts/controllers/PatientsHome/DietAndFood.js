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
  	console.log('funcs should exist');
    DietService.get_diets().then(function (diets) {
    	$scope.diets = diets;
    });

    $scope.activity = [
    {
    	name: 'treadmill',
    	calories: 55,
    	created: '3afre87'
    },
    {
    	name: 'bike',
    	calories: 103,
    	created: 'march 5'
    },
    {
    	name: 'bench press',
    	calories: 45,
    	created: 'monday'
    }];

    $scope.show = "diet";

    $scope.showDiet = function () {
    	$scope.show = "diet";
    }
    $scope.showActivity = function () {
    	$scope.show = "activity";
    }

});