(function () {
'use strict';
angular
    .module('app')
    .factory('jnDoc', [
        '$q',
        'jnApp',
        'jnHttp2',
        function (
            $q,
            jnApp,
            jnHttp2
        ) {
            var service = {};

            var getModelId = function (bnNo) {
                return jnHttp2.biz('ERecordAction', 'getModelIdByLoanNo', {
                    bnNo: bnNo,
                    paramName: 'bef_model_id',
                })
                .then(function (rsp) {
                    return rsp.data.paramValue;
                });
            };

            /**
             * bnNo
             * modelId*
             */
            service.readDirTree = (function () {
                var parseNode = function (node, pNode) {
                    var n = {
                        id: node.id,
                        text: node.text,
                        parent: pNode,
                    };

                    if ('N' === node.isLeaf) {
                        n.children = node.children.map(function (e) {
                            return parseNode(e, n);
                        });
                    }

                    return n;
                };

                var getTree = function (bnNo, modelId) {
                    return jnHttp2.biz('ERecordAction', 'getTreeNodeList', {
                        bnNo: bnNo,
                        modelId: modelId,
                    })
                    .then(function (rsp) {
                        var tree = {
                            model: modelId,
                        };

                        tree.children = rsp.map(function (e) {
                            return parseNode(e, tree);
                        });

                        return tree;
                    });
                };

                return function (params) {
                    if (params.modelId) {
                        return getTree(params.bnNo, params.modelId);
                    }

                    return getModelId(params.bnNo).then(function (modelId) {
                        return getTree(params.bnNo, modelId);
                    });
                };
            })();

            /**
             * custNo
             * bnNo 贷款合同号
             * fileType
             * fileNo
             * nodeId
             */
            service.deleteFile = function (params) {
                params = jn.mix({
                    operate: 1,
                    bnType: 10,
                }, params);

                return jnHttp2.biz('ERecordAction', 'uploadFileData', params);
            };

            /**
             * custNo
             * bnNo 贷款合同号
             * fileType
             * fileNo
             * fileRName
             */
            service.updateFile = function (params) {
                params = jn.mix({
                    operate: 2,
                    bnType: 10,
                }, params);

                return jnHttp2.biz('ERecordAction', 'uploadFileData', params);
            };

            /**
             * custNo
             * bnNo 贷款合同号
             * nodeId
             * modelNo
             * fileData
             * fileName
             * width
             * height
             */
            service.uploadFile = function (params, canceller) {
                var opt = {
                    quiet: true,
                    timeout: canceller,
                };

                params = jn.mix({
                    operate: 0,
                    bnType: 10,
                    thumbName: 'xxx',
                }, params);

                return jnHttp2.biz('ERecordAction', 'uploadAttachment',
                    params, opt
                )
                .then(function (rsp) {
                    return {
                        file: rsp.data.fileSrc,
                        thumb: rsp.data.thumbSrc,
                    };
                });
            };

            /**
             * bnNo 贷款合同号
             */
            service.readAllFiles = (function () {
                var SUPPORTED_FILE_TYPES = [
                    'jpg',
                    'jpeg',
                    'png',
                    'gif',
                    'tif',
                    'tiff',
                ];

                var isSupported = function (filename) {
                    var ext = jn.util.extFromFilename(filename);
                    return -1 < SUPPORTED_FILE_TYPES.indexOf(ext);
                };

                var parse = function (rsp) {
                    var groups = {};
                    var list = [];
                    var k;

                    rsp.root.forEach(function (e) {
                        var path = e.nodePath;

                        if (! isSupported(e.fileName)) {
                            return;
                        }

                        if (! groups[path]) {
                            groups[path] = [];
                        }

                        groups[path].push({
                            id: e.fileNo,
                            cdate: e.crtDate,
                            name: e.fileName,
                            size: e.fileSize,
                            fileSrc: jn.util.joinPath(
                                jnApp.baseUrl, e.fileSrc),
                            thumbSrc: jn.util.joinPath(
                                jnApp.baseUrl, e.thumb),
                            modelNo: e.modelNo,
                            nodeId: e.nodeId,
                        });
                    });

                    for (k in groups) {
                        list.push({
                            path: k.split('>'),
                            files: groups[k],
                        });
                    }

                    return list;
                };

                return function (params) {
                    params = jn.mix(params, {
                        bnType: 10,
                    });

                    if (params.modelNo) {
                        return jnHttp2.biz('ERecordAction', 'getAllFileList',
                            params
                        )
                        .then(parse);
                    }

                    return getModelId(params.bnNo).then(function (modelNo) {
                        params.modelNo = modelNo;

                        return jnHttp2.biz('ERecordAction', 'getAllFileList',
                            params
                        )
                        .then(parse);
                    });
                };
            })();

            service.getUploadMaxSize = (function () {
                var size;

                return function () {
                    if (size) {
                        return $q(function (resolve, reject) {
                            resolve(size);
                        });
                    }

                    return jnHttp2.biz('param', 'getOrgParamByCode', {
                            parCde: 'MAX_PIC_UNCONDENSE_SIZE',
                    })
                    .then(function (res) {
                        size = res.parValue;
                        return size;
                    });
                };
            })();

            return service;
        }]
    );
})();
