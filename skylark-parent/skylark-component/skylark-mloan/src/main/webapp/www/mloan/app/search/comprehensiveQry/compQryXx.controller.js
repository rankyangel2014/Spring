/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('comprehensiveQry')
    .controller('compQry.xxCtrl',
        ['jnHttp', 'jnUser','$stateParams','$scope',
        function (jnHttp, jnUser,$stateParams,$scope) {
           var params = {};
           params.custNo = $stateParams.custNo;//客户编号
           params.loanNo = $stateParams.loanNo;//贷款合同号
           
	       return jnHttp.post('/mloan/router/rest/LoanDetailAction.do?method=getLoanDtl',
	            params).then(function(rsp){
	            	$scope.it = rsp.data;
	            });
                       
        }]
    );

})();
