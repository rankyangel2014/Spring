(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.LXRViewCtrl', [
        '$state',
        '$stateParams',
        'jnHelper',
        'jnCustomerLXR',
        function (
            $state,
            $stateParams,
            jnHelper,
            jnCustomerLXR
        ) {
            var self = this;

            self.editable = $stateParams.editable;

            jnCustomerLXR.readLXR({
                pCustNo: $stateParams.pCustNo,
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                self.vm = rsp;
            });

            self.edit = function () {
                $state.go('customer-lxr-edit', {
                    pCustNo: $stateParams.pCustNo,
                    custNo: $stateParams.custNo,
                });
            };
        }]
    );

})();
