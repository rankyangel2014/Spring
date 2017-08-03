/**
 * 身份证信息读取
 */

(function() {
'use strict';

angular
    .module('common')
    .factory('jnSelectCustomer', [
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
<div id="select-customer-form-popover" class="jn-popover">\
    <div class="bar bar-header bar-positive" style="position: static;">\
        <div class="buttons buttons-left">\
            <span class="left-buttons">\
                <button\
                    class="button button-clear ion-chevron-left"\
                    ng-click="close()"\
                >返回</button>\
            </span>\
        </div>\
        <h1 class="title title-center header-item">选择客户</h1>\
        <div class="buttons buttons-right">\
            <span class="right-buttons">\
                <button\
                    class="button button-clear"\
                    ng-click="search()"\
                >搜索</button>\
            </span>\
        </div>\
    </div>\
    <jn-form name="ctrl.searchForm">\
        <ion-list>\
            <ion-item\
                class="item-input"\
            >\
                <span class="input-label">客户名称</span>\
                <input\
                    type="text"\
                    ng-model="params.custName"\
                    placeholder="请输入客户名称"\
                />\
            </ion-item>\
            <ion-item\
                class="item-input item-select"\
            >\
                <span class="input-label">客户类型</span>\
                <select\
                    ng-model="params.custType"\
                    jn-options="5028"\
                ></select>\
            </ion-item>\
            <ion-item\
                class="item-input item-select"\
            >\
                <span class="input-label">客户类别</span>\
                <select\
                    ng-model="params.custClass"\
                    jn-options="7507"\
                ></select>\
            </ion-item>\
        </ion-list>\
    </jn-form>\
</div>';

            var LIST_TMPL = '\
<div id="select-customer-list-popover" class="jn-popover">\
    <div class="bar bar-header bar-positive" style="position: static;">\
        <div class="buttons buttons-left">\
            <span class="left-buttons">\
                <button\
                    class="button button-clear ion-chevron-left"\
                    ng-click="back()"\
                >返回</button>\
            </span>\
        </div>\
        <h1 class="title title-center header-item">选择客户</h1>\
    </div>\
    <ion-content class="has-header" overflow-scroll="true">\
        <ion-list ng-if="0 < customers.items.length">\
            <ion-item\
                ng-repeat="e in customers.items"\
                ng-click="select(e)"\
            >\
                <div class="jn-item-title name" data-type="{{ e.custType }}">{{ e.custName }}</div>\
                <div class="id">{{ e.paperNo || e.liceNo }}</div>\
                <div class="manager">{{ e.custManagerName }}</div>\
                <div class="meta">\
                    <span\
                        ng-show="{{ e.grntFlag === \'0\' }}"\
                        class="ion-android-checkmark-circle"\
                    >担保</span>\
                    <span\
                        ng-show="{{ e.loanFlag === \'0\' }}"\
                        class="ion-android-checkmark-circle"\
                    >贷款</span>\
                </div>\
            </ion-item>\
        </ion-list>\
        <div\
            ng-if="0 === customers.items.length"\
            class="no_record"\
        >暂无记录</div>\
        <button\
            ng-click="more()"\
            ng-if="customers.items.length < customers.total"\
            class="button button-clear button-full button-positive"\
        >点击加载更多</button>\
    </ion-content>\
</div>';

            var scope = $rootScope.$new();

            scope.params = {};

            var formPopover, listPopover, callback;

            var open = function (custNo, fn) {
                scope.params = {
                    custNo: custNo,
                };
                formPopover.addClass('show');
                callback = fn;
            };

            var close = function () {
                formPopover.removeClass('show');
            };

            scope.back = function () {
                listPopover.removeClass('show');
                formPopover.addClass('show');
            };

            var readList = function (params) {
                return jnHttp.post(
                    '/mlsp/router/rest.do?_transCode=QRY105', params)
                    .then(function (rsp) {
                        return {
                            items: rsp.root,
                            total: rsp.total,
                        };
                    });
            };

            scope.search = function () {
                var pf = jnHelper.PaginateFetcher(readList)
                    .params(scope.params);

                scope.customers = pf.records();

                scope.more = function () {
                    pf.fetch().then(function (rsp) {
                        // 这里可以进一步处理
                    });
                };

                scope.more();

                formPopover.removeClass('show');
                listPopover.addClass('show');
            };

            scope.select = function (cust) {
                var cust = jnHelper.arrFind(scope.customers.items,
                    function (e) {
                        return cust.custNo === e.custNo;
                    }
                );

                listPopover.removeClass('show');

                callback(cust);
            };

            scope.close = close;

            formPopover = $compile(FORM_TMPL)(scope);
            listPopover = $compile(LIST_TMPL)(scope);

            // 避免 directive 被重复编译
            setTimeout(function () {
                document.body.appendChild(formPopover[0]);
                document.body.appendChild(listPopover[0]);
            }, 10);

            return {
                open: open,
                close: close,
            };
        }
    ]);

})();
