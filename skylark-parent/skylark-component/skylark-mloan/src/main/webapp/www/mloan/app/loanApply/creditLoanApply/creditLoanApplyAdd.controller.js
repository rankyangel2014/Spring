(function () {
    'use strict';
    angular
        .module('loanApply')
        .controller('creditLoanApplyAddCtrl', 
        	['$state','$scope', 'jnUser','$filter','jnForm', 'jnHelper', '$stateParams','jnConstant','creditLoanApplyAddService','jnPage',
            function ($state,$scope, jnUser,$filter,jnForm,jnHelper, $stateParams,jnConstant,creditLoanApplyAddService,jnPage) {
              
        	var self = this;
        	
        	self.submitFlag = false;
        	
        	self.saveFlag = false;
        	
        	self.custType = $stateParams.custType || '0';
        	
        	self.credit = {};
        	
        	//初始化
        	self.form = {
    			custNo:$stateParams.custNo,
    			crdtNo:$stateParams.crdtNo,
    			loanNo:$stateParams.loanNo||'',
    			pageFlag:'2',
    			flowFlag:'0'
        	};
        	
        	// 获取授信信息
        	creditLoanApplyAddService.getCreditInfo({
        		crdtNo: $stateParams.crdtNo,
        		custNo: $stateParams.custNo
            }).then(function (rsp) {
            	self.creditflag =  rsp.success;
            	self.credit = rsp.success ? rsp.data : {};
            });
        	
        	//贷款合同号为空时为新增用信，反之则为修改用信信息
        	if(self.form.loanNo == undefined || self.form.loanNo == null || self.form.loanNo == ''){
            	self.submitFlag = false;
            	self.saveFlag = true;
            	self.form.applDt =   moment(jnUser.jyrq).format('YYYY-MM-DD') ;
            	self.form.isInPerd = 'Y';
        	}else{
        		// 获取用信申请信息
            	creditLoanApplyAddService.getCreditLoanApply({
            		loanNo: $stateParams.loanNo,
            		custNo: $stateParams.custNo
                }).then(function (rsp) {
                	
                	self.form = {
                		isInPerd:rsp.data.isInPerd,
                		applDt:moment(rsp.data.applDt).format('YYYY-MM-DD'),
                		reqDt:moment(rsp.data.reqDt).format('YYYY-MM-DD'),
                		applIntRateN:rsp.data.applIntRateN,
                		applCustProp:rsp.data.applCustProp,
                		applAmt:rsp.data.applAmt,
                		applIntRate : rsp.data.applIntRate,
                		applPerd:rsp.data.applPerd,
                		applRepayTyp:rsp.data.applRepayTyp,
                		applDueDay:Number(rsp.data.applDueDay),
                		applLoanUse:rsp.data.applLoanUse,
                		applInTrade:rsp.data.applInTrade,
                		applCapitalDirection:rsp.data.applCapitalDirection,
                		applPurpose:rsp.data.applPurpose,
                		applOtherIssueCond:rsp.data.applOtherIssueCond,
                		custNo: $stateParams.custNo,
            			crdtNo:rsp.data.crdtNo,
            			loanNo: $stateParams.loanNo,
            			pageFlag:'2',
            			flowFlag:'0',
            			status:rsp.data.status
                	};
                	if(self.form.status!='10' && self.form.status!='11' ){
                		self.submitFlag = false;
                    	self.saveFlag = false;
                	}else{
                		self.submitFlag = true;
                    	self.saveFlag = true;
                	}
                });
        	}
        	
        	//保存授信信息
        	self.save = function(){
        	
        		jnForm.validate(self.myForm).then(function () {
        			
        			var applAmt ;
            		//校验金额
            		if(self.form.applAmt ==null || self.form.applAmt=='' || self.form.applAmt == undefined){
            			applAmt = 0;
            		}else{
            			applAmt = self.form.applAmt;
            		}
            		if(applAmt > self.credit.ableAmt){
            			 jnHelper.alert('授信金额超过剩余额度，请重新输入!');
            			 return ;
            		}
            		var data = angular.copy(self.form)
            		//处理时间字段
            		data.applDt = moment(data.applDt).format('YYYYMMDD') ;
            		data.reqDt = moment(data.reqDt).format('YYYYMMDD') ;
            		//校验时间区间
            		if(data.applDt < self.credit.startDt || data.applDt > self.credit.endDt){
            			 jnHelper.alert('申请日期必须在授信有效区间内，请检查!');
            			 return ;
            		}
            		//校验申请时间和用款时间
            		if(data.applDt>data.reqDt){
            			 jnHelper.alert('申请时间不能大于用款时间，请检查!');
            			 return ;
            		}
        			
            		creditLoanApplyAddService.saveCreditLoanApply(data).then(function (rsp) {
                    	if(rsp.success){
                    		self.form.nodeNo = rsp.data.nodeNo;
                    		self.form.custNo = rsp.data.custNo;
                    		self.form.loanNo = rsp.data.loanNo;
                    		self.form.status = rsp.data.loanStatus;
                			self.form.isUseCrdtInPerd = rsp.data.isUseCrdtInPerd;
                			self.submitFlag = true;
                			jnHelper.alert('保存成功！');
                			jnPage.modified= false;
                    	}else{
                    		jnHelper.alert(rsp.errMsg);
                    	}
                    });
                });
        	};
        	
        	//提交授信申请
        	self.submit = function(){
        		jnForm.validate(self.myForm).then(function () {
        			//查询用信贷款审批状态
        			creditLoanApplyAddService.qryLoanApproverStatus({
        				loanNo:self.form.loanNo,
        				nodeNo:self.form.nodeNo
        			}).then(function (rsp) {
                    	if(rsp.success && rsp.data.isEnable=='0'){
                    		var _params="58-"+jnUser.insttuId+"-"+self.form.custNo+"-"+self.form.loanNo
                    					+"-0-0-0-2-0-0-0-0-0-0-0-0-0";
                    		//提交流程
                    		creditLoanApplyAddService.workFlowCreditLoanApply({
                				params : _params,
        						flowType : '58',
        						optType : '3'
                    		}).then(function (rsp) {
                            	if(rsp.success ){
                            		 jnHelper.alert('贷款申请提交成功！');
                            		 self.submitFlag = false;
                            		 self.saveFlag = false;
                            		 jnPage.modified= false;
                            	}else{
                            		 jnHelper.alert(rsp.errMsg);
                            	}
                            });
                    	}else{
                    		//检查流程状态
                    		creditLoanApplyAddService.checkLoanApproverStatus({
                    			bnNo : self.form.loanNo,
                    			bnType : '10',
                    			nodeNo : self.form.nodeNo,
                    			flowType:"58"
                    		}).then(function (rsp) {
                            	if(rsp.success ){
                            		 jnHelper.alert('贷款申请提交成功！');
                            		 self.submitFlag = false;
                            		 self.saveFlag = false;
                            		 jnPage.modified= false;
                            	}else{
                            		 jnHelper.alert(rsp.errMsg);
                            	}
                            });
                    	}
                    });
                });
        	};
        	
        	self.applIntRateChange = function(rateType){
        		if(rateType === 'Y'){
        			if(self.form.applIntRateN ==null || self.form.applIntRateN=='' || self.form.applIntRateN == undefined){
        				return ;
        			}
        			self.form.applIntRateN = String(self.form.applIntRateN).replace(/[^\d+(\.\d+)?$]/g,'');
        			self.form.applIntRateN =  Number(Number(self.form.applIntRateN).toFixed(4));
        			if(self.form.applIntRateN == 'NaN'){
        				self.form.applIntRateN = 0;
        			}else{
        				self.form.applIntRate = Number((self.form.applIntRateN / 1.2).toFixed(3));
        			}
        			
        		}else{
        			if(self.form.applIntRate ==null || self.form.applIntRate=='' || self.form.applIntRate == undefined){
        				return ;
        			}
        			self.form.applIntRate = String(self.form.applIntRate).replace(/[^\d+(\.\d+)?$]/g,'');
        			self.form.applIntRate = Number(Number(self.form.applIntRate).toFixed(3));
        			if(self.form.applIntRate == 'NaN'){
        				self.form.applIntRate = 0;
        			}else{
        				self.form.applIntRateN = Number((self.form.applIntRate * 1.2).toFixed(4));
        			}
        		}
        	}
        	
        	self.keyup = function(e,name){
        		self.form[name] = self.form[name].replace(/[^\d+(\.\d+)?$]/g,'');
        	}
        	
        	/**
        	 * 验证金额大小
        	 */
        	self.applAmtChange = function(){
        		
        		var applAmt ;
        		
        		if(self.form.applAmt ==null || self.form.applAmt=='' || self.form.applAmt == undefined){
        			applAmt = 0;
        		}else{
        			applAmt = self.form.applAmt;
        		}
        		if(applAmt > self.credit.ableAmt){
        			 jnHelper.alert('授信金额超过剩余额度，请重新输入!');
        			 return ;
        		}
        	}
        	
        }
        ]);
})();
