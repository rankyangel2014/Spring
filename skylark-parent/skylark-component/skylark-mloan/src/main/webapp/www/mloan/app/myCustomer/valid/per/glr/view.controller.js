(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.GLRViewCtrl', [
        '$state',
        '$stateParams',
        'jnHelper',
        'jnCustomerGLR',
        function (
            $state,
            $stateParams,
            jnHelper,
            jnCustomerGLR
        ) {
            var self = this;

            self.editable = $stateParams.editable;

            jnCustomerGLR.readGLR({
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                self.vm = rsp;
                self.vm.linkType = $stateParams.linkType;
                self.vm.linkTypeName = $stateParams.linkTypeName;
            });

            self.edit = function () {
                var state = {
                    0: 'customer-glr-per-edit',
                    1: 'customer-glr-ent-edit',
                }[self.vm.custType];

                $state.go(state, {
                    pCustNo: $stateParams.pCustNo,
                    custNo: $stateParams.custNo,
                    linkType: $stateParams.linkType,
                });
            };
        }]
    );

})();

