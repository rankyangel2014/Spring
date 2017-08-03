/**
 * 身份证号码 -> 生日
 */

(function () {
'use strict';

angular
    .module('common')
    .filter('jnIdToBirth', [
        'jnHelper',
        function (jnHelper) {
            return jnHelper.angularFilter(function (input) {
                return jnHelper.birthFromId(input);
            });
        }
    ])
})();
