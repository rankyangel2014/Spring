(function() {
    'use strict';
    angular.module('advances').controller('AdvancesListCtrl',
            [ '$scope','jnAdvancesService','jnHelper','$stateParams', function($scope,jnAdvancesService,jnHelper,$stateParams) {
                $scope.title = '放款记录查询';
                
                var pf = jnHelper.PaginateFetcher(jnAdvancesService.readList)
                    .params($stateParams);
                
                $scope.advancesList = pf.records();

                $scope.more = function () {
                    pf.fetch().then(function (rsp) {
                        // 这里可以进一步处理
                    });
                };
                $scope.more();
            } ]);
})();
