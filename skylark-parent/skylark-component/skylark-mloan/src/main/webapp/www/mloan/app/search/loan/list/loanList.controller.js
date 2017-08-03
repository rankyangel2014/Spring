(function() {
    'use strict';
    angular.module('loan').controller('LoanListCtrl',
            [ '$scope','jnLoanService','jnHelper','$stateParams', function($scope,jnLoanService,jnHelper,$stateParams) {
                $scope.title = '还款记录查询';
                var pf = jnHelper.PaginateFetcher(jnLoanService.readList)
                    .params($stateParams);
                
                $scope.loanList = pf.records();

                $scope.more = function () {
                    pf.fetch().then(function (rsp) {
                        // 这里可以进一步处理
                    });
                };

                $scope.more();
            
            } ]);
})();
