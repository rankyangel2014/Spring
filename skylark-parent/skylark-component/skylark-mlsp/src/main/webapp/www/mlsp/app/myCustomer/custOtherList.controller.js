(function () {
'use strict';

angular
    .module('custOtherList')
    .controller('custOtherList.listCtrl',
        ['jnUser','$stateParams', 'custOtherSer', 'jnHelper','$state','$scope','jnPersonCustService','$ionicListDelegate',
        function (jnUser,$stateParams, custOtherSer, jnHelper,$state,$scope,jnPersonCustService,$ionicListDelegate) {
            var self = this;
			$scope.custClass=$stateParams.custClass;
			$scope.isQry=$stateParams.isQry;
            var title_list={
            		shares:'合伙人信息',
            		relations:'联系人信息',
            		custRelationInfos:'客户关系信息',
            		assignHistoryInfos:'分配历史',
            		custEventInfos:'事件信息',
            };
			//客户经理可以编辑
			$scope.isManager = jnUser.hasStation('400');
			$scope.custPaperNo =$stateParams.custPaperNo;

            $scope.custNo = $stateParams.custNo;
            self.telClick=function(e){
            	e.stopPropagation();
            };
            self.toDetail=function(custNo,linkType,actionFlag,index,e){
            	 $state.go('custOtherDetail', {
            		 							custNo:custNo,
            		 						    linkType:linkType,
            		 						    actionFlag:actionFlag,
            		 						    index:index%10,
					 							isQry:$stateParams.isQry,
					 							custPaperNo:$stateParams.custPaperNo,
            		 						    start:parseInt(index/10)*10
            	 });      	      
            };
            //新增
            self.add=function(type){
              	    if(type=='shares'){
              	    	  $state.go('partnerAdd',$stateParams);
              	    }
            };
                
             $scope.rmSHA = function (item) {
                    var text = '确实要合伙人:' + item.custName + '吗？';
                    jnHelper.confirm(text).then(function (confirmed) {
                        if (confirmed) {
                            custOtherSer.rmSHA(item)
                                .then(function () {
                                    jnHelper.removeArrayItem(self.list.items,
                                        function (e) {
                                            return e.linkCustNo === item.linkCustNo;
                                        }
                                    );
                                    self.list.total -= 1;
                                });
                        } else {
                            $ionicListDelegate.closeOptionButtons();
                        }
                    });
                };
            var pf = jnHelper.PaginateFetcher(custOtherSer.readList)
            .params($stateParams);
            
            /*挂载到容器里面*/
          
            self.actionFlag=$stateParams["actionFlag"];
            self.title=title_list[$stateParams["actionFlag"]];
            self.list= pf.records();
            self.totalCustNo=$stateParams["custNo"] ;

            //删除紧急联系人信息
            self.delRelation=function(relation){
                var deleteListString = [{
                    custNo:relation.custNo,
                    linkType:relation.linkType,
                    paperType:relation.paperType,
                    phoneNo:relation.phoneNo,
                    paperNo:relation.paperNo,
                    linkCustNo:relation.linkCustNo,
                    custName:relation.custName,
                    recId:relation.recId,
                }];

				jnHelper.confirm('确定要删除紧急联系人'+relation.custName+'吗？').then(function (confirmed) {
					if (confirmed) {
						//调用删除接口
						jnPersonCustService.delPerCustRelationInfo(deleteListString).then(function(rsp){
							if (rsp.success) {
								jnHelper.alert('删除成功！').then(function(){
									jnHelper.removeArrayItem(self.list.items,
											function (e) {
												return e.recId === relation.recId;
											}
									);
									self.list.total -= 1;
								});
							} else {
								jnHelper.alert(rsp.errMsg);
							}
						});
					} else {
						$ionicListDelegate.closeOptionButtons();
					}
				});
            }

            self.more = function() {
                pf.fetch().then(function () {
                	self.start=pf.start-pf.limit;
                    // 这里可以进一步处理
                });
            };
            self.more();
        }]
    ).controller('partnerAdd.listCtrl',
            ['$stateParams', 'custOtherSer', 'jnHelper','$state','jnForm','jnConstant','$filter','jnPage','$scope',
             function ($stateParams, custOtherSer, jnHelper,$state,jnForm,jnConstant,$filter,jnPage,$scope){
            	 jnPage.modified = true;
            	 var self = this;
                 var title_list={
                		 shares:'合伙人新增', 
                 };
                 self.nameDisable=false;
                 var custNo=$stateParams["custNo"];
                 var linkType=$stateParams["linkType"];
                 self.actionFlag=$stateParams["actionFlag"];
                 self.title=title_list[$stateParams["actionFlag"]];
                 self.reset = function() {
                	 self.nameDisable=false;
                     self.myForm.$rollbackViewValue();
                     self.form = {
                     		paperType:0,
                     		investAmt:"",
                     		investPct:"",
                     		phoneNo:""
                     };
                 };
                 $scope.lostBlurSetName = function() {
                	 custOtherSer.getName(self);
                 };
               
                 self.submit=function(type){
                	var form=self.form;
                	
                	//合伙人添加
                	if(type==='shares'){
                		 jnForm.validate(self.myForm)
	                         .then(function() {
	                        	 var sub={
	                       			  linkType:linkType,
	                       			  custNo:custNo,
	                       			  custType:'0',
	       							  custName:self.myForm.custName.$viewValue,
	       							  paperType:'0',
	       							  paperNo:form.paperNo,
	       							  phoneNo:form.phoneNo,
	       							  investPct:form.investPct,
	       							  investAmt:form.investAmt,
	       							  operate:'0',
	                        	 };
//	                        	 self.form.shares.actionFlag=type;
	                        	 custOtherSer.addPartnerInfo(sub).then(function(rsp){
	                        		 if(rsp.success){
	                                     jnPage.modified = false;
	                        			 jnHelper.alert('添加成功').then(function(){
	                                         jnPage.back();
	                        			 });
	                        		 }
	                        	 });
	                         });
                	}
                 };
	        }]).controller('partnerEdit.listCtrl',
	                ['$stateParams', 'custOtherSer', 'jnHelper','$state','jnForm','jnValidate','$scope','jnPage',
	                 function ($stateParams, custOtherSer, jnHelper,$state,jnForm,jnValidate,$scope,jnPage){
	                	jnPage.modified = true;
	                	var self = this;
	                    var title_list={
	                    		shares:'合伙人修改', 
	                    };
	                    self.nameDisable=true;
	                    var custNo,linkCustNo,linkType,custType,recId;
	                    self.actionFlag=$stateParams["actionFlag"];
	                    self.title=title_list[$stateParams["actionFlag"]];
	                    var sharesList=null;
	                    var index=$stateParams["index"];
	                    $scope.lostBlurSetName = function() {
	                    	custOtherSer.getName(self);
	                    };
//	                    $scope.number = function(e) {
//	                    	var ss=window.event||e;
//	                    	if(ss.keyCode==229){
//	                        	ss.preventDefault();
//	                        }else if(!((ss.keyCode>47&&ss.keyCode<58)||(ss.keyCode==190)||(ss.keyCode==110)||(ss.keyCode==8)||(ss.keyCode>95&&ss.keyCode<106))){
//	                            ss.preventDefault();
//	                        }
//	                    };
	                    //合伙人修改
	                    if(self.actionFlag=='shares'){
		                   	 custOtherSer.readList($stateParams).then(
		                   			 function(rsp){
		                   				
		                   				 sharesList=refine(rsp.items,[
		                   				                             'custNo',
		                   				                             'custName',
		                   				                             'paperType',
		                   				                             'paperNo',
		                   				                             'phoneNo',
		                   				                             'investPct',
		                   				                             'investAmt',
		                   				                             'linkCustNo',
		                   				                             'linkType',
		                   				                             'custType',
		                   				                             'recId']);
		                   				 var data=sharesList[index];
		                   				 custNo=data.custNo;
		                   				 linkType=data.linkType;
		                   				 custType=data.custType;
		         	                     linkCustNo=data.linkCustNo;
		         	                     recId = data.recId;
		                   				 self.form={
		                   						custName:data.custName, 
		                   						paperType:data.paperType, 
		                   						paperNo:data.paperNo, 
		                   						phoneNo:data.phoneNo, 
		                   						investPct:data.investPct, 
		                   						investAmt:data.investAmt, 
		                   				 };
		                   			 }
		                   	 );
	                    }
	                    self.reset = function() {
	                    	self.nameDisable=false;
	                        self.myForm.$rollbackViewValue();
	                        self.form = {
	                        		paperType:0,
	                         		investAmt:"",
	                         		investPct:"",
	                         		phoneNo:""
	                        };
	                    };
//	                    self.back = function() {
//	                    	jnPage.modified = true;
//	                    	jnPage.back();
//	                    };
	                    self.submit=function(type){
	                    	var form=self.form;
	                    	var sub={
	                    			  custNo:custNo,
	                    			  linkType:linkType,
	                    			  custType:custType,
	                    			  linkCustNo:linkCustNo,
	    							  custName:form.custName,
	    							  paperType:form.paperType,
	    							  paperNo:form.paperNo,
	    							  phoneNo:form.phoneNo,
	    							  investPct:form.investPct,
	    							  investAmt:form.investAmt,
	    							  operate:'1',
	    							  recId:recId
	    					};
	                    	//合伙修改
	                    	if(type==='shares'){
	                    		 jnForm.validate(self.myForm)
	                             .then(function() {
	                            	 custOtherSer.editPartnerInfo(sub).then(function(rsp){
	                            		 if(rsp.success){
	                                         jnPage.modified = false;//true提示未保存退出
	                            			 jnHelper.alert('修改成功').then(function(){
	                                             jnPage.back();
	                            			 });
	                            		 }
	                            	 });
	                             });
	                    	}
	                     };
	                }]);

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