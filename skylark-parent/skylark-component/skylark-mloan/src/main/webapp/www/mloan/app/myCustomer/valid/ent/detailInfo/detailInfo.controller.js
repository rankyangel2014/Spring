/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('entCustDetail')
        //重要指标
        .controller('importantTarget.Ctrl',
            ['jnHttp', 'jnUser', '$stateParams', '$scope',
                function (jnHttp, jnUser, $stateParams, $scope) {
                    var params = {};
                    params.custNo = $stateParams.custNo;//客户编号
                    params.operType = $stateParams.operType;

                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getEnbCustPDetailInfo',
                        params).then(function (rsp) {
                        $scope.it = rsp.data;
                    });

                }]
        )
        //企业信息
        .controller('entInfoDetail.Ctrl',
            ['jnHttp', 'jnUser', '$stateParams', '$scope', '$state', 'entCustSer',
                function (jnHttp, jnUser, $stateParams, $scope, $state, entCustSer) {
                    $scope.isDetail = $stateParams.isDetail;
                    $scope.edit = function () {
                        $state.go('entDetailEdit', {
                            custNo: $stateParams.custNo,
                        });
                    };

                    var params = {};
                    params.custNo = $stateParams.custNo;//客户编号
                    params.operType = $stateParams.operType;

                    return jnHttp.post('/mloan/router/rest/FormalServicedAction.do?method=getEnbCustPDetailInfo',
                        params).then(function (rsp) {
                        $scope.it = rsp.data;
                        if (rsp.data.liceNo.length != 18) {

                            entCustSer.qryBaseEnt({custNo: $stateParams.custNo, operType: '0'}).then(
                                function (rsp) {
                                    console.info(rsp);
                                    $scope.it.regNo = rsp.data.regNo;
                                    $scope.it.liceNo = rsp.data.liceNo;
                                });
                        }

                    });

                }]
        )
        //联系人
        .controller('entContactInfo.Ctrl',
            ['jnHelper', 'jnContactInfoServer', '$stateParams', '$state', '$scope', '$ionicListDelegate',
                function (jnHelper, jnContactInfoServer, $stateParams, $state, $scope, $ionicListDelegate) {
                    var self = this;
                    var pf = jnHelper.PaginateFetcher(jnContactInfoServer.readList)
                        .params($stateParams);
                    $scope.isDetail = $stateParams.isDetail;
                    //customers页面交互
                    self.list = pf.records();

                    self.more = function () {
                        pf.fetch().then(function (rsp) {
                            // 这里可以进一步处理

                        });
                    };

                    self.more();

                    //详情
                    self.toDetail = function (index) {
                        $state.go('contactDetail', {
                            'custNo': $stateParams.custNo,
                            'index': index,
                            'isDetail': $stateParams.isDetail,
                        });
                    };

                    //联系人 新增
                    self.add = function () {
                        $state.go('contactAdd', {
                            custNo: $stateParams.custNo,
                            isDetail: $stateParams.isDetail,
                        });
                    };

                    self.rmQYLXR = function (item) {
                        var text = '确实要删除联系人' + item.linkCustName + '吗？';
                        jnHelper.confirm(text).then(function (confirmed) {
                            if (confirmed) {
                                jnContactInfoServer.rmLXR($stateParams.custNo, item.linkCustNo)
                                    .then(function () {
                                        jnHelper.removeArrayItem(self.list.items,
                                            function (e) {
                                                return e.linkCustNo === item.linkCustNo;
                                            }
                                        );

                                        self.list.total -= 1;
                                    });
                            } else {
                                $ionicListDelegate.closeOptionButtons();
                            }
                        });

                    };
                }]
        )
        //股东信息
        .controller('entPartnerInfo.Ctrl',
            ['jnHelper', 'jnPartnerInfoServer', '$stateParams', '$state', '$scope', '$ionicListDelegate','jnTitleMenu',
                function (jnHelper, jnPartnerInfoServer, $stateParams, $state, $scope, $ionicListDelegate,jnTitleMenu) {
                    var self = this;
                    var pf = jnHelper.PaginateFetcher(jnPartnerInfoServer.readList)
                        .params($stateParams);
                    $scope.isDetail = $stateParams.isDetail;

                    var titleMenu;
                    self.showTitleMenu = function () {
                        if (!titleMenu) {
                            titleMenu = jnTitleMenu.create({
                                items: [{
                                    template: '新增个人',
                                    onTap: function () {
                                        $state.go('partnerPerAdd', {
                                            pCustNo: $stateParams.custNo,
                                        });
                                    },
                                }, {
                                    template: '新增企业',
                                    onTap: function () {
                                        $state.go('partnerEntAdd', {
                                            pCustNo: $stateParams.custNo,
                                        });
                                    },
                                }],
                            });
                        }
                        titleMenu.show();
                    };


                    //customers页面交互
                    self.list = pf.records();

                    self.more = function () {
                        pf.fetch().then(function (rsp) {
                            // 这里可以进一步处理

                        });
                    };

                    self.more();

                    //股东信息 新增
                    self.add = function () {
                    	console.info($stateParams);
                        $state.go('partnerAdd', {pCustNo: $stateParams.custNo});
                    };

                    self.toDetail = function (it) {
                    	console.info(it);
                    	console.info($stateParams);
                        var params = {
                            pCustNo: $stateParams.custNo,
                            custNo: it.custNo,
                            custName: it.custName,
                            paperType: it.paperType,
                            paperNo: it.paperNo,
                            phoneNo: it.phoneNo,
                            custAddr: it.custAddr,
                            sharePct: it.sharePct,
                            custType: it.custType,
                            workUnit: it.workUnit,
                            isDetail: $scope.isDetail,
                        } ;

                        if(it.custType == '0'){//股东信息详情（个人）

                            $state.go('partnerPerDetail',params);
                        }else {//股东信息详情（企业）

                            $state.go('partnerEntDetail',params);
                        }

                    };

                    self.rmGD = function (item) {
                        var text = '确实要删除股东' + item.custName + '吗？';
                        jnHelper.confirm(text).then(function (confirmed) {
                            if (confirmed) {
                            	console.info($stateParams);
                                jnPartnerInfoServer.rmGD($stateParams.custNo, $stateParams.orgNo, item.custNo)
                                    .then(function () {
                                        jnHelper.removeArrayItem(self.list.items,
                                            function (e) {
                                                return e.custNo === item.custNo;
                                            }
                                        );

                                        self.list.total -= 1;
                                    });
                            } else {
                                $ionicListDelegate.closeOptionButtons();
                            }
                        });
                    };
                }]
        )
        //实际控制人
        .controller('entActualControl.Ctrl',
            ['jnHelper', 'jnHttp', 'jnUser', '$stateParams', '$scope', 'jnForm', '$state', 'jnPartnerInfoServer',
                function (jnHelper, jnHttp, jnUser, $stateParams, $scope, jnForm, $state, jnPartnerInfoServer) {
                    var self = this;
                    //修改
                    $scope.edit = function () {
                        $state.go('controlEdit', $stateParams);
                    };

                    var params = {};
                    params.custNo = $stateParams.custNo;//客户编号
                    params.orgNo = $stateParams.orgNo;
                    params.linkType = '14';
                    var pf = jnHelper.PaginateFetcher(jnPartnerInfoServer.readActList)
                        .params(params);
                    //customers页面交互
                    self.list = pf.records();

                    self.more = function () {
                        pf.fetch().then(function (rsp) {
                            // 这里可以进一步处理
                            $scope.isDetail = $stateParams.isDetail;
                        });
                    };

                    self.more();

                }]
        )
        //关联信息
        .controller('entContextControl.Ctrl', //关联人信息
            ['jnHelper', 'jnContextInfoServer', '$stateParams', '$state', '$ionicListDelegate', '$scope','entCustSer','jnTitleMenu','jnCustomerGLR',
                function (jnHelper, jnContextInfoServer, $stateParams, $state, $ionicListDelegate, $scope,entCustSer,jnTitleMenu,jnCustomerGLR) {
                    var self = this;
                    var pf = jnHelper.PaginateFetcher(jnContextInfoServer.readList)
                        .params($stateParams);
                    $scope.isDetail = $stateParams.isDetail;
                    //customers页面交互
                    self.list = pf.records();
                    self.more = function () {
                        pf.fetch().then(function (rsp) {
                            // 这里可以进一步处理
                            $scope.isDetail = $stateParams.isDetail;
                        });
                    };
                    self.more();
                    var titleMenu;
                    self.showTitleMenu = function () {
                        if (!titleMenu) {
                            titleMenu = jnTitleMenu.create({
                                items: [{
                                    template: '新增关联企业',
                                    onTap: function () {
                                    	$state.go('relationEntAdd', {
                                            custNo: $stateParams.custNo,
                                        });
                                    },
                                }, {
                                    template: '新增关联人',
                                    onTap: function () {
                                    	$state.go('relationPerAdd', {
                                            custNo: $stateParams.custNo,
                                        });
                                    },
                                }],
                            });
                        }
                        titleMenu.show();
                    };
                    //关联人详情
                    self.toDetail = function (cust) {

                        if (cust.custType == '0') {

                            $state.go('relationPerDetail', {
                                custNo: cust.custNo,
                                isDetail: $stateParams.isDetail,
                                pCustNo: $stateParams.custNo,
                                linkType: cust.linkType,
	                            linkTypeName:cust.linkTypeName,
                            });
                        } else {

                            $state.go('relationEntDetail', {
                                custNo: cust.custNo,
                                isDetail: $stateParams.isDetail,
                                pCustNo: $stateParams.custNo,
                                linkType: cust.linkType,
	                            linkTypeName:cust.linkTypeName,
                            });
                        }


                    }
                    //删除关联人
                    self.deleteItem = function (event, item) {
                    	console.info(item);
                        event.stopPropagation();
                        var params = {
                        	linkType: item.linkType,
                        	pCustNo: $stateParams.custNo,
                            orgNo: $stateParams.orgNo,
                            custNo: item.custNo,
                            operType: '2'
                        };
                        var text = '确实要删除控制人' + item.custName + '吗？';
                        jnHelper.confirm(text).then(function (confirmed) {
                            if (confirmed) {
                            	console.info(params);
//                                custActualService.delActual(params)
//                                    .then(function () {
//                                        jnHelper.removeArrayItem(self.list.items,
//                                            function (e) {
//                                                return e.custNo === item.custNo;
//                                            }
//                                        );
//
//                                        self.list.total -= 1;
//                                    });
                                jnCustomerGLR.deleteGLR(params).then(function () {
                                    jnHelper.removeArrayItem(self.list.items,
                                        function (e) {
                                            return e.custNo === item.custNo;
                                        }
                                    );

                                    self.list.total -= 1;
                                });
                            } else {
                                $ionicListDelegate.closeOptionButtons();
                            }
                        });
                    };
                }]
        );

})();
