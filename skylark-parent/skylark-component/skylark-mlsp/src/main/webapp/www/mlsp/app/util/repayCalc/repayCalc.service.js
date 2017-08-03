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
                        '/mlsp/router/rest.do?_transCode=QRY530', params)
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
                        '/mlsp/router/rest.do?_transCode=DJV001', params)
                        .then(function (rsp) {
                            var d = rsp.data;
                            return {
                                loanList: d.loanList,
                                repayList: d.repayList,
                                receivableCmpdInt: d.receivableCmpdInt,
                                receivableInt: d.receivableInt,
                                receivableOdInt: d.receivableOdInt,
                                receivablePrcp: d.receivablePrcp,
                                receivableTotal: d.receivableTotal,
                                aheadReceivablePrcp: d.aheadReceivablePrcp,
                                aqhxCurPerdNo: d.aqhxCurPerdNo,
                                lsbqCurPerdNo: d.lsbqCurPerdNo,
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
                        '/mlsp/router/rest.do?_transCode=HKMX002', params)
                        .then(function (rsp) {
                            var d = rsp.data;
                            return {
                                loanList: d.loanList,
                                repayList: d.repayList,
                                receivableCmpdInt: d.receivableCmpdInt,
                                receivableInt: d.receivableInt,
                                receivableOdInt: d.receivableOdInt,
                                receivablePrcp: d.receivablePrcp,
                                receivableTotal: d.receivableTotal,
                            };
                        });
                },

                readCalcuPayInt: function (params) {
                    return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=ACC105', params)
                        .then(function (rsp) {
                            return {
                                sInt: rsp.data.sInt,
                                rInt: rsp.data.rInt,
                            }
                        });
                },

                readCustomer: function (params) {
                    params = jnHelper.merge(params, {
                        operType: 0,
                    });

                    return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=CIM909', params)
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
