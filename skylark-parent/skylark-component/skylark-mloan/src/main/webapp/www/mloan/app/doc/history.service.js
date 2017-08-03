(function () {
'use strict';
angular
    .module('app')
    .factory('jnDocHistory', [
        '$q',
        'jnHelper',
        'jnStorage',
        'jnDocImage',
        function (
            $q,
            jnHelper,
            jnStorage,
            jnDocImage
        ) {
            var STO_KEY = 'doc.history';

            var service = {};

            var _files = jnStorage.user.get(STO_KEY, []);

            var _save = function () {
                var files = _files.map(function (f) {
                    return {
                        id: f.id,
                        url: f.url,
                        thumbUrl: f.thumbUrl,
                        name: f.name,
                        applAmt: f.applAmt,
                        custName: f.custName,
                        path: f.path,
                        check: f.check,
                        ctime: f.ctime,
                    };
                });

                jnStorage.user.set(STO_KEY, files);
            };

            service.push = function (file) {
                _files.unshift(file);
                _save();
            };

            service.clear = function () {
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
