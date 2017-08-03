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
           
	       return jnHttp.post('/mlsp/router/rest.do?_transCode=QRY353',
	            params).then(function(data){
	            	$scope.it = data.root[0];
	            });
                       
        }]
    );

})();
