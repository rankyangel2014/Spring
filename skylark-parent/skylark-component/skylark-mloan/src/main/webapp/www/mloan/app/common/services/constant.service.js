/**
 * 提供数据库键值映射服务
 */

(function () {
'use strict';

angular
    .module('common')
    .factory('jnConstant', [
        'jnApp',
        'jnStorage',
        'jnHttp',
        'jnLogin',
        function (
            jnApp,
            jnStorage,
            jnHttp,
            jnLogin
        ) {
            var STO_KEY_CONST = 'constants';
            var STO_KEY_ABBR = 'constantsAbbr';

            var KV = jnStorage.app.get(STO_KEY_CONST) || {};
            var ABBR = jnStorage.app.get(STO_KEY_ABBR) || {};

            var service = {};

            var init = function () {
                var url = '/' + jnApp.id + '/js/param.do';
                var type = jnApp.id + 'Params';

                return jnHttp.get(url, {
                    type: type,
                }).then(function (rsp) {
                    var k, v;

                    KV = {};
                    ABBR = {};

                    for (k in rsp.data) {
                        v = rsp.data[k];
                        k = k.replace(/^ITEM/, '');
                        KV[k] = {};
                        ABBR[k] = {};

                        v.forEach(function (p) {
                            KV[k][p.paramKey] = p.paramValue;
                            ABBR[k][p.paramKey] = p.shortDesc;
                        });
                    }

                    jnStorage.app.set(STO_KEY_CONST, KV);
                    jnStorage.app.set(STO_KEY_ABBR, ABBR);
                });
            };

            service.get = function (num) {
                return KV[num] || {};
            };

            service.getAbbr = function (num) {
                return ABBR[num] || {};
            };

            jnLogin.onLogin(init);

            return service;
        }
    ]);

})();
