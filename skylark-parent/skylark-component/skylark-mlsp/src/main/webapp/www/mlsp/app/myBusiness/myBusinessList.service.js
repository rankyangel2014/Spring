/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('myBusiness')
    .factory('jnMyBusinessServer',
        ['jnHttp', 'jnUser','jnHelper',
        function (jnHttp, jnUser,jnHelper) {
            return {
                readList: function (params) {
                	
               //客户经理岗传custManagerNo
            	if(jnUser.hasStation('400')){
            		params.custManagerNo =  jnUser.userId;
            	}
            	params.orgNo = jnUser.insttuId;
            	
               params = jnHelper.fillUndef(params);//格式化undefind字段
                return jnHttp.post('/mlsp/router/rest.do?_transCode=QRY198',
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
