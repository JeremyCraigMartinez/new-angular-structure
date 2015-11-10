'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular.module('clientApp', [
	'ngSanitize',
	'ngResource',
	'ngAria',
	'ngMessages',
	'ngAnimate',
	'ngTouch',
  'ui.calendar',
  'ui.bootstrap',
  'ui.router',
  'cookiesProvider',
  'angular.morris-chart',
  'ui.utils'
])
  .config(function ($locationProvider) {
  	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
  	});
	});