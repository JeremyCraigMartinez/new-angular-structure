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
          scope.hovered({args:scope.data[i].created});
        });

        var func = function (d, mode) {
          var data = [];
          if (mode === "see duration")
            for (var i = 0; d && i < d.length; i++)
              data.push(d[i].calories_burned);
          else
            for (var i = 0; d && i < d.length; i++)
              data.push(d[i].duration);
          return data;
        }

        scope.$watch('mode', function (newVal, oldVal) {
          chartEl.datum(func(scope.data, scope.mode)).call(chart);
        });

        scope.$watch('data', function (newVal, oldVal) {
          chartEl.datum(func(scope.data, scope.mode)).call(chart);
        });

        scope.$watch('height', function(d, i){
          chartEl.call(chart.height(scope.height));
        });
      }
    } 
  });