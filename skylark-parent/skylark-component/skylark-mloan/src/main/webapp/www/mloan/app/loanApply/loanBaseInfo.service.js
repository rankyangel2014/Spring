/**
 * 提供[贷款申请基本信息填写]后台交互服务
 */

(function() {
    'use strict';

    angular
        .module('loanApply')
        .factory('LoanBaseInfoService', LoanBaseInfoService);

    LoanBaseInfoService.$inject = ['jnHttp', 'jnUser', 'jnHelper'];

    function LoanBaseInfoService(jnHttp, jnUser, jnHelper) {
        return {
            getCrdtLoanList: getCrdtLoanList,
            getAllLoanList: getAllLoanList, //for test
            getProdTypeList: getProdTypeList,
            addFormalCust: addFormalCust,
            getCreditApplyCount: getCreditApplyCount,
            getCustList: getCustList,
            getCustWarning: getCustWarning,
            getPreCustInfoList: getPreCustInfoList,
            getXwdOperatorList: getXwdOperatorList,
        };

        //获取客户是否具有贷款资格提醒
        function getCustWarning(obj) {

            return jnHttp.post('/mloan/router/rest/MLoanInfoAction.do?method=getUserLoan', {
                custNo: obj.custNo
            }).then(function(rsp) {
                var isWarn = false;
                var warnMsg = "该客户存在以下情况：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>";
                if (obj.isBlack == '0') {
                    isWarn = true;
                    warnMsg += "●&nbsp;黑名单客户<br>";
                }
                if (obj.isRejectLoan == '0') {
                    isWarn = true;
                    warnMsg += "●&nbsp;有拒绝贷款历史<br>";
                }
                if (obj.isSetlLoan == '0') {
                    isWarn = true;
                    warnMsg += "●&nbsp;有未结清贷款业务<br>";
                }
                if (obj.isSetlLoanGur == '0') {
                    isWarn = true;
                    warnMsg += "●&nbsp;有未结清担保业务<br>";
                }
                if (obj.isSetlLoanBrw == '0') {
                    isWarn = true;
                    warnMsg += "●&nbsp;为未结清贷款共同借款人<br>";
                }
                if (obj.isSetlLoanMag == '0') {
                    isWarn = true;
                    warnMsg += "●&nbsp;为未结清贷款共同经营者<br>";
                }

                if (rsp.success && rsp.total > 0) {
                    isWarn = true;
                    warnMsg += "●&nbsp;当前客户存在多笔贷款申请<br>";
                }

                warnMsg += "请确认是否继续进行贷款申请？";

                if (isWarn) {
                    return warnMsg;
                } else {
                    return null;
                }

            });
        }

        //获取潜在客户
        function getPreCustInfoList(params) {
            params = jnHelper.fillUndef(params); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/ReserveCustinfo.do?method=getPreCustInfoLists',
                params).then(function(rsp) {
                return rsp;
            });
        }

        //获取正式客户（正式客户，关联客户）
        function getCustList(params) {
            params = jnHelper.fillUndef(params); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/MCustInfoAction.do?method=getCustList',
                params).then(function(rsp) {
                return rsp;
            });
        }

        //新增正式客户
        function addFormalCust(params) {
            params = jnHelper.fillUndef(params); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/MCustInfoAction.do?method=save',
                params).then(function(rsp) {
                return rsp;
            });
        }

        //获取贷款【产品类型】
        function getProdTypeList(params) {
            params = jnHelper.fillUndef(params); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/param.do?method=getProduct',
                    params)
                .then(function(rsp) {
                    return {
                        items: rsp,
                    };
                });
        }

        //获取当前岗位名下符合用信的授信贷款
        function getCrdtLoanList(params) {

            var justManager = jnUser.getMaxStation() == '400', //客户经理
                justTeamManager = jnUser.getMaxStation() == '500', //团队经理
                justSysManager = jnUser.getMaxStation() == '566'; //团队经理

            //团队经理
            if (justTeamManager || justSysManager) {
                params.deptId = jnUser.deptId;
            }
            //客户经理
            if (justManager) {
                params.custManagerNo = jnUser.userId;
            }

            params.orgNo = jnUser.insttuId;

            params = jnHelper.fillUndef(params); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/CreditAction.do?method=getCreditLimitList',
                    params)
                .then(function(rsp) {
                    return {
                        items: rsp.root,
                        total: rsp.total,
                    };
                });
        }

        //for test
        function getAllLoanList(params) {
            var justManager = jnUser.getMaxStation() == '400', //客户经理
                justTeamManager = jnUser.getMaxStation() == '500', //团队经理
                justSysManager = jnUser.getMaxStation() == '566'; //团队经理

            //后台人员
            if (justSysManager) {
                params.deptId = jnUser.deptId;
            }
            //客户经理 和团队经理只能查询到自己名下的最高额授信
            if (justManager || justTeamManager) {
                params.custManagerNo = jnUser.userId;
            }

            params = jnHelper.fillUndef(params); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/MLoanInfoAction.do?method=getLoanList',
                    params)
                .then(function(rsp) {
                    return {
                        items: rsp.root,
                        total: rsp.total,
                    };
                });
        }

        function getCreditApplyCount(params) {
            params = jnHelper.fillUndef(params); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/MLoanInfoAction.do?method=getYxCount',
                    params)
                .then(function(rsp) {
                    return {
                        count: rsp.data.count,
                        success: rsp.success
                    };
                });
        }

        //获取操作人
        function getXwdOperatorList(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/param.do?method=getXwdOperatorList',
                paramObj).then(function (rsp) {
                if (rsp.success) {
                    return rsp;
                }
            });
        }
    }

})();
