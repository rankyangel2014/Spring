/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('entCustDetail')
    .factory('entEditSer',
        ['jnHttp', 'jnUser',
        function (jnHttp, jnUser) {
            return {
            	//查询实际控制人
            	readControlInfo: function (params) {
        			return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getFormalEnbCPInfo',
        					params).then(function(rsp){
        						return rsp;
        					});
            	},
            	//更新控制人信息
            	updateEnbCPInfo: function (params) {
            		
            		
            		return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=updateEnbCPInfo',
            				params).then(function(rsp){
            					return rsp;
            				});
            	},
            	//查询企业详细信息
                readEntDetail: function (params) {
                	params.operType='0';
                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getEnbBaseInfo',
                        params)
                        .then(function (rsp) {
                            return rsp;
                        });
                },
                //更新企业信息
                updateEntBaseInfo: function(params){
                    return	this.readEntDetail({custNo:params.custNo,
                        operType:'0',}).then(
                                function(rsp){
                                    var custRelationList=rsp.data.custRelationList;
                                    custRelationList=refine(custRelationList,
                                            [
                                                'custAddr',
                                                'custName',
                                                'custNo',
                                                'linkType',
                                                'linkTypeName',
                                                'paperNo',
                                                'phoneNo',
                                                'sharePct',
                                                'workUnit',
                                             ]);
                                    params.lxrList = JSON.stringify(custRelationList);
                                    params.operType='1';
                                    params.frMobPhoneNo=params.frMobPhone;
                                    params.frFixPhoneNo=params.frMobPhone;
                                    params.jzqk='1';
                                    
                                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=updateEnbBaseInfo',
                                            params)
                                            .then(function (rsp) {
                                                return rsp;
                                            });
                                    
                                    
                                });
                    
                },
                //更新企业信息(企业联系人更新/添加)
                updateEnbBaseInfo: function(params){
                	
                	if(params.lxrList){
                		params.lxrList = JSON.stringify(params.lxrList);
                		params.operType='1';
                		console.info(params);
                		params.frMobPhoneNo=params.frMobPhone;
                		params.frFixPhoneNo=params.frMobPhone;
                		 return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=updateEnbBaseInfo',
                                 params)
                                 .then(function (rsp) {
                                     return rsp;
                         });
                	}
                	
                	return	this.readEntDetail({custNo:params.custNo,
                		operType:'0',}).then(
                	function(rsp){
                		var custRelationList=rsp.data.custRelationList;
                		custRelationList=refine(custRelationList,
                				[
                                 'linkCustNo', // 编号
                                 'linkCustName', // 姓名
                                 'linkCustAddr', // 地址
                                 'linkType', // 人企关系
                                 'linkPhoneNo', // 电话
                                 'linkPaperType', // 证件类型
                                 'linkPaperNo', // 证件号码
                                 'linkWorkUnit', // 工作单位
                                 'linkCustType',
                                 'linkCustFlag',
                             ]);
                		
                		params.lxrList = JSON.stringify(custRelationList);
                		params.operType='1';
                		params.frMobPhoneNo=params.frMobPhone;
                		params.frFixPhoneNo=params.frMobPhone;
                		params.jzqk='1';

                		 return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=updateEnbBaseInfo',
                                 params)
                                 .then(function (rsp) {
                                     return rsp;
                         });
                		
                		
                	});
                	
                },
                
                //更新股东信息
                updateEnbSharePInfo:function(params){
                	 params.orgNo = jnUser.insttuId;
                     params.linkTypeflag = 29;
                     params.linkCustType = 0;
                     params.linkCustFlag = 0;
                     params.operType = 1;
                     console.info(params);
                	return jnHttp.post('/mloan/router/rest/ModifyCustAction.do?method=updateCustLinkPInfo',
                            params)
                            .then(function (rsp) {
                                return rsp;
                            });
                	
                	
                },
                //更新关联人信息
                updateEnbRelationInfo:function(params){
                     return jnHttp.post('/mloan/router/rest/ModifyCustAction.do?method=updateCustLinkPInfo',
                         params).then(function (rsp) {
                         return rsp;
                     });
                },
            };
        }]
    );

/**
 * 创建过滤器，过滤器返回一个新的对象，只保留 filterList 包含的字段。
 */
function refine(data,filterList) {
        var refined = [];
        var t=null;
        for(var i=0 ;i<data.length;i++){
        	t={};
        	filterList.forEach(function (key) {
        			t[key] = data[i][key];
        	});
        	refined.push(t);
        }
        return refined;
}
})();


