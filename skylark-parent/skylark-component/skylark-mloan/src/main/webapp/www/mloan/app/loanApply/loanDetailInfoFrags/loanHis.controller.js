(function() {
    'use strict';
    angular
        .module('loanApply')
        .controller('loanHisCtrl', loanHisCtrl);

    loanHisCtrl.$inject = ['$state','$scope', 'jnUser', 'jnHelper', 'LoanDetailInfoService','LoanApplyUtilService','jnConstant'];

    function loanHisCtrl($state,$scope, jnUser, jnHelper, LoanDetailInfoService,LoanApplyUtilService,jnConstant) {
        var self = this;

        var parentVM = $scope.loanDetailInfoCtrl, // 获取父scope的VM
            getApplyInfoParam = parentVM.acceptParamObj; // 获取上一页面传的参数

        self.data = {
        	 custNo: getApplyInfoParam.custNo,
        	 loanNo: getApplyInfoParam.loanNo,
        	 isReadOnly :parentVM.acceptParamObj.isReadOnly// 表单是否只读,默认false
        };
        
        self.currLoan = function(){
        	$state.go("loanApplyCurrLoanView", self.data);
        };
        
        self.hisLoan = function(){
        	$state.go("loanApplyHisLoanView", self.data);
        };
        
        self.extGuar = function(){
        	$state.go("loanApplyExtGuarView", self.data);
        }
        
        self.creditInfo = function(){
        	$state.go("loanApplyCreditInfoView", self.data);
        }
       
        // 设置当前表单信息，以便于父页面调用
        LoanApplyUtilService.setFormMap({
            formName: "loanHis",
            saveFunc: saveForm,
            editFunc: editForm,
            getIsReadOnly: getIsReadOnly
        });

        function getIsReadOnly() {
            return self.isReadOnly;
        }

        function saveForm() {
            self.isReadOnly = true;
        }

        function editForm() {
            self.isReadOnly = false;
        }
    }

})();
