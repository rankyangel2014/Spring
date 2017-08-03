(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('myBusiness.ListCtrl',
        ['$stateParams', 'jnMyBusinessServer', 'jnPage', 'jnHelper','$scope','$state',
        function ($stateParams,jnMyBusinessServer,jnPage,jnHelper,$scope,$state) {
        	var self = this;
        	
        	//跳转到详情页面
        	$scope.toDetail = function (loan) {
                if ('DocUpload' === jnPage.params.ref) {
                    jnPage.backTo(jnPage.params.ref, {
                        custNo: loan.custNo,
                        custName: loan.custName,
                        loanNo: loan.loanNo,
                        contTyp: loan.contTyp,
                        applAmt: loan.applAmt,
                        loanStatus: loan.status,
                    });
                } else {
                    $state.go('myBusinessDetail', {
                        custNo: loan.custNo,
                        custName: loan.custName,
                        custType: loan.custType,
                        loanNo: loan.loanNo,
                        contTypId: loan.contTypId,
                        contTyp: loan.contTyp,
                        crdtNo: loan.crdtNo,
                        applAmt: loan.applAmt,
                        custManagerNo: loan.custManagerNo,
                    });
                }
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

            var pf = jnHelper.PaginateFetcher(jnMyBusinessServer.readList)
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

