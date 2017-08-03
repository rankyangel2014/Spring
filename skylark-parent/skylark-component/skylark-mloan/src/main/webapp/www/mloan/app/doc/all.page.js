(function () {
'use strict';

jn.angular.page({
    url: '/doc/all',
    params: [
        'bnNo',
        'bnType',
        'custNo',
        'custName',
        'applAmt',
        'loanStatus',
        'contTyp',
        'checkDate',
        'checkType',
        'modelNo',
        'readonly',
    ],
    controller: [
        '$scope',
        '$q',
        'jnPage',
        'jnHelper',
        'jnDoc',
        'jnDocImageViewer',
        function (
            $scope,
            $q,
            jnPage,
            jnHelper,
            jnDoc,
            jnDocImageViewer
        ) {
            $scope.readonly = '1' === jnPage.params.readonly;

            jnDoc.readAllFiles(jnPage.params).then(function (rsp) {
                $scope.groups = rsp;
            });

            $scope.viewImage = (function () {
                return function (group, file) {
                    var opt = {
                        images: group.files,
                        current: file,

                        loadImage: function (image) {
                            if (image.file) {
                                return $q(function (resolve, reject) {
                                    resolve(image.file);
                                });
                            }

                            return $q(function (resolve, reject) {
                                var img = new Image();

                                img.onload = function () {
                                    image.file = image.fileSrc;
                                    resolve(image.fileSrc);
                                };

                                img.src = image.fileSrc;
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

                            return $q(function (resolve, reject) {
                                var img = new Image();

                                img.onload = function () {
                                    image.thumb = image.thumbSrc;
                                    resolve(image.thumbSrc);
                                };

                                img.src = image.thumbSrc;
                            });
                        },
                    };

                    if (! $scope.readonly) {
                        opt.remove = function (image) {
                            return jnDoc.deleteFile({
                                custNo: jnPage.params.custNo,
                                bnNo: jnPage.params.bnNo,
                                fileNo: image.id,
                                nodeId: image.nodeId,
                                modelNo: image.modelNo,
                            }).then(function () {
                                var idx = group.files.indexOf(file);
                                group.files.splice(idx, 1);

                                if (0 === group.files.length) {
                                    idx = $scope.groups.indexOf(group);
                                    $scope.groups.splice(idx, 1);
                                }
                            });
                        };

                        opt.rename = function (image) {
                            return jnDoc.updateFile({
                                custNo: jnPage.params.custNo,
                                bnNo: jnPage.params.bnNo,
                                fileNo: image.id,
                                fileRName: image.name,
                            });
                        };
                    }

                    jnDocImageViewer.open(opt);
                };
            })();

            $scope.goUpload = function () {
                jnPage.go('DocUpload', {
                    custNo: jnPage.params.custNo,
                    custName: jnPage.params.custName,
                    applAmt: jnPage.params.applAmt,
                    loanNo: jnPage.params.bnNo,
                    loanStatus: jnPage.params.loanStatus,
                    contTyp: jnPage.params.contTyp,
                    checkDate: jnPage.params.checkDate,
                    checkType: jnPage.params.checkType,
                    type: jnPage.params.checkDate ? 1 : 0,
                    modelNo: jnPage.params.modelNo,
                    lockLoan: 1,
                    lockCheck: jnPage.params.checkDate ? 1 : 0,
                    lockType: 1,
                });
            };
        }
    ]
});
})();

