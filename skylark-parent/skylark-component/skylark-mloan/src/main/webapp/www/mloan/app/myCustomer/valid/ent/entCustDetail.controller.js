(function () {
'use strict';

angular
    .module('entCustDetail')
    .controller('entCustDetail.paramsCtrl',
        ['$scope','$stateParams', 'entCustSer', 'jnHelper','$state','jnForm','jnUser',
        function ($scope,$stateParams, entCustSer, jnHelper,$state,jnForm,jnUser) {
            var self = this;
            var params = {};
            $scope.editFlag='0'; 
            $scope.from=$stateParams.from;
            
            //登录用户岗位ID
            $scope.station=jnUser.getMaxStation();
            
            if ($scope.station == '500' && (jnUser.userId == $stateParams.custManagerNo)
               && $stateParams.isDetail=='2' && $stateParams.asgnStatus=='1'){
                
                $scope.assignedAble = true ;
            }
            
            if($stateParams.asgnStatus!=='2'){
                $scope.transferAble = true ;
            }
            //if ($scope.station=='700' && $stateParams.isDetail=='2'
            //   && $stateParams.asgnStatus=='1'){
            //
            //    $scope.assignedAble = true ;
            //}
            
            params.custNo= $stateParams.custNo;
            entCustSer.qryBaseEnt(params).then(
            		function(rsp){
            			console.info(rsp);
            			$scope.data=rsp.root;
            			
            			$scope.entCustDetail=rsp.data;
            			
            			//判断是否需要编辑
						if( $stateParams.custManagerNo == jnUser.userId && $stateParams.isDetail=='2'
							&& jnUser.hasStation('400|500')){
							$scope.isDetail = '0';
						}else{
							$scope.isDetail = '1';
						}
            		}
            );
            
          
        }]
    );

})();

