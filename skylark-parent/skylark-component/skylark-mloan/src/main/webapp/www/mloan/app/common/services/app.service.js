(function () {
'use strict';

angular
    .module('common')
    .factory('jnApp', [
        '$timeout',
        '$ionicPlatform',
        '$ionicLoading',
        'jnPage',
        function (
            $timeout,
            $ionicPlatform,
            $ionicLoading,
            jnPage
        ) {
            var service = {};

            var trim = function (s) {
                if (s) {
                    return s.replace(/^"|"$/g, '');
                }

                return s;
            };

            var VERSION = window.HTML_VERSION;

            var ID = trim(localStorage['jsjn.sysConfig.sysId'])
                || window.APP_ID;

            var DEVICE_ID = trim(localStorage['jsjn.sysConfig.deviceID'])
                || 'DEV';

            var BASE_URL = trim(localStorage['jsjn.sysConfig.baseUrl'])
                || '/skylark';

            var PLATFORM = (function () {
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    return 'iOS';
                }

                if (/android/i.test(navigator.userAgent)) {
                    return 'Android';
                }

                return 'Desktop';
            })();

            var _defaultOnBackBtn = (function () {
                var exitConfirm = false;

                return function () {
                    if ('main' === jnPage.current.name) {
                        if (exitConfirm) {
                            ionic.Platform.exitApp();
                        }

                        exitConfirm = true;

                        $ionicLoading.show({
                            template: '再按一次回退键退出APP',
                            hideOnStateChange: true,
                        });

                        $timeout(function () {
                            $ionicLoading.hide();
                            exitConfirm = false;
                        }, 2000);
                    }
                    else if ('bootstrap' !== jnPage.current.name) {
                        jnPage.back();
                    }
                };
            })();

            service.restoreOnBackBtn = function () {
                $ionicPlatform.registerBackButtonAction(_defaultOnBackBtn, 501);
            };

            service.onBackBtn = function (fn) {
                $ionicPlatform.registerBackButtonAction(fn, 501);
            };

            /**
             * @TEMP
             */
            service.setBaseUrl = function (url) {
                BASE_URL = url;
            };

            Object.defineProperties(service, {
                id: {
                    value: ID,
                },

                version: {
                    value: VERSION,
                },

                deviceId: {
                    value: DEVICE_ID,
                },

                platform: {
                    value: PLATFORM,
                },

                baseUrl: {
                    // @TEMP
                    // value: BASE_URL,
                    get: function () {
                        return BASE_URL;
                    },
                },
            });

            $ionicPlatform.ready(service.restoreOnBackBtn);

            return service;
        }
    ]);

})();
