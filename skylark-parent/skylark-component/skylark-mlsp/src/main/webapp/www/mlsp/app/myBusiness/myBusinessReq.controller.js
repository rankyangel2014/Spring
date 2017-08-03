(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('myBusinessReq.paramsCtrl',
        ['$stateParams', 'jnMyBusinessService', 'jnHelper','$scope','$state','$filter',
        function ($stateParams,jnMyBusinessService,jnHelper,$scope,$state,$filter) {
        	var self = this;
        	
        	//跳转到详情页面  busType&contNoExt&status&custName&phoneNo&custManagerName&applAmt&applDt&custNo
        	$scope.toDetail = function (busType,contNoExt,status,custName,phoneNo,custManagerName,applAmt,applDt,flowType,actvDt,custNo,loanNo,params,crdtNo,applSeq) {
		        $state.go('myBusinessDetail', {
		        	busType: busType,
		        	contNoExt:contNoExt,
		        	status:status,
		        	custName:custName,
		        	phoneNo:phoneNo,
		        	custManagerName:custManagerName,
		        	applAmt:applAmt,
		        	applDt:applDt,
		        	flowType:flowType,
		        	actvDt:actvDt,
		        	custNo:custNo,
		        	loanNo:loanNo,
		        	params:params,
		        	crdtNo:crdtNo,
		        	applSeq:applSeq,
		        });
    	    };
    	    
    	  //跳转到个人客户：0，或者企业客户:1
    	    $scope.custDetail = function (custNo,custType,$event){
    	    	if(custType == '0'){
    	    		$state.go('custDetail', {
    	    			custNo:custNo,
    	    		});
    	    	}
    	    	if(custType == '1'){
    	    		$state.go('entCustDetail', {
    	    			custNo:custNo,
    	    		});
    	    	}
    	    	$event.stopPropagation();//阻止事件冒泡
    	    };
    	    
    	    //跳转到查询页面
    	    self.search = function () {
            	$state.go('myBusinessQry', {});
            };
            
            var params = $stateParams;
            //格式化日期
        	params.applDtFrom = $filter('date')(new Date(params.applDtFrom),'yyyyMMdd');
        	params.applDtTo = $filter('date')(new Date(params.applDtTo),'yyyyMMdd');
            
            var pf = jnHelper.PaginateFetcher(jnMyBusinessService.readList)
                .params(params);
            
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

