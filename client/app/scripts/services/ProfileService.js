'use strict';

angular.module('clientApp')
	.service('ProfileService', function($http, $q) {
		this.add_patient = function(info) {
			var deferred = $q.defer();
			$http({
				method: "POST",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/patients",
				data: info
			})
			.then(function(res) {
				deferred.resolve(null, res.data);
			})
			.catch(function(error) {
				console.log('patient signup error');
				console.log(error);
				deferred.resolve(error, null);
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
	});