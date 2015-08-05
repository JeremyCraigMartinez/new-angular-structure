'use strict';

//Sidebar Collapse
angular.module('clientApp')
  .directive('custom-navbar', function() {
    return {
      templateUrl: '/views/partials/user_panel.html',
    };
  });