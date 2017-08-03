(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('myBusinessQry.paramsCtrl', [
        '$state','$scope','jnUser','jnForm','$filter','jnHelper','jnValidate', 'jnPage',
        function ($state,$scope,jnUser,jnForm,$filter,jnHelper,jnValidate, jnPage) {
        	var self = this;
        	self.form = {};

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
            }

        	/*var userFlag = true;
            
            if (jnUser.getMaxStation()=='400') {
            	userFlag = true;
            	self.form.custManagerId = jnUser.userId;
            }else{
            	userFlag = false;
            }
            
            $scope.userFlag = userFlag;*/
            
            self.submit = function () {
                if(self.form['applDtFrom']>self.form['applDtTo']){                    
                    jnHelper.alert('申请日期起止输入错误！','提示');
                    return ;
                }
                if(jnValidate.isGreaterThan(self.form['applAmtFrom'],self.form['applAmtTo'])){
                    jnHelper.alert('申请金额起止输入错误！','提示');
                    return ;
                }

            	jnForm.validate(self.myForm)
                .then(function () {
                	jnPage.back(self.form);
                });
            };

        }]
    );

})();

