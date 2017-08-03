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
            '$ionicActionSheet',
            function ($scope,
                      $stateParams,
                      $cordovaClipboard,
                      $ionicPopup,
                      jnUser,
                      jnStorage,
                      jnHelper,
                      jnPhone,
                      jnDateFilter,
                      jnCurrencyFilter,
                      jnUtilRepayCalc,
                      $ionicActionSheet) {
                var self = this;


                self.data = jnStorage.temp.get('NEW_REPAY_LIST_DATA');

                if ($stateParams.setlTyp == '1') {

                    self.data.aheadSetlPrcp = $stateParams.aheadSetlPrcp;
                    self.data.repayList.forEach(function (e, index, arr) {

                        if (index == (arr.length - 1)) {

                            e.receivablePrcp = $stateParams.aheadSetlPrcp;
                        }
                    });
                }

                self.setlTyp = $stateParams.setlTyp;
                self.setlDt = $stateParams.setlDt;
                self.loanNo = $stateParams.loanNo;
                self.schedAdjTyp = $stateParams.schedAdjTyp;

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
                    + jnCurrencyFilter(self.data.receivableOdInt ? self.data.receivableOdInt : '0.00')
                    + '元，应还复利'
                    + jnCurrencyFilter(self.data.receivableCmpdInt ? self.data.receivableCmpdInt : '0.00')
                    + '元。客户经理【'
                    + jnUser.userName
                    + ' '
                    + jnUser.mobile
                    + '】';

                jnUtilRepayCalc.readCustomer({
                    custNo: $stateParams.custNo,
                }).then(function (rsp) {

                    $scope.phoneNo = rsp.phoneNo;
                });

                // 检查微信是否安装
                $scope.checkWechat = function () {
                    //Wechat.isInstalled(function (installed) {
                    //}, function (reason) {
                    //    jnHelper.alert('请安装微信后进行分享！');
                    //    return;
                    //});
                    Wechat.isInstalled(function (installed) {

                        if(!installed){

                            jnHelper.alert('请安装微信后进行分享！');
                        }

                    }, function (reason) {
                        console.log(reason);
                    });
                }

                // 分享文字到微信好友
                $scope.shareTextToWechat = function () {
                    $scope.checkWechat();
                    Wechat.share({
                            text: $scope.content,
                            scene: Wechat.Scene.SESSION
                        },
                        function () {
                            //alert("分享成功！");
                        },
                        function (reason) {
                            //alert("Failed: " + reason);
                        }
                    )
                    ;
                }


                $scope.shareMessage = function (e) {
                    var onClick = [
                        function () {//分享到微信
                            $scope.shareTextToWechat();
                        },
                        /*function () {//分享到QQ
                         $scope.shareTextToQQ();
                         },*/
                        function () {//发送短信
                            jnPhone.sms($scope.phoneNo ? $scope.phoneNo : '', $scope.content);
                        }
                    ];

                    var hide = $ionicActionSheet.show({
                        titleText: '分享',
                        buttons: [{
                            text: '微信',
                        }, /*{
                         text: 'QQ',
                         },*/ {
                            text: '短信',
                        }],
                        cancelText: '取消',
                        buttonClicked: function (i) {
                            onClick[i]();
                            hide();
                        },
                    });
                };
            }]
        );

})();

