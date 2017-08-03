/**
 * 多选
 */

(function() {
'use strict';

angular
    .module('common')
    .factory('jnMultiSelect', [
        '$rootScope',
        '$compile',
        'jnUser',
        'jnHttp',
        'jnHelper',
        'jnApp',
        function (
            $rootScope,
            $compile,
            jnUser,
            jnHttp,
            jnHelper,
            jnApp
        ) {
            var TMPL = '\
<div id="multi-select-popover" class="jn-popover show">\
    <div class="bar bar-header bar-positive" style="position: static;">\
        <div class="buttons buttons-left">\
            <span class="left-buttons">\
                <button\
                    class="button button-clear"\
                    ng-click="close()"\
                >取消</button>\
            </span>\
        </div>\
        <h1 class="title title-center header-item">{{ title }}</h1>\
        <div class="buttons buttons-right">\
            <span class="right-buttons">\
                <button\
                    class="button button-clear"\
                    ng-click="select()"\
                >确定</button>\
            </span>\
        </div>\
    </div>\
    <ion-content class="has-header">\
        <jn-form>\
            <ion-list>\
                <ion-item\
                    class="item-toggle"\
                    ng-repeat="opt in options"\
                >\
                    <span class="checkbox_label">{{ opt.label }}</span>\
                    <label class="toggle">\
                        <input\
                            type="checkbox"\
                            value="{{ opt.value }}"\
                            ng-model="dummy"\
                            ng-checked="opt.selected"\
                            ng-disabled="opt.readonly"\
                        >\
                        <div class="track"><div class="handle"></div></div>\
                    </label>\
                </ion-item>\
            </ion-list>\
        </jn-form>\
    </ion-content>\
</div>';

            var popover, callback;

            var open = function (params) {
                var scope = $rootScope.$new();
                scope.title = params.title || '';
                scope.options = params.options || [];
                scope.close = close;
                scope.select = select;

                callback = params.callback;

                popover = $compile(TMPL)(scope)[0];

                // 避免 directive 被重复编译
                setTimeout(function () {
                    jnApp.onBackBtn(close);
                    document.body.appendChild(popover);
                }, 10);
            };

            var close = function () {
                jnApp.restoreOnBackBtn();
                document.body.removeChild(popover);
            };

            var select = function () {
                var selected_values = [];
                var selected_labels = [];

                var labels = popover.querySelectorAll('.checkbox_label');
                var checkboxes = popover.querySelectorAll('[type="checkbox"]');

                Array.prototype.forEach.call(checkboxes, function (e, i) {
                    if (e.checked) {
                        selected_labels.push(labels[i].textContent);
                        selected_values.push(e.value);
                    }
                });

                callback(selected_values, selected_labels);

                close();
            };

            return {
                open: open,
                close: close,
            };
        }
    ]);

})();
