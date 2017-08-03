(function () {
'use strict';

jn.angular.page({
    state: 'loanCheckAdd',
    url: '/loanCheck/add',
    params: [
        'loanNo',
        'checkDate',
        'remark',
        'realCheckDate',
        'checkStatus',
    ],
    template: 'app/loanCheck/addCheck.html',
    controller: [
        '$scope',
        '$stateParams',
        'jnUser',
        'jnPage',
        'jnHelper',
        'jnLoanCheckService',
        '$filter',
        function (
            $scope,
            $stateParams,
            jnUser,
            jnPage,
            jnHelper,
            jnLoanCheckService,
            $filter
        ) {
                $scope.form = {};
                $scope.form.loanNo = $stateParams.loanNo;
                $scope.form.checkDate = $stateParams.checkDate;
                $scope.form.checkStatus = '0';
                $scope.form.remark = $stateParams.remark;
                $scope.form.orgNo = jnUser.insttuId;


                jnLoanCheckService.getCheck({
                    loanNo: $stateParams.loanNo,
                    checkDate: $stateParams.checkDate
                }).then(function (rsp) {
                    $scope.form.loanNo = $stateParams.loanNo;
                    $scope.form.realCheckDateStr = rsp.data.realCheckDate;
                    $scope.form.surveyType = rsp.data.surveyType;
                    $scope.form.content = rsp.data.content;
                    $scope.form.propose = rsp.data.propose;

                });


                $scope.submit = function () {
                    $scope.validateForm()
                        .then(function () {
                            jnLoanCheckService.addCheck($scope.form).then(function (rsp) {
                                if (rsp.success) {
                                    jnPage.modified = false;
                                    jnHelper.alert('保存成功,请到电脑端进行提交审批操作！').then(function (rsp) {
                                            jnPage.back();
                                        }
                                    );
                                }
                            });
                        });
                };

        }]
});
/*
    angular
        .module('myBusiness')
        .controller('loanCheckAddCtrl', [
            '$stateParams', 'jnUser', 'jnForm', 'jnPage', 'jnHelper', 'jnLoanCheckService', '$filter',
            function ($stateParams, jnUser, jnForm, jnPage, jnHelper, jnLoanCheckService, $filter) {
                var self = this;
                self.form = {};
                self.form.loanNo = $stateParams.loanNo;
                self.form.checkDate = $stateParams.checkDate;
                self.form.checkStatus = '0';
                self.form.remark = $stateParams.remark;
                self.form.orgNo = jnUser.insttuId;


                jnLoanCheckService.getCheck({
                    loanNo: $stateParams.loanNo,
                    checkDate: $stateParams.checkDate
                }).then(function (rsp) {
                    self.form.loanNo = $stateParams.loanNo;
                    self.form.realCheckDateStr = rsp.data.realCheckDate;
                    self.form.surveyType = rsp.data.surveyType;
                    self.form.content = rsp.data.content;
                    self.form.propose = rsp.data.propose;

                });


                self.submit = function () {
                    self.validateForm()
                        .then(function () {
                            jnLoanCheckService.addCheck(self.form).then(function (rsp) {
                                if (rsp.success) {
                                    jnPage.modified = false;
                                    jnHelper.alert('保存成功,请到电脑端进行提交审批操作！').then(function (rsp) {
                                            jnPage.back();
                                        }
                                    );
                                }
                            });
                        });
                };

            }]
        );
        */

})();

