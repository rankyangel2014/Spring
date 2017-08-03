(function () {
'use strict';

angular
    .module('common')
    .factory('jnPage', [
        '$rootScope',
        '$state',
        '$location',
        'jnHelper',
        function (
            $rootScope,
            $state,
            $location,
            jnHelper
        ) {
            var service = {};
            var _modified = false;
            var _back = 0;

            var _history = (function () {
                var _stack = [];

                return {
                    push: function (state) {
                        _stack.push(state);
                    },

                    pop: function (count) {
                        return _stack.splice(- count);
                    },

                    distance: function (state) {
                        var i = _stack.lastIndexOf(state);

                        if (-1 < i) {
                            return _stack.length - i - 1;
                        }

                        return -1;
                    },
                };
            })();

            var _params = (function () {
                var _data = {};

                return {
                    get: function () {
                        return _data;
                    },

                    set: function (dict) {
                        var k;

                        _data = {};

                        if (dict) {
                            for (k in dict) {
                                if (null != dict[k]) {
                                    _data[k] = String(dict[k]);
                                }
                            };
                        }
                    },
                };
            })();

            Object.defineProperties(service, {
                modified: {
                    get: function () {
                        return _modified;
                    },
                    set: function (yn) {
                        _modified = Boolean(yn);
                    },
                },

                params: {
                    get: function () {
                        return $state.params;
                    },
                },

                current: {
                    get: function () {
                        return $state.current;
                    },
                },
            });

            service.back = function (data) {
                var curr = $state.current.name;
                var backTo = $state.current.jnBackTo;

                _params.set(data);

                if (void 0 === backTo) {
                // 没有指定状态

                    // 正常回退
                    _back = 1;
                    window.history.back();

                } else if ('' !== backTo) {
                // 指定了状态

                    // 跳转到指定状态
                    this.backTo(backTo, data);
                }

                // 如果是空字符串则不进行任何操作
            };

            service.backTo = function (state, data) {
                var dist = _history.distance(state);

                if (0 < dist) {
                    _back = dist;
                    _params.set(data);

                    window.history.go(-dist);
                } else {
                    service.go(state, data);
                }
            };

            service.go = function (state, data) {
                _params.set(data);
                $state.go(state, data);
            };

            $rootScope.$on('$stateChangeStart',
                function (e, toState, toParams, fromState, fromParams) {
                    if (_modified) {
                        e.preventDefault();

                        jnHelper.confirm('尚未保存，是否退出？')
                            .then(function (confirmed) {
                                if (! confirmed) {
                                    return;
                                }

                                _modified = false;

                                if (0 < _back) {
                                    window.history.go(- _back);

                                } else {
                                    $state.go(toState, toParams);
                                }
                            });

                    } else {
                        (function () {
                            var userParams = _params.get();
                            var p;

                            for (p in userParams) {
                                toParams[p] = userParams[p];
                            }

                            _params.set(toParams);
                        })();
                    }

                }
            );

            $rootScope.$on('$stateChangeSuccess',
                function (e, toState, toParams, fromState, fromParams) {
                    if (0 === _back) {
                        if (! toState.jnVirtual && toState !== fromState) {
                            _history.push(toState.name);
                        }

                    } else {
                        _history.pop(_back);
                        _back = 0; // reset
                    }

                    _params.set();
                }
            );

            $rootScope.$on('$locationChangeStart', function (e, to ,from) {
                if (_modified) {
                    e.preventDefault();

                    jnHelper.confirm('尚未保存，是否退出？')
                        .then(function (confirmed) {
                            if (! confirmed) {
                                return;
                            }

                            _modified = false;

                            if (0 < _back) {
                                window.history.go(- _back);

                            } else {
                                window.location.href = to;
                            }
                        });

                }
            });

            $rootScope.$on('$locationChangeSuccess', function (e, to, from) {
                var params;

                if (0 < _back) {
                    params = $location.search();
                    params = jnHelper.merge(params, _params.get());
                    $location.search(params).replace();
                }
            });

            return service;
        }
    ]);

})();
