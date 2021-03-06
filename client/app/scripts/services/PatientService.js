'use strict';

angular.module('clientApp')
	.service('PatientService', function ($http, $q) {
		this.patients = function() {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/list_of_patients",
			}).
			then(function(res) {
				deferred.resolve(res.data);
			});
			return deferred.promise;
		};

		this.info = function(id) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/patients",
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('patients: '+id+' has no info');
					deferred.reject(error);
				}
				else {
					console.log(error);
				}
			});
			return deferred.promise;
		};

		this.patient_info = function(id) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/patients/"+id,
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('patients: '+id+' has no info');
					deferred.reject(error);
				}
				else {
					console.log(error);
				}
			});
			return deferred.promise;
		};

		this.update_info = function(new_info) {
			var deferred = $q.defer();
			$http({
				method: "PUT",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/patients/update_info",
				data: new_info
			})
			.then(function(res) {
				console.log(new_info);
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('could not update info');
					deferred.reject(error);
				}
				else {
					console.log(error);
				}
			});
			return deferred.promise;
		};

		this.update_account = function(new_info) {
			var deferred = $q.defer();
			console.log(new_info);
			
			$http({
				method: "PUT",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/patients/update_account",
				data: new_info
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('could not update account info');
					deferred.reject(error);
				}
				else {
					console.log(error);
				}
			});
			return deferred.promise;
		};
		
		this.remove = function(id) {
			var deferred = $q.defer();
			$http({
				method: "DELETE",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/patients/remove",
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('unable to remove patient: '+id);
					deferred.reject(error);
				}
				else {
					console.log(error);
				}
			});
			return deferred.promise;
		};
	});