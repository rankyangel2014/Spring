(function () {
'use strict';

angular
    .module('common')
    .factory('jnUser', [
        'jnStorage',
        function (jnStorage) {
            var VALID_TIME = 1800000; // 30 分钟
            var STO_KEY_USER = 'mlsp.user';

            var user = jnStorage.get(STO_KEY_USER) || {
                deptId: '',
                insttuId: '',
                insttuTy: '',
                insttuName: '',
                jyrq: '',
                loginId: '',
                mobile: '',
                stationId: '',
                stationName: '',
                userId: '',
                userName: '',
            };

            /**
             * 更新用户信息
             */
            var updateUser = function (u) {
                var p;

                for (p in u) {
                    user[p] = u[p];
                }

                jnStorage.set(STO_KEY_USER, user);
            };

            /**
             * 是否至少有一个 idsStr 包含的职位
             */
            var hasStation = function (idsStr) {
                var stations = user.stationId.match(/\d+/g);

                return stations.some(function (id) {
                    var re = RegExp('\\b' + id + '\\b');
                    return re.test(idsStr);
                });
            };

            /**
             * 是否与 idsStr 包含的职位完全匹配
             */
            var equalStations = function (idsStr) {
                var stations = user.stationId.match(/\d+/g);
                var ids = idsStr.match(/\d+/g);

                return stations.length === ids.length
                    && stations.every(function (id) {
                        return -1 !== ids.indexOf(id);
                    });
            };

            var clear = function () {
                var p;

                for (p in user) {
                    user[p] = '';
                }

                jnStorage.remove(STO_KEY_USER);
            };

            var service = {
                updateUser: updateUser,
                equalStations: equalStations,
                hasStation: hasStation,
                clear: clear,
            };

            (function () {
                var p;
                for (p in user) {
                    (function (p) {
                        Object.defineProperty(service, p, {
                            get: function () {
                                return user[p];
                            },
                        });
                    })(p);
                }
            })();

            return service;
        }
    ]);

})();
