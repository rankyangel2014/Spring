/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('entCustDetail')
    .factory('jnContactInfoServer',
        ['jnHttp', 'jnUser', 'jnHelper', 'entEditSer',
        function (jnHttp, jnUser, jnHelper, entEditSer) {
            return {
                readList: function (params) {
                	
                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getEnbBaseInfo',
                        params)
                        .then(function (rsp) {
                            return {
                                items: rsp.data.custRelationList,
                                total: rsp.data.custRelationList.length,
                            };
                        });
                },

                rmLXR: function (pCustNo, custNo) {
                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getEnbBaseInfo', {
                        operType: '0',
                        custNo: pCustNo,
                    }).then(function (rsp) {
                        var params = jnHelper.refine(rsp.data, [
                            'custNo',//客户号
                            'frCustName',//法定代表人名字
                            'frPaperNo',//身份证号
                            'frMobPhone',//联系方式
                            'addressType',////经营场所类型 1:自有 2:租赁 9:其它
                            'addressTypeOtherDesc',////经营场所类型(其它)
                            'frCustNo',//法人客户编号
                            'liceNo',//组织机构代码证/三证合一代码
                            'regNo',//营业执照代码
                            'loanCard',//贷款卡编号
                            'inTrade',//所属行业
                            'mainBusiness',//主营业务
                            'sjKZR',//实际控制人
                            'frAddress',//联系地址
                            'businessStartDt',//业务开始时间
                            'address',//实际经营地址
                        ]);

                        params.jzqk = '1';

                        jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getEnbBaseInfo', {
                            operType: '0',
                            custNo: pCustNo,
                        }).then(function (rsp) {
                            params.lxrList = rsp.data.custRelationList.map(
                                function (e) {
                                    return jnHelper.refine(e, [
                                        'linkCustNo', // 编号
                                        'linkCustName', // 姓名
                                        'linkCustAddr', // 地址
                                        'linkType', // 人企关系
                                        'linkPhoneNo', // 电话
                                        'linkPaperType', // 证件类型
                                        'linkPaperNo', // 证件号码
                                        'linkWorkUnit', // 工作单位
                                        'linkCustType',
                                        'linkCustFlag',
                                    ]);
                                }
                            );

                            jnHelper.removeArrayItem(params.lxrList,
                                function (e) {
                                    return e.linkCustNo === custNo;
                                }
                            );

                            return entEditSer.updateEnbBaseInfo(params);
                        });
                    });
                },
            };
        }]
    );

})();
