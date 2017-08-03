(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('dkxq.Ctrl',
        ['jnHttp', 'jnUser','$stateParams','$scope',
        function (jnHttp, jnUser,$stateParams,$scope) {
           var params = {};
           params.custNo = $stateParams.custNo;//客户编号
           params.loanNo = $stateParams.loanNo;//贷款合同号
           //params.contType = $stateParams.contType;//主合同类型
           
	       return jnHttp.post('/mlsp/router/rest.do?_transCode=QRY350',
	            params).then(function(data){
	            	$scope.custNo = $stateParams.custNo;
	            	$scope.loanNo = $stateParams.loanNo;
	            	$scope.contType = $stateParams.contType;
	            	$scope.it = data.root[0];
	            });
                       
        }]
    );

})();
