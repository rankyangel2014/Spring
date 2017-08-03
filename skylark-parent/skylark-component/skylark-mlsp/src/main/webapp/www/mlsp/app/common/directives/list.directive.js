(function () {
'use strict';

angular
    .module('common')
    .directive('jnList', [
        function () {
            return {
                templateUrl: 'app/common/directives/list.directive.html',
                transclude: true,
                scope: {
                    model: '=model',
                    more: '=more',
                },
                link: function ($scope, $element, $attr) {

                },
                compile: function ($element, $attr) {
                    return {
                        pre: function ($scope, $element, $attr) {
                            1;
                        },
                        post: function ($scope, $element, $attr) {
                            1;
                        },
                    };
                },
            };
        }]
    );

})();
