/**
 * 把常量的值转化成名称
 *
 * 参数
 *     num: 常量的序号
 *
 * 示例
 *     {{ 1 | jnConstant :5028 }} // '企业'
 */

(function () {
'use strict';

angular
    .module('common')
    .filter('jnConstant', [
        'jnConstant',
        function (jnConstant) {
            return function (input, num) {
                return jnConstant.get(num)[input];
            };
        }
    ])
    .filter('jnConstantList', [
        'jnConstant',
        function (jnConstant) {
            return function (input, num, delim) {
                if (! input) {
                    return '';
                }

                delim = delim || ',';

                return input.split(delim).map(function (e) {
                    e = e.replace(/^'(.+)'$/, '$1');
                    return jnConstant.get(num)[e];
                }).join(delim);
            };
        }
    ])
    .filter('jnConstantAbbr', [
        'jnConstant',
        function (jnConstant) {
            return function (input, num) {
                return jnConstant.getAbbr(num)[input];
            };
        }
    ]);

})();
