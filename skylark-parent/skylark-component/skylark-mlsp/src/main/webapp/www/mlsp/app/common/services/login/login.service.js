(function () {
'use strict';

angular
    .module('app')
    .factory('jnLogin', [
        '$state',
        '$http',
        '$cordovaDevice',
        '$ionicPopup',
        '$ionicLoading',
        'jnUser',
        'jnHelper',
        'jnGesturePwd',
        'jnStorage',
        'jnPush',
        function (
            $state,
            $http,
            $cordovaDevice,
            $ionicPopup,
            $ionicLoading,
            jnUser,
            jnHelper,
            jnGesturePwd,
            jnStorage,
            jnPush
        ) {
            var createError = function (name) {
                function E(message) {
                    this.name = name;
                    this.message = message;
                    this.stack = (new Error()).stack;
                }

                E.prototype = Object.create(Error.prototype);
                E.prototype.constructor = E;

                return E;
            };

            var BadPwdError = createError('BadPwdError');
            var SMSVerifyError = createError('SMSVerifyError');
            var AccountLockedError = createError('AccountLockedError');
            var SingleSignOnError = createError('SingleSignOnError');
            var InvalidSMSVerifyError = createError('InvalidSMSVerifyError');
            var ConnectionLostError = createError('ConnectionLostError');
            var InternalServerError = createError('InternalServerError');

            var DEVICE_ID = jnStorage.get('sysConfig.deviceID') || '';

            /**
             * 因为 jnHttp 服务使用了本服务，所以不能再依赖 jnHttp
             */
            var post = (function () {
                var BASE_URL = jnStorage.get('sysConfig.baseUrl') || '/skylark';

                var request = function (url, data) {
                    var conf = {
                        method: 'POST',
                        url: BASE_URL + url,
                        timeout: 15000,
                        data: data,
                    };

                    return $http(conf).then(
                        function (rsp) {
                            if ('000000' === rsp.data._rspCode) {
                                return rsp.data;
                            }

                            if ('000003' === rsp.data._rspCode) {
                                throw new BadPwdError(rsp.data._rspMsg);
                            }

                            if ('000004' === rsp.data._rspCode) {
                                throw new AccountLockedError(rsp.data._rspMsg);
                            }

                            if ('000030' === rsp.data._rspCode) {
                                throw new SMSVerifyError(rsp.data._rspMsg);
                            }

                            if ('003500' === rsp.data._rspCode) {
                                throw new SingleSignOnError(rsp.data._rspMsg);
                            }

                            if ('003300' === rsp.data._rspCode) {
                                throw new InvalidSMSVerifyError(
                                    rsp.data._rspMsg);
                            }

                            throw new Error(rsp.data._rspMsg);

                        }, function (rsp) {
                            if (0 === rsp.status) {
                                throw new ConnectionLostError(
                                    '网络不给力，请检查你的网络连接');
                            }

                            if (500 === rsp.status) {
                                throw new InternalServerError(
                                    '服务器错误');
                            }

                            throw new Error(rsp.statusText);
                        });
                };

                return function (url, data) {
                    $ionicLoading.show({
                        template: '请稍候...'
                    });

                    return request(url, data).then(
                        function (rsp) {
                            $ionicLoading.hide();
                            return rsp;
                        }, function (err) {
                            $ionicLoading.hide();

                            if (! (err instanceof SMSVerifyError)) {
                                jnHelper.alert(err.message);
                            }

                            throw err;
                        }
                    );
                };
            })();

            var registerPush = function () {
                var params = {
                    method: 'register',
                    userId: jnUser.userId,
                    deviceId: DEVICE_ID,
                    sysId: 'mlsp',
                };

                var PLATFORM = $cordovaDevice.getPlatform();

                if ('iOS' === PLATFORM) {
                    params.deviceType = '1';

                } else if ('Android' === PLATFORM) {
                    params.deviceType = '0';
                }

                post('/skylark/InternalService.do', params);
            };

            var login = function (params) {
                params = jnHelper.merge(params, {
                    method: 'login',
                    type: '0',
                    modId: 'mlsp',
                    deviceId: DEVICE_ID,
                });

                return post('/skylark/LoginService.do', params)
                    .then(function (rsp) {
                        jnUser.updateUser(rsp._rspMsg);

                        if (! window.DEV_MODE) {
                            registerPush();
                            jnPush.restartClient();
                        }
                    });
            };

            var logout = function () {
                var params = {
                    method: 'logout',
                };

                return post('/skylark/LoginService.do', params)
                    .then(function (rsp) {
                        jnUser.clear();
                        jnPush.stopClient();
                        $state.go('bootstrap');
                    });
            };

            var removeDeviceId = function () {
                var params = {
                    method: 'removeDeviceId',
                    userId:jnUser.userId,
                };

                return post('/skylark/MaspService.do', params)
                    .then(function (rsp) {
                        var params = {
                            method: 'logout',
                        };

                        jnUser.clear();
                        jnGesturePwd.clear();
                        jnPush.stopClient();

                        return post('/skylark/LoginService.do', params);
                    }).then(function (rsp) {
                        $state.go('bootstrap');
                    });
            };

            return {
                login: login,
                logout: logout,
                removeDeviceId: removeDeviceId,
                SMSVerifyError: SMSVerifyError,
                InvalidSMSVerifyError: InvalidSMSVerifyError,
            };
        }
    ]);

})();
