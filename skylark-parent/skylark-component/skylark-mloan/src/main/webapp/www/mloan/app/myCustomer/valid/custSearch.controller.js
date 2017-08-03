(function () {
'use strict';

angular
    .module('custSearch')
    .controller('custSearch.SearchCtrl', [
        '$scope','$state', 'jnUser', 'jnForm',
        function ($scope,$state, jnUser, jnForm) {
            var self = this;

            self.form = {
                custClass: '0',
                setlFlag:'N'
            };

            self.justManager = jnUser.getMaxStation()=='400';//客户经理
            self.justTeamManager = jnUser.getMaxStation()=='500';//团队经理
            self.justSysManager = jnUser.getMaxStation()=='566';//后台人员

            //团队经理
            if(self.justTeamManager || self.justSysManager){
                self.form.deptId = jnUser.deptId;
            }
            //客户经理
            if(self.justManager){
                self.form.custManagerNo = jnUser.userId;
                self.form.deptId = jnUser.deptId;
            }
            
            //判断是否为客户经理
            if (jnUser.equalStations('400')) {
                $scope.isManagerFlag=true;
                self.form.custManagerNo = jnUser.userId;
            }else{
            	 $scope.isManagerFlag=false;
            }

            self.submit = function () {
                jnForm.validate(self.searchForm)
                    .then(function () {
                        $state.go('myCustomer', self.form);
                    });
            };

            self.onChangePaperType = function () {
                self.form.paperNo = '';
            };
            self.onChangeCustType = function () {
            	if (self.form.custType == "0"){
            		self.form.paperType = '0';//如果选择个人，则证件号码默认选中身份证
            	}else{
            		self.form.paperType = '';
            	}
                self.onChangePaperType();
            };            
        }]
    );

})();
