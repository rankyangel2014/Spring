(function() {
    'use strict';
    angular.module('loanApply').controller('financialInfoCtrl', financialInfoCtrl);
    financialInfoCtrl.$inject = ['$scope', 'jnUser', 'jnHelper', 'jnForm' ,'FinancialInfoService', 'LoanApplyUtilService'];
    
    function financialInfoCtrl($scope, jnUser, jnHelper, jnForm, FinancialInfoService, LoanApplyUtilService) {
        var self = this;
        var parentVM = $scope.loanDetailInfoCtrl, // 获取父scope的VM
            getFinancialInfoParam = parentVM.acceptParamObj; // 获取上一页面传的参数
        // 机构号
        getFinancialInfoParam.orgNo = jnUser.insttuId;
        getFinancialInfoParam.moduleId = '8';
        
        //parentVM.acceptParamObj.isReadOnly = false;
        // 表单是否只读,默认false
        self.isReadOnly = parentVM.acceptParamObj.isReadOnly;
        
        self.form = {
        	turnoverMon: 0.00,
        	turnoverTop: 0.00,
        	turnoverLow: 0.00,
        	grossRate: 0.0000,
        	acctRecv: 0.00,
        	stock: 0.00,
        	netRate: 0.0000,
        	assets: 0.00,
        	revenueOther: 0.00,
        	debts: 0.00
        };
        
        // 初始化信息
        FinancialInfoService.getFinancialInfo(getFinancialInfoParam).then(
            function(rsp) {
            	if(rsp.success){
            		self.form = jnHelper.merge(self.form, rsp.data);
            		//setDataDisplay(self.form);
            	}
            }
        );
        
        // 数据校验
        self.checkData = function(type, objName){
        	var _val = document.getElementsByName(objName)[0].value;
        	if(_val != undefined && _val != ""){
    			var _flag = _val.indexOf('.') > 0;
    			var _points = (_val.split('.')).length - 1;
    			if(type == '1'){
    				if((_points > 1) || (_flag && _val.length > 16) || (!_flag && _val.length > 13)){
    					jnHelper.alert('信息输入有误！');
    					self.form[objName] = 0.00;
    					document.getElementsByName(objName)[0].value = new Number(0).toFixed(2);
    					document.getElementsByName(objName)[0].focus();
        			}else{
        				//$scope.objName = new Number(_val).toFixed(2);
        				document.getElementsByName(objName)[0].value = new Number(_val).toFixed(2);
        			}
    			}else if(type == '2'){
    				if((_points > 1) || (_flag && _val.length > 8) || (!_flag && _val.length > 3)){
    					jnHelper.alert('信息输入有误！');
    					self.form[objName] = 0.0000;
    					document.getElementsByName(objName)[0].value = new Number(0).toFixed(4);
    					document.getElementsByName(objName)[0].focus();
        			}else{
        				document.getElementsByName(objName)[0].value = new Number(_val).toFixed(4);
        			}
    			}
    		}else{
    			document.getElementsByName(objName)[0].value = 0;
    		}
        };
        
        // 设置当前表单信息，以便于父页面调用
        LoanApplyUtilService.setFormMap({
            formName: "financialInfo",
            saveFunc: saveForm,
            editFunc: editForm,
            getIsReadOnly: getIsReadOnly
        });
        
        function getIsReadOnly() {
            return self.isReadOnly;
        }
        
        function saveForm() {
            //self.isReadOnly = false;
        	// 验证form
        	jnForm.validate(self.financialInfo).then(function() {
        		// 客户号
                self.form.custNo = getFinancialInfoParam.custNo;
                // 贷款编号
                self.form.loanNo = getFinancialInfoParam.loanNo;
                self.form.moduleId = '8';
                // 保存财务信息概述
                FinancialInfoService.saveFinancialInfo(self.form).then(
                    function(rsp) {
                    	if(rsp.success){
                    		jnHelper.alert('财务信息保存成功！');
                    	}else{
                    		jnHelper.alert(rsp.errMsg);
                    	}
                    }
                );
        	});
        }
        
        function editForm() {
            //self.isReadOnly = false;
        }
    }
    
    // 数据展示
    function setDataDisplay(formObj){
    	if(null != formObj && undefined != formObj){
    		var x = ["turnoverMon","turnoverTop","turnoverLow","grossRate","acctRecv","stock","netRate","assets","revenueOther","debts"];
    		var prec = 2;
    		for(var i in x){
    			if(x[i] == "grossRate" || x[i] == "netRate"){
    				prec = 4;
    			}else{
    				prec = 2;
    			}
    			//formObj[x[i]] = new Number(formObj[x[i]]).toFixed(prec);
    			document.getElementsByName(x[i])[0].value = new Number(formObj[x[i]]).toFixed(prec);
    		}
    	}
    }
})();
