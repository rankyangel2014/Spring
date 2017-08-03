(function () {
    'use strict';

    angular
        .module('custOtherList')
        .controller(//实际控制人新增（企业）
            'entCustActualAddCtrl',
            ['$filter', '$stateParams', 'custActualService', 'jnHelper', 'jnForm', 'jnPage',
                function ($filter, $stateParams, custActualService, jnHelper, jnForm, jnPage) {
                    var self = this;
                    //初始化默认值
                    self.form = {};
                    self.form.addressType = '1';
                    self.form.cardMerge = 'N';

                    //新增保存
                    self.submit = function () {

                        if (self.form.cardMerge == 'Y') {
                            self.form.paperType = '11';
                            self.form.paperNoTmp = self.form.liceNo;
                        } else {
                            self.form.paperType = '10';
                            self.form.paperNoTmp = self.form.regNo;
                        }

                        self.form.paperNo ='';
                        self.form.regNo ='';
                        self.form.custType = '1';
                        self.form.operType = '3';
                        self.form.liceNo =self.form.liceNo;
                        self.form.pCustNo = $stateParams.custNo;

                        jnForm.validate(self.editForm)
                            .then(function () {

                                custActualService.addActual(self.form).then(function (rsp) {
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


                    //统一信用代码
                    self.onChangeLiceNo = function (liceNo) {
                        if (!liceNo || liceNo.length != 18) {
                            return;
                        }
                        custActualService.readEntActualById({liceNo: liceNo}).then(function (rsp) {
                            if (rsp.success) {
                                self.form = {
                                    liceNoDisabled: true,//禁用统一信用代码
                                    custNameDisabled: true,//禁用企业名称
                                    cardMergeDisabled: true,//禁用是否三证合一
                                    cCustName: rsp.data.custName,
                                    cardMerge: 'Y',
                                    custNo:rsp.data.custNo,
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
                                    addressTypeOtherDesc: rsp.data.addressTypeotherDesc,
                                };

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
                                    custNameDisabled: true,//禁用企业名称
                                    regNoDisabled: true,//禁用营业执照
                                    orgNoDisabled: rsp.data.liceNo ? true : false,//禁用组织机构代码
                                    cCustName: rsp.data.custName,
                                    cardMerge: 'N',
                                    custNo:rsp.data.custNo,
                                    regNo: rsp.data.regNo,
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
                                    addressTypeOtherDesc: rsp.data.addressTypeotherDesc,
                                };
                            }
                        });

                    };

                }]
        );

})();

