(function () {
    'use strict';
    angular
        .module('loanApply')
        .controller('creditLoanApplyViewCtrl',
        	['$state','$scope', 'jnUser','$filter','jnForm', 'jnHelper', '$stateParams','jnConstant','creditLoanApplyAddService',
            function ($state,$scope, jnUser,$filter,jnForm,jnHelper, $stateParams,jnConstant,creditLoanApplyAddService) {
              
        	var self = this;
        	
        	self.credit = {};
        	
        	self.custType = $stateParams.custType || '0';
        	
        	self.form = {};
        	
        	// 获取授信信息
        	creditLoanApplyAddService.getCreditInfo({
        		crdtNo: $stateParams.crdtNo,
        		custNo: $stateParams.custNo
            }).then(function (rsp) {
            	self.credit = rsp.success ? rsp.data : {};
            });
        	
        	// 获取用信申请信息
        	creditLoanApplyAddService.getCreditLoanApply({
        		loanNo: $stateParams.loanNo,
        		custNo: $stateParams.custNo
            }).then(function (rsp) {
            	self.form = rsp.success ? rsp.data : {};
            });
        	
        }
        ]);
})();
