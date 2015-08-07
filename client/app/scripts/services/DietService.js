'use strict';

angular.module('clientApp')
	.service('DietService', function ($q, LoginService, $http) {
		var currentUser = LoginService.getEmail();
		var userType = LoginService.getType();

		this.get_diets = function () {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/diet",
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

		this.get_diet = function (timestamp) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/diet/"+timestamp,
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

		this.post_diet = function(info) {
			var deferred = $q.defer();

			$http({
				method: "POST",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/diet",
				data: info
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				console.log('diet creation error');
				console.log(error);
				deferred.resolve(error, null);
			});
			return deferred.promise;
		};

		this.put_diet = function(info, timestamp) {
			var deferred = $q.defer();

			$http({
				method: "PUT",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/diet/"+timestamp,
				data: info
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				console.log('diet creation error');
				console.log(error);
				deferred.resolve(error, null);
			});
			return deferred.promise;
		};

		this.diets_remove = function (timestamp) {
			var deferred = $q.defer();
			$http({
				method: "DELETE",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/diet/"+timestamp,
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

		// diet calls for doctors to use
		this.get_diets_fromDoc = function (patient_email) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/diet/doctor/"+patient_email,
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

		this.get_diet_fromDoc = function (timestamp, patient_email) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/diet/doctor/"+patient_email+"/"+timestamp,
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