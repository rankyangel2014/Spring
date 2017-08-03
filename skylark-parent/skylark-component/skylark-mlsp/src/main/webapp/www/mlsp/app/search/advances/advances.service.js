/**
 * 提供客户查询部分的后台交互服务
 */

(function() {
    'use strict';

    angular
            .module('advances')
            .factory(
                    'jnAdvancesService',
                    [
                            'jnHttp',
                            'jnUser',
                            'jnHelper',
                            '$filter',
                            function(jnHttp, jnUser,jnHelper,$filter) {
                                return {
                                    readList : function(params) {
                                        
                                        params = jnHelper.merge(params, {
                                            'custName':params.custName,//客户名
                                            'dtStart':$filter('date')(new Date(params.dtStart),'yyyy-MM-dd'),//放款日期起始
                                            'dtEnd':$filter('date')(new Date(params.dtEnd),'yyyy-MM-dd'),//放款日期结束
                                            'contNoExt':params.contNoExt,//贷款合同号
                                            'custManagerNo':params.custManagerNo,
                                        });
                                        if (jnUser.hasStation('400')) {
                                            params.custManagerNo =  jnUser.userId;
                                        }
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                                .post( '/mlsp/router/rest.do?_transCode=QRY340',
                                                        params)
                                                .then(function(rsp) {
                                                    return {
                                                        items : rsp.root,
                                                        total : rsp.total,
                                                    };
                                                });
                                    },
                                    readSingle:function(params) {
                                        return jnHttp
                                                .post( '/mlsp/router/rest.do?_transCode=QRY350',
                                                        params)
                                                .then(function(rsp) {
                                                    return {
                                                        items : rsp.root,
                                                        total : rsp.total,
                                                    };
                                                });
                                    },
                                };
                            } ]);

})();
