(function () {
'use strict';

jn.angular.page({
    url: '/doc/upload',
    params: [
        'type',
        'custNo',
        'custName',
        'loanNo',
        'loanStatus',
        'contTyp',
        'applAmt',
        'modelNo',
        'dirId',
        'path',
        'checkType',
        'checkDate',
        'lockLoan',
        'lockCheck',
        'lockType',
    ],
    controller: [
        '$scope',
        '$q',
        '$location',
        '$cordovaImagePicker',
        '$cordovaCamera',
        '$cordovaFile',
        '$cordovaNetwork',
        '$ionicActionSheet',
        'jnPage',
        'jnHelper',
        'jnDocImage',
        'jnDocImageViewer',
        'jnDocCache',
        'jnDocQueue',
        'jnDateFilter',
        'jnConstantFilter',
        function (
            $scope,
            $q,
            $location,
            $cordovaImagePicker,
            $cordovaCamera,
            $cordovaFile,
            $cordovaNetwork,
            $ionicActionSheet,
            jnPage,
            jnHelper,
            jnDocImage,
            jnDocImageViewer,
            jnDocCache,
            jnDocQueue,
            jnDateFilter,
            jnConstantFilter
        ) {
            $scope.MAX_CACHE_SIZE = 9;
            $scope.files = jnDocCache.files;
            $scope.queue = jnDocQueue.files;
            $scope.processing = 0;

            // 载入缩略图
            $scope.files.forEach(function (f) {
                if (! f.thumb) {
                    jnDocImage.read(f.thumbId).then(function (data) {
                        f.thumb = data;
                    });
                }
            });

            $scope.custName = jnPage.params.custName;
            $scope.applAmt = jnPage.params.applAmt;
            $scope.type = jnPage.params.type;
            $scope.modelNo = jnPage.params.modelNo;
            $scope.lockType = '1' === jnPage.params.lockType;

            if (jnPage.params.checkDate) {
                $scope.check = jnDateFilter(jnPage.params.checkDate) + ' '
                    + jnConstantFilter(jnPage.params.checkType, 9101) + '检查';
            }

            if ('1' === jnPage.params.lockCheck) {
                $scope.lockType = true;
            }

            if (jnPage.params.contTyp && jnPage.params.loanStatus &&
                ('2' === jnPage.params.contTyp ||
                 '61' !== jnPage.params.loanStatus)) {
                $scope.type = '0';
                $scope.lockType = true;
            }

            $scope.$watch('type', function () {
                $location.search('type', $scope.type).replace();
            });

            if (jnPage.params.path) {
                $scope.path = jnPage.params.path.split(',');
            }

            (function () {
                var cacheFiles = function (list) {
                    list.forEach(function (path) {
                        $scope.processing += 1;

                        jnDocCache.add(path)

                            .catch(function () {
                                jnHelper.alert(
                                    '<img src="' + path +
                                        '" style="width: 100%;"/>',
                                    '照片处理失败，请重试！');

                            }).finally(function () {
                                $scope.processing -= 1;
                            });
                    });
                };

                var takePhoto = function () {
                    $cordovaCamera.getPicture({
                        quality: 85,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: false,
                        encodingType: Camera.EncodingType.JPEG,
                        saveToPhotoAlbum: false,
                        correctOrientation: false,

                    }).then(function (path) {
                        cacheFiles([path]);
                    });
                };

                var importAlbum = function () {
                    $cordovaImagePicker.getPictures({
                        quality: 85,
                        maximumImagesCount: $scope.MAX_CACHE_SIZE
                            - $scope.files.length,

                    }).then(cacheFiles);
                };

                $scope.capture = function () {
                    var hide = $ionicActionSheet.show({
                        buttons: [{
                            text: '拍照',
                        }, {
                            text: '从相册导入',
                        }],
                        cancelText: '取消',
                        buttonClicked: function (i) {
                            [takePhoto, importAlbum][i]();
                            hide();
                        },
                    });
                };
            })();

            $scope.submit = function () {
                jnHelper.confirm('请确认是否要上传电子档案？')

                    .then(function (confirmed) {
                        var network;

                        if (confirmed) {
                            network = $cordovaNetwork.getNetwork();

                            if ('none' === network) {
                                jnHelper.alert('当前没有网络连接，档案将暂存至“上传列表”');
                                return false;
                            }

                            if ('wifi' !== network) {
                                return jnHelper.confirm('您当前正处于移动网络，点“确定”将会立刻上传档案，点“取消”会暂存至“上传列表”。');
                            }

                            return true;
                        }

                        throw new Error();

                    }).then(function (startUpload) {
                        jnDocCache.toQueue({
                            loanNo: jnPage.params.loanNo,
                            applAmt: $scope.applAmt,
                            custNo: jnPage.params.custNo,
                            custName: $scope.custName,
                            path: $scope.path,
                            modelNo: jnPage.params.modelNo,
                            dirId: jnPage.params.dirId,
                            check: $scope.check,
                        });

                        if (startUpload) {
                            jnDocQueue.startUpload();
                        }
                    });
            };

            $scope.selectLoan = function () {
                if ('1' === jnPage.params.lockLoan ||
                    '1' === jnPage.params.lockCheck) {
                    return;
                }

                $location
                    .search('checkType', null)
                    .search('checkDate', null)
                    .search('dirId', null)
                    .search('path', null)
                    .replace();

                // 避免丢失历史
                setTimeout(function () {
                    jnPage.go('myBusiness', {
                        ref: jnPage.current.name,
                    });
                }, 50);
            };

            $scope.selectDir = function () {
                jnPage.go('DocDir', {
                    bnNo: jnPage.params.loanNo,
                    contTyp: jnPage.params.contTyp,
                    modelId: $scope.modelNo,
                    select: 1,
                });
            };

            $scope.selectCheck = function () {
                if ('1' === jnPage.params.lockCheck) {
                    return;
                }

                $location
                    .search('dirId', null)
                    .search('path', null)
                    .replace();

                // 避免丢失历史
                setTimeout(function () {
                    jnPage.go('loanCheckList', {
                        loanNo: jnPage.params.loanNo,
                        custNo: jnPage.params.custNo,
                        contTyp: jnPage.params.contTyp,
                        ref: jnPage.current.name,
                    });
                }, 50);
            };

            $scope.viewImage = function (image) {
                jnDocImageViewer.open({
                    images: $scope.files,
                    current: image,
                    remove: jnDocCache.remove,
                    rename: jnDocCache.rename,

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

            $scope.onChangeType = function (value) {
                if ($scope.lockType) {
                    return;
                }

                $scope.type = value;

                delete $scope.modelNo;
                delete $scope.checkType;
                delete $scope.checkDate;
                delete $scope.check;
                delete $scope.dirId;
                delete $scope.path;

                $location
                    .search('modelNo', null)
                    .search('checkType', null)
                    .search('checkDate', null)
                    .search('dirId', null)
                    .search('path', null)
                    .replace();
            };
        }
    ]
});
})();
