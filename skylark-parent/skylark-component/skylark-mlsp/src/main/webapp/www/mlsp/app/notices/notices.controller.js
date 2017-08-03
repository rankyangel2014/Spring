(function() {
    'use strict';
    angular.module('notices').controller(
            'NoticesQueryAllCtrl',
            [
                    '$scope',
                    '$stateParams',
                    'jnUser',
                    'jnHttp',
                    'jnHelper',
                    'jnNoticesService',
                    function($scope, $stateParams, jnUser, jnHttp,jnHelper, jnNoticesService) {
                        $scope.title = '系统公告';

                        var pf = jnHelper.PaginateFetcher(jnNoticesService.queryList)
                                .limitParam('pageLimit')
                                .params($stateParams);
                        $scope.noticesList = pf.records();
                        $scope.more = function() {
                            pf.fetch();
                        };
                        $scope.more();

                    } ]).controller(
            'NoticesQueryAssignCtrl',
            [ '$scope', 
              '$stateParams', 
              'jnHelper',
              'jnNoticesService',
                    function($scope, $stateParams,jnHelper,jnNoticesService) {
                        $scope.title = '系统公告';
                        var pf = jnHelper.PaginateFetcher(jnNoticesService.queryDetail).limitParam('pageLimit').params($stateParams);
                         $scope.notices = pf.records();
                         pf.fetch();
                    } ]);
})();
