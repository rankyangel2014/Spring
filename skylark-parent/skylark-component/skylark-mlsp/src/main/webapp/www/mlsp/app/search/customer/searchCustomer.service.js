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
                    params.orgNo = jnUser.insttuId;
                    params.isUseCurOrgNo = 'true';

                    if (jnUser.hasStation('400')) {
                        params.custManagerNo = jnUser.userId;
                    }

                    return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=QRY252', params)
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
