(function() {
    'use strict';
    angular.module('advances').controller('AdvancesCtrl',
            [ '$scope','$state','jnAdvancesService','jnForm','jnUser','jnHelper',function($scope,$state,jnAdvancesService,jnForm,jnUser,jnHelper) {
                $scope.title = '放款记录查询';
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
                
                self.submit = function () {
                    
                    if(self.form.dtStart > self.form.dtEnd){
                        jnHelper.alert('放款结束日期不能小于放款开始日期，请重新选择！');
                        return ;
                    }
                    
                    jnForm.validate(self.myForm)
                    .then(function () {
                        $state.go('advancesList', self.form);
                    });
                };
            } ]);
})();
