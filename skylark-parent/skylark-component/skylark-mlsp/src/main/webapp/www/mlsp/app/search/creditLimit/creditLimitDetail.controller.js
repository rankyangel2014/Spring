/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('creditLimit')
    .controller('creditLimit.creditDetailCtrl',
        ['jnHttp', 'jnUser','$stateParams','$scope',
        function (jnHttp, jnUser,$stateParams,$scope) {
           var params = {};
           params.crdtNo = $stateParams.crdtNo;
           params.userId = jnUser.userId;
           params.applSeq = '0';
                   
	       return jnHttp.post('/mlsp/router/rest.do?_transCode=LNLNB101',
	            params).then(function(data){
	            	$scope.creditDetail = data.root[0];
	            });
                       
        }]
    );

})();
