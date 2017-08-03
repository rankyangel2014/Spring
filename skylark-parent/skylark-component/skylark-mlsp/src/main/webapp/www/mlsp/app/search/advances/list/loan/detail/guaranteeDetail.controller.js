(function() {
    'use strict';
    angular.module('advances').controller('GuaranteeDetailCtrl',
            [ '$scope','jnHttp','jnHelper','$stateParams', function($scope,jnHttp,jnHelper,$stateParams) {
                $scope.title = '贷款担保信息';
                jnHttp.post('/mlsp/router/rest.do?_transCode=LNLNB106', {
                    'start':0,
                    'custNo' : $stateParams.custNo,
                    'contNo' : $stateParams.contNo,
                    'contTyp': $stateParams.contTyp,
                    'status':'',
                    'optFlag':'',
                    'applSeq':'',
                }).then(function(data) {
                    $scope.it = data.root;
                });
            } ]);
})();
