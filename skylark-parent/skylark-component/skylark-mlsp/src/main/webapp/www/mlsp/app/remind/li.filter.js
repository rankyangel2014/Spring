/**
 * 对列表项目进行排序
 * 先按类型排序：置顶 -> 未读 -> 已读
 * 各类型再按日期倒序排序
 */

(function () {
'use strict';

angular
    .module('remind')
    .filter('remindLi', [
        function () {
            return function (input) {
                return input.slice().sort(function (a, b) {
                    // a 是置顶而 b 不是，a 排在 b 之前
                    if ('1' === a.operFlag && '0' === b.operFlag) {
                        return -1;
                    }

                    // b 是置顶而 a 不是，a 排在 b 之后
                    if ('0' === a.operFlag && '1' === b.operFlag) {
                        return 1;
                    }

                    // ab 都是置顶或都不是

                    // a 是未读而 b 不是，a 排在 b 之前
                    if ('0' === a.stat && '1' === b.stat) {
                        return -1;
                    }

                    // b 是未读而 a 不是，a 排在 b 之后
                    if ('1' === a.stat && '0' === b.stat) {
                        return 1;
                    }

                    // ab 都是未读或都不是，按日期倒序排序

                    if (a.applyDate < b.applyDate) {
                        return 1;
                    }

                    if (b.applyDate < a.applyDate) {
                        return -1;
                    }

                    return 0;
                });
            };
        }
    ]);

})();
