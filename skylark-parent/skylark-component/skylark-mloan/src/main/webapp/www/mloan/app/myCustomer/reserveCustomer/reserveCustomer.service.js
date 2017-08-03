/**
 * 提供储备客户部分的后台交互服务
 */

(function() {
    'use strict';
    angular
            .module('myCustomer')
            .factory(
                    'jnReserveCustomerService',
                    [
                            'jnHttp',
                            'jnUser',
                            'jnHelper',
                            '$filter',
                            function(jnHttp, jnUser, jnHelper,$filter) {

                                return {
                                    //储备客户基本信息新增
                                    addPreCustBaseInfo : function(params) {
                                        params = {
                                                'fstContactDt':$filter('date')(params.fstContactDt,'yyyyMMdd'),
                                                'custType':params.custType,
                                                'custName':params.custName,
                                                'contactName':params.contactName,
                                                'phoneNo':params.phoneNo,
                                                'adTypeId':params.adTypeId,
                                                'referrer':params.referrer,
                                                'fstContactIf':params.fstContactIf,
                                                'fstCausation':params.fstCausation,
                                                'userId':jnUser.userId,
                                                'custManagerNo':jnUser.userId,
                                                'cCustName':params.cCustName,
                                                'cPhoneNo':params.phoneNo,
                                                'cInTradeName':'',
                                                'cBusAddress':'',
                                                'corpBusYear':'0',
                                                'cLoanUse':'',
                                            };
                                        return jnHttp
                                        .post(
                                                '/mloan/router/rest/ReserveCustinfo.do?method=addPreCustBaseInfo',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    //储备客户基本信息修改
                                    modifyPreCustBaseInfo : function(params) {

                                        params = jnHelper.merge (params,{
                                              'custNo':params.custNo,
                                              'fstContactDt':$filter('date')(params.fstContactDt,'yyyyMMdd'),
                                              'custType':params.custType,
                                              'custName':params.custName,
                                              'contactName':params.contactName,
                                              'phoneNo':params.phoneNo,
                                              'adTypeId':params.adTypeId,
                                              'referrer':params.referrer,
                                              'fstContactIf':params.fstContactIf,
                                              'fstCausation':params.fstCausation,
                                              'userId':jnUser.userId,
                                              'custManagerNo':jnUser.userId,
                                              'cCustName':params.cCustName,
                                              'cPhoneNo':params.phoneNo,
                                            });
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                        .post(
                                                '/mloan/router/rest/ReserveCustinfo.do?method=modifyPreCustBaseInfo',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    //储备客户列表查询
                                    getPreCustInfos : function(params) {
                                        if(params.fstContactForm) params.fstContactForm = params.fstContactForm.replace(/(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/,'$1$2$3') ;
                                        if(params.fstContactTo) params.fstContactTo  = params.fstContactTo.replace(/(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/,'$1$2$3') ;
                                        params = jnHelper.merge(params,{
                                            'custName' : params.custName,
                                            'custType' : params.custType,
                                            'phoneNo' : params.phoneNo,
                                            'adTypeId' : params.adTypeId,
                                            'asgnStatus' : params.asgnStatus,
                                            'custManagerNo' : params.custManagerNo,
                                            'deptId' : params.deptId,
                                            'fstContactForm' : params.fstContactForm,
                                            'fstContactTo' : params.fstContactTo,
                                            'visitResult' : params.visitResult,
                                        });
                                        
                                        // 团队经理或后台人员需要提供部门编号
                                        //if (jnUser.hasStation('500') || jnUser.hasStation('566') ) {
                                        //    params.deptId = jnUser.deptId;
                                        //    // 客户经理需要提供客户经理编号和部门编号
                                        //    } else if (jnUser.hasStation('400')) {
                                        //        params.custManagerNo = jnUser.userId;
                                        //        params.deptId = jnUser.deptId;
                                        //    }else if(jnUser.hasStation('700')){
                                        //        //决策岗
                                        //        params.deptId = '';
                                        //    }

                                        if(!params.asgnStatus) params.asgnStatus='1';
                                        params._pageStart = params.start;
                                        params._pageLimit = params.limit;
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                        .post(
                                                '/mloan/router/rest/ReserveCustinfo.do?method=getPreCustInfoLists',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return {
                                                                total : rsp.total,
                                                                items : rsp.root,
                                                            };
                                                        });
                                    },
                                    //储备客户详情查询
                                    getPreCustInfo : function(params) {
                                        params = {
                                            'custNo' : params.custNo,
                                            'custType':params.custType,
                                        };
                                        return jnHttp
                                        .post(
                                                '/mloan/router/rest/ReserveCustinfo.do?method=getPreCustInfo',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    //获取分配单号
                                    getPreCustInfoByRemark : function(params) {
                                        params = {
                                            'custNo' : params.custNo,
                                        };
                                        return jnHttp
                                        .post(
                                                '/mloan/router/rest/ReserveCustinfo.do?method=getPreCustInfoByRemark',
                                                params,{quiet:true})
                                                .then(
                                                        function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                  //获取分配信息
                                    getPreCustByFlowNo : function(params) {
                                        params = {
                                            'flowNo' : params.flowNo,
                                        };
                                        return jnHttp
                                        .post(
                                                '/mloan/router/rest/ReserveCustinfo.do?method=getPreCustByFlowNo',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    getCustByFlowNo : function(params) {
                                        params = {
                                            'flowNo' : params.flowNo,
                                        };
                                        return jnHttp
                                        .post(
                                                '/mloan/router/rest/ModifyCustAction.do?method=getCustByFlowNo',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    //储备客户分配历史信息查询
                                    getAssignHistoryInfos : function(params) {
                                        params = jnHelper.merge(params,{
                                            'custNo' : params.custNo,
                                            'custType':'0',
                                        });
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                        .post(
                                                '/mloan/router/rest/ReserveCustinfo.do?method=getAssignHistoryInfos',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return {
                                                                total : rsp.total,
                                                                items : rsp.root,
                                                            };
                                                        });
                                    },
                                    //储备客户分配
                                    assignPreCustInfo : function(params) {
                                        if(params.custType=='1'){
                                        	params=jnHelper.merge(params,{isDevolveOrAllot:'0'});
                                        }
                                        return jnHttp .post(
                                            '/mloan/router/rest/ReserveCustinfo.do?method=assignPreCustInfo', params)
                                            .then(function(rsp) {
                                                return rsp;
                                            });
                                    },
                                    //储备客户移交
                                    transferPreCustInfo : function(params) {
                                        if(params.custType=='1'){
                                        	params=jnHelper.merge(params,{isDevolveOrAllot:'0'});
                                        }
                                        
                                        return jnHttp .post(
                                                '/mloan/router/rest/ReserveCustinfo.do?method=assignPreCustInfo', params)
                                                .then(function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    //储备客户回访新增
                                    returnVisitAdd : function(params) {
                                        var custRtnDtos = [];
                                        custRtnDtos.push({
                                                'visitType':params.visitType,
                                                'remark':params.remark,
                                                'visitResult':params.visitResult,}
                                        );
                                        params={
                                            'custRtnDtos':angular.toJson(custRtnDtos),
                                            'custNo':params.custNo,
                                        };
                                        return jnHttp .post(
                                                '/mloan/router/rest/ReserveServiced.do?method=save', params)
                                                .then(function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    //储备客户回访修改
                                    returnVisitEdit : function(params) {
                                        var custRtnDtos = [];
                                        custRtnDtos.push({
                                                'visitType':params.visitType,
                                                'remark':params.remark,
                                                'visitResult':params.visitResult,}
                                        );
                                        params={
                                            'recId':params.recId,
                                            'custRtnDtos':angular.toJson(custRtnDtos),
                                            'custNo':params.custNo,
                                        };
                                        return jnHttp .post(
                                                '/mloan/router/rest/ReserveServiced.do?method=save', params)
                                                .then(function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    //回访记录列表显示
                                    returnVisitList : function(params) {
                                        params={
                                                'custNo':params.custNo,
                                        };
                                        return jnHttp .post(
                                                '/mloan/router/rest/ReserveServiced.do?method=queryCustRtn', params)
                                                .then(function(rsp) {
                                                    return rsp;
                                                });
                                    },
                                    //潜在客户分配查询客户经理
                                    getPersonOperatorList : function(params) {
                                        params.start = 0;
                                        params.limit = 1000;
                                        
                                        return jnHttp .post(
                                                '/mloan/router/rest/param.do?method=getPersonOperatorList', params)
                                                .then(function(rsp) {
                                                    return rsp;
                                                });
                                    },
                                    //潜在客户分配查询客户经理
                                    getManagersByDeptId : function(params) {
                                        
                                        return jnHttp .post(
                                                '/mloan/router/rest/param.do?method=getCustManagerInfosByDeptIds', params)
                                                .then(function(rsp) {
                                                    return rsp;
                                                });
                                    },
                                    //潜在客户分配查询团队
                                    getOperatList : function(params) {
                                        params={};
                                        return jnHttp .post(
                                                '/mloan/router/rest/param.do?method=getOperatList', params)
                                                .then(function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                };
                            } ]);

})();
