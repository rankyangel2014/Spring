(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.JJLXREditCtrl', [
        '$state',
        '$stateParams',
        'jnConstant',
        'jnForm',
        'jnPage',
        'jnHelper',
        'jnCustomerJJLXR',
        function (
            $state,
            $stateParams,
            jnConstant,
            jnForm,
            jnPage,
            jnHelper,
            jnCustomerJJLXR
        ) {
            var self = this;

            jnCustomerJJLXR.readJJLXR({
                pCustNo: $stateParams.pCustNo,
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                self.form = rsp;
                self.disallowChangePaperNo = '' !== rsp.paperNo;
            });

            self.linkTypeOptions = jnConstant.get(5017);

            self.submit = function () {
                jnForm.validate(self.editForm).then(function () {
                    var args = jnHelper.merge(self.form, {
                        pCustNo: $stateParams.pCustNo,
                    });

                    jnCustomerJJLXR.updateJJLXR(args).then(function () {
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
