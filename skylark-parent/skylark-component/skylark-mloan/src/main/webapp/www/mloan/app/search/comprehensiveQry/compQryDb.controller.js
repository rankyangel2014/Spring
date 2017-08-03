(function () {
'use strict';

angular
    .module('comprehensiveQry')
    .controller('compQry.dbCtrl',
        ['$stateParams', 'jnCompQrydbServer', 'jnHelper',
        function ($stateParams,jnCompQrydbServer,jnHelper) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnCompQrydbServer.readList)
                .params($stateParams);
            
            //customers页面交互
            self.dbList = pf.records();

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();
        }]
    );

})();

