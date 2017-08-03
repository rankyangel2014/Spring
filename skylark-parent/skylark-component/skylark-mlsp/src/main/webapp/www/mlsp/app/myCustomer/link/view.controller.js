(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('myCustomer.link.ViewCtrl', [
        '$state',
        '$stateParams',
        'jnHelper',
        'jnCustomerLink',
        '$scope',
        function (
            $state,
            $stateParams,
            jnHelper,
            jnCustomerLink,
            $scope) {
            var self = this;

            self.editable = '1' === $stateParams.editable;

            jnCustomerLink.readList({
                custNo: $stateParams.custNo,
                limit: 1000,
            }).then(function (rsp) {
                self.data = jnHelper.arrFind(rsp.items, function (e) {
                    return String(e.recId) === $stateParams.recId;
                });
                $scope.enableEdit = self.data.custNo===$stateParams.custNo;
            });

            self.edit = function () {
                $state.go('myCustomerLinkEdit', {
                    custNo: $stateParams.custNo,
                    recId: $stateParams.recId,
                });
            }
        }]
    );

})();

