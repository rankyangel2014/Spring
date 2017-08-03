/**
 * 手势密码管理
 */

(function() {
'use strict';

angular
    .module('common')
    .factory('jnMenu', [
        '$q',
        'jnStorage',
        'jnHttp',
        'jnUser',
        function (
            $q,
            jnStorage,
            jnHttp,
            jnUser
        ) {
            var STO_KEY_MENU_ITEMS = 'mlsp.menuItems';
            var STO_KEY_MENU_STYLE = 'mlsp.menuStyle';

            var requestMenu = function () {
                var params = {
                    method: 'getAuthedMenu',
                    stationIds: jnUser.stationId,
                    ps: 'index',
                    modId:'mlsp'
                };

                return jnHttp.post('/skylark/AuthService.do', params)
                    .then(function (rsp) {
                        return rsp.root.map(function (e) {
                            return {
                                id: e.menuId,
                                name: e.menuName,
                                desc: e.des,
                                url: e.url,
                                icon: e.icon,
                            };
                        });
                    });
            };

            var clear = function () {
                jnStorage.remove(STO_KEY_MENU_ITEMS);
                jnStorage.remove(STO_KEY_MENU_STYLE);
            };

            var items = function () {
                var items = jnStorage.get(STO_KEY_MENU_ITEMS);

                if (items) {
                    return $q(function (resolve, reject) {
                        resolve(items);
                    });
                }

                return requestMenu().then(function (items) {
                    if (0 < items.length) {
                        jnStorage.set(STO_KEY_MENU_ITEMS, items);
                    }

                    return items;
                });
            };

            var service = {
                clear: clear,
                items: items,
            };

            Object.defineProperties(service, {
                style: {
                    get: function () {
                        return jnStorage.get(STO_KEY_MENU_STYLE) || 'grid';
                    },

                    set: function (val) {
                        jnStorage.set(STO_KEY_MENU_STYLE, val);
                    },
                }
            });

            return service;
    }]);

})();
