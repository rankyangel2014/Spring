(function () {
    'use strict';

    angular
        .module('loanApply')
        .factory(
            'jnApprovalInfoService',
            [
                'jnHttp',
                'jnUser',
                '$stateParams',
                function (jnHttp, jnUser, $stateParams) {
                    return {
                    	getLoanApproveCfg: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/MloanCommAction.do?method=getLoanApproveCfg',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        getExamInfo: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/WorkFlowApprovalInfoCommAction.do?method=getExamInfo',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                    };
                }]);

})();
