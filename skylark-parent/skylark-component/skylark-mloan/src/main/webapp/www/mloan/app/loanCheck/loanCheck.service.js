/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('myBusiness')
        .factory('jnLoanCheckService',
            ['jnHttp', 'jnUser', 'jnHelper', '$filter',
                function (jnHttp, jnUser, jnHelper, $filter) {
                    return {
                        queryList: function (params) {//贷后检查搜索

                            params.orgNo = jnUser.insttuId;
                            return jnHttp.post('/mloan/router/rest/LoanCheckAction.do?method=getLoanCheckHistroy',
                                params)
                                .then(function (rsp) {
                                    return {
                                        items: rsp.root,
                                        total: rsp.total,
                                    };
                                });
                        },
                        addCheck: function (params) {//检查登记
                            params.orgNo = jnUser.insttuId;
                            params.realCheckDate = moment(params.realCheckDateStr).format('YYYYMMDD');
                            return jnHttp.post('/mloan/router/rest/LoanCheckAction.do?method=addLoanCheckPlanDetailByApprove',
                                params)
                                .then(function (rsp) {
                                    return rsp;
                                });
                        },
                        getCheck: function (params) {//检查详情
                            params.orgNo = jnUser.insttuId;
                            return jnHttp.post('/mloan/router/rest/LoanCheckAction.do?method=getRegCheckSchedInfo',
                                params)
                                .then(function (rsp) {
                                    return rsp;
                                });
                        },
                    };
                }]
        );

})();
