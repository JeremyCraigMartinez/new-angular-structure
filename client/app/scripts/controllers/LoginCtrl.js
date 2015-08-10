'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginController', function ($scope, $state, $q, GroupService, LoginService, DoctorService, Base64, ProfileService) {
			$scope.signup = {};
			$scope.login = {};

			DoctorService.doctors().then(function (doctors) {
				var all = [];
				for (var doctor in doctors) {
					all.push(DoctorService.info(doctors[doctor]));
				}
				$q.all(all).then(function (doctors_info) {
					for (var doctor in doctors_info) {
						doctors_info[doctor].full_name = doctors_info[doctor].first_name + " " + doctors_info[doctor].last_name;
					}
					$scope.list_of_doctors = doctors_info;
				});
			});

			$scope.user = LoginService.getEmail();

			GroupService.groups().then(function(groups) {
				$scope.groups = [];
				for (var group in groups) {
					$scope.groups.push(groups[group]._id);
				}
			});

			$scope.remove_group = function (group) {
				$scope.signup.group = null;
				$scope.groups.push(group);
				$scope.selected_groups.splice($scope.selected_groups.indexOf(group),1);
			};

			$scope.selected_groups = [];
			$scope.setGroup = function(group){
				$scope.groups.splice($scope.groups.indexOf(group),1);
				$scope.selected_groups.push(group);
			};

			$scope.submit = function () {
				if ($scope.new_member) {
					var member_info = {};
					for (var each in $scope.signup) {
						member_info[each] = $scope.signup[each];
					}
					member_info.email = $scope.signup.email;
					member_info.password = $scope.signup.pass;
					$scope.submitSignup(member_info);
				}
				else {
					$scope.submitLogin($scope.signup);
				}
			};

			$scope.submitSignup = function (signup) {
				if (signup.type === "doctor") {
					DoctorService.add_doctor(signup).then(function (error, data) {
						console.log(signup.email);
						console.log(signup.pass);
						LoginService.login(signup.email, signup.pass).then(function (user) {
							if (user===false) {
								$scope.failedLogin=true;
								$state.go('login');
							}
							else {
								$scope.user = user;
								$state.go('app');
							}
						});
					});
				}
				else if (signup.type === "patient") {
					signup.doctor = signup.doctor.email;
					signup.group = $scope.selected_groups;
					ProfileService.add_patient(signup).then(function (error, data) {
						console.log(signup.email);
						console.log(signup.pass);
						LoginService.login(signup.email, signup.pass).then(function (user) {
							if (user===false) {
								$scope.failedLogin=true;
								$state.go('login');
							}
							else {
								$scope.user = user;
								$state.go('app');
							}
						});
					});
				}
			};

			$scope.submitLogin = function() {
				LoginService.login($scope.signup.email, $scope.signup.pass).then(function (err, user) {
					if (err) {
						$scope.failedLogin=true;
						$state.go('login');
					}
					else {
						var type = LoginService.getType();
						console.log(type);
						if (type === "doctor") { $state.go('app'); }
						else if (type === "admin") { $state.go('app'); }
						else if (type === "patient") { $state.go('app'); }
					}
				});
			};

		});