(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.JJLXRViewCtrl', [
        '$state',
        '$stateParams',
        'jnHelper',
        'jnCustomerJJLXR',
        function (
            $state,
            $stateParams,
            jnHelper,
            jnCustomerJJLXR
        ) {
            var self = this;

            self.editable = $stateParams.editable;

            jnCustomerJJLXR.readJJLXR({
                pCustNo: $stateParams.pCustNo,
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                self.vm = rsp;
            });

            self.edit = function () {
                $state.go('customer-jjlxr-edit', {
                    pCustNo: $stateParams.pCustNo,
                    custNo: $stateParams.custNo,
                });
            };
        }]
    );

})();
