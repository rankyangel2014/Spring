/**
 * 日期区间输入
 *
 * 用法:
 *      <jn-date-range
 *          model-start="MODEL_START"
 *          model-end="MODEL_END"
 *      ></jn-date-range>
 *
 * 参数:
 *      model-start: 模型。必需。
 *      model-end: 模型。必需。
 */
(function () {
'use strict';

angular
    .module('common')
    .directive('jnDateRange', [
        'jnUser',
        function (jnUser) {
            return {
                template: '\
<div>\
    <button ng-click="calcDate(1)">1个月内</button>\
    <button ng-click="calcDate(3)">3个月内</button>\
</div>\
<div>\
    <input\
        type="date"\
        ng-model="modelStart"\
    />\
    <input\
        type="date"\
        ng-model="modelEnd"\
    />\
</div>',

                restrict: 'E',
                scope: {
                    modelStart: '=',
                    modelEnd: '=',
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

                        $scope.modelStart = startDate;
                        $scope.modelEnd = endDate;
                    };
                },
            };
        }]
    );

})();
