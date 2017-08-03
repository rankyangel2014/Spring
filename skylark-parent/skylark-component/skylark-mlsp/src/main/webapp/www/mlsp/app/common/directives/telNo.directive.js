/**
 * 电话链接
 *
 * 用法:
 *      <jn-tel-no num="13913913913"></jn-tel-no>
 *
 * 参数:
 *      num: 字符串。必需。号码。
 *      disabled: 如果提供，则不可拨打。
 *      hide-num: 如果提供，则不显示号码。
 */

(function () {
'use strict';

angular
    .module('common')
    .directive('jnTelNo', [
        '$ionicActionSheet',
        '$cordovaClipboard',
        'jnPhone',
        function (
            $ionicActionSheet,
            $cordovaClipboard,
            jnPhone
        ) {
            var validTelNo = function (num) {
                // 简单验证，待改进
                return /^\d[\d- ]*\d$/.test(num);
            };

            var showActionSheet = function (num) {
                var onClick = [
                    function () {
                        /*
                        var anchor = document.createElement('a');
                        anchor.href = 'tel:' + num;
                        anchor.click();
                        */
                        jnPhone.call(num);
                    },
                    function () {
                        /*
                        var anchor = document.createElement('a');
                        anchor.href = 'sms:' + num;
                        anchor.click();
                        */
                        jnPhone.sms(num);
                    },
                    function () {
                        $cordovaClipboard.copy(num);
                    }
                ];

                var hide = $ionicActionSheet.show({
                    buttons: [{
                        text: '呼叫 ' + num,
                    }, {
                        text: '发送信息',
                    }, {
                        text: '复制',
                    }],
                    cancelText: '取消',
                    buttonClicked: function (i) {
                        onClick[i]();
                        hide();
                    },
                });
            };

            return {
                template: '<span>{{ num }}</span>',
                restrict: 'E',
                scope: {
                    num: '@'
                },
                link: function ($scope, $element, $attr) {
                    if (validTelNo($scope.num)) {
                        if (void 0 === $attr.disabled) {
                            $element.on('click', function (e) {
                                e.stopPropagation();
                                showActionSheet($scope.num);
                            });
                        }
                    } else {
                        $element.addClass('invalid');
                    }
                },
            };
        }
    ]);

})();
