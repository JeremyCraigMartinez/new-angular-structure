'use strict';

angular.module('clientApp')
	.service('RawActivityService', function ($q, LoginService, $http) {
		var currentUser = LoginService.getEmail();
		var userType = LoginService.getType();

		this.get_all_raw_activity = function () {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/raw_data",
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('could not get diets for: '+currentUser);
					deferred.reject(error);
				}
				else {
					console.log(error);
				}
			});
			return deferred.promise;
		};

		this.get_raw_activity = function (timestamp) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/raw_data/"+timestamp,
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('could not get diets for: '+currentUser);
					deferred.reject(error);
				}
				else {
					console.log(error);
				}
			});
			return deferred.promise;
		};

});