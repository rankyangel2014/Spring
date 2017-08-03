(function() {
    'use strict';
    angular.module('loan')
        .controller(
            'WriteBackBalanceTreatmentCtrl',
            [ '$scope', 
              'jnLoanService', 
              'jnHelper', 
              '$stateParams',
               function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '费用及余款处理';
                        jnLoanService.readVRApplInfo($stateParams).then(
                                function(data) {
                                    var list =  data.items['feeList'];
                                    jnLoanService.readFeeParam().then(
                                            function(data) {
                                                list.forEach(function(d){
                                                    data.items.forEach(function(t){
                                                        if(d.feeCde==t.feeCde){
                                                            d.feeDesc = t.feeDesc;
                                                        }
                                                    });
                                                });
                                                $scope.it = list ;
                                    });
                                
                                });

                 } ])
        .controller(
            'WriteBackRiskReserveCtrl',
            [ '$scope', 
              'jnLoanService', 
              'jnHelper', 
              '$stateParams',
               function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '风险准备金';
                        jnLoanService.readVRApplInfo($stateParams).then(
                                function(data) {
                                    $scope.it = data.items;
                                });

                 } ])
        .controller(
            'WriteBackLoanInfoCtrl',
            [ '$scope', 
              'jnLoanService', 
              'jnHelper', 
              '$stateParams',
               function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '还款记录详情';
                        jnLoanService.readVRApplInfo($stateParams).then(
                                function(data) {
                                    $scope.it = data.items;
                                    $scope.it.txTyp=$scope.it.txTyp=== '9' ? '2' : '1';
                                    var d = data.items['loanList'][0];
                                    $scope.it.contNoExt = d.contNoExt;
                                    $scope.it.loanNo = d.loanNo;
                                    $scope.it.intStartDt = (d.intStartDt);
                                    $scope.it.lastDueDt = (d.lastDueDt);
                                    $scope.it.repayAmt = (d.repayAmt);
                                    $scope.it.prcpBal = (d.prcpBal);
                                    $scope.it.intAll = (d.intAll);
                                    $scope.it.oweInt =(d.oweInt);
                                    $scope.it.cmpdIntAll = (d.cmpdIntAll);
                                    $scope.it.setlTotal =$scope.it.setlPrcp+$scope.it.setlIntAll; 
                                });

                 } ])
        .controller(
            'WriteBackPaymentRecordCtrl',
            [ '$scope', 
              'jnLoanService', 
              'jnHelper', 
              '$stateParams',
               function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '收款记录';
                        jnLoanService.readVRApplInfo($stateParams).then(
                                function(data) {
                                    $scope.it = data.items;
                                });

                 } ]) ;
})();
