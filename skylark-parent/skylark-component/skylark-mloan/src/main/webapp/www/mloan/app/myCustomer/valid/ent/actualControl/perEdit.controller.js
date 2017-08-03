(function () {
    'use strict';

    angular
        .module('custOtherList')
        .controller(//实际控制人修改（个人）
            'perCustActualEditCtrl',
            ['$stateParams', 'custActualService', 'jnHelper', 'jnForm', 'jnPage',
                function ($stateParams, custActualService, jnHelper, jnForm, jnPage) {
                    var self = this;
                    custActualService.readActual({
                        custNo: $stateParams.custNo,
                    }).then(function (rsp) {
                        self.form = refine(rsp.data, [
                            'birthday',
                            'custName',
                            'paperNo',
                            'sex',
                            'age',
                            'marryStatus',
                            'eduLevel',
                            'mobPhone',
                            'fixPhone',
                            'housingStatus',
                            'housingDesc',
                            'custAddr',
                        ]);
                        self.form.custNo = $stateParams.custNo;
                        if (self.form.paperNo) {
                            self.form.birthday = getBirthdayByPaperNo(self.form.paperNo);
                            self.form.age = getAgeByPaperNo(self.form.paperNo);
                            self.form.sex = getSexByPaperNo(self.form.paperNo);
                        }
                    });

                    //选择客户
                    self.onSelectCustomer = function (cust) {
                        self.form.custNo = cust.custNo;
                    }

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
                            self.form.pCustNo = $stateParams.custNo;
                        }, function () {
                            self.form.paperNo = paperNo;
                            self.form.birthday = getBirthdayByPaperNo(self.form.paperNo);
                            self.form.age = getAgeByPaperNo(self.form.paperNo);
                            self.form.sex = getSexByPaperNo(self.form.paperNo);
                            self.form.pCustNo = $stateParams.custNo;
                        });

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
                                custActualService.addActual(self.form).then(function (rsp) {
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

