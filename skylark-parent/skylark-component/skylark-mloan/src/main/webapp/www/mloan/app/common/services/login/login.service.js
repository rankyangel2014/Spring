(function () {
'use strict';

angular
    .module('app')
    .factory('jnLogin', [
        '$q',
        '$state',
        '$ionicLoading',
        'jnApp',
        'jnUser',
        'jnStorage',
        'jnHttpRaw',
        function (
            $q,
            $state,
            $ionicLoading,
            jnApp,
            jnUser,
            jnStorage,
            jnHttpRaw
        ) {
            var loginListeners = [];
            var logoutListeners = [];
            var unbindListeners = [];

            var request = function (url, data) {
                $ionicLoading.show({
                    template: '请稍候...'
                });

                return jnHttpRaw.request('POST', url, data)
                    .then(function (rsp) {
                        if ('000000' === rsp._rspCode) {
                            return rsp;
                        }

                        return $q.reject(rsp);

                    }).finally(function () {
                        $ionicLoading.hide();
                    });
            };

            var service = {};

            service.state = {
                OK: 0,
                BAD_NAME_OR_PWD: 1,
                BOUND: 2,
                VERIFY_CODE_SENT: 3,
                VERIFY_FAILED: 4,
                LOCKED: 5,
                ERROR: 9,
            };

            /**
             * type: 0 用户名密码登录
             *       1 手势密码登录
             */
            service.login = function (params) {
                // {{{ @TEMP

                if ('jnadmin' === params.loginId ||
                    'J9900003000001' === params.loginId) {
                    jnApp.setBaseUrl('http://222.190.122.218:27008/skylark');
                }

                // }}} @TEMP

                params = jn.mix(params, {
                    modId: jnApp.id,
                    deviceId: jnApp.deviceId,
                });

                return request('/skylark/LoginService.do?method=login', params)
                    .then(function (rsp) {
                        jnUser.updateUser(rsp._rspMsg);

                        loginListeners.forEach(function (f) {
                            f();
                        });

                        return {
                            state: service.state.OK,
                        };
                    },
                    function (err) {
                        var code = err._rspCode;
                        var msg = err._rspMsg;

                        /*
                        if ('000003' === code) {
                            return {
                                state: service.state.BAD_NAME_OR_PWD,
                                msg: msg,
                            };
                        }

                        if ('000004' === code) {
                            return {
                                state: service.state.LOCKED,
                                msg: msg,
                            };
                        }
                        */

                        if ('003600' === code || '003700' === code) {
                            return {
                                state: service.state.BOUND,
                                token: err.token,
                                msg: msg,
                            };
                        }

                        if ('000030' === code) {
                            return {
                                state: service.state.VERIFY_CODE_SENT,
                                token: err.token,
                                msg: msg,
                            };
                        }

                        if ('003300' === code) {
                            return {
                                state: service.state.VERIFY_FAILED,
                                msg: msg,
                            };
                        }

                        return $q.reject(msg);
                    });
            };

            service.logout = function () {
                return request('/skylark/LoginService.do?method=logout')
                    .then(function (rsp) {
                        logoutListeners.forEach(function (f) {
                            f();
                        });

                        $state.go('bootstrap');
                    });
            };

            service.unbind = function () {
                var params = {
                    userId:jnUser.userId,
                };

                return request(
                    '/skylark/MaspService.do?method=removeDeviceId', params)
                    .then(function (rsp) {
                        unbindListeners.forEach(function (f) {
                            f();
                        });

                        jnStorage.user.clear();

                        return service.logout();
                    });
            };

            service.setGesture = function (pwd) {
                var params = {
                    userId: jnUser.userId,
                    deviceId: jnApp.deviceId,
                    modId: jnApp.id,
                    graphicPwd: pwd,
                };

                return request(
                    '/common/setGraphicPwd.do?method=setGraphicPwd', params)
                    .then(
                        function () {
                            jnStorage.user.set('isGesturePwdSet', true);
                        },
                        function (err) {
                            return $q.reject(err._rspMsg);
                        }
                    );
            };

            service.isGestureSet = function () {
                var lastUser = jnStorage.app.get('lastUser');
                jnStorage.setUser(lastUser);
                return jnStorage.user.get('isGesturePwdSet');
            }

            service.onLogin = function (listener) {
                loginListeners.push(listener);
            };

            service.onLogout = function (listener) {
                logoutListeners.push(listener);
            };

            service.onUnbind = function (listener) {
                unbindListeners.push(listener);
            };

            return service;
        }
    ]);
})();
