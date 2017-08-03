/**
 * 提供包装过的HTTP操作服务
 */

(function () {
'use strict';

var DEFAULT_TIMEOUT = 15000;

var jnHttpError = (function () {
    function jnHttpError(message, rsp) {
        this.name = 'jnHttpError';
        this.response = rsp;
        this.message = message;
        this.stack = (new Error()).stack;
    }

    jnHttpError.prototype = Object.create(jn.Error.prototype);
    jnHttpError.prototype.constructor = jnHttpError;

    return jnHttpError;
})();

angular
    .module('common')
    .config([
        '$httpProvider',
        function (
            $httpProvider
        ) {
            $httpProvider.defaults.headers.post['Content-Type'] =
                'application/x-www-form-urlencoded; charset=UTF-8';

            $httpProvider.defaults.transformRequest = function (data) {
                var s = '',
                    k, v, type;

                for (k in data) {
                    v = data[k];
                    type = typeof v;

                    if ('number' === type
                        || 'string' === type
                        || 'boolean' === type) {
                        if ('' !== s) {
                            s += '&';
                        }

                        s += k + '=' + encodeURIComponent(v);
                    }
                }

                return s;
            };
        }
    ])
    .factory('jnHttpRaw', [
        '$q',
        '$http',
        'jnApp',
        function (
            $q,
            $http,
            jnApp
        ) {
            var ERR_MESSAGES = {
                0: '网络不给力，请检查你的网络连接',
                500: '服务器错误',
            };

            var service = {};

            service.request = function (type, url, data, opt) {
                var conf = {
                    method: type,
                    url: jn.util.joinPath(jnApp.baseUrl, url),
                    timeout: (opt && opt.timeout) || DEFAULT_TIMEOUT,
                };

                if ('GET' === type) {
                    conf.params = data;
                } else if ('POST' === type) {
                    conf.data = data;
                }

                return $http(conf).then(
                    function (rsp) {
                        return rsp.data;
                    },
                    function (rsp) {
                        var errMsg = ERR_MESSAGES[rsp.status] || rsp.statusText;
                        return $q.reject(new jnHttpError(errMsg));
                    }
                );
            };

            return service;
        }
    ])
    .factory('jnHttp2', [
        '$state',
        '$ionicLoading',
        'jnApp',
        'jnHttpRaw',
        'jnLogin',
        'jnLoginPopover',
        'jnGestureLoginPopover',
        function (
            $state,
            $ionicLoading,
            jnApp,
            jnHttpRaw,
            jnLogin,
            jnLoginPopover,
            jnGestureLoginPopover
        ) {
            var DEFAULT_OPT = {
                quiet: false,
            };

            var reLogin = (function () {
                var reload = function () {
                    // AngularJS UI-Router 有 BUG，
                    // $state.reload() 不重新初始化 Controller，
                    // 故不能直接使用 $state.reload()。
                    // https://github.com/angular-ui/ui-router/issues/582
                    $state.transitionTo(
                        $state.current.name,
                        $state.params, {
                            reload: true
                        });
                };

                return function () {
                    var popover = jnLogin.isGestureSet() ?
                        jnGestureLoginPopover : jnLoginPopover;

                    popover.open().then(reload);
                };
            })();

            var service = {};

            service.request = function (type, url, data, opt) {
                opt = jn.mix(DEFAULT_OPT, opt || {});

                if (! opt.quiet) {
                    $ionicLoading.show({
                        template: '请稍候...'
                    });
                }

                return jnHttpRaw.request(type, url, data, opt)
                    .then(function (rsp) {
                        var errMsg;

                        if ((0 < rsp.length)
                            || eval(rsp.success) // 有可能会是字符串
                            || '000000' === rsp._rspCode) {

                            // 在 total === 0 的时候有时会没有 root
                            if (0 === rsp.total) {
                                return {
                                    success: true,
                                    root: [],
                                    total: 0,
                                };
                            }

                            return rsp;
                        }

                        errMsg = rsp._rspMsg || rsp.rspMsg || rsp.errMsg;

                        jnHelper.alert(errMsg).then(function () {
                            if ('100000' === rsp._rspCode ||
                                '没有会话信息，请先登录。' === errMsg
                            ) {
                                reLogin();
                            }
                        });

                    }).finally(function () {
                        if (! opt.quiet) {
                            $ionicLoading.hide();
                        }
                    });
            };

            service.pub = function (action, method, data, opt) {
                var url = '/skylark/' + action + '.do?method=' + method;

                return this.request('POST', url, data, opt);
            };

            service.biz = function (action, method, data, opt) {
                var url = '/' + jnApp.id + '/router/rest/'
                    + action + '.do?method=' + method;

                return this.request('POST', url, data, opt);
            };

            return service;
        }
    ]);
})();
