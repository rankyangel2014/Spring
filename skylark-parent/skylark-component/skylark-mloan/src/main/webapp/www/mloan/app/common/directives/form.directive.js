(function () {
'use strict';

angular
    .module('common')
    /**
     * 已废弃，见 jnForm
     */
    .directive('jnEditForm', [
        'jnPage',
        function (jnPage) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attr) {
                    $element.on('change', function () {
                        jnPage.modified = true;
                    });
                },
            };
        }
    ])
    /**
     * 修复 AngularJS 的 bug (#9921)
     */
    .directive('input', [
        function () {
            return {
                restrict: 'E',

                scope: {
                    ngModel: '=',
                },

                link: function ($scope, $element, $attr) {
                    $element.on('blur', function () {
                        if (null == $scope.ngModel) {
                            $scope.ngModel = '';
                        }
                    });
                },
            };
        }
    ])
    /**
     * 表单
     *
     * 用法:
     *      <jn-form>
     *          ...
     *      </jn-form>
     *
     * 参数:
     *      edit: 如果提供此属性并且表单值改变，在离开页面前会请用户确认。
     */
    .directive('jnForm', [
        '$q',
        'jnPage',
        'jnForm',
        'jnHelper',
        function (
            $q,
            jnPage,
            jnForm,
            jnHelper
        ) {
            var validator = function (elem) {
                var form = elem.children()[0];

                return function () {
                    return $q(function (resolve, reject) {
                        var validation = jnForm.validate2(form);

                        if (validation.valid) {
                            resolve();
                        } else {
                            jnHelper.alert(validation.msg, '表单验证失败')
                                .then(reject);
                        }
                    });
                };
            };

            return {
                template: '\
                    <form\
                        novalidate\
                        ng-transclude\
                    ></form>',

                transclude: true,

                restrict: 'E',

                link: function ($scope, $element, $attr) {
                    if (void 0 !== $attr.edit) {
                        $element.on('input', function () {
                            jnPage.modified = true;
                        });
                    }

                    if ($attr.validator) {
                        (function () {
                            var ctrlScope = jn.angular.findCtrlScope($scope);
                            jn.obj.setAttr(ctrlScope, $attr.validator,
                                validator($element));
                        })();
                    }
                },
            };
        }
    ])
    /**
     * 表单项目
     *
     * 用法:
     *      <jn-form-item label="LABEL">
     *          ...
     *      </jn-form-item>
     *
     * 参数:
     *      label: 字符串。必需。表单项目的标题。
     */
    .directive('jnFormItem', [
        function () {
            return {
                template: '\
<jn-form-item-label>{{ label }}</jn-form-item-label>\
<jn-form-item-content ng-transclude></jn-form-item-content>',

                restrict: 'E',
                transclude: true,
                scope: {
                    label: '@',
                },
            };
        }
    ]);

})();
