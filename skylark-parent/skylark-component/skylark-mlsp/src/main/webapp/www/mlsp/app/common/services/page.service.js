(function () {
'use strict';

angular
    .module('common')
    .factory('jnPage', [
        '$rootScope',
        '$window',
        '$state',
        'jnHelper',
        function (
            $rootScope,
            $window,
            $state,
            jnHelper
        ) {
            var STATIC_BACK_TBL = {
                main: '',
                login: '',
                gestureLogin: '',
                setGesturePwd: '',
                remind: 'main',
                todosList: 'main',
                'remindTabs.unread': 'remind',
                'remindTabs.read': 'remind',
                'remindTabs.all': 'remind',
                'custAdd': 'myCustomer',
                'custAddCB': 'myCustomer',
                'myCustomer': 'main',
                'myBusinessReq':'main',
                'reserveCustomerList':'main',
            };

            var service = {};
            var _modified = false;
            var _back = false;

            Object.defineProperties(service, {
                modified: {
                    get: function () {
                        return _modified;
                    },
                    set: function (yn) {
                        _modified = Boolean(yn);
                    },
                },
            });

            service.back = function () {
                var curr = $state.current.name;
                var state = STATIC_BACK_TBL[curr];

                if (void 0 === state) {
                // 静态回退表中没有的状态，正常回退

                    _back = true;
                    $window.history.back();
                } else if ('' !== state) {
                // 静态回退表中有，且不为空的状态，跳转到指定状态

                    $state.go(state);
                }

                // 静态回退表中有，且为空的状态，不进行任何操作
            };

            service.go = function () {
            };

            $rootScope.$on('$stateChangeStart',
                function (e, toState, toParams, fromState, fromParams) {
                    if (! _modified) {
                        _back = false; // reset
                        return;
                    }

                    // $stateChangeStart 触发时，历史已经消失了
                    // 如果此时取消事件，历史会断档，故必需补上消失的历史
                    e.preventDefault();
                    history.pushState(null, null, '#' + fromState.url);

                    jnHelper.confirm('尚未保存，是否退出？')
                        .then(function (confirmed) {
                            if (! confirmed) {
                                return;
                            }

                            if (_back) {
                                $window.history.back();
                            } else {
                                $state.go(toState, toParams);
                            }

                            _modified = false; // reset
                            _back = false; // reset
                        });
                }
            );

            return service;
        }
    ]);

})();
