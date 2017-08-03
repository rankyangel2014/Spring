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
                            function(jnHttp, jnUser, jnHelper) {

                                return {
                                    //储备客户基本信息新增
                                    addPreCustBaseInfo : function(params) {
                                        params = {
                                                'operate':params.custNo.$modelValue?'1':'0',
                                                'inTrade':params.inTrade.$modelValue,
                                                'custName':params.custName.$modelValue,
                                                'sex':params.sex.$modelValue,
                                                'isJuridical':params.isJuridical.$modelValue?'0':undefined,
                                                'orgForm':params.isJuridical.$modelValue?params.orgForm.$modelValue:undefined,
                                                'enbName':params.isJuridical.$modelValue?params.enbName.$modelValue:undefined,
                                                'loanAmt':params.loanAmt.$modelValue,
                                                'loanUse':params.loanUse.$modelValue,
                                                'period':params.period.$modelValue,
                                                'loanRate':params.loanRate.$modelValue,
                                                'phoneNo':params.phoneNo.$modelValue,
                                                'custAddr':params.custAddr.$modelValue,
                                                'adTypeId':params.adTypeId.$modelValue,
                                                'referrer':params.referrer.$modelValue,
                                                'adTitle':params.adTitle.$modelValue,
                                                'remark':params.remark.$modelValue,
                                                'custNo':params.custNo.$modelValue,
                                                'userId':jnUser.userId,
                                                'custManagerNo':jnUser.userId,
                                            };
                                        return jnHttp
                                        .post(
                                                '/mlsp/router/rest.do?_transCode=CIM100',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    //储备客户基本信息修改
                                    modifyPreCustBaseInfo : function(params) {
                                        params = {
                                                'operate':'1',
                                                'inTrade':params.inTrade.$modelValue,
                                                'custName':params.custName.$modelValue,
                                                'sex':params.sex.$modelValue,
                                                'isJuridical':params.isJuridical.$modelValue?'0':undefined,
                                                'orgForm':params.isJuridical.$modelValue?params.orgForm.$modelValue:undefined,
                                                'enbName':params.isJuridical.$modelValue?params.enbName.$modelValue:undefined,
                                                'loanAmt':params.loanAmt.$modelValue,
                                                'loanUse':params.loanUse.$modelValue,
                                                'period':params.period.$modelValue,
                                                'loanRate':params.loanRate.$modelValue,
                                                'phoneNo':params.phoneNo.$modelValue,
                                                'custAddr':params.custAddr.$modelValue,
                                                'adTypeId':params.adTypeId.$modelValue,
                                                'referrer':params.referrer.$modelValue,
                                                'adTitle':params.adTitle.$modelValue,
                                                'remark':params.remark.$modelValue,
                                                'custNo':params.custNo.$modelValue,
                                                'userId':jnUser.userId,
                                                'custManagerNo':jnUser.userId,
                                            };
                                        return jnHttp
                                        .post(
                                                '/mlsp/router/rest.do?_transCode=CIM100',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                    //储备客户列表查询
                                    getPreCustInfos : function(params) {
                                        params = jnHelper.merge(params,{
                                            'custName' : params.custName,
                                            'phoneNo' : params.phoneNo,
                                            'status' : params.status,
                                        });
                                        if (jnUser.hasStation('400')) {
                                            params.custManagerNo = jnUser.userId;
                                        }
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                        .post(
                                                '/mlsp/router/rest.do?_transCode=CIM105',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return {
                                                                total : rsp.total,
                                                                items : rsp.root,
                                                            };
                                                        });
                                    },
                                    //有效的储备客户列表查询
                                    getAvailablePreCustInfo : function(params) {
                                        params = jnHelper.merge(params,{
                                            'custName' : params.custName,
                                            'custManagerNo' : params.custManagerNo,
                                        });
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                        .post(
                                                '/mlsp/router/rest.do?_transCode=CIM166',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            if(rsp.root && rsp.root.length>0){
                                                                rsp.root.forEach(function(e){
                                                                    e.checked = false;
                                                                });
                                                            }
                                                            return {
                                                                total : rsp.total,
                                                                items : rsp.root,
                                                            };
                                                        });
                                    },
                                    //储备客户详情查询
                                    getPreCustInfo : function(params) {
                                        params = jnHelper.merge(params,{
                                            'custNo' : params.custNo,
                                        });
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                        .post(
                                                '/mlsp/router/rest.do?_transCode=CIM105',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return {
                                                                total : rsp.total,
                                                                items : rsp.root,
                                                            };
                                                        });
                                    },
                                    //获取客户事件列表查询
                                    getEventInfos : function(params) {
                                        params = jnHelper.merge(params,{
                                            'custNo' : params.custNo,
                                            'eventStatus':params.eventStatus,
                                        });
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                        .post(
                                                '/mlsp/router/rest.do?_transCode=CIM103',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return {
                                                                total : rsp.total,
                                                                items : rsp.root,
                                                            };
                                                        });
                                    },
                                    //获取客户事件详情查询
                                    getEventInfo : function(params) {
                                        params = jnHelper.merge(params,{
                                            'eventId':params.eventId,
                                        });
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                        .post(
                                                '/mlsp/router/rest.do?_transCode=CIM103',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return {
                                                                total : rsp.total,
                                                                items : rsp.root,
                                                            };
                                                        });
                                    },
                                    //储备客户分配历史信息查询
                                    getAssignHistoryInfos : function(params) {
                                        params = jnHelper.merge(params,{
                                            'custNo' : params.custNo,
                                        });
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                        .post(
                                                '/mlsp/router/rest.do?_transCode=CIM107',
                                                params)
                                                .then(
                                                        function(rsp) {
                                                            return {
                                                                total : rsp.total,
                                                                items : rsp.root,
                                                            };
                                                        });
                                    },
                                    //储备客户分配--客户经理列表
                                    getNotCancelCustManagers : function() {
                                        return jnHttp
                                        .post(
                                                '/mlsp/router/rest.do?_transCode=QRY162',
                                                {
                                                    'stationId' : '400',
                                                })
                                                .then(
                                                        function(rsp) {
                                                            return {
                                                                total : rsp.total,
                                                                items : rsp.root,
                                                            };
                                                        });
                                    },
                                    //储备客户信息作废
                                    nullifyPreCustInfo : function(params) {
                                        params = {
                                                'custNos' : params.custNo,
                                        };
                                        return jnHttp .post(
                                                '/mlsp/mlspPreCustomerAction.do?method=nullifyPreCustInfo', params)
                                                .then(function(rsp) {
                                                    return rsp;
                                                });
                                    },
                                    //储备客户分配
                                    assignPreCustInfo : function(params) {
                                        return jnHttp .post(
                                                '/mlsp/mlspPreCustomerAction.do?method=assignPreCustInfo', params)
                                                .then(function(rsp) {
                                                            return rsp;
                                                        });
                                    },
                                };
                            } ]);

})();
