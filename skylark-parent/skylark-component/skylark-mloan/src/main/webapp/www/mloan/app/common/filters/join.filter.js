(function () {
'use strict';

angular
    .module('common')
    .filter('jnJoin', [
        'jnHelper',
        function (jnHelper) {
            return jnHelper.angularFilter(function (input, sep) {
                return input.join(sep);
            });
        }
    ])
})();
