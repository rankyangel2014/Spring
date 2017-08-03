/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('todos')
    .factory('jnTodosListService',
        ['jnHttp', 'jnUser','jnHelper','$filter',
        function (jnHttp, jnUser,jnHelper,$filter) {
            return {
                queryGroup: function (params) {
                    
                    params = jnHelper.merge(params, {
                        method: 'queryGroup',
                        orgNo: jnUser.insttuId,
                        userId: jnUser.userId,
                        stationId: jnUser.stationId,
                        orgType: jnUser.insttuTy,
                        zwrq: jnUser.jyrq,
                    });
                    
                    return jnHttp.post('/skylark/ExamService.do', params)
                        .then(function (rsp) {
                            var items = rsp.root.filter(function (e) {
                                return '0' !== e.unReadTotal
                                    && (e.hisTotal + e.persionTotal
                                        + e.stationTotal);
                            });

                            return {
                                items: items,
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

                claim: function (params) {
                    params = jnHelper.merge(params, {
                        'method': 'ideal',
                        'userId': jnUser.userId,
                    });

                    return jnHttp.post('/skylark/ExamService.do', params);
                },
            };
        }]
    );

})();
