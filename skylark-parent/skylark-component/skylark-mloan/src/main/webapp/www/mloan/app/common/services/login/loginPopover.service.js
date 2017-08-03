(function () {
'use strict';

angular
    .module('common')
    .factory('jnLoginPopover', [
        '$q',
        '$compile',
        '$rootScope',
        '$interval',
        'jnLogin',
        'jnHelper',
        function (
            $q,
            $compile,
            $rootScope,
            $interval,
            jnLogin,
            jnHelper
        ) {
            var SMS_VERIFY_EXPIRATION = 180;
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
        <h1>微贷助手</h1>\
        <form novalidate>\
            <label class="loginId">\
                <input\
                    type="text"\
                    ng-model="form.loginId"\
                    ng-change="onChangeNameOrPwd()"\
                    required\
                    jn-force-visible\
                    placeholder="请输入登录用户名"\
                />\
            </label>\
            <label class="password">\
                <input\
                    type="password"\
                    ng-model="form.password"\
                    ng-change="onChangeNameOrPwd()"\
                    required\
                    jn-force-visible\
                    placeholder="请输入登录密码"\
                />\
            </label>\
            <label\
                ng-if="1 === state"\
                class="smcode">\
                <input\
                    type="text"\
                    ng-model="form.smcode"\
                    required\
                    pattern="\\d*"\
                    jn-force-visible\
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

            var service = {};

            var scope = $rootScope.$new();
            var defer, popover;

            var loginStep1 = function () {
                scope.state = STATE.STEP1;
                scope.form.smcode = '';
                scope.expireTimer.stop();
            };

            var sendCode = function () {
                scope.state = STATE.SEND_CODE;
                scope.expireTimer.start();
            };

            var resendCode = function () {
                scope.state = STATE.REFRESH_CODE;
                scope.form.smcode = '';
            };

            service.open = function () {
                show();
                defer = $q.defer();
                return defer.promise;
            };

            var show = function (opt) {
                scope.form = {
                    type: '0',
                    loginId: '',
                    password: '',
                };

                scope.lockTimer.stop();
                loginStep1();

                document.body.style.pointerEvents = 'auto';
                popover.addClass('show');
            };

            var hide = function () {
                document.body.style.pointerEvents = '';
                popover.removeClass('show');
            };

            scope.expireTimer = timer(SMS_VERIFY_EXPIRATION, resendCode);
            scope.lockTimer = timer(RESEND_INTERVAL);

            scope.onChangeNameOrPwd = function () {
                loginStep1();
            };

            scope.submit = function () {
                scope.lockTimer.stop();

                jnLogin.login(scope.form).then(function (res) {
                    if (jnLogin.state.OK === res.state) {
                        hide();
                        defer.resolve();
                    }
                    else if (jnLogin.state.BOUND === res.state) {
                        jnHelper.confirm(res.msg + '是否重新绑定？')
                            .then(function (confirmed) {
                                if (confirmed) {
                                    scope.form.token = res.token;
                                    scope.form.smsFlag = 'send';
                                    scope.submit();
                                }
                            });
                    }
                    else if (jnLogin.state.VERIFY_CODE_SENT === res.state) {
                        scope.form.smsFlag = '';
                        scope.form.token = res.token;
                        sendCode();
                    }
                    else if (jnLogin.state.VERIFY_FAILED === res.state) {
                        jnHelper.alert(res.msg).then(function () {
                            resendCode();
                            scope.lockTimer.start();
                        });
                    }
                }, jnHelper.alert);
            };

            popover = $compile(tmpl)(scope);

            // 避免 directive 被重复编译
            setTimeout(function () {
                document.body.appendChild(popover[0]);
            }, 10);

            return service;
        }
    ]);

})();
