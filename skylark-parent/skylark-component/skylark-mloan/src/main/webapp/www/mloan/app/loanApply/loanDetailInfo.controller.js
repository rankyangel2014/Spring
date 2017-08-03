(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('loanDetailInfoCtrl', loanDetailInfoCtrl);

    loanDetailInfoCtrl.$inject = ['$state', 'LoanDetailInfoService', 'jnHelper', '$scope', '$stateParams', 'LoanApplyUtilService', '$ionicSlideBoxDelegate', 'jnPage', 'resolveLoanDetailInfo','jnApprovalInfoService'];

    function loanDetailInfoCtrl($state, LoanDetailInfoService, jnHelper, $scope, $stateParams, LoanApplyUtilService, $ionicSlideBoxDelegate, jnPage, resolveLoanDetailInfo,jnApprovalInfoService) {
        var self = this;

        var nodeConfig = {};
        LoanDetailInfoService.getNodeList({
            bnNo: $stateParams.loanNo
        }).then(function(rsp) {
            rsp.root.forEach(function(e) {
                nodeConfig[e.nodeSno] = e;
            });
        });

        //当前form，null表示第一个页面
        var currentForm = null;

        self.acceptParamObj = $stateParams;

        //根据【贷款状态】和【岗位信息】【贷款所属客户经理】等信息获取编辑权限
        self.acceptParamObj.isReadOnly = !LoanApplyUtilService.getEditAuth(resolveLoanDetailInfo);

        self.footIsShow = !self.acceptParamObj.isReadOnly; //控制【页脚】是否可见
        self.footName = "保存"; //[页脚名称]默认为【保存】

        //保存当前tab的表单,默认是self.tabs[0]
        self.saveForm = saveForm;

        //提交
        self.submitForm = submitForm;

        self.tabs = [{
            "index": 1,
            "text": "申请信息",
            "fragmentURL": "app/loanApply/loanDetailInfoFrags/applyInfoFragment.html",
            "formName": "applyInfo",
            "footName": "保存"
        }, {
            "index": 2,
            "text": "个人资料",
            "fragmentURL": "app/loanApply/loanDetailInfoFrags/personalInfoFragment.html",
            "formName": "personalInfo",
            "footName": "保存"
        }, {
            "index": 3,
            "text": "企业资料",
            "fragmentURL": "app/loanApply/loanDetailInfoFrags/companyInfoFragment.html",
            "formName": "companyInfo",
            "footName": "保存"
        }, {
            "index": 4,
            "text": "关联信息",
            "fragmentURL": "app/loanApply/loanDetailInfoFrags/relatedPsnInfoFragment.html",
            "formName": "relatedPsnInfo",
            "footName": "新增"
        }, {
            "index": 5,
            "text": "财务信息",
            "fragmentURL": "app/loanApply/loanDetailInfoFrags/financialInfoFragment.html",
            "formName": "financialInfo",
            "footName": "保存"
        }, {
            "index": 6,
            "text": "信贷记录",
            "fragmentURL": "app/loanApply/loanDetailInfoFrags/loanHisFragment.html",
            "formName": "loanHis",
        }, {
            "index": 7,
            "text": "征信记录",
            "fragmentURL": "app/loanApply/loanDetailInfoFrags/creditHisFragment.html",
            "formName": "creditHis",
        }, {
            "index": 8,
            "text": "综合评价",
            "fragmentURL": "app/loanApply/loanDetailInfoFrags/investigationFragment.html",
            "formName": "investigation",
            "footName": "新增"
        }, {
            "index": 9,
            "text": "审批信息",
            "fragmentURL": "app/loanApply/loanDetailInfoFrags/approvalInfoFragment.html",
            "formName": "approvalInfo"
        }];

        var hideTab = function (name) {
            jnHelper.arrFind(self.tabs, function (e) {
                return e.formName === name;
            }).hide = true;
        };

        //若是客户经理，删除【个人资料】
        if ($stateParams.custType == '1') {
            hideTab('personalInfo');
        }

        //贷款如果处于【申请】状态，则不显示【审批信息】
        if ($stateParams.loanState == '10' || $stateParams.loanState == '11') {
        	jnApprovalInfoService.getExamInfo({
                custNo: $stateParams.custNo,
                pCustNo:$stateParams.custNo,
                loanNo: $stateParams.loanNo
            }).then(function (rsp) {
            	var result = rsp.success ? rsp.data : {};
           	 	var exapResult = result.exapResultA || result.exapResultB || result.exapResultC || result.exapResultD;
           	 	if(exapResult!=='2'){
                    hideTab('approvalInfo');
           	 	}
            });
        }

        //绑定【底部按钮】的方法
        function saveForm() {
            if (currentForm) {
                currentForm.saveFunc();
            } else {
                //默认为第一个页面的【保存】方法。
                LoanApplyUtilService.getFormMap(self.tabs[0].formName).saveFunc();
            }
        }

        //监听页面滑动事件
        $scope.onSlideMove = function(data) {
            if (self.acceptParamObj.isReadOnly) {
                return;
            }

            var currentTab = self.tabs[data.index];
            //底部按钮控制
            if (currentTab.footName) {
                currentForm = LoanApplyUtilService.getFormMap(currentTab.formName);
                self.footName = currentTab.footName;
                self.footIsShow = true;
            } else {
                self.footIsShow = false;
            }

        };

        //提交
        function submitForm() {
            LoanDetailInfoService.checkMustInput({ loanNo: self.acceptParamObj.loanNo }).then(function(rsp) {
                if (rsp.data.isPass != '1') {
                    jnHelper.alert(rsp.data.errMsg);
                } else {

                    LoanDetailInfoService.qryLoanApproverStatus({
                        loanNo: self.acceptParamObj.loanNo,
                        nodeNo: nodeConfig['10']['nodeNo']
                    }).then(function(rsp) {
                        if (rsp.data.isEnable == '0') {

                            self.popupLoanApplyWin();
                        } else {
                            LoanDetailInfoService.checkLoanApproverStatus({
                                bnNo: self.acceptParamObj.loanNo,
                                bnType: nodeConfig['10']['bnType'],
                                nodeNo: nodeConfig['10']['nodeNo'],
                                flowType: '51'
                            }).then(function() {
                                return jnHelper.alert('贷款审批成功！')
                            }).then(function() {
                                jnPage.modified = false;
                                $state.go('myBusiness');
                            });;

                        }

                    });
                }
            });

        };

        //跳转到审批页面
        self.popupLoanApplyWin = function() {
            $state.go('loanApplyPopup', $stateParams);
        }
    }

})();
