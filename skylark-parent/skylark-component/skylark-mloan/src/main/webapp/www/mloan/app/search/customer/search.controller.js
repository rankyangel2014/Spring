(function () {
'use strict';

angular
    .module('search.customer')
    .controller('search.customer.SearchCtrl', [
        '$state', 'jnUser', 'jnForm',
        function ($state, jnUser, jnForm) {
            var self = this;

            self.form = {};
            self.justManager = jnUser.getMaxStation()=='400';//客户经理
            self.justTeamManager = jnUser.getMaxStation()=='500';//团队经理
            self.justSysManager = jnUser.getMaxStation()=='566';//后台人员
            self.form.custClass = '0';

            //团队经理
            if(self.justTeamManager || self.justSysManager){
                self.form.deptId = jnUser.deptId;
            }
            //客户经理
            if(self.justManager){
                self.form.custManagerNo = jnUser.userId;
            }

            self.submit = function () {
                jnForm.validate(self.searchForm)
                    .then(function () {
                        $state.go('searchCustomerList', self.form);
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

