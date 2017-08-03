/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('loanApply')
    .controller('qryResultCtrl',
        ['jnHttp', 'jnUser','$stateParams','$scope','jnHelper','jnPage',
        function (jnHttp, jnUser,$stateParams,$scope,jnHelper,jnPage) {
           var params = {};
           
           var self = this;
           self.form = {};
           params.custNo = $stateParams.custNo;//客户编号
           params.loanNo = $stateParams.loanNo;//贷款合同号
           params.moduleId = $stateParams.moduleId;
           //是否只读。若只读，隐藏可操作按钮,地址栏传递是，为字符串
           if($stateParams.isReadOnly == "true"){
        	   self.isReadOnly = true;
           }
           if($stateParams.isReadOnly == "false"){
        	   self.isReadOnly = false;
           }
           
	       jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=getCreditInvest',
	            params).then(function(rsp){
	            	if(rsp.data != null){
	            		self.form.indComCredit = rsp.data.indComCredit;
	            		self.form.indComCreditSts = rsp.data.indComCreditSts;
	            		self.form.smallLoanCredit = rsp.data.smallLoanCredit;
	            		self.form.smallLoanCreditSts = rsp.data.smallLoanCreditSts;
	            		self.form.centralBankCredit = rsp.data.centralBankCredit;
	            		self.form.centralBankCreditSts = rsp.data.centralBankCreditSts;
	            		self.form.internetCreditSts = rsp.data.internetCreditSts;
	            	}
	            });
	       
	       //保存征信记录数据
	       self.saveForm = function () {
	    	   self.form.custNo = $stateParams.custNo;//客户编号
	    	   self.form.loanNo = $stateParams.loanNo;//贷款合同号
	    	   self.form.moduleId = $stateParams.moduleId;//贷款合同号
	    	   self.form.prodNo = '';
	    	   
	    	   //发后台请求
	    	   jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=creditInvestAction',
	    			   self.form).then(function(rsp){
	    				if(rsp.success){
	    					jnHelper.alert('保存成功').then(
									function(rsp){
                                        jnPage.back();
									}
							);
	    				}else{
	    					jnHelper.alert('保存失败！');
	    				}
	   	            });
	    	   
           };
                       
        }]
    );

})();
