/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('myBusiness')
    .factory('symxListServer',
        ['jnHttp', 'jnUser',
        function (jnHttp, jnUser) {
            return {
                readList: function (params) {
                	
                    return jnHttp.post('/mlsp/router/rest.do?_transCode=LNLNB114',
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
