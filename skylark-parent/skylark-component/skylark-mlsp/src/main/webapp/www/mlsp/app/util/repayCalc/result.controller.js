(function () {
'use strict';

angular
    .module('util.repayCalc')
    .filter('utilRepayCalcResultBillDate', [
        function () {
            return function (input) {
                return input.replace('~', '\n');
            };
        }
    ])
    .controller('util.repayCalc.ResultCtrl', [
        '$scope',
        '$stateParams',
        '$cordovaClipboard',
        '$ionicPopup',
        'jnUser',
        'jnStorage',
        'jnHelper',
        'jnPhone',
        'jnDateFilter',
        'jnCurrencyFilter',
        'jnUtilRepayCalc',
        function (
            $scope,
            $stateParams,
            $cordovaClipboard,
            $ionicPopup,
            jnUser,
            jnStorage,
            jnHelper,
            jnPhone,
            jnDateFilter,
            jnCurrencyFilter,
            jnUtilRepayCalc
        ) {
            var self = this;

            self.data = jnStorage.get('NEW_REPAY_LIST_DATA');

            self.notify = function () {
                jnUtilRepayCalc.readCustomer({
                    custNo: $stateParams.custNo,
                }).then(function (rsp) {
                    $scope.content = '客户您好！您的贷款【'
                        + self.data.contNoExt
                        + '】，预计在'
                        + jnDateFilter($stateParams.setlDt)
                        + '应还合计'
                        + jnCurrencyFilter(self.data.receivableTotal)
                        + '元，其中：应还本金'
                        + jnCurrencyFilter(self.data.receivablePrcp)
                        + '元，应还利息'
                        + jnCurrencyFilter(self.data.receivableInt)
                        + '元，应还罚息'
                        + jnCurrencyFilter(self.data.receivableOdInt)
                        + '元，应还复利'
                        + jnCurrencyFilter(self.data.receivableCmpdInt)
                        + '元。客户经理【'
                        + jnUser.userName
                        + ' '
                        + jnUser.mobile
                        + '】';

                    $scope.custName = rsp.custName;
                    $scope.phoneNo = rsp.phoneNo;

                    var buttons = [{
                        text: '关闭',
                    }, {
                        text: '复制',
                        type: 'button-positive',
                        onTap: function (e) {
                            $cordovaClipboard.copy($scope.content);
                        },
                    }];

                    if (rsp.phoneNo) {
                        buttons.push({
                            text: '发送',
                            type: 'button-positive',
                            onTap: function (e) {
                                jnPhone.sms($scope.phoneNo, $scope.content);
                            },
                        });
                    }

                    $ionicPopup.show({
                        templateUrl: 'smsDialog.html',
                        scope: $scope,
                        title: '发送短信通知客户',
                        buttons: buttons,
                    });
                });
            };
        }]
    );

})();

