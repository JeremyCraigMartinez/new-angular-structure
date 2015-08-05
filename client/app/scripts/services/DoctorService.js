'use strict';

angular.module('clientApp')
	.service('DoctorService', function($http, $q, LoginService) {
		this.doctors = function(id) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/doctors",
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('doctors: '+id+' has no info');
					deferred.reject(error);
				}
				else {
					console.log(error);
				}
			});
			return deferred.promise;
		};
 
		this.add_doctor = function(info) {
			var deferred = $q.defer();

			$http({
				method: "POST",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/doctors",
				data: info
			})
			.then(function(res) {
				LoginService.login(info.email, info.password).then(function (user) {
					deferred.resolve(null, res.data);
				});
			})
			.catch(function(error) {
				console.log('doctor signup error');
				console.log(error);
				deferred.resolve(error, null);
			});
			return deferred.promise;
		};

		this.info = function(id) {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/doctors/"+id,
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('doctors: '+id+' has no info');
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
				url: "https://dev.api.wsuhealth.wsu.edu:5025/doctors/update_info",
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
				url: "https://dev.api.wsuhealth.wsu.edu:5025/doctors/update_account",
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
				url: "https://dev.api.wsuhealth.wsu.edu:5025/doctors/remove",
			})
			.then(function(res) {
				deferred.resolve(res.data);
			})
			.catch(function(error) {
				if (error.status === 404) {
					console.log('unable to remove doctor: '+id);
					deferred.reject(error);
				}
				else {
					console.log(error);
				}
			});
			return deferred.promise;
		};

	});