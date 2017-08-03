/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('myBusiness')
    .factory('jnMyBusinessLog',
        ['jnHttp', 'jnUser','jnHelper',
        function (jnHttp, jnUser,jnHelper) {
            return {
                readList: function (params) {
                 
               params.orgNo = jnUser.insttuId;
               params.userId = jnUser.userId;
               params.method = 'getApprHistory';
                	
               params = jnHelper.fillUndef(params);//格式化undefind字段
                return jnHttp.post('/skylark/ExamService.do',
                    params)
                    .then(function (rsp) {
                    	for(var i = 0;i<rsp.root.length;i++){
                    		var index = rsp.root[i].examUserid.indexOf("(");
                    		rsp.root[i].examUserid = rsp.root[i].examUserid.substring(0,index);
                    	}
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
