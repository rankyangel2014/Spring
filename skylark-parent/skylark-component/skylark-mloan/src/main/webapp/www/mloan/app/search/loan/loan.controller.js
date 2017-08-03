(function() {
    'use strict';
    angular.module('loan').controller(
            'LoanQueryCtrl',
            [
                    '$stateParams',
                    'jnLoanService',
                    'jnHelper',
                    '$scope',
                    '$state',
                    'jnForm',
                    'jnUser',
                    'jnValidate',
                    function($stateParams, jnLoanService, jnHelper, $scope,$state,jnForm,jnUser,jnValidate) {
                        $scope.title = '还款记录查询';
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

                        //var userFlag = true;
                        //
                        //if (jnUser.hasStation('400')) {
                        //    userFlag = true;
                        //    self.form.custManagerNo = jnUser.userId;
                        //}else{
                        //    userFlag = false;
                        //}
                        //
                        //$scope.userFlag = userFlag;

                        self.submit = function() {
                            if(jnValidate.isGreaterThan(self.form.dtStart , self.form.dtEnd)){
                                jnHelper.alert('还款结束日期不能小于还款开始日期，请重新选择！');
                                return ;
                            }
                            
                            jnForm.validate(self.myForm)
                            .then(function () {
                                $state.go('loanList', self.form);
                            });
                        };

                    } ]);

})();
