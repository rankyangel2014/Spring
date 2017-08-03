/**
 * 图案输入控件（多用于手势密码）
 *
 * 用法:
 *      <jn-pattern-input></jn-pattern-input>
 *
 *      该元素的大小和位置决定了输入控件的大小和位置。
 *      输入控件的大小等同于该元素的大小，总是绝对居中于该元素。
 *
 * 参数:
 *      on-change: 函数。控件值改变时回调，接受一个 PatternInput 对象作为参数。
 *      on-invalid: 函数。控件值非法时回调，接受一个 PatternInput 对象作为参数。
 *      on-reset: 函数。控件重置时回调，接受一个 PatternInput 对象作为参数。
 *      bg-color: 颜色名称或值。背景颜色。
 *      circle-color: 颜色名称或值。圈颜色。
 *      circle-color-err: 颜色名称或值。圈颜色(错误)。
 *      circle-color-ok: 颜色名称或值。圈颜色(正确)。
 *      circle-radius: 整数或百分比。圈半径，默认为 10%。
 *      circle-width: 整数或百分比。圈粗细，默认为 2。
 *      circle-distance-x: 整数或百分比。圈圆心横向间距，默认为 25%。
 *      circle-distance-y: 整数或百分比。圈圆心纵向间距，默认为 25%。
 *      dot-color: 颜色名称或值。点颜色。
 *      dot-color-err: 颜色名称或值。点颜色(错误)。
 *      dot-color-ok: 颜色名称或值。点颜色(正确)。
 *      dot-radius: 整数或百分比。点半径，默认为 5%。
 *      line-width: 整数或百分比。线粗细，默认为 2。
 *      line-color: 颜色名称或值。线颜色。
 *      line-color-err: 颜色名称或值。线颜色(错误)。
 *      line-color-ok: 颜色名称或值。线颜色(正确)。
 *      decay-err: 整数。消退延迟毫秒数(错误)，默认为 500。
 *      decay-ok: 整数。消退延迟毫秒数(正确)，默认为 200。
 *      min-dots: 整数。最少有效点数，默认为 4。
 *
 * PatternInput API:
 *
 *      int minDots(): 获取最少有效点数值。
 *
 *      void setValid(bool)：设置控件的正确/错误状态。
 *
 *      str value(): 获取当前输入的值，格式为点索引序列。
 *
 *      void destroy(): 销毁控件，取消相应的事件监听。
 */
(function () {
'use strict';

angular
    .module('common')
    .directive('jnPatternInput', [
        'jnHelper',
        function (jnHelper) {
            var PatternInput = (function () {
                var PI = function (canvas, conf) {
                    this._canvas = canvas;
                    this._ctx = canvas.getContext('2d');
                    this._conf = conf;
                    this._onChange = function () {};
                    this._onInvalid = function () {};
                    this._onReset = function () {};

                    this.init();
                };

                PI.STATUS = {
                    INITIAL: 0,
                    VALID: 1,
                    INVALID: 2,
                };

                PI.prototype.constructor = PI;

                PI.prototype.minDots = function () {
                    return this._MIN_DOTS;
                };

                PI.prototype.onInvalid = function (callback) {
                    this._onInvalid = callback;
                };

                PI.prototype.onChange = function (callback) {
                    this._onChange = callback;
                };

                PI.prototype.onReset = function (callback) {
                    this._onReset = callback;
                };

                PI.prototype.setValid = function (isValid) {
                    var self = this;

                    if (isValid) {
                        self._status = PI.STATUS.VALID;

                        setTimeout(function () {
                            self._reset();
                        }, self._DECAY_OK);

                    } else {
                        self._status = PI.STATUS.INVALID;

                        setTimeout(function () {
                            self._reset();
                        }, self._DECAY_ERR);
                    }
                };

                PI.prototype.value = function () {
                    return this._dots.join('');
                };

                PI.prototype.destroy = function () {
                    this._canvas.removeEventListener('touchstart',
                        this._onTouchStart);
                    this._canvas.removeEventListener('touchmove',
                        this._onTouchMove);
                    document.removeEventListener('touchend',
                        this._onTouchEnd);
                    document.removeEventListener('touchcancel',
                        this._onTouchEnd);
                };

                PI.prototype._size = function (value, fallback) {
                    var n;

                    value = value || fallback;

                    // 百分比字符串
                    if (/^\d+(\.\d+)?%$/.test(value)) {
                        n = Number(value.slice(0, -1));
                        n = Math.round(n * 0.01 * this._canvas.width);
                        return n || fallback;
                    }

                    // 数字或者数字字符串
                    return Math.round(value) || fallback;
                };

                PI.prototype.init = function () {
                    this._initCanvas();
                    this._initOptions();
                    this._initCircles();
                    this._initTouchEvents();
                    this._reset();
                };

                PI.prototype._initCanvas = function () {
                    var c = this._canvas;
                    var p = c.parentElement;
                    c.width = p.clientWidth;
                    c.height = p.clientHeight;
                };

                PI.prototype._initOptions = function () {
                    var COLOR = '#535353';
                    var COLOR_ERR = '#d02424';
                    var COLOR_OK = '#0c60ee';

                    var conf = this._conf;

                    // 背景颜色
                    this._BG_COLOR = conf.bgColor || 'white';

                    // 圈颜色
                    this._CIRCLE_COLOR = conf.circleColor || COLOR;

                    // 圈颜色(错误)
                    this._CIRCLE_COLOR_ERR = conf.circleColorErr || COLOR_ERR;

                    // 圈颜色(正确)
                    this._CIRCLE_COLOR_OK = conf.circleColorOk || COLOR_OK;

                    // 圈半径
                    this._CIRCLE_RADIUS = this._size(conf.circleRadius, '10%');

                    // 圈粗细
                    this._CIRCLE_WIDTH = this._size(conf.circleWidth, 2);

                    // 圈圆心横向间距
                    this._CIRCLE_DISTANCE_X = this._size(
                        conf.circleDistanceX, '25%');

                    // 圈圆心纵向间距
                    this._CIRCLE_DISTANCE_Y = this._size(
                        conf.circleDistanceY, '25%');

                    // 点颜色
                    this._DOT_COLOR = conf.dotColor || COLOR;

                    // 点颜色(错误)
                    this._DOT_COLOR_ERR = conf.dotColorErr || COLOR_ERR;

                    // 点颜色(正确)
                    this._DOT_COLOR_OK = conf.dotColorOk || COLOR_OK;

                    // 点半径
                    this._DOT_RADIUS = this._size(conf.dotRadius, '5%');

                    // 线粗细
                    this._LINE_WIDTH = this._size(conf.lineWidth, 2);

                    // 线颜色
                    this._LINE_COLOR = conf.lineColor || COLOR;

                    // 线颜色(错误)
                    this._LINE_COLOR_ERR = conf.lineColorErr || COLOR_ERR;

                    // 线颜色(正确)
                    this._LINE_COLOR_OK = conf.lineColorOk || COLOR_OK;

                    // 消退延迟(错误)
                    this._DECAY_ERR = Number(conf.decayErr) || 500;

                    // 消退延迟(正确)
                    this._DECAY_OK = Number(conf.decayOk) || 200;

                    // 最少有效点数
                    this._MIN_DOTS = Number(conf.minDots) || 4;

                    this._SQRT_R = Math.pow(this._CIRCLE_RADIUS, 2);
                };

                PI.prototype._initTouchEvents = function () {
                    var self = this;
                    var teld = new jnHelper.TouchEventListenerDecorator;

                    this._onTouchStart = teld.start(function (e, data) {
                        self._onInputStart(data);
                    });

                    this._onTouchMove = teld.move(function (e, data) {
                        self._onInput(data);
                    });

                    this._onTouchEnd = teld.end(function (e, data) {
                        self._onInputEnd(data);
                    });

                    this._canvas.addEventListener('touchstart',
                        this._onTouchStart);
                    this._canvas.addEventListener('touchmove',
                        this._onTouchMove);
                    document.addEventListener('touchend', this._onTouchEnd);
                    document.addEventListener('touchcancel', this._onTouchEnd);
                };

                PI.prototype._onInputStart = function (coord) {
                    var self = this;
                    var requestAnimationFrame, drawAnima;

                    if (self._enabled) {
                        requestAnimationFrame = window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame;

                        drawAnima = function () {
                            if (self._active) {
                                self._draw();
                                requestAnimationFrame(drawAnima);
                            }
                        };

                        self._update(coord);
                        self._active = true;

                        requestAnimationFrame(drawAnima);
                    }
                };

                PI.prototype._onInput = function (coord) {
                    if (this._enabled) {
                        this._update(coord);
                    }
                };

                PI.prototype._onInputEnd = function (coord) {
                    if (this._enabled && 0 < this._dots.length) {
                        this._enabled = false;

                        if (this._dots.length < this._MIN_DOTS) {
                            this._onInvalid(this);
                            this.setValid(false);

                        } else {
                            this._onChange(this);
                        }
                    }
                };

                PI.prototype._reset = function () {
                    this._touch = null;
                    this._dots = [];
                    this._status = PI.STATUS.INITIAL;
                    this._active = false;
                    this._enabled = true;
                    this._draw();
                    this._onReset(this);
                };

                PI.prototype._initCircles = function () {
                    var r = this._CIRCLE_RADIUS;
                    var dx = this._CIRCLE_DISTANCE_X;
                    var dy = this._CIRCLE_DISTANCE_Y;

                    this._circles = [];

                    this._circles[4] = {
                        x: this._canvas.width / 2 - 1,
                        y: this._canvas.height / 2 - 1,
                    };

                    this._circles[3] = {
                        x: this._circles[4].x - dx,
                        y: this._circles[4].y,
                    };

                    this._circles[0] = {
                        x: this._circles[3].x,
                        y: this._circles[3].y - dy,
                    };

                    this._circles[1] = {
                        x: this._circles[0].x + dx,
                        y: this._circles[0].y,
                    };

                    this._circles[2] = {
                        x: this._circles[1].x + dx,
                        y: this._circles[1].y,
                    };

                    this._circles[5] = {
                        x: this._circles[2].x,
                        y: this._circles[2].y + dy,
                    };

                    this._circles[8] = {
                        x: this._circles[5].x,
                        y: this._circles[5].y + dy,
                    };

                    this._circles[7] = {
                        x: this._circles[8].x - dx,
                        y: this._circles[8].y,
                    };

                    this._circles[6] = {
                        x: this._circles[7].x - dx,
                        y: this._circles[7].y,
                    };
                };

                PI.prototype._draw = function () {
                    this._canvas.width = this._canvas.width; // 清空画布

                    this._ctx.fillStyle = this._BG_COLOR;
                    this._ctx.fillRect(0, 0,
                        this._canvas.width, this._canvas.height);

                    // 顺序不可变
                    this._drawLines();
                    this._drawCircles();
                    this._drawDots();
                };

                PI.prototype._setCircleStyle = function () {
                    if (this._status === PI.STATUS.VALID) {
                        this._ctx.strokeStyle = this._CIRCLE_COLOR_OK;
                    } else if (this._status === PI.STATUS.INVALID) {
                        this._ctx.strokeStyle = this._CIRCLE_COLOR_ERR;
                    } else {
                        this._ctx.strokeStyle = this._CIRCLE_COLOR;
                    }
                };

                PI.prototype._setLineStyle = function () {
                    if (this._status === PI.STATUS.VALID) {
                        this._ctx.strokeStyle = this._LINE_COLOR_OK;
                    } else if (this._status === PI.STATUS.INVALID) {
                        this._ctx.strokeStyle = this._LINE_COLOR_ERR;
                    } else {
                        this._ctx.strokeStyle = this._LINE_COLOR;
                    }
                };

                PI.prototype._setDotStyle = function () {
                    if (this._status === PI.STATUS.VALID) {
                        this._ctx.fillStyle = this._DOT_COLOR_OK;
                    } else if (this._status === PI.STATUS.INVALID) {
                        this._ctx.fillStyle = this._DOT_COLOR_ERR;
                    } else {
                        this._ctx.fillStyle = this._DOT_COLOR;
                    }
                };

                PI.prototype._drawCircles = function () {
                    var r = this._CIRCLE_RADIUS;
                    var ctx = this._ctx;

                    ctx.beginPath();

                    this._circles.forEach(function (c) {
                        ctx.moveTo(c.x + r, c.y);
                        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
                    });

                    ctx.closePath();

                    ctx.fillStyle = this._BG_COLOR;
                    ctx.fill();

                    this._setCircleStyle();
                    ctx.lineWidth = this._CIRCLE_WIDTH;
                    ctx.stroke();
                };

                PI.prototype._drawLines = function () {
                    var circles = this._circles;
                    var ctx = this._ctx;

                    this._dots.forEach(function (i) {
                        var c = circles[i];
                        ctx.lineTo(c.x, c.y);
                    });

                    if (this._touch) {
                        ctx.lineTo(this._touch.x, this._touch.y);
                    }

                    this._setLineStyle();
                    ctx.lineWidth = this._LINE_WIDTH;
                    ctx.stroke();
                };

                PI.prototype._drawDots = function () {
                    var r = this._DOT_RADIUS;
                    var circles = this._circles;
                    var ctx = this._ctx;

                    ctx.beginPath();

                    this._dots.forEach(function (i) {
                        var c = circles[i];
                        ctx.moveTo(c.x + r, c.y);
                        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
                    });

                    ctx.closePath();

                    this._setDotStyle();
                    ctx.fill();
                };

                PI.prototype._update = function (coord) {
                    var self = this;
                    var rect = self._canvas.getBoundingClientRect();
                    var x = coord.x - rect.left;
                    var y = coord.y - rect.top;

                    self._touch = {
                        x: x,
                        y: y,
                    };

                    self._circles.some(function (c, i) {
                        if (-1 === self._dots.indexOf(i) && self._inCircle(c, x, y)) {
                            self._dots.push(i);
                            return true;
                        }
                    });
                };

                PI.prototype._inCircle = function (circle, x, y) {
                    return Math.pow(Math.abs(x - circle.x), 2)
                        + Math.pow(Math.abs(y - circle.y), 2) < this._SQRT_R;
                };

                return PI;
            })();

            return {
                restrict: 'AE',
                template: '<canvas></canvas>',
                scope: {
                    onChange: '&',
                    onInvalid: '&',
                    onReset: '&',
                },
                link: function ($scope, $element, $attr) {
                    var elem = $element[0];
                    elem.style.display = 'block';

                    var canvas = elem.querySelector('canvas');
                    var pi = new PatternInput(canvas, $attr);

                    if ($scope.onInvalid) {
                        pi.onInvalid($scope.onInvalid());
                    }

                    if ($scope.onChange) {
                        pi.onChange($scope.onChange());
                    }

                    if ($scope.onReset) {
                        pi.onReset($scope.onReset());
                    }

                    $element.on('$destroy', function () {
                        pi.destroy();
                    });

                    $scope.$on('resize', function () {
                        pi.init();
                    });
                },
            };
        }
    ]);

})();
