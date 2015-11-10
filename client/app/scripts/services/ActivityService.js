'use strict';

angular.module('clientApp')
	.service('ActivityService', function ($q, LoginService, $http) {
		var currentUser = LoginService.getEmail();
		var userType = LoginService.getType();

		var self = this;
		this.activity_for_all_users = function () {
			var deferred = $q.defer();
			var func;
			if (userType === 'patient') func = self.get_all_activity;
		  else if (userType === 'doctor') func = self.get_all_activity_fromDoc;
		  else if (userType === 'admin') func = self.get_all_activity_fromAdmin;
	  	func().then(function (activity) {
	  		deferred.resolve(activity);
	  	});
	  	return deferred.promise;
		}

		this.get_all_activity = function () {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/data",
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

		this.get_activity = function (timestamp) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/data/"+timestamp,
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

		this.get_all_activity_fromDoc = function (patient_email) {
			var deferred = $q.defer();
			console.log("https://dev.api.wsuhealth.wsu.edu:5025/doctor/data/"+patient_email);
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/doctor/data/"+patient_email,
			})
			.then(function(res) {
				console.log(res.data);
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

		this.get_activity_fromDoc = function (timestamp, patient_email) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/doctor/data/"+patient_email+"/"+timestamp,
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

		this.get_all_activity_fromAdmin = function (patient_email) {
			var deferred = $q.defer();
			console.log(patient_email);
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/admin/data/"+patient_email,
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

		this.get_activity_fromAdmin = function (timestamp, patient_email) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/admin/data/"+patient_email+"/"+timestamp,
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