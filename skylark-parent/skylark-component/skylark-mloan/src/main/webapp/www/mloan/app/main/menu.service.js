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
            var STO_KEY_MENU_ITEMS = 'menuItems';
            var STO_KEY_MENU_STYLE = 'menuStyle';

            var requestMenu = function () {
                var params = {
                    method: 'getAuthedMenu',
                    stationIds: jnUser.stationId,
                    ps: 'index',
                    modId:'mloan'
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

            var updateItems = function (items) {
                if (0 < items.length) {
                    jnStorage.user.set(STO_KEY_MENU_ITEMS, items);
                }

                return items;
            };

            var items = function () {
                var items = jnStorage.user.get(STO_KEY_MENU_ITEMS);

                if (items) {
                    requestMenu().then(updateItems);

                    return $q(function (resolve, reject) {
                        resolve(items);
                    });
                }

                return requestMenu().then(updateItems);
            };

            var service = {
                items: items,
            };

            Object.defineProperties(service, {
                style: {
                    get: function () {
                        return jnStorage.user.get(STO_KEY_MENU_STYLE) || 'grid';
                    },

                    set: function (val) {
                        jnStorage.user.set(STO_KEY_MENU_STYLE, val);
                    },
                }
            });

            return service;
    }]);

})();
