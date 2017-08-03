/**	
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('entCustOtherList')
    .factory('entCustOtherSer',
        ['jnHttp', 'jnUser', 'jnForm','$q',
        function (jnHttp, jnUser, jnForm,$q) {
            return {
                readList: function (params) {
                    params.orgNo = jnUser.insttuId;
                    params.isUseCurOrgNo = 'true';

                    if (jnUser.hasStation('400')) {
                        params.custManagerNo = jnUser.userId;
                    }
                    
                    return {};
                
                },
                
                qryDetail: function(params){
                	
                	  return  test($q, '/qryDetail', params,rspPB)
                	  			 .post();
                	
                }
                
                
            };
        }]
    );

})();


