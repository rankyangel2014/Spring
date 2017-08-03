(function () {
'use strict';

angular
    .module('custAddCB')
    .controller('custAddCB.AddCBCtrl', [
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
                    	
                    });
            };
            self.jump=function(state){
            	 $state.go(state, {oprFlag:new Date().getTime()});
            };

            
        }]
    );

})();

