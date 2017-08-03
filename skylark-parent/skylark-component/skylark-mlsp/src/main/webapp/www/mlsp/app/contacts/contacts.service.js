/**
 * 提供企业通讯录部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('contacts')
        .factory('jnContactsService',
            ['jnHttp', 'jnUser', 'jnHelper',
                function (jnHttp, jnUser, jnHelper) {

                    return {
                        queryAllContacts: function (params) {
                            params = jnHelper.merge(params, {
                                'method': 'getAllContact', //必要
                                'orgno': jnUser.insttuId, //必要
                                'keywords' :params.keywords,
                                'insttuName' : jnUser.insttuName, //必须
                            });
                            return jnHttp.post('/skylark/OfficeService.do', params)
                                .then(function (rsp) {
                                    return {
                                        total: rsp.total,
                                        items: rsp.data,
                                    };
                                });
                        },
                        
//                        queryContactList: function (params) {
//                            params = jnHelper.merge(params, {
//                                method: 'getContactList', //必要
//                                officeId: '0', //必要
//                                keywords :params.keywords,
//                            });
//                            return jnHttp.post('/skylark/ContactService.do', params)
//                                .then(function (rsp) {
//                                    return {
//                                        total: rsp.total,
//                                        items: rsp.root,
//                                    }
//                                });
//                        },
                        querySingleContact: function (params) {
                            params = jnHelper.merge(params, {
                                method: 'getContact1', //必要
                                contactId: params.contactId, //必要
                            });
                            return jnHttp.post('/skylark/ContactService.do', params)
                                .then(function (rsp) {
                                    return {
                                        items: rsp.data,
                                    }
                                });
                        },
//                        querySingleContactByCondition: function (params) {
//                            params = jnHelper.merge(params, {
//                                method: 'getContact2', //必要
//                                contantId: '18', //必要
//                                name: 'Name', //必要
//                                telNo: '13911111111' //必要
//                            });
//                            return jnHttp.post('/skylark/ContactService.do', params)
//                                .then(function (rsp) {
//                                    return {
//                                        items: rsp.data,
//                                    }
//                                });
//                        },
                    };
                }]
        );

})();
