(function() {
    'use strict';
    angular.module('advances').controller('AdvancesLoanDetailCtrl',
            [ '$scope','jnHttp','jnHelper','$stateParams', function($scope,jnHttp,jnHelper,$stateParams) {
                $scope.title = '贷款详细信息';
                jnHttp.post('/mlsp/router/rest.do?_transCode=QRY353', {
                    'custNo' : $stateParams.custNo,
                    'loanNo' : $stateParams.loanNo,
                }).then(function(data) {
                    $scope.it = data.root[0];
                });
            } ]);
})();
