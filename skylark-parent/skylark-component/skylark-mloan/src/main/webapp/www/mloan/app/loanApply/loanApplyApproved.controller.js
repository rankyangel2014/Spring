(function () {
    'use strict';

    angular
        .module('loanApply')
        .controller('loanApplyApprovedCtrl',
            [
                'LoanDetailInfoService',
                '$ionicPopup',
                '$state',
                '$scope',
                'jnUser',
                'jnForm',
                '$filter',
                'jnHelper',
                'jnValidate',
                'jnPage',
                '$stateParams',
                function (LoanDetailInfoService,
                          $ionicPopup,
                          $state,
                          $scope,
                          jnUser,
                          jnForm,
                          $filter,
                          jnHelper,
                          jnValidate,
                          jnPage,
                          $stateParams) {


                    var self = this;
                    //审批人
                    var managers = {};
                    //岗位ID
                    var stationId = '';
                    //部门ID
                    var deptId = '';

                    if(jnUser.hasStation('500')){
                        stationId = '501';
                        deptId = '' ;
                    }else {
                        stationId = '500';
                        deptId = jnUser.deptId;
                    }

                    $scope.data = {};
                    self.form = {flowType: '0'};

                    self.justManager = jnUser.getMaxStation() == '400';//客户经理
                    self.justTeamManager = jnUser.getMaxStation() == '500';//团队经理
                    self.justSysManager = jnUser.getMaxStation() == '566';//后台人员

                    //团队经理
                    if (self.justTeamManager || self.justSysManager) {
                        self.form.deptId = jnUser.deptId;
                    }
                    //客户经理
                    if (self.justManager) {
                        self.form.custManagerNo = jnUser.userId;
                    }
                    var params = '51' + "-" + jnUser.insttuId + "-" + $stateParams.custNo + "-" + $stateParams.loanNo + '-0-0-0';
                    //提交审批
                    self.submit = function () {
                        if (self.form.flowType == '0') {//个人审批

                            if (self.form.smsChecked) {//短信

                                params += '-3';
                            } else {

                                params += '-1';
                            }
                        } else {

                            params += "-2";
                        }
                        params += "-" + $scope.data.userId + "-" + jnUser.getMaxStation() + "-0-0-0-0-0-0-0-0";
                        jnForm.validate(self.myForm)
                            .then(function () {
                                LoanDetailInfoService.workflow({
                                    params: params,
                                    flowType: '51',
                                    optType: '3'
                                }).then(function (rsp) {
                                    return jnHelper.alert('提交审批成功！')
                                }).then(function () {
                                    jnPage.modified = false;
                                    jnPage.backTo('main');
                                });
                            });
                    };

                    //改变审批方式
                    self.changeFlowType = function (flowType) {
                        self.form.applySignedName = '';
                        if (flowType == '0') {//个人审批

                        } else if (flowType == '1') {//岗位审批
                            self.form.smsChecked = false;
                            self.form.mobile = '';
                        }
                    }


                    //选择审批者
                    self.selectApprovedName = function (flowType) {
                        if (flowType == '0') {//个人审批
                            LoanDetailInfoService.getXwdOperatorList({
                                stationId: stationId,
                                deptId: deptId
                            }).then(function (rsp) {
                                $scope.managers = rsp.root;
                                if ($scope.managers) {
                                    $scope.managers.forEach(function (e) {
                                        managers[e.userId] = e;
                                    });
                                }
                            });


                        } else if (flowType == '1') {//岗位审批
                            LoanDetailInfoService.getStationList({
                                stationIds: stationId
                            }).then(function (rsp) {
                                $scope.managers = rsp.root;
                                if ($scope.managers) {
                                    $scope.managers.forEach(function (e) {
                                        managers[e.userId] = e;
                                    });
                                }
                            });
                        }

                        self.popupWin();


                    }
                    //选择短信发送
                    self.selectSms = function (smsChecked) {
                        if (smsChecked) {
                            self.form.mobile = $scope.data.mobile
                        } else {
                            self.form.mobile = '';
                        }
                    }


                    //审批人选择弹出框
                    self.popupWin = function () {
                        var myPopup = $ionicPopup
                            .show({
                                templateUrl: 'app/loanApply/popupLoanApplyWin.html',
                                title: '请选择',
                                scope: $scope,
                                buttons: [{
                                    text: '关闭'
                                }, {
                                    text: '确定',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        if (!$scope.data.userId) {
                                            jnHelper.alert('请选择审批人或岗位！');
                                            e.preventDefault();
                                        } else {
                                            return $scope.data.userId;
                                        }
                                    }
                                }]
                            });
                        myPopup.then(function (userId) {
                            if (userId === void 0) {
                                return;
                            }
                            $scope.data.mobile = managers[userId].mobile;
                            self.form.applySignedName = managers[userId].userName;

                        });
                    };

                }]
        );

})();

