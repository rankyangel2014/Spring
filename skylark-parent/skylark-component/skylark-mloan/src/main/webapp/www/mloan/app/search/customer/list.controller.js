(function () {
'use strict';

angular
    .module('search.customer')
    .controller('search.customer.ListCtrl', [
        '$state',
        'jnUser',
        '$stateParams',
        'jnSearchCustomer',
        'jnHelper',
        function (
            $state,
            jnUser,
            $stateParams,
            jnSearchCustomer,
            jnHelper
        ) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnSearchCustomer.readList)
                .params($stateParams);

            self.customers = pf.records();

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();

            self.viewCustomer = function (id, type) {
                var params = {
                    custNo: id,
                    operType:0
                };

                if ('0' == type) {
                    $state.go('custDetail', params);
                    return;
                }

                if ('1' == type) {
                    $state.go('entCustDetail', params);
                    return;
                }

                throw Error('未能识别的客户类型：客户' + id + '，类型' + type);
            };
        }]
    );

})();

