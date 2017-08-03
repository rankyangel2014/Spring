(function () {
'use strict';

angular
    .module('common')
    .config([
        'localStorageServiceProvider',
        function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('jsjn');
        }
    ])
    .factory('jnStorage', [
        'localStorageService',
        function (localStorageService) {
            var VERSION = window.HTML_VERSION;

            return {
                get: function (key) {
                    var data = localStorageService.get(key);

                    // 版本化的数据
                    if (data && data.version) {
                        if (data.version === VERSION) {
                            return data.data;
                        }

                        return null;
                    }

                    // 非版本化的数据
                    if (data) {
                        return data;
                    }

                    return null
                },

                set: function (key, value) {
                    return localStorageService.set(key, {
                        version: VERSION,
                        data: value,
                    });
                },

                remove: function (key) {
                    return localStorageService.remove(key);
                },
            };
        }
    ]);

})();
