// app/assets/javascripts/app/directives/loginDirectives.js

'use strict';

angular.module('clientApp')
	.directive('userPanel', function() {
		return {
			templateUrl: '/views/partials/user_panel.html',
			controller: function($scope, LoginService, $http, $cookies) {
				var email = LoginService.getEmail();
				$scope.currentUser = (email) ? {email:email} : null;

				$scope.$on("currentUser:set", function(evt, currentUser) {
					$scope.currentUser = currentUser;
					$scope.userType = currentUser.type;
				});

				$scope.$on("currentUser:unset", function(evt, currentUser) {
					$scope.currentUser = null;
					$scope.userType = null;
				});

				$scope.logout = function() {
					LoginService.logout().then(function() {
						$scope.currentUser = null;
						$scope.userType = null;
					});
				};
			}
		};
	});