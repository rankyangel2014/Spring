(function () {
'use strict';

angular
    .module('blackList')
    .controller('blackList.blackListCtrl',
        ['$stateParams', 'jnBlackListServer', 'jnHelper','$scope','$state',
        function ($stateParams,jnBlackListServer,jnHelper,$scope,$state) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnBlackListServer.readList)
                .params($stateParams);
            
            //customers页面交互
            self.blackList = pf.records();
            
            //跳转到个人客户：0，或者企业客户:1
    	    $scope.custDetail = function (custNo,custType,$event){
                // 其他公司黑名单不能查看详情
                if ('1' === $stateParams.blackType) {
                    return;
                }

    	    	if(custType == '0'){
    	    		$state.go('custDetail', {
    	    			custNo:custNo,
						isQry:1
    	    		});
    	    	}
    	    	if(custType == '1'){
    	    		$state.go('entCustDetail', {
    	    			custNo:custNo,
    	    		});
    	    	}
    	    	$event.stopPropagation();//阻止事件冒泡
    	    };

            self.more = function () {
                pf.fetch().then(function (rsp) {
                    // 这里可以进一步处理
                });
            };

            self.more();
        }]
    );

})();

