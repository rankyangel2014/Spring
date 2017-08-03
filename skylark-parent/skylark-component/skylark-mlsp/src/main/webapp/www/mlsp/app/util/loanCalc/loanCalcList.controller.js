(function () {
'use strict';

angular
    .module('loanCalc')
    .controller('loanCalc.ListCtrl',
        ['$stateParams',  'jnHelper','jnHttp','$scope',
        function ($stateParams,jnHelper,jnHttp,$scope) {
            
            return jnHttp.post('/mlsp/router/rest.do?_transCode=XWD101',
            		$stateParams)
                    .then(function (rsp) {
                    	$scope.items = rsp.data;
                    });
            
        }]
    );

})();

