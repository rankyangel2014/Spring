(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('creditDbxx.Ctrl',
        ['$stateParams', 'jnCreditDbxx', 'jnHelper',
        function ($stateParams,jnCreditDbxx,jnHelper) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnCreditDbxx.readList)
                .params($stateParams);
            
            //customers页面交互
            self.dbxxList = pf.records();

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();
        }]
    );

})();

