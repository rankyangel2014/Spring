/**
 * 多选控件
 */

(function () {
'use strict';

angular
    .module('common')
    .directive('jnMultiSelect', [
        'jnHelper',
        'jnMultiSelect',
        function (
            jnHelper,
            jnMultiSelect
        ) {
            var makeOptions = function (valLabelMap, selected, alwaysSelected) {
                var options = [];
                var value, re, isSelected, isAlwaysSelected;

                for (value in valLabelMap) {
                    re = RegExp('\\b' + value + '\\b');
                    isSelected = re.test(selected);
                    isAlwaysSelected = re.test(alwaysSelected);

                    options.push({
                        value: value,
                        label: valLabelMap[value],
                        selected: isSelected || isAlwaysSelected,
                        readonly: isAlwaysSelected,
                    });
                }

                return options;
            };

            var arrFromStr = function (str) {
                if (str) {
                    return String(str).match(/\w+/g);
                }

                return [];
            };

            var arrFromModel = function (model) {
                if (model) {
                    return model.split(',').map(function (e) {
                        return e.replace(/^'(.*)'$/, '$1');
                    });
                }

                return [];
            };

            var modelFromArr = function (arr) {
                return arr.map(function (e) {
                    return "'" + e + "'";
                }).join();
            };

            return {
                template: '\
                    <input\
                        type="text"\
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
                    alwaysSelected: '=',
                    placeholder: '@',
                    options: '=',
                },
                link: function ($scope, $element, $attr) {
                    var updateView = function (mv) {
                        var model = arrFromModel(mv);

                        $scope.label = model.map(function (value) {
                            return $scope.options[value];
                        }).join();
                    };

                    $scope.$watch('ngModel', updateView);

                    var model = jnHelper.arrayUnique(
                        arrFromModel($scope.ngModel),
                        arrFromStr($scope.alwaysSelected)
                    );

                    // 把 always-selected 属性的值合并到模型
                    $scope.ngModel = modelFromArr(model);

                    $element.on('click', function () {
                        if ($scope.ngReadonly || $scope.ngDisabled) {
                            return;
                        }

                        var model = arrFromModel($scope.ngModel);
                        var alwaysSelected = arrFromStr($scope.alwaysSelected);

                        var options = makeOptions(
                            $scope.options, model, alwaysSelected);

                        jnMultiSelect.open({
                            options: options,
                            callback: function (values, labels) {
                                $scope.ngModel = modelFromArr(values);

                                // 如果不使用 setTimeout，
                                // 则在 ngChange() 的回调中 ngModel 是旧值
                                setTimeout(function () {
                                    $scope.ngChange();
                                }, 50);
                            },
                        });
                    });
                },
            };
        }
    ]);

})();
