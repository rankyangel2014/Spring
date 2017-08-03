(function () {
'use strict';
angular
    .module('app')
    .factory('jnDocImage', [
        '$q',
        '$timeout',
        'jnFS',
        function (
            $q,
            $timeout,
            jnFS
        ) {
            var DIR = 'docs';

            var service = {};

            service.write = function (dataUrl) {
                var fid = jn.util.guid();
                var path = DIR + '/' + fid;

                return jnFS.write(path, dataUrl).then(function () {
                    return fid;
                });
            };

            service.read = function (fid) {
                var path = DIR + '/' + fid;
                return jnFS.read(path);
            };

            service.delete = function (fid) {
                var path = DIR + '/' + fid;
                return jnFS.delete(path);
            };

            service.load = function (url) {
                return $q(function (resolve, reject) {
                    var image = new Image();

                    image.onload = function () {
                        resolve(image);
                    };

                    image.src = url;
                });
            };

            service.scaleDown = (function () {
                var doScaleDown = function (image, dw, dh) {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');

                    canvas.width = dw;
                    canvas.height = dh;
                    ctx.drawImage(image, 0, 0, dw, dh);

                    return canvas;
                };

                return function (canvas, size) {
                    var dw = canvas.width;
                    var dh = canvas.height;
                    var scaled = canvas;

                    while (true) {
                        if (dw < dh) {

                            if (size < dw / 2) {
                                dw = dw / 2;
                                dh = dh / 2;
                                scaled = doScaleDown(scaled, dw, dh);

                            } else {
                                dh = dh / dw * size;
                                dw = size;
                                scaled = doScaleDown(scaled, dw, dh);
                                break;
                            }

                        } else {

                            if (size < dh / 2) {
                                dw = dw / 2;
                                dh = dh / 2;
                                scaled = doScaleDown(scaled, dw, dh);

                            } else {
                                dw = dw / dh * size;
                                dh = size;
                                scaled = doScaleDown(scaled, dw, dh);
                                break;
                            }
                        }
                    }

                    return scaled;
                };
            })();

            service.correctOrientation = (function () {
                var getOrientation = function (image) {
                    return $q(function (resolve, reject) {
                        EXIF.getData(image, function () {
                            var orientation = EXIF.getTag(image, 'Orientation');
                            resolve(orientation);
                        });
                    });
                };

                return function (image) {
                    return getOrientation(image)
                        .then(function (orientation) {
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');

                            if (4 < orientation) {
                            // 5, 6, 7, 8

                                canvas.width = image.height;
                                canvas.height = image.width;

                            } else {
                            // undefined, 1, 2, 3, 4

                                canvas.width = image.width;
                                canvas.height = image.height;
                            }


                            var flipH = function () {
                                ctx.translate(canvas.width, 0);
                                ctx.scale(-1, 1);
                            };

                            var flipRV = function () {
                                ctx.translate(0, canvas.width);
                                ctx.scale(1, -1);
                            };

                            var rotate90 = function () {
                                ctx.translate(canvas.width, 0);
                                ctx.rotate(0.5 * Math.PI);
                            };

                            var rotate180 = function () {
                                ctx.translate(canvas.width, canvas.height);
                                ctx.rotate(Math.PI);
                            };

                            var rotate270 = function () {
                                ctx.translate(0, canvas.height);
                                ctx.rotate(- 0.5 * Math.PI);
                            };

                            var doDraw = function () {
                                ctx.drawImage(image, 0, 0,
                                    canvas.width, canvas.height);
                            };

                            var doRotateDraw = function () {
                                ctx.drawImage(image, 0, 0,
                                    canvas.height, canvas.width);
                            };

                            if (2 === orientation) {
                                flipH();
                                doDraw();

                            } else if (3 === orientation) {
                                rotate180();
                                doDraw();

                            } else if (4 === orientation) {
                                rotate180();
                                flipH();
                                doDraw();

                            } else if (5 === orientation) {
                                rotate90();
                                flipRV();
                                doRotateDraw();

                            } else if (6 === orientation) {
                                rotate90();
                                doRotateDraw();

                            } else if (7 === orientation) {
                                rotate270();
                                flipRV();
                                doRotateDraw();

                            } else if (8 === orientation) {
                                rotate270();
                                doRotateDraw();

                            } else {
                            // undefined === orientation || 1 === orientation

                                doDraw();
                            }

                            return canvas;
                        });
                };
            })();

            service.processThumb = (function () {
                var SIZE = 110;
                var QUALITY = 0.8;

                return function(canvas) {
                    canvas = this.scaleDown(canvas, SIZE);
                    return $timeout(function () {
                        return canvas.toDataURL('image/jpeg', QUALITY);
                    }, 50);
                };
            })();

            service.processImage = (function () {
                var QUALITY = 0.8;

                return function (canvas) {
                    return $timeout(function () {
                        return canvas.toDataURL('image/jpeg', QUALITY);
                    }, 50);
                };
            })();

            return service;
        }]
    );
})();
