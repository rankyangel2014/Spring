(function () {
'use strict';

angular
    .module('common')
    .factory('jnLoginPopover', [
        '$compile',
        '$rootScope',
        '$interval',
        'jnLogin',
        'jnHelper',
        'jnGesturePwd',
        'jnSetGesturePwdPopover',
        function (
            $compile,
            $rootScope,
            $interval,
            jnLogin,
            jnHelper,
            jnGesturePwd,
            jnSetGesturePwdPopover
        ) {
            var SMS_VERIFY_EXPIRATION = 60;
            var RESEND_INTERVAL = 60;

            var STATE = {
                STEP1: 0,
                SEND_CODE: 1,
                REFRESH_CODE: 2,
            };

            var timer = (function () {
                var Timer = function (seconds, callback) {
                    this._seconds = seconds;
                    this._elapsed = 0;
                    this._running = false;
                    this._callback = callback || function () {};

                    Object.defineProperties(this, {
                        secondsLeft: {
                            get: function () {
                                return this._seconds - this._elapsed;
                            },
                        },

                        running: {
                            get: function () {
                                return this._running;
                            },
                        },
                    });
                };

                Timer.prototype.constructor = Timer;

                Timer.prototype.start = function () {
                    var self = this;

                    if (self.running) {
                        self.stop();
                    }

                    self._elapsed = 0;
                    this._running = true;

                    self._int = $interval(function () {
                        self._elapsed += 1;

                        if (self._elapsed === self._seconds) {
                            self.stop();
                            self._callback();
                        }
                    }, 1000, self._seconds);
                };

                Timer.prototype.stop = function () {
                    $interval.cancel(this._int);
                    this._running = false;
                };

                return function (seconds, callback) {
                    return new Timer(seconds, callback);
                };
            })();

            var tmpl = '\
<div id="login-popover" class="jn-popover">\
    <div class="frame">\
        <h1>信贷助手</h1>\
        <form novalidate>\
            <label class="loginId">\
                <input\
                    type="text"\
                    ng-model="form.loginId"\
                    ng-change="onChangeNameOrPwd()"\
                    required\
                    placeholder="请输入登录用户名"\
                />\
            </label>\
            <label class="password">\
                <input\
                    type="password"\
                    ng-model="form.password"\
                    ng-change="onChangeNameOrPwd()"\
                    required\
                    placeholder="请输入登录密码"\
                />\
            </label>\
            <label\
                ng-if="1 === state"\
                class="smcode">\
                <input\
                    type="text"\
                    id="smcode"\
                    ng-model="form.smcode"\
                    required\
                    pattern="\\d*"\
                    placeholder="请输入验证码 {{ expireTimer.secondsLeft }}"\
                />\
            </label>\
        </form>\
        <button\
            ng-if="0 === state && ! lockTimer.running"\
            ng-click="submit()"\
            ng-disabled="\'\' === form.loginId || \'\' === form.password"\
        >登录</button>\
        <button\
            ng-if="0 === state && lockTimer.running"\
            disabled\
        >登录 {{ lockTimer.secondsLeft }}</button>\
        <button\
            ng-if="1 === state"\
            ng-click="submit()"\
            ng-disabled="\'\' === form.loginId || \'\' === form.password || \'\' === form.smcode"\
        >验证</button>\
        <button\
            ng-if="2 === state && ! lockTimer.running"\
            ng-click="submit()"\
            ng-disabled="\'\' === form.loginId || \'\' === form.password"\
        >重新获取验证码</button>\
        <button\
            ng-if="2 === state && lockTimer.running"\
            disabled\
        >重新获取验证码 {{ lockTimer.secondsLeft }}</button>\
    </div>\
</div>';

            var scope = $rootScope.$new();
            var popover;

            var loginStep1 = function () {
                scope.state = STATE.STEP1;
                scope.form.smcode = '';
                scope.expireTimer.stop();
            };

            var sendCode = function () {
                scope.state = STATE.SEND_CODE;
                scope.expireTimer.start();
                document.getElementById('smcode').focus();
            };

            var resendCode = function () {
                scope.state = STATE.REFRESH_CODE;
                scope.form.smcode = '';
            };

            var onClose = function () {};

            var onKeyboardShow = function (e) {
                // 窗体高度
                var wh = window.innerHeight;

                // 当前焦点元素
                var focused = document.querySelector(':focus');

                // 焦点元素底部与窗体底部的垂直距离
                var fb = wh - focused.getBoundingClientRect().bottom;

                if (fb < 0) {
                    popover.children('.frame').css('-webkit-transform',
                        'translateY(' + (fb - 50) + 'px)');
                }
            };

            var onKeyboardHide = function () {
                popover.children('.frame').css('transform', '');
            };

            var show = function (opt) {
                scope.form = {
                    loginId: '',
                    password: '',
                };

                scope.lockTimer.stop();
                loginStep1();

                if (opt && opt.onClose) {
                    onClose = opt.onClose;
                }

                window.addEventListener('native.keyboardshow', onKeyboardShow);
                window.addEventListener('native.keyboardhide', onKeyboardHide);

                document.body.style.pointerEvents = 'auto';
                popover.addClass('show');
            };

            var hide = function () {
                window.removeEventListener('native.keyboardshow',
                    onKeyboardShow);
                window.removeEventListener('native.keyboardhide',
                    onKeyboardHide);

                document.body.style.pointerEvents = '';
                popover.removeClass('show');
                onClose();
                onClose = function () {};
            };

            scope.expireTimer = timer(SMS_VERIFY_EXPIRATION, resendCode);
            scope.lockTimer = timer(RESEND_INTERVAL);

            scope.onChangeNameOrPwd = function () {
                loginStep1();
            };

            scope.submit = function () {
                scope.lockTimer.stop();

                jnLogin.login(scope.form).then(hide, function (err) {
                    if (err instanceof jnLogin.SMSVerifyError) {
                        sendCode();
                    } else if (err instanceof jnLogin.InvalidSMSVerifyError) {
                        resendCode();
                        scope.lockTimer.start();
                    }
                });
            };

            popover = $compile(tmpl)(scope);

            // 避免 directive 被重复编译
            setTimeout(function () {
                document.body.appendChild(popover[0]);
            }, 10);

            return {
                show: show,
                hide: hide,
            };
        }
    ]);

})();
