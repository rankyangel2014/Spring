(function () {
'use strict';

angular
    .module('common')
    .directive('jnImg', [
        function () {
            return {
                template: '\
<img\
    ng-src="{{ image.src }}"\
/>',

                restrict: 'E',

                link: (function () {
                    var matrix = (function () {
                        var get = function (elem) {
                            var matrix = window.getComputedStyle(elem).transform || window.getComputedStyle(elem).webkitTransform;

                            if ('none' === matrix) {
                                return [0, 0, 0, 0, 0, 0];
                            }

                            matrix = matrix.replace(/^matrix\((.+?)\)$/, '$1');
                            matrix = matrix.split(',');
                            matrix = matrix.map(parseFloat);
                            return matrix;
                        };

                        var set = function (elem, value) {
                            elem.style.transform =
                            elem.style.webkitTransform =
                                'matrix(' + value.join() + ')';
                        };

                        return function (elem, value) {
                            if (undefined === value) {
                                return get(elem);
                            }

                            return set(elem, value);
                        };
                    })();

                    var transformOrigin = (function () {
                        var get = function (elem) {
                            var origin = window.getComputedStyle(elem).transformOrigin || window.getComputedStyle(elem).webkitTransformOrigin;
                            origin = origin.split(' ');
                            origin = origin.map(parseFloat);
                            return origin;
                        };

                        var set = function (elem, value) {
                            elem.style.transformOrigin =
                            elem.style.webkitTransformOrigin =
                                value.map(function (e) {
                                    return e + 'px';
                                }).join(' ');
                        };

                        return function (elem, value) {
                            if (undefined === value) {
                                return get(elem);
                            }

                            return set(elem, value);
                        };
                    })();

                    var transform = function (elem, scale, translate, origin) {
                        transformOrigin(elem, origin);
                        matrix(elem, [scale, 0, 0, scale, translate[0], translate[1]]);
                    };

                    var init = function (container, image) {
                        var MAX_SCALE = 2;
                        var MIN_SCALE, MIN_X, MAX_X, MIN_Y, MAX_Y;

                        var translate = [0, 0];
                        var origin = [0, 0];
                        var scale;

                        if (container.clientWidth / container.clientHeight <
                            image.width / image.height) {
                            MIN_SCALE = container.clientWidth / image.width;
                            translate[1] = (container.clientHeight - image.height * MIN_SCALE)
                                / 2;

                        } else {
                            MIN_SCALE = container.clientHeight / image.height;
                            translate[0] = (container.clientWidth - image.width * MIN_SCALE)
                                / 2;
                        }

                        transform(image, MIN_SCALE, translate, origin);
                        image.classList.add('initialized');

                        scale = MIN_SCALE;

                        var updateOrigin = function (p) {
                            origin[0] = (p[0] - translate[0]) / scale;
                            origin[1] = (p[1] - translate[1]) / scale;
                            translate[0] += origin[0] * (scale - 1);
                            translate[1] += origin[1] * (scale - 1);
                        };

                        var resetOrigin = function () {
                            translate[0] += origin[0] * (1 - scale);
                            translate[1] += origin[1] * (1 - scale);
                            origin[0] = 0;
                            origin[1] = 0;
                        };

                        var restrictScale = function (value) {
                            value = MAX_SCALE < value ? MAX_SCALE : value;
                            value = value < MIN_SCALE ? MIN_SCALE : value;
                            return value;
                        };

                        var zoom = function (ratio) {
                            transform(image, scale * ratio, translate, origin);
                        };

                        var updateScale = function (ratio) {
                            scale = restrictScale(scale * ratio);
                            transform(image, scale, translate, origin);
                        };

                        var restrictTranslate = (function () {
                            var restrict = function (value, imageEdge, containerEdge) {
                                var d = imageEdge * scale - containerEdge;

                                if (d < 0) {
                                    return - d / 2;
                                }

                                if (0 <= d) {
                                    if (0 < value) {
                                        return 0;
                                    }

                                    if (value < - d) {
                                        return - d;
                                    }
                                }

                                return value;
                            };

                            return function (base, delta) {
                                return [
                                    restrict(base[0] + delta[0],
                                        image.width, container.clientWidth),
                                    restrict(base[1] + delta[1],
                                        image.height, container.clientHeight),
                                ];
                            };
                        })();

                        var move = function (delta) {
                            var tran = [
                                translate[0] + delta[0],
                                translate[1] + delta[1],
                            ];

                            transform(image, scale, tran, origin);
                        };

                        var updateTraslate = function (delta) {
                            translate = restrictTranslate(translate, delta);
                            transform(image, scale, translate, origin);
                        };

                        var mc = new Hammer(container);
                        mc.add(new Hammer.Pinch);

                        mc.on('pinchstart', function (e) {
                            updateOrigin([e.center.x, e.center.y]);
                        });

                        mc.on('pinchmove', function (e) {
                            zoom(e.scale);
                        });

                        mc.on('pinchend', function (e) {
                            updateScale(e.scale);
                            resetOrigin();
                        });

                        mc.on('panmove', function (e) {
                            if (MIN_SCALE < scale) {
                                move([e.deltaX, e.deltaY]);
                                e.srcEvent.stopPropagation();
                            }
                        });

                        mc.on('panend', function (e) {
                            if (MIN_SCALE < scale) {
                                updateTraslate([e.deltaX, e.deltaY]);
                                e.srcEvent.stopPropagation();
                            }
                        });
                    };

                    return function ($scope, $element, $attr) {
                        var container = $element[0];
                        var image = container.querySelector('img');

                        image.onload = function () {
                            init(container, image);
                        };
                    };
                })(),
            };
        }]
    );

})();
