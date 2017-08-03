(function () {
'use strict';

angular
    .module('util.repayCalc')
    .controller('util.repayCalc.SearchCtrl', [
        '$state', 'jnForm', 'jnHelper',
        function ($state, jnForm, jnHelper) {
            var self = this;

            self.form = {};

            self.submit = function () {
                if (self.form.actvDtFrom
                    && self.form.actvDtTo
                    && self.form.actvDtTo < self.form.actvDtFrom
                ) {
                    jnHelper.alert('放款截止日期不能小于放款开始日期，请重新选择！');
                    return false;
                }

                $state.go('utilRepayCalcList', {
                    custName: self.form.custName,
                    contNoExt: self.form.contNoExt,
                    actvDtFrom: jnForm.rspDateFromJsDate(self.form.actvDtFrom),
                    actvDtTo: jnForm.rspDateFromJsDate(self.form.actvDtTo),
                });
            };
        }]
    );

})();

