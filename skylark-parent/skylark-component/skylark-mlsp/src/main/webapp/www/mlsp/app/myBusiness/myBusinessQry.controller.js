(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('myBusinessQry.paramsCtrl', [
        '$state','$scope','jnUser','jnForm','$filter',
        function ($state,$scope,jnUser,jnForm,$filter) {
        	var self = this;
        	self.form = {};
        	
        	var userFlag = true;
            
            if (jnUser.hasStation('400')) {
            	userFlag = true;
            	self.form.custManagerId = jnUser.userId;
            }else{
            	userFlag = false;
            }
            
            $scope.userFlag = userFlag;
            
            self.submit = function () {
            	jnForm.validate(self.myForm)
                .then(function () {
                	$state.go('myBusinessReq', self.form);
                });
            };

        }]
    );

})();

