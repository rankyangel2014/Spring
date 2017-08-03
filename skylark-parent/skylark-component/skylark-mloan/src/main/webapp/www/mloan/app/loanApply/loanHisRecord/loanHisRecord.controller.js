(function () {
    'use strict';
    angular
        .module('loanApply')
        /*
        .controller('loanApplyCurrLoanCtrl', 
        	['$state','$scope','$ionicModal','jnUser','$filter','jnForm', 'jnHelper', '$stateParams','jnConstant','jnLoanHisRecordService','jnPage','$ionicListDelegate',
            function ($state,$scope,$ionicModal,jnUser,$filter,jnForm,jnHelper, $stateParams,jnConstant,jnLoanHisRecordService,jnPage,$ionicListDelegate) {
              
        	var self = this;
        	self.data = $stateParams;
        	self.data.isReadOnly =  $stateParams.isReadOnly === 'true' ;
        	
        	jnLoanHisRecordService.getCurLoanHis({
        		custNo:$stateParams.custNo,
        		loanNo:$stateParams.loanNo,
        		type:'1'
        	}).then(function(rsp){
        		self.loans = {};
        		self.loans.data = rsp.root;
        		self.loans.total = rsp.total;
        	});
        	
        	self.operType =='0';
        	self.currLoanModalConf = {};
        	var $currScope = self.currLoanModalConf; 
        	 
        	$ionicModal.fromTemplateUrl('app/loanApply/loanHisRecord/currLoanForm.html', {
        		      scope: $scope,
        		      animation: 'slide-in-up',
        		      backdropClickToClose:false
        		    }).then(function(modal) {
        		      $scope.modal = modal;
        		    });
        	$currScope.form  = {};
        	$scope.selectLoan = {};
        	
        	$currScope.oldForm = {};
        	
        	self.add = function(){
        	
        		self.operType ="0";
        		$currScope.form ={
            			loanNo : $stateParams.loanNo,
    					custNo : $stateParams.custNo,
    					moduleId : '9',
    					prodNo   : '',
    					operType : self.operType
            	};
        		$currScope.oldForm = angular.copy($currScope.form);
        		$scope.modal.show();
        	}
        	
        	self.edit = function(data,$event){
        		self.operType ="1";
        		$currScope.form = {
            			loanNo : $stateParams.loanNo,
    					custNo : $stateParams.custNo,
    					moduleId : '9',
    					prodNo   : '',
    					operType : self.operType
            	};
        		
        		$currScope.form.recId = data.recId;
        		$currScope.form.lender = data.lender;
        		$currScope.form.amt = data.amt;
        		$currScope.form.lendDt =  data.lendDt!=null && data.lendDt!=undefined && data.lendDt!=''
        			? moment(data.lendDt).format('YYYY/MM/DD'):'' ;
        		$currScope.form.perd = data.perd;
        		$currScope.form.gurTyp = data.gurTyp;
        		$currScope.form.instmAmt = data.instmAmt;
        		$currScope.form.bal = data.bal;
        		$currScope.form.purpose = data.purpose;
        		$currScope.form.overdueDesc = data.overdueDesc;
        		$currScope.oldForm = angular.copy($currScope.form);
        		$scope.modal.show();
        	}
        	
        	self.remove = function(data,$event){
        		 $event.stopPropagation();
                 var text = '确实要删除当前融资' + data.lender + '吗？';
                 jnHelper.confirm(text).then(function (confirmed) {
                     if (confirmed) {
                    	 var params = {
                 				custNo   : $stateParams.custNo,
             					loanNo   : $stateParams.loanNo,
             					recId    : data.recId,
             					moduleId : '9',
             					operType : '2'
                 		}
             			jnLoanHisRecordService.saveLoanCur(params).then(function(rsp){
                     		if(rsp.success){
                     			 jnHelper.removeArrayItem(self.loans.data,
                                          function (e) {
                                              return e.recId === data.recId;
                                          }
                                      );
                     		}
                     	});
                     } else {
                         $ionicListDelegate.closeOptionButtons();
                     }
                 });
        		
        	}
        	
        	$currScope.closeModal = function() {
        	
        		if(!angular.equals($currScope.oldForm,$currScope.form)){
        			 jnHelper.confirm('尚未保存，是否取消？')
                     .then(function (confirmed) {
                         if (! confirmed) {
                             return;
                         }
                         $scope.modal.hide();
                     });
        		}else{
                      $scope.modal.hide();
        		}
        		
        	};
        	
        	$currScope.save = function(){
        		jnForm.validate($currScope.currloanForm).then(function () {
        			var data = angular.copy($currScope.form)
            		data.lendDt =  data.lendDt!=null && data.lendDt!=undefined && data.lendDt!=''
            			? moment(data.lendDt).format('YYYYMMDD'):'' ;
        			jnLoanHisRecordService.saveLoanCur(data).then(function(rsp){
                		if(rsp.success){
                			jnHelper.alert('保存成功！').then(function(){
                				$scope.modal.hide();
                    			jnLoanHisRecordService.getCurLoanHis({
                            		custNo:$stateParams.custNo,
                            		loanNo:$stateParams.loanNo,
                            		type:'1'
                            	}).then(function(rsp){
                            		self.loans = {};
                            		self.loans.data = rsp.root;
                            		self.loans.total = rsp.total;
                            	});
                    			jnPage.modified= false;
                			});
                		}
                	});
        		});
        	};
        	
        
        	
        	$scope.$on('$destroy', function() {
        		$scope.modal.remove();
        	});
        	 
        	
        }])
*/
    	.controller('loanApplyHisLoanCtrl', 
        	['$state','$scope', 'jnUser','$filter','jnForm', 'jnHelper', '$stateParams','jnConstant','jnLoanHisRecordService','jnPage',
            function ($state,$scope, jnUser,$filter,jnForm,jnHelper, $stateParams,jnConstant,jnLoanHisRecordService,jnPage) {
              
        	var self = this;
        	self.data = $stateParams;
        	self.data.isReadOnly =  $stateParams.isReadOnly === 'true' ;
        	self.data.btnStatus = true;
        	
        	jnLoanHisRecordService.getLoanHis({
        		custNo:$stateParams.custNo,
        		loanNo:$stateParams.loanNo
        	}).then(function(rsp){
        		self.his = {};
        		self.his.data = rsp.root;
        		self.his.total = rsp.total;
        	});
        	
        	self.edit = function(){
        		self.data.btnStatus = false;
        	}
        	self.save = function(){
        		
        		jnForm.validate(self.hisLoanForm).then(function () {
        			var loanHis = [];
            		for ( var int = 0; int < self.his.data.length; int++) {
            			var obj =  self.his.data[int];
            			loanHis[int] = {
            					"lastFinaState":obj.lastFinaState,
            					"lastFinaDt":obj.lastFinaDt
            			};
    				}
            		var params = {
            				loanNo:$stateParams.loanNo,
            				custNo:$stateParams.custNo,
            				moduleId:10,
            				prodNo:'',
            				loanHis:JSON.stringify(loanHis)
            		};
            		jnLoanHisRecordService.saveLoanHis(params).then(function(){
                		self.data.btnStatus = true;
                		jnPage.modified= false;
            		});
        		});
        		
        	}	
            	
        }])
        /*
		.controller('loanApplyExtGuarCtrl', 
			['$state','$scope','$ionicModal','jnUser','$filter','jnForm', 'jnHelper', '$stateParams','jnConstant','jnLoanHisRecordService','jnPage','$ionicListDelegate',
		    function ($state,$scope,$ionicModal,jnUser,$filter,jnForm,jnHelper, $stateParams,jnConstant,jnLoanHisRecordService,jnPage,$ionicListDelegate) {
   
        	var self = this;
        	self.data = $stateParams;
        	self.data.isReadOnly =  $stateParams.isReadOnly === 'true' ;
        	jnLoanHisRecordService.getGuarantee({
        		custNo:$stateParams.custNo,
        		loanNo:$stateParams.loanNo,
        		type:'2'
        	}).then(function(rsp){
        		self.guar = {};
        		self.guar.data = rsp.root;
        		self.guar.total = rsp.total;
        	});
        	
        	self.operType =='0';
        	self.extGuarModalConf = {};
        	var $extGuarScope = self.extGuarModalConf; 
        	 
        	$ionicModal.fromTemplateUrl('app/loanApply/loanHisRecord/extGuarForm.html', {
        		      scope: $scope,
        		      animation: 'slide-in-up',
        		      backdropClickToClose:false
        		    }).then(function(modal) {
        		      $scope.modal = modal;
        		    });
        	$extGuarScope.form  = {};
        	$extGuarScope.oldForm = {};
        	$scope.selectLoan = {};
        	
        	self.add = function(){
        		self.operType ="0";
        		$extGuarScope.form ={
            			loanNo : $stateParams.loanNo,
    					custNo : $stateParams.custNo,
    					moduleId : '20',
    					prodNo   : '',
    					operType : self.operType
            	};
        		$extGuarScope.oldForm = angular.copy($extGuarScope.form);
        		$scope.modal.show();
        	}
        	
        	self.edit = function(data,$event){
        		self.operType ="1";
        		$extGuarScope.form = {
            			loanNo : $stateParams.loanNo,
    					custNo : $stateParams.custNo,
    					moduleId : '20',
    					prodNo   : '',
    					operType : self.operType
            	};
        		
        		$extGuarScope.form.recId = data.recId;
        		$extGuarScope.form.lender = data.lender;
        		$extGuarScope.form.amt = data.amt;
        		$extGuarScope.form.lendDt = data.lendDt!=null && data.lendDt!=undefined && data.lendDt!=''
        			? moment(data.lendDt).format('YYYY/MM/DD'):'' ;
        		$extGuarScope.form.perd = data.perd;
        		$extGuarScope.form.gurTyp = data.gurTyp;
        		$extGuarScope.form.gurAmt = data.gurAmt;
        		$extGuarScope.form.bal = data.bal;
        		$extGuarScope.form.purpose = data.purpose;
        		$extGuarScope.form.overdueDesc = data.overdueDesc;
        		$extGuarScope.oldForm = angular.copy($extGuarScope.form);
        		$scope.modal.show();
        	}
        	
        	self.remove = function(data,$event){
        		 $event.stopPropagation();
                 var text = '确实要删除对外担保' + data.lender + '吗？';
                 jnHelper.confirm(text).then(function (confirmed) {
                     if (confirmed) {
                    	 var params = {
                 				custNo   : $stateParams.custNo,
             					loanNo   : $stateParams.loanNo,
             					recId    : data.recId,
             					moduleId : '20',
            					operType : '2'
                 		}
             			jnLoanHisRecordService.saveLoanGuar(params).then(function(rsp){
                     		if(rsp.success){
                     			 jnHelper.removeArrayItem(self.guar.data,
                                          function (e) {
                                              return e.recId === data.recId;
                                          }
                                      );
                     		}
                     	});
                     } else {
                         $ionicListDelegate.closeOptionButtons();
                     }
                 });
        		
        	}
        	$extGuarScope.closeModal = function() {
        		if(!angular.equals($extGuarScope.oldForm,$extGuarScope.form)){
       			 jnHelper.confirm('尚未保存，是否取消？')
                    .then(function (confirmed) {
                        if (! confirmed) {
                            return;
                        }
                        $scope.modal.hide();
                    });
	       		}else{
	                     $scope.modal.hide();
	       		}
        		
        	};
        
        	$extGuarScope.save = function(){
        		jnForm.validate($extGuarScope.extGuarForm).then(function () {
        			var data = angular.copy($extGuarScope.form)
            		data.lendDt = data.lendDt!=null && data.lendDt!=undefined && data.lendDt!=''
            			? moment(data.lendDt).format('YYYYMMDD'):'' ;
        			jnLoanHisRecordService.saveLoanGuar(data).then(function(rsp){
                		if(rsp.success){
                			jnHelper.alert('保存成功！').then(function(){
                				$scope.modal.hide();
                    			jnLoanHisRecordService.getGuarantee({
                            		custNo:$stateParams.custNo,
                            		loanNo:$stateParams.loanNo,
                            		type:'2'
                            	}).then(function(rsp){
                            		self.guar = {};
                            		self.guar.data = rsp.root;
                            		self.guar.total = rsp.total;
                            	});
                    			
                    			jnPage.modified= false;
                			})
                		}
                	});
        		});
        	};
        	
        	$scope.$on('$destroy', function() {
        		$scope.modal.remove();
        	});
	        	
	        	
	    }])
        */
    	.controller('loanApplyCreditInfoCtrl', 
	        	['$state','$scope', 'jnUser','$filter','jnForm', 'jnHelper', '$stateParams','jnConstant','jnLoanHisRecordService','jnPage',
	            function ($state,$scope, jnUser,$filter,jnForm,jnHelper, $stateParams,jnConstant,jnLoanHisRecordService,jnPage) {
	              
	        	var self = this;
	        	self.data = $stateParams;
	        	self.data.isReadOnly =  $stateParams.isReadOnly === 'true' ;
	        	self.data.btnStatus = true;
	        	
	        	self.edit = function(){
	        		self.data.btnStatus = false;
	        	}
	        	self.save = function(){
	        		
	        		jnForm.validate(self.creditInfoForm).then(function () {
	        			var params = {
	            				loanNo:$stateParams.loanNo,
	            				custNo:$stateParams.custNo,	
	            				moduleId : '15',
	            				prodNo:'',
	            				crdtCardNum:self.form.crdtCardNum,
	            				totalCrdtAmt:self.form.totalCrdtAmt,
	            				usedCrdtAmt:self.form.usedCrdtAmt,
	            				tzRate:self.form.tzRate,
	            				sixMonthAvg:self.form.sixMonthAvg,
	            				crdtCardOverdueDesc:self.form.crdtCardOverdueDesc
	    	        		}
	    	        		jnLoanHisRecordService.saveLoanCredit(params).then(function(rsp){
	    	        			self.data.btnStatus = true;
	    		        		jnPage.modified= false;
	    		        	});
	        		});
	        	}
	        	
	        	self.onAmtChange = function(){
	        		if (self.form.usedCrdtAmt!=null &&self.form.usedCrdtAmt!=''&&self.form.usedCrdtAmt!=0
	        				&& self.form.totalCrdtAmt!=null && self.form.totalCrdtAmt!='' && self.form.totalCrdtAmt!=0) {
	        			self.form.tzRate = 
	        				Number(self.form.usedCrdtAmt) * 100 / Number(self.form.totalCrdtAmt);
	        		}
	        	}
	        	
	        	jnLoanHisRecordService.getCreditCard({
	        		custNo:$stateParams.custNo,
	        		loanNo:$stateParams.loanNo,
	        		moduleId:'13'
	        	}).then(function(rsp){
	        		self.form = rsp.data;
	        		if (self.form.usedCrdtAmt!=null &&self.form.usedCrdtAmt!=''&&self.form.usedCrdtAmt!=0
	        				&& self.form.totalCrdtAmt!=null && self.form.totalCrdtAmt!='' && self.form.totalCrdtAmt!=0) {
	        			self.form.tzRate = 
	        				Number(self.form.usedCrdtAmt) * 100 / Number(self.form.totalCrdtAmt);
	        		}
	        	});
	    }   
     ])
})();
