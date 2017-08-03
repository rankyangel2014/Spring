(function () {
'use strict';

angular
    .module('creditLimit')
    .controller('creditLimit.creditListCtrl',
        ['$stateParams', 'jnCreditListServer', 'jnHelper','$scope','$state',
        function ($stateParams,jnCreditListServer,jnHelper,$scope,$state) {
        	
        	//跳转到详情页面
        	$scope.toDetail = function (crdtNo) {
        	        $state.go('creditLimitDetail', {crdtNo: crdtNo});
        	    };
        	
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnCreditListServer.readList)
                .params($stateParams);
            
            //customers页面交互
            self.creditList = pf.records();

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();
        }]
    );

})();

