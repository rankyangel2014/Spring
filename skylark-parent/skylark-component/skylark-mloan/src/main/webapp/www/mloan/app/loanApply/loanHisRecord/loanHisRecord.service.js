(function () {
    'use strict';

    angular
        .module('loanApply')
        .factory(
            'jnLoanHisRecordService',
            [
                'jnHttp',
                'jnUser',
                '$stateParams',
                function (jnHttp, jnUser, $stateParams) {
                    return {
                    	getCurLoanHis: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/PsnCustInfoCommAction.do?method=getCurLoanHis',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        getLoanHis: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/PsnCustInfoCommAction.do?method=getLoanHis',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        getGuarantee: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/PsnCustInfoCommAction.do?method=getGuarantee',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        getCreditCard: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/PsnCustInfoCommAction.do?method=getCreditCard',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        saveLoanHis: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/PsnCustInfoCommAction.do?method=loanHisAction',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        saveLoanCur: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/PsnCustInfoCommAction.do?method=curLoanHisAction',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        saveLoanGuar: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/PsnCustInfoCommAction.do?method=guaranteeAction',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        saveLoanCredit: function (params) {

                            return jnHttp
                                .post(
                                    '/mloan/router/rest/PsnCustInfoCommAction.do?method=creditCardAction',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                    };
                }]);

})();
