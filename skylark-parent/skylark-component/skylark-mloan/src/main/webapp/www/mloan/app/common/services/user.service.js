(function () {
'use strict';

angular
    .module('common')
    .factory('jnUser', [
        'jnStorage','$filter',
        function (jnStorage,$filter) {
            var VALID_TIME = 1800000; // 30 分钟
            var STO_KEY_USER = 'user';

            var user = jnStorage.user.get(STO_KEY_USER) || {
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

            var stationMap = {
                '200':'小贷公司管理员',
                '300':'风险审查岗',
                '400':'客户经理岗',
                '500':'团队经理岗',
                '501':'风险审查主管',
                '566':'小贷公司档案员',
                '600':'会计岗',
                '700':'决策岗',
            };
            /**
             * 更新用户信息
             */
            var updateUser = function (u) {
                var p;

                for (p in u) {
                    user[p] = u[p];
                }

                jnStorage.setUser(user.userId);
                jnStorage.user.set(STO_KEY_USER, user);
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
             * 获取当前登录用户最大的岗位ID
             */
            var getMaxStation = function () {
                var stations =user.stationId.split(',');
                return $filter('orderBy')(stations,['-'])[0];
            };
            /**
             * 获取当前登录用户所有岗位
             */
            var getStationNameStr = function () {
                var stations =user.stationId.split(',');
                var stationNames = '';
                 stations.forEach(function(e){
                     if( stationMap[e]){
                         stationNames += stationMap[e] + ',';
                     }
                });
                return stationNames.substring(0,stationNames.length-1);
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

            var service = {
                updateUser: updateUser,
                equalStations: equalStations,
                hasStation: hasStation,
                getMaxStation:getMaxStation,
                getStationNameStr:getStationNameStr
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
