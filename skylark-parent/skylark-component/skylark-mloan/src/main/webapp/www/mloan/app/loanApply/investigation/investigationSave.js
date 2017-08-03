/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('loanApply')
    .controller('invsetSaveCtrl',
        ['jnHttp', 'jnUser','$stateParams','$scope','jnHelper','jnPage','jnForm',
        function (jnHttp, jnUser,$stateParams,$scope,jnHelper,jnPage,jnForm) {
           var params = {};
           
           var self = this;
           self.form = {};
           params.custNo = $stateParams.custNo;//客户编号
           params.loanNo = $stateParams.loanNo;//贷款合同号
           params.moduleId = '5';
           params.operType = $stateParams.operType;//0 add 1 modify 2 delete
           params.totalCount = '0';//这个参数必填，写死。
           
           //回显已存在信息
           self.form.subType0 = $stateParams.subType0;
           if( $stateParams.subType0 != '' ){
        	   compare();
           };
           self.form.outlineTmp = $stateParams.outlineTmp;
           self.form.details0 = $stateParams.details0;
           self.form.subjectTmp = $stateParams.subject;
           
	       //保存征信记录数据
	       self.save = function() {
	    	   jnForm.validate(self.myForm).then(function() {
	    		   params.subType0 = self.form.subType0;
		    	   params.outlineTmp = self.form.outlineTmp;
		    	   params.details0 = self.form.details0;
		    	   params.subjectTmp = self.form.subjectTmp;
		    	   params.recId0 = $stateParams.recId;//recId0,此处有下标，与后台接口定义有关。不可改
		    	   
		    	   jnHttp.post('/mloan/router/rest/PsnCustInfoCommAction.do?method=evaluateAction',
		   	            params).then(function(rsp){
		   	            	if(rsp.success){
		   	            		jnPage.modified = false;
		   	            		jnHelper.alert('保存成功').then(
										function(rsp){
	                                        jnPage.back();
										}
								);
		    				}else{
		    					jnHelper.alert('保存失败！');
		    				}
		   	            });
	    	   });
	    	   
           };
           
           //获取下拉参数
           self.paramQry = function(){
        	   if(self.form.subType0 == ''){
	        		self.form.outlineTmp = '';
	        		return;
        		}
        	   compare();
           };
           
           function compare(){
        	   var params={};
        	   params.paraNo = 'ITEM5900';
        	   var array = new Array();
        	   jnHttp.post('/mloan/router/rest/param.do?method=dropDown',
        			   params).then(function(rsp){
   	   	            	for(var i=0;i<rsp.length;i++){
   	   	            		if(self.form.subType0 == rsp[i].paramKey){
   	   	            			//如果是add，则查询后回显。如果是update,则自动带回
   	   	            			if($stateParams.operType == '0'){
   	   	            				self.form.outlineTmp = rsp[i].remark;
   	   	            			}
   	   	            			if(rsp[i].remark == ''){
   	   	            				$scope.oFlag = false;
   	   	            			}else{
   	   	            				$scope.oFlag = true;
   	   	            			}
   	   	            			return;
   	   	            		}
   	   	            	}
   	   	            });
           };
           
           
                       
        }]
    );

})();
