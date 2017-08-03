(function () {
    'use strict';

    angular
        .module('myBusiness')
        .controller('loanCheckDetailCtrl', [
            '$stateParams', 'jnUser', '$scope', 'jnPage', 'jnHelper', 'jnLoanCheckService',
            function ($stateParams, jnUser, $scope, jnPage, jnHelper, jnLoanCheckService) {
                jnLoanCheckService.getCheck({
                    loanNo: $stateParams.loanNo,
                    checkDate: $stateParams.checkDate
                }).then(function (rsp) {
                    $scope.it = {};
                    $scope.it.realCheckDate = rsp.data.realCheckDate;
                    $scope.it.surveyType = rsp.data.surveyType;
                    $scope.it.content = rsp.data.content;
                    $scope.it.propose = rsp.data.propose;
                });
            }]
        );
})();

