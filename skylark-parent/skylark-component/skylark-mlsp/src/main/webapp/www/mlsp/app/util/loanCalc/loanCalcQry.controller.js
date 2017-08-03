(function () {
'use strict';

angular
    .module('loanCalc')
    .controller('loanCalcCtrl', [
        '$state','$scope','jnForm',
        function ($state,$scope,jnForm) {
        	
            var self = this;

            self.form = {};
            self.form.type = 'debx';//初始化为等额本息
            
            self.submit = function () {
            	jnForm.validate(self.myForm)
                .then(function () {
                	$state.go('loanCalcList', self.form);
                });
            };
            
            self.reset = function() {
                self.myForm.$rollbackViewValue();
                self.form = {};
            };
        }]
    );

})();

