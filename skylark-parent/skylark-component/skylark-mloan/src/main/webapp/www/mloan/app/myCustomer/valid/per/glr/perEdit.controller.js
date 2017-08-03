(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.GLRPerEditCtrl', [
        '$state',
        '$stateParams',
        'jnConstant',
        'jnForm',
        'jnPage',
        'jnHelper',
        'jnCustomerGLR',
        'custActualService',
        '$filter',
        'jnValidate',
        function (
            $state,
            $stateParams,
            jnConstant,
            jnForm,
            jnPage,
            jnHelper,
            jnCustomerGLR,
            custActualService,
            $filter,
            jnValidate
        ) {
            var self = this;

            jnCustomerGLR.readGLR({
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                self.form = rsp;
                self.form.linkType = $stateParams.linkType;
                self.form.pCustNo = $stateParams.pCustNo;
                self.form.custNo = $stateParams.custNo;
                self.form.birthday = jnForm.jsDateFromRspDate(
                    jnHelper.birthFromId(self.form.paperNo)
                );
            });

            self.linkTypeOptions = jnConstant.get(5017);

            var autoFill = function (cust) {
                self.form.custNo = cust.custNo;
                self.form.custName = cust.custName;
                self.form.paperNo = cust.paperNo;
                self.form.mobPhone = cust.phoneNo;
                self.form.sex = jnHelper.sexFromId(cust.paperNo);
                self.form.birthday = jnForm.jsDateFromRspDate(
                    jnHelper.birthFromId(cust.paperNo)
                );
            };

            self.onChangePaperNo = function () {
                if (self.form.paperNo) {
                	custActualService.readActualById({
                        paperNo: self.form.paperNo
                    }).then(function (rsp) {
                        if (rsp) {
                            autoFill(rsp.data);
                        }
                    });
                    console.info(self.form.paperNo);
                    self.form.birthday = new Date($filter('jnDate')(getBirthdayByPaperNo(self.form.paperNo)));
                    self.form.age = getAgeByPaperNo(self.form.paperNo);
                    self.form.sex = getSexByPaperNo(self.form.paperNo);
                }
            };

            self.submit = function () {
                jnForm.validate(self.editForm).then(function () {
                    var args = jnHelper.merge(self.form, {
                        birthday: jnForm.rspDateFromJsDate(self.form.birthday),
                        paperNoTmp: self.form.paperNo,
                        custNameTmp: self.form.custName,
                        addressType: 1,
                        custType: 0,
                        custTypeTmp: 0,
                        paperType: 0,
                    });

                    jnCustomerGLR.updateGLR(args).then(function () {
                        jnPage.modified = false;
                        jnHelper.alert('修改成功').then(function(rsp){
                            jnPage.back();
                        });
                    });
                });
            };
        }]
    );

})();

