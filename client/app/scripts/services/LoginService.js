'use strict';

angular.module('clientApp')
	.service('LoginService', 
		function($q, $cookies, $rootScope, $location, $http, $state, Base64) {
			this._user = null;
			var service = this;

			var email = null;
			var password = null;
			var type = null;

			this.login = function(email, password) {
				var deferred = $q.defer();

				$http({
					method: "POST",
					url: "https://dev.api.wsuhealth.wsu.edu:5025/auth",
					data: {email:email,password:password}
				})
				.then(function (res) {
					service.setToken(email, password, res.data.type);
					deferred.resolve(null, res.data);
				})
				.catch(function (error) {
					service.setToken(null);
					console.log('auth failed for '+email+":"+password);
					deferred.resolve(error, null);
				});

				return deferred.promise;
			};

			this.authenticated = function(email, password) {
				var deferred = $q.defer();

				$http({
					method: "POST",
					url: "https://dev.api.wsuhealth.wsu.edu:5025/auth",
					data: {email:email,password:password}
				})
				.then(function (res) {
					deferred.resolve(true);
				})
				.catch(function (error) {
					deferred.resolve(false);
				});

				return deferred.promise;
			};

			this.setToken = function (newEmail, newPassword, newType) {
				type = newType;
				email = newEmail;
				console.log(newType);

				if (newType != null) {
					//var expireDate = new Date();
					//expireDate.setSeconds(expireDate.getSeconds()+5);
					$cookies.put("type",newType/*,{'expires':expireDate}*/);
					$cookies.put("email",newEmail/*,{'expires':expireDate}*/);

					var authdata = Base64.encode(newEmail+':'+newPassword);
					$cookies.putObject('currentUser', { username: newEmail, authdata: authdata });
					$rootScope.globals = {
						currentUser: {
							username: newEmail,
							authdata: authdata
						}
					}
					$http.defaults.headers.common['Authorization'] = 'Basic '+authdata;

					$rootScope.$broadcast("currentUser:set", {type:$cookies.get('type'),email:$cookies.get('email')});
					return true;					
				}
				else {
					$cookies.remove("type");
					$cookies.remove("email");
					$cookies.remove("password");

					$rootScope.$broadcast("currentUser:unset");

					$http.defaults.headers.common['Authorization'] = 'Basic '+null;
					return false;
				}
				
			};

			this.getType = function () {
				return $cookies.get('type');
			};

			this.getEmail = function () {
				return $cookies.get('email');
			};

			this.logout = function() {
				var deferred = $q.defer();				
				service.setToken(null);
				deferred.resolve(null);
				return deferred.promise;
			};
		});