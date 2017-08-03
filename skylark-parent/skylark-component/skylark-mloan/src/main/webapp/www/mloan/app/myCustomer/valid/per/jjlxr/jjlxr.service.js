(function () {
'use strict';

angular
    .module('myCustomer')
    .factory('jnCustomerJJLXR', [
        'jnHttp',
        'jnUser',
        'jnForm',
        'jnHelper',
        function (
            jnHttp,
            jnUser,
            jnForm,
            jnHelper
        ) {
            return {
                /**
                 * custNo
                 */
                readJJLXRList: function (params) {
                    var args = {
                        custNo: params.custNo,
                        operType: 0,
                    };

                    return jnHttp.post(
                        '/mloan/router/rest/ModifyCustAction.do?method=getCustPInfo',
                        args
                    ).then(function (rsp) {
                        var props = [
                            'custNo',
                            'custName',
                            'linkType',
                            'paperNo',
                            'phoneNo',
                        ];

                        return rsp.data.custRelationList.map(function (e) {
                            return jnHelper.refine(e, props);
                        });
                    });
                },

                /**
                 * pCustNo
                 * custNo
                 */
                readJJLXR: function (params) {
                    var args = {
                        custNo: params.pCustNo,
                        operType: 0,
                    };

                    return jnHttp.post(
                        '/mloan/router/rest/ModifyCustAction.do?method=getCustPInfo',
                        args
                    ).then(function (rsp) {
                        var data = jnHelper.arrFind(
                            rsp.data.custRelationList,
                            function (e) {
                                return e.custNo === params.custNo;
                            }
                        );

                        return jnHelper.refine(data, [
                            'custNo',
                            'custName',
                            'linkType',
                            'paperNo',
                            'phoneNo',
                            'workUnit',
                            'custAddr',
                        ]);
                    });
                },

                createJJLXR: function (params) {
                    return this.updateJJLXR(params);
                },

                /**
                 * pCustNo
                 * custNo
                 * linkType
                 * custName
                 * paperNo
                 * phoneNo
                 * workUnit
                 * custAddr
                 */
                updateJJLXR: function (params) {
                    var args = {
                        pCustNo: params.pCustNo,
                        custNo: params.custNo,
                        linkType: params.linkType,
                        custNameTmp: params.custName,
                        paperNoTmp: params.paperNo,
                        phoneNo: params.phoneNo,
                        workUnit: params.workUnit,
                        custAddr: params.custAddr,
                        operType: 1
                    };

                    return jnHttp.post(
                        '/mloan/router/rest/ModifyCustAction.do?method=updateCustLinkPInfo',
                        args
                    );
                },

                /**
                 * pCustNo
                 * custNo
                 * linkType
                 */
                deleteJJLXR: function (params) {
                    var args = {
                        custNo: params.pCustNo,
                        operType: 0,
                    };

                    return jnHttp.post(
                        '/mloan/router/rest/ModifyCustAction.do?method=getCustPInfo',
                        args
                    ).then(function (rsp) {
                        var d = rsp.data;

                        var args = {
                            custNo: params.pCustNo,
                            adTypeId: d.adTypeId,
                            birthday: d.birthday,
                            marryStatus: d.marryStatus,
                            domPlace: d.domPlace,
                            operType: 1,
                        };

                        var removed = jnHelper.removeArrayItem(
                            d.custRelationList,
                            function (e) {
                                return e.custNo === params.custNo;
                            }
                        );

                        if (removed) {
                            args.delCusts = removed.custNo;
                        }

                        if (d.marryStatus === '28' ||
                            d.marryStatus === '29') {
                            args.pouseCustName = d.pouseCustName;
                            args.pouseCustNo = d.pouseCustNo;
                            args.pousePaperNo = d.pousePaperNo;
                            args.pouseMobPhone = d.adTypeId;
                            args.pouseBirthday = d.pouseBirthday;
                            args.pouseWorkUnit = d.pouseWorkUnit;
                        }

                        args.lxrList = JSON.stringify(
                            d.custRelationList.map(function (e) {
                                return jnHelper.refine(e, [
                                    'custNo', // 编号
                                    'custName', // 姓名
                                    'linkType', // 人人关系
                                    'linkStatus', // 关系状态
                                    'paperNo', // 证件号码
                                    'phoneNo', // 联系电话
                                    'workUnit', // 工作单位
                                    'custAddr', // 客户地址
                                ]);
                            })
                        );

                        return jnHttp.post(
                            '/mloan/router/rest/ModifyCustAction.do?method=saveCustPInfo',
                            args
                        );
                    });
                },
            };
        }]
    );
})();
