(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('myBusinessReq.paramsCtrl',
        ['$stateParams', 'jnMyBusinessService', 'jnHelper','$scope','$state',
        function ($stateParams,jnMyBusinessService,jnHelper,$scope,$state) {
        	var self = this;
        	
        	//跳转到详情页面
        	$scope.toDetail = function (custNo,custType,loanNo,contTypId,contTyp,applAmt) {
		        $state.go('myBusinessDetail', {
		        	custNo: custNo,
		        	custType:custType,
		        	loanNo:loanNo,
		        	contTypId:contTypId,
		        	contTyp:contTyp,
		        	applAmt:applAmt,
		        });
    	    };
    	    
    	  //跳转到个人客户：0，或者企业客户:1
    	    $scope.custDetail = function (custNo,custType,$event){
    	    	if(custType == '0'){
    	    		$state.go('custDetail', {
    	    			custNo:custNo,
    	    			operType:0
    	    		});
    	    	}
    	    	if(custType == '1'){
    	    		$state.go('entCustDetail', {
    	    			custNo:custNo,
    	    			operType:0
    	    		});
    	    	}
    	    	$event.stopPropagation();//阻止事件冒泡
    	    };
    	    
    	    //跳转到查询页面
    	    self.search = function () {
            	$state.go('myBusinessQry', {});
            };

            var pf = jnHelper.PaginateFetcher(jnMyBusinessService.readList)
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

