/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('todos')
    .factory('jnNoticesService',
        ['jnHttp', 'jnUser','jnHelper',
        function (jnHttp, jnUser,jnHelper) {
            return {
                'queryList': function (params) {
                    
                    params = jnHelper.merge(params, {
                        'method' : 'query',
                        'orgNo' : jnUser.insttuId,
                    });
                    return jnHttp.post('/skylark/SysNoticeService.do', 
                            params).then(function (rsp) {
                        return {
                            items: rsp.root,
                            total: rsp.total,
                        };
                    });
                },
                'queryDetail': function(params) {

                    params = jnHelper.merge(params, {
                        'method' : 'query',
                        'orgNo' : jnUser.insttuId,
                        'noticeId' : params.noticeId,
                    });
                    return jnHttp.post('/skylark/SysNoticeService.do',
                            params).then(function(rsp) {
                        return {
                            items : rsp.root,
                            total : rsp.total,
                        };
                    });
                },
            };
        }]
    );

})();
