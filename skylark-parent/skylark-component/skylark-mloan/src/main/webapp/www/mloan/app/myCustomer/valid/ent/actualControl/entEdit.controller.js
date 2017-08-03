(function () {
    'use strict';

    angular
        .module('custOtherList')
        .controller(//实际控制人修改（企业）
            'entCustActualEditCtrl',
            ['$stateParams', 'custActualService', 'jnHelper', 'jnForm', '$filter', 'jnPage',
                function ($stateParams, custActualService, jnHelper, jnForm, $filter, jnPage) {
                    var self = this;

                    custActualService.readActual({
                        custNo: $stateParams.custNo,
                    }).then(function (rsp) {
                        self.form = refine(rsp.data, [
                            'custName',
                            'cardMerge',
                            'paperNo',
                            'liceNo',
                            'regNo',
                            'loanCard',
                            'inTrade',
                            'inTradeName',
                            'fixPhone',
                            'orgType',
                            'mainBusiness',
                            'businessHours',
                            'businessStartDt',
                            'employeeNum',
                            'custAddr',
                            'addressType',
                            'addressTypeOtherDesc',
                        ]);
                        self.form.cCustName = self.form.custName;
                        self.form.regNo = rsp.data.paperNo;
                        self.form.phoneNo = rsp.data.fixPhone;
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
                    });

                    self.changeCardType = function (cardType) {
                        if (cardType == 'Y') {

                            self.form.regNo = '';
                            self.form.orgNo = '';
                        } else {
                            self.form.liceNo = '';
                        }

                    }


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
                                    inTrade: rsp.data.inTrade,
                                    cCustName: rsp.data.custName,
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
                                    cCustName: rsp.data.custName,
                                    cardMerge: 'N',
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
                        self.form.domain = '0';
                        self.form.operType = '3';
                        self.form.custTypeTmp = '1';
                        self.form.custNameTmp = self.form.custName;
                        self.form.paperNoTmp = self.form.regNo;
                        self.form.custNo = $stateParams.custNo;
                        self.form.pCustNo = $stateParams.pCustNo;
                        self.form.addressEnb = self.form.custAddr;
                        if (self.form.cardMerge == 'Y') {

                            self.form.paperNoTmp = self.form.liceNo;
                        } else {

                            self.form.paperNoTmp = self.form.regNo;
                        }
                        self.form.paperNo ='';
                        self.form.regNo ='';
                        self.form.liceNo =self.form.liceNo;
                        jnForm.validate(self.editForm)
                            .then(function () {
                                custActualService.addActual(self.form).then(function (rsp) {
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
        );
    /**
     * 创建过滤器，过滤器返回一个新的对象，只保留 filterList 包含的字段。
     */
    function refine(data, filterList) {
        var refined = {};
        if (data) {
            filterList.forEach(function (key) {
                refined[key] = data[key];
            });
        }
        return refined;
    }

})();




