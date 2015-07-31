'use strict';

var clientApp = angular.module('clientApp', ["oc.lazyload"]);
clientApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider){
	$ocLazyLoadProvider.config({
		debug: true,
		events: true,
		modules: [{
			name: 'state1',
			files: ['scripts/controllers/state1.js']
		}]
	});
}]);