// app/assets/javascripts/app/directives/loginDirectives.js

'use strict';

angular.module('clientApp')
	.directive('userPanel', function() {
		return {
			templateUrl: '/views/partials/user_panel.html',
			controller: function($scope) {
				
			}
		};
	});