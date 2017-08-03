(function () {
'use strict';
angular
    .module('app')
    .factory('jnDocQueue', [
        '$rootScope',
        '$q',
        'jnStorage',
        'jnDoc',
        'jnDocImage',
        'jnDocHistory',
        function (
            $rootScope,
            $q,
            jnStorage,
            jnDoc,
            jnDocImage,
            jnDocHistory
        ) {
            var STO_KEY = 'doc.queue';

            var service = {};

            var _files = jnStorage.user.get(STO_KEY, []);
            var _canceller;

            var _save = function () {
                var files = _files.map(function (f) {
                    return {
                        id: f.id,
                        thumbId: f.thumbId,
                        name: f.name,
                        loanNo: f.loanNo,
                        modelNo: f.modelNo,
                        dirId: f.dirId,
                        applAmt: f.applAmt,
                        custNo: f.custNo,
                        custName: f.custName,
                        path: f.path,
                        check: f.check,
                        ctime: f.ctime,
                        width: f.width,
                        height: f.height,
                    };
                });

                jnStorage.user.set(STO_KEY, files);
            };

            var _remove = function (file) {
                var idx = _files.indexOf(file);
                _files.splice(idx, 1);
                _save();

                // @TODO 删除失败的情况？
                jnDocImage.delete(file.id);
                jnDocImage.delete(file.thumbId);
            };

            var _uploadDone = function (file, fileUrl, thumbUrl) {
                file.url = fileUrl;
                file.thumbUrl = thumbUrl;
                jnDocHistory.push(file);
                _remove(file);
            };

            var _uploadFailed = function (file) {
                file.uploading = false;
                file.uploadFailed = true;
            };

            service.uploading = false;

            service.push = function (files, params) {
                var ctime = Date.now();

                files.forEach(function (file) {
                    var f = {
                        id: file.id,
                        thumbId: file.thumbId,
                        name: file.name,
                        loanNo: params.loanNo,
                        custNo: params.custNo,
                        custName: params.custName,
                        applAmt: params.applAmt,
                        modelNo: params.modelNo,
                        dirId: params.dirId,
                        path: params.path,
                        check: params.check,
                        ctime: ctime,
                        width: file.width,
                        height: file.height,
                    };

                    _files.push(f);
                });

                _save();
            };

            service.remove = function (file) {
                if (! file.uploading) {
                    _remove(file);
                }
            };

            service.rename = function (file) {
                if (! file.uploading) {
                    _save();
                }
            };

            service.startUpload = (function () {
                var queue;

                var next = function () {
                    var f;

                    if (0 < queue.length) {
                        service.uploading = true;

                        f = queue[0];
                        f.uploading = true;

                        jnDocImage.read(f.id).then(function (data) {
                            _canceller = $q.defer();

                            return jnDoc.uploadFile({
                                custNo: f.custNo,
                                bnNo: f.loanNo,
                                nodeId: f.dirId,
                                modelNo: f.modelNo,
                                fileData: data,
                                fileName: f.name,
                                width: f.width,
                                height: f.height,
                            }, _canceller.promise);

                        }).then(
                            function (rsp) {
                                _uploadDone(f, rsp.file, rsp.thumb);
                            },
                            function (err) {
                                _uploadFailed(f);
                            }
                        ).finally(function () {
                            queue.shift();

                            if (service.uploading) {
                                next();
                            }
                        });

                    } else {
                        service.uploading = false;
                    }
                };

                return function () {
                    queue = _files.slice();

                    queue.forEach(function (e) {
                        e.uploadFailed = false;
                    });

                    next();
                };
            })();

            service.stopUpload = function () {
                service.uploading = false;
                _canceller.resolve();
            };

            Object.defineProperties(service, {
                files: {
                    get: function () {
                        return _files;
                    },
                },
            });

            $rootScope.$on('$cordovaNetwork:offline', function () {
                service.stopUpload();
            });

            return service;
        }]
    );
})();
