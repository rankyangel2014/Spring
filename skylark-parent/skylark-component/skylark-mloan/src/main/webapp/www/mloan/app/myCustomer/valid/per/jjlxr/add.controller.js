(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.JJLXRAddCtrl', [
        '$state',
        '$stateParams',
        'jnConstant',
        'jnForm',
        'jnPage',
        'jnHelper',
        'jnCustomerJJLXR',
        'myCustomerSer',
        function (
            $state,
            $stateParams,
            jnConstant,
            jnForm,
            jnPage,
            jnHelper,
            jnCustomerJJLXR,
            myCustomerSer
        ) {
            var self = this;

            self.form = {
                pCustNo: $stateParams.pCustNo,
            };

            self.linkTypeOptions = jnConstant.get(5017);

            self.onSelectCustomer = function (cust) {
                self.form.custNo = cust.custNo;
                self.form.paperNo = cust.paperNo;
                self.form.phoneNo = cust.phoneNo;
            };

            self.onChangePaperNo = function () {
                if (self.form.paperNo) {
                    myCustomerSer.readPerCustomer({
                        paperNo: self.form.paperNo,
                        paperType: 0,
                        custType: 0,
                    }).then(function (rsp) {
                        if (rsp) {
                            self.form.custNo = rsp.custNo;
                            self.form.custName = rsp.custName;
                            self.form.phoneNo = rsp.phoneNo;
                        }
                    });
                }
            };

            self.submit = function () {
                jnForm.validate(self.editForm).then(function () {
                    var args = jnHelper.merge(self.form);

                    jnCustomerJJLXR.createJJLXR(args).then(function () {
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
