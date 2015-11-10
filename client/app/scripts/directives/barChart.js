'use strict';

//Sidebar Collapse
angular.module('clientApp')
  .directive('barChart', function() {
    var chart = d3.custom.barChart();
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="chart"></div>',
      scope:{
        height: '=height',
        data: '=data',
        mode: '=mode',
        hovered: '&hovered'
      },
      link: function(scope, element, attrs) {
        var chartEl = d3.select(element[0]);
        chart.on('customHover', function(d, i){
          scope.hovered({args:d});
        });

        scope.$watch('mode', function (newVal, oldVal) {
          var data;
          var calories = [];
          var duration = [];
          for (var i = 0; scope.data && i < scope.data.length; i++) {
            calories.push(scope.data[i].calories_burned);
          }
          for (var i = 0; scope.data && i < scope.data.length; i++) {
            duration.push(scope.data[i].duration);
          }
          if (scope.mode === "see duration") data = duration;
          else data = calories;
          chartEl.datum(data).call(chart);
        });

        scope.$watch('data', function (newVal, oldVal) {
          var data;
          var calories = [];
          var duration = [];
          var dates = [];
          for (var i = 0; scope.data && i < scope.data.length; i++) {
            calories.push(scope.data[i].calories_burned);
            dates.push(scope.data[i].created);
          }
          for (var i = 0; scope.data && i < scope.data.length; i++) {
            duration.push(scope.data[i].duration);
            dates.push(scope.data[i].created);
          }
          if (scope.mode === "see duration") data = duration;
          else data = calories;
          chartEl.datum(data).call(chart);
        });

        scope.$watch('height', function(d, i){
          chartEl.call(chart.height(scope.height));
        });
      }
    } 
  });