/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('search.customer')
    .factory('jnSearchCustomer',
        ['jnHttp', 'jnUser', 'jnForm',
        function (jnHttp, jnUser, jnForm) {
            return {
                readList: function (params) {
                    params.orgNo = jnUser.insttuId ;//机构码
                    return jnHttp.post(
                        '/mloan/router/rest/OfficalCustomerAction.do?method=getCustComprehensiveInfo', params)
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
