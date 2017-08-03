/**
 * 提供还款试算器的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('util.repayCalc')
        .factory('jnUtilRepayCalc',
            ['jnHttp', 'jnUser', 'jnForm', 'jnHelper',
                function (jnHttp, jnUser, jnForm, jnHelper) {
                    return {
                        readList: function (params) {
                            if (jnUser.hasStation('400')) {
                                params.custManagerNo = jnUser.userId;
                            }

                            params.loanNo = '';

                            return jnHttp.post(
                                '/mloan/router/rest/LnrepaymAction.do?method=getLoanList', params)
                                .then(function (rsp) {
                                    return {
                                        items: rsp.root,
                                        total: rsp.total,
                                    };
                                });
                        },

                        readRepayCalcSchedList: function (params) {
                            params = jnHelper.merge(params, {
                                busFlag: 'repayTrial',
                                opt: 'add',
                                optFlagInter: '0',
                                aheadRepayIntFlag: '0',
                            });

                            return jnHttp.post(
                                '/mloan/router/rest/RepayLoanAction.do?method=getSchedList', params)
                                .then(function (rsp) {
                                    return {
                                        loanList: rsp.loanList.root,
                                        repayList: rsp.repayList.root,
                                        receivableCmpdInt: rsp.receivableCmpdInt,
                                        receivableInt: rsp.receivableInt,
                                        receivableOdInt: rsp.receivableOdInt,
                                        receivablePrcp: rsp.receivablePrcp,
                                        receivableTotal: rsp.receivableTotal,
                                        aheadReceivablePrcp: rsp.aheadReceivablePrcp,
                                        aqhxCurPerdNo: rsp.aqhxCurPerdNo,
                                        lsbqCurPerdNo: rsp.lsbqCurPerdNo,
                                    };
                                });
                        },

                        /**
                         * 查询还款明细
                         */
                        readGenDtlRepayGrid: function (params) {
                            params = jnHelper.merge(params, {
                                opt: 'add',
                                wvTotal: '0',
                            });

                            params.hkmxGridStore = JSON.stringify(params.hkmxGridStore);
                            params.loanGridStore = JSON.stringify(params.loanGridStore);

                            return jnHttp.post(
                                '/mloan/router/rest/RepayLoanAction.do?method=genDtlRepayGrid', params)
                                .then(function (rsp) {
                                    return {
                                        repayList: rsp.repayList.root,
                                        receivableCmpdInt: rsp.receivableCmpdInt,
                                        receivableInt: rsp.receivableInt,
                                        receivableOdInt: rsp.receivableOdInt,
                                        receivablePrcp: rsp.receivablePrcp,
                                        receivableTotal: rsp.receivableTotal,
                                    };
                                });
                        },

                        genAheadRepaySchedList: function (params) {
                            params = jnHelper.merge(params, {
                                opt: 'add',
                            });

                            return jnHttp.post(
                                '/mloan/router/rest/RepayLoanAction.do?method=genAheadRepaySchedList', params)
                                .then(function (rsp) {
                                    return rsp.root.map(function (e) {
                                        return jnHelper.refine(e, [
                                            'dueDt',
                                            'perdNo',
                                            'numberOfDays',
                                            'instmAmt',
                                            'instmPrcp',
                                            'instmInt',
                                            'intRate',
                                            'contPrcpEnd',
                                            'aheadSetlPrcp',
                                        ]);
                                    });
                                });
                        },

                        readCalcuPayInt: function (params) {
                            return jnHttp.post(
                                '/mloan/router/rest/RepayLoanAction.do?method=calcuPayInt', params)
                                .then(function (rsp) {
                                    return {
                                        sInt: rsp.sInt,
                                        rInt: rsp.rInt,
                                    }
                                });
                        },

                        readCustomer: function (params) {
                            params = jnHelper.merge(params, {
                                operType: 0,
                            });

                            return jnHttp.post(
                                '/mloan/router/rest/ModifyCustAction.do?method=getCustPDetailInfo',
                                params, {
                                    quiet: true,
                                })
                                .then(function (rsp) {
                                    var d = rsp.data;
                                    return {
                                        custName: d.custName,
                                        phoneNo: d.phoneNo,
                                    };
                                });

                        },
                    };
                }]
        );

})();
