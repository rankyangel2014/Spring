/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';
    angular.module('warning').factory('jnWarningService',
        ['jnHttp', 'jnUser', 'jnHelper', '$filter', function (jnHttp, jnUser, jnHelper, $filter) {
            return {
                getWarningList: function (params) {
                    params = jnHelper.merge(params, {
                        dueDate: $filter('date')(new Date().setTime(params.dueDate), 'yyyyMMdd'),
                        loanNo: params.loanNo,
                        contNoExt: params.contNoExt,
                        custName: params.custName,
                        overdueDays: params.overdueDays,
                        deptId: params.deptId,
                        custManagerNo: params.custManagerNo,
                    });
                    params = jnHelper.fillUndef(params);
                    return jnHttp
                        .post('/mloan/router/rest/DuwWarningAction.do?method=getRegDueLoanContInfos',
                            params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                },
            };
        }]);
})();
