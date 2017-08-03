(function() {
    'use strict';
    angular.module('advances').controller('RepaymentScheduleCtrl',
            [ '$scope','jnHttp','jnHelper','$stateParams', function($scope,jnHttp,jnHelper,$stateParams) {
                $scope.title = '还款计划表';
                jnHttp.post('/mloan/router/rest/LoanDetailAction.do?method=getSchedDtl', {
                    'custNo' : $stateParams.custNo,
                    'loanNo' : $stateParams.loanNo,
                }).then(function(data) {
                    $scope.it = data.root;
                    $scope.numberOfDays = 0;
                    $scope.instmAmt = 0;
                    $scope.instmPrcp = 0;
                    $scope.setlPrcp = 0;
                    $scope.instmInt = 0;
                    $scope.setlInt = 0;
                    $scope.wvInt = 0;
                    $scope.aheadSetlPrcp = 0;
                    angular.forEach($scope.it, function(data){
                        $scope.numberOfDays += Number(data.numberOfDays);
                        $scope.instmAmt += Number(data.instmAmt);
                        $scope.instmPrcp += Number(data.instmPrcp);
                        $scope.setlPrcp += Number(data.setlPrcp);
                        $scope.instmInt += Number(data.instmInt);
                        $scope.setlInt += Number(data.setlInt);
                        $scope.wvInt += Number(data.wvInt);
                        $scope.aheadSetlPrcp += Number(data.aheadSetlPrcp);
                    });
                });
            } ]);
})();
