/**
 * 提供[贷款申请详细信息填写]后台交互服务
 */

(function() {
    'use strict';

    angular
        .module('loanApply')
        .factory('LoanDetailInfoService', LoanDetailInfoService);

    LoanDetailInfoService.$inject = ['jnHttp', 'jnUser', 'jnHelper', '$filter', '$cordovaDialogs'];

    function LoanDetailInfoService(jnHttp, jnUser, jnHelper, $filter, $cordovaDialogs) {

        //保存担保信息
        function saveGuaranteeInfo(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj);
            return jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=gurTypeAction',
                paramObj).then(function(rsp) {
                return rsp;
            });
        }

        //获取担保信息
        function getGuaranteeInfo(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj);
            return jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=getGurType',
                paramObj).then(function(rsp) {
                return rsp;
            });
        }

        //保存申请信息
        function saveLoanApplyBaseInfo(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj);
            return jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=loanApplyBaseAction',
                paramObj).then(function(rsp) {
                return rsp;
            });
        }

        //获取申请信息
        function getLoanApplyBaseInfo(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj);
            return jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=getLoanApplyBase',
                paramObj).then(function(rsp) {
                return rsp;
            });
        }

        //新增【共同经营者】【股东】【关联人】列表
        function addTogetherOpt(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj);
            return jnHttp.post('/mloan/router/rest/RelatedPersonInfoCommAction.do?method=save',
                paramObj).then(function(rsp) {
                return rsp;
            });
        }

        //删除【共同经营者】【股东】【关联人】列表
        function deleteTogetherOpt(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj);
            return jnHttp.post('/mloan/router/rest/RelatedPersonInfoCommAction.do?method=delete',
                paramObj).then(function(rsp) {
                return rsp;
            });
        }

        //获取【共同经营者】【股东】【关联人】列表
        function getTogetherOptList(paramObj) {
            paramObj._pageStart = paramObj.start;
            paramObj._pageLimit = paramObj.limit;
            paramObj = jnHelper.fillUndef(paramObj);
            return jnHttp.post('/mloan/router/rest/RelatedPersonInfoCommAction.do?method=getCustList',
                paramObj).then(function(rsp) {
                return {
                    total: rsp.total,
                    items: rsp.root,
                };
            });
        }

        //获取个人客户信息
        function getPersonalInfo(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=getCustInfo',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp.data;
                }
            });
        }

        //获取企业客户信息
        function getCompanyInfo(paramObj, quiet) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            var opt = {
                quiet: quiet ? true : false
            }
            return jnHttp.post('/mloan/router/rest/EnbCustInfoCommAction.do?method=getCustInfo',
                paramObj, opt).then(function(rsp) {
                if (rsp.success) {
                    return jnHelper.merge(rsp.data, {
                        businessStartDt: new Date($filter('jnDate')(rsp.data.businessStartDt))
                    });
                }
            }, function(err) {
                throw err;
            });
        }

        //保存企业客户信息
        function saveCompanyInfo(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/EnbCustInfoCommAction.do?method=save',
                paramObj).then(function(rsp) {
                return rsp;
            });
        }

        //保存个人客户信息
        function savePersonalInfo(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=save',
                paramObj).then(function(rsp) {
                return rsp;
            });
        }

        //调查评价
        function getInvestigationInfo(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=getEvaluate',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return {
                        items: rsp.root,
                        total: rsp.total,
                    };
                }
            });
        }

        //校验必输项
        function checkMustInput(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/WorkFlowApprovalInfoCommAction.do?method=checkMustInput',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp;
                }
            });
        }

        //查询贷款审批状态
        function qryLoanApproverStatus(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/MloanCommAction.do?method=qryLoanApproverStatus',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp;
                }
            });
        }

        //获取操作人
        function getXwdOperatorList(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/param.do?method=getXwdOperatorList',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp;
                }
            });
        }

        //获取操作人
        function getStationList(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/param.do?method=getStationList',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp;
                }
            });
        }

        //审批提交
        function workflow(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/WorkflowAction.do?method=workflow',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp;
                }
            });
        }

        //审批提交(跳过流程)
        function checkLoanApproverStatus(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/MloanCommAction.do?method=checkLoanApproverStatus',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp;
                }
            });
        }

        //获取节点信息
        function getNodeList(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/MloanFlowAction.do?method=getNodeList',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp;
                }
            });
        }

        //初始化贷款当前信息
        function getLoanInfo(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.post('/mloan/router/rest/MloanFlowAction.do?method=getLoanInfo',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp.data;
                }
            });
        }

        //获取所以【关联客户】包括虚拟客户（搜索专用）
        function getRelationAndAllNew(paramObj) {
            paramObj = jnHelper.fillUndef(paramObj); //格式化undefind字段
            return jnHttp.request('POST', '/mloan/router/rest/ModifyCustAction.do?method=getRelationAndAllNew',
                paramObj).then(function(rsp) {
                if (rsp.success) {
                    return rsp;
                }
            }, function(err) {
                if (err.message) {
                    $cordovaDialogs.alert(err.message, "提示", "确定").then(function() {
                        throw err;
                    });
                } else {
                    throw err;
                }
            });
        }


        return {
            getCompanyInfo: getCompanyInfo,
            saveCompanyInfo: saveCompanyInfo,
            getPersonalInfo: getPersonalInfo,
            savePersonalInfo: savePersonalInfo,
            getTogetherOptList: getTogetherOptList,
            getInvestigationInfo: getInvestigationInfo,
            deleteTogetherOpt: deleteTogetherOpt,
            addTogetherOpt: addTogetherOpt,
            getLoanApplyBaseInfo: getLoanApplyBaseInfo,
            saveLoanApplyBaseInfo: saveLoanApplyBaseInfo,
            getGuaranteeInfo: getGuaranteeInfo,
            saveGuaranteeInfo: saveGuaranteeInfo,
            qryLoanApproverStatus: qryLoanApproverStatus,
            getXwdOperatorList: getXwdOperatorList,
            getStationList: getStationList,
            workflow: workflow,
            checkMustInput: checkMustInput,
            checkLoanApproverStatus: checkLoanApproverStatus,
            getNodeList: getNodeList,
            getLoanInfo: getLoanInfo,
            getRelationAndAllNew: getRelationAndAllNew,
        };

    }


})();
