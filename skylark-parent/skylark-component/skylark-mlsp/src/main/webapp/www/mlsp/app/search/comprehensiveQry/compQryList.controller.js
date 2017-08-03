(function () {
'use strict';

angular
    .module('comprehensiveQry')
    .controller('compQry.listCtrl',
        ['$stateParams', 'jnCompQryListServer', 'jnHelper','$scope','$state',
        function ($stateParams,jnCompQryListServer,jnHelper,$scope,$state) {
        	
        	//跳转到详情页面
        	$scope.toDetail = function (custNo,loanNo,contType) {
        	        $state.go('compQryDetail', {custNo: custNo,loanNo:loanNo,contType:contType});
        	    };
        	
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnCompQryListServer.readList)
                .params($stateParams);
            
            //customers页面交互
            self.compQryList = pf.records();

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();
        }]
    );

})();

