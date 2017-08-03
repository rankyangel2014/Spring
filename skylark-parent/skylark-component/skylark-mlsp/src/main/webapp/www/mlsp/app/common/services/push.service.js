(function () {
'use strict';

angular
    .module('common')
    .factory('jnPush', [
        '$cordovaDevice',
        'jnappService',
        'jnStorage',
        'jnUser',
        function (
            $cordovaDevice,
            jnappService,
            jnStorage,
            jnUser
        ) {
            var SERVER, PORT;

            (function () {
                var conf = jnStorage.get('sysConfig.remoteConfig') || {};
                var addr = conf.push_server || ':';
                var addrPair = addr.split(':');
                SERVER = addrPair[0];
                PORT = addrPair[1];
            })();

            var running = false;

            var startClient = function () {
                if ('Android' !== $cordovaDevice.getPlatform()) {
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
                if ('Android' !== $cordovaDevice.getPlatform()) {
                    return;
                }

                if (running) {
                    jnappService.stopPushClient();
                    running = false;
                }
            };

            var restartClient = function () {
                if ('Android' !== $cordovaDevice.getPlatform()) {
                    return;
                }

                stopClient();
                startClient();
            };

            return {
                startClient: startClient,
                stopClient: stopClient,
                restartClient: restartClient,
            };
        }
    ]);

})();
