(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('myCustomer.link.AddCtrl', [
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

            self.form = {
                custNo: $stateParams.custNo,
            };

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
                    jnCustomerLink.create(self.form)
                        .then(function () {
                            return jnHelper.alert('添加成功！')
                        }).then(function () {
                            jnPage.modified = false;
                            jnPage.back();
                        });
                });
            };
        }]
    );

})();

