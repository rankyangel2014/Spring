/**
 * 提供客户查询部分的后台交互服务
 */
(function () {
    'use strict';
    angular
        .module('myCustomer')
        .factory('jnPersonCustService',
            ['jnHttp', 'jnUser', 'jnHelper', '$filter',
                function (jnHttp, jnUser, jnHelper, $filter) {
                    return {

                        //新增个人基本信息
                        addPerCustBaseInfo: function (params) {
                            var addressInfoList = [{
                                "recId": "",
                                "phoneNo": params.phoneNo,
                                "custAddr": params.custAddr,
                                "defFlag": "0",
                            }]; // 个人客户联系方式信息
                            if(params.perTyp=="1"){
                            	params = {
                                        addressInfoListStr: angular.toJson(addressInfoList),
                                        paperType: params.paperType,
                                        birthday: $filter('date')(params.birthday, 'yyyyMMdd'),
                                        marryStatus: params.marryStatus,
                                        paperNo: params.paperNo,
                                        nation: params.nation,
                                        agricultureType: params.agricultureType,
                                        custName: params.custName,
                                        sex: params.sex,
                                        custNo: params.custNo,
                                        regNo: params.regNo,
                                    };
                            }else{
                            	params = {
                                        addressInfoListStr: angular.toJson(addressInfoList),
                                        paperType: params.paperType,
                                        birthday: $filter('date')(params.birthday, 'yyyyMMdd'),
                                        marryStatus: params.marryStatus,
                                        paperNo: params.paperNo,
                                        nation: params.nation,
                                        agricultureType: params.agricultureType,
                                        custName: params.custName,
                                        sex: params.sex,
                                        custNo: params.custNo,
                                    };
                            }
                            
                            jnHelper.fillUndef(params);
                            return jnHttp.post(
                                '/mlsp/router/rest.do?_transCode=ENT_CUST_PER', params)
                                .then(function (rsp) {
                                    return rsp;
                                })
                        },
                        //新增紧急联系人
                        updatePerCustRelationInfo: function (params) {
                            params = {
                                paperType: params.paperType,
                                paperNo: params.paperNo,
                                custName: params.custName,
                                phoneNo: params.phoneNo,
                                custNo: params.custNo,
                                operate: params.operate,//0新增 1修改
                                linkFlag: '0',//更新标识
                                custType: '0',//个人客户
                                linkType: '25',//紧急联系人
                                linkCustNo: params.linkCustNo,
                                recId: params.recId,
                            };
                            jnHelper.fillUndef(params);
                            return jnHttp.post(
                                '/mlsp/router/rest.do?_transCode=CUST_LNK_UPDATE', params)
                                .then(function (rsp) {
                                    return rsp;
                                })
                        },
                        //删除紧急联系人信息
                        delPerCustRelationInfo: function (params) {
                            jnHelper.fillUndef(params);
                            return jnHttp.post(
                                '/mlsp/router/rest.do?_transCode=CUST_LNK_DEL', {deleteListString: angular.toJson(params)})
                                .then(function (rsp) {
                                    return rsp;
                                })
                        },
                        //获取姓名
                        getName : function(self) {
                        	if(self.myForm.regNo.$modelValue==""||self.myForm.regNo.$modelValue==null){
                        		return;
                        	}
                        	return jnHttp
                            .post(
                                    '/mlsp/router/rest.do?_transCode=CUST_REGNO',
                                    {
                                    	regNo:self.myForm.regNo.$modelValue,
                                    	userId : jnUser.userId,
                                    	_insttuId:jnUser.insttuId
                                    })
                                    .then(
                                            function(rsp) {
                                            	return rsp;
                                            }
                                            );
                        },
                        //根据身份证号码查询客户--获取姓名
                        getNameByPaperNo : function(paperNo) {
                            return jnHttp
                                .post(
                                    '/mlsp/router/rest.do?_transCode=QRY101',{'paperNo':paperNo})
                                .then(
                                    function(rsp) {
                                        return rsp ;
                                        //if(rsp.root.length!=1){
                                        //    self.nameDisable=false;
                                        //}else{
                                        //    self.nameDisable=true;
                                        //    self.myForm.custName.$viewValue = rsp.root[0].custName;
                                        //    self.myForm.custName.$commitViewValue();
                                        //    self.myForm.custName.$render();
                                        //}
                                    });
                        },
                    }


                }]
        );

})();