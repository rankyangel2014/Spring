(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('dbxx.Ctrl',
        ['$stateParams', 'dbxxListServer', 'jnHelper',
        function ($stateParams,dbxxListServer,jnHelper) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(dbxxListServer.readList)
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

