/**
 * 提供高阶函数和实用函数/类
 */

(function () {
'use strict';

angular
    .module('common')
    .factory('jnHelper', [
        '$ionicPopup',
        function (
            $ionicPopup
        ) {
            var merge = function () {
                var merged = {};

                Array.prototype.forEach.call(arguments, function (e) {
                    var k;

                    for (k in e) {
                        merged[k] = e[k];
                    }
                });

                return merged;
            };

            /**
             * 如果对象某个字段值为 undefined，设置该字段值为空字符串
             **/
            var fillUndef = function (obj) {
                var p;

                for (p in obj) {
                    if (obj.hasOwnProperty(p) && void 0 === obj[p]) {
                        obj[p] = '';
                    }
                };

                return obj;
            };

            var PaginateFetcher = (function () {
                var PF = function (fetch) {
                    var self = this;
                    this.start = 0;
                    this.limit = 10;
                    this._limitParam = 'limit';
                    this._params = {};

                    this._records = {
                        total: 0,
                        items: [],
                    };

                    this._fetch = fetch;
                };

                PF.prototype.constructor = PF;

                PF.prototype.records = function () {
                    return this._records;
                };

                PF.prototype.limit = function (count) {
                    this.limit = count;
                    return this;
                };

                PF.prototype.limitParam = function (name) {
                    this._limitParam = name;
                    return this;
                };

                PF.prototype.params = function (params) {
                    this._params = params;
                    return this;
                };

                PF.prototype.fetch = function () {
                    var self = this;
                    this._params.start = this.start;
                    this._params[this._limitParam] = this.limit;

                    return this._fetch(this._params)
                        .then(function (rsp) {
                            self._records.total = rsp.total;
                            self._records.items = self._records.items.concat(
                                rsp.items);

                            self.start += self.limit;

                            return merge(rsp, self._records);
                        });
                };

                return function (fetch) {
                    return new PF(fetch);
                };
            })();

            var alert = function (msg, title, okText) {
                title = title || '提示';
                okText = okText || '确定';

                return $ionicPopup.alert({
                    title: title,
                    template: msg,
                    okType:'button-positive button-clear',
                    okText: okText,
                    cssClass:'jn-popup'
                });
            };

            var confirm = function (msg, title, okText, cancelText) {
                title = title || '提示';
                okText = okText || '确定';
                cancelText = cancelText || '取消';

                return $ionicPopup.confirm({
                    title: title,
                    template: msg,
                    okText: okText,
                    okType:'button-positive button-clear',
                    cancelText: cancelText,
                    cancelType:'button-positive button-clear',
                    cssClass:'jn-popup'
                });
            };

            var TouchEventListenerDecorator = (function () {
                var TELD = function () {};

                TELD.prototype.start = function (fn) {
                    var self = this;

                    return function (e) {
                        var touch = e.changedTouches[0],
                            x = touch.pageX,
                            y = touch.pageY,
                            xdd = 0,
                            ydd = 0;

                        self._tsStart = e.timeStamp;
                        self._xStart = x;
                        self._yStart = y;

                        fn(e, {
                            x: x,
                            y: y,
                            lastX: null,
                            lastY: null,
                            deltaX: xdd,
                            deltaY: ydd,
                            startX: self._xStart,
                            startY: self._yStart,
                            startTimestamp: self._tsStart,
                            timestamp: e.timeStamp,
                        });

                        self._xLast = x;
                        self._yLast = y;

                        e.preventDefault();
                    };
                };

                TELD.prototype.move = function (fn) {
                    var self = this;

                    return function (e) {
                        var touch = e.changedTouches[0],
                            x = touch.pageX,
                            y = touch.pageY,
                            xdd = x - self._xLast,
                            ydd = y - self._yLast;

                        fn(e, {
                            x: x,
                            y: y,
                            lastX: self._xLast,
                            lastY: self._yLast,
                            deltaX: xdd,
                            deltaY: ydd,
                            startX: self._xStart,
                            startY: self._yStart,
                            startTimestamp: self._tsStart,
                            timestamp: e.timeStamp,
                        });

                        self._xLast = x;
                        self._yLast = y;

                        e.preventDefault();
                    };
                };

                TELD.prototype.end = function (fn) {
                    var self = this;

                    return function (e) {
                        var touch = e.changedTouches[0],
                            x = touch.pageX,
                            y = touch.pageY;

                        fn(e, {
                            x: x,
                            y: y,
                            lastX: self._xLast,
                            lastY: self._yLast,
                            deltaX: 0,
                            deltaY: 0,
                            startX: self._xStart,
                            startY: self._yStart,
                            startTimestamp: self._tsStart,
                            timestamp: e.timeStamp,
                        });
                    };
                };

                return TELD;
            })();

            var arrFind = function (arr, pred) {
                var found = null;

                arr.some(function (e) {
                    if (pred(e)) {
                        found = e;
                        return true;
                    }
                });

                return found;
            };

            var removeArrayItem = function (arr, pred) {
                arr.some(function (e, i, arr) {
                    if (pred(e)) {
                        arr.splice(i, 1);
                        return true;
                    }
                });
            };

            /**
             * 从身份证号获取性别
             */
            var sexFromId = function (id) {
                if (id) {
                    return 0 === Number(id.charAt(16)) % 2 ? 'F' : 'M';
                }

                return '';
            };

            return {
                merge: merge,
                PaginateFetcher: PaginateFetcher,
                fillUndef: fillUndef,
                alert: alert,
                confirm: confirm,
                TouchEventListenerDecorator: TouchEventListenerDecorator,
                arrFind: arrFind,
                removeArrayItem: removeArrayItem,
                sexFromId: sexFromId,
            };
        }
    ]);

})();
