(function () {
    'use strict';

    angular
        .module('loanCalc')
        .controller('loanCalc.ListCtrl',
            ['$stateParams', 'jnHelper',
                'jnHttp', '$scope',
                'jnLoanCalcService',
                '$ionicActionSheet',
                'jnPhone',
                'jnDateFilter',
                'jnCurrencyFilter',
                '$filter',
                '$state',
                function ($stateParams, jnHelper,
                          jnHttp, $scope,
                          jnLoanCalcService,
                          $ionicActionSheet,
                          jnPhone,
                          jnDateFilter,
                          jnCurrencyFilter,
                          $filter,$state) {

                    $scope.it = $stateParams;

                    var planList = [];
                    var message = '';
                    jnLoanCalcService.genPaySched($stateParams).then(
                        function (rsp) {
                            var lxze = 0;
                            var hkze = 0;
                            $scope.items = rsp.root;
                            rsp.root.forEach(function (e) {
                                if (e.perdNo != '0') {
                                    var plan = '';
                                    if (e.instmPrcp == '0') {

                                        plan = '第' + (e.perdNo) + '期:还款' + jnCurrencyFilter(e.instmAmt) + '元（利息' + jnCurrencyFilter(e.instmInt) + '元），\n';
                                    } else {

                                        plan = '第' + (e.perdNo) + '期:还款' + jnCurrencyFilter(e.instmAmt) + '元（利息' + jnCurrencyFilter(e.instmInt) + '元）。';
                                    }
                                    planList.push(plan);
                                }
                                hkze = hkze + e.instmAmt;
                                lxze = lxze + e.instmInt;
                            });
                            $scope.it.lx = lxze;
                            $scope.it.bx = hkze;

                            message = '客户您好！如贷款本金'
                                + jnCurrencyFilter($scope.it.exapAmt) + '元，年利率'
                                + $filter('number')($scope.it.intRate, 4) + '%，采用'
                                + $filter('jnConstant')($scope.it.repayTyp, 327) + '方式，贷款期限从'
                                + jnDateFilter($scope.it.intStartDt) + '至'
                                + jnDateFilter($scope.it.lastDueDt) + '，那么您总共需要归还本息'
                                + jnCurrencyFilter($scope.it.bx) + '元（其中利息'
                                + jnCurrencyFilter($scope.it.lx) + '）元。还款明细如下：\n';


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
                                text: message + planList.toString(),
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
                            function () {//发送短信
                                jnPhone.sms('', message + planList.toString());
                            }
                        ];

                        var hide = $ionicActionSheet.show({
                            titleText: '分享',
                            buttons: [{
                                text: '微信',
                            }, {
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

