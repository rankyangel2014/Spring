(function () {
'use strict';

angular
    .module('app')
    .factory('jnDocCache', [
        '$q',
        'jnHelper',
        'jnStorage',
        'jnDoc',
        'jnDocImage',
        'jnDocQueue',
        function (
            $q,
            jnHelper,
            jnStorage,
            jnDoc,
            jnDocImage,
            jnDocQueue
        ) {
            var STO_KEY = 'doc.cache';

            var service = {};

            var _files = jnStorage.user.get(STO_KEY, []);

            var _save = function () {
                var files = _files.filter(function (f) {
                    return ! f.processing;
                }).map(function (f) {
                    return {
                        id: f.id,
                        thumbId: f.thumbId,
                        width: f.width,
                        height: f.height,
                        name: f.name,
                    };
                });

                jnStorage.user.set(STO_KEY, files);
            };

            var _remove = function (file) {
                var idx = _files.indexOf(file);
                _files.splice(idx, 1);
            };

            service.add = function (path) {
                var filename = path.replace(/^.+?([^/]+)$/, '$1');

                var file = {
                    thumb: path,
                    file: path,
                    processing: true,
                };

                // 后台判断文件类型没有考虑大写的情况
                var parts = jn.util.splitFilename(filename);
                file.name = parts[0] + '.' + parts[1].toLowerCase();

                _files.push(file);

                var processImage = function (canvas) {
                    return jnDocImage.processImage(canvas)
                        .then(function (dataUrl) {
                            file.file = dataUrl;
                            return dataUrl;
                        });
                };

                var processThumb = function (canvas) {
                    return jnDocImage.processThumb(canvas)
                        .then(function (dataUrl) {
                            file.thumb = dataUrl;
                            return dataUrl;
                        });
                };

                return jnDocImage.load(path)

                    .then(function (image) {
                        file.width = image.width;
                        file.height = image.height;
                        return jnDocImage.correctOrientation(image);

                    }).then(function (canvas) {
                        return $q.all([
                            processThumb(canvas),
                            processImage(canvas),
                        ]);

                    }).then(function (dataUrls) {
                        // @TODO 可能会出现某个写入某个文件失败但其它文件成功的情况，在错误处理时应删除成功的文件
                        return $q.all(dataUrls.map(function (e) {
                            return jnDocImage.write(e);
                        }));

                    }).then(function (ids) {
                        file.thumbId = ids[0];
                        file.id = ids[1];
                        file.processing = false;
                        _save();

                    }, function (err) {
                        _remove(file);
                        throw err;
                    });
            };

            service.remove = function (file) {
                return jnDocImage.delete(file.thumbId)

                    .finally(function () {
                        _remove(file);
                        _save();
                    });
            };

            service.rename = function (file) {
                _save();
            };

            service.toQueue = function (params) {
                jnDocQueue.push(_files, params);
                _files.splice(0);
                _save();
            };

            Object.defineProperties(service, {
                files: {
                    get: function () {
                        return _files;
                    },
                }
            });

            return service;
        }]
    );
})();
