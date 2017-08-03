(function () {
'use strict';

angular
    .module('common')
    .factory('jnGestureLoginPopover', [
        '$q',
        '$compile',
        '$rootScope',
        'jnUser',
        'jnPage',
        'jnLogin',
        'jnLoginPopover',
        'jnHelper',
        function (
            $q,
            $compile,
            $rootScope,
            jnUser,
            jnPage,
            jnLogin,
            jnLoginPopover,
            jnHelper
        ) {
            var service = {};

            var tmpl = '\
<div id="gesture-login-popover">\
    <div class="user">\
        <div>{{ userName }}</div>\
        <div>{{ userStation }}</div>\
    </div>\
    <div class="tip" ng-class="status">{{ tip }}</div>\
    <jn-pattern-input\
        on-invalid="onInvalid"\
        on-change="onChange"\
        on-reset="onReset"\
        circle-color="#eec211"\
        dot-color="#eec211"\
        line-color="#eec211"\
    ></jn-pattern-input>\
    <a class="go-login" ng-click="goLogin()">用户名密码登录</a>\
</div>';

            var scope = $rootScope.$new();
            var ok, popover;
            var defer;

            service.open = function () {
                show();
                defer = $q.defer();
                return defer.promise;
            };

            var show = function () {
                ok = false;
                scope.tip = '请输入手势密码';
                scope.status = '';

                scope.userName = jnUser.userName;
                scope.userStation = jnUser.stationName;

                document.body.style.pointerEvents = 'auto';
                popover.addClass('show');
            };

            var hide = function () {
                document.body.style.pointerEvents = '';
                popover.removeClass('show');
            };

            scope.onInvalid = function (pi) {
                scope.tip = '最少需要' + pi.minDots() + '个触点，请重新输入';
                scope.status = 'err';
                scope.$apply();
            };

            scope.onChange = function (pi) {
                jnLogin.login({
                    type: '1',
                    loginId: jnUser.userId,
                    password: pi.value(),
                }).then(
                    function (res) {
                        if (jnLogin.state.OK === res.state) {
                            scope.tip = 'OK';
                            scope.status = '';
                            scope.$apply();
                            pi.setValid(true);

                            ok = true;
                        }
                        else if (jnLogin.state.BOUND === res.state) {
                            jnHelper.alert('该用户或该设备已经绑定，请输入用户名和密码解绑').then(scope.goLogin);
                        }
                    },
                    function (err) {
                        jnHelper.alert(err).then(function () {
                            scope.tip = '密码错误，请重新输入';
                            scope.status = 'err';
                            scope.$apply();
                            pi.setValid(false);
                        });
                    }
                );
            };

            scope.onReset = function () {
                if (ok) {
                    ok = false;
                    hide();
                    defer.resolve();
                }
                else {
                    scope.tip = '请输入手势密码';
                    scope.status = '';
                    scope.$apply();
                }
            };

            scope.goLogin = function () {
                hide();

                jnLoginPopover.open().then(function () {
                    if ('bootstrap' === jnPage.current.name) {
                        jnPage.go('main');
                    }
                });
            };

            popover = $compile(tmpl)(scope);

            // 避免 jn-pattern-input 被重复编译
            setTimeout(function () {
                document.body.appendChild(popover[0]);

                // 通知 jnPatternInput 重绘
                scope.$broadcast('resize');
            }, 10);

            return service;
        }
    ]);

})();
