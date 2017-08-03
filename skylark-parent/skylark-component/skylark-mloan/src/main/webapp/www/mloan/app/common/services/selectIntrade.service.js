(function() {
'use strict';

angular
    .module('common')
    .factory('jnSelectIntrade', [
        '$rootScope',
        '$compile',
        'jnUser',
        'jnHttp',
        'jnHelper',
        function (
            $rootScope,
            $compile,
            jnUser,
            jnHttp,
            jnHelper
        ) {
            var FORM_TMPL = '\
<div id="select-intrade-form-popover" class="jn-popover">\
    <div class="bar bar-header bar-positive" style="position: static;">\
        <div class="buttons buttons-left">\
            <span class="left-buttons">\
                <button\
                    class="button button-clear ion-chevron-left"\
                    ng-click="close()"\
                >返回</button>\
            </span>\
        </div>\
        <h1 class="title title-center header-item">选择所属行业</h1>\
        <div class="buttons buttons-right">\
            <span class="right-buttons">\
                <button\
                    class="button button-clear"\
                    ng-click="search()"\
                >搜索</button>\
            </span>\
        </div>\
    </div>\
    <jn-form>\
        <ion-list>\
            <ion-item\
                class="item-input item-select"\
            >\
                <span class="input-label">门类</span>\
                <jn-select-intrade-category\
                    ng-model="params.firstType"\
                    level="1"\
                ></jn-select-intrade-category>\
            </ion-item>\
            <ion-item\
                class="item-input item-select"\
            >\
                <span class="input-label">大类</span>\
                <jn-select-intrade-category\
                    ng-model="params.secondType"\
                    level="2"\
                    parent="params.firstType"\
                ></jn-select-intrade-category>\
            </ion-item>\
            <ion-item\
                class="item-input item-select"\
            >\
                <span class="input-label">中类</span>\
                <jn-select-intrade-category\
                    ng-model="params.thirdType"\
                    level="3"\
                    parent="params.secondType"\
                ></jn-select-intrade-category>\
            </ion-item>\
            <ion-item\
                class="item-input"\
            >\
                <span class="input-label">类别名称</span>\
                <input\
                    type="text"\
                    ng-model="params.typeName"\
                    placeholder="请输入类别名称"\
                />\
            </ion-item>\
            <ion-item\
                class="item-input"\
            >\
                <span class="input-label">行业代码</span>\
                <input\
                    type="text"\
                    ng-model="params.typeCode"\
                    placeholder="请输入行业代码"\
                />\
            </ion-item>\
        </ion-list>\
    </jn-form>\
</div>';

            var LIST_TMPL = '\
<div id="select-intrade-list-popover" class="jn-popover">\
    <div class="bar bar-header bar-positive" style="position: static;">\
        <div class="buttons buttons-left">\
            <span class="left-buttons">\
                <button\
                    class="button button-clear ion-chevron-left"\
                    ng-click="back()"\
                >返回</button>\
            </span>\
        </div>\
        <h1 class="title title-center header-item">选择所属行业</h1>\
    </div>\
    <ion-content class="has-header" overflow-scroll="true">\
        <ion-list ng-if="0 < list.items.length">\
            <ion-item\
                ng-repeat="e in list.items"\
                ng-click="select(e)"\
            >\
                {{ e.levelCode }} {{ e.inTradeName }}\
            </ion-item>\
        </ion-list>\
        <div\
            ng-if="0 === list.items.length"\
            class="no_record"\
        >暂无记录</div>\
        <button\
            ng-click="more()"\
            ng-if="list.items.length < list.total"\
            class="button button-clear button-full button-positive"\
        >点击加载更多</button>\
    </ion-content>\
</div>';

            var scope = $rootScope.$new();

            scope.params = {};

            var formPopover, listPopover, callback;

            var init = function () {
                formPopover = $compile(FORM_TMPL)(scope);
                listPopover = $compile(LIST_TMPL)(scope);

                // 避免 directive 被重复编译
                setTimeout(function () {
                    document.body.appendChild(formPopover[0]);
                    document.body.appendChild(listPopover[0]);
                }, 10);
            };

            var open = function (fn) {
                init();
                formPopover.addClass('show');
                callback = fn;
            };

            var close = function () {
                formPopover.remove();
                listPopover.remove();
                scope.params = {};//clear last query parameter 
            };

            scope.back = function () {
                listPopover.removeClass('show');
                formPopover.addClass('show');
                
            };

            var readList = function (params) {
                return jnHttp.post(
                    '/mloan/router/rest/PubCustomerAction.do?method=intradeCodeInfoQuery',
                    params
                ).then(function (rsp) {
                    return {
                        items: rsp.root,
                        total: rsp.total,
                    };
                });
            };

            scope.search = function () {
                var pf = jnHelper.PaginateFetcher(readList)
                    .params(scope.params);

                scope.list = pf.records();

                scope.more = function () {
                    pf.fetch().then(function (rsp) {
                        // 这里可以进一步处理
                    });
                };

                scope.more();

                formPopover.removeClass('show');
                listPopover.addClass('show');
            };

            scope.select = function (intrade) {
                close();

                callback({
                    code: intrade.levelCode,
                    name: intrade.inTradeName,
                });
            };
           
            scope.close = close;

            return {
                open: open,
                close: close,
            };
        }
    ]);

})();
