(function() {
    'use strict';
    angular.module('todos')
    .controller(
            'TodosQueryAllCtrl',
            [
                '$scope',
                '$stateParams',
                'jnUser',
                'jnHttp',
                'jnTodosListService',
                function($scope, $stateParams, jnUser, jnHttp,
                        jnTodosListService) {
                    $scope.title = '待办工作';
                    jnTodosListService.queryGroup().then(function(data) {
                        $scope.todosList = data;
                    });
                } ])
   .controller(
        'TodosQueryAssignCtrl',
        [
                'jnHelper',
                '$scope',
                '$stateParams',
                'jnUser',
                'jnHttp',
                'jnTodosListService',
                function(jnHelper, $scope, $stateParams, jnUser, jnHttp,
                        jnTodosListService) {
                    if($stateParams.operType==='0'){
                        
                        $scope.title = $stateParams.pendName+"（"+"个人"+"）";
                    }else if($stateParams.operType==='1'){
                        
                        $scope.title = $stateParams.pendName+"（"+"岗位"+"）";
                    }else{
                        
                        $scope.title = $stateParams.pendName+"（"+"历史"+"）";
                    }
                    
                    var pf = jnHelper.PaginateFetcher(jnTodosListService.queryList)
                            .limitParam('pageLimit')
                            .params($stateParams);
                    $scope.todosList = pf.records();
                    $scope.more = function() {
                        pf.fetch();
                    };
                    $scope.more();
                } ]);
})();
