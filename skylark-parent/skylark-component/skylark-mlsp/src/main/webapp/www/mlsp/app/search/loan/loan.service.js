/**
 * 提供客户查询部分的后台交互服务
 */

(function() {
    'use strict';
    angular.module('loan').factory('jnLoanService',
            [ 'jnHttp', 'jnUser', 'jnHelper','$filter',function(jnHttp, jnUser,jnHelper,$filter) {
                return {
                    readList : function(params) {
                        params = jnHelper.merge(params, {
                            dtStart :$filter('date')(new Date(params.dtStart),'yyyyMMdd') ,//还款日期起始
                            dtEnd : $filter('date')(new Date(params.dtEnd),'yyyyMMdd'),//还款日期结束
                            contNoExt : params.contNoExt,//贷款合同号
                            custName : params.custName,//客户名
                            custType : params.custType,//客户类型
                            txNoAcc : params.txNoAcc,//会计凭证号
                            txType : params.txType,//交易类型
                            exportType: 0, 
                            custManagerNo: params.custManagerNo, 
                        });
                        params = jnHelper.fillUndef(params);
                        return jnHttp
                        .post( '/mlsp/router/rest.do?_transCode=QRY341',
                                params)
                                .then(function(rsp) {
                                    return {
                                        items : rsp.root,
                                        total : rsp.total,
                                    };
                                });
                    },
                    /**
                     * 还款记录查询-取客户贷款对应的逾期、将到期、未到期还款明细记录--单客户
                     */
                    readSingleCustSchedList : function(params) {
                        params = {
                                custNo:params.custNo,
                                loanNo:params.loanNo,
                                crtTxNo:params.crtTxNo,
                                crtDt:params.crtDt,
                        };
                        params.busFlag = 'singleRepay';
                        params.opt = 'detail';
                        params.optFlagInter = '-1';
                        params.setlDt = '';
                        params.aheadRepayIntFlag = '1';
                        params.isQwl = 'false';
                        return jnHttp
                        .post( '/mlsp/router/rest.do?_transCode=DJV001',
                                params)
                                .then(function(rsp) {
                                    return {
                                        items : rsp.data,
                                    };
                                });
                    },
                    /**
                     * 还款记录查询-取客户贷款对应的逾期、将到期、未到期还款明细记录--单借据
                     */
                    readSingleLoanSchedList : function(params) {
                        params = {
                                custNo:'',
                                loanNo:params.loanNo,
                                crtTxNo:params.crtTxNo,
                                crtDt:params.crtDt,
                                setlDt:'',
                        };
                        params.busFlag = 'singleLoanRepay';
                        params.opt = 'detail';
                        params.optFlagInter = '-1';
                        params.aheadRepayIntFlag = '0';
                        params.repayWay = '1';
                        return jnHttp
                        .post( '/mlsp/router/rest.do?_transCode=DJV001',
                                params)
                                .then(function(rsp) {
                                    return {
                                        items : rsp.data,
                                    };
                                });
                    },
                    /**
                     * 还款记录查询-取客户贷款对应的逾期、将到期、未到期还款明细记录--批量还款
                     */
                    readBatchRepayList : function(params) {
                        params = {
                                custNo:params.custNo,
                                loanNo:params.loanNo,
                                crtTxNo:params.crtTxNo,
                                crtDt:params.crtDt,
                        };
                        params.busFlag = 'batchRepay';
                        params.opt = 'detail';
                        params.optFlagInter = '-1';
                        return jnHttp
                        .post( '/mlsp/router/rest.do?_transCode=DJV001',
                                params)
                                .then(function(rsp) {
                                    return {
                                        items : rsp.data,
                                    };
                                });
                    },
                    /**
                     * 还款记录查询-获取核销收回申请详情
                     */
                    readVRApplInfo : function(params) {
                        params = {
                                loanNo:params.loanNo,
                                crtTxNo:params.crtTxNo,
                                crtDt:params.crtDt,
                                optType:'1',
                        };
                        return jnHttp
                        .post( '/mlsp/router/rest.do?_transCode=QRY458',
                                params)
                                .then(function(rsp) {
                                    return {
                                        items : rsp.data,
                                    };
                                });
                    },
                    readCustLoanInfo : function(params) {
                         params = {
                             custNo:params.custNo,
                             loanNo:params.loanNo,
                             crtTxNo:params.crtTxNo,
                             crtDt:params.crtDt,
                         };
                        return jnHttp
                                .post( '/mlsp/router/rest.do?_transCode=QRY531',
                                        params)
                                .then(function(rsp) {
                                    return {
                                        items : rsp.root,
                                        total : rsp.total,
                                    };
                                });
                    },
                    readRepayerInfo : function(params) {
                        params = {
                                loanNo:params.loanNo,
                        };
                        return jnHttp
                        .post( '/mlsp/router/rest.do?_transCode=QRY916',
                                params)
                                .then(function(rsp) {
                                    return {
                                        items : rsp.root,
                                        total : rsp.total,
                                    };
                                });
                    },
                    readFeeParam : function(params) {
                        params = {
                              'busFlag':'singleRepay',
                              'loanFlag':'',
                        };
                       return jnHttp
                               .post( '/mlsp/router/rest.do?_transCode=QRY902',
                                       params)
                               .then(function(rsp) {
                                   return {
                                       items : rsp.root,
                                       total : rsp.total,
                                   };
                               });
                   },
                };
            } ]);
})();
