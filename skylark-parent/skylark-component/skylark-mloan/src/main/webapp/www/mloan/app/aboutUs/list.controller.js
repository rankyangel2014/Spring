(function () {
'use strict';

angular
    .module('aboutUs')
    .controller('aboutUs.ListCtrl',
        ['$stateParams', '$scope', 'jnHelper','jnHttp','jnUser','jnApp',
        function ($stateParams,$scope, jnHelper,jnHttp,jnUser,jnApp) {
        	var params = jnHelper.merge(params, {
        		method:'aboutUs',
                userId: jnUser.userId,
                insttuId: jnUser.insttuId,
            });
        	
        	$scope.stat = $stateParams.stat;
        	return jnHttp.post('/skylark/MaspService.do',
					params).then(function(data){
                        $scope.it = data.aboutUs;
                        $scope.custName = jnUser.insttuName;
                        $scope.it.WEIDAI_INSTTU_PIC_PREVIEW = jnApp.baseUrl+'/' + data.aboutUs.WEIDAI_INSTTU_PIC_PREVIEW;
                        $scope.it.CUST_MANAGER.PHOTO_URL = jnApp.baseUrl +'/'+ data.aboutUs.CUST_MANAGER.PHOTO_URL;
						$scope.it.STATION_NAME = jnUser.getStationNameStr();
    	            });
        }]
    );

})();

