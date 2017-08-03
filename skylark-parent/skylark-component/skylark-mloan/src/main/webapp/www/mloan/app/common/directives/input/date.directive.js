(function () {
'use strict';

angular
    .module('common')
    .directive('jnInputDate', [
        'jnApp',
        function (
            jnApp
        ) {
            var isDate = function (obj) {
                return Object.prototype.toString.call(obj) === '[object Date]';
            };

            var strFromDate = function (date, delim) {
                var y, m, d;

                delim = delim || '';

                if (date) {
                    y = String(date.getFullYear());

                    m = String(date.getMonth() + 1);
                    if (m.length === 1) {
                        m = '0' + m;
                    }

                    d = String(date.getDate());
                    if (d.length === 1) {
                        d = '0' + d;
                    }

                    return y + delim + m + delim + d;
                }
            };

            var dateFromStr = function (str) {
                if (! str) {
                    return null;
                }

                return new Date(str.replace(
                    /(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/, '$1-$2-$3'));
            };

            return {
                template: '\
                    <input\
                        name="{{ name }}"\
                        type="date"\
                        ng-model="value"\
                        ng-readonly="ngReadonly"\
                        ng-disabled="ngDisabled"\
                    />\
                    <label>{{ label }}</label>',

                restrict: 'E',

                scope: {
                    ngReadonly: '=',
                    ngDisabled: '=',
                    ngModel: '=',
                    delim: '=',
                    name: '@',
                    placeholder: '@',
                },

                link: function ($scope, $element, $attr) {
                    var ph = $scope.placeholder || 'yyyy-mm-dd';

                    if ('Desktop' === jnApp.platform) {
                        $element.addClass('desktop');
                    }

                    $scope.$watch('ngModel', function (newVal) {
                        if (isDate(newVal)) {
                            $scope.value = newVal;
                        } else {
                            $scope.value = dateFromStr(newVal);
                        }
                    });

                    $scope.$watch('value', function (newVal) {
                        $scope.ngModel = strFromDate(newVal, $scope.delim);

                        if (newVal) {
                            $scope.label = strFromDate(newVal, '-');
                            $element.removeClass('placeholder');
                        } else {
                            $scope.label = ph;
                            $element.addClass('placeholder');
                        }
                    });
                },
            };
        }
    ]);

})();
