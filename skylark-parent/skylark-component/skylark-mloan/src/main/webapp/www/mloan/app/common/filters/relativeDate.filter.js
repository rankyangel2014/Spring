(function () {
'use strict';

angular
    .module('common')
    .filter('jnRelativeDate', [
        '$filter',
        'jnHelper',
        function (
            $filter,
            jnHelper
        ) {
            var LOCALE_MAP = {
                ms: '毫秒',
                s: '秒',
                m: '分钟',
                h: '小时',
                d: '天',
                w: '星期',
                n: '月',
                y: '年',
            };

            return jnHelper.angularFilter(function (input, threshold) {
                var now = new Date();
                var date = new Date(input);
                var r;

                threshold = threshold || Infinity;

                if (threshold < Math.abs(now - date)) {
                    return $filter('date')(date, 'yyyy-MM-dd');
                }

                r = jnHelper.relativeDate(now, date);

                if (0 < r.value) {
                    return r.value + LOCALE_MAP[r.unit] + '前';
                }

                return - r.value + LOCALE_MAP[r.unit] + '后';
            });
        }
    ])
})();
