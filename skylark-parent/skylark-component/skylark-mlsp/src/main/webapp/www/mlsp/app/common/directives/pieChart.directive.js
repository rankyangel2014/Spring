/**
 * 饼状图
 *
 * 用法:
 *      <jn-pie-chart
 *          value="42.5"
 *      ></jn-pie-chart>
 *
 * 参数:
 *      value: 浮点数。必需。百分比。
 */
(function () {
'use strict';

angular
    .module('common')
    .directive('jnPieChart', [
        function () {
            return {
                restrict: 'E',
                scope: {
                    value: '@',
                },

                link: function ($scope, $element, $attr) {
                    var NS = 'http://www.w3.org/2000/svg';
                    var svg = document.createElementNS(NS, 'svg');
                    var circle = document.createElementNS(NS, 'circle');
                    circle.setAttribute('r', 16);
                    circle.setAttribute('cx', 16);
                    circle.setAttribute('cy', 16);
                    circle.setAttribute('stroke-dasharray',
                        $scope.value + ' 100');
                    svg.setAttribute('viewBox', '0 0 32 32');
                    svg.appendChild(circle);
                    $element.append(svg);
                },
            };
        }]
    );

})();
