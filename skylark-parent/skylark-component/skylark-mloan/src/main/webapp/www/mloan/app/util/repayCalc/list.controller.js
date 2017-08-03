(function () {
'use strict';

angular
    .module('util.repayCalc')
    .controller('util.repayCalc.ListCtrl',
        ['$stateParams', 'jnUtilRepayCalc', 'jnHelper',
        function ($stateParams, jnUtilRepayCalc, jnHelper) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnUtilRepayCalc.readList)
                .params(jnHelper.fillUndef($stateParams));

            self.records = pf.records();

            self.more = function () {
                pf.fetch();
            };

            self.more();
        }]
    );

})();

