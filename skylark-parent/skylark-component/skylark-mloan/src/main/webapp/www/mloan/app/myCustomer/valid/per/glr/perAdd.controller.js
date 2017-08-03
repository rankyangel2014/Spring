(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.GLRPerAddCtrl', [
        '$state',
        '$stateParams',
        'jnConstant',
        'jnForm',
        'jnPage',
        'jnHelper',
        'jnCustomerGLR',
        'custActualService',
        '$filter',
        function (
            $state,
            $stateParams,
            jnConstant,
            jnForm,
            jnPage,
            jnHelper,
            jnCustomerGLR,
            custActualService,
            $filter
        ) {
            var self = this;

            self.form = {
                pCustNo: $stateParams.pCustNo,
            };

            self.linkTypeOptions = jnConstant.get(5017);
            self.onChangePaperNo = function () {
                if (self.form.paperNo) {
                	console.info(self.form.paperNo);
                	custActualService.readActualById({
                        paperNo: self.form.paperNo
                    }).then(function (rsp) {
                    	console.info(rsp);
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
                }
            };
            self.submit = function () {
                jnForm.validate(self.editForm).then(function () {
                    var args = jnHelper.merge(self.form, {
                        birthday: jnForm.rspDateFromJsDate(self.form.birthday),
                        paperNoTmp: self.form.paperNo,
                        custNameTmp: self.form.custName,
                        custAddr: self.form.address,
                        custType: 0,
                        custTypeTmp: 0,
                        paperType: 0,
                    });

                    jnCustomerGLR.createGLR(args).then(function () {
                        jnPage.modified = false;
                        jnHelper.alert('新增成功').then(function(rsp){
                            jnPage.back();
                        });
                    });
                });
            };
        }]
    );

})();

