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
                        jnHttp.post('/mlsp/router/rest.do?_transCode=QRY350', {
                            'custNo' : $stateParams.custNo,
                            'loanNo' : $stateParams.loanNo,
                        }).then(function(data) {
                            $scope.it = data.root[0];
                            $scope.it.custNo= $stateParams.custNo;
                            $scope.it.loanNo=$stateParams.loanNo;
                        });
                    } ]);
})();
