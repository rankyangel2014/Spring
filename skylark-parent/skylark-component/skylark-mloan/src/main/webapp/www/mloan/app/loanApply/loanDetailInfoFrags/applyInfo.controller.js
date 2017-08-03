(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('applyInfoCtrl', applyInfoCtrl);


    applyInfoCtrl.$inject = ['$scope', 'jnUser', 'jnHelper', 'LoanDetailInfoService', 'LoanApplyUtilService', 'LoanBaseInfoService', 'jnForm', '$state'];


    function applyInfoCtrl($scope, jnUser, jnHelper, LoanDetailInfoService, LoanApplyUtilService, LoanBaseInfoService, jnForm, $state) {
        var self = this;

        //获取父scope的VM
        var parentVM = $scope.loanDetailInfoCtrl;

        //表单是否只读
        self.isReadOnly = parentVM.acceptParamObj.isReadOnly;

        self.form = {};
        self.goGuarantee = goGuarantee;

        //跳转到担保方式界面
        function goGuarantee() {
            $state.go('guaranteeWay', {
                loanNo: parentVM.acceptParamObj.loanNo,
                custNo: parentVM.acceptParamObj.custNo,
                isReadOnly: self.isReadOnly
            });
        }

        //初始化
        function initForm() {
            LoanDetailInfoService.getLoanApplyBaseInfo({
                moduleId: "18",
                loanNo: parentVM.acceptParamObj.loanNo,
                custNo: parentVM.acceptParamObj.custNo,
            }).then(function(rsp) {
                if (rsp.success) {
                    if (rsp.data.applDt) {
                        self.form.applDt = moment(rsp.data.applDt).format('YYYY-MM-DD');
                    }
                    if (rsp.data.reqDt) {
                        self.form.reqDt = moment(rsp.data.reqDt).format('YYYY-MM-DD');
                    }
                    self.form.custNo = rsp.data.custNo;
                    self.form.custType = parentVM.acceptParamObj.custType;
                    self.form.applCustProp = rsp.data.applCustProp;
                    self.form.prodNo = rsp.data.prodNo;
                    self.form.applAmt = rsp.data.applAmt;
                    self.form.applPerd = rsp.data.applPerd;
                    self.form.repayAbilityM = rsp.data.repayAbilityM;
                    self.form.applLoanUse = rsp.data.applLoanUse;
                    self.form.applInTrade = rsp.data.applInTrade;
                    self.form.applCapitalDirection = rsp.data.applCapitalDirection;
                    self.form.applPurpose = rsp.data.applPurpose;
                }
            });

            self.form.applDt = moment(jnUser.jyrq).format('YYYY-MM-DD');
        }

        //初始化【产品类型】
        function initProdTypeList() {
            LoanBaseInfoService.getProdTypeList({
                paramValue: parentVM.acceptParamObj.custType
            }).then(function(data) {
                self.prodTypeList = data;
            });
        }

        //保存【申请信息】
        function saveForm() {
            var data = angular.copy(self.form);
            //格式化时间字段
            data.applDt = moment(data.applDt).format('YYYYMMDD');
            data.reqDt = moment(data.reqDt).format('YYYYMMDD');

            jnForm.validate(self.applyInfoForm).then(function() {
                LoanDetailInfoService.saveLoanApplyBaseInfo(jnHelper.merge(data, {
                    moduleId: '18',
                    loanNo: parentVM.acceptParamObj.loanNo
                })).then(function(rsp) {
                    if (rsp.success) {
                        jnHelper.alert("【申请信息】保存成功！");
                    }
                });
            });
        }

        //设置当前表单信息，以便于父页面调用
        LoanApplyUtilService.setFormMap({
            formName: "applyInfo",
            saveFunc: saveForm
        });
        initForm();
        initProdTypeList();
    }
})();
