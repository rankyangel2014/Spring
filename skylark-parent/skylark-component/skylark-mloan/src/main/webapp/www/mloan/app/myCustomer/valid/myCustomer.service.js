/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';
    angular
        .module('myCustomer')
        .factory(//正式客户列表查询
            'myCustomerSer',
            ['jnHttp', 'jnUser', 'jnForm', 'jnHelper',
                function (jnHttp, jnUser, jnForm, jnHelper) {
                    return {
                        readList: function (params) {
                            params.qryFlag = '1';
                            if(!params.custClass) {
                                params.setlFlag = 'N';
                                params.custClass = '0';
                            }
                            if(params.custClass=='1') delete params.setlFlag;
                            params._pageLimit = params.limit;
                            params = jnHelper.fillUndef(params);
                            return jnHttp.post(
                                '/mloan/router/rest/ModifyCustAction.do?method=queryPInfo', params)
                                .then(function (rsp) {
                                    console.info(rsp);
                                    if (rsp.total == 0) {
                                        return {
                                            items: [],
                                            total: rsp.total,
                                        };
                                    } else {
                                        return {
                                            items: rsp.root,
                                            total: rsp.total,
                                        };
                                    }
                                });

                        },
                        qryDetail: function (params) {
                            params.operType = '0';
                            return jnHttp.post(
                                '/mloan/router/rest/ModifyCustAction.do?method=getCustPDetailInfo', params, {quiet: true});

                        },
                        readSpouse: function (params) {
                            params.operType = '0';
                            return jnHttp.post(
                                '/mloan/router/rest/ModifyCustAction.do?method=getCustPInfo', params);

                        },
                        qryPreCustInfoByRemark: function (params) {
                            params.operType = '0';
                            return jnHttp.post(
                                '/mloan/router/rest/ReserveCustinfo.do?method=getPreCustInfoByRemark', params, {quiet: true});
                        },
                        //客户移交
                        assignCustInfo: function (params) {
                            console.info(params);
                            params = {
                                'assignType': '2',
                                'custType': '1',
                                'isDevolveOrAllot': '0',
                                'asgnRemark': params.asgnRemark.$modelValue,
                                'custNos': params.custNos.$modelValue,
                                'stationType': params.stationType.$modelValue,
                                'deptId': jnUser.deptId,
                            };


                            return jnHttp.post(
                                '/mloan/router/rest/ReserveCustinfo.do?method=assignPreCustInfo', params);

                        },
                        //管户历史
                        getAssignHistoryInfos: function (params) {
                            console.info(params);
                            jnHelper.merge(params, {
                                "orgNo": jnUser.orgNo,
                            });

                            return jnHttp.post(
                                '/mloan/router/rest/ReserveCustinfo.do?method=getAssignHistoryInfos', params).then(
                                function (rsp) {
                                    if (rsp.total == 0) {
                                        return {
                                            items: [],
                                            total: rsp.total,
                                        };
                                    } else {
                                        return {
                                            items: rsp.root,
                                            total: rsp.total,
                                        };
                                    }
                                }
                            );

                        },
                        //黑名单操作历史
                        getBlackOperateHistory: function (params) {
                            console.info(params);
                            return jnHttp.post(
                                '/mloan/router/rest/PubCustomerAction.do?method=getSlmBlackLists', params).then(
                                function (rsp) {
                                    if (rsp.total == 0) {
                                        return {
                                            items: [],
                                            total: rsp.total,
                                        };
                                    } else {
                                        return {
                                            items: rsp.root,
                                            total: rsp.total,
                                        };
                                    }
                                }
                            );

                        },

                        readPerCustomer: function (params) {
                            var args = {
                                paperNo: params.paperNo,
                            };

                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=qryKzPerson',
                                args, {
                                    quiet: true,
                                }
                            ).then(function (rsp) {
                                return jnHelper.refine(rsp.data, [
                                    'custNo',
                                    'custName',
                                    'paperNo',
                                    'paperType',
                                    'sex',
                                    'birthday',
                                    'address',
                                    'mobPhone',
                                    'eduLevel',
                                    'fixPhone',
                                    'housingStatus',
                                    'housingDesc',
                                    'marryStatus',
                                ]);
                            }, function () {
                                return null;
                            });
                        },

                        readEntCustomer: function (params) {
                            var args = {
                                regNo: params.regNo,
                                liceNo: params.liceNo,
                            };

                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=qryKzCust',
                                args, {
                                    quiet: true,
                                }
                            ).then(function (rsp) {
                                var d = jnHelper.refine(rsp.data, [
                                    'custNo',
                                    'custName',
                                    'liceNo',
                                    'regNo',
                                    'orgNo',
                                    'loanCard',
                                    'inTrade',
                                    'inTradeName',
                                    'orgType',
                                    'mainBusiness',
                                    'businessStartDt',
                                    'businessHours',
                                    'employeeNum',
                                    'address',
                                    'addressType',
                                    'addressTypeotherDesc',
                                    'fixPhone',
                                ]);

                                d.employeeNum = Number(d.employeeNum);
                                d.businessStartDt = jnForm.jsDateFromRspDate(
                                    d.businessStartDt
                                );

                                return d;
                            }, function () {
                                return null;
                            });
                        },
                    };
                }]
        );

})();


