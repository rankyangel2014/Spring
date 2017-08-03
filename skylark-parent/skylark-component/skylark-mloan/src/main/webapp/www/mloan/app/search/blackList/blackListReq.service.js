/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('blackList')
    .factory('jnBlackListServer',
        ['jnHttp', 'jnUser','jnHelper',
        function (jnHttp, jnUser,jnHelper) {
            return {
                readList: function (params) {
                	//blackType 黑名单类型
                	//custType  客户类型
                	//idType    证件类型
                	//idNo      证件号码
//                   params.isBlack = 0;//0：是黑名单（写死）
//                   var blackType = params.blackType;//0:本公司 1：他公司
//                   
//                   var idType = params.idType;//证件类型，0：身份证
//                   var idNo = params.idNo;//证件号码
                   
//                   var code = '';
//                   if( blackType == 0){
//                	   code = 'QRY715';
//                   }else if(blackType == 1){
//                	   code = 'QRY716';
//                   }
                   
//                 if (idType == 0){//身份证
//                	 params.persNo = idNo;
//           		 } else if(idType == 10){//营业执照号
//           			 params.regNo = idNo;
//           		 } else {
//           			 params.liceNo = idNo;
//           		 }
                 params = jnHelper.fillUndef(params);//格式化undefind字段
                return jnHttp.post('/mloan/router/rest/BlackCustQueryAction.do?method=getBlackList',
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
