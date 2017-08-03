(function () {
'use strict';

angular
    .module('comprehensiveQry')
    .controller('compQry.hkCtrl',
        ['$stateParams','jnHelper','jnHttp','$scope',
        function ($stateParams,jnHelper,jnHttp,$scope) {
            
        	var params = {};
            params.custNo = $stateParams.custNo;//客户编号
            params.loanNo = $stateParams.loanNo;//贷款合同号
        	
        	 return jnHttp.post('/mlsp/router/rest.do?_transCode=HKJH001',
                     params)
                     .then(function (rsp) {
                     	var refined = rsp.root;
                     	
                     	var sum = {
                                 numberOfDays: 0,
                                 instmAmt: 0,
                                 instmPrcp: 0,
                                 setlPrcp: 0,
                                 instmInt: 0,
                                 setlInt: 0,
                                 wvInt: 0,
                                 aheadSetlPrcp: 0,
                             };
                     	
                     	 refined.forEach(function (r) {
                              sum.numberOfDays += Number(r.numberOfDays);
                              sum.instmAmt += Number(r.instmAmt);
                              sum.instmPrcp += Number(r.instmPrcp);
                              sum.setlPrcp += Number(r.setlPrcp);
                              sum.instmInt += Number(r.instmInt);
                              sum.setlInt += Number(r.setlInt);
                              sum.wvInt += Number(r.wvInt);
                              sum.aheadSetlPrcp += Number(r.aheadSetlPrcp);
                          });
                     	
                     	$scope.sum = sum;
                     	$scope.items = refined;
                     });
        	
        }]
    );

})();

