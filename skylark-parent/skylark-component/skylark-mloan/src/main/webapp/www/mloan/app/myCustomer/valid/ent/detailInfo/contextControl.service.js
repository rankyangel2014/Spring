/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('entCustDetail')
    .factory('jnContextInfoServer',
        ['jnHttp', 'jnUser',
        function (jnHttp, jnUser) {
            return {
                readList: function (params) {
                    return jnHttp.post('/mloan/router/rest/ModifyCustAction.do?method=getCustLinkPInfo',
                        params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                },

                rmGLR: function (custNo, orgNo, linkCustNo, linkTypeflag) {
                	
                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=updateCustLinkEnbInfo', {
                    	custNo: custNo,
                        orgNo: orgNo,
                        linkCustNo: linkCustNo,
                        linkTypeflag: linkTypeflag,
                        operType: 1,
                    });
                },
            };
        }]
    );

})();
