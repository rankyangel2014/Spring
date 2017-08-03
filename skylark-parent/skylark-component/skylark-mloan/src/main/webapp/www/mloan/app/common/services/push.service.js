(function () {
'use strict';

angular
    .module('common')
    .factory('jnPush', [
        'jnappService',
        'jnApp',
        'jnUser',
        'jnHttp2',
        'jnLogin',
        function (
            jnappService,
            jnApp,
            jnUser,
            jnHttp2,
            jnLogin
        ) {
            var SERVER, PORT;

            (function () {
                var conf = localStorage['jsjn.sysConfig.remoteConfig'] || '{}';
                var addr = JSON.parse(conf).push_server || ':';
                var addrPair = addr.split(':');
                SERVER = addrPair[0];
                PORT = addrPair[1];
            })();

            var running = false;

            var startClient = function () {
                if ('Android' !== jnApp.platform) {
                    return;
                }

                if (! running) {
                    var params = {
                        serverIP: SERVER,
                        serverPort: PORT,
                        userId: jnUser.userId,
                    };

                    var ok = function () {
                        running = true;
                    };

                    var err = function (e) {
                    };

                    jnappService.startPushClient(ok, err, params);
                }
            };

            var stopClient = function () {
                if ('Android' !== jnApp.platform) {
                    return;
                }

                if (running) {
                    jnappService.stopPushClient();
                    running = false;
                }
            };

            var restartClient = function () {
                if ('Android' !== jnApp.platform) {
                    return;
                }

                stopClient();
                startClient();
            };

            var register = function () {
                var params = {
                    userId: jnUser.userId,
                    deviceId: jnApp.deviceId,
                    sysId: jnApp.id,
                };

                if ('iOS' === jnApp.platform) {
                    params.deviceType = '1';

                } else if ('Android' === jnApp.platform) {
                    params.deviceType = '0';
                }

                return jnHttp2.pub('InternalService', 'register', params);
            };


            jnLogin.onLogin(function () {
                if (! window.DEV_MODE) {
                    register();
                    restartClient();
                }
            });

            jnLogin.onLogout(function () {
                if (! window.DEV_MODE) {
                    stopClient();
                }
            });

            return {
                startClient: startClient,
                stopClient: stopClient,
                restartClient: restartClient,
            };
        }
    ]);

})();
