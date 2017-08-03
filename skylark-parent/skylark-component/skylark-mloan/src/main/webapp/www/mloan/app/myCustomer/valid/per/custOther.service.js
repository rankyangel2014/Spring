/**	
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';
angular
    .module('custOtherList')
    .factory('custOtherSer',
        ['jnHttp', 'jnUser', 'jnForm','jnHelper','$filter',
        function (jnHttp, jnUser, jnForm,jnHelper,$filter) {
            return {
            	readCustByCondition: function (type,params) {
            		//个人
            		if(type=='paper'){
            			//更具身份证查询客户信息
            			return jnHttp.post(
            					'/mloan/router/rest/FormalServicedAction.do?method=getCustByCondition', params,{
									quiet: true,
								})
            					.then(function (rsp) {
            						return {
            							data: rsp.data,
            							success:rsp.success,
            						};
            					});
            		}
            		//企业
            		if(type=='liceNo'){
            			//更具身份证查询客户信息
            			return jnHttp.post(
            					'/mloan/router/rest/FormalServicedAction.do?method=getSingleFormalPEntity',params,{
									quiet: true,
								})
            					.then(function (rsp) {
            						return {
            							data: rsp.data,
            							success:rsp.success,
            						};
            					});
            		}
            		//企业
            		if(type=='regNo'){
            			//更具身份证查询客户信息
            			return jnHttp.post(
            					'/mloan/router/rest/FormalServicedAction.do?method=getSingleFormalPEntity',params, {
									quiet: true,
								})
            					.then(function (rsp) {
            						return {
            							data: rsp.data,
            							success:rsp.success,
            						};
            					});
            		}
            	},
                readList: function (params) {
                //重要指标
                    if(params.actionFlag==='zyzb'){
                    	return jnHttp.post(
                         '/mloan/router/rest/ModifyCustAction.do?method=getCustPDetailInfo', params)
                        .then(function (rsp) {
                            return {
                                items: [rsp.data],
                                total: 1,
                            };
                        });
                    }
                    //个人详细信息
                    if(params.actionFlag==='grxx'){
                    	return jnHttp.post(
                    			'/mloan/router/rest/ModifyCustAction.do?method=getCustPInfo', params)
                    			.then(function (rsp) {
                    				return {
                    					items: [rsp.data],
                    					total: 1,
                    				};
                    			});
                    }
                    //紧急联系人
                    if(params.actionFlag==='jjlxr'){
                    	params.operType='0';
                    	return jnHttp.post(
                        '/mloan/router/rest/ModifyCustAction.do?method=getCustPInfo', params)
                        .then(function (rsp) {
                            return {
                                items: rsp.data.custRelationList,
                                total: rsp.data.custRelationList.length,
                            };
                        });
                    }
                    //关联人信息
                    if(params.actionFlag==='glrxx'){
                    	return jnHttp.post(
                    			'/mloan/router/rest/ModifyCustAction.do?method=getCustLinkPInfo', {
                                    custType: params.custType,
                                    custNo: params.qCustNo,
                                    orgNo: params.orgNo,
                                })
                    			.then(function (rsp) {
                    				console.info(rsp);
                    				if(rsp.total==0){
                    					return {
                        					items: [],
                        					total: rsp.total,
                        				};
                    				}
                    				return {
                    					items: rsp.root,
                    					total: rsp.total,
                    				};
                    			});
                    }
                    //实体信息
                    if(params.actionFlag==='stxx'){
                    	return jnHttp.post(
                    			'/mloan/router/rest/FormalServicedAction.do?method=getFormalPEntitys', params)
                    			.then(function (rsp) {
                    				return {
                    					items: rsp.root,
                    					total: rsp.total,
                    				};
                    			});
                    }
                    //实体详细信息
                    if(params.actionFlag==='stxiangx'){
                    	/*var t={};
                    	t.entCustNo=params.custNo.split('|')[0];
                    	t.custNo=params.custNo.split('|')[1];*/
                    	return jnHttp.post(
                    			'/mloan/router/rest/FormalServicedAction.do?method=getSingleFormalPEntity', params)
                    			.then(function (rsp) {
                    				return {
                    					items: [rsp.data],
                    					total: 1,
                    				};
                    			});
                    }
                    //实体详细信息共同经营者
                    if(params.actionFlag==='gtjyz'){
                    	/*params.entCustNo=params.custNo.split('|')[0];
                    	params.custNo=params.custNo.split('|')[1];*/
                    	return jnHttp.post(
                    			'/mloan/router/rest/FormalServicedAction.do?method=getEntityShare', params)
                    			.then(function (rsp) {
                    				console.info(rsp);
                    				if(rsp.total==0){
                    					return {
                        					items: [],
                        					total: rsp.total,
                        				};
                    				}
                    				return {
                    					items: rsp.root,
                    					total: rsp.total,
                    				};
                    			});
                    }
                },
            addOther: function (params) {
                    //紧急联系人添加
                    if(params.actionFlag==='jjlxr'){
                    	
                    	
                    	return jnHttp.post(
                        '/mloan/router/rest/ModifyCustAction.do?method=getCustPInfo', params)
                        .then(function (rsp) {
                            return {
                                items: rsp.data.custRelationList,
                                total: rsp.data.custRelationList.length,
                            };
                        });
                    }
                    //关联人信息
                    if(params.actionFlag==='glrxx'){
                    	params={
                             'pCustNo':params.pCustNo.$modelValue,
                   			 'custNo':params.custNo.$modelValue,
                   			 'paperNo':params.paperNo.$modelValue,
                   			 'custName':params.custName.$modelValue,
                   			 'phoneNo':params.phoneNo.$modelValue,
                   			 'linkType':params.linkType.$modelValue,
                   			 'soWnedClient':params.soWnedClient.$modelValue,
                   			 'workUnit':params.workUnit.$modelValue,
                   			 'custAddr':params.custAddr.$modelValue,	
                   			 'operType':'1',	
                    	};
                    	
                    	return jnHttp.post(
                    			'/mloan/router/rest/ModifyCustAction.do?method=updateCustLinkPInfo', params)
                    			.then(function (rsp) {
                    				return {
                    					data:rsp
                    				};
                    			});
                    }
                    //实体信息添加
                    if(params.actionFlag==='stxx'){
                    	var tmp=$filter('date')(params.businessStartDt.$modelValue,'yyyyMMdd');
                    	var reg=/\d/;
                    	if(!reg.test(tmp)){
                    		tmp='';
                    	}
                    	
                    	console.info(tmp);
                    	params={
                    			'custNo':params.custNo.$modelValue,
                    			'custNameTmp':params.custName.$modelValue,
     				            'regNoTmp':params.cardMerge.$modelValue=='N'?params.regNo.$modelValue:'',
     				            'liceNoTmp':params.liceNo.$modelValue,
     				            'mainBusiness':params.mainBusiness.$modelValue,
     				            'orgForm':params.orgForm.$modelValue,
     				            'corpReprst':params.corpReprst.$modelValue,
     				            'employeeNum':params.employeeNum.$modelValue,
     				            'orgType':params.orgType.$modelValue,
     				            'fixPhone':params.fixPhone.$modelValue,
     				            'businessHours':params.businessHours.$modelValue,
     				            'addressType':params.addressType.$modelValue,
     				            'addressArea':params.addressArea.$modelValue,
     				            'businessStartDt':tmp,
     				            'address':params.address.$modelValue,
     				            'entCustNo':params.entCustNo.$modelValue,
     				            'opt':'modifyForAdd',
     				            'shareJson':params.json,
                    	};
                    	params=jnHelper.fillUndef(params);
                    	
                    	console.info(params);
                    	
                  	return jnHttp.post(
                    			'/mloan/router/rest/FormalServicedAction.do?method=modifyFormalPEntity', params)
                    			.then(function (rsp) {
                    				console.info(rsp);
                    				return rsp;
                    		     });
                    }
                    //实体详细信息
                    if(params.actionFlag==='stxiangx'){
                    	params.entCustNo=params.custNo.split('|')[0];
                    	return jnHttp.post(
                    			'/mloan/router/rest/FormalServicedAction.do?method=getSingleFormalPEntity', params)
                    			.then(function (rsp) {
                    				console.info(rsp);
                    				return {
                    					items: [rsp.data],
                    					total: 1,
                    				};
                    			});
                    }
                    //实体详细信息
                    if(params.actionFlag==='gtjyz'){
                    	params.entCustNo=params.custNo.split('|')[0];
                    	params.custNo=params.custNo.split('|')[1];
                    	return jnHttp.post(
                    			'/mloan/router/rest/FormalServicedAction.do?method=getEntityShare', params)
                    			.then(function (rsp) {
                    				console.info(rsp);
                    				return {
                    					items: rsp.root,
                    					total: rsp.total,
                    				};
                    			});
                    }
                },
                //个人信息修改
                editOther: function (params) {
                	console.info(params);
                	//个人概要信息
                	if(params.actionFlag==='gyxx'){
                		params={
                                'operType':'1',
                      			 'custNo':params.custNo.$modelValue,
                      			 'email':params.email.$modelValue,
                      			 'phoneNo':params.phoneNo.$modelValue,
                      			 'custAddr':params.custAddr.$modelValue,	
                      			 
                       	};
                		return jnHttp.post(
                				'/mloan/router/rest/ModifyCustAction.do?method=getCustPDetailInfo', params).then(
                						function (rsp) {
                							return rsp;
                						});
                	}
                	//个人详细信息修改
                	if(params.actionFlag==='grxx'){
                		return jnHttp.post(
                				'/mloan/router/rest/ModifyCustAction.do?method=getCustPInfo', params).then(
                		function(rsp){
                			return{
                				data:rsp,
                			};
                		}
                		);
                	}
                	//紧急联系人
                	if(params.actionFlag==='jjlxr'){
                		
                		return jnHttp.post(
                				'/mloan/router/rest/ModifyCustAction.do?method=getCustPInfo', params)
                				.then(function (rsp) {
                					console.info(rsp);
                					return {
                						data:rsp,
                					};
                				});
                	}
                	//关联人信息
                	if(params.actionFlag==='glrxx'){
                		params={
                				'pCustNo':params.pCustNo.$modelValue,
                				'custNo':params.custNo.$modelValue,
                				'paperNo':params.paperNo.$modelValue,
                				'custName':params.custName.$modelValue,
                				'phoneNo':params.phoneNo.$modelValue,
                				'linkType':params.linkType.$modelValue,
                				'soWnedClient':params.soWnedClient.$modelValue,
                				'workUnit':params.workUnit.$modelValue,
                				'custAddr':params.custAddr.$modelValue,	
                				'operType':'1',	
                		};
                		
                		return jnHttp.post(
                				'/mloan/router/rest/ModifyCustAction.do?method=updateCustLinkPInfo', params)
                				.then(function (rsp) {
                					return {
                						data:rsp
                					};
                				});
                	}
                	//实体信息修改
                	if(params.actionFlag==='stxiangx'){
                		var tmp=$filter('date')(params.businessStartDt.$modelValue,'yyyyMMdd');
                    	var reg=/\d/;
                    	if(!reg.test(tmp)){
                    		tmp='';
                    	}
                    	params={
                    			'custNo':params.custNo.$modelValue,
                    			'custNameTmp':params.custName.$modelValue,
     				            'regNoTmp':params.cardMerge.$modelValue=='N'?params.regNo.$modelValue:'',
     				            'liceNoTmp':params.liceNo.$modelValue,
     				            'mainBusiness':params.mainBusiness.$modelValue,
     				            'orgForm':params.orgForm.$modelValue,
     				            'corpReprst':params.corpReprst.$modelValue,
     				            'employeeNum':params.employeeNum.$modelValue,
     				            'orgType':params.orgType.$modelValue,
     				            'fixPhone':params.fixPhone.$modelValue,
     				            'businessHours':params.businessHours.$modelValue,
     				            'addressType':params.addressType.$modelValue,
     				            'addressArea':params.addressArea.$modelValue,
     				            'businessStartDt':tmp,
     				            'address':params.address.$modelValue,
     				            'entCustNo':params.entCustNo.$modelValue,
     				            'opt':'modify',
     				            'shareJson':params.json,
                    	};
                    	params=jnHelper.fillUndef(params);
                    	
                    	
                  	return jnHttp.post(
                    			'/mloan/router/rest/FormalServicedAction.do?method=modifyFormalPEntity', params)
                    			.then(function (rsp) {
                    				return{
                    					data:rsp
                    				};
                    		     });
                	}
                	
                //共同经营者修改
                if(params.actionFlag==='gtjyz'){
                	console.info(params);
                	return jnHttp.post(
                			'/mloan/router/rest/ModifyCustAction.do?method=updateCustLinkPInfo', params)
                			.then(function (rsp) {
                				return{
                					data:rsp
                				};
                			});
                }
                
            },

                rmSTXX: function (custNo, entCustNo) {
                    return jnHttp.post(
                        '/mloan/router/rest/FormalServicedAction.do?method=deleteFormalPEntity', {
                            delArrObj: custNo + ',' + entCustNo,
                        });
                },

                rmGTJYZ: function (pCustNo, entCustNo, custNo) {
                    return jnHttp.post(
                        '/mloan/router/rest/FormalServicedAction.do?method=getEntityShare', {
                            custNo: pCustNo,
                            entCustNo: entCustNo,
                        }).then(function (rsp) {
                            var gtjyz;

                            jnHelper.removeArrayItem(rsp.root, function (e) {
                                return e.custNo = custNo;
                            });

                            gtjyz = rsp.root.map(function (e) {
                                return jnHelper.refine(e, [
                                    'custNo',
                                    'custName',
                                    'paperNo',
                                    'phoneNo',
                                    'soWnedClient',
                                    'workUnit',
                                    'custAddr',
                                    'linkType',
                                ]);
                            });

                            return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getSingleFormalPEntity', {
                                entCustNo: entCustNo,
                            }).then(function (rsp) {
                                var params = jnHelper.refine(rsp.data, [
                                    'custName',
                                    'regNo',
                                    'liceNo',
                                    'mainBusiness',
                                    'orgForm',
                                    'corpReprst',
                                    'employeeNum',
                                    'orgType',
                                    'fixPhone',
                                    'businessHours',
                                    'addressType',
                                    'addressArea',
                                    'businessStartDt',
                                    'address',
                                    'entCustNo',
                                    'corpReprst',
                                ]);

                                params.custNo = pCustNo;
                                params.opt = 'modify';
                                params.delCusts = custNo;
                                params.shareJson = JSON.stringify(gtjyz);

                                return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=modifyFormalPEntity', params);
                            });
                        });
                },
            };
        }]
    );
})();
