(function () {
'use strict';

angular
    .module('creditLimit')
    .controller('creditLimit.paramsCtrl', [
        '$state','$scope','jnForm','jnUser','jnHelper','jnValidate',
        function ($state,$scope,jnForm,jnUser,jnHelper,jnValidate) {
        	
            var self = this;

            self.form = {};
            self.justManager = jnUser.getMaxStation()=='400';//客户经理
            self.justTeamManager = jnUser.getMaxStation()=='500';//团队经理
            self.justSysManager = jnUser.getMaxStation()=='566';//团队经理

            //团队经理
            if(self.justTeamManager || self.justSysManager){
                self.form.deptId = jnUser.deptId;
            }
            //客户经理
            if(self.justManager){
                self.form.custManagerNo = jnUser.userId;
            }

            //判断是否为客户经理
           /* var userFlag = true;
            if (jnUser.hasStation('400')) {
            	userFlag = true;
            	self.form.custManagerNo = jnUser.userId;
            }else{
            	userFlag = false;
            }

            $scope.userFlag = userFlag;*/
            
            self.submit = function () {
                if(jnValidate.isGreaterThan(self.form['exapCreAmtFrom'],self.form['exapCreAmtTo'])){
                    jnHelper.alert('授信额度(至多)不能小于授信额度(至少)！','提示');
                    return  ;
                }
                if(jnValidate.isGreaterThan(self.form['startDtFrom'],self.form['startDtTo'])){
                    jnHelper.alert('生效日期(至)不能小于生效日期(从)，请重新选择！','提示');
                    return  ;
                }
                if(jnValidate.isGreaterThan(self.form['endDtFrom'],self.form['endDtTo'])){
                    jnHelper.alert('失效日期(至)不能小于失效日期(从)，请重新选择！','提示');
                    return  ;
                }

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

