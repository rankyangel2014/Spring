/**
 * 提供包装过的HTTP操作服务
 */

(function () {
'use strict';

var serialize = function (data) {
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

var SessionExpiredError = (function () {
    function E(message) {
        this.name = 'SessionExpiredError';
        this.message = message;
        this.stack = (new Error()).stack;
    }

    E.prototype = Object.create(Error.prototype);
    E.prototype.constructor = E;

    return E;
})();

angular
    .module('common')
    .config([
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.defaults.headers.post['Content-Type'] =
                'application/x-www-form-urlencoded; charset=UTF-8';
            $httpProvider.defaults.transformRequest = serialize;
        }
    ])
    .factory('jnHttp', [
        '$state',
        '$http',
        '$ionicPopup',
        '$ionicLoading',
        'jnStorage',
        'jnHelper',
        'jnLoginPopover',
        function (
            $state,
            $http,
            $ionicPopup,
            $ionicLoading,
            jnStorage,
            jnHelper,
            jnLoginPopover
        ) {
            var BASE_URL = jnStorage.get('sysConfig.baseUrl') || '/skylark';

            var ERR_MESSAGES = {
                0: '网络不给力，请检查你的网络连接',
                500: '服务器错误',
            };

            var DEFAULT_POST_OPT = {
                quiet: false,
            };

            var request = function (type, url, data) {
                var conf = {
                    method: type,
                    url: BASE_URL + url,
                    timeout: 15000,
                };

                if ('GET' === type) {
                    conf.params = data;
                } else if ('POST' === type) {
                    conf.data = data;
                }

                return $http(conf).then(function (rsp) {
                    var errMsg;

                    if (eval(rsp.data.success) // 有可能会是字符串
                        || '000000' === rsp.data._rspCode) {

                        return rsp.data;
                    }

                    errMsg = rsp.data._rspMsg
                        || rsp.data.rspMsg
                        || rsp.data.errMsg;

                    if ('100000' === rsp.data._rspCode
                        || '没有会话信息，请先登录。' === rsp.data.errMsg
                    ) {
                        throw new SessionExpiredError(errMsg);
                    }

                    throw new Error(errMsg);

                }, function (rsp) {
                    var errMsg = ERR_MESSAGES[rsp.status] || rsp.statusText;
                    throw new Error(errMsg);
                });
            };

            var sendRequest = function (type, url, data, opt) {
                opt = jnHelper.merge(DEFAULT_POST_OPT, opt || {});

                if (! opt.quiet) {
                    $ionicLoading.show({
                        template: '请稍候...'
                    });
                }

                return request(type, url, data).then(function (rsp) {
                    if (! opt.quiet) {
                        $ionicLoading.hide();
                    }

                    return rsp;

                }, function (err) {
                    if (! opt.quiet) {
                        $ionicLoading.hide();
                        jnHelper.alert(err.message).then(function () {
                            if (err instanceof SessionExpiredError) {
                                jnLoginPopover.show({
                                    onClose: function () {
                                        /**
                                         * AngularJS UI-Router 有 BUG，$state.reload() 不重新初始化 Controller，故不能直接使用 $state.reload()。
                                         * https://github.com/angular-ui/ui-router/issues/582
                                         */
                                        $state.transitionTo(
                                            $state.current.name,
                                            $state.params,
                                            {
                                                reload: true
                                            });
                                    },
                                });
                            }
                        });
                    }

                    throw err;
                });
            };

            return {
                request: request,

                get: function (url, data, opt) {
                    return sendRequest('GET', url, data, opt);
                },

                post: function (url, data, opt) {
                    return sendRequest('POST', url, data, opt);
                },
            };
        }
    ]);

})();
