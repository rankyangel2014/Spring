(function () {
'use strict';

angular
    .module('common')
    .directive('jnInputImage', [
        function (
        ) {
            return {
                template: '\
                    <input\
                        name="{{ name }}"\
                        type="file"\
                        accept="image/*"\
                        multiple\
                        ng-if="multiple"\
                        ng-model="dummy"\
                        ng-readonly="ngReadonly"\
                        ng-disabled="ngDisabled"\
                        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"\
                    />\
                    <input\
                        name="{{ name }}"\
                        type="file"\
                        accept="image/*"\
                        ng-if="! multiple"\
                        ng-model="dummy"\
                        ng-readonly="ngReadonly"\
                        ng-disabled="ngDisabled"\
                        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"\
                    />',

                restrict: 'E',

                scope: {
                    ngReadonly: '=',
                    ngDisabled: '=',
                    ngModel: '=',
                    ngChange: '&',
                    name: '@',
                },

                link: function ($scope, $element, $attr) {
                    if (void 0 !== $attr.multiple) {
                        $scope.multiple = true;
                    }

                    $element.on('change', function (e) {
                        $scope.$apply(function () {
                            $scope.ngModel = e.target.files;
                        });

                        $scope.ngChange();
                    });
                },
            };
        }
    ]);

})();
