(function () {
'use strict';

/**
 * 信贷记录当前融资
 */
jn.angular.page({
    state: 'loanApplyCurrLoanView',
    url: '/loanApply/loanApplyCurrLoanView',
    params: [
        'custNo',
        'loanNo',
        'isReadOnly',
    ],
    template: 'app/loanApply/loanHisRecord/currLoan.html',
    controller: [
        '$state',
        '$scope',
        '$ionicModal',
        'jnUser',
        '$filter',
        'jnForm',
        'jnHelper',
        '$stateParams',
        'jnConstant',
        'jnLoanHisRecordService',
        'jnPage',
        '$ionicListDelegate',
        function (
            $state,
            $scope,
            $ionicModal,
            jnUser,
            $filter,
            jnForm,
            jnHelper,
            $stateParams,
            jnConstant,
            jnLoanHisRecordService,
            jnPage,
            $ionicListDelegate
        ) {
        	$scope.data = $stateParams;
        	$scope.data.isReadOnly =  $stateParams.isReadOnly === 'true' ;
        	
        	jnLoanHisRecordService.getCurLoanHis({
        		custNo:$stateParams.custNo,
        		loanNo:$stateParams.loanNo,
        		type:'1'
        	}).then(function(rsp){
        		$scope.loans = {};
        		$scope.loans.data = rsp.root;
        		$scope.loans.total = rsp.total;
        	});
        	
        	$scope.operType =='0';
        	$scope.currLoanModalConf = {};
        	var $currScope = $scope.currLoanModalConf; 
        	 
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
        	
        	$scope.add = function(){
        	
        		$scope.operType ="0";
        		$currScope.form ={
            			loanNo : $stateParams.loanNo,
    					custNo : $stateParams.custNo,
    					moduleId : '9',
    					prodNo   : '',
    					operType : $scope.operType
            	};
        		$currScope.oldForm = angular.copy($currScope.form);
        		$scope.modal.show();
        	}
        	
        	$scope.edit = function(data,$event){
        		$scope.operType ="1";
        		$currScope.form = {
            			loanNo : $stateParams.loanNo,
    					custNo : $stateParams.custNo,
    					moduleId : '9',
    					prodNo   : '',
    					operType : $scope.operType
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
        	
        	$scope.remove = function(data,$event){
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
                     			 jnHelper.removeArrayItem($scope.loans.data,
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
                $scope.validateForm().then(function () {
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
                            		$scope.loans = {};
                            		$scope.loans.data = rsp.root;
                            		$scope.loans.total = rsp.total;
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
        	 
        	
        }
    ],
});
})();
