(function() {
    'use strict';
    angular.module('advances').controller(
            'AdvancesLoanCtrl',
            [
                    '$scope',
                    'jnHelper',
                    '$stateParams',
                    'jnHttp',
                    function($scope, jnHelper, $stateParams,
                            jnHttp) {
                        $scope.title = '贷款详情';
                        jnHttp.post('/mloan/router/rest/LoanDetailAction.do?method=getLoanApplyDtl', {
                            'custNo' : $stateParams.custNo,
                            'loanNo' : $stateParams.loanNo,
                        }).then(function(data) {
                            $scope.it = data.data;
                            $scope.it.custNo= $stateParams.custNo;
                            $scope.it.loanNo=$stateParams.loanNo;
                        });
                    } ]);
})();
