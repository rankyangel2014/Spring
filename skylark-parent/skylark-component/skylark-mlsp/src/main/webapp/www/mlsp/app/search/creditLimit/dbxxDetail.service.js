/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('creditLimit')
    .factory('jnDbxxListServer',
        ['jnHttp', 'jnUser',
        function (jnHttp, jnUser) {
            return {
                readList: function (params) {
                	
                	if ('1' === params.optFlag) {
        				params._transCode = 'LNLNB119';
        			} else {
        				params._transCode = 'LNLNB106';
        			}
                	
                    return jnHttp.post('/mlsp/router/rest.do?',
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
