// app/assets/javascripts/app/controllers/PatientsCtrl.js

'use strict';

angular.module('clientApp')
  .controller('PatientsHomeGraphsController',
    function ($scope) {
			Morris.Line({
			  element: 'line-example',
			  data: [
			    { y: '2006', a: 50,  },
			    { y: '2007', a: 75,   },
			    { y: '2008', a: 50,   },
			    { y: '2009', a: 75,   },
			    { y: '2010', a: 50,   },
			    { y: '2011', a: 75,   },
			    { y: '2012', a: 100,  }
			  ],
			  xkey: 'y',
			  ykeys: ['a', 'b'],
			  labels: ['Series A', 'Series B']
			});
  		$scope.hello="world";
    });