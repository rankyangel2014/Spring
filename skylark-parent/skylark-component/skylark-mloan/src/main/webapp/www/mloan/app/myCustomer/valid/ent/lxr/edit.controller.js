(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.LXREditCtrl', [
        '$state',
        '$stateParams',
        'jnConstant',
        'jnForm',
        'jnPage',
        'jnHelper',
        'jnCustomerLXR',
        function (
            $state,
            $stateParams,
            jnConstant,
            jnForm,
            jnPage,
            jnHelper,
            jnCustomerLXR
        ) {
            var self = this;

            jnCustomerLXR.readLXR({
                pCustNo: $stateParams.pCustNo,
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                self.form = rsp;
            });

            self.linkTypeOptions = jnConstant.get(5018);

            self.submit = function () {
                jnForm.validate(self.editForm).then(function () {
                    var args = jnHelper.merge(self.form, {
                        pCustNo: $stateParams.pCustNo,
                    });

                    jnCustomerLXR.updateLXR(args).then(function () {
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
