/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('myBusiness')
    .factory('jnMyBusinessLog',
        ['jnHttp', 'jnUser','$stateParams',
        function (jnHttp, jnUser,$stateParams) {
            return {
                readList: function (params) {
                 
          	   return jnHttp.post('/mloan/router/rest/MloanCommAction.do?method=getLoanInfo',
          			   params).then(function(rsp){
          				 return {
                             items: rsp.loanHisList.root,
                             total: rsp.loanHisList.root.length,
                         };
          			   });
                },
            };
        }]
    );

})();
