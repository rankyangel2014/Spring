(function () {
    'use strict';

    angular
        .module('app')
        .controller(
            'ShareCtrl',
            [
                '$ionicActionSheet',
                '$scope',
                'jnHelper',
                '$http',
                'jnApp',
                function ($ionicActionSheet, $scope, jnHelper,
                          $http, jnApp) {
                    var message = '帮助小微贷相关岗位人员随时随地查询客户数据和信贷数据，实时掌握动态，精确提高办事效率。';
                    var url = 'https://www.jnjlh.com/skylarkMloan/_update/download/downloadMloan.html';
                    var title = '下载金农微贷助手';
                    var imageUrl = 'http://pp.myapp.com/ma_icon/0/icon_42281657_1462942391/256';

                    // 检查qq是否安装
                    $scope.checkQQ = function () {
                        YCQQ.checkClientInstalled(function () {
                        }, function () {
                            jnHelper.alert('请安装QQ后进行分享！');
                            return;
                        });
                    };

                    // 分享文字到QQ
                    $scope.shareTextToQQ = function () {
                        $scope.checkQQ();
                        var args = {};
                        args.url = url;
                        args.title = title;
                        args.description = message;
                        args.appName = "微贷助手";
                        args.imageUrl = imageUrl;
                        YCQQ.shareToQQ(function () {
                        }, function (failReason) {
                        }, args);
                    };

                    // 检查微信是否安装
                    $scope.checkWechat = function () {
                        Wechat.isInstalled(function (installed) {

                            if (!installed) {

                                jnHelper.alert('请安装微信后进行分享！');
                            }

                        }, function (reason) {
                            console.log(reason);
                        });
                    };

                    // 分享文字到微信好友
                    $scope.shareTextToWechat = function () {
                        $scope.checkWechat();
                        Wechat.share({
                            message: {
                                title: title,
                                description: message,
                                thumb: imageUrl,
                                media: {
                                    type: Wechat.Type.WEBPAGE,
                                    webpageUrl: url,
                                }
                            },
                            scene: Wechat.Scene.SESSION
                        }, function () {
                        }, function (reason) {
                        });
                    };

                    $scope.shareMessage = function (e) {
                        console.log(message);
                        // $http({
                        // method: "GET",
                        // url: jnApp.baseUrl +
                        // "/skylark/share/genUrl.do",
                        // timeout: 15000,
                        // params: {message: message},
                        // }).then(function (rsp) {
                        // console.log(rsp);
                        // url = jnApp.baseUrl +
                        // "/mloan/template/forwordPage.do?messageId="
                        // + rsp.data;
                        // }, function (rsp) {
                        //
                        // console.error(rsp);
                        // });
                        var onClick = [function () {// 分享到微信
                            $scope.shareTextToWechat();
                        }, function () {// 分享到QQ
                            $scope.shareTextToQQ();
                        }];

                        var hide = $ionicActionSheet.show({
                            titleText: '分享',
                            buttons: [{
                                text: '微信',
                            }, {
                                text: 'QQ',
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
