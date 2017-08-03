/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('todos')
    .factory('jnTodosListService',
        ['jnHttp', 'jnUser','jnHelper',
        function (jnHttp, jnUser,jnHelper) {
            return {
                queryGroup: function (params) {
                    
                    params = jnHelper.merge(params, {
                        'method' : 'queryGroup',
                        'orgNo' : jnUser.insttuId,
                        'userId' : jnUser.userId,
                        'stationId' : jnUser.stationId,
                        'orgType' : jnUser.insttuTy,
                    });
                    
                    return jnHttp.post('/skylark/ExamService.do', 
                            params).then(function (rsp) {
                        return {
                            items: rsp.root,
                            total: rsp.total,
                        };
                    });
                },
                queryList : function(params) {

                    params = jnHelper.merge(params, {
                        'method' : 'queryList',
                        'orgNo' : jnUser.insttuId,
                        'userId' : jnUser.userId,
                        'stationId' : jnUser.stationId,
                        'pendType' : params.pendType,
                        'operType' : params.operType,
                    });

                    return jnHttp.post('/skylark/ExamService.do',
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
