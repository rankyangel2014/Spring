(function() {
    'use strict';
    angular.module('advances').controller('AdvancesLoanDetailCtrl',
            [ '$scope','jnHttp','jnHelper','$stateParams', function($scope,jnHttp,jnHelper,$stateParams) {
                $scope.title = '贷款详细信息';
                jnHttp.post('/mloan/router/rest/LoanDetailAction.do?method=getLoanDtl', {
                    'custNo' : $stateParams.custNo,
                    'loanNo' : $stateParams.loanNo,
                }).then(function(data) {
                    $scope.it = data.data;
                });
            } ]);
})();
