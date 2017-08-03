(function () {
'use strict';

angular
    .module('common')
    .directive('jnSelectIntrade', [
        'jnSelectIntrade',
        function (
            jnSelectIntrade
        ) {
            return {
                template: '\
                    <input\
                        type="text"\
                        name="name"\
                        ng-model="label"\
                        readonly\
                        placeholder="{{ placeholder }}"\
                    />',
                restrict: 'E',
                scope: {
                    ngReadonly: '=',
                    ngDisabled: '=',
                    ngChange: '&',
                    ngModel: '=',
                    label: '=',
                    name: '@',
                    placeholder: '@',
                },
                link: function ($scope, $element, $attr) {

                    $element.on('click', function () {
                        if ($scope.ngReadonly || $scope.ngDisabled) {
                            return;
                        }

                        jnSelectIntrade.open(function (selected) {
                            $scope.ngModel = selected.code;
                            $scope.label = selected.name;

                            // 如果不使用 setTimeout，
                            // 则在 ngChange() 的回调中 ngModel 是旧值
                            setTimeout(function () {
                                $scope.ngChange();
                            }, 50);
                        });
                    });
                },
            };
        }
    ])
    .directive('jnSelectIntradeCategory', [
        'jnHelper',
        'jnHttp',
        function (
            jnHelper,
            jnHttp
        ) {
            /**
             * level
             * levelCode
             */
            var readCategories = function (params) {
                return jnHttp.post(
                    '/mloan/router/rest/param.do?method=getIntradeCodeInfo',
                    {
                        level: params.level,
                        levelCode: params.levelCode,
                    }
                ).then(function (rsp) {
                    return rsp.root.map(function (e) {
                        return jnHelper.refine(e, [
                            'levelCode',
                            'typeName',
                        ]);
                    });
                });
            };

            return {
                template: '\
<select\
    name="{{ name }}"\
    ng-model="ngModel"\
    ng-disabled="ngDisabled"\
    ng-required="ngRequired"\
>\
    <option value="">-- 请选择 --</option>\
    <option\
        ng-repeat="e in options"\
        value="{{ e.levelCode }}"\
    >{{ e.typeName }}</option>\
</select>',

                restrict: 'E',

                scope: {
                    name: '@',
                    level: '=',
                    parent: '=',
                    ngModel: '=',
                    ngReadonly: '=',
                    ngDisabled: '=',
                },

                link: function ($scope, $element, $attr) {
                    var update = function () {
                        if (1 === $scope.level || $scope.parent) {
                            readCategories({
                                level: $scope.level,
                                levelCode: $scope.parent,
                            }).then(function (rsp) {
                                $scope.options = rsp;
                            });
                        }
                    };

                    $scope.$watch('parent', update);
                },
            };
        }
    ]);

})();
