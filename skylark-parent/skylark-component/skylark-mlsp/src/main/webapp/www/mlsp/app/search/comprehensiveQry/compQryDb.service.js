/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('comprehensiveQry')
    .factory('jnCompQrydbServer',
        ['jnHttp', 'jnUser',
        function (jnHttp, jnUser) {
            return {
                readList: function (params) {
                	
                    return jnHttp.post('/mlsp/router/rest.do?_transCode=LNLNB106',
                        params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                },
            };
        }]
    );

})();
