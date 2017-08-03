(function () {
'use strict';

angular
    .module('custOtherList')
    .controller('custOtherList.listCtrl',
        ['$stateParams', 'custOtherSer', 'jnHelper','$state','$scope','jnUser', '$ionicListDelegate',
        function ($stateParams, custOtherSer, jnHelper,$state,$scope,jnUser, $ionicListDelegate) {
        	$scope.isDetail=$stateParams.isDetail;
            var self = this;
            
            self.deleteData=function(){
            };
            
            
            
            
            var title_list={
            		zyzb:'重要指标',
            		grxx:'个人信息',
            		jjlxr:'紧急联系人', 
            		glrxx:'关联人', 
            		stxx:'实体信息', 
            		gtjyz:'共同经营者', 
            };
            //登录客户userid
            $scope.userId=jnUser.userId;
            self.toDetail=function(actionFlag,index){
            	if(actionFlag==='gtjyz'){
            		$state.go('custOtherDetail', {
        			    custNo: $stateParams.custNo,
        			    entCustNo: $stateParams.entCustNo,
					    actionFlag:$stateParams.actionFlag,
					    index:index%10,
					    start:parseInt(index/10)*10,
					    isDetail:$stateParams.isDetail,
            		});
            	}
            	else if(actionFlag==='stxiangx'){
            		$state.go('custOtherDetail', {
	            			entCustNo: index.split('|')[0],
            				custNo: index.split('|')[1],
            				actionFlag:actionFlag,
            				isDetail:$stateParams.isDetail,
            		});
            	}
            	else if(actionFlag==='glrxx'){
            		$state.go('custOtherDetail', {
            			    qCustNo: $stateParams.qCustNo,
							operType:$stateParams.operType,
						    actionFlag:$stateParams.actionFlag,
						    index:index%10,
						    start:parseInt(index/10)*10,
						    isDetail:$stateParams.isDetail,
						    orgNo:$stateParams.orgNo,
						    custType:$stateParams.custType
            		});
            	}else{
            		$state.go('custOtherDetail', {
        			    custNo: $stateParams.custNo,
						operType:$stateParams.operType,
					    actionFlag:$stateParams.actionFlag,
					    index:index%10,
					    start:parseInt(index/10)*10,
					    isDetail:$stateParams.isDetail,
					    sex:$stateParams.sex,
            		});
            	}
            	
            	
            };
            
            var pf = jnHelper.PaginateFetcher(custOtherSer.readList)
            .params($stateParams);
            
            /*挂载到容器里面*/
          
            self.actionFlag=$stateParams["actionFlag"];
            self.title=title_list[$stateParams["actionFlag"]];
            self.list= pf.records();
            self.totalCustNo=$stateParams["custNo"] ;
            
            self.more = function() {
                pf.fetch().then(function (rsp) {
                	self.start=pf.start-pf.limit;
                    // 这里可以进一步处理
                	
                });
            };
            self.more();
            
          
            $scope.toggleItem = function(index) {
            	if(self.list.items[index].expandFlag==='1'){
            		self.list.items[index].expandFlag='0';
            		
            	}else{
            		self.list.items[index].expandFlag='1';
            	}
            	event.stopPropagation();
              };
           $scope.edit=function(){
            	  console.info($stateParams);
            	  
//            	  $state.go('custEdit', {custNo:$scope.custDetail.custNo});
              };
              
              
              //新增
          $scope.add=function(type){
            	  console.info($stateParams);
            	  if(type=='glrxx'){
            		 
            		  $state.go('custOtherAdd', {actionFlag:$stateParams.actionFlag,
            			pCustNo:$stateParams.qCustNo  });
            	  }
            	  if(type=='stxx'){
            		  
            		  $state.go('custOtherAdd', $stateParams);
            	  }
            	  if(type=='jjlxr'){
            		  
            		  $state.go('custOtherAdd',$stateParams);
            	  }
            	  if(type=='gtjyz'){
            		  $state.go('custOtherAdd', $stateParams);
            	  }
              };
              
          $scope.rmSTXX = function (item, $event) {
              $event.stopPropagation();

              var text = '确实要删除实体' + item.custName + '吗？';
              jnHelper.confirm(text).then(function (confirmed) {
                  if (confirmed) {
                      custOtherSer.rmSTXX($stateParams.custNo, item.entCustNo)
                          .then(function () {
                              jnHelper.removeArrayItem(self.list.items,
                                  function (e) {
                                      return e.entCustNo === item.entCustNo;
                                  }
                              );

                              self.list.total -= 1;
                          });
                  } else {
                      $ionicListDelegate.closeOptionButtons();
                  }
              });
          };

          $scope.rmGTJYZ = function (item, $event) {
              $event.stopPropagation();

              var text = '确实要删除共同经营者' + item.custName + '吗？';
              jnHelper.confirm(text).then(function (confirmed) {
                  if (confirmed) {
                      custOtherSer.rmGTJYZ($stateParams.custNo,
                          $stateParams.entCustNo, item.custNo)
                          .then(function () {
                              jnHelper.removeArrayItem(self.list.items,
                                  function (e) {
                                      return e.custNo === item.custNo;
                                  }
                              );

                              self.list.total -= 1;
                          });
                  } else {
                      $ionicListDelegate.closeOptionButtons();
                  }
              });
          };
        }]
    
    ).controller(//客户详细信息
    		'custOtherDetail.paramsCtrl',
            ['$stateParams', 'custOtherSer', 'jnHelper','$state','$scope',
             function ($stateParams, custOtherSer, jnHelper,$state,$scope) {
            	$scope.isDetail=$stateParams.isDetail;
            	
                 var self = this;
                 var title_list={
                		zyzb:'重要指标',
                 		grxx:'个人信息',
                 		jjlxr:'紧急联系人', 
                 		glrxx:'关联人详情', 
                 		stxx:'实体信息', 
                 		stxiangx:'实体信息详情', 
                 		gtjyz:'共同经营者详情', 
                 };
                 var params = $stateParams;
                 var pf = jnHelper.PaginateFetcher(custOtherSer.readList)
                 .params(params);
                 pf.start=$stateParams["start"];
                 
                 /*挂载到容器里面*/
              
                var index=$stateParams["index"];
                if(!index){
                	index='0';
                }
                 self.actionFlag=$stateParams["actionFlag"];
                 self.title=title_list[$stateParams["actionFlag"]];
                 self.list= pf.records();
                 
                 self.more = function() {
                     pf.fetch().then(
                     function(rsp){
                     	self.list.items=[self.list.items[index]];
                        var d = self.list.items[0];
                        d.spouseBirthday = jnHelper.birthFromId(d.spousePaperNo);
                        d.spouseSex = jnHelper.sexFromId(d.spousePaperNo);
                     }
                     );
                     	
                 };
                 self.more();
                 
                 self.toDetail=function(){
                 		$state.go('custOtherList', {
                 				custNo: $stateParams.custNo,
                 				entCustNo: $stateParams.entCustNo,
                 				actionFlag:'gtjyz',
                 				isDetail:$stateParams.isDetail,
                 		});
                 };
                 
                 $scope.edit=function(){
	               	  console.info($stateParams);
	               	  $state.go('custOtherEdit', $stateParams);
                 };
                 
             }]
         ).controller(//客户其他添加
         		'custOtherAdd.paramCtrl',
                ['$stateParams', 'custOtherSer', 'jnHelper','$state','jnForm','jnPage', 'jnConstant','jnUser','$scope',
                 function ($stateParams, custOtherSer, jnHelper,$state,jnForm,jnPage, jnConstant,jnUser,$scope) {
                     var self = this;
                     var title_list={
                     		jjlxr:'紧急联系人新增', 
                     		glrxx:'关联人新增', 
                     		stxx:'实体信息新增', 
                     		gtjyz:'共同经营者新增', 
                     };
                     
                   //客户类型变化，清空客户关系值
                     self.clear = function(){
                  	   self.gtjyz.paperNo = '';
                     };
                     
//                     self.onSelectCustomer = function (data) {
//                         alert(self.jjlxr.custName);
//                     };
                     
                     self.back=function(){
                    	 $state.go('custOtherList',$stateParams);
                     };
                     
                     self.actionFlag=$stateParams["actionFlag"];
                     self.title=title_list[$stateParams["actionFlag"]];
                     if(self.actionFlag==='glrxx'){
                    	 self.pCustNo=$stateParams["qCustNo"];
                     }
                     if(self.actionFlag==='gtjyz'){
                    	 self.gtjyz={
                    			 'pCustNo':$stateParams.custNo,
                    			 'custType':0
                    	 };
                     }
                     //关联人添加
                     if(self.actionFlag==='glrxx'){
                    	 self.glrxx={
                    			 'pCustNo':$stateParams.pCustNo,
                    			 'custNo':'',
                    			 'paperNo':'',
                    			 'custName':'',
                    			 'phoneNo':'',
                    			 'linkType':'',
                    			 'soWnedClient':'',
                    			 'workUnit':'',
                    			 'custAddr':'',
                    	 };
                     }
                     //实体添加
                     if(self.actionFlag==='stxx'){
                    	 self.stxx={
                    			 'custNo':$stateParams.custNo,
                    			 'entCustNo':'',
                    			 'custName':'',
                    			 'cardMerge':'N',
                    			 'regNo':'',
                    			 'liceNo':'',
                    			 'mainBusiness':'',
                    			 'corpReprst':'',
                    			 'employeeNum':'',
                    			 'orgType':'',
                    			 'fixPhone':'',
                    			 'businessHours':'',
                    			 'addressType':'',
                    			 'addressArea':'',
                    			 'businessStartDt':'',
                    			 'address':'',
                    	 };
                     }
                     self.onSelectCustomer = function (cust) {
                    	 self.flag = true;
                    	 console.info(cust);
                    	 self.gtjyz.custType = cust.custType;
                    	 self.gtjyz.paperType = cust.paperType;
                    	 self.gtjyz.workUnit = cust.workUnit;
                    	 self.gtjyz.custAddr = cust.custAddr;
                         self.gtjyz.custNo = cust.custNo;
                         self.gtjyz.paperNo = cust.paperNo;
                         self.gtjyz.phoneNo = cust.phoneNo;
                     };
                     //紧急联系人
                     //修改提交
                     self.submit=function(type){
                    	console.info(type);
                    	//修改共同经营者
                    	if(type=='gtjyz'){
                    		var form=self.form.gtjyz;
                    		jnForm.validate(form)
                    		.then(function() {
                    			
                    			//查回列表
                    			custOtherSer.readList({
                    				entCustNo:$stateParams.entCustNo,
                    				custNo:$stateParams.custNo,
                    				actionFlag:'gtjyz',
                    			}).then(function(rsp){
                    				var gtjyzList=null;
                    				console.info(rsp);
                   				 	gtjyzList=refine(rsp.items,['custNo',
                   				                             'custName',
                   				                             'paperNo',
                   				                             'phoneNo',
                   				                             'soWnedClient',
                   				                             'workUnit',
                   				                             'custAddr',
                   				                             'linkType']);
                    				//查回实体
                    				custOtherSer.readList({
                        				entCustNo:$stateParams.entCustNo,
                        				actionFlag:'stxiangx',
                        			}).then(
                        					function(rsp){
                        						console.info(rsp);
                        						var json={};
                        						json=rsp.items;
                        						console.info(json);
                        						if(json){
                        							json=refine(json,[
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
        															'corpReprst'
                        							                  ]);
                        						}
//                        						json = JSON.stringify(json);
//                        						form.json=json;
                        						for ( var int = 0; int < gtjyzList.length; int++) {
                        							  var custNo=gtjyzList[int]["custNo"];
                        							  if(custNo==self.gtjyz.custNo){
                        								  jnHelper.alert('当前共同经营者信息已经关联，请重新输入信息！');
                        								  return;
                        							  }
                        			                }
                        						
                        						
                    						   self.gtjyz.pCustNo = $stateParams.entCustNo;
                    						   self.gtjyz.custType = self.gtjyz.custType;
                    			        	   self.gtjyz.orgNo = jnUser.insttuId;
                    			        	   self.gtjyz.operType = '1';
                    			        	   self.gtjyz.custFlag = '0';
                    			        	   self.gtjyz.linkType = '14';
                    			        	   self.gtjyz.custNameTmp = self.gtjyz.custName;
                    			        	   self.gtjyz.paperNoTmp = self.gtjyz.paperNo;
                    			        	   self.gtjyz.phoneNo = self.form.gtjyz.phoneNo.$$rawModelValue;
                    			        	   self.gtjyz.paperTypeTmp = self.gtjyz.paperType;
                        					   console.info(self.gtjyz);
                        					   self.gtjyz.actionFlag=type;
                        						custOtherSer.editOther(self.gtjyz).then(function(rsp){
                        							console.info(rsp);
                        							if(rsp.data.success){
                                                        jnPage.modified = false;
                        								jnHelper.alert("新增成功").then(function(rsp){
                        									jnPage.back();
                        								}
                        								);
                        							}
                        						});
                        			});
                    			});
                    		});
                    	}
                    	
                    	//紧急联系人添加
                    	//关联人添加
                    	if(type==='glrxx'){
                    		 jnForm.validate(self.form.glrxx)
                             .then(function() {
                            	 self.form.glrxx.actionFlag=type;
                            	 custOtherSer.addOther(self.form.glrxx).then(function(rsp){
                            		 if(rsp.data.success){
                                                        jnPage.modified = false;
                            			 jnHelper.alert('添加成功').then(function(){
                                             jnPage.back();
                            				 
                            			 }
                            			 );
                            		 }
                            	 });
                             });
                    		
                    	}
                    	//实体添加
                    	if(type==='stxx'){
                    		var params=self.form.stxx;
                    		jnForm.validate(params)
                    		.then(function() {
                    			//实体存在
                    			var json=[];
                    			params.actionFlag=type;
                    			
                    			if(params.entCustNo.$modelValue){
                    				custOtherSer.readList({"actionFlag":"gtjyz",custNo:params.entCustNo.$modelValue+'|'+params.custNo.$modelValue})
                            		.then(function(rsp){
                            			json=rsp.items;
                            			if(json){
                            				json=refine(json,[
                                                              'custNo', // 编号
                                                              'custName', // 姓名
                                                              'linkType', // 人人关系
                                                              'linkStatus', // 关系状态
                                                              'paperNo', // 证件号码
                                                              'phoneNo', // 联系电话
                                                              'workUnit', // 工作单位
                                                              'soWnedClient', // 业务占比
                                                              'custAddr', // 客户地址
                                                          ]);
                            			}
                            			json = JSON.stringify(json);
                            			params.json=json;
                            			custOtherSer.addOther(params).then(function(rsp){
                            				if(rsp.success){
                                                        jnPage.modified = false;
                            					jnHelper.alert('添加成功').then(function(){
                                                    jnPage.back();
                            					}
                            					);
                            				}
                            			});
                            		});
                    				
                    			}else{
                    				params.json=JSON.stringify([]);
                    				
                    				custOtherSer.addOther(params).then(function(rsp){
                        				if(rsp.success){
                                                        jnPage.modified = false;
                        					jnHelper.alert('添加成功').then(function(rsp){
                                                jnPage.back();
                        					}
                        					);
                        				}
                        			});
                    			}
                    			
                    		});
                    		
                    	}
                    	
                     };
                     
                     
                     
                     //添加的时候进行证件号码查询
                     self.readCustByCondition=function(params,type){
                    	 console.info(params);
                    	 if(!self.gtjyz.paperNo || self.gtjyz.paperNo.length==0 ){
                    		 return;
                    	 }
                    	 
                    	 var t=null;
                    	 //共同经营者
                    	 if(type=='gtjyz'){
                    		 t={paperNo:self.gtjyz.paperNo,
                    			custType:self.gtjyz.custType,
                    			paperType:self.gtjyz.paperType,};
                    		 console.info(t);
                    		 custOtherSer.readCustByCondition('paper',t).then(function(rsp){
                    			 console.info(rsp);
                    			 if(rsp.success){
                    				 //紧急联系人
                    				 self.gtjyz={
                    						 'custType':rsp.data.custType,
                                 			 'paperType':rsp.data.paperType,
                    						 'custNo':rsp.data.custNo,
                    						 'paperNo':rsp.data.paperNo,
                    						 'custName':rsp.data.custName,
                    						 'phoneNo':rsp.data.phoneNo,
                    						 'workUnit':rsp.data.workUnit,
                    						 'custAddr':rsp.data.custAddr,
                    						 'sharePct':rsp.data.sharePct,
                    				 };
                    				 self.flag = true;
                    			 }
                    		 },function (rsp){
                    			 self.gtjyz={
                    					 'paperNo':self.gtjyz.paperNo,
                    					 'custType':self.gtjyz.custType,
                    					 'paperType':self.gtjyz.paperType,
                    			 };
                    		 });
                    	 }
                    	 //紧急联系人
                    	 if(type=='jjlxr'){
                    		 t={paperNo:params};
                    		 custOtherSer.readCustByCondition('paper',t).then(function(rsp){
                    			 if(rsp.success){
                    				 //紧急联系人
                    				 self.jjlxr={
                    						 'pCustNo':$stateParams.pCustNo,
                    						 'custNo':rsp.data.custNo,
                    						 'paperNo':params,
                    						 'custName':rsp.data.custName,
                    						 'phoneNo':rsp.data.phoneNo,
                    						 'linkType':'',
                    						 'workUnit':rsp.data.workUnit,
                    						 'custAddr':rsp.data.custAddr,
                    				 };
                    			 }
                    		 },function (rsp){
                    			 self.jjlxr={
                    					 'pCustNo':$stateParams.pCustNo,
                    					 'custNo':'',
                    					 'paperNo':params,
                    					 'custName':'',
                    					 'phoneNo':'',
                    					 'linkType':'',
                    					 'workUnit':'',
                    					 'custAddr':'',
                    			 };
                    		 });
                    	 }
                    	 //关联人
                    	 if(type=='glrxx'){
                    		 t={paperNo:params};
                    		 custOtherSer.readCustByCondition('paper',t).then(function(rsp){
                        		 if(rsp.success){
                        			 //关联人
                                    	 self.glrxx={
                                    			 'pCustNo':$stateParams.pCustNo,
                                    			 'custNo':rsp.data.custNo,
                                    			 'paperNo':params,
                                    			 'custName':rsp.data.custName,
                                    			 'phoneNo':rsp.data.phoneNo,
                                    			 'linkType':'',
                                    			 'soWnedClient':rsp.data.soWnedClient,
                                    			 'workUnit':rsp.data.workUnit,
                                    			 'custAddr':rsp.data.custAddr,
                                    	 };
                        		 }
                        	 },function (rsp){
                                     	 self.glrxx={
                                     			 'pCustNo':$stateParams.pCustNo,
                                     			 'custNo':'',
                                     			 'paperNo':params,
                                     			 'custName':'',
                                     			 'phoneNo':'',
                                     			 'linkType':'',
                                     			 'soWnedClient':'',
                                     			 'workUnit':'',
                                     			 'custAddr':'',
                                     	 };
                        	 });
                    	 }
                    	 //根据营业执照查询
                    	 if(type=='stxxnew'){
                    		 //实体信息
                    		 custOtherSer.readCustByCondition('regNo',{regNo:params}).then(function(rsp){
                    			 var date=new Date();
                    			 var t=rsp.data.businessStartDt;
                    			 if(/(\d{8})/.test(t)){
                    				 date=new Date(t.substr(0,4),parseInt(t.substr(4,2))-1,t.substr(6,2));
                    			 }else{
                    				 date=new Date();
                    			 }
                    			 
                    			 console.info(date);
                    			 
                    			 self.stxx={
                    					 'custName':rsp.data.custName,
                    					 'regNo':rsp.data.regNo,
                    					 'liceNo':rsp.data.liceNo,
                    					 'mainBusiness':rsp.data.mainBusiness,
                    					 'orgForm':rsp.data.orgFormId,
                    					 'corpReprst':rsp.data.corpReprst,
                    					 'employeeNum':rsp.data.employeeNum,
                    					 'orgType':rsp.data.orgTypeId,
                    					 'fixPhone':rsp.data.fixPhone,
                    					 'businessHours':rsp.data.businessHours,
                    					 'addressType':rsp.data.addressTypeId,
                    					 'addressArea':rsp.data.addressArea,
                    					 'businessStartDt':date,
                    					 'address':rsp.data.address,
                    					 'entCustNo':rsp.data.entCustNo,
                    					 'cardMerge': self.stxx.cardMerge,
                    					 'custNo': $stateParams.custNo,
                    			 };
                    			 
                    		 },function(){
                    			 
                    			 self.stxx={
                    					 'custName':'',
                    					 'regNo':params,
                    					 'liceNo':'',
                    					 'mainBusiness':'',
                    					 'orgForm':'',
                    					 'corpReprst':'',
                    					 'employeeNum':'',
                    					 'orgType':'',
                    					 'fixPhone':'',
                    					 'businessHours':'',
                    					 'addressType':'',
                    					 'addressArea':'',
                    					 'businessStartDt':'',
                    					 'address':'',
                    					 'entCustNo':'',
                    					 'cardMerge': self.stxx.cardMerge,
                    					 'custNo': $stateParams.custNo,
                    			 };
                    			 
                    		 });
                    	 }
                    	 if(type=='stxx'){
                			 //实体信息
                    		 custOtherSer.readCustByCondition('liceNo',{liceNo:params}).then(function(rsp){
                    			 var date=new Date();
                    			 var t=rsp.data.businessStartDt;
                    			 if(/(\d{8})/.test(t)){
                    				 date=new Date(t.substr(0,4),parseInt(t.substr(4,2))-1,t.substr(6,2));
                    			}else{
                    				date=new Date();
                    			}
                    		
                    			console.info(date);
                    			 
                    			 self.stxx={
             							'custName':rsp.data.custName,
             				            'regNo':rsp.data.regNo,
             				            'liceNo':params,
             				            'mainBusiness':rsp.data.mainBusiness,
             				            'orgForm':rsp.data.orgFormId,
             				            'corpReprst':rsp.data.corpReprst,
             				            'employeeNum':rsp.data.employeeNum,
             				            'orgType':rsp.data.orgTypeId,
             				            'fixPhone':rsp.data.fixPhone,
             				            'businessHours':rsp.data.businessHours,
             				            'addressType':rsp.data.addressTypeId,
             				            'addressArea':rsp.data.addressArea,
             				            'businessStartDt':date,
             				            'address':rsp.data.address,
             				            'entCustNo':rsp.data.entCustNo,
             				            'cardMerge': self.stxx.cardMerge,
             				           'custNo': $stateParams.custNo,
             				 };
                    			 
                    		 },function(){
                    			 
                    			 self.stxx={
                 						'custName':'',
                 			            'regNo':'',
                 			            'liceNo':params,
                 			            'mainBusiness':'',
                 			            'orgForm':'',
                 			            'corpReprst':'',
                 			            'employeeNum':'',
                 			            'orgType':'',
                 			            'fixPhone':'',
                 			            'businessHours':'',
                 			            'addressType':'',
                 			            'addressArea':'',
                 			            'businessStartDt':'',
                 			            'address':'',
                 			            'entCustNo':'',
                 			           'cardMerge': self.stxx.cardMerge,
                 			           'custNo': $stateParams.custNo,
             				 };
                    			 
                    		 });
                		 }
                    	 
                    	 
                     };
                     
                 }]
      ).controller(//客户其他修改
       		'custOtherEdit.paramCtrl',
            ['$stateParams', 'custOtherSer', 'jnHelper','$state','jnForm','myCustomerSer', 'jnValidate', 'jnPage','jnUser','$scope',
             function ($stateParams, custOtherSer, jnHelper,$state,jnForm,myCustomerSer,jnValidate, jnPage,jnUser,$scope) {
                 var self = this;
                 
                 self.fillData=function(paperNo){
                	 if(jnValidate.idNo(paperNo)){
                		 self.grxx.spouseSex=jnForm.sexFromId(paperNo); 
                		 self.grxx.spouseBirthday=jnForm.jsDateFromRspDate(jnForm.birthFromId(paperNo)); 
                		 
                	 }
                 };
                 
                 var title_list={
                 		jjlxr:'紧急联系人修改', 
                 		glrxx:'关联人修改', 
                 		stxx:'实体信息新增', 
                 		gtjyz:'共同经营者修改', 
                 		gyxx:'个人客户修改', 
                 		grxx:'个人信息修改', 
                 		stxiangx:'实体信息修改', 
                 };
                 
                 self.actionFlag=$stateParams["actionFlag"];
                 self.title=title_list[$stateParams["actionFlag"]];
                 if(self.actionFlag==='glrxx'){
                	 self.pCustNo=$stateParams.pCustNo=$stateParams["qCustNo"];
                 }
                 
                 var gtjyzList=null;
                 //共同经营者修改
                 if(self.actionFlag=='gtjyz'){
                	 custOtherSer.readList($stateParams).then(
                			 function(rsp){
                				 console.info(rsp);
                				 gtjyzList=refine(rsp.items,['custNo',
                				                             'custType',
                				                             'custName',
                				                             'paperNo',
                				                             'phoneNo',
                				                             'soWnedClient',
                				                             'workUnit',
                				                             'custAddr',
                				                             'linkType',
                				                             'paperType']);
                				 var data=rsp.items[$stateParams.index];
                				 self.gtjyz={
                						custNo:data.custNo, 
                						custType:data.custType,
                						custName:data.custName, 
                						paperNo:data.paperNo, 
                						phoneNo:data.phoneNo, 
                						soWnedClient:data.soWnedClient, 
                						workUnit:data.workUnit, 
                						custAddr:data.custAddr, 
                						paperType:data.paperType,
                				 };
                				 self.gtjyz.paperNoRead=data.paperNo;
                			 }
                	 );
                 }
                 
                 
                 //实体信息修改
                 if(self.actionFlag==='stxiangx'){
                	 custOtherSer.readList($stateParams).then(
                			 function(rsp){
                				 console.info(rsp);
                				 rsp.data=rsp.items[0];
                				 var date=new Date();
                    			 var t=rsp.data.businessStartDt;
                    			 if(/(\d{8})/.test(t)){
                    				 date=new Date(t.substr(0,4),parseInt(t.substr(4,2))-1,t.substr(6,2));
                    			}else{
                    				date=new Date();
                    			}
                    			console.info(date);
                    			var cardMerge=null;
                    			if(rsp.data.liceNo.length==18){
                    				cardMerge='Y';
                    			}else{
                    				cardMerge='N';
                    			}
                				 self.stxx={
                	 						custName:rsp.data.custName,
                	 			            regNo:rsp.data.regNo,
                	 			            liceNo:rsp.data.liceNo,
                	 			            mainBusiness:rsp.data.mainBusiness,
                	 			            orgForm:rsp.data.orgForm,
                	 			            corpReprst:rsp.data.corpReprst,
                	 			            employeeNum:rsp.data.employeeNum,
                	 			            orgType:rsp.data.orgType,
                	 			            fixPhone:rsp.data.fixPhone,
                	 			            businessHours:rsp.data.businessHours,
                	 			            addressType:rsp.data.addressType,
                	 			            addressArea:rsp.data.addressArea,
                	 			            businessStartDt:date,
                	 			            address:rsp.data.address,
                	 			            entCustNo:$stateParams.entCustNo,
                	 			           cardMerge:cardMerge,
                	 			           custNo:$stateParams.custNo,
                						 
                				 };

                                 self.cardMerge = cardMerge;
                				 
                			 }
                	 );
                 }
                 //概要信息修改
                 if(self.actionFlag==='gyxx'){
                	 var params={};
                	 params.custNo= $stateParams.custNo;
                     params.operType= "0";
                	 myCustomerSer.qryDetail(params).then(
                      		function(rsp){
                     			console.info(rsp);
                     			self.gyxx={
                     					sex:rsp.data.sex,
                     					age:jnForm.ageFromBirth(rsp.data.birthday),
                     					custName:rsp.data.custName,
                     					paperNo:rsp.data.paperNo,
                     					custManagerName:rsp.data.custManagerName,
                     					email:rsp.data.email,
                     					phoneNo:rsp.data.phoneNo,
                     					custAddr:rsp.data.custAddr,
                     					custNo: $stateParams.custNo,
                     			};
                     			
                      		}
                      );
                 }
                 //个人信息
                 if(self.actionFlag==='grxx'){
                	 custOtherSer.readList($stateParams).then(
                			 function(rsp){
                				 console.info(rsp);
                				 rsp.data=rsp.items[0];
                				 self.grxx={
                						 adTypeId:rsp.data.adTypeId,
                						 custNo:$stateParams.custNo,
                						 birthday:jnForm.jsDateFromRspDate(rsp.data.birthday),
                						 marryStatus:rsp.data.marryStatus,
                						 domPlace:rsp.data.domPlace,
                						 spouseCustName:rsp.data.spouseCustName,
                						 spousePaperNo:rsp.data.spousePaperNo,
                						 spouseSex:rsp.data.spouseSex,
                						 spouseBirthday:jnForm.jsDateFromRspDate(jnHelper.birthFromId(rsp.data.spousePaperNo)),
                						 spouseMobPhone: rsp.data.spouseMobPhone,
                						 spouseWorkUnit: rsp.data.spouseWorkUnit,
                				 };
                				 
                				 //选择后，后台返回数据。则姓名，证件号码，性别，出生日期 不可以编辑
                				 self.nameChange = function(data){
                     				if(data.paperNo != ''){
                     					$scope.paperNoFlag = true;
                     				}
                     			};
                     			
                     			//填写证件号码后，后台返回数据。则姓名，证件号码，性别，出生日期 不可以编辑
                     			self.noChange = function(data){
                     				if(data.paperNo != ''){
                     					$scope.nameFlag = true;
                     					$scope.paperNoFlag = true;
                     				}
                     			};
                     			
                     			//根据用户输入的身份证，计算性别和出生日
                     			self.calaData = function(data){
                     				self.grxx.spouseSex = jnHelper.sexFromId(data);
                     				self.grxx.spouseBirthday = jnForm.jsDateFromRspDate(jnHelper.birthFromId(data));
                     			};
                				 
                			 }
                	 );
                 }
                 
                 //关联人修改
                 if(self.actionFlag==='glrxx'){
                	 custOtherSer.readList($stateParams).then(
                			 function(rsp){
                				 console.info(rsp);
                				 rsp.data=rsp.items[$stateParams.index];
                				 console.info( rsp.data);
                				 self.glrxx={
                						 pCustNo:$stateParams.qCustNo,
                						 custNo:rsp.data.custNo,
                						 custName:rsp.data.custName,
                						 paperNo:rsp.data.paperNo,
                						 phoneNo:rsp.data.phoneNo,
                						 linkType:rsp.data.linkType,
                						 soWnedClient:rsp.data.soWnedClient,
                						 workUnit:rsp.data.workUnit,
                						 custAddr:rsp.data.custAddr,
                				 };
                			 }
                	 );
                	 
                 }
                 //紧急联系人修改
                 if(self.actionFlag==='jjlxr'){
                	 custOtherSer.readList($stateParams).then(
                			 function(rsp){
                				 console.info(rsp);
                				 rsp.data=rsp.items[$stateParams["index"]];
                				 console.info( rsp.data);
                				 self.jjlxr={
                						 pCustNo:$stateParams.custNo,
                						 custNo:rsp.data.custNo,
                						 custName:rsp.data.custName,
                						 paperNo:rsp.data.paperNo,
                						 phoneNo:rsp.data.phoneNo,
                						 linkType:rsp.data.linkType,
                						 workUnit:rsp.data.workUnit,
                						 custAddr:rsp.data.custAddr,
                				 };
                			 }
                	 );
                	 
                 }
                 
                 //修改提交
                 self.submit=function(type){
                	console.info(type);
                	//修改客户概要信息
                	if(type==='gyxx'){
                		jnForm.validate(self.form.gyxx)
                		.then(function() {
                			self.form.gyxx.actionFlag=type;
                			custOtherSer.editOther(self.form.gyxx).then(function(rsp){
                				if(rsp.success){
                                                        jnPage.modified = false;
                					jnHelper.alert('修改成功').then(function(){
                                        jnPage.back();
                					}
                					);
                				}
                			});
                		});
                	}
                	//修改个人信息
                	if(type==='grxx'){
                		var form=self.form.grxx;
                		jnForm.validate(form)
                		.then(function() {
                			form.actionFlag=type;
                			
                			//先判断婚姻状态，如果未婚，本地判断，与配偶的性别是否相反
                			if(form.marryStatus.$modelValue=='28' || form.marryStatus.$modelValue=='29'){
                				if(self.grxx.spouseSex == $stateParams.sex){
                    				jnHelper.alert('配偶不能为同性');
                    				return;
                    			};
                			}
                			
                			//先把数据查询回本地
                			 var params={};
                        	 params.custNo= $stateParams.custNo;
                        	 params.operType= "0";
                        	 params.actionFlag= $stateParams.actionFlag;
                        	 custOtherSer.readList(params).then(
                        			 function(rsp){
                        				 var data=rsp.items[0];
                        				 var jsonData=data.custRelationList;
                        				 jsonData=refine(jsonData,
                        						 [
                        		                    'custNo', // 编号
                        		                    'custName', // 姓名
                        		                    'linkType', // 人人关系
                        		                    'linkStatus', // 关系状态
                        		                    'paperNo', // 证件号码
                        		                    'phoneNo', // 联系电话
                        		                    'workUnit', // 工作单位
                        		                    'soWnedClient', // 占比
                        		                    'custAddr', // 客户地址
                        		                ]
                        						 );
                        				 jsonData=JSON.stringify(jsonData);
                        				 var sub={};
                        				 if(form.marryStatus.$modelValue=='28'||form.marryStatus.$modelValue=='29'){
                        					 sub={
                        							 actionFlag:type,
                        							 custNo:$stateParams.custNo,
                            						 lxrList:jsonData,
                            						 operType:'1',
                            						 adTypeId:form.adTypeId.$modelValue,
                            						 birthday:jnForm.rspDateFromJsDate(form.birthday.$modelValue),
                            						 marryStatus:form.marryStatus.$modelValue,
                            						 domPlace:form.domPlace.$modelValue,
                            						 spouseCustName:form.spouseCustName.$modelValue,
                            						 spousePaperNo:form.spousePaperNo.$modelValue,
                            						 spouseMobPhone:form.spouseMobPhone.$modelValue,
                            						 pouseSex:self.grxx.spouseSex,
                            						 spouseBirthday:jnForm.rspDateFromJsDate(form.spouseBirthday.$modelValue),
                            						 spouseWorkUnit:	form.spouseWorkUnit.$modelValue, 
                        					 };
                        				 }else{
                        					 sub={
                        							 actionFlag:type,
                        							 custNo:$stateParams.custNo,
                            						 lxrList:jsonData,
                            						 operType:'1',
                            						 adTypeId:form.adTypeId.$modelValue,
                            						 birthday:jnForm.rspDateFromJsDate(form.birthday.$modelValue),
                            						 marryStatus:form.marryStatus.$modelValue,
                            						 domPlace:form.domPlace.$modelValue,
                        					 };
                        				 }
                        				 
                        				 custOtherSer.editOther(sub).then(function(rsp){
                             				if(rsp.data.success){
                                                        jnPage.modified = false;
                             					jnHelper.alert('修改成功').then(
                             							function(rsp){
                                                            jnPage.back();
                                    					}
                             					);
                             				}
                             			});
                        				 
                        			 }
                        	 );
                			
                			
                		});
                	}
                	//紧急联系人修改
                	if(type==='jjlxr'){
                		var form=self.form.jjlxr;
                		jnForm.validate(form)
                		.then(function() {
                			form.actionFlag=type;
                			//先把数据查询回本地
                			var params={};
                			params.custNo= $stateParams.custNo;
                			params.operType= "0";
                			params.actionFlag= 'grxx';
                			custOtherSer.readList(params).then(
                					function(rsp){
                						var data=rsp.items[0];
                						var jsonData=data.custRelationList;
                						jsonData=refine(jsonData,
                								[
                								 'custNo', // 编号
                								 'custName', // 姓名
                								 'linkType', // 人人关系
                								 'linkStatus', // 关系状态
                								 'paperNo', // 证件号码
                								 'phoneNo', // 联系电话
                								 'workUnit', // 工作单位
                								 'custAddr', // 客户地址
                								 ]
                						);
                						
                						  for ( var int = 0; int < jsonData.length; int++) {
                							  if(String(int)==$stateParams.index){
                								  jsonData[int]={
                										  custNo:form.custNo.$modelValue,
                										  custName:form.custName.$modelValue,
                										  linkType:form.linkType.$modelValue,
                										  linkStatus:jsonData[int]["linkStatus"],
                										  paperNo:form.paperNo.$modelValue,
                										  phoneNo:form.phoneNo.$modelValue,
                										  workUnit:form.workUnit.$modelValue,
                										  custAddr:form.custAddr.$modelValue,
                								  };
                							  }
                			                }
                						
                						jsonData=JSON.stringify(jsonData);
                						var sub={};
                						if(data.marryStatus=='28'||data.marryStatus=='29'){
                							sub={
                									 actionFlag:type,
                        							 custNo:$stateParams.custNo,
                            						 lxrList:jsonData,
                            						 operType:'1',
                            						 adTypeId:data.adTypeId,
                            						 birthday:data.birthday,
                            						 marryStatus:data.marryStatus,
                            						 domPlace:data.domPlace,
                            						 pouseCustName:data.pouseCustName,
                                                     pouseSex:data.pouseSex,
                            						 pouseCustNo:data.pouseCustNo,
                            						 pousePaperNo:data.pousePaperNo,
                            						 pouseMobPhone:data.pouseMobPhone,
                            						 pouseBirthday:data.pouseBirthday,
                            						 pouseWorkUnit:	data.pouseWorkUnit, 
                							};
                						}else{
                							sub={
                									actionFlag:type,
                									custNo:$stateParams.custNo,
                									lxrList:jsonData,
                									operType:'1',
                									adTypeId:data.adTypeId,
                									birthday:data.birthday,
                           						 	marryStatus:data.marryStatus,
                           						 	domPlace:data.domPlace,
                							};
                						}
                						
                						custOtherSer.editOther(sub).then(function(rsp){
                							if(rsp.data.success){
                                                        jnPage.modified = false;
                								jnHelper.alert('修改成功').then(
                										function(rsp){
                                                            jnPage.back();
                										}
                								);
                							}
                						});
                						
                					}
                			);
                			
                			
                		});
                	}
                	//修改关联人
                	if(type=='glrxx'){
                		var form=self.form.glrxx;
                		jnForm.validate(form)
                		.then(function() {
                			form.actionFlag=type;
                			custOtherSer.editOther(form).then(function(rsp){
                				if(rsp.data.success){
                                                        jnPage.modified = false;
                					jnHelper.alert('修改成功').then(function(rsp){
                                        jnPage.back();
                					}
                					);
                				}
                			});
                		});
                	}
                	//修改实体信息
                	if(type=='stxiangx'){
                		var form=self.form.stxx;
                		jnForm.validate(form)
                		.then(function() {
                			//先把共同经营者人查回来
                			 custOtherSer.readList({
                				 custNo:$stateParams.custNo,
                				 entCustNo:$stateParams.entCustNo,
                				 actionFlag:'gtjyz',
                			 }).then(
                			 function(rsp){
                				 console.info(rsp);
                				 var json={};
                     			json=rsp.items;
                     			if(json){
                     				json=refine(json,[
                     				                 'custNo', // 编号
                     	                            'custName', // 姓名
                     	                            'linkType', // 人人关系
                     	                            'linkStatus', // 关系状态
                     	                            'paperNo', // 证件号码
                     	                            'phoneNo', // 联系电话
                     	                            'workUnit', // 工作单位
                     	                            'soWnedClient', // 业务占比
                     	                            'custAddr', // 客户地址
                                                   ]);
                     			}
                     			json = JSON.stringify(json);
                     			form.json=json;
                     			
                     			form.actionFlag=type;
                     			custOtherSer.editOther(form).then(function(rsp){
                     				if(rsp.data.success){
                                                        jnPage.modified = false;
                     					jnHelper.alert('修改成功').then(function(rsp){
                                            jnPage.back();
                     					}
                     					);
                     				}
                     			});
                			 }
                			 );
                			
                			
                		});
                	}
                	//修改共同经营者
                	if(type=='gtjyz'){
                		var form=self.form.gtjyz;
                		jnForm.validate(form)
                		.then(function() {
                			
                			//先把实体查询回来
                			custOtherSer.readList({
                				entCustNo:$stateParams.entCustNo,
                				actionFlag:'stxiangx',
                			}).then(
                					function(rsp){
                						console.info(rsp);
                						var json={};
                						json=rsp.items;
                						console.info(json);
                						if(json){
                							json=refine(json,[
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
															'custType'
                							                  ]);
                						}
//                						json = JSON.stringify(json);
//                						form.json=json;
                						
                					
//                						json=json[0];
//                						json.custNo=$stateParams.custNo;
//                						json.opt='modify';
//                						console.info(gtjyzList);
//                						console.info( self.gtjyz);
//                						self.gtjyz.linkType='24';
//                						gtjyzList[$stateParams.index]= self.gtjyz;
//                						if(!json.shareJson)
//                						gtjyzList=JSON.stringify(gtjyzList);
//                						console.info(gtjyzList);
//                						json.shareJson=gtjyzList;
//                						
//                						json.actionFlag=type;
//                						custOtherSer.editOther(json).then(function(rsp){
//                							if(rsp.data.success){
//                                                        jnPage.modified = false;
//                								jnHelper.alert('修改成功').then(function(rsp){
//                                                    jnPage.back();
//                								}
//                								);
//                							}
//                						});
                						
                					   self.gtjyz.pCustNo = $stateParams.entCustNo;
//                					   self.gtjyz.custNo=$stateParams.custNo;
              						   self.gtjyz.custType = self.gtjyz.custType;
              			        	   self.gtjyz.orgNo = jnUser.insttuId;
              			        	   self.gtjyz.operType = '1';
              			        	   self.gtjyz.custFlag = '0';
              			        	   self.gtjyz.linkType = '14';
              			        	   self.gtjyz.custNameTmp = self.gtjyz.custName;
              			        	   self.gtjyz.paperNoTmp = self.gtjyz.paperNo;
              			        	   self.gtjyz.phoneNo = self.form.gtjyz.phoneNo.$$rawModelValue;
              			        	   self.gtjyz.paperTypeTmp = self.gtjyz.paperType;
              			        	   self.gtjyz.sharePct = self.gtjyz.soWnedClient;
                  					   console.info(self.gtjyz);
                  					   self.gtjyz.actionFlag=type;
                  						custOtherSer.editOther(self.gtjyz).then(function(rsp){
                  							console.info(rsp);
                  							if(rsp.data.success){
                                                  jnPage.modified = false;
                  								jnHelper.alert("修改成功").then(function(rsp){
                  									jnPage.back();
                  								}
                  								);
                  							}
                  						});
                						
                					}
                			);
                			
                			
                		});
                	}
                	
                	
                 };
             }]
  );

})();


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

