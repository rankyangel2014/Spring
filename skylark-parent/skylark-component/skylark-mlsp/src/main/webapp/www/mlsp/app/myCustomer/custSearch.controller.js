(function () {
'use strict';

angular
    .module('custSearch')
    .controller('custSearch.SearchCtrl', [
        '$scope','$state', 'jnUser', 'jnForm',
        function ($scope,$state, jnUser, jnForm) {
            var self = this;

            self.form = {};
            self.justManager = jnUser.equalStations('400');
            
            if (jnUser.hasStation('400')) {
                $scope.isManagerFlag=true;
            }else{
            	 $scope.isManagerFlag=false;
            }
            
            

           /* jnForm.readManagers().then(function (rsp) {
                self.managers = rsp;
            });*/

            self.submit = function () {
                jnForm.validate(self.searchForm)
                    .then(function () {
                    	self.form.tmp="1";
                        $state.go('myCustomer', self.form);
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

