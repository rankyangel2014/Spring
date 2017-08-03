(function () {
'use strict';

angular
    .module('search.customer')
    .controller('search.customer.SearchCtrl', [
        '$state', 'jnUser', 'jnForm',
        function ($state, jnUser, jnForm) {
            var self = this;

            self.form = {};
            self.justManager = jnUser.equalStations('400');

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

