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

            var refine = function (obj, props) {
                var refined = {};
                var p;

                for (p in obj) {
                    if (-1 < props.indexOf(p)) {
                        refined[p] = obj[p];
                    }
                }

                return refined;
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

            var arrFindIdx = function (arr, pred) {
                var idx = -1;

                arr.some(function (e, i) {
                    if (pred(e)) {
                        idx = i;
                        return true;
                    }
                });

                return idx;
            };

            var removeArrayItem = function (arr, pred) {
                var removed = null;

                arr.some(function (e, i, arr) {
                    if (pred(e)) {
                        removed = e;
                        arr.splice(i, 1);
                        return true;
                    }
                });

                return removed;
            };

            var arrayUnique = function () {
                var arr = [];
                var unique = [];
                var last;

                Array.prototype.forEach.call(arguments, function (e) {
                    if (void 0 !== e) {
                        arr = arr.concat(e);
                    }
                });

                arr.sort().forEach(function (e) {
                    if (e !== last) {
                        unique.push(e);
                        last = e;
                    }
                });

                return unique;
            };

            /**
             * 从身份证号获取生日
             */
            var birthFromId = function (id) {
                if (id) {
                    return id.substring(6, 14).replace(
                        /(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                }

                return '';
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

            var ageFromBirth = function (b) {
                var bParts = /(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/.exec(b),
                    by = Number(bParts[1]),
                    bm = Number(bParts[2]),
                    bd = Number(bParts[3]),
                    now = new Date(),
                    ny = now.getFullYear(),
                    nm = now.getMonth() + 1,
                    nd = now.getDate(),
                    age = ny - by;

                if (nm < bm || (nm === bm && nd < bd)) {
                // 今年生日还未到
                    age -= 1;
                }

                return age;
            };

            var ageFromId = function (id) {
                return ageFromBirth(birthFromId(id));
            };

            var angularFilter = function (fn) {
                return function () {
                    var input = arguments[0];

                    if (input) {
                        return fn.apply(null, arguments);
                    }

                    return '';
                };
            };

            var createError = function (name) {
                function E(message) {
                    this.name = name;
                    this.message = message;
                    this.stack = (new Error()).stack;
                }

                E.prototype = Object.create(Error.prototype);
                E.prototype.constructor = E;

                return E;
            };

            var relativeDate = function (d0, d1) {
                var mSeconds, seconds, minutes, hours,
                    days, weeks, months, years;

                mSeconds = d0 - d1;
                seconds = Math.floor(mSeconds / 1000);

                if (Math.abs(seconds) < 1) {
                    return {
                        value: mSeconds,
                        unit: 'ms',
                    };
                }

                minutes = Math.floor(seconds / 60);

                if (Math.abs(minutes) < 1) {
                    return {
                        value: seconds,
                        unit: 's',
                    };
                }

                hours = Math.floor(minutes / 60);

                if (Math.abs(hours) < 1) {
                    return {
                        value: minutes,
                        unit: 'm',
                    };
                }

                days = Math.floor(hours / 24);

                if (Math.abs(days) < 1) {
                    return {
                        value: hours,
                        unit: 'h',
                    };
                }

                weeks = Math.floor(days / 7);

                if (Math.abs(weeks) < 1) {
                    return {
                        value: days,
                        unit: 'd',
                    };
                }

                months = Math.floor(days / 30);

                if (Math.abs(months) < 1) {
                    return {
                        value: weeks,
                        unit: 'w',
                    };
                }

                years = Math.floor(days / 365);

                if (Math.abs(years) < 1) {
                    return {
                        value: months,
                        unit: 'n',
                    };
                }

                return {
                    value: years,
                    unit: 'y',
                };
            };

            /**
             * 计算字符串长度，非ASCII字符算两个字符
             */
            var strlen = function (s) {
                return s.replace(/[^\x00-\xff]/g, 'xx').length;
            };
            
            
            var show = function (e) {
                e.title = e.title || '提示';
                e.buttons = e.buttons || [];
                return $ionicPopup.show({
                    template:e.template,
                    title: e.title,
                    buttons: e.buttons,
                    cssClass: 'jn-popup'
                });
            };


            return {
                merge: merge,
                refine: refine,
                PaginateFetcher: PaginateFetcher,
                fillUndef: fillUndef,
                alert: alert,
                confirm: confirm,
                TouchEventListenerDecorator: TouchEventListenerDecorator,
                removeArrayItem: removeArrayItem,
                arrFind: arrFind,
                arrFindIdx: arrFindIdx,
                arrayUnique: arrayUnique,
                birthFromId: birthFromId,
                sexFromId: sexFromId,
                ageFromBirth: ageFromBirth,
                ageFromId: ageFromId,
                angularFilter: angularFilter,
                createError: createError,
                relativeDate: relativeDate,
                strlen: strlen,
                show: show,
            };
        }
    ]);

})();
