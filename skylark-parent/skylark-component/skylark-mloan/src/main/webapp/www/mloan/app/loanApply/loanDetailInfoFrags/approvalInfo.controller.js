(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('approvalInfoCtrl', approvalInfoCtrl);


    approvalInfoCtrl.$inject = ['$scope', 'jnUser', 'jnHelper', 'LoanDetailInfoService','LoanApplyUtilService','jnApprovalInfoService','jnConstant'];

    function approvalInfoCtrl($scope, jnUser, jnHelper, LoanDetailInfoService,LoanApplyUtilService,jnApprovalInfoService,jnConstant) {
        var self = this;

        var parentVM = $scope.loanDetailInfoCtrl, // 获取父scope的VM
            getApplyInfoParam = parentVM.acceptParamObj; // 获取上一页面传的参数

        self.isReadOnly = parentVM.acceptParamObj.isReadOnly || false; // 表单是否只读,默认false
        
        // 测试数据
      
        
        self.form = {
        	 examine: '',
        	 opinion:'',
        	 refTypeTxt:'',
        	 refCauseTxt:'',
        	 thTxt:''
        };
        // 查询审批配置信息
        jnApprovalInfoService.getLoanApproveCfg({
        	appTyp: 'appl_prog',
            loanNo: getApplyInfoParam.loanNo
        }).then(function (rsp) {
        	self.form.pproveCfg = rsp.success ? rsp.root : [];
        });
        // 查询审批信息
        jnApprovalInfoService.getExamInfo({
            custNo: getApplyInfoParam.custNo,
            pCustNo:getApplyInfoParam.custNo,
            loanNo: getApplyInfoParam.loanNo
        }).then(function (rsp) {
        	
        	 var result = rsp.success ? rsp.data : {};
        	 var exapResult = result.exapResultA || result.exapResultB || result.exapResultC || result.exapResultD;
     		 var exapDesc= result.exapDescA ||  result.exapDescA ||  result.exapDescA ||  result.exapDescA;
     		 
     		 if(exapResult == null || exapResult=='' || exapResult == undefined){
     			 self.form.examine = '';
     			 self.form.opinion = '';
     		 }else{
     			 self.form.examine = exapResult;
     			 self.form.opinion = exapDesc;
     		 }
     		 
     		 if( self.form.examine == '1' && result.refType != null && result.refType !=''){
     			 self.form.refTypeTxt = jnConstant.get("897")[result.refType];
     			 self.form.refCauseTxt = result.refType == '0'?
     			     jnConstant.get("998")[result.refCause]:
     				 jnConstant.get("898")[result.refCause];
     			  if(result.refType == '1'){
     				 self.form.refCause_p = result.refCause;
     			  }else{
     				 self.form.refCause_c =  result.refCause;
     			  }
     			  self.form.refOtherDesc = result.refOtherDesc;
     		 }else if(self.form.examine == '2'){
     			 self.form.thTxt =  exapDesc;
     		 }
     		 
        });

        // 设置当前表单信息，以便于父页面调用
        LoanApplyUtilService.setFormMap({
            formName: "approvalInfo",
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
