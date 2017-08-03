/**
 * 提供待阅事项部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('remind')
    .factory('jnRemind',
        ['jnHttp', 'jnUser', 'jnHelper',
        function (jnHttp, jnUser, jnHelper) {

            return {
                readGroups: function (params) {
                    params = jnHelper.merge(params, {
                        method: 'queryGroup',
                        orgType: '02',
                        userId: jnUser.userId,
                        orgNo: jnUser.insttuId,
                    });

                    return jnHttp.post('/skylark/SysInfoService.do', params)
                        .then(function (rsp) {
                            return {
                                total: rsp.total,
                                items: rsp.root,
                            }
                        });
                },

                readMessages: function (params) {
                    params = jnHelper.merge(params, {
                        method: 'queryList',
                        orgType: '02',
                        userId: jnUser.userId,
                        orgNo: jnUser.insttuId,
                    });

                    return jnHttp.post('/skylark/SysInfoService.do', params)
                        .then(function (rsp) {
                            return {
                                total: rsp.total,
                                items: rsp.root,
                            }
                        });
                },

                setRead: function (params) {
                    params = jnHelper.merge(params, {
                        method: 'setIsRead',
                        operType: '1',
                    });

                    return jnHttp.post('/skylark/SysInfoService.do', params);
                },

                setTop: function (params) {
                    params = jnHelper.merge(params, {
                        method: 'setTop',
                        userId: jnUser.userId,
                        msgTy: '0',
                        operFlag: '1',
                    });

                    return jnHttp.post('/skylark/MaspService.do', params);
                },

                unsetTop: function (params) {
                    params = jnHelper.merge(params, {
                        method: 'setTop',
                        userId: jnUser.userId,
                        msgTy: '0',
                        operFlag: '0',
                    });

                    return jnHttp.post('/skylark/MaspService.do', params);
                },
            };
        }]
    );

})();
