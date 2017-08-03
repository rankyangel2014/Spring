(function () {
'use strict';

jn.angular.nestedPage({
    parent: 'DocTransfer',
    url: '/uploading',
    template: 'app/doc/transferUploading.page.html',
    backTo: 'DocUpload',
    controller: [
        '$scope',
        '$q',
        'jnHelper',
        'jnDocImage',
        'jnDocImageViewer',
        'jnDocQueue',
        function (
            $scope,
            $q,
            jnHelper,
            jnDocImage,
            jnDocImageViewer,
            jnDocQueue
        ) {
            $scope.queue = jnDocQueue;
            $scope.files = jnDocQueue.files;

            $scope.files.forEach(function (f) {
                if (! f.thumb) {
                    jnDocImage.read(f.thumbId).then(function (data) {
                        f.thumb = data;
                    });
                }
            });

            $scope.viewImage = function (image) {
                jnDocImageViewer.open({
                    images: $scope.files.slice(),
                    current: image,
                    remove: jnDocQueue.remove,
                    rename: jnDocQueue.rename,

                    beforeRemove: function (image, confirmRemove) {
                        var msg;

                        if (! image.uploading) {
                            return confirmRemove(image);
                        }

                        msg = image.name + '正在上传或已经上传，不能删除！'
                        jnHelper.alert(msg);
                        return $q.reject();
                    },

                    beforeRename: function (image, popupRename) {
                        var msg;

                        if (! image.uploading) {
                            return popupRename(image);
                        }

                        msg = image.name + '正在上传或已经上传，不能改名！'
                        jnHelper.alert(msg);
                        return $q.reject();
                    },

                    loadImage: function (image) {
                        if (image.file) {
                            return $q(function (resolve, reject) {
                                resolve(image.file);
                            });
                        }

                        return jnDocImage.read(image.id)
                            .then(function (data) {
                                image.file = data;
                                return data;
                            });
                    },

                    loadThumb: function (image) {
                        if (image.file) {
                            return $q(function (resolve, reject) {
                                resolve(image.file);
                            });
                        }

                        if (image.thumb) {
                            return $q(function (resolve, reject) {
                                resolve(image.thumb);
                            });
                        }

                        return jnDocImage.read(image.thumbId)
                            .then(function (data) {
                                image.thumb = data;
                                return data;
                            });
                    },
                });
            };

            $scope.select = function () {
                $scope.selecting = ! $scope.selecting;
            };

            $scope.upload = function () {
                if ($scope.queue.uploading) {
                    jnDocQueue.stopUpload();
                } else {
                    jnDocQueue.startUpload();
                }
            };

            $scope.selectAll = function () {
                $scope.files.forEach(function (e) {
                    e.selected = true;
                });
            };

            $scope.deselectAll = function () {
                $scope.files.forEach(function (e) {
                    e.selected = false;
                });
            };

            $scope.deleteSelected = function () {
                var selectedFiles = $scope.files.filter(function (e) {
                    return e.selected && ! e.uploading;
                });

                if (0 === selectedFiles.length) {
                    return;
                }

                jnHelper.confirm('确实要删除这些文件吗？')
                    .then(function (confirmed) {
                        if (confirmed) {
                            selectedFiles.forEach(function (e) {
                                if (! e.uploading) {
                                    jnDocQueue.remove(e);
                                }
                            });
                        }
                    });
            };
        }
    ]
});
})();

