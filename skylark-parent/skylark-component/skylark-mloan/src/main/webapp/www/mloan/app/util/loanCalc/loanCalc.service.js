/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('loanCalc')
        .factory('jnLoanCalcService',
            ['jnHttp', 'jnUser', 'jnHelper', '$filter',
                function (jnHttp, jnUser, jnHelper, $filter) {
                    return {
                        genPaySched: function (params) {
                            var params = {
                                loadFlag: '1',
                                instmFreqNumUnit: '1',
                                instmFreqUnitTyp: 'M',
                                dueDay: params.dueDay,
                                intRate: params.intRate,
                                exapAmt: params.exapAmt,
                                repayTyp: params.repayTyp,
                                rateType: params.rateType,
                                balloonPerdAmt: params.balloonPerdAmt,
                                intStartDt: params.intStartDt.replace(/(\d{4})[-\/](\d{2})[-\/](\d{2})/, '$1$2$3'),
                                lastDueDt: params.lastDueDt.replace(/(\d{4})[-\/](\d{2})[-\/](\d{2})/, '$1$2$3'),
                                fstPaymDt: params.fstPaymDt.replace(/(\d{4})[-\/](\d{2})[-\/](\d{2})/, '$1$2$3'),
                            };


                            return jnHttp.post('/mloan/router/rest/loanDataInputMgrAction.do?method=genPaySched',
                                params).then(function (rsp) {
                                return rsp;
                            });
                        },
                        queryFstPaymDt: function (params) {
                            return jnHttp.post('/mloan/router/rest/loanDataInputMgrAction.do?method=calFstPaymDt',
                                params).then(function (rsp) {
                                return rsp;
                            });
                        },
                        transRateType: function (params) {
                            return jnHttp.post('/mloan/router/rest/param.do?method=getOrgParam',
                                params).then(function (rsp) {
                                return rsp;
                            });
                        },

                    };
                }]
        );

})();
