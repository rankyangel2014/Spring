(function () {
'use strict';

angular
    .module('util.scanCard')
    .controller('scanCardveiwCtrl', [
        '$state','$scope','jnForm','$ionicActionSheet','$cordovaDevice','jnappService',
        function ($state,$scope,jnForm,$ionicActionSheet,$cordovaDevice,jnappService) {
        	
            var self = this;

            $scope.form = {
            	name:'sss',
            	id:'',
            	sex:'',
            	nation:'',
            	brith:'',
            	address:'',
            	period:''
            };
            
            
            $scope.scanCard = function($event){
        		var suc = function(result) {
        		  alert("suc: "+result.name);
        		};
        		var fail = function(errMsg) {
        		  alert("fail: "+ errMsg);
        		};
        		try{
        			jnappService.idcread(suc, fail);
        		}catch(e){
        			alert(e);
        		}

            }
            
            $scope.useInfo = function($event){
                alert($scope.form);
            }
            
        }]
    );

})();

