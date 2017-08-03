/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('entCustDetail')
    .controller('partnerAdd.paramCtrl',//股东信息 新增
        ['jnHttp', 'jnUser','$stateParams','$scope','jnForm','jnHelper','jnValidate','entCustSer','$state', 'jnPage',
        function (jnHttp, jnUser,$stateParams,$scope,jnForm,jnHelper,jnValidate,entCustSer,$state, jnPage) {
           var self=this;
           //jnPage.modified = true;
           self.form={'pCustNo':$stateParams.pCustNo,
        			 'custType':0};
           self.onSelectCustomer = function (cust) {
	          	 self.flag = true;
	          	 self.form.custType = cust.custType;
	          	 self.form.paperType = cust.paperType;
	          	 self.form.workUnit = cust.workUnit;
	          	 self.form.custAddr = cust.custAddr;
               self.form.custNo = cust.custNo;
               self.form.paperNo = cust.paperNo;
               self.form.phoneNo = cust.phoneNo;
               return ;
           };
           //根据证件号码查询客户信息
           self.custSearch = function(linkPaperNo,linkPaperType){
        	 var params={
        			 paperType:linkPaperType,
        			 paperNo:linkPaperNo,
        	 };
        	 entCustSer.getCustByContion(params).then(
        			 function(rsp){
        				 
        				 if(rsp.data.custNo != ''){
        					 self.flag = true;
        					 self.form.custNo = rsp.data.custNo;
        				 }else{
        					 self.flag = false;
        				 }
        				 self.form.custAddr = rsp.data.custAddr; //联系地址
        				 self.form.custName =  rsp.data.custName; //名称
        				 self.form.phoneNo =  rsp.data.phoneNo;  //联系方式
        				 
        			 }
        	 );
        	   
           };
           
           //保存新增信息  
           self.submit = function(){
        	   self.form.pCustNo = $stateParams.pCustNo;
        	   if(self.form.paperType == '0'){
        		   self.form.custType = '0';
        	   }else if(self.form.paperType == '10' || self.form.paperType == '11'){
        		   self.form.custType = '1';
        	   }
        	   self.form.orgNo = jnUser.insttuId;
        	   self.form.operType = '1';
        	   self.form.custFlag = '0';
        	   self.form.linkType = '29';
        	   self.form.custNameTmp = self.form.custName;
        	   self.form.paperNoTmp = self.form.paperNo;
        	   self.form.phoneNo = self.addForm.phoneNo.$$rawModelValue;
        	   self.form.paperTypeTmp = self.form.paperType;
        	//   console.info(self.addForm);
        	   jnForm.validate(self.addForm)
	               .then(function () {
	               	return jnHttp.post('/mloan/router/rest/ModifyCustAction.do?method=updateCustLinkPInfo',
	               			self.form).then(function(rsp){
	               				if(rsp.success){
                                    jnPage.modified = false;
									jnHelper.alert('新增成功').then(function(){
                                        jnPage.back();
									});
								}
	           	            });
	            	 
               });
           };
           
           //客户类型变化，清空客户关系值
           self.clear = function(){
        	   self.form.paperNo = '';
           };
           
        }]
    )
    .controller('relationPerAdd.paramCtrl',//关联信息 新增
    		['jnHttp', 'jnUser','$stateParams','$scope','jnForm','jnHelper','jnValidate','entCustSer','entEditSer','$state', 'jnPage','jnConstant','$filter','custActualService',
    		 function (jnHttp, jnUser,$stateParams,$scope,jnForm,jnHelper,jnValidate,entCustSer,entEditSer,$state, jnPage,jnConstant,$filter,custActualService) {
    			var self = this;
    			self.flag = false;
                self.form = {};
                self.form.pCustNo = $stateParams.custNo;
                self.form.custType = '0';
                self.form.operType = '3';
                self.form.paperType = '0';
                self.linkTypeOptions = jnConstant.get(5017);
                //修改提交
                self.submit = function () {
                    jnForm.validate(self.editForm)
                        .then(function () {
                        	entEditSer.updateEnbRelationInfo(self.form).then(function (rsp) {
                                if (rsp.success) {
                                    jnPage.modified = false;
                                    jnHelper.alert('操作成功').then(function (rsp) {
                                            jnPage.back();
                                        }
                                    );
                                }
                            });

                        });
                };

                //校验身份证号码
                self.onChangeId = function () {
                    if (self.form.paperNo.length !== 18) return;
                    custActualService.readActualById({
                        paperNo: self.form.paperNo
                    }).then(function (rsp) {
                    	
                        if (rsp.success) {
                            self.form = rsp.data;
                        }
                        if(rsp.data.custNo != ''){
       					 self.flag = true;
       					 self.form.custNo = rsp.data.custNo;
	       				 }else{
	       					 self.flag = false;
	       				 }
                        self.form.birthday = new Date($filter('jnDate')(getBirthdayByPaperNo(self.form.paperNo)));
                        self.form.age = getAgeByPaperNo(self.form.paperNo);
                        self.form.sex = getSexByPaperNo(self.form.paperNo);
                        self.form.pCustNo = $stateParams.custNo;
                        self.form.custType = '0';
                        self.form.operType = '3';
                        self.form.paperType = '0';
                    });
                    self.form.birthday = new Date($filter('jnDate')(getBirthdayByPaperNo(self.form.paperNo)));
                    self.form.age = getAgeByPaperNo(self.form.paperNo);
                    self.form.sex = getSexByPaperNo(self.form.paperNo);
                };

                //选择客户
                self.onSelectCustomer = function (cust) {
                 	 self.flag = true;
    	          	 self.form.custType = cust.custType;
    	          	 self.form.paperType = cust.paperType;
    	          	 self.form.custAddr = cust.custAddr;
    	          	 self.form.custNo = cust.custNo;
    	          	 self.form.paperNo = cust.paperNo;
    	          	 self.form.mobPhone = cust.phoneNo;
    	          	 self.form.birthday = new Date($filter('jnDate')(getBirthdayByPaperNo(self.form.paperNo)));
                     self.form.age = getAgeByPaperNo(self.form.paperNo);
                     self.form.sex = getSexByPaperNo(self.form.paperNo);
                }

            }]
    )
    .controller('relationEntAdd.paramCtrl',//关联信息 新增
    		['jnHttp', 'jnUser','$stateParams','$scope','jnForm','jnHelper','jnValidate','entCustSer','entEditSer','$state', 'jnPage','jnConstant','$filter','custActualService',
    		 function (jnHttp, jnUser,$stateParams,$scope,jnForm,jnHelper,jnValidate,entCustSer,entEditSer,$state, jnPage,jnConstant,$filter,custActualService) {
    			 var self = this;
                 self.form = {cardMerge: 'N'};
                 self.form.pCustNo = $stateParams.custNo;
                 self.form.custType = '1';
                 self.form.operType = '3';
                 self.linkTypeOptions = jnConstant.get(5019);
                 
                 //修改提交
                 self.submit = function () {
                     
//                	 self.form.businessStartDt=jnForm.rspDateFromJsDate(self.form.businessStartDt);
                     jnForm.validate(self.editForm)
                         .then(function () {
                             if (self.form.cardMerge == 'N') {
                                 self.form.paperNoTmp = self.form.regNo;
                                 self.form.paperType = '10';
                             } else {
                                 self.form.paperNoTmp = self.form.liceNo;
                                 self.form.paperType = '11';
                             }
                             self.form.bussFlag = '1';
                             self.form.custAddr = self.form.address;
                             self.form.addressTypeOtherDesc = self.form.addressTypeotherDesc;
                        	 entEditSer.updateEnbRelationInfo(self.form).then(function (rsp) {
                                 if (rsp.success) {
                                     jnPage.modified = false;
                                     jnHelper.alert('添加成功').then(function (rsp) {
                                             jnPage.back();
                                         }
                                     );
                                 }
                             });

                         });

                 };


                 //添加的时候进行证件号码查询
                 self.onChangeLiceNo = function (liceNo) {
                     if (!liceNo || liceNo.length != 18) {
                         return;
                     }
                     custActualService.readEntActualById({liceNo: liceNo}).then(function (rsp) {
                         if (rsp.success) {
                             self.form = {
                                 custNo:rsp.data.custNo,
                                 cCustName: rsp.data.custName,
                                 cardMerge: rsp.data.liceNo ? 'Y' : 'N',
                                 liceNo: rsp.data.liceNo,
                                 loanCard: rsp.data.loanCard,
                                 inTrade: rsp.data.inTrade,
                                 inTradeName: rsp.data.inTradeName,
                                 phoneNo: rsp.data.fixPhone,
                                 orgType: rsp.data.orgType,
                                 mainBusiness: rsp.data.mainBusiness,
                                 businessStartDt: new Date($filter('jnDate')(rsp.data.businessStartDt)),
                                 businessHours: rsp.data.businessHours,
                                 employeeNum: parseInt(rsp.data.employeeNum),
                                 address: rsp.data.address,
                                 addressType: rsp.data.addressType,
                                 addressTypeotherDesc: rsp.data.addressTypeotherDesc,
                             };
                             self.form.pCustNo = $stateParams.custNo;
                             self.form.custType = '1';
                             self.form.operType = '3';
                             if (self.form.cardMerge == 'N') {

                                 self.form.paperType = '10';
                             } else {

                                 self.form.paperType = '11';
                             }
                         }

                     });

                 };
                 self.onChangeRegNo = function (regNo) {
                     if (!regNo || regNo.length != 15) {
                         return;
                     }

                     custActualService.readEntActualById({regNo: regNo}).then(function (rsp) {

                         if (rsp.success) {
                             self.form = {
                                 custNo:rsp.data.custNo,
                                 cCustName: rsp.data.custName,
                                 cardMerge: rsp.data.regNo ? 'N' : 'Y',
                                 regNo: rsp.data.regNo,
                                 loanCard: rsp.data.loanCard,
                                 inTrade: rsp.data.inTrade,
                                 inTradeName: rsp.data.inTradeName,
                                 phoneNo: rsp.data.fixPhone,
                                 orgType: rsp.data.orgType,
                                 mainBusiness: rsp.data.mainBusiness,
                                 businessStartDt: new Date($filter('jnDate')(rsp.data.businessStartDt)),
                                 businessHours: rsp.data.businessHours,
                                 employeeNum: parseInt(rsp.data.employeeNum),
                                 address: rsp.data.address,
                                 addressType: rsp.data.addressType,
                                 addressTypeotherDesc: rsp.data.addressTypeotherDesc,
                             };
                             self.form.pCustNo = $stateParams.custNo;
                             self.form.custType = '1';
                             self.form.operType = '3';
                             if (self.form.cardMerge == 'N') {

                                 self.form.paperType = '10';
                             } else {

                                 self.form.paperType = '11';
                             }
                         }
                     });

                 };

             }]
    )
	.controller('contactAdd.paramCtrl',//联系人新增
			['jnHttp', 'jnUser','$stateParams','$scope','jnForm','jnHelper','jnValidate','entCustSer','entEditSer','$state','jnContactInfoServer', 'jnPage',
			 function (jnHttp, jnUser,$stateParams,$scope,jnForm,jnHelper,jnValidate,entCustSer,entEditSer,$state,jnContactInfoServer, jnPage) {
				var self=this;
				self.form={};
				self.form.custNo=$stateParams.custNo;
				
				//根据证件号码查询客户信息
				self.custSearch = function(linkPaperNo,linkPaperType){
					var params={
							paperType:linkPaperType,
							paperNo:linkPaperNo,
					};
					entCustSer.getCustByContion(params).then(
							function(rsp){
								console.info(rsp);
								self.form.linkCustNo=rsp.data.custNo;
								self.form.linkCustName=rsp.data.custName;
								self.form.linkPhoneNo=rsp.data.phoneNo;
								self.form.linkWorkUnit=rsp.data.workUnit;
								
							}
					);
				};
				
				var dataTmp=null;
				
				jnContactInfoServer.readList({
					custNo:$stateParams.custNo,
					operType:'0',}).then(
						function(rsp){
							console.info(rsp);
							dataTmp=refine(rsp.items,[
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
							
						}
					);
				
				self.submit=function(){
					var form=self.addForm;
					jnForm.validate(form).then(function(){
						var contact=self.form;
						contact.linkCustFlag="0";
						contact.linkCustType="2";
						console.info(contact);
						console.info(dataTmp);
						dataTmp[dataTmp.length+1]=contact;
						
						
						//读取企业客户信息
						entEditSer.readEntDetail({custNo:$stateParams.custNo}).then(
								function(rsp){
									var params=refine([rsp.data],[ 'custNo',//客户号
												            'frCustName',//法定代表人名字
												            'frPaperNo',//身份证号
												            'frMobPhone',//联系方式
												            'addressType',////经营场所类型 1:自有 2:租赁 9:其它
												            'addressTypeOtherDesc',////经营场所类型(其它)
												            'frCustNo',//法人客户编号
														    'liceNo',//组织机构代码证/三证合一代码
														    'regNo',//营业执照代码
														    'loanCard',//贷款卡编号
														    'inTrade',//所属行业
														    'mainBusiness',//主营业务
														    'sjKZR',//实际控制人
														    'frAddress',//联系地址
														    'businessStartDt',//业务开始时间
														    'address',//实际经营地址
												             ]	
											 );
									params=params[0];
									console.info(params);
									params.lxrList=dataTmp;
									params.jzqk='1';
									entEditSer.updateEnbBaseInfo(params).then(function(rsp){
										console.info(rsp);
										if(rsp.success){
                                    jnPage.modified = false;
											jnHelper.alert('添加成功').then(function(){
                                                jnPage.back();
											}
											);
										}
									});
									
									
								}
						);
						
						
						
						
						
						
					});
					
					
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
