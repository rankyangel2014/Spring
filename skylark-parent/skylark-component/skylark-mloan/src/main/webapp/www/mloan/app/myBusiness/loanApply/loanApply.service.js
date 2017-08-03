/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('myBusiness')
        .factory(
            'jnLoanApplyService',
            [
                'jnHttp',
                'jnUser',
                '$stateParams',
                function (jnHttp, jnUser, $stateParams) {
                    return {
                        getApplyInfo: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/WorkFlowApprovalInfoCommAction.do?method=getExamInfo',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        workflow: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/WorkflowAction.do?method=workflow',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },

                        //获取审批配置信息
                        getLoanApproveCfg: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/MloanCommAction.do?method=getLoanApproveCfg',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },

                        //获取客户类型
                        getCustType: function (params) {

                            return jnHttp.post('/mloan/router/rest/MLoanInfoAction.do?method=getLoanList',
                                params, {quiet: true}).then(function (rsp) {
                                return rsp;
                            });

                        }
                    };
                }]);

})();
