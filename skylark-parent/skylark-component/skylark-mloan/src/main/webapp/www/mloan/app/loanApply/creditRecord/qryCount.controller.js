/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('loanApply')
    .controller('qryCountCtrl',
        ['jnHttp', 'jnUser','$stateParams','$scope','jnHelper','jnPage',
        function (jnHttp, jnUser,$stateParams,$scope,jnHelper,jnPage) {
           var params = {};
           
           var self = this;
           self.form = {};
           params.custNo = $stateParams.custNo;//客户编号
           params.loanNo = $stateParams.loanNo;//贷款合同号
           params.type = $stateParams.type;//类型，0：查询次数，1：逾期次数
           //是否只读。若只读，隐藏可操作按钮,地址栏传递是，为字符串
           if($stateParams.isReadOnly == "true"){
        	   self.isReadOnly = true;
           }
           if($stateParams.isReadOnly == "false"){
        	   self.isReadOnly = false;
           }
           
           self.type = $stateParams.type;
           
           //征信查询次数
	       jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=getCrdtInvest',
	            params).then(function(rsp){
	            	var data = rsp.root;
	            	for(var i=0;i<data.length;i++){
	            		if(data[i].interval == '6'){
	            			self.totalTimes6 = data[i].totalTimes;
	            			self.partTimes6 = data[i].partTimes;
	            		}
	            		if(data[i].interval == '12'){
	            			self.totalTimes12 = data[i].totalTimes;
	            			self.partTimes12 = data[i].partTimes;
	            		}
	            		if(data[i].interval == '18'){
	            			self.totalTimes18 = data[i].totalTimes;
	            			self.partTimes18 = data[i].partTimes;
	            		}
	            		if(data[i].interval == '24'){
	            			self.totalTimes24 = data[i].totalTimes;
	            			self.partTimes24 = data[i].partTimes;
	            		}
	            	}
	            });
	       
	       //征信查询次数，保存
	       self.saveForm = function () {
	    	   self.form.custNo = $stateParams.custNo;//客户编号
	    	   self.form.loanNo = $stateParams.loanNo;//贷款合同号
	    	   if($stateParams.type == '0'){
	    		   self.form.moduleId = '16'//模块号
	    	   }
	    	   if($stateParams.type == '1'){
	    		   self.form.moduleId = '17'//模块号
	    	   }
	    	   self.form.prodNo = '';
	    	   self.form.zxcxInfo = '[{"custNo":"","loanNo":"","interval":"6","totalTimes":'+self.totalTimes6+',"partTimes":'+self.partTimes6+'},'+
	    		   					  '{"custNo":"","loanNo":"","interval":"12","totalTimes":'+self.totalTimes12+',"partTimes":'+self.partTimes12+'},'+
	    		   					  '{"custNo":"","loanNo":"","interval":"18","totalTimes":'+self.totalTimes18+',"partTimes":'+self.partTimes18+'},'+
	    		   					  '{"custNo":"","loanNo":"","interval":"24","totalTimes":'+self.totalTimes24+',"partTimes":'+self.partTimes24+'}]';
	    	   
	    	   //发后台请求
	    	   jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=crdtInvestAction',
	    			   self.form).then(function(rsp){
	    				   if(rsp.success){
	    					   jnHelper.alert('修改成功').then(
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
