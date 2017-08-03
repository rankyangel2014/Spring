/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('entCustDetail')
    .controller('entDetailEdit.paramCtrl',//企业详细信息修改
        ['jnHttp', 'jnUser','$stateParams','$scope','entEditSer','jnForm','jnHelper','$filter', 'jnPage',
         'entCustSer',
        function (jnHttp, jnUser,$stateParams,$scope,entEditSer,jnForm,jnHelper,$filter, jnPage,
        		entCustSer) {
           var self=this;
        	var params = {};
           params.custNo = $stateParams.custNo;//客户编号
           params.operType = '0';
           //查询企业详情
           entEditSer.readEntDetail(params).then(
           function(rsp){
        	   console.info(rsp);
        	   var cardMerge=rsp.data.liceNo.length==18?'Y':'N';
        	 
        	   var date=new Date();
        	   var t=rsp.data.businessStartDt;
        	   t=t.replace(/\D/g,'');
        	   console.info(t);
        	   if(/(\d{8})/.test(t)){
	  				 date=new Date(t.substr(0,4),parseInt(t.substr(4,2))-1,t.substr(6,2));
	  			}else{
	  				date=new Date();
	  			}
        	   
        	   self.form={
        			   'cardMerge':cardMerge, // 组织机构代码/三证合一代码
        			   'liceNo':rsp.data.liceNo, // 组织机构代码/三证合一代码
        			   'regNo':rsp.data.regNo, //营业执照
        			   'loanCard':rsp.data.loanCard, // 贷款卡
        			   'inTrade':rsp.data.inTrade, // 所属行业
        			   'inTradeName':rsp.data.inTradeName, // 所属行业
        			   'mainBusiness':rsp.data.mainBusiness, // 主营业务
        			   'corpCustNo':rsp.data.corpCustNo, // 法人代表
        			   'corpReprst':rsp.data.corpReprst, // 法人代表
        			   'corpPaperNo':rsp.data.corpPaperNo, // 法人身份证号
        			   'corpMobPhone':rsp.data.corpMobPhone, // 联系方式
        			   'corpAddress':rsp.data.corpAddress, // 联系地址
        			   'businessStartDt':date, // 业务开始时间
        			   'addressType':rsp.data.addressType, // 经营场所类型
        			   'addressTypeOtherDesc':rsp.data.addressTypeOtherDesc, // 经营场所类型(其他)
        			   'address':rsp.data.address, // 经营地址
        			   'custNo':$stateParams.custNo,
        	   };

               self.oldFrPaperNo = self.form.frPaperNo;
               if(cardMerge=='Y'){
            	   self.editFlag="1";
               }
               if(cardMerge=='N'){
            	   entCustSer.qryBaseEnt({custNo:$stateParams.custNo,operType:'0'}).then(
            			   function(rsp){
            				   console.info(rsp);
            				   self.form.regNo=rsp.data.regNo;
            			   });
            	   
               }
           }
           );
           
           
           //修改提交
           self.submit=function(){
        	 
        	 var form=self.editForm;
        	 jnForm.validate(form).then(
        	 function(){
        		 
        		var tmp=$filter('date')(form.businessStartDt.$modelValue,'yyyyMMdd');
             	var reg=/\d/g;
             	if(!reg.test(tmp)){
             		tmp='';
             	}
        		 var params={
        				 'custNo':form.custNo.$modelValue, // 组织机构代码/三证合一代码
        				 'liceNo':form.liceNo.$modelValue, // 组织机构代码/三证合一代码
        				 'regNo':form.regNo?form.regNo.$modelValue:'', //营业执照
        				 'loanCard':form.loanCard.$modelValue, // 贷款卡
        				 'mainBusiness':form.mainBusiness.$modelValue, // 主营业务
        				 'corpCustNo':form.corpCustNo.$modelValue, // 法人代表
        				 'corpReprst':form.corpReprst.$modelValue, // 法人代表
        				 'corpPaperNo':form.corpPaperNo.$modelValue, // 法人身份证号
        				 'corpMobPhone':form.corpMobPhone.$modelValue, // 联系方式
        				 'corpAddress':form.corpAddress.$modelValue, // 联系地址
        				 'businessStartDt':tmp, // 业务开始时间
        				 'addressType':form.addressType.$modelValue, // 经营场所类型
        				 'addressTypeOtherDesc':form.addressTypeOtherDesc.$modelValue, // 经营场所类型(其他)
        				 'address':form.address.$modelValue, // 经营地址
        		 };
        		 entEditSer.updateEntBaseInfo(params).then(function(rsp){
        			 console.info(rsp);
                     return jnHelper.alert('修改成功');
        		 }).then(function () {
                     jnPage.back();
                 });
        		 
        	 }
        	 );
        	 
           };
           
           
           
        }]
    )
    .controller('partnerEdit.paramCtrl',//企业股东修改
		['jnHttp', 'jnUser','$stateParams','$scope','entEditSer','jnForm','jnHelper','$filter','$state', 'jnPage',
		 function (jnHttp, jnUser,$stateParams,$scope,entEditSer,jnForm,jnHelper,$filter,$state, jnPage) {
			var self=this;
			console.info($stateParams);
			var t=parseFloat($stateParams.sharePct);
			console.info(t);
			self.form={
					'pCustNo':$stateParams.pCustNo,
					'custNo':$stateParams.custNo,
					'custType':$stateParams.custType,
					'custName':$stateParams.custName,
					'paperType':$stateParams.paperType,
					'paperNo':$stateParams.paperNo,
					'sharePct':t,
					'phoneNo':$stateParams.phoneNo,
					'custAddr':$stateParams.custAddr,
			};
			console.info(self.form);
			//修改提交
			self.submit=function(){
				console.info(form);
				var form=self.editForm;
				jnForm.validate(form).then(
						function(){
							var params={
									'custNo':$stateParams.custNo,//客户号
									'linkType':'29',
									'operType':'1',
						            'pCustNo':$stateParams.pCustNo,//关联客户号
						            'custNameTmp':$stateParams.custName,//名称
						            'paperTypeTmp':$stateParams.paperType,//证件类型
						            'paperNoTmp':$stateParams.paperNo,//证件号码
						            'sharePct':self.form.sharePct,//股份占比
						            'phoneNo':self.form.phoneNo,// 联系电话
						            'custAddr':self.form.custAddr,//联系地址
						            'workUnit':self.form.workUnit,//联系地址
							};
							console.info(params);
							entEditSer.updateEnbSharePInfo(params).then(function(rsp){
								if(rsp.success){
                                    jnPage.modified = false;
									jnHelper.alert('修改成功').then(function(){
										$state.go('entPartnerInfo',{
											linkType:'29',
											isDetail:'0',
											custNo:$stateParams.pCustNo,
											orgNo:rsp.data.orgNo,
										});
                                 
									});
								}
							});
							
						}
				);
			};
		}]
    )
    .controller('relationEntEdit.paramCtrl',//关联人修改
		['$stateParams', 'custActualService', 'jnHelper', '$state', 'jnForm', '$filter', 'jnValidate', 'jnPage','jnConstant','entEditSer',
		 function ($stateParams, custActualService, jnHelper, $state, jnForm, $filter, jnValidate, jnPage,jnConstant,entEditSer) {
			var self = this;
			self.linkTypeOptions = jnConstant.get(5019);
			custActualService.readActual({
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
            	console.info(rsp);
//                self.form = refine(rsp.data, [
//                    'custName',
//                    'cardMerge',
//                    'paperNo',
//                    'liceNo',
//                    'regNo',
//                    'loanCard',
//                    'inTrade',
//                    'inTradeName',
//                    'fixPhone',
//                    'orgType',
//                    'mainBusiness',
//                    'businessStartDt',
//                    'businessHours',
//                    'employeeNum',
//                    'custAddr',
//                    'addressType',
//                    'addressTypeOtherDesc'
//                ]);
            	self.form = rsp.data;
                console.info(self.form);
                if (rsp.data.paperNo.length == 18) {
                    self.form.cardMerge = 'Y';
                    self.form.paperType = '11';
                    self.form.liceNoDisabled = true;
                    self.form.custNameDisabled = true;
                    self.form.cardMergeDisabled = true;
                } else {
                    if(rsp.data.paperNo.length == 15 && rsp.data.liceNo){
                        self.form.orgNoDisabled = true;
                        self.form.regNoDisabled = true;
                        self.form.custNameDisabled = true;
                    }
                    self.form.cardMerge = 'N';
                    self.form.paperType = '10';
                }
                self.form.custNo =  $stateParams.custNo;
                self.form.linkType = $stateParams.linkType;
                self.form.businessStartDt = jnForm.jsDateFromRspDate(self.form.businessStartDt);
            });
			 self.changeCardType = function (cardType) {
                 if (cardType == 'Y') {

                     self.form.regNo = '';
                     self.form.orgNo = '';
                 } else {
                     self.form.liceNo = '';
                 }

             };
             //信用代码
             self.onChangeLiceNo = function (liceNo) {
                 if (!liceNo || liceNo.length != 18) {
                     return;
                 }
                 custActualService.readEntActualById({liceNo: liceNo}).then(function (rsp) {
                     if (rsp.success) {
                         self.form = {
                             cardMerge: 'Y',
                             cardMergeDisabled : true,
                             liceNoDisabled : true,
                             custNameDisabled : true,
                             liceNo: rsp.data.liceNo,
                             loanCard: rsp.data.loanCard,
                             custNo : rsp.data.custNo,
                             inTrade: rsp.data.inTrade,
                             custName: rsp.data.custName,
                             linkType: rsp.data.linkTypeName,
                             inTradeName: rsp.data.inTradeName,
                             phoneNo: rsp.data.fixPhone,
                             orgType: rsp.data.orgType,
                             mainBusiness: rsp.data.mainBusiness,
                             businessStartDt: new Date($filter('jnDate')(rsp.data.businessStartDt)),
                             businessHours: rsp.data.businessHours,
                             employeeNum: parseInt(rsp.data.employeeNum),
                             address: rsp.data.address,
                             addressType: rsp.data.addressType,
                             addressTypeOtherDesc: rsp.data.addressTypeotherDesc,
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
             //营业执照
             self.onChangeRegNo = function (regNo) {
                 if (!regNo || regNo.length != 15) {
                     return;
                 }

                 custActualService.readEntActualById({regNo: regNo}).then(function (rsp) {

                     if (rsp.success) {
                         self.form = {
                             custNameDisabled : true,
                             regNoDisabled : true,
                             orgNoDisabled: rsp.data.liceNo ? true : false,//禁用组织机构代码
                             custName: rsp.data.custName,
                             cardMerge: 'N',
                             regNo: rsp.data.regNo,
                             liceNo: rsp.data.liceNo,
                             custNo : rsp.data.custNo,
                             loanCard: rsp.data.loanCard,
                             inTrade: rsp.data.inTrade,
                             linkType: rsp.data.linkTypeName,
                             inTradeName: rsp.data.inTradeName,
                             phoneNo: rsp.data.fixPhone,
                             orgType: rsp.data.orgType,
                             mainBusiness: rsp.data.mainBusiness,
                             businessStartDt: new Date($filter('jnDate')(rsp.data.businessStartDt)),
                             businessHours: rsp.data.businessHours,
                             employeeNum: parseInt(rsp.data.employeeNum),
                             address: rsp.data.address,
                             addressType: rsp.data.addressType,
                             addressTypeOtherDesc: rsp.data.addressTypeotherDesc,
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
      

            //修改提交
            self.submit = function () {
            	console.info(self.form.liceNo);
                if (self.form.cardMerge == 'Y') {

                    self.form.paperNoTmp = self.form.liceNo;
                } else {

                    self.form.paperNoTmp = self.form.regNo;
                }
                self.form.paperNo ='';

                self.form.liceNo =self.form.liceNo;
                
                self.form.domain = '0';
                self.form.operType = '3';
                self.form.custTypeTmp = '1';
                self.form.custNameTmp = self.form.custName;
                self.form.phoneNo = self.form.fixPhone;

                self.form.pCustNo = $stateParams.pCustNo;
                self.form.businessStartDt=jnForm.rspDateFromJsDate(self.form.businessStartDt);
                console.info(self.form);
                jnForm.validate(self.editForm)
                    .then(function () {
                    	entEditSer.updateEnbRelationInfo(self.form).then(function (rsp) {
                            if (rsp.success) {
                                jnPage.modified = false;
                                jnHelper.alert('修改成功').then(function (rsp) {
                                        jnPage.back();
                                    }
                                );
                            }
                        });

                    });

            };
        }]
    )
    .controller('relationPerEdit.paramCtrl',//关联人修改
		['$filter', '$stateParams', 'custActualService', 'jnHelper', '$state', 'jnForm', 'myCustomerSer', 'jnValidate', 'jnPage','jnConstant','entEditSer',
		 function ($filter, $stateParams, custActualService, jnHelper, $state, jnForm, myCustomerSer, jnValidate, jnPage,jnConstant,entEditSer) {
			var self = this;
			self.linkTypeOptions = jnConstant.get(5018);
            custActualService.readActual({
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
//                self.form = refine(rsp.data, [
//                    'birthday',
//                    'custName',
//                    'paperNo',
//                    'sex',
//                    'age',
//                    'marryStatus',
//                    'eduLevel',
//                    'mobPhone',
//                    'fixPhone',
//                    'housingStatus',
//                    'housingDesc',
//                    'custAddr',
//                ]);
                self.form = rsp.data;
                self.form.linkType = $stateParams.linkType;
                self.form.custNo = $stateParams.custNo;
                self.form.paperNoRead=rsp.data.paperNo;
                if (self.form.paperNo) {
                    self.form.birthday = new Date($filter('jnDate')(getBirthdayByPaperNo(self.form.paperNo)));
                    self.form.age = getAgeByPaperNo(self.form.paperNo);
                    self.form.sex = getSexByPaperNo(self.form.paperNo);
                }
            });

            //选择客户
            self.onSelectCustomer = function (cust) {
                self.form.custNo = cust.custNo;
            }

            //校验身份证号码
            self.onChangeId = function () {
                if (!self.form.paperNo || self.form.paperNo.length !== 18) return;
                custActualService.readActualById({
                    paperNo: self.form.paperNo
                }).then(function (rsp) {

                    if (rsp.success) {
                        self.form = rsp.data;
                        self.form.custAddr = rsp.data.address;
                    }
                    self.form.birthday = new Date($filter('jnDate')(getBirthdayByPaperNo(self.form.paperNo)));
                    self.form.age = getAgeByPaperNo(self.form.paperNo);
                    self.form.sex = getSexByPaperNo(self.form.paperNo);

                });
                self.form.birthday = new Date($filter('jnDate')(getBirthdayByPaperNo(self.form.paperNo)));
                self.form.age = getAgeByPaperNo(self.form.paperNo);
                self.form.sex = getSexByPaperNo(self.form.paperNo);
            };

            //修改提交
            self.submit = function () {
                self.form.operType = '3';
                self.form.paperType = '0';
                self.form.custTypeTmp = '0';
                self.form.custNameTmp = self.form.custName;
                self.form.custNo = $stateParams.custNo;
                self.form.pCustNo = $stateParams.pCustNo;
                jnForm.validate(self.editForm)
                    .then(function () {
                    	entEditSer.updateEnbRelationInfo(self.form).then(function (rsp) {
                            if (rsp.success) {
                                jnPage.modified = false;
                                jnHelper.alert('修改成功').then(function () {
                                        jnPage.back();
                                    }
                                );
                            }
                        });

                    });


            };
        }]
    )
    .controller('controlEdit.paramCtrl',//控制人信息修改
		['jnHttp', 'jnUser','$stateParams','$scope','entEditSer','jnForm','jnHelper','$filter','$state', 'jnPage', 'custOtherSer','entCustSer',
		 function (jnHttp, jnUser,$stateParams,$scope,entEditSer,jnForm,jnHelper,$filter,$state, jnPage, custOtherSer,entCustSer) {
			var self=this;
			entEditSer.readControlInfo($stateParams).then(
					function(rsp){
						console.info(rsp);
						var cardMerge='';
							if(rsp.data.linkCustType=='1'&&rsp.data.kcLinkPaperNo){
								
								 cardMerge=rsp.data.kcLinkPaperNo.length==18?'Y':'N';
							}
			        	   
						
						self.form={
								'cardMerge':cardMerge,//客户号
								'custNo':$stateParams.custNo,//客户号
	                            'linkCustType':rsp.data.linkCustType,//0 个人 1 企业
	                            'kpLinkCustNo':rsp.data.kpLinkCustNo,//关联人客户编号
	                            'kpLinkCustName':rsp.data.kpLinkCustName,//客户姓名
	                            'kpLinkPaperNo':rsp.data.kpLinkPaperNo,//关联人证件号码
	                            'kpSex':rsp.data.kpSex,//性别
	                            'kpBirthday':rsp.data.kpBirthday,//出生日期
	                            'kpMarryStatus':rsp.data.kpMarryStatus,//婚姻状况
	                            'kpMobPhone':rsp.data.kpMobPhone,//手机
	                            'kpHousingStatus':rsp.data.kpHousingStatus,//居住状况
	                            'kpEduLevel':rsp.data.kpEduLevel,//教育水平
	                            'kpFixPhone':rsp.data.kpFixPhone,//固定电话
	                            'kpDomPlace':rsp.data.kpDomPlace,//居住状况描述
	                            'kpHome':rsp.data.kpHome,//家庭地址
	                            'linkSpouseCustNo':rsp.data.linkSpouseCustNo,//配偶客户号
	                            'linkSpouseCustName':rsp.data.linkSpouseCustName,//配偶姓名
	                            'linkSpousePaperNo':rsp.data.linkSpousePaperNo,//配偶证件号
	                            'linkSpouseMobPhone':rsp.data.linkSpouseMobPhone,//配偶联系方式
	                            'linkSpouseWorkUnit':rsp.data.linkSpouseWorkUnit,//配偶单位地址
	                            'kcLinkCustNo':rsp.data.kcLinkCustNo,//关联人客户编号
	                            'kcLinkCustName':rsp.data.kcLinkCustName,//关联人客户名
	                            'kcLinkPaperNo':rsp.data.kcLinkPaperNo,//关联人证件号
	                            'kcCorpReprst':rsp.data.kcCorpReprst,//企业法人代表人
	                            'kcMainBusiness':rsp.data.kcMainBusiness,//主营业务
	                            'kcFixPhone':rsp.data.kcFixPhone,//固话
	                            'kcOrgType':rsp.data.kcOrgType,//企业法律实体类型
	                            'kcHome':rsp.data.kcHome,//联系地址
	                            'kcContactName':rsp.data.kcContactName,//联系人
	                            'kcContactPhone':rsp.data.kcContactPhone,//联系人联系方式
	                            'kcContactLinkType':rsp.data.kcContactLinkType,//联系人关联关系
	                            'kcContactAddr':rsp.data.kcContactAddr,//联系人联系地址
						};
				
					}		
			);
			
			//修改提交
			self.submit=function(){
				var form=self.editForm;
				jnForm.validate(form).then(
						function(){
							var params={
									'operType':'2',//机构号
									'linkCustFlag':'0',//机构号
									'orgNo':jnUser.insttuId,//机构号
									'custNo':$stateParams.custNo,//客户号
		                            'linkCustType':self.form.linkCustType,//0 个人 1 企业
		                            'kpLinkCustNo':self.form.kpLinkCustNo,//关联人客户编号
		                            'kpLinkCustName':self.form.kpLinkCustName,//客户姓名
		                            'kpLinkPaperNo':self.form.kpLinkPaperNo,//关联人证件号码
		                            'kpSex':jnForm.sexFromId(self.form.kpLinkPaperNo),//性别
		                            'kpBirthday':jnForm.birthFromId(self.form.kpLinkPaperNo),//出生日期
		                            'kpMarryStatus':self.form.kpMarryStatus,//婚姻状况
		                            'kpMobPhone':self.form.kpMobPhone,//手机
		                            'kpHousingStatus':self.form.kpHousingStatus,//居住状况
		                            'kpEduLevel':self.form.kpEduLevel,//教育水平
		                            'kpDomPlace':self.form.kpDomPlace,//居住状况描述
		                            'kpHome':self.form.kpHome,//家庭地址
		                            'linkSpouseCustNo':self.form.linkSpouseCustNo,//配偶客户号
		                            'linkSpouseCustName':self.form.linkSpouseCustName,//配偶姓名
		                            'linkSpousePaperNo':self.form.linkSpousePaperNo,//配偶证件号
		                            'linkSpouseMobPhone':self.form.linkSpouseMobPhone?self.form.linkSpouseMobPhone:"0",//配偶联系方式
		                            'linkSpouseWorkUnit':self.form.linkSpouseWorkUnit,//配偶单位地址
		                            'kcLinkCustNo':self.form.kcLinkCustNo,//关联人客户编号
		                            'kcLinkCustName':self.form.kcLinkCustName,//关联人客户名
		                            'kcLinkPaperNo':self.form.kcLinkPaperNo,//关联人证件号
		                            'kcCorpReprst':self.form.kcCorpReprst,//企业法人代表人
		                            'kcMainBusiness':self.form.kcMainBusiness,//主营业务
		                            'kcFixPhone':self.form.kcFixPhone,//固话
		                            'kcOrgType':self.form.kcOrgType,//企业法律实体类型
		                            'kcHome':self.form.kcHome,//联系地址
		                            'kcContactName':self.form.kcContactName,//联系人
		                            'kcContactPhone':self.form.kcContactPhone,//联系人联系方式
		                            'kcContactLinkType':self.form.kcContactLinkType,//联系人关联关系
		                            'kcContactAddr':self.form.kcContactAddr,//联系人联系地址
							};
							jnHelper.fillUndef(params);
							entEditSer.updateEnbCPInfo(params).then(function(rsp){
								console.info(rsp);
								if(rsp.success){
                                    jnPage.modified = false;
									jnHelper.alert('修改成功').then(function(){
                                        jnPage.back();
										}
									);
								}
							});
							
						}
				);
			};

            self.onChangeId = function () {
                entCustSer.getCustByContion({paperNo:self.form.kpLinkPaperNo,paperType:'0'}).then(function (rsp) {
					var d = rsp.data;
					self.form.kpLinkCustNo= d.custNo;
					self.form.kpLinkCustName =d.custName;
					self.form.kpMobPhone = d.phoneNo;
				},function(){
					self.form.kpLinkCustNo='';
					self.form.kpLinkCustName='';
					self.form.kpMobPhone='';
				});

              /*  custOtherSer.readCustByCondition('paper', {
                    paperNo: self.form.kpLinkPaperNo,
                }).then(function (rsp) {
                    var d = rsp.data;
					self.form.kpLinkCustNo= d.custNo;
                    self.form.kpLinkCustName =d.custName;
                    self.form.kpMobPhone = d.phoneNo;
                },function(){
					self.form.kpLinkCustNo='';
					self.form.kpLinkCustName='';
					self.form.kpMobPhone='';
				});*/
            };

            self.onChangeSpouseId = function () {
				entCustSer.getCustByContion({
                    paperNo: self.form.linkSpousePaperNo,
					paperType:'0'
                }).then(function (rsp) {
                    var d = rsp.data;
					self.form.linkSpouseCustNo= d.custNo;
                    self.form.linkSpouseCustName = d.custName;
                    self.form.linkSpouseMobPhone = d.phoneNo;
                },function(){
					self.form.linkSpouseCustNo='';
					self.form.linkSpouseCustName ='' ;
					self.form.linkSpouseMobPhone ='' ;
				});
            };
			//tongyixinyongdaim
            self.onChangeLiceNo = function () {
				entCustSer.getCustByContion({
                    paperNo: self.form.kcLinkPaperNo,
					paperType:'11'
                }).then(function (rsp) {
                    console.log(rsp);
                    var d = rsp.data;
                    self.kcLinkCustNo= d.custNo;
					self.form.kcLinkCustName = d.custName;
                },function(){
					self.kcLinkCustNo= '';
					self.form.kcLinkCustName = '';
				});
            };

            self.onChangeRegNo = function () {
				entCustSer.getCustByContion({
                    paperNo: self.form.kcLinkPaperNo,
                    paperType: '10',
                }).then(function (rsp) {
                    console.log(rsp);
                    var d = rsp.data;
                    self.form.kcLinkCustNo = d.custNo;
					self.form.kcLinkCustName = d.custName;
                },function(){
					self.form.kcLinkCustNo = '';
					self.form.kcLinkCustName = '';
				});
            };
		}]
    )
   .controller('contactEdit.paramCtrl',//联系人修改
		['jnHttp', 'jnUser','$stateParams','$scope','entEditSer','jnForm','jnHelper','$filter','$state','jnContactInfoServer', 'jnPage',
		 function (jnHttp, jnUser,$stateParams,$scope,entEditSer,jnForm,jnHelper,$filter,$state,jnContactInfoServer, jnPage) {
			var self=this;
			$scope.isDetail=$stateParams.isDetail;
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
						var data=rsp.items[$stateParams.index];
						self.form={
							'linkCustNo':data.linkCustNo, // 编号
							'linkCustName':data.linkCustName, // 姓名
							'linkCustAddr':data.linkCustAddr, // 地址
							'linkType':data.linkType, // 人企关系
							'linkPhoneNo':data.linkPhoneNo, // 电话
							'linkPaperNo':data.linkPaperNo, // 身份证
							'linkWorkUnit':data.linkWorkUnit, // 工作单位
						};
						
					}
				);
			//修改提交
			self.submit=function(){
				
				var form=self.editForm;
				jnForm.validate(form).then(
						function(){
							var contact={
									'linkCustNo':form.linkCustNo.$modelValue, // 编号
									'linkCustName':form.linkCustName.$modelValue, // 姓名
									'linkCustAddr':form.linkCustAddr.$modelValue, // 地址
									'linkType':form.linkType.$modelValue, // 人企关系
									'linkPhoneNo':form.linkPhoneNo.$modelValue, // 电话
									'linkPaperNo':form.linkPaperNo.$modelValue, // 身份证
									'linkWorkUnit':form.linkWorkUnit.$modelValue, // 工作单位
									'linkCustType':dataTmp[$stateParams.index]['linkCustType'], // 工作单位
									'linkCustFlag':dataTmp[$stateParams.index]['linkCustFlag'], // 工作单位
									'linkPaperType':dataTmp[$stateParams.index]['linkPaperType'], // 工作单位
							};
							
							dataTmp[$stateParams.index]=contact;
							console.info(dataTmp);
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
												jnHelper.alert('修改成功').then(function(){
													
                                                    jnPage.back();
												}
												);
											}
										});
										
										
									}
							);
							
						}
				);
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
