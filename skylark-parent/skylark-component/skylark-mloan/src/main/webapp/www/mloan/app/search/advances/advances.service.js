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
                                            'deptId':params.deptId,
                                        });
                                        params = jnHelper.fillUndef(params);
                                        return jnHttp
                                                .post( '/mloan/router/rest/LoanAcIssueQryAction.do?method=acIssueQuery',
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
                                                .post( '/mloan/router/rest/LoanDetailAction.do?method=getLoanApplyDtl',
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
