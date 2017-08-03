(function () {
'use strict';

angular
    .module('addConact')
    .controller('addConact.AddCtrl', [
        '$scope','$state', 'jnUser', 'jnForm',
        function ($scope,$state, jnUser, jnForm) {
            var self = this;

            self.form = {};
            
            self.justManager = jnUser.equalStations('400');

            jnForm.readManagers().then(function (rsp) {
                self.managers = rsp;
            });

            self.submit = function () {
                jnForm.validate(self.addForm)
                    .then(function () {
                    	$state.go('myCustomer', self.form);
                    });
            };
            self.jump=function(state){
            	 $state.go(state, {});
            };
            self.reset=function(){
            	self.form={
            			custName:'',
            			paperType:'0',
            			paperNo:'',
            			marryStatus:'',
            			agricultureType:'',
            			mobile:'',
            			address:'',
            	};
            	
//            	self.reset();
            };

            
        }]
    );

})();

