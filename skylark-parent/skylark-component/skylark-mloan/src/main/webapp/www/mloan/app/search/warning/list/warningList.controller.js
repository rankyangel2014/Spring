(function () {
    'use strict';
    angular.module('warning').controller(
        'warningListCtrl',
        [
            '$stateParams',
            'jnWarningService',
            '$ionicActionSheet',
            '$scope',
            'jnHelper',
            'jnUser',
            'jnPhone',
            '$filter',
            'jnDateFilter',
            'jnCurrencyFilter',
            function ($stateParams,
                      jnWarningService,
                      $ionicActionSheet,
                      $scope,
                      jnHelper,
                      jnUser,
                      jnPhone,
                      $filter,
                      jnDateFilter,
                      jnCurrencyFilter) {
                $scope.title = '将到期预警结果';
                var message = undefined;//提醒的消息内容
                var title = '贷款将到期提醒';
                var pf = jnHelper.PaginateFetcher(jnWarningService.getWarningList)
                    .params($stateParams);
                $scope.list = pf.records();
                $scope.more = function () {
                    pf.fetch().then(function (rsp) {
                        // 这里可以进一步处理
                    });
                };
                $scope.more();


                // 检查qq是否安装
                $scope.checkQQ = function () {
                    YCQQ.checkClientInstalled(function () {
                        //alert('qq is installed');
                    }, function () {
                        jnHelper.alert('请安装QQ后进行分享！');
                        return;
                    });
                }

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
                        text: message,
                        scene: Wechat.Scene.SESSION
                    }, function () {
                        //alert("分享成功！");
                    }, function (reason) {
                        //alert("Failed: " + reason);
                    });
                }


                $scope.shareMessage = function (e) {
                    message = '客户您好！您的贷款【'
                        + e.loanNoExt
                        + '】，预计在'
                        + jnDateFilter(e.nextDueDt)
                        + '应还合计'
                        + jnCurrencyFilter(e.dueAmt)
                        + '元，其中：应还本金'
                        + jnCurrencyFilter(e.curPrcp)
                        + '元，应还利息'
                        + jnCurrencyFilter(e.curInt)
                        + '元。客户经理【'
                        + jnUser.userName
                        + ' '
                        + jnUser.mobile
                        + '】';

                    var onClick = [
                        function () {//分享到微信
                            $scope.shareTextToWechat();
                        },
                        function () {//发送短信
                            jnPhone.sms('', message);
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
            }]);
})();
