(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.LXRListCtrl', [
        '$state',
        '$stateParams',
        '$ionicListDelegate',
        'jnHelper',
        'jnCustomerLXR',
        function (
            $state,
            $stateParams,
            $ionicListDelegate,
            jnHelper,
            jnCustomerLXR
        ) {
            var self = this;

            jnCustomerLXR.readLXRList({
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                self.list = rsp;
            });

            self.editable = $stateParams.editable;

            self.add = function () {
                $state.go('customer-lxr-add', {
                    pCustNo: $stateParams.custNo,
                });
            };

            self.view = function (lxr) {
                $state.go('customer-lxr-view', {
                    pCustNo: $stateParams.custNo,
                    custNo: lxr.custNo,
                    editable: self.editable,
                });
            };

            self.remove = function (lxr, $event) {
                $event.stopPropagation();

                var text = '确实要删除联系人' + lxr.custName + '吗？';

                jnHelper.confirm(text).then(function (confirmed) {
                    if (confirmed) {
                        jnCustomerLXR.deleteLXR({
                            pCustNo: $stateParams.custNo,
                            custNo: lxr.custNo
                        }).then(function () {
                            jnHelper.removeArrayItem(self.list,
                                function (e) {
                                    return e.custNo === lxr.custNo;
                                }
                            );
                        });

                    } else {
                        $ionicListDelegate.closeOptionButtons();
                    }
                });
            };
        }]
    );

})();

