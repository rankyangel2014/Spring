(function() {
    'use strict';
    angular.module('advances').controller('GuaranteeDetailCtrl',
            [ '$scope','jnHttp','jnHelper','$stateParams', function($scope,jnHttp,jnHelper,$stateParams) {
                $scope.title = '贷款担保信息';
                jnHttp.post('/mloan/router/rest/guaranteeAction.do?method=getCollateralList', {
                    'start':0,
                    'custNo' : $stateParams.custNo,
                    'contNo' : $stateParams.contNo,
                    'contTyp': $stateParams.contTyp,
                    'status':'',
                    'optFlag':'',
                    'applSeq':'',
                }).then(function(data) {
                    $scope.it = data;
                });
            } ]);
})();
