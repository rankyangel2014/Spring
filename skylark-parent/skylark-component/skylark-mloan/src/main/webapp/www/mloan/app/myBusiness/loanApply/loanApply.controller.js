/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('myBusiness')
        .controller('loanApplyCtrl',
            ['$scope', 'jnPage', 'jnForm', 'jnHelper', 'jnLoanApplyService', '$state', '$stateParams', 'jnUser',
                function ($scope, jnPage, jnForm, jnHelper, jnLoanApplyService, $state, $stateParams, jnUser) {

                    var self = this;
                    self.title = '贷款预判审批';
                    //初始化数据
                    self.form = {
                        examine: '0',
                    };

                    $scope.custNo = $stateParams.custNo;
                    $scope.loanNo = $stateParams.loanNo;

                    jnLoanApplyService.getLoanApproveCfg({
                        loanNo: $stateParams.loanNo,
                        appTyp: 'appl_prog',
                    }).then(function (rsp) {

                        rsp.root.forEach(function (e) {
                            e['isCheck'] = false;
                            self.form[e.appNo]
                        });

                        //客户资料
                        $scope.items = rsp.root;

                    });

                    jnLoanApplyService.getCustType({
                        loanNo: $stateParams.loanNo
                    }).then(function (rsp) {

                        //客户类型
                        $scope.custType = rsp.root[0].custType;
                    });

                    //查询审批信息
                    jnLoanApplyService.getApplyInfo({
                        custNo: $stateParams.custNo,
                        loanNo: $stateParams.loanNo
                    }).then(function (rsp) {

                        //负责信贷员
                        //self.form.takeChargeName = rsp.data.takeChargeName;
                        //self.form.takeCharge = rsp.data.takeCharge;
                        ////申请分配人
                        //self.form.applyAllotName = rsp.data.applyAllotName ? rsp.data.applyAllotName : jnUser.userName;
                        //self.form.applyAllot = rsp.data.applyAllot ? rsp.data.applyAllot : jnUser.userId;

                        //贷款状态
                        $scope.status = rsp.data.status;
                        $scope.custManagerNo = rsp.data.custManagerNo;

                    });

                    self.applyTable = function () {
                        //跳转到申请表详情页面
                        // #state.go();
                    };

                    self.apply = function () {
                        jnForm.validate(self.applyForm)
                            .then(function () {

                                jnHelper.confirm('您是否确认审批吗？').then(function (confirmed) {
                                    if (!confirmed) {
                                    } else {
                                        var examine = self.form.examine;
                                        var orgNo = jnUser.insttuId;
                                        var custNo = $stateParams.custNo;
                                        var loanNo = $stateParams.loanNo;
                                        var refType = '0';
                                        var refCause = '0';
                                        var opinion = '0';//审批意见
                                        var reviewData = '';
                                        var refOtherDesc = '0';//拒绝理由
                                        var errMsg = '';
                                        if (examine == '0') {//同意
                                            opinion = self.form.opinion;
                                            $scope.items.forEach(function (e) {
                                                if (e.isMust == '0' && e.isCheck == '0') {
                                                    errMsg = errMsg.concat(e.appDesc + ',');
                                                }
                                                reviewData = reviewData.concat(e.isCheck ? '1' : '0');
                                            });
                                        }
                                        else if (examine == '1') {//拒绝
                                            refOtherDesc = self.form.refOtherDesc;
                                            refType = self.form.refType;
                                            refCause = refType == '0' ? self.form.refCause_c : self.form.refCause_p;
                                        } else {//退回 examine=='2'
                                            opinion = self.form.thTxt;
                                        }

                                        if (errMsg.length == 0) {
                                            //业务类型-机构号-客户号-合同号-审批意见-是否审核资料-审核资料-审批类型-审批人ID-审批岗位-事件ID-分配人-信贷员-末位占位-决绝类型-拒绝理由
                                            var _params = "51-" + orgNo + "-" + custNo + "-" + loanNo + "-" + opinion + "-Y-" + reviewData + "-0-0-0-" + $stateParams.eventId + '-' + $scope.custManagerNo + '-' + $scope.custManagerNo + '-0-' + refType + "-" + refCause + "-" + refOtherDesc;
                                            var param = {
                                                flowType: '51',
                                                optType: examine,
                                                params: _params,
                                            };


                                            jnLoanApplyService.workflow(param).then(function (rsp) {
                                                jnHelper.alert('贷款申请审批成功！').then(function () {
                                                    jnPage.modified = false;
                                                    jnPage.back();
                                                });
                                            });
                                        } else {
                                            return jnHelper.alert('当前存在【 ' + errMsg.replace(',', ' ') + '】必须复核却未进行复核的资料！');

                                        }
                                    }
                                });
                            });
                    }


                }]
        );
})();
