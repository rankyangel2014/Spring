/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('comprehensiveQry')
    .factory('jnCompQryListServer',
        ['jnHttp', 'jnUser','jnHelper','$filter',
        function (jnHttp, jnUser,jnHelper,$filter) {
            return {
                readList: function (params) {
                  
//                	 params.orgNo = jnUser.insttuId;
//                     params.insttuId = jnUser.insttuId;
//                     params.userId = jnUser.userId;
                     params.isUseCurOrgNo = true;
                     var re = new RegExp('[-/]','g');
                     params.queryDt = params.queryDt.replace(re, '');
//                     var tCode = '';
//                     if (params.queryDt === jnUser.jyrq) {
//                         tCode = 'QRY623';
//                     } else {
//                         tCode = 'QRY624';
//                     }
                     
                 	//格式化日期参数
                 	params.intStartDtFrom = $filter('date')(new Date(params.intStartDtFrom),'yyyyMMdd');
                 	params.intStartDtTo = $filter('date')(new Date(params.intStartDtTo),'yyyyMMdd');
                 	params.lastDueDtFrom = $filter('date')(new Date(params.lastDueDtFrom),'yyyyMMdd');
                 	params.lastDueDtTo = $filter('date')(new Date(params.lastDueDtTo),'yyyyMMdd');
            	
                    params = jnHelper.fillUndef(params);//格式化undefind字段
                    return jnHttp.post('/mloan/router/rest/LoanComInfoAction.do?method=loanComInfoQuery',
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
