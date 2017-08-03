(function () {
'use strict';

angular
    .module('util.repayCalc')
    .controller('util.repayCalc.PrepayCtrl', [
        'jnPage',
        'jnUtilRepayCalc',
        function (
            jnPage,
            jnUtilRepayCalc
        ) {
            var ctrl = this;

            var sum = function (arr, field) {
                return arr.reduce(function (s, e) {
                    return s + e[field];
                }, 0);
            };

            jnUtilRepayCalc.genAheadRepaySchedList(jnPage.params)
                .then(function (rsp) {
                    ctrl.list = rsp;
                    ctrl.numberOfDaysSum = sum(rsp, 'numberOfDays');
                    ctrl.instmAmtSum = sum(rsp, 'instmAmt');
                    ctrl.instmPrcpSum = sum(rsp, 'instmPrcp');
                    ctrl.instmIntSum = sum(rsp, 'instmInt');
                });
        }]
    );

})();

