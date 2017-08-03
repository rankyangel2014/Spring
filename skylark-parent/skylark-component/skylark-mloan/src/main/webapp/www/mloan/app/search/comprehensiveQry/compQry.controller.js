(function () {
'use strict';

angular
    .module('comprehensiveQry')
    .controller('compQry.paramsCtrl', [
        '$state','$scope','jnUser','jnForm','jnHelper','jnValidate',
        function ($state,$scope,jnUser,jnForm,jnHelper,jnValidate) {
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
                self.form.custManagerId = jnUser.userId;
            }

        	var jyrq = jnUser.jyrq;
        	jyrq = jyrq.substring(0, 4) + '-'
            + jyrq.substring(4, 6) + '-'
            + jyrq.substring(6, 8);
        	$scope.queryDt = jyrq;
        	
        	/*var userFlag = true;
            
            if (jnUser.hasStation('400')) {
            	userFlag = true;
            }else{
            	userFlag = false;
            }
            
            $scope.userFlag = userFlag;*/
            
            self.form.queryDt = jyrq;
            self.submit = function () {
                //贷款期限
                if(jnValidate.isGreaterThan(self.form['loanPerdFrom'],self.form['loanPerdTo'])){
                    jnHelper.alert('贷款期限开始值不能大于贷款期限结束值，请重新输入！','提示');
                    return ;
                }

                //贷款发放日
                if(jnValidate.isGreaterThan(self.form['intStartDtFrom'],self.form['intStartDtTo'])){
                    jnHelper.alert('贷款发放开始日期不能大于贷款发放到期日期，请重新选择！','提示');
                    return ;
                }

                //执行年利率
                if(jnValidate.isGreaterThan(self.form['intRateFrom'],self.form['intRateTo'])){
                    jnHelper.alert('执行年利率开始值不能大于执行年利率结束值，请重新输入！','提示');
                    return ;
                }
                //贷款金额
                if(jnValidate.isGreaterThan(self.form['exapAmtFrom'],self.form['exapAmtTo'])){
                    jnHelper.alert('贷款金额开始值不能大于贷款金额结束值，请重新输入！','提示');
                    return ;
                }
                //贷款到期日
                if(jnValidate.isGreaterThan(self.form['lastDueDtFrom'],self.form['lastDueDtTo'])){
                    jnHelper.alert('贷款到期日的截止日期不能小于开始日期，请重新选择！','提示');
                    return ;
                }
            	jnForm.validate(self.myForm)
                .then(function () {
                	$state.go('compQryList', self.form);
                });
            };
        }]
    );

})();

