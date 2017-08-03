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
                    function($stateParams, jnLoanService, jnHelper, $scope,$state,jnForm,jnUser) {
                        $scope.title = '还款记录查询';
                        var self = this;

                        self.form = {};
                        
                        var userFlag = true;
                        
                        if (jnUser.hasStation('400')) {
                            userFlag = true;
                            self.form.custManagerNo = jnUser.userId;
                        }else{
                            userFlag = false;
                        }
                        
                        $scope.userFlag = userFlag;

                        self.submit = function() {
                            if(self.form.dtStart > self.form.dtEnd){
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
