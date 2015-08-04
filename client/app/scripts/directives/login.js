// app/assets/javascripts/app/directives/loginDirectives.js

'use strict';

angular.module('clientApp')
	.directive('userPanel', function () {
		return {
			templateUrl: '/views/partials/user_panel.html',
			controller: function($scope, LoginService, $http, $cookies, $state) {
				var email = $cookies.get('email');
				var type = $cookies.get('type');
				$scope.currentUser = (email) ? {email:email} : null;
				$scope.userType = (type) ? type : null;

				$scope.$on("currentUser:set", function (evt, currentUser) {
					$scope.currentUser = currentUser;
					$scope.userType = currentUser.type;
				});

				$scope.$on("currentUser:unset", function (evt) {
					$scope.currentUser = null;
					$scope.userType = null;
				});

				$scope.logout = function () {
					LoginService.logout().then(function() {
						$scope.currentUser = null;
						$scope.userType = null;
						$state.go('app');
					});
				};

				$scope.dashboard = function () {
					console.log($scope.userType);
					console.log(typeof $scope.userType);
					if ($scope.userType === 'doctor') { $state.go('doctors_home') }
					else if ($scope.userType === 'admin') { $state.go('app') }
					else if ($scope.userType === 'patient') { $state.go('patients_home') }
				};
			}
		};
	});