(function () {
'use strict';

/**
 * 信贷记录对外担保
 */
jn.angular.page({
    state: 'loanApplyExtGuarView',
    url: '/loanApply/loanApplyExtGuarView',
    params: [
        'custNo',
        'loanNo',
        'isReadOnly',
    ],
    template: 'app/loanApply/loanHisRecord/extGuar.html',
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
        	jnLoanHisRecordService.getGuarantee({
        		custNo:$stateParams.custNo,
        		loanNo:$stateParams.loanNo,
        		type:'2'
        	}).then(function(rsp){
        		$scope.guar = {};
        		$scope.guar.data = rsp.root;
        		$scope.guar.total = rsp.total;
        	});
        	
        	$scope.operType =='0';
        	$scope.extGuarModalConf = {};
        	var $extGuarScope = $scope.extGuarModalConf; 
        	 
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
        	
        	$scope.add = function(){
        		$scope.operType ="0";
        		$extGuarScope.form ={
            			loanNo : $stateParams.loanNo,
    					custNo : $stateParams.custNo,
    					moduleId : '20',
    					prodNo   : '',
    					operType : $scope.operType
            	};
        		$extGuarScope.oldForm = angular.copy($extGuarScope.form);
        		$scope.modal.show();
        	}
        	
        	$scope.edit = function(data,$event){
        		$scope.operType ="1";
        		$extGuarScope.form = {
            			loanNo : $stateParams.loanNo,
    					custNo : $stateParams.custNo,
    					moduleId : '20',
    					prodNo   : '',
    					operType : $scope.operType
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
        	
        	$scope.remove = function(data,$event){
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
                     			 jnHelper.removeArrayItem($scope.guar.data,
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
                $scope.validateForm().then(function () {
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
                            		$scope.guar = {};
                            		$scope.guar.data = rsp.root;
                            		$scope.guar.total = rsp.total;
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
	        	
	        	
    }],
});
})();
