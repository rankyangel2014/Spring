/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('myBusiness')
        .factory('jnMyBusinessServer',
            ['jnHttp', 'jnUser', 'jnHelper',
                function (jnHttp, jnUser, jnHelper) {
                    return {
                        readList: function (params) {

                            //客户经理岗传custManagerNo
                            if (jnUser.hasStation('500|566')) {
                                params.deptId = jnUser.deptId;
                            } else if (jnUser.hasStation('400')) {
                                params.deptId = jnUser.deptId;
                                params.custManagerNo = jnUser.userId;
                            }

                            params = jnHelper.fillUndef(params);//格式化undefind字段
                            return jnHttp.post('/mloan/router/rest/MLoanInfoAction.do?method=getLoanList',
                                params)
                                .then(function (rsp) {

                                    rsp.root.forEach(function (e) {
                                        //e.operateAddress = '中国';
                                        //e.contactAddr = '江苏';
                                        //e.homeAddr = '南京';
                                        //e.workAddr = '雨花台区';
                                        //e.address = '';
                                        if (e.custType == '0') {//个人
                                            if (e.contactAddr) {
                                                e.address = e.contactAddr;//工作地址(个人)

                                            } else if (e.homeAddr) {
                                                e.address = e.homeAddr;//家庭住址(个人)

                                            } else if (e.workAddr) {
                                                e.address = e.workAddr;//联系地址(个人,企业)
                                            }

                                        } else if (e.custType == '1') {//企业
                                            if (e.operateAddress) {
                                                e.address = e.operateAddress;//联系地址(个人,企业)
                                            } else if (e.contactAddr) {
                                                e.address = e.contactAddr;//经营地址(企业)
                                            }
                                        }
                                        //addrList.push(e.contactAddr);//联系地址(个人,企业)
                                        //addrList.push(e.homeAddr);//家庭住址(个人)
                                        //addrList.push(e.operateAddress);//经营地址(企业)
                                        //addrList.push(e.workAddr);//工作地址(个人)
                                    });


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
