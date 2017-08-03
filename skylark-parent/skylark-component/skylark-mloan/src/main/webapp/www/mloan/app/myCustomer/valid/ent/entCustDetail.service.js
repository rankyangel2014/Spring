/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('entCustDetail')
    .factory('entCustSer',
        ['jnHttp', 'jnUser', 'jnForm','jnValidate','jnHelper',
        function (jnHttp, jnUser, jnForm,jnValidate,jnHelper) {
            return {
            	//企业基本信息查询
                qryBaseEnt: function(params){
                	params.operType='0';
                	 return jnHttp.post(
                             '/mloan/router/rest/FormalServicedAction.do?method=getEnbCustPDetailInfo', params);
                	
                },
                //企业详细信息查询
                qryDetailEnt: function(params){
                	params.operType='0';
                	return jnHttp.post(
                			'/mloan/router/rest/FormalServicedAction.do?method=getEnbBaseInfo', params);
                	
                },
                //关联信息查询
                qryDetailGlr: function(params){
                	console.info(params);
//                	params.operType='0';
                	return jnHttp.post(
                			'/mloan/router/rest/ModifyCustAction.do?method=getGlr', params,{quiet: true}).then(function(rsp){
                 				 return rsp;
               			   });
                	
                },
                //更具条件查询 客户信息 供回显使用 （企业 /个人）
                getCustByContion:function(params){
                	var paperNo=params.paperNo;
                	var paperType=params.paperType;
                	
                	if(!(paperType=='0'||paperType=='10'||paperType=='11')){
                		jnHleper.alert('证件类型错误');
                		throw new Error('证件类型错误！');
                	}
                	
                	if(!paperNo||paperNo.length==0){
//                		jnHleper.alert('证件号码错误！');
                		 throw new Error('证件号码错误！');
                	}
                	 //根据paperType判断调用哪个接口，以及传递什么参数
              	   if(paperType == '0'){
              		   //按身份证查询
              		   if(!jnValidate.idNo(paperNo))
              			 {
              			   jnHelper.alert('输入身份证号码不正确');
              			   throw new Error('输入身份证号码不正确！');
              			 }
              		   return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=qryKzPerson',
              				   {paperNo:paperNo},{quiet: true}).then(function(rsp){
              					   return rsp;
              				   });
              	   }else if(paperType == '10'){
              		
              		   //营业执照
              		 if(!jnValidate.regNo(paperNo))
          			 {
          			   jnHelper.alert('输入营业执照号不正确！');
          			 throw new Error('输入营业执照号不正确！');
          			 }
              		return  jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=qryKzCust',
                  			 {regNo:paperNo},{quiet: true}).then(function(rsp){
                  				 return rsp;
                  			   });
              	   }else if(paperType == '11'){
              		 //统一信用代码证
              		 if(!jnValidate.orgNo(paperNo))
          			 {
          			   jnHelper.alert('输入的统一信用代码证号不正确！');
          			  throw new Error('输入的统一信用代码证号不正确！');
          			 }
              		return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getEnbByCondition',
                 	            {liceNo:paperNo},{quiet: true}).then(function(rsp){
                 	            	 return rsp;
                 	            });
              	   }
                	
                	
                },
            };
        }]
    );

})();


