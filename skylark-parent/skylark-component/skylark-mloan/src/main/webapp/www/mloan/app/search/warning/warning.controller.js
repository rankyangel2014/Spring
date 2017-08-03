(function () {
    'use strict';
    angular.module('warning').controller(
        'warningQueryCtrl',
        [
            '$stateParams',
            'jnWarningService',
            'jnHelper',
            '$scope',
            '$state',
            'jnForm',
            'jnUser',
            '$filter',
            function ($stateParams, jnWarningService, jnHelper, $scope, $state, jnForm, jnUser, $filter) {
                var self = this;
                var jyrq = $filter('jnDate')(jnUser.jyrq, 'yyyy-MM-dd');
                self.form = {dueDate: jyrq, overdueDays: 7, oper:'1'};
                self.justManager = jnUser.getMaxStation() == '400';//客户经理
                self.justTeamManager = jnUser.getMaxStation() == '500';//团队经理
                self.justSysManager = jnUser.getMaxStation() == '566';//后台人员

                //团队经理
                if (self.justTeamManager || self.justSysManager) {
                    self.form.deptId = jnUser.deptId;
                }
                //客户经理
                if (self.justManager) {
                    self.form.custManagerNo = jnUser.userId;
                }

                self.submit = function () {
                    jnForm.validate(self.myForm)
                        .then(function () {
                            $state.go('warningList', self.form);
                        });
                };
                var date = new Date(jyrq);
                var time = date.getTime();
                self.changeDay = function () {
                    if (self.form.overdueDays) {
                        self.form.dueDate = new Date(self.form.dueDate).setTime(time + ((86400000 * self.form.overdueDays)));
                        console.log(self.form.overdueDays);
                    } else {
                        self.form.dueDate = date;
                    }
                }
                self.changeDay();

            }]);
})();
