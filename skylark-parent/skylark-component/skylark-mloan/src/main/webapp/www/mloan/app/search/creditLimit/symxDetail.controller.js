(function () {
'use strict';

angular
    .module('creditLimit')
    .controller('creditLimit.symxDetailCtrl',
        ['$stateParams', 'jnSymxListServer', 'jnHelper',
        function ($stateParams,jnSymxListServer,jnHelper) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnSymxListServer.readList)
                .params($stateParams);
            
            //customers页面交互
            self.symxList = pf.records();

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();
        }]
    );

})();

