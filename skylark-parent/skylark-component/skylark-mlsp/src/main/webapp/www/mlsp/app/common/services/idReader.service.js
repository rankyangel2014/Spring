/**
 * 身份证信息读取
 */

(function() {
'use strict';

angular
    .module('common')
    .factory('jnIdReader', [
        '$rootScope',
        '$compile',
        '$interval',
        'jnappService',
        'jnHelper',
        function (
            $rootScope,
            $compile,
            $interval,
            jnappService,
            jnHelper
        ) {
            var TMPL = '\
<div id="id-scan-popover">\
    <div class="bar bar-header bar-positive" style="position: static;">\
        <div class="buttons buttons-left">\
            <span class="left-buttons">\
                <button\
                    class="button button-clear ion-chevron-left"\
                    ng-click="close()"\
                >返回</button>\
            </span>\
        </div>\
        <h1 class="title title-center header-item">身份证扫描</h1>\
    </div>\
    <ion-list>\
        <ion-item>\
            <img src="{{ pic }}" ng-if="pic" />\
        </ion-item>\
        <ion-item>姓名\
            <span class="item-note">{{ name }}</span>\
        </ion-item>\
        <ion-item>证件号码\
            <span class="item-note">{{ id }}</span>\
        </ion-item>\
        <ion-item>性别\
            <span class="item-note">{{ gender }}</span>\
        </ion-item>\
        <ion-item>民族\
            <span class="item-note">{{ nation }}</span>\
        </ion-item>\
        <ion-item>生日\
            <span class="item-note">{{ birth }}</span>\
        </ion-item>\
        <ion-item>住址\
            <span class="item-note">{{ address }}</span>\
        </ion-item>\
        <ion-item>有效期限\
            <span class="item-note">{{ period }}</span>\
        </ion-item>\
        <ion-item>签发单位\
            <span class="item-note">{{ signer }}</span>\
        </ion-item>\
    </ion-list>\
    <div class="row">\
        <div class="col"></div>\
        <div class="col">\
            <a\
                class="button button-calm button-full"\
                ng-disabled="\'\' === id"\
                ng-click="done()"\
            >使用信息</a>\
        </div>\
        <div class="col"></div>\
    </div>\
</div>';

            var scope = $rootScope.$new();
            var popover, callback, intvl;

            var clean = function () {
                scope.id = '';
                scope.pic = '';
                scope.period = '';
                scope.address = '';
                scope.name = '';
                scope.birth = '';
                scope.nation = '';
                scope.gender = '';
                scope.signer = '';
                scope.$apply();
            };

            var update = function (data) {
                scope.id = data.id;
                scope.pic = data.touxiang + '?ts=' + Date.now();
                scope.address = data.address;
                scope.name = data.name;
                scope.birth = data.year + '-'
                    + data.month + '-' + data.day;
                scope.nation = data.minzu;
                scope.gender = data.gender;
                scope.signer = data.qianfa;
                scope.period = data.youxiao;
                scope.periodStart = new Date(
                    data.youxiao.split('-')[0]);
                scope.periodEnd = new Date(
                    data.youxiao.split('-')[1]);
                scope.$apply();
            };

            var open = function (fn) {
                clean();
                popover.addClass('show');
                callback = fn;

                intvl = $interval(function () {

                    // 如果尝试读取身份证而身份证不在读取区域，会提示错误
                    // 之后把身份证放在读取区域再次试图读取，
                    // 包含这段注释的函数（不是接下来的代码块而是其父函数）
                    // 会被执行两次，原因不明，怀疑是某个 AngularJS 的机制。
                    // 使用 setTimeout 能 hack 这个 bug。
                    setTimeout(function () {
                        jnappService.idcread(
                            function ok(res) {
                                if ('0' === res.code) {
                                    update(res);
                                    $interval.cancel(intvl);
                                } else {
                                    // jnHelper.alert(res.errMsg);
                                }
                            },
                            function err(errMsg) {
                                jnHelper.alert(res.errMsg);
                            }
                        );
                    }, 10);
                    }, 1000);
            };

            var close = function () {
                $interval.cancel(intvl);
                popover.removeClass('show');
            };

            scope.read = function () {
                clean();

                // 如果尝试读取身份证而身份证不在读取区域，会提示错误
                // 之后把身份证放在读取区域再次试图读取，
                // 包含这段注释的函数（不是接下来的代码块而是其父函数）
                // 会被执行两次，原因不明，怀疑是某个 AngularJS 的机制。
                // 使用 setTimeout 能 hack 这个 bug。
                setTimeout(function () {
                    jnappService.idcread(
                        function ok(res) {
                            if ('0' === res.code) {
                                scope.id = res.id;
                                scope.pic = res.touxiang;
                                scope.address = res.address;
                                scope.name = res.name;
                                scope.birth = res.year + '-'
                                    + res.month + '-' + res.day;
                                scope.nation = res.minzu;
                                scope.gender = res.gender;
                                scope.signer = res.qianfa;
                                scope.period = res.youxiao;
                                scope.periodStart = new Date(
                                    res.youxiao.split('-')[0]);
                                scope.periodEnd = new Date(
                                    res.youxiao.split('-')[1]);
                                scope.$apply();

                            } else {
                                jnHelper.alert(res.errMsg);
                            }
                        },
                        function err(errMsg) {
                            jnHelper.alert(res.errMsg);
                        }
                    );
                }, 10);
            };

            scope.done = function () {
                popover.removeClass('show');

                callback({
                    id: scope.id,
                    pic: scope.pic,
                    period: scope.period,
                    periodStart: scope.periodStart,
                    periodEnd: scope.periodEnd,
                    address: scope.address,
                    name: scope.name,
                    birth: scope.birth,
                    nation: scope.nation,
                    gender: scope.gender,
                    signer: scope.signer,
                });
            };

            scope.close = close;

            popover = $compile(TMPL)(scope);

            // 避免 directive 被重复编译
            setTimeout(function () {
                document.body.appendChild(popover[0]);
            }, 10);

            return {
                open: open,
                close: close,
            };
        }
    ]);

})();
