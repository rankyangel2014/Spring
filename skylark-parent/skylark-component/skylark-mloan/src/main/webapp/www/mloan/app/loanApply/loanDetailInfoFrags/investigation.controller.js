(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('investigationCtrl', investigationCtrl);


    investigationCtrl.$inject = ['$scope','$state', 'jnUser', 'jnHelper', 'LoanDetailInfoService', 'LoanApplyUtilService','jnHttp'];


    function investigationCtrl($scope,$state, jnUser, jnHelper, LoanDetailInfoService, LoanApplyUtilService,jnHttp) {
        var self = this;
        
        var parentVM = $scope.loanDetailInfoCtrl, //获取父scope的VM
            getInvestigationParam = parentVM.acceptParamObj; //获取上一页面传的参数
        
        self.isReadOnly = parentVM.acceptParamObj.isReadOnly; //表单是否只读,默认false

        self.form = {
            cardMerge: 'N',
            orgFormType: '1'
        };

        var pf = jnHelper.PaginateFetcher(LoanDetailInfoService.getInvestigationInfo)
        .params(getInvestigationParam);
    
	    // 与页面交互
	    self.list = pf.records();
	
	    self.more = function () {
	        pf.fetch().then(function (rsp) {
	            // 这里可以进一步处理
	        });
	    };
	
	    self.more();

        //设置当前表单信息，以便于父页面调用
        LoanApplyUtilService.setFormMap({
            formName: "investigation",
            saveFunc: saveForm,
            editFunc: editForm,
            getIsReadOnly: getIsReadOnly
        });

        // LoanApplyUtilService.setFormMap("companyInfo", getIsReadOnly, saveForm, editForm);
        
        //修改调查与评价
        self.update = function(e){
        	$state.go('investigationSave', {
        		custNo:getInvestigationParam.custNo,
        		loanNo:getInvestigationParam.loanNo,
        		operType:'1',
        		subType0:e.subType,
        		outlineTmp:e.outline,
        		details0:e.details,
        		subjectTmp:e.subjectOther,
        		recId:e.recId,
        		subject:e.subject
        	});
        }
        
        //删除当前评价
        self.del = function(recId,$event){
        	$event.stopPropagation();//阻止事件冒泡
        	
        	var params = {};
        	params.custNo = getInvestigationParam.custNo;
        	params.loanNo = getInvestigationParam.loanNo;
        	params.recId = recId;
        	params.moduleId = '5';
        	params.operType = '2';
        	
        	jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=evaluateAction',
    	            params).then(function(rsp){
    	            	if(rsp.success == true){
    	            		jnHelper.alert('删除成功！');
		            		  jnHelper.removeArrayItem(self.list.items,
	                                  function (e) {
	                                      return e.recId === params.recId;
	                                  }
	                              );
		            		  self.list.total -= 1;
	    				}else{
	    					jnHelper.alert('删除失败！');
	    				}
    	            });
        	
        }
        
        //设置当前表单信息，以便于父页面调用
        LoanApplyUtilService.setFormMap({
            formName: "investigation",
            saveFunc: add
        });
        
        //新增调查与评价
        function add(){
        	$state.go('investigationSave', {
        		custNo:getInvestigationParam.custNo,
        		loanNo:getInvestigationParam.loanNo,
        		operType:'0'
        	});
        }
        
        //监听状态切换
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            //如果是从新增页面返回，则刷新列表
            if (fromState.name === 'investigationSave'){
            	
            	var pf = jnHelper.PaginateFetcher(LoanDetailInfoService.getInvestigationInfo)
                		.params(getInvestigationParam);
        	    // 与页面交互
        	    self.list = pf.records();
        	    self.more = function () {
        	        pf.fetch().then(function (rsp) {
        	            // 这里可以进一步处理
        	        });
        	    };
        	    self.more();
            }
        });
        
        function getIsReadOnly() {
            return self.isReadOnly;
        }

        function saveForm() {
        }

        function editForm() {
        }

    }

})();
