(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.JJLXRListCtrl', [
        '$state',
        '$stateParams',
        '$ionicListDelegate',
        'jnHelper',
        'jnCustomerJJLXR',
        function (
            $state,
            $stateParams,
            $ionicListDelegate,
            jnHelper,
            jnCustomerJJLXR
        ) {
            var self = this;

            jnCustomerJJLXR.readJJLXRList({
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                self.list = rsp;
            });

            self.editable = $stateParams.editable;

            self.add = function () {
                $state.go('customer-jjlxr-add', {
                    pCustNo: $stateParams.custNo,
                });
            };

            self.view = function (jjlxr) {
                $state.go('customer-jjlxr-view', {
                    pCustNo: $stateParams.custNo,
                    custNo: jjlxr.custNo,
                    editable: self.editable,
                });
            };

            self.remove = function (jjlxr, $event) {
                $event.stopPropagation();

                var text = '确实要删除紧急联系人' + jjlxr.custName + '吗？';

                jnHelper.confirm(text).then(function (confirmed) {
                    if (confirmed) {
                        jnCustomerJJLXR.deleteJJLXR({
                            pCustNo: $stateParams.custNo,
                            custNo: jjlxr.custNo
                        }).then(function () {
                            jnHelper.removeArrayItem(self.list,
                                function (e) {
                                    return e.custNo === jjlxr.custNo;
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

