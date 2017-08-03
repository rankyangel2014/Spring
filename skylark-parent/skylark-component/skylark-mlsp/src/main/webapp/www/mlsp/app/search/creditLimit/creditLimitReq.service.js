/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('creditLimit')
    .factory('jnCreditListServer',
        ['jnHttp', 'jnUser','jnHelper','$filter',
        function (jnHttp, jnUser,jnHelper,$filter) {
            return {
                readList: function (params) {
                  
                   params.orgNo = jnUser.insttuId;
                   params.isUseCurOrgNo = 'true';

                   if (jnUser.hasStation('400')) {
                       params.custManagerNo = jnUser.userId;
                   }
                   
	               //格式化日期参数
	               params.startDtFrom = $filter('date')(new Date(params.startDtFrom),'yyyyMMdd');
	               params.startDtTo = $filter('date')(new Date(params.startDtTo),'yyyyMMdd');
	               params.endDtFrom = $filter('date')(new Date(params.endDtFrom),'yyyyMMdd');
	               params.endDtTo = $filter('date')(new Date(params.endDtTo),'yyyyMMdd');
            	
                   params = jnHelper.fillUndef(params);//格式化undefind字段
                    return jnHttp.post('/mlsp/router/rest.do?_transCode=QRY650',
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
