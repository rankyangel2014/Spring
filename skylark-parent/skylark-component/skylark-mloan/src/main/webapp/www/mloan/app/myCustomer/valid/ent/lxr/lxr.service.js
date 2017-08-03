(function () {
'use strict';

angular
    .module('myCustomer')
    .factory('jnCustomerLXR', [
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
                readLXRList: function (params) {
                    var args = {
                        custNo: params.custNo,
                        operType: 0,
                    };

                    return jnHttp.post(
                        '/mloan/router/rest/FormalServicedAction.do?method=getEnbBaseInfo',
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
                readLXR: function (params) {
                    var args = {
                        custNo: params.pCustNo,
                        operType: 0,
                    };

                    return jnHttp.post(
                        '/mloan/router/rest/FormalServicedAction.do?method=getEnbBaseInfo',
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

                createLXR: function (params) {
                    return this.updateLXR(params);
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
                updateLXR: function (params) {
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
                 */
                deleteLXR: function (params) {
                    var args = {
                        custNo: params.pCustNo,
                        operType: 0,
                    };

                    return jnHttp.post(
                        '/mloan/router/rest/FormalServicedAction.do?method=getEnbBaseInfo',
                        args
                    ).then(function (rsp) {
                        var d = rsp.data;

                        var args = {
                            custNo: params.pCustNo,
                            operType: 1,
                            addressType: 1,
                            jzqk: 1,
                            loanCard: d.loanCard,
                            domain: d.domain,
                            inTrade: d.inTrade,
                            mainBusiness: d.mainBusiness,
                            corpCustNo: d.corpCustNo,
                            corpReprst: d.corpReprst,
                            corpPaperNo: d.corpPaperNo,
                            corpMobPhone: d.corpMobPhone,
                            corpAddress: d.corpAddress,
                            businessStartDt: d.businessStartDt,
                            address: d.address,
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

                        args.lxrList = JSON.stringify(
                            d.custRelationList.map(function (e) {
                                return jnHelper.refine(e, [
                                    'custNo', // 编号
                                    'custName', // 姓名
                                    'linkType', // 人人关系
                                    'paperNo', // 证件号码
                                    'phoneNo', // 联系电话
                                    'workUnit', // 工作单位
                                    'custAddr', // 客户地址
                                ]);
                            })
                        );

                        return jnHttp.post(
                            '/mloan/router/rest/FormalServicedAction.do?method=updateEnbBaseInfo',
                            args
                        );
                    });
                },
            };
        }]
    );
})();
