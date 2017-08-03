(function () {
'use strict';

angular
    .module('common')
    .directive('jnBack', [
        'jnPage',
        function (jnPage) {
            return {
                template: '\
<ion-nav-buttons side="left">\
    <button\
        class="button button-clear ion-chevron-left jnBack"\
        ng-click="back()"\
    >返回</button>\
</ion-nav-buttons>',

                replace: true,

                link: function ($scope, $element, $attr) {
                    $scope.back = function () {
                        jnPage.back();
                    };
                },
            };
        }]
    );

})();
