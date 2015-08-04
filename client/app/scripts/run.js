var clientApp = angular.module('clientApp');
clientApp.run(function ($cookies, $http, $rootScope, $location, $state) {
	// keep user logged in after page refresh
  $rootScope.globals = {};
  $rootScope.globals.currentUser = $cookies.get('currentUser') || null;
  if ($rootScope.globals.currentUser) {
  	$rootScope.globals.currentUser = JSON.parse($rootScope.globals.currentUser);
    $http.defaults.headers.common['Authorization'] = 'Basic '+$rootScope.globals.currentUser.authdata; // jshint ignore:line
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in
      if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $state.go('login');
      }
  });
});