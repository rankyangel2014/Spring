(function () {
'use strict';

angular
    .module('common')
    .factory('jnStorage', [
        'jnApp',
        function (
            jnApp
        ) {
            var APP_PREFIX = jnApp.id + '.';

            var get = function (prefix, key, fallback) {
                var val = localStorage.getItem(prefix + key);

                if (val) {
                    val = JSON.parse(val);

                    if (val.version === jnApp.version) {
                        return val.data;
                    }
                }

                if (undefined !== fallback) {
                    return fallback;
                }

                return null;
            };

            var set = function (prefix, key, value) {
                if (undefined === value) {
                    return;
                }

                value = JSON.stringify({
                    version: jnApp.version,
                    data: value,
                });

                return localStorage.setItem(prefix + key, value);
            };

            var rm = function (prefix, key) {
                return localStorage.removeItem(prefix + key);
            };

            var user = get(APP_PREFIX, 'lastUser');

            var userPrefix = function () {
                return APP_PREFIX + user + '.';
            };

            var temp = {};

            return {
                app: {
                    get: function (key, fallback) {
                        return get(APP_PREFIX, key, fallback);
                    },

                    set: function (key, value) {
                        return set(APP_PREFIX, key, value);
                    },

                    rm: function (key) {
                        return rm(APP_PREFIX, key);
                    },
                },

                user: {
                    get: function (key, fallback) {
                        return get(userPrefix(), key, fallback);
                    },

                    set: function (key, value) {
                        return set(userPrefix(), key, value);
                    },

                    rm: function (key) {
                        return rm(userPrefix(), key);
                    },

                    clear: function () {
                        var prefix = userPrefix();
                        var key;

                        for (key in localStorage) {
                            if (0 === key.indexOf(prefix)) {
                                localStorage.removeItem(key);
                            }
                        }
                    },
                },

                temp: {
                    get: function (key, fallback) {
                        var val = temp[key];

                        if (undefined !== val) {
                            delete temp[key];
                            return val;
                        }

                        if (undefined !== fallback) {
                            return fallback;
                        }

                        return null;
                    },

                    set: function (key, value) {
                        temp[key] = value;
                    },
                },

                setUser: function (uid) {
                    user = uid;
                    set(APP_PREFIX, 'lastUser', uid);
                },
            };
        }
    ]);

})();
