(function () {
'use strict';

[
    'positive',
    'negative',
    'integer',
    'decimalPrecision',
    'alpha',
    'alphaNum',
    'ip',
    'email',
    'weChat',
    'qq',
    'postcode',
    'chinese',
    'tel',
    'phone',
    'mobile',
    'age',
    'inputLength',
    'idNo',
    'regNo',
    'bankNo',
    'range',
    'orgNo'
].forEach(function (name) {
    var module = angular.module('common');

    // 用闭包“固定”
    (function (name) {
        var dirName = 'jn' + name[0].toUpperCase() + name.slice(1);
        module.directive(dirName, [
            'jnValidate',
            function (jnValidate) {
                var fn = jnValidate[name];

                return {
                    require: 'ngModel',
                    link: function ($scope, $element, $attr, $ctrl) {
                        $ctrl.$validators[dirName] = function (mv, vv) {
                            if ($ctrl.$isEmpty(mv)) {
                                return true;
                            }

                            return fn(vv, $attr[dirName]);
                        }
                    },
                };
            }
        ]);
    })(name);
});

})();
