/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

function test($q,url,params,rsp){
    var t={
    		post:function(){
    			var deferred= $q.defer();
    			if(typeof rsp!="object") 
    			rsp=JSON.parse(rsp);
    			deferred.resolve(rsp);
    			var promise = deferred.promise;
    			return promise;
    		}
    };
    return t;

}

angular
    .module('entCustDetail')
    .factory('entCustSer',
        ['jnHttp', 'jnUser', 'jnForm','$q',
        function (jnHttp, jnUser, jnForm,$q) {
            return {
                qryDetail: function(params){
                	params.userId = jnUser.userId;
                	 return jnHttp.post(
                             '/mlsp/router/rest.do?_transCode=QRY106', params);
                	
                },
            qryDetailForPe: function(params){
            	if(params.linkType=='19'){
            		 return jnHttp.post(
                             '/mlsp/router/rest.do?_transCode=ENT102', {
                            	 "custNo":params.custNo,
                            	 "linkType":"19",
                            	 "defFlag":"0",
                             });
            	}
            	if(params.linkType=='23'){
            		
            		 return jnHttp.post(
                             '/mlsp/router/rest.do?_transCode=ENT101', {
                            	 "custNo":params.custNo,
                            	 "linkType":"23",
                            	 "defFlag":"0",
                             });
            	}
            	
            }
                
                
            };
        }]
    );

})();


