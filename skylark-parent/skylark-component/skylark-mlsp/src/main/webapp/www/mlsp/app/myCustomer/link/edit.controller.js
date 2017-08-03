(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('myCustomer.link.EditCtrl', [
        '$state',
        '$stateParams',
        '$timeout',
        'jnForm',
        'jnPage',
        'jnHelper',
        'jnSelectCustomer',
        'jnCustomerLink',
        function (
            $state,
            $stateParams,
            $timeout,
            jnForm,
            jnPage,
            jnHelper,
            jnSelectCustomer,
            jnCustomerLink
        ) {
            var self = this;

            jnCustomerLink.readList({
                custNo: $stateParams.custNo,
                limit: 1000,
            }).then(function (rsp) {
                self.form = jnHelper.arrFind(rsp.items, function (e) {
                    return String(e.recId) === $stateParams.recId;
                });

                self.form.custNo = $stateParams.custNo;
                self.form.linkStatus = 0;
                self.form.recId = $stateParams.recId;
            });

            self.selectCust = function () {
                // 防止点透
                $timeout(function () {
                    jnSelectCustomer.open($stateParams.custNo, function (cust) {
                        self.form.linkType = '';
                        self.form.linkCustName = cust.custName;
                        self.form.linkCustNo = cust.custNo;
                        self.form.linkCustType = cust.custType;
                    });
                }, 500);
            };

            self.submit = function () {
                jnForm.validate(self.editForm).then(function () {
                    jnCustomerLink.update(self.form)
                        .then(function () {
                            return jnHelper.alert('修改成功！')
                        }).then(function () {
                            jnPage.modified = false;
                            jnPage.back();
                        });
                });

            };
        }]
    );

})();

