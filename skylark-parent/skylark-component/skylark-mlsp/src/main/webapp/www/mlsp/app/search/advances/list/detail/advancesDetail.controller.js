(function() {
    'use strict';
    angular.module('advances').controller('AdvancesDetailCtrl',
            [ '$scope','jnAdvancesService','jnHelper','$stateParams', function($scope,jnAdvancesService,jnHelper,$stateParams) {
                $scope.title = '放款记录详情';
                $scope.it = $stateParams ;
            } ]);
})();
