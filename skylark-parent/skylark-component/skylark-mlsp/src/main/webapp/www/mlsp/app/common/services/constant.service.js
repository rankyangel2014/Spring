/**
 * 提供数据库键值映射服务
 */

(function () {
'use strict';

angular
    .module('common')
    .factory('jnConstant', [
        'jnStorage', 'jnHttp',
        function (jnStorage, jnHttp) {
            var STO_KEY_CONST = 'mlsp.constants';
            var STO_KEY_ABBR = 'mlsp.constantsAbbr';

            var KV = jnStorage.get(STO_KEY_CONST) || {};
            var ABBR = jnStorage.get(STO_KEY_ABBR) || {};

            return {
                /**
                 * 在登录之后调用
                 */
                init: function () {
                    return jnHttp.get('/mlsp/js/param.do', {
                        type: 'mlspParams',
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

                        jnStorage.set(STO_KEY_CONST, KV);
                        jnStorage.set(STO_KEY_ABBR, ABBR);
                    });
                },

                get: function (num) {
                    return KV[num] || {};
                },

                getAbbr: function (num) {
                    return ABBR[num] || {};
                },
            };
        }
    ]);

})();
