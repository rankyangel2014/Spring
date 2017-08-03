(function () {
'use strict';

angular
    .module('common')
    .directive('jnInputSearch', [
        '$timeout',
        function (
            $timeout
        ) {
            return {
                template: '\
<div class="bar bar-header item-input-inset">\
    <div class="item-input-wrapper">\
        <i class="icon ion-ios-search-strong placeholder-icon"></i>\
        <input\
            type="search"\
            name="{{ name }}"\
            ng-model="ngModel"\
            ng-change="ngChange"\
            ng-readonly="ngReadonly"\
            ng-disabled="ngDisabled"\
            placeholder="{{ placeholder }}"\
        />\
    </div>\
</div>',

                restrict: 'E',

                scope: {
                    ngReadonly: '=',
                    ngDisabled: '=',
                    ngChange: '=',
                    ngModel: '=',
                    search: '=',
                    delay: '=',
                    name: '@',
                    placeholder: '@',
                },

                link: function ($scope, $element, $attr) {
                    var t;

                    $element.on('input', function (e) {
                        $timeout.cancel(t);

                        t = $timeout(function () {
                            $scope.search(e.target.value);
                        }, Number($scope.delay));
                    });
                },
            };
        }
    ]);

})();
