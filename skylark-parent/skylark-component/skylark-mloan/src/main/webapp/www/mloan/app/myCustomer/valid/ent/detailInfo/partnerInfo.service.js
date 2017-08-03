/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('entCustDetail')
    .factory('jnPartnerInfoServer',
        ['jnHttp', 'jnUser',
        function (jnHttp, jnUser) {
            return {
                readList: function (params) {
                	
                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getFormalEnbSharePInfo',
                        params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                },
                readActList: function (params) {

                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getFormalEnbSharePInfo',
                        params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                },

                rmGD: function (pCustNo, orgNo, custNo) {
                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=updateCustLinkEnbInfo', {
                        custNo: pCustNo,
                        orgNo: orgNo,
                        linkCustNo: custNo,
                        linkTypeflag: '29',
                        operType: 1,
                    });
                },
            };
        }]
    );

})();
