(function () {
'use strict';
angular
    .module('app')
    .factory('jnFS', [
        '$q',
        '$cordovaFile',
        function (
            $q,
            $cordovaFile
        ) {
            var ROOT_DIR = cordova.file.dataDirectory;

            var service = {};

            service.mkdir = function (path) {
                path = path.replace(/^\//, '').split('/');

                path.forEach(function (e, i, arr) {
                    if (0 < i) {
                        arr[i] = arr[i - 1] + '/' + e;
                    }
                });

                return $q.all(path.map(function (p) {
                    return $cordovaFile.checkDir(ROOT_DIR, p)
                        .catch(function () {
                            return $cordovaFile.createDir(ROOT_DIR, p);
                        });
                }));
            };

            service.write = function (path, content) {
                var dir = path.replace(/\/[^/]+$/, '');

                return service.mkdir(dir).then(function () {
                    return $cordovaFile.writeFile(ROOT_DIR, path, content);
                });
            };

            service.read = function (path) {
                return $cordovaFile.readAsText(ROOT_DIR, path);
            };

            service.readRaw = function (path) {
                return $cordovaFile.readAsArrayBuffer(ROOT_DIR, path);
            };

            service.delete = function (path) {
                return $cordovaFile.removeFile(ROOT_DIR, path);
            };

            return service;
        }]
    );
})();
