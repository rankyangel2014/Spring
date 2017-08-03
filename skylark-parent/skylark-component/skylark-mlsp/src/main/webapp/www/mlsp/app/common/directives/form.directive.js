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
                require: 'form',
                link: function ($scope, $element, $attr) {
                    $element.on('change', function () {
                        jnPage.modified = true;
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
        'jnPage',
        function (jnPage) {
            return {
                template: '<form novalidate ng-transclude></form>',

                replace: true,
                transclude: true,
                restrict: 'E',
                link: function ($scope, $element, $attr) {
                    if (void 0 !== $attr.edit) {
                        $element.on('input', function () {
                            jnPage.modified = true;
                        });
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
