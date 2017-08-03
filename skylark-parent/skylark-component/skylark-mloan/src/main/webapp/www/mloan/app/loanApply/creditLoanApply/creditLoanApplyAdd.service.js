(function () {
    'use strict';

    angular
        .module('loanApply')
        .factory(
            'creditLoanApplyAddService',
            [
                'jnHttp',
                'jnUser',
                '$stateParams',
                function (jnHttp, jnUser, $stateParams) {
                    return {
                    	getCreditInfo: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/LoanApplyAdd.do?method=getCreditInfo',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        getCreditLoanApply: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/LoanApplyAdd.do?method=getCreditLoanApply',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        saveCreditLoanApply: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/LoanApplyAdd.do?method=save',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        }, 
                        qryLoanApproverStatus: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/MloanCommAction.do?method=qryLoanApproverStatus',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        }, 
                        checkLoanApproverStatus: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/MloanCommAction.do?method=checkLoanApproverStatus',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        }, 
                        workFlowCreditLoanApply: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/WorkflowAction.do?method=workflow',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                    };
                }]);

})();
