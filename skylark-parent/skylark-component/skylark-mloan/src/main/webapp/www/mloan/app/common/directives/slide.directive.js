/**
 */

(function () {
'use strict';

angular
    .module('common')
    .directive('jnSlide', [
        '$compile',
        function (
            $compile
        ) {
            var Slide = (function () {
                var setTransform = function (el, value) {
                    el.style.transform = el.style.webkitTransform = value;
                };

                /**
                 * opt:
                 *   element: DOM元素
                 *   makePage: 生成子页面的函数
                 *   onChange*: 页切换成功后回调函数
                 *   startIdx*: 从哪一页开始
                 */
                var C = function (opt) {
                    var self = this;
                    var mc = new Hammer(opt.element);

                    mc.on('panmove', function (e) {
                        if (0 === self._animations) {
                            self._onPanMove(e.deltaX);
                        }
                    });

                    mc.on('panend', function (e) {
                        if (0 === self._animations) {
                            self._onPanEnd(e.deltaX);
                        }
                    });

                    this._el = opt.element;
                    this._f = this._el.querySelector('.slide-page.foreground');
                    this._b = this._el.querySelector('.slide-page.background');
                    this._makePage = opt.makePage;
                    this._animations = 0;

                    this._onChange = opt.onChange || Function();

                    Object.defineProperties(this, {
                        current: {
                            get: function () {
                                return self._getCurrent();
                            },
                            set: function (value) {
                                self._setCurrent(value);
                            },
                        },
                    });

                    this.current = this._next = opt.startIdx || 0;
                };

                C.prototype.onChange = function (callback) {
                    this._onChange = callback;
                };

                C.prototype._getCurrent = function () {
                    return this._current;
                };

                C.prototype._setCurrent = function (value) {
                    var page = this._makePage(value);
                    this._f.innerHTML = page[0];
                    $compile(this._f)(page[1]);

                    this._current = value;
                    this._onChange(this._current);
                };

                C.prototype._exchange = function () {
                    var tmp = this._f;
                    this._f = this._b;
                    this._b = tmp;

                    this._f.classList.remove('background');
                    this._f.classList.add('foreground');
                    this._b.classList.remove('foreground');
                    this._b.classList.add('background');

                    setTransform(this._f, '');
                    setTransform(this._b, '');
                    this._current = this._next;
                    this._onChange(this._current);
                };

                C.prototype._preloadNext = function () {
                    var page = this._makePage(this._next);

                    if (page) {
                        this._b.innerHTML = page[0];
                        $compile(this._b)(page[1]);
                    } else {
                        this._b.innerHTML = '';

                        if (this._current < this._next) {
                            this._next = Infinity;
                        } else {
                            this._next = - Infinity;
                        }
                    }
                };

                C.prototype._limitX = function (x) {
                    var w = this._el.clientWidth;
                    return 0.5 * w * x / (w + Math.abs(x));
                };

                C.prototype._end = function (x) {
                    var leftEnd = -Infinity === this._next && 0 < x;
                    var rightEnd = Infinity === this._next && x < 0;
                    return leftEnd || rightEnd;
                };

                C.prototype._moveF = function (x) {
                    if (this._end(x)) {
                        setTransform(this._f, 'translateX(' +
                            this._limitX(x) + 'px)');

                    } else {
                        setTransform(this._f, 'translateX(' + x + 'px)');
                    }

                    if (0 < x && this._current <= this._next) {
                        this._next = this._current - 1;
                        this._preloadNext();

                    } else if (x < 0 && this._next <= this._current) {
                        this._next = this._current + 1;
                        this._preloadNext();
                    }
                };

                C.prototype._scaleB = function (x) {
                    var scale = Math.abs(x) / this._el.clientWidth;
                    scale = 1 < scale ? 1 : scale;
                    setTransform(this._b, 'scale(' + scale + ')');
                };

                C.prototype._slideAwayLeftF = function () {
                    this._animate(this._f, 'translateX(-' +
                        this._el.clientWidth + 'px)');
                };

                C.prototype._slideAwayRightF = function () {
                    this._animate(this._f, 'translateX(' +
                        this._el.clientWidth + 'px)');
                };

                C.prototype._moveUpB = function () {
                    this._animate(this._b, 'scale(1)', (function (self) {
                        return function () {
                            self._exchange();
                        }
                    })(this));
                };

                C.prototype._cancel = function () {
                    this._animate(this._f, '');
                    this._animate(this._b, '');
                };

                C.prototype._startAnimate = function () {
                    this._animations += 1;

                    if (1 === this._animations) {
                        this._el.classList.add('animating');
                    }
                };

                C.prototype._endAnimate = function () {
                    this._animations -= 1;

                    if (0 === this._animations) {
                        this._el.classList.remove('animating');
                    }
                };

                C.prototype._animate = function (el, transform, callback) {
                    var self = this;

                    var listener = function () {
                        self._endAnimate();

                        if (callback) {
                            callback();
                        }
                    };

                    jn.util.oneTransitionEnd(el, listener);
                    self._startAnimate();
                    el.style.transform = transform;
                };

                C.prototype._onPanMove = function (x) {
                    this._moveF(x);
                    this._scaleB(x);
                };

                C.prototype._onPanEnd = function (x) {
                    if (this._end(x)) {
                        this._cancel();
                        return;
                    }

                    if (this._el.clientWidth < Math.abs(x)) {
                        this._exchange();
                        return;
                    }

                    if (this._el.clientWidth * 0.5 < Math.abs(x)) {
                        if (0 < x) {
                            this._slideAwayRightF();
                        } else {
                            this._slideAwayLeftF();
                        }

                        this._moveUpB();
                        return;
                    }

                    this._cancel();
                };

                return C;
            })();

            return {
                templateUrl: 'app/common/directives/slide.directive.html',

                restrict: 'E',

                scope: {
                    makePage: '=',
                    onChange: '=',
                    startAt: '=',
                },

                link: function ($scope, $element, $attr) {
                    var slide = new Slide({
                        element: $element[0],
                        makePage: $scope.makePage,
                        onChange: $scope.onChange,
                        startIdx: $scope.startAt,
                    });

                    if ($attr.manager) {
                        (function () {
                            var ctrlScope = jn.angular.findCtrlScope($scope);
                            jn.obj.setAttr(ctrlScope, $attr.manager, slide);
                        })();
                    }
                },
            };
        }
    ]);
})();
