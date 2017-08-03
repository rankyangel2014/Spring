(function () {
    'use strict';

    angular
        .module('custOtherList')
        .controller(//实际控制人新增（个人）
            'perCustActualAddCtrl',
            ['$stateParams', 'custActualService', 'jnHelper', 'jnForm', 'jnPage',
                function ($stateParams, custActualService, jnHelper, jnForm, jnPage) {
                    var self = this;
                    self.form = {};
                    //修改提交
                    self.submit = function () {
                        self.form.pCustNo = $stateParams.custNo ;
                        self.form.bussFlag ='2' ;
                        self.form.custType ='0' ;
                        self.form.operType = '3' ;
                        self.form.paperType = '0' ;
                        jnForm.validate(self.editForm)
                            .then(function () {
                                custActualService.addActual(self.form).then(function (rsp) {
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
                    self.onChangeId = function (paperNo) {
                        if (!paperNo || paperNo.length != 18) return;
                        custActualService.readActualById({
                            paperNo: paperNo
                        }).then(function (rsp) {
                            self.form = rsp.data;
                            self.form.custAddr = rsp.data.address;
                            self.form.custNameDisabled = true;
                            self.form.birthday = getBirthdayByPaperNo(self.form.paperNo);
                            self.form.age = getAgeByPaperNo(self.form.paperNo);
                            self.form.sex = getSexByPaperNo(self.form.paperNo);
                        }, function () {
                            self.form.paperNo = paperNo;
                            self.form.birthday = getBirthdayByPaperNo(self.form.paperNo);
                            self.form.age = getAgeByPaperNo(self.form.paperNo);
                            self.form.sex = getSexByPaperNo(self.form.paperNo);
                        });

                    };

                    //选择客户名称
                    self.onSelectCustomer = function (cust) {
                        self.form.custNo = cust.custNo;
                    }

                }]
        );
})();


