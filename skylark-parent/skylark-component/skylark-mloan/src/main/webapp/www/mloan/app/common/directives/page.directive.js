(function () {
'use strict';

angular
    .module('common')
    .directive('jnPage', [
        function () {
            var isUpperCase = function (c) {
                return /[A-Z]/.test(c);
            };

            var idFromCtrl = function (name) {
                var id = 'jn';

                Array.prototype.forEach.call(name, function (c) {
                    if (isUpperCase(c)) {
                        id += '-' + c.toLowerCase();
                    } else {
                        id += c;
                    }
                });

                return id;
            };

            return {
                restrict: 'A',

                link: function ($scope, $element, $attr) {
                    var ctrlScope = jn.angular.findCtrlScope($scope);
                    var id = idFromCtrl(ctrlScope.__controller__);
                    $element.prop('id', id).addClass('jn-page');
                },
            };
        }]
    );

})();
