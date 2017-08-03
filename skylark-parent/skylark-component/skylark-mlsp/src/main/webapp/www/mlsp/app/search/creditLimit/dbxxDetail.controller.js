(function () {
'use strict';

angular
    .module('creditLimit')
    .controller('creditLimit.dbxxDetailCtrl',
        ['$stateParams', 'jnDbxxListServer', 'jnHelper',
        function ($stateParams,jnDbxxListServer,jnHelper) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnDbxxListServer.readList)
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

