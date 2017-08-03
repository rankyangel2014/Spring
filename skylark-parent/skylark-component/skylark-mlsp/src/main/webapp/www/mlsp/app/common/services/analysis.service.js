(function () {
'use strict';

angular
    .module('common')
    .factory('jnAnalysis', [
        '$window', '$state', '$http', 'jnHttp', 'jnUser',
        function ($window, $state, $http, jnHttp, jnUser) {
            var IP = 'net_err';
            var ISP = 'net_err';
            var AGENT = $window.navigator.userAgent;

            var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=JSON_CALLBACK';

            $http.jsonp(url, {timeout: 1000}).then(function (rsp) {
                IP = rsp.data.Ip;
                ISP = rsp.data.Isp;
            });

            return {
                send: function (loc) {
                    loc = loc || $state.current.url.replace(/\?.*/, '');

                    if (jnUser.userId) {
                        return jnHttp.post('/skylark/AnalysisService.do', {
                            method: 'saveAnalysis',
                            agent: AGENT,
                            orgno: jnUser.insttuId,
                            uid: jnUser.userId,
                            location: loc,
                            vtime: Date.now(),
                            ip: IP,
                            isp: ISP,
                            modId:'mlsp'
                        }, {
                            quiet: true,
                        });
                    }
                },
            };
        }
    ]);

})();
