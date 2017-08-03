(function () {
'use strict';

angular
    .module('common')
    .factory('jnAnalysis', [
        '$rootScope',
        '$q',
        '$state',
        '$http',
        'jnApp',
        'jnHttpRaw',
        'jnLogin',
        'jnUser',
        function (
            $rootScope,
            $q,
            $state,
            $http,
            jnApp,
            jnHttpRaw,
            jnLogin,
            jnUser
        ) {
            var AGENT = navigator.userAgent;

            var service = {};

            var getInfo = (function () {
                var info;

                return function () {
                    if (info) {
                        return $q(function (resolve, reject) {
                            resolve(info);
                        });
                    }

                    return jnHttpRaw.request('POST', '/mloan/router/queryIP.do')
                        .then(
                            function (rsp) {
                                info = {
                                    ip: rsp.data.Ip,
                                    isp: rsp.data.Isp,
                                }

                                return info;
                            },
                            function () {
                                return {
                                    ip: 'net_err',
                                    isp: 'net_err',
                                }
                            }
                        );
                };
            })();

            service.send = function (loc) {
                getInfo().then(function (rsp) {
                    loc = loc || $state.current.url.replace(/\?.*/, '');

                    if (jnUser.userId) {
                        return jnHttpRaw.request(
                            'POST',
                            '/skylark/AnalysisService.do?method=saveAnalysis', {
                                agent: AGENT,
                                orgno: jnUser.insttuId,
                                uid: jnUser.userId,
                                location: loc,
                                vtime: Date.now(),
                                ip: rsp.ip,
                                isp: rsp.isp,
                                modId: jnApp.id,
                            });
                    }
                });
            };

            $rootScope.$on('$stateChangeSuccess', function () {
                service.send();
            });

            jnLogin.onLogout(function () {
                service.send('LOGOUT');
            });

            jnLogin.onUnbind(function () {
                service.send('UNBIND');
            });

            return service;
        }
    ]);

})();
