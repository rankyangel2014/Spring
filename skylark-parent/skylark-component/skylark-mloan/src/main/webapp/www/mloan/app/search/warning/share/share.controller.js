(function () {
    'use strict';
    angular
        .module('warning')
        .controller(
            'shareMessageCtrl',
            [
                '$stateParams',
                'jnWarningService',
                'jnHelper',
                '$scope',
                '$state',
                'jnForm',
                'jnUser',
                '$filter',
                function ($stateParams, jnWarningService, jnHelper,
                          $scope, $state, jnForm, jnUser, $filter) {

                    var self = this;

                    //self.checkWechat = checkWechat;
                    //self.shareTextToTimeline = shareTextToTimeline;
                    //self.shareTextToWechat = shareTextToWechat;
                    // self.shareImgToTimeline = shareImgToTimeline;
                    // self.shareImgToWechat = shareImgToWechat;
                    //self.checkQQ = checkQQ;
                    //self.shareTextToQQ = shareTextToQQ;
                    //self.shareTextToQzone = shareTextToQzone;

                    // 检查qq是否安装
                    self.checkQQ = function () {
                        YCQQ.checkClientInstalled(function () {
                            //alert('qq is installed');
                        }, function () {
                            jnHelper.alert('请安装QQ后进行分享！');
                            return;
                        });
                    }

                    // 分享文字到qq
                    self.shareTextToQQ = function () {
                        self.checkQQ();
                        var args = {};
                        //args.url = "";
                        args.title = "将到期预警";
                        args.description = "张三的贷款12345于20150202日将要到期，请在到期日之前及时还款。";
                        //args.imageUrl = "https://www.baidu.com/img/bdlogo.png";
                        args.appName = "微贷助手";
                        YCQQ.shareToQQ(function () {
                            alert("分享成功！");
                        }, function (failReason) {
                            alert(failReason);
                        }, args);
                    }

                    // 分享文字到Qzone
                    self.shareTextToQzone = function () {
                        var args = {};
                        //args.url = "http://www.baidu.com";
                        args.title = "将到期预警";
                        args.description = "张三的贷款12345于20150202日将要到期，请在到期日之前及时还款。";
                        //var imgs = [
                        //    'https://www.baidu.com/img/bdlogo.png',
                        //    'https://www.baidu.com/img/bdlogo.png',
                        //    'https://www.baidu.com/img/bdlogo.png'];
                        //args.imageUrl = imgs;
                        YCQQ.shareToQzone(function () {
                            alert("分享成功！");
                        }, function (failReason) {
                            alert(failReason);
                        }, args);
                    }

                    // 检查微信是否安装
                    self.checkWechat = function () {
                        Wechat.isInstalled(function (installed) {

                            if(!installed){

                                jnHelper.alert('请安装微信后进行分享！');
                            }

                        }, function (reason) {
                            console.log(reason);
                        });
                    }

                    // 分享文字到朋友圈
                    self.shareTextToTimeline = function () {
                        self.checkWechat();
                        Wechat.share({
                            text: "张三的贷款12345于20150202日将要到期，请在到期日之前及时还款。",
                            scene: Wechat.Scene.TIMELINE
                            // share to Timeline
                        }, function () {
                            alert("分享成功！");
                        }, function (reason) {
                            alert("Failed: " + reason);
                        });
                    }

                    // 分享文字到微信好友
                    self.shareTextToWechat = function () {
                        Wechat.share({
                            text: "张三的贷款12345于20150202日将要到期，请在到期日之前及时还款。",
                            scene: Wechat.Scene.SESSION
                        }, function () {
                            alert("分享成功！");
                        }, function (reason) {
                            alert("Failed: " + reason);
                        });
                    }

                    // 分享图片到朋友圈
                    // function shareImgToTimeline() {
                    // Wechat.share({
                    // message: {
                    // title: "[TITLE]share test",
                    // description: "[DSP]Sending from test
                    // application",
                    // mediaTagName: "TEST-TAG-001",
                    // messageExt: "just test",
                    // messageAction: "<action>dotalist</action>",
                    // media: {
                    // type: Wechat.Type.IMAGE,
                    // image: "www/img/contacts.png"
                    // }
                    // },
                    // scene: Wechat.Scene.TIMELINE
                    // }, function() {
                    // alert("Success");
                    // }, function(reason) {
                    // alert("Failed: " + reason);
                    // });
                    // }

                    //分享图片到微信好友
                    function shareImgToWechat() {
                        Wechat.share({
                            message: {
                                title: "share test",
                                description: "[TEST]Sending from testapplication",
                                mediaTagName: "TEST-TAG-001",
                                messageExt: "这是第三方带的测试字段",
                                messageAction: "<action>dotalist</action>",
                                media: {
                                    type: Wechat.Type.IMAGE,
                                    image: "www/img/contacts.png"
                                }
                            },
                            scene: Wechat.Scene.SESSION
                        }, function () {
                            alert("Success");
                        }, function (reason) {
                            alert("Failed: " + reason);
                        });
                    }

                }]);
})();
