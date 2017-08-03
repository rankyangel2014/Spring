/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('myBusiness')
        .factory('jnMyBusinessService',
            ['jnHttp', 'jnUser', 'jnHelper', '$filter',
                function (jnHttp, jnUser, jnHelper, $filter) {
                    return {
                        readList: function (params) {

                            //格式化日期
//                            params.applDtFrom = $filter('date')(new Date(params.applDtFrom), 'yyyyMMdd');
//                            params.applDtTo = $filter('date')(new Date(params.applDtTo), 'yyyyMMdd');

                            params = jnHelper.fillUndef(params);//格式化undefind字段
                            return jnHttp.post('/mloan/router/rest/MLoanInfoAction.do?method=getLoanList',
                                params)
                                .then(function (rsp) {
                                    return {
                                        items: rsp.root,
                                        total: rsp.total,
                                    };
                                });
                        },
                    };
                }]
        );

})();
