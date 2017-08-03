(function () {
'use strict';

angular
    .module('common')
    .factory('jnSetGesturePwdPopover', [
        '$compile',
        '$rootScope',
        'jnGesturePwd',
        function (
            $compile,
            $rootScope,
            jnGesturePwd
        ) {
            var tmpl = '\
<div id="set-gesture-pwd-popover">\
    <div class="tip" ng-class="status">{{ tip }}</div>\
    <jn-pattern-input\
        on-invalid="onInvalid"\
        on-change="onChange"\
        on-reset="onReset"\
        circle-color="#eec211"\
        dot-color="#eec211"\
        line-color="#eec211"\
    ></jn-pattern-input>\
</div>';

            var scope = $rootScope.$new();
            var isSet, mismatch, popover;

            var show = function () {
                isSet = false;
                mismatch = false;
                scope.tip = '请输入手势密码';
                scope.status = '';

                document.body.style.pointerEvents = 'auto';
                popover.addClass('show');
            };

            var hide = function () {
                document.body.style.pointerEvents = '';
                popover.removeClass('show');
            };

            scope.onInvalid = function (pi) {
                scope.tip = '最少需要' + pi.minDots() + '个点，请重新输入';
                scope.status = 'err';
                scope.$apply();
            };

            scope.onChange = function (pi) {
                var pwd = pi.value();

                if (isSet) {
                // 再次设置
                    if (jnGesturePwd.setPwdAgain(pwd)) {
                    // 两次密码相同
                        scope.tip = 'OK';
                        scope.status = '';
                        scope.$apply();
                        pi.setValid(true);
                        hide();

                    } else {
                    // 两次密码不同

                        isSet = false;
                        mismatch = true;
                        scope.tip = '两次密码不一致，请重新设置！';
                        scope.status = 'err';
                        scope.$apply();
                        pi.setValid(false);
                    }

                } else {
                // 初次设置
                    jnGesturePwd.setPwd(pwd);
                    isSet = true;
                    mismatch = false;
                    scope.tip = 'OK';
                    scope.status = '';
                    scope.$apply();
                    pi.setValid(true);
                }
            };

            scope.onReset = function () {
                if (mismatch) {
                    scope.tip = '与上一次输入不一致，请重新输入';
                } else if (isSet) {
                    scope.tip = '请再次输入手势密码';
                } else {
                    scope.tip = '请输入手势密码';
                }

                scope.status = '';
                scope.$apply();
            };

            popover = $compile(tmpl)(scope);

            // 避免 jn-pattern-input 被重复编译
            setTimeout(function () {
                document.body.appendChild(popover[0]);

                // 通知 jnPatternInput 重绘
                scope.$broadcast('resize');
            }, 10);

            return {
                show: show,
                hide: hide,
            };
        }
    ]);

})();
