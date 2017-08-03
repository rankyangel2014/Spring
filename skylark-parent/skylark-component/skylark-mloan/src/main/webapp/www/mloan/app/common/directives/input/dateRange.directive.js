/**
 * 日期区间输入
 *
 * 用法:
 *      <jn-input-date-range
 *          ng-model-start="MODEL_START"
 *          ng-model-end="MODEL_END"
 *      ></jn-input-date-range>
 *
 * 参数:
 *      model-start: 模型。必需。
 *      model-end: 模型。必需。
 */
(function () {
'use strict';

angular
    .module('common')
    .directive('jnInputDateRange', [
        'jnUser',
        function (jnUser) {
            return {
                template: '\
<div>\
    <button ng-click="calcDate(1)">1个月内</button>\
    <button ng-click="calcDate(3)">3个月内</button>\
</div>\
<div>\
    <jn-input-date\
        ng-model="ngModelStart"\
        placeholder="起始日期"\
        style="width: 5.5em;"\
    ></jn-input-date>\
    <jn-input-date\
        ng-model="ngModelEnd"\
        placeholder="截止日期"\
        style="width: 5.5em;"\
    ></jn-input-date>\
</div>',

                restrict: 'E',
                scope: {
                    ngModelStart: '=',
                    ngModelEnd: '=',
                },

                link: function ($scope, $element, $attr) {
                    $scope.calcDate = function (m) {
                        var jyrq = jnUser.jyrq.replace(
                            /(\d\d\d\d)(\d\d)(\d\d)/, '$1-$2-$3');
                        var endDate = new Date(jyrq);
                        var startDate = new Date(endDate);

                        startDate.setMonth(endDate.getMonth() - m);

                        // 若目标月份不存在该日期，则置为最后一日
                        if (startDate.getDate() !== endDate.getDate()) {
                            startDate.setDate(0);
                        }

                        $scope.ngModelStart = startDate;
                        $scope.ngModelEnd = endDate;
                    };
                },
            };
        }]
    );

})();
