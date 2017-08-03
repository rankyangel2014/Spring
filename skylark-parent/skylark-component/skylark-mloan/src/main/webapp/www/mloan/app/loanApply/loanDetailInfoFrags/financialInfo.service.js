/**
 * 提供客户查询部分的后台交互服务
 */
(function () {
    'use strict';
    angular
        .module('loanApply')
        .factory(
            'FinancialInfoService',
            [
                'jnHttp',
                'jnUser',
                '$stateParams',
                function (jnHttp, jnUser, $stateParams) {
                    return {
                    	// 获得财务信息概述
                    	getFinancialInfo: function (params) {
                            return jnHttp
                                .post(
                                    '/mloan/router/rest/PsnCustInfoCommAction.do?method=getFinancialInfo',
                                    params).then(
                                    function (rsp) {
                                        return rsp;
                                    });
                        },
                        // 保存财务信息概述
                        saveFinancialInfo: function (params) {
                        	return jnHttp
                            .post(
                                '/mloan/router/rest/PsnCustInfoCommAction.do?method=financialAction',
                                params).then(
                                function (rsp) {
                                    return rsp;
                                });
                        }
                    };
                }]);

})();
