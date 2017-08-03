(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('symx.Ctrl',
        ['$stateParams', 'symxListServer', 'jnHelper',
        function ($stateParams,symxListServer,jnHelper) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(symxListServer.readList)
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

