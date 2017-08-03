/**
 * 身份证号码 -> 年龄
 */

(function () {
'use strict';

angular
    .module('common')
    .filter('jnIdToAge', [
        'jnHelper',
        function (jnHelper) {
            return jnHelper.angularFilter(function (input) {
                return jnHelper.ageFromId(input);
            });
        }
    ])
})();
