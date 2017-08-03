(function() {
    'use strict';
    angular.module('loan').controller(
            'SingleCustomerLoanInfoCtrl',
            [ '$scope', 'jnLoanService', 'jnHelper', '$stateParams',
                    function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '还款记录详情';
                        jnLoanService.readSingleCustSchedList($stateParams).then(
                                function(data) {
                                    $scope.it = data.items;
                                });
                    } ])
            .controller(
            'SingleCustomerLoanDetailCtrl',
            [ '$scope', 'jnLoanService', 'jnHelper', '$stateParams','$filter',
                    function($scope, jnLoanService, jnHelper, $stateParams,$filter) {
                        $scope.title = '还款明细';
                        jnLoanService.readSingleCustSchedList($stateParams).then(
                                function(data) {
                                    $scope.it = data.items['repayList'];
                                    $scope.it = $scope.it.map(function (data) {
                                        (function () {
                                            var v = data.receivableTotal - data.setlTotal
                                                - data.wvTotal;

                                            if (0 == $filter('number')(v, 0)) {
                                                data.setlFlag = '是';
                                            } else {
                                                data.setlFlag = '否';
                                            }
                                        })();
                                        return data;
                                    }
                                    
                                    );
                                });

                    } ])
            .controller(
            'SingleCustomerPaymentRecordCtrl',
            [ '$scope', 'jnLoanService', 'jnHelper', '$stateParams',
                    function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '收款记录';
                        jnLoanService.readSingleCustSchedList($stateParams).then(
                                function(data) {
                                    $scope.it = data.items['bankBackFillList'];
                                });

                    } ])
            .controller(
            'SingleCustomerBalanceTreatmentCtrl',
            [ '$scope', 'jnLoanService', 'jnHelper', '$stateParams',
                    function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '费用及余款处理';
                        jnLoanService.readSingleCustSchedList($stateParams).then(
                                function(data) {
                                    var list =  data.items['feeRecList'];
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

                    } ]);

})();
