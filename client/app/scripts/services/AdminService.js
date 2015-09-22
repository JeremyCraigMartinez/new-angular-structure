'use strict';

angular.module('clientApp')
	.service('AdminService', function ($http, $q) {
		this.patients = function() {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "https://dev.api.wsuhealth.wsu.edu:5025/admin/patients",
			}).
			then(function(res) {
				deferred.resolve(res.data);
			});
			return deferred.promise;
		};
	});