(function() {
    'use strict';
    angular.module('loan')
        .controller(
            'BatchLoanInfoCtrl',
            [ '$scope', 
              'jnLoanService', 
              'jnHelper', 
              '$stateParams',
               function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '还款记录详情';
                        jnLoanService.readBatchRepayList($stateParams).then(
                                function(data) {
                                    $scope.it = data.items;
                                });

                 } ]) ;
})();
