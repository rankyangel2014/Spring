(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('myBusiness.logCtrl',
        ['$stateParams', 'jnMyBusinessLog', 'jnHelper','$scope','$state',
        function ($stateParams,jnMyBusinessLog,jnHelper,$scope,$state) {
        	var self = this;
        	
            var pf = jnHelper.PaginateFetcher(jnMyBusinessLog.readList)
                .params($stateParams);
            
            //customers页面交互
            self.list = pf.records();

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();
        }]
    );

})();