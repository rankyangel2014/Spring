(function () {
'use strict';

angular
    .module('creditLimit')
    .controller('creditLimit.paramsCtrl', [
        '$state','$scope','jnForm','jnUser',
        function ($state,$scope,jnForm,jnUser) {
        	
            var self = this;

            self.form = {};
            
            //判断是否为客户经理
            var userFlag = true;
            if (jnUser.hasStation('400')) {
            	userFlag = true;
            	self.form.custManagerNo = jnUser.userId;
            }else{
            	userFlag = false;
            }
            $scope.userFlag = userFlag;
            
            self.submit = function () {
            	jnForm.validate(self.myForm)
                .then(function () {
                	$state.go('creditLimitList', self.form);
                });
            };
            
            self.onChangeCustType = function () {
                self.form.paperType = '';
                self.onChangePaperType();
            };

            self.onChangePaperType = function () {
                self.form.paperNo = '';
            };
        }]
    );

})();

