(function () {
'use strict';

angular
    .module('search.customer')
    .controller('search.customer.ListCtrl', [
        '$state',
        '$stateParams',
        'jnSearchCustomer',
        'jnHelper',
        function (
            $state,
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
                };

                if (0 === type) {
                    params.isQry = 1;
                    $state.go('custDetail', params);
                    return;
                }

                if (1 === type) {
                    params.isQry = 1;
                    $state.go('entCustDetail', params);
                    return;
                }

                throw Error('未能识别的客户类型：客户' + id + '，类型' + type);
            };
        }]
    );

})();

