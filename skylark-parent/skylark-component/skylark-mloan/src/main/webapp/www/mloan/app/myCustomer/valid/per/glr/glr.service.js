(function () {
'use strict';
angular
    .module('myCustomer')
    .factory('jnCustomerGLR', [
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
                 * custType
                 * orgNo
                 */
                readGLRList: function (params) {
                    return jnHttp.post(
                        '/mloan/router/rest/ModifyCustAction.do?method=getCustLinkPInfo',
                        params
                    ).then(function (rsp) {
                        return {
                            items: rsp.root,
                            total: rsp.total,
                        };
                    });
                },

                /**
                 * custNo
                 */
                readGLR: function (params) {
                    return jnHttp.post(
                        '/mloan/router/rest/ModifyCustAction.do?method=getGlr',
                        params
                    ).then(function (rsp) {
                        var d = jnHelper.refine(rsp.data, [
                            'custNo',
                            'custName',
                            'custType',
                            'linkType',
                            'linkTypeName',
                            'paperNo',
                            'sex',
                            'birthday',
                            'marryStatus',
                            'eduLevel',
                            'mobPhone',
                            'fixPhone',
                            'housingStatus',
                            'housingDesc',
                            'address',
                            'addressType',
                            'addressTypeOtherDesc',
                            'businessHours',
                            'businessStartDt',
                            'custAddr',
                            'employeeNum',
                            'liceNo',
                            'loanCard',
                            'mainBusiness',
                            'orgType',
                            'orgNo',
                            'paperType',
                            'inTrade',
                            'inTradeName',
                        ]);


                        if (d.liceNo && d.liceNo === d.paperNo) {
                            d.cardMerge = 'Y';

                        } else {
                            d.cardMerge = 'N';
                            d.orgNo = d.liceNo;
                            d.liceNo = '';
                            d.regNo = d.paperNo;
                        }

                        return d;

                    });
                },

                createGLR: function (params) {
                    return this.updateGLR(params);
                },

                /**
                 * pCustNo
                 * linkType
                 * custTypeTmp
                 * custNameTmp
                 * paperType
                 * paperNoTmp
                 * custAddr
                 * custType
                 * statusTree
                 * custNo
                 * custName
                 * paperNo
                 * birthday
                 * marryStatus
                 * eduLevel
                 * mobPhone
                 * fixPhone
                 * housingStatus
                 * housingDesc
                 * address
                 * cCustName
                 * cardMerge
                 * regNo
                 * liceNo
                 * loanCard
                 * inTradeName
                 * domain
                 * inTrade
                 * phoneNo
                 * orgType
                 * mainBusiness
                 * businessStartDt
                 * businessHours
                 * employeeNum
                 * addressEnb
                 * addressType
                 * addressTypeOtherDesc
                 */
                updateGLR: function (params) {
                    var args = jnHelper.merge(params, {
                        operType: 3,
                    });

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
                deleteGLR: function (params) {
                    var args = {
                        pCustNo: params.pCustNo,
                        custNo: params.custNo,
                        linkType: params.linkType,
                        operType: 2,
                    }

                    return jnHttp.post(
                        '/mloan/router/rest/ModifyCustAction.do?method=updateCustLinkPInfo',
                        args
                    );
                },
            };
        }]
    );
})();
