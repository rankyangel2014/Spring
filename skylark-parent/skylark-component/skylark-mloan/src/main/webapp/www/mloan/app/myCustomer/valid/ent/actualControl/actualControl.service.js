/**
 * 提供客户查询部分的后台交互服务--个人客户（实体信息）
 */

(function () {
    'use strict';
    angular
        .module('custOtherList')
        .factory('custActualService',
            ['jnHttp', 'jnUser', 'jnForm', 'jnHelper', '$filter',
                function (jnHttp, jnUser, jnForm, jnHelper, $filter) {
                    return {
                        readCustByCondition: function (type, params) {
                            //个人
                            if (type == 'paper') {
                                //更具身份证查询客户信息
                                return jnHttp.post(
                                    '/mloan/router/rest/FormalServicedAction.do?method=getCustByCondition', params, {
                                        quiet: true,
                                    })
                                    .then(function (rsp) {
                                        console.info(rsp);
                                        return {
                                            data: rsp.data,
                                            success: rsp.success,
                                        };
                                    });
                            }
                            //企业
                            if (type == 'liceNo') {
                                //更具身份证查询客户信息
                                return jnHttp.post(
                                    '/mloan/router/rest/FormalServicedAction.do?method=getSingleFormalPEntity', params, {
                                        quiet: true,
                                    })
                                    .then(function (rsp) {
                                        console.info(rsp);
                                        return {
                                            data: rsp.data,
                                            success: rsp.success,
                                        };
                                    });
                            }
                            //企业
                            if (type == 'regNo') {
                                //更具身份证查询客户信息
                                return jnHttp.post(
                                    '/mloan/router/rest/FormalServicedAction.do?method=getSingleFormalPEntity', params, {
                                        quiet: true,
                                    })
                                    .then(function (rsp) {
                                        console.info(rsp);
                                        return {
                                            data: rsp.data,
                                            success: rsp.success,
                                        };
                                    });
                            }
                        },
                        readActualList: function (params) {
                            //实际控制人
                            params.linkType = '14';
                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=getFormalEnbSharePInfo', params)
                                .then(function (rsp) {
                                    console.info(rsp);
                                    return {
                                        items: rsp.root,
                                        total: rsp.total,
                                    };
                                });
                        },
                        readActual: function (params) {
                            return jnHttp.post(
                                '/mloan/router/rest/ModifyCustAction.do?method=getGlr', params)
                                .then(function (rsp) {
                                    return rsp;
                                });
                        },
                        readActualById: function (params) {
                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=qryKzPerson', params,{
                                    quiet: true,
                                })
                                .then(function (rsp) {
                                    return rsp;
                                });
                        },
                        readEntActualById: function (params) {
                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=qryKzCust', params,{
                                    quiet: true,
                                })
                                .then(function (rsp) {
                                    return rsp;
                                });
                        },
                        //新增或修改控制人信息
                        addActual: function (params) {
                            params.linkType = '14';
                            return jnHttp.post('/mloan/router/rest/ModifyCustAction.do?method=updateCustLinkPInfo',
                                params).then(function (rsp) {
                                return rsp;
                            });
                        },
                        delActual: function (params) {
                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=updateCustLinkEnbInfo', params);
                        }
                    };
                }]
        );
})();
