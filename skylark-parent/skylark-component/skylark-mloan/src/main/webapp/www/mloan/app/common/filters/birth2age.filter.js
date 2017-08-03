/**
 * 生日 -> 年龄
 */

(function () {
'use strict';

angular
    .module('common')
    .filter('jnBirthToAge', [
        'jnHelper',
        function (jnHelper) {
            return jnHelper.angularFilter(function (input) {
                return jnHelper.ageFromBirth(input);
            });
        }
    ])
})();
