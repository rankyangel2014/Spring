/**
 * 提供客户查询部分的后台交互服务--个人客户（实体信息）
 */

(function () {
    'use strict';
    angular
        .module('custOtherList')
        .factory('custEntityService',
            ['jnHttp', 'jnUser', 'jnForm', 'jnHelper', '$filter',
                function (jnHttp, jnUser, jnForm, jnHelper, $filter) {
                    return {
                        readEntityList: function (params) {//实体信息列表

                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=getFormalPEntitys', params)
                                .then(function (rsp) {
                                    console.info(rsp);
                                    return {
                                        items: rsp.root,
                                        total: rsp.total,
                                    };
                                });
                        },
                        readEntity: function (params) { //实体信息

                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=getSingleFormalPEntity', params, {
                                    quiet: true,
                                })
                                .then(function (rsp) {
                                    console.info(rsp);
                                    return rsp;
                                });
                        },
                        readEntityPartner: function (params) {
                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=getEntityShare', params)
                                .then(function (rsp) {
                                    console.info(rsp);
                                    if (rsp.total == 0) {
                                        return {
                                            items: [],
                                            total: rsp.total,
                                        };
                                    }
                                    return {
                                        items: rsp.root,
                                        total: rsp.total,
                                    };
                                });
                        },
                        addEntity: function (params) {
                            //实体信息添加
                            var businessStartDt = $filter('date')(params.businessStartDt, 'yyyyMMdd');
                            params = {
                                'custNo': params.custNo,
                                'shareJson': params.json,
                                'regNoTmp': params.regNo,
                                'liceNoTmp': params.liceNo,
                                'opt': params.opt,
                                'custName': params.custName,
                                'custNameTmp': params.custName,
                                'orgForm': params.orgForm,
                                'liceNoOrNewCard': params.liceNoOrNewCard,
                                'regNo': params.regNo,
                                'liceNo': params.liceNo,
                                'mainBusiness': params.mainBusiness,
                                'employeeNum': params.employeeNum,
                                'corpReprst': params.corpReprst,
                                'fixPhone': params.fixPhone,
                                'orgType': params.orgType,
                                'loanPerdFrom': params.loanPerdFrom,
                                'loanPerdTo': params.loanPerdTo,
                                'businessHours': params.businessHours,
                                'addressType': params.addressType,
                                'addressArea': params.addressArea,
                                'businessStartDt': businessStartDt,
                                'address': params.address,
                                'entCustNo': params.entCustNo,
                                'corpCustNo': params.corpCustNo
                            };
                            params = jnHelper.fillUndef(params);


                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=modifyFormalPEntity', params)
                                .then(function (rsp) {
                                    return rsp;
                                });
                        },
                        updateEntity: function (params) {
                            //实体信息修改
                            var tmp = $filter('date')(params.businessStartDt, 'yyyyMMdd');
                            params = {
                                'custNo': params.custNo,
                                'custNameTmp': params.custName,
                                'regNoTmp': params.regNo,
                                'liceNoTmp': params.liceNo,
                                'mainBusiness': params.mainBusiness,
                                'orgForm': params.orgForm,
                                'corpReprst': params.corpReprst,
                                'employeeNum': params.employeeNum,
                                'orgType': params.orgType,
                                'fixPhone': params.fixPhone,
                                'businessHours': params.businessHours,
                                'addressType': params.addressType,
                                'addressArea': params.addressArea,
                                'businessStartDt': tmp,
                                'address': params.address,
                                'entCustNo': params.entCustNo,
                                'opt': params.opt ? params.opt:'modify',
                                'shareJson': params.json,
                            };
                            params = jnHelper.fillUndef(params);

                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=modifyFormalPEntity', params)
                                .then(function (rsp) {
                                    return {
                                        data: rsp
                                    };
                                });

                        },

                        delEntity: function (custNo, entCustNo) {
                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=deleteFormalPEntity', {
                                    delArrObj: custNo + ',' + entCustNo,
                                });
                        },

                        rmGTJYZ: function (pCustNo, entCustNo, custNo) {
                            return jnHttp.post(
                                '/mloan/router/rest/FormalServicedAction.do?method=getEntityShare', {
                                    custNo: pCustNo,
                                    entCustNo: entCustNo,
                                }).then(function (rsp) {
                                var gtjyz;

                                jnHelper.removeArrayItem(rsp.root, function (e) {
                                    return e.custNo = custNo;
                                });

                                gtjyz = rsp.root.map(function (e) {
                                    return jnHelper.refine(e, [
                                        'custNo',
                                        'custName',
                                        'paperNo',
                                        'phoneNo',
                                        'soWnedClient',
                                        'workUnit',
                                        'custAddr',
                                        'linkType',
                                    ]);
                                });

                                return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getSingleFormalPEntity', {
                                    entCustNo: entCustNo,
                                }).then(function (rsp) {
                                    var params = jnHelper.refine(rsp.data, [
                                        'custName',
                                        'regNo',
                                        'liceNo',
                                        'mainBusiness',
                                        'orgForm',
                                        'corpReprst',
                                        'employeeNum',
                                        'orgType',
                                        'fixPhone',
                                        'businessHours',
                                        'addressType',
                                        'addressArea',
                                        'businessStartDt',
                                        'address',
                                        'entCustNo',
                                        'corpReprst',
                                    ]);

                                    params.custNo = pCustNo;
                                    params.opt = 'modify';
                                    params.shareJson = JSON.stringify(gtjyz);

                                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=modifyFormalPEntity', params);
                                });
                            });
                        },
                    };
                }]
        );
})();
