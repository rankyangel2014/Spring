(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.GLRListCtrl', [
        '$state',
        '$stateParams',
        '$ionicListDelegate',
        'jnHelper',
        'jnTitleMenu',
        'jnCustomerGLR',
        function (
            $state,
            $stateParams,
            $ionicListDelegate,
            jnHelper,
            jnTitleMenu,
            jnCustomerGLR
        ) {
            var self = this;
            var titleMenu;

            var pf = jnHelper.PaginateFetcher(jnCustomerGLR.readGLRList)
                .params($stateParams);

            self.list = pf.records();

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();

            self.editable = $stateParams.editable;

            self.showTitleMenu = function () {
                if (! titleMenu) {
                    titleMenu = jnTitleMenu.create({
                        items: [{
                            template: '新增个人关联人',
                            onTap: function () {
                                $state.go('customer-glr-per-add', {
                                    pCustNo: $stateParams.custNo,
                                });
                            },
                        }, {
                            template: '新增企业关联人',
                            onTap: function () {
                                $state.go('customer-glr-ent-add', {
                                    pCustNo: $stateParams.custNo,
                                });
                            },
                        }],
                    });
                }

                titleMenu.show();
            };

            self.view = function (glr) {
                var state = {
                    0: 'customer-glr-per-view',
                    1: 'customer-glr-ent-view',
                }[glr.custType];

                $state.go(state, {
                    pCustNo: $stateParams.custNo,
                    custNo: glr.custNo,
                    linkType: glr.linkType,
                    linkTypeName: glr.linkTypeName,
                    editable: self.editable,
                });
            };

            self.remove = function (glr, $event) {
                $event.stopPropagation();

                var text = '确实要删除关联人' + glr.custName + '吗？';

                jnHelper.confirm(text).then(function (confirmed) {
                    if (confirmed) {
                        jnCustomerGLR.deleteGLR({
                            pCustNo: $stateParams.custNo,
                            custNo: glr.custNo,
                            linkType: glr.linkType,
                        }).then(function () {
                            jnHelper.removeArrayItem(self.list.items,
                                function (e) {
                                    return e.custNo === glr.custNo;
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

