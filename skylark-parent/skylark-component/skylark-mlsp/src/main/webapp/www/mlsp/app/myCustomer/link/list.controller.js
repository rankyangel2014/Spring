(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('myCustomer.link.ListCtrl', [
        '$state',
        '$stateParams',
        '$ionicListDelegate',
        'jnHelper',
        'jnCustomerLink',
        function (
            $state,
            $stateParams,
            $ionicListDelegate,
            jnHelper,
            jnCustomerLink
        ) {
            var self = this;

            var pf = jnHelper.PaginateFetcher(jnCustomerLink.readList)
                .params($stateParams);

            self.list = pf.records();

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();

            self.editable = '1' === $stateParams.editable;

            self.custNo = $stateParams.custNo;

            self.viewLink = function (link) {
                $state.go('myCustomerLinkView', {
                    custNo: $stateParams.custNo,
                    recId: link.recId,
                    editable: $stateParams.editable,
                });
            };

            self.addLink = function () {
                $state.go('myCustomerLinkAdd', {
                    custNo: $stateParams.custNo,
                });
            };

            self.delLink = function ($event, link) {
                $event.stopPropagation();

                var text = '确实要删除客户关系';

                if ($stateParams.custNo === link.custNo) {
                    text += link.linkCustName;
                } else {
                    text += link.custName;
                }

                text += '吗？';

                jnHelper.confirm(text).then(function (confirmed) {
                    if (confirmed) {
                        jnCustomerLink['delete']({
                            custNo: $stateParams.custNo,
                            linkCustNos: link.recId,
                        }).then(function () {
                            jnHelper.removeArrayItem(self.list.items,
                                function (e) {
                                    return e.recId === link.recId;
                                }
                            );

                            self.list.total -= 1;
                        });
                    } else {
                        $ionicListDelegate.closeOptionButtons();
                    }
                });
            };
        }]
    );

})();

