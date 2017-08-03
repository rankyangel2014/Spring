(function () {
'use strict';

angular
    .module('comprehensiveQry')
    .controller('compQry.paramsCtrl', [
        '$state','$scope','jnUser','jnForm',
        function ($state,$scope,jnUser,jnForm) {
        	var self = this;
        	self.form = {};
        	
        	var jyrq = jnUser.jyrq;
        	jyrq = jyrq.substring(0, 4) + '-'
            + jyrq.substring(4, 6) + '-'
            + jyrq.substring(6, 8);
        	$scope.queryDt = jyrq;
        	
        	var userFlag = true;
            
            if (jnUser.hasStation('400')) {
            	userFlag = true;
            	self.form.custManagerId = jnUser.userId;
            }else{
            	userFlag = false;
            }
            
            $scope.userFlag = userFlag;
            
            self.form.queryDt = jyrq;
            self.submit = function () {
            	jnForm.validate(self.myForm)
                .then(function () {
                	$state.go('compQryList', self.form);
                });
            };
        }]
    );

})();

