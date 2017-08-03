(function () {
    'use strict';
    angular.module('myCustomer')
        .controller(
            // 潜在客户查询
            'ReserveCustomerQueryCtrl', ['$state', '$stateParams', '$scope', 'jnForm', 'jnHelper', 'jnUser',
                function ($state, $stateParams, $scope, jnForm, jnHelper, jnUser) {
                    var self = this;
                    self.form = {asgnStatus: '1'};
                    self.justManager = jnUser.getMaxStation() == '400';//客户经理
                    self.justTeamManager = jnUser.getMaxStation() == '500';//团队经理
                    self.justSysManager = jnUser.getMaxStation() == '566';//后台人员

                    //团队经理
                    if (self.justTeamManager || self.justSysManager) {
                        self.form.deptId = jnUser.deptId;
                    }
                    //客户经理
                    if (self.justManager) {
                        self.form.custManagerNo = jnUser.userId;
                    }
                    self.submit = function () {
                    	var params = angular.copy(self.form);
                    	params.fstContactForm = angular.isDate(params.fstContactForm)? moment(params.fstContactForm).format('YYYYMMDD'):'';
                    	params.fstContactTo = angular.isDate(params.fstContactTo)? moment(params.fstContactTo).format('YYYYMMDD'):'';
                        jnForm.validate(self.myForm).then(function () {
                            $state.go('reserveCustomerList', params);
                        });
                    };

                }])
        .controller(
            // 潜在客户列表显示
            'ReserveCustomerCtrl',
            ['$state', '$stateParams',
                '$scope', 'jnReserveCustomerService',
                'jnHelper', 'jnUser', '$ionicPopup', '$filter', '$ionicPopover', 'jnTitleMenu',
                function ($state, $stateParams, $scope,
                          jnReserveCustomerService, jnHelper, jnUser, $ionicPopup, $filter, $ionicPopover, jnTitleMenu) {
                    var self = this;
                    self.asgnStatus = $stateParams.asgnStatus == '2' ? '2' : '1';
                    if (jnUser.hasStation('400|500|566')) {
                        $scope.isManager = false;
                    } else {
                        $scope.isManager = true;
                    }

                    /*
                     $ionicPopover.fromTemplateUrl('app/myCustomer/reserveCustomer/popover.html', {
                     scope: $scope,
                     hardwareBackButtonClose:true,
                     backdropClickToClose:true
                     }).then(function(popover) {
                     $scope.popover = popover;
                     });

                     $scope.openPopover = function($event) {
                     $scope.popover.show($event);
                     };

                     $scope.colsePopover = function($event) {
                     $scope.popover.remove();
                     };

                     $scope.$on('$destroy', function() {
                     $scope.popover.remove();
                     });

                     */

                    var titleMenu;

                    self.showTitleMenu = function () {
                        if (!titleMenu) {
                            titleMenu = jnTitleMenu.create({
                                items: [{
                                    template: '<a class="icon-left"><i class="ion-ios-search" style="margin-right: .5em;"></i>查询</a>',
                                    onTap: function () {
                                        $state.go('reserveCustomerQuery');
                                    },
                                }, {
                                    template: '<a class="icon-left"><i class="ion-plus-round" style="margin-right: .5em;"></i>新增</a>',
                                    onTap: function () {
                                        $state.go('reserveCustomerAdd');
                                    },
                                }],
                            });
                        }

                        titleMenu.show();
                    };

                    self.justManager = jnUser.getMaxStation() == '400';//客户经理
                    self.justTeamManager = jnUser.getMaxStation() == '500';//团队经理
                    self.justSysManager = jnUser.getMaxStation() == '566';//后台人员

                    //团队经理
                    if (self.justTeamManager || self.justSysManager) {
                        $stateParams.deptId = jnUser.deptId;
                    }
                    //客户经理
                    if (self.justManager) {
                        $stateParams.custManagerNo = jnUser.userId;
                    }
                   
                    var pf = jnHelper.PaginateFetcher(jnReserveCustomerService.getPreCustInfos).params($stateParams);
                    $scope.it = pf.records();

                    self.jump = function (state) {
                        $state.go(state, {
                            oprFlag: new Date().getTime()
                        });
                    };
                    

                    $scope.more = function () {
                        pf.fetch().then(function (rsp) {
                            rsp.items.forEach(function (e) {
                                if (e.status == '1') {
                                    e.className = 'name valid';
                                    e.desc = "已作废";
                                } else if (e.fstContactIf == '1') {
                                    e.className = 'name good';
                                    e.desc = $filter('jnConstant')(e.fstContactIf, '889');
                                } else if (e.fstContactIf == '2') {
                                    e.className = 'name bad';
                                    e.desc = $filter('jnConstant')(e.fstContactIf, '889');
                                } else {
                                    e.className = 'name';
                                }
                            });
                        });
                    };
                    $scope.more();


                }])
        .controller(
            // 潜在客户新增
            'ReserveCustomerAddCtrl', ['$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnForm', 'jnHelper', '$ionicPopup', '$filter', 'jnPage', 'jnIDVScanner', 'jnIdReader',
                function ($state, $stateParams, $scope, jnReserveCustomerService, jnForm, jnHelper, $ionicPopup, $filter, jnPage, jnIDVScanner, jnIdReader) {
                    var self = this;
                    $scope.it = {
                        'custType': '0',
                        'fstContactDt': new Date(),
                    };
                    $scope.checked = {
                        "xxqd": true,
                        // 信息渠道
                        "pd": true,
                        // 判定
                    };
                    $scope.toggleItem = function (p) {
                        if ($scope.checked[p]) {
                            $scope.checked[p] = false;
                        } else {
                            $scope.checked[p] = true;
                        }
                    };
                    $scope.save = function () {
                        jnForm.validate(self.myForm).then(function () {
                            jnReserveCustomerService.addPreCustBaseInfo($scope.it).then(function (rsp) {
                                if (rsp.success) {
                                    jnHelper.alert('保存成功！').then(function () {
                                        jnPage.modified = false;
                                        history.back();
                                    });
                                } else {
                                    jnHelper.alert(rsp.errMsg);
                                }
                            });
                        });
                    };

                    (function () {
                        var fillCustData = function (data) {
                            if ('0' === $scope.it.custType) {
                                $scope.it.custName = data.name;
                                $scope.it.phoneNo = data.mobile;

                            } else if ('1' === $scope.it.custType) {
                                $scope.it.contactName = data.name;
                                $scope.it.phoneNo = data.mobile;
                            }
                        };

                        $scope.scanIDCard = function () {
                            if (navigator.userAgent.indexOf('TSV-300A-1') > -1) {
                                jnIdReader.open(fillCustData);

                            } else {
                                jnIDVScanner.idCard().then(fillCustData);
                            }
                        };

                        $scope.scanVCard = function () {
                            jnIDVScanner.vCard().then(fillCustData);
                        };
                    })();
                }])
        .controller(
            // 潜在客户编辑
            'ReserveCustomerEditCtrl', ['jnUser', '$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper', 'jnForm', '$filter', '$ionicPopup', 'jnPage', 'jnIDVScanner',
                function (jnUser, $state, $stateParams, $scope, jnReserveCustomerService, jnHelper, jnForm, $filter, $ionicPopup, jnPage, jnIDVScanner) {
                    var self = this;
                    if (jnUser.hasStation('400|500')) {
                        $scope.isManager = false;
                    } else {
                        $scope.isManager = true;
                    }
                    $scope.isEdit = true;
                    $scope.checked = {
                        "xxqd": true,
                        // 信息渠道
                        "pd": true,
                        // 判定
                        // "gsxx" : true,// 公司信息
                        // "qtxx" : true,// 其他信息
                    };
                    $scope.toggleItem = function (p) {
                        if ($scope.checked[p]) {
                            $scope.checked[p] = false;
                        } else {
                            $scope.checked[p] = true;
                        }
                    };
                    $scope.save = function () {
                        jnForm.validate(self.myForm).then(function () {
                            jnReserveCustomerService.modifyPreCustBaseInfo($scope.it).then(function (rsp) {
                                if (rsp.success) {
                                    rsp.data.custInfo.fstContactDt = jnForm.jsDateFromRspDate(rsp.data.custInfo.fstContactDt);
                                    $scope.it = rsp.data.custInfo;
                                    jnHelper.alert('保存成功！').then(function () {
                                        jnPage.modified = false;
                                        history.back();
                                    });
                                } else {
                                    jnHelper.alert(rsp.errMsg);
                                }
                            });
                        });
                    };

                    // 查询潜在客户信息
                    jnReserveCustomerService.getPreCustInfo($stateParams).then(function (rsp) {
                        $scope.it = rsp.data;
                        $scope.it.fstContactDt = new Date($filter('jnDate')(rsp.data.fstContactDt));
                    });

                    (function () {
                        var fillCustData = function (data) {
                            if ('0' === $scope.it.custType) {
                                $scope.it.custName = data.name;
                                $scope.it.phoneNo = data.mobile;

                            } else if ('1' === $scope.it.custType) {
                                $scope.it.contactName = data.name;
                                $scope.it.phoneNo = data.mobile;
                            }
                        };

                        $scope.scanIDCard = function () {
                            jnIDVScanner.idCard().then(fillCustData);
                        };

                        $scope.scanVCard = function () {
                            jnIDVScanner.vCard().then(fillCustData);
                        };
                    })();
                }])
        .controller(
            // 潜在客户详情
            'ReserveCustomerDetailCtrl', ['$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper', 'jnConstant', '$ionicPopup', 'jnUser',
                function ($state, $stateParams, $scope, jnReserveCustomerService, jnHelper, jnConstant, $ionicPopup, jnUser) {

                    //登录用户岗位ID
                    $scope.station = jnUser.getMaxStation();


                    // 判断是否是决策岗
                    if (jnUser.hasStation('700')) {
                        $scope.isJcManager = true;
                    } else {

                        $scope.isJcManager = false;
                    }

                    // 控制折叠选项
                    $scope.checked = {
                        "xxqd": false,
                        // 信息渠道
                        "pd": false,
                        // 判定
                    };
                    // 查询潜在客户信息
                    jnReserveCustomerService.getPreCustInfo($stateParams).then(function (rsp) {
                        $scope.it = rsp.data;

//                    if($scope.it.custName){
//                        $scope.it.custType = '0';
//                    }else{
//                        $scope.it.custType = '1';
//                    }

                        if ($scope.it.custManagerName != jnUser.userName) {

                            $scope.enableTransfer = false;
                        } else {

                            $scope.enableTransfer = true;
                        }

                        if ($scope.station == '500' && (jnUser.userName == $scope.it.custManagerName)
                            && $stateParams.asgnStatus == '1') {
                            $scope.assignedAble = true;
                        }
                        //if ($scope.station == '700'
                        //    && $stateParams.asgnStatus == '1') {
                        //    $scope.assignedAble = true;
                        //}
                    });
                    // 折叠列表的显示和隐藏
                    $scope.toggleItem = function (p) {
                        if ($scope.checked[p]) {
                            $scope.checked[p] = false;
                        } else {
                            $scope.checked[p] = true;
                        }
                    };

                    // 潜在客户修改
                    $scope.edit = function (value) {
                        $state.go('reserveCustomerEdit', {
                            'custNo': value
                        });
                    };
                }])
        .controller(
            // 潜在客户分配历史
            'ReserveCustomerAssignCtrl', ['$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper',
                function ($state, $stateParams, $scope, jnReserveCustomerService, jnHelper) {
                    var pf = jnHelper.PaginateFetcher(jnReserveCustomerService.getAssignHistoryInfos).params($stateParams);
                    $scope.it = pf.records();
                    $scope.more = function () {
                        pf.fetch();
                    };
                    $scope.more();

                }])
        .controller(
            // 潜在客户回访管理
            'ReserveCustomerReturnVisitListCtrl', ['jnUser', '$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper', '$filter',
                function (jnUser, $state, $stateParams, $scope, jnReserveCustomerService, jnHelper, $filter) {
                    $scope.custNo = $stateParams.custNo;
                    $scope.custManagerName = $stateParams.custManagerName;
                    if ($stateParams.custManagerName != jnUser.userName) {

                        $scope.enableTransfer = false;
                    } else {

                        $scope.enableTransfer = true;
                    }
                    if (jnUser.hasStation('400|500')) {
                        $scope.isManager = false;
                    } else {
                        $scope.isManager = true;
                    }

                    var pf = jnHelper.PaginateFetcher(jnReserveCustomerService.returnVisitList).params($stateParams);
                    $scope.it = pf.records();
                    $scope.more = function () {
                        pf.fetch().then(function (rsp) {
                            rsp.root = $filter('orderBy')(rsp.root, ['-visitDt', '-visitTime']);
                            $scope.it = rsp;
                        });
                    };
                    $scope.more();
                }])
        .controller(
            // 潜在客户回访管理新增
            'ReserveCustomerReturnVisitAddCtrl', ['$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper', 'jnForm', 'jnPage',
                function ($state, $stateParams, $scope, jnReserveCustomerService, jnHelper, jnForm, jnPage) {
                    var self = this;
                    $scope.it = {'custNo': $stateParams.custNo};
                    $scope.custManagerName = $stateParams.custManagerName;
                    $scope.save = function () {
                        jnForm.validate(self.myForm).then(function () {
                            jnReserveCustomerService.returnVisitAdd($scope.it).then(function (rsp) {
                                if (rsp.success) {
                                    jnPage.modified = false;
                                    jnHelper.alert('新增成功！').then(function () {
                                        jnPage.back();
                                    });
                                } else {
                                    jnHelper.alert(rsp.errMsg);
                                }
                            });
                        });
                    }
                }])
        .controller(
            // 潜在客户回访管理编辑
            'ReserveCustomerReturnVisitEditCtrl', ['$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper', 'jnForm', 'jnPage',
                function ($state, $stateParams, $scope, jnReserveCustomerService, jnHelper, jnForm, jnPage) {

                    var self = this;
                    $scope.it = $stateParams;
                    $scope.custManagerName = $stateParams.custManagerName;
                    $scope.save = function () {
                        jnForm.validate(self.myForm).then(function () {
                            jnReserveCustomerService.returnVisitEdit($scope.it).then(function (rsp) {
                                if (rsp.success) {
                                    jnPage.modified = false;
                                    jnHelper.alert('修改成功！').then(function () {
                                        jnPage.back();
                                    });
                                } else {
                                    jnHelper.alert(rsp.errMsg);
                                }
                            });
                        });


                    }
                }])
        .controller(
            // 客户分配
            'ReserveCustomerAssignedCtrl', ['entCustSer', 'myCustomerSer', 'jnPage', 'jnForm', 'jnUser', '$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper', '$ionicPopup',
                function (entCustSer, myCustomerSer, jnPage, jnForm, jnUser, $state, $stateParams, $scope, jnReserveCustomerService, jnHelper, $ionicPopup) {
                    var self = this;
                    var managers = {};
                    $scope.data = {};
                    $scope.it = {};
                    var url = 'app/myCustomer/reserveCustomer/assign.html';
                    self.toggle = function (item) {
                        if (item.isActived) {
                            item.isActived = false;
                        } else {
                            item.isActived = true;
                        }
                        if (!item.managers) {
                            jnReserveCustomerService.getManagersByDeptId({'deptId': item.userId}).then(function (rsp) {
                                item.managers = rsp.root;
                                item.managers.forEach(function (e) {
                                    e['isChecked'] = false;
                                });
                            });
                        }
                    };
                    //正式客户分配
                    if ($stateParams.custType == '1') {
                        $scope.title = '正式客户分配';
                        //查询客户信息详细
                        myCustomerSer.qryPreCustInfoByRemark({custNo: $stateParams.custNo}).then(function (rsp) {
                            $scope.it = rsp.data;
                        });

                    } else if ($stateParams.custType == '0') {
                        $scope.title = '潜在客户分配';
                        jnReserveCustomerService.getPreCustInfo({custNo: $stateParams.custNo}).then(function (rsp) {
                            $scope.it = rsp.data;
                        });
                    }

                    $scope.checkedManager = function (manager, deptId) {
                        $scope.data.userId = manager.userId;
                        $scope.data.userName = manager.userName;
                        $scope.data.deptId = deptId;
                    };

                    //团队经理
                    if (jnUser.hasStation('500')) {
                        $scope.data.stationType = '2';
                        jnReserveCustomerService.getPersonOperatorList({'deptId': jnUser.deptId}).then(function (rsp) {
                            $scope.managers = rsp.root;
                            if ($scope.managers) {
                                $scope.managers.forEach(function (e) {
                                    managers[e.userId] = e.userName;
                                });
                            }
                        });

                    }
                    //决策岗
                    if (jnUser.hasStation('700')) {
                        $scope.data.stationType = '1';
                        //url = 'app/myCustomer/reserveCustomer/assignJC.html';
                        jnReserveCustomerService.getOperatList($stateParams).then(function (rsp) {
                            $scope.managers = rsp.root;
                            if ($scope.managers) {
                                $scope.managers.forEach(function (e) {
                                    managers[e.userId] = e.userName;
                                    //e['isActived'] = true;
                                });
                            }
                        });
                    }

                    //储备客户分配页面
                    $scope.assign = function () {
                        var myPopup = $ionicPopup
                            .show({
                                templateUrl: url,
                                title: '请选择',
                                scope: $scope,
                                buttons: [{
                                    text: '关闭'
                                }, {
                                    text: '确定',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        if (!$scope.data.userId) {
                                            jnHelper.alert('请选择一个客户经理！');
                                            e.preventDefault();
                                        } else {
                                            return $scope.data.userId;
                                        }
                                    }
                                }]
                            });
                        myPopup.then(function (res) {
                            if (res === void 0) {
                                return;
                            }
                            $scope.it.userName = managers[res];

                            //$scope.it.userName = $scope.data.userName;
                        });
                    };
                    //潜在客户分配
                    $scope.transferCustomer = function () {
                        jnForm.validate(self.myForm).then(function () {

                            var params = {
                                'assignType': '1',
                                'asgnRemark': $scope.it.asgnRemark,
                                'custNos': $stateParams.custNo,
                                'custType': $stateParams.custType,
                                'stationType': $scope.data.stationType,
                                'deptId': $scope.data.deptId,
                                'eventId': $scope.it.eventId,
                                'afCustManagerNo': $scope.data.userId,
                                'isDevolveOrAllot': 0
                            };

                            jnReserveCustomerService.assignPreCustInfo(params).then(function (rsp) {
                                if (rsp.success) {
                                    jnHelper.alert('分配成功！').then(function () {
                                        jnPage.modified = false;
                                        if ($stateParams.custType == '0') {
                                            //潜在客户列表
                                            $state.go('reserveCustomerList');
                                        } else if ($stateParams.custType == '1') {
                                            //正式客户列表
                                            $state.go('myCustomer');
                                        }

                                    });

                                } else {
                                    jnHelper.alert(rsp.errMsg);
                                }
                            }, function (e) {
                                console.log(e);
                            });
                        });
                    };
                }])
        .controller(
            // 客户分配List
            'ReserveCustomerAssignedListCtrl', ['entCustSer', 'myCustomerSer', 'jnPage', 'jnForm', 'jnUser', '$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper', '$ionicPopup',
                function (entCustSer, myCustomerSer, jnPage, jnForm, jnUser, $state, $stateParams, $scope, jnReserveCustomerService, jnHelper, $ionicPopup) {
                    var self = this;
                    self.it3 = {};
                    $scope.data = {};
                    $scope.it = {};
                    var managers = {};
                    var url = 'app/myCustomer/reserveCustomer/assign.html';
                    self.toggle = function (item) {
                        if (item.isActived) {
                            item.isActived = false;
                        } else {
                            item.isActived = true;
                        }
                        if (!item.managers) {
                            jnReserveCustomerService.getManagersByDeptId({'deptId': item.userId}).then(function (rsp) {
                                item.managers = rsp.root;
                                item.managers.forEach(function (e) {
                                    e['isChecked'] = false;
                                });
                            });
                        }
                    };

                    //正式客户分配
                    if ($stateParams.custType == '1') {
                        $scope.title = '正式客户分配列表';
//                var params = {};
//                params.custNo=$stateParams.custNo;
//                params.operType='0';
//              //查询客户信息详细
//                myCustomerSer.qryDetail(params).then(
//                        function(rsp){
//                            $scope.it=rsp.data;
//                            $scope.it.custType = $stateParams.custType;
//                            myCustomerSer.qryPreCustInfoByRemark({custNo:$stateParams.custNo}).then(function(rsp){
//                            	$scope.it.asgnRemark = rsp.data.asgnRemark;
//                            });
//                            if( !$scope.it['phoneNo']){
//                                //查询企业客户信息详细
//                                entCustSer.qryBaseEnt(params).then(
//                                    function(rsp){
//                                        $scope.it.phoneNo = rsp.data.phoneNo;
//                                        $scope.it.custType = $stateParams.custType;
//                                    }
//                                );
//                            }
//                        }
//                  );
                        jnReserveCustomerService.getPreCustInfoByRemark($stateParams).then(function (rsp) {
                            $scope.it2 = rsp.data;
                            self.pendId = $stateParams.pendId.substring($stateParams.pendId.length - 5, $stateParams.pendId.length);
                            self.it3.asgnRemark = rsp.data.asgnRemark;
                            jnReserveCustomerService.getCustByFlowNo({flowNo: rsp.data.flowNo}).then(function (rsp) {

                                $scope.it = rsp;
                            });
                        });

                    } else if ($stateParams.custType == '0') {
                        $scope.title = '潜在客户分配列表';
                        jnReserveCustomerService.getPreCustInfoByRemark($stateParams).then(function (rsp) {
                            $scope.it2 = rsp.data;
                            self.pendId = $stateParams.pendId.substring($stateParams.pendId.length - 5, $stateParams.pendId.length);
                            self.it3.asgnRemark = rsp.data.asgnRemark;
                            jnReserveCustomerService.getPreCustByFlowNo({flowNo: rsp.data.flowNo}).then(function (rsp) {

                                $scope.it = rsp;
                            });
                        });
                    }
                    //团队经理
                    if (jnUser.hasStation('500')) {
                        $scope.data.stationType = '2';
                        jnReserveCustomerService.getPersonOperatorList({'deptId': jnUser.deptId}).then(function (rsp) {
                            $scope.managers = rsp.root;
                            if ($scope.managers) {
                                $scope.managers.forEach(function (e) {
                                    managers[e.userId] = e.userName;
                                });
                            }
                        });

                    }

                    $scope.checkedManager = function (manager, deptId) {
                        $scope.data.userId = manager.userId;
                        $scope.data.userName = manager.userName;
                        $scope.data.deptId = deptId;
                    };

                    //决策岗
                    if (jnUser.hasStation('700')) {
                        $scope.data.stationType = '1';
                        url = 'app/myCustomer/reserveCustomer/assign.html';
                        jnReserveCustomerService.getOperatList($stateParams).then(function (rsp) {
                            $scope.managers = rsp.root;
                            if ($scope.managers) {
                                $scope.managers.forEach(function (e) {
                                    managers[e.userId] = e.userName;
                                    //e['isActived'] = true;
                                });
                            }
                        });
                    }
                    $scope.claim = function (c) {
                        console.info(c);
//                $state.go('reserveCustomerAssigned',{
//                    custNo:c.custNo,
//                    custType:$stateParams.custType,
//                    'todos':true,
//                });
                        console.info(c);

                        if ($stateParams.custType == '0') {
                            $state.go('reserveCustomerDetail', {
                                custNo: c.custNo,
                                'todos': true,
                            });
                        } else {
                            if (c.custType == "0") {
                                $state.go('custDetail', {
                                    custNo: c.custNo,
                                    custType: c.custType,
                                    'todos': true,
                                });
                            } else {
                                $state.go('entCustDetail', {
                                    custNo: c.custNo,
                                    custType: c.custType,
                                    'todos': true,
                                    'isDetail': 3,
//                            custManagerNo:jnUser.userId
                                });
                            }
                        }
                    }
                    //潜在客户分配
                    $scope.transferCustomer = function () {
                        jnForm.validate(self.myForm).then(function () {
                            console.log($scope);
                            var params = {};
                            for (var i = 0; i < $scope.it.root.length; i++) {
                                if (0 == i) {
                                    params.custNos = $scope.it.root[i].custNo;
                                } else {
                                    params.custNos = params.custNos + ',' + $scope.it.root[i].custNo;
                                }
                            }
                            params.asgnRemark = self.it3.asgnRemark;
                            params.afCustManagerNo = self.it3.afCustManagerNo;
                            params.deptId = self.it3.afCustManagerNo;
                            params.stationType = $scope.data.stationType;//岗位类型
                            params.assignType = '1';//分配
                            params.custType = self.it3.custType;//潜在客户
                            params.eventId = '0';
                            console.log(params);
                            jnReserveCustomerService.assignPreCustInfo(params).then(function (rsp) {
                                if (rsp.success) {
                                    jnHelper.alert('分配成功！').then(function () {
                                        jnPage.modified = false;
                                        if ($stateParams.todos) {
                                            //待办公告
                                            jnPage.backTo('todosList');
                                            return;
                                        } else if ($scope.it.custType == '0') {
                                            //潜在客户列表
                                            jnPage.backTo('reserveCustomerList');
                                        } else if ($scope.it.custType == '1') {
                                            //正式客户列表
                                            jnPage.backTo('myCustomer');
                                        }

                                    });

                                } else {
                                    jnHelper.alert(rsp.errMsg);
                                }
                            });
                        });
                    };
                    //储备客户分配页面
                    $scope.assign = function () {
                        var myPopup = $ionicPopup
                            .show({
                                templateUrl: url,
                                title: '请选择',
                                scope: $scope,
                                buttons: [{
                                    text: '关闭'
                                }, {
                                    text: '保存',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        if (!$scope.data.userId) {
                                            jnHelper.alert('请选择一个客户经理！');
                                            e.preventDefault();
                                        } else {
                                            return $scope.data.userId;
                                        }
                                    }
                                }]
                            });
                        myPopup.then(function (res) {
                            console.log(res);
                            console.log(managers);
                            if (res === void 0) {
                                return;
                            }
                            console.log(self);
                            //$scope.it.userName = $scope.data.userName;
                            self.it3.userName = managers[res];
                            self.it3.afCustManagerNo = $scope.data.userId;
                            self.it3.stationType = $scope.data.stationType;//岗位类型
                            self.it3.assignType = '1';//分配
                            self.it3.custType = $stateParams.custType;//潜在客户
                            self.it3.deptId = $scope.data.userId;//部门编号
                        });
                    };
                }])
        .controller(
            // 客户移交List
            'ReserveCustomerTransferListCtrl', ['entCustSer', 'myCustomerSer', 'jnPage', 'jnForm', 'jnUser', '$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper', '$ionicPopup',
                function (entCustSer, myCustomerSer, jnPage, jnForm, jnUser, $state, $stateParams, $scope, jnReserveCustomerService, jnHelper, $ionicPopup) {
                    var self = this;
                    if (jnUser.hasStation('400')) {//客户经理
                        $scope.isStation = '3';
                    }
                    if (jnUser.hasStation('500')) { //团队经理岗
                        $scope.isStation = '1';
                    }
                    if (jnUser.hasStation('700')) {//决策岗
                        $scope.isStation = '2';
                    }
                    self.it3 = {};
                    var managers = {};
                    $scope.data = {};
                    //正式客户分配
                    if ($stateParams.custType == '1') {
                        $scope.title = '正式客户移交';
                        jnReserveCustomerService.getPreCustInfoByRemark($stateParams).then(function (rsp) {
                            console.info(rsp);
                            console.info($stateParams.pendId);
                            $scope.it2 = rsp.data;
                            self.pendId = $stateParams.pendId.substring($stateParams.pendId.length - 5, $stateParams.pendId.length);
                            self.it3.asgnRemark = rsp.data.asgnRemark;
                            jnReserveCustomerService.getCustByFlowNo({flowNo: rsp.data.flowNo}).then(function (rsp) {
                                console.info(rsp);

                                $scope.it = rsp;
                            });
                        });

                    } else if ($stateParams.custType == '0') {
                        $scope.title = '潜在客户移交列表';
                        jnReserveCustomerService.getPreCustInfoByRemark($stateParams).then(function (rsp) {
                            $scope.it2 = rsp.data;
                            self.pendId = $stateParams.pendId.substring($stateParams.pendId.length - 5, $stateParams.pendId.length);
                            self.it3.asgnRemark = rsp.data.asgnRemark;
                            jnReserveCustomerService.getPreCustByFlowNo({flowNo: rsp.data.flowNo}).then(function (rsp) {

                                $scope.it = rsp;
                            });
                        });
                    }
                    //团队经理
                    if (jnUser.hasStation('500')) {
                        $scope.data.stationType = '3';
                        jnReserveCustomerService.getPersonOperatorList({'deptId': jnUser.deptId}).then(function (rsp) {
                            $scope.managers = rsp.root;
                            if ($scope.managers) {
                                $scope.managers.forEach(function (e) {
                                    managers[e.userId] = e.userName;
                                });
                            }
                        });

                    }
                    //决策岗
                    if (jnUser.hasStation('700')) {
                        $scope.data.stationType = '1';
                        jnReserveCustomerService.getOperatList($stateParams).then(function (rsp) {
                            $scope.managers = rsp.root;
                            if ($scope.managers) {
                                $scope.managers.forEach(function (e) {
                                    managers[e.userId] = e.userName;
                                });
                            }
                        });
                    }
                    $scope.claim = function (c) {
                        if ($stateParams.custType == '0') {
                            $state.go('reserveCustomerDetail', {
                                custNo: c.custNo,
                                'todos': true
                            });
                        } else {
                            if (c.custType == "0") {
                                $state.go('custDetail', {
                                    custNo: c.custNo,
                                    custType: c.custType,
                                    'todos': true,
                                });
                            } else {
                                $state.go('entCustDetail', {
                                    custNo: c.custNo,
                                    custType: c.custType,
                                    'todos': true,
                                    'isDetail': 3,
//                            custManagerNo:jnUser.userId
                                });
                            }
                        }

                    }
                    //潜在客户移交
                    $scope.transferCustomer = function () {
                        jnForm.validate(self.myForm).then(function () {
                            var params = {};
                            for (var i = 0; i < $scope.it.root.length; i++) {
                                if (0 == i) {
                                    params.custNos = $scope.it.root[i].custNo;
                                } else {
                                    params.custNos = params.custNos + ',' + $scope.it.root[i].custNo;
                                }
                            }
                            params.asgnRemark = self.it3.asgnRemark;
                            params.afCustManagerNo = self.it3.afCustManagerNo;
                            params.stationType = $scope.data.stationType;//岗位类型
                            params.assignType = '2';//分配
                            params.custType = $stateParams.custType;//潜在客户
                            params.deptId = self.it3.deptId;//部门编号
                            params.eventId = '0';
                            params.stationType = $scope.data.stationType;
                            jnReserveCustomerService.transferPreCustInfo(params).then(function (rsp) {
                                if (rsp.success) {

                                    jnHelper.alert('移交成功！').then(function () {
                                        jnPage.modified = false;
                                        if ($stateParams.todos) {
                                            //待办公告
                                            jnPage.backTo('todosList');
                                            return;
                                        } else if ($scope.it.custType == '0') {
                                            //潜在客户列表
                                            jnPage.backTo('reserveCustomerList');
                                        } else if ($scope.it.custType == '1') {
                                            //正式客户列表
                                            jnPage.backTo('myCustomer');
                                        }
                                    });

                                } else {
                                    jnHelper.alert(rsp.errMsg);
                                }
                            });
                        });
                    };
                    //潜在客户移交
                    $scope.assign = function () {
                        var myPopup = $ionicPopup
                            .show({
                                templateUrl: 'app/myCustomer/reserveCustomer/assign.html',
                                title: '请选择',
                                scope: $scope,
                                buttons: [{
                                    text: '关闭'
                                }, {
                                    text: '保存',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        if (!$scope.data.userId) {
                                            jnHelper.alert('请选择一个客户经理！');
                                            e.preventDefault();
                                        } else {
                                            return $scope.data.userId;
                                        }
                                    }
                                }]
                            });
                        myPopup.then(function (res) {
                            if (res === void 0) {
                                return;
                            }
                            self.it3.userName = managers[$scope.data.userId];
                            self.it3.afCustManagerNo = $scope.data.userId;
                            self.it3.stationType = $scope.data.stationType;//岗位类型
                            self.it3.assignType = '1';//分配
                            self.it3.custType = $stateParams.custType;//潜在客户
                            self.it3.deptId = $scope.data.userId;//部门编号
                        });
                    };
                }])
        .controller(
            // 潜在客户移交
            'ReserveCustomerTransferCtrl', ['entCustSer', 'myCustomerSer', 'jnUser', '$state', '$stateParams', '$scope', 'jnReserveCustomerService', 'jnHelper', 'jnForm', 'jnPage',
                function (entCustSer, myCustomerSer, jnUser, $state, $stateParams, $scope, jnReserveCustomerService, jnHelper, jnForm, jnPage) {
                    var self = this;
                    $scope.it = {};

                    if (jnUser.hasStation('400')) {//客户经理
                        $scope.isStation = '3';
                    }
                    if (jnUser.hasStation('500')) { //团队经理岗
                        $scope.isStation = '1';
                    }
                    if (jnUser.hasStation('700')) {//决策岗
                        $scope.isStation = '2';
                    }

                    //正式客户
                    if ($stateParams.custClass == '1') {

                        $scope.title = '正式客户移交';
                    } else if ($stateParams.custClass == '0') {

                        $scope.title = '潜在客户移交';
                    }

                    //查询客户信息
                    myCustomerSer.qryPreCustInfoByRemark({custNo: $stateParams.custNo}).then(function (rsp) {
                        $scope.it.asgnRemark = rsp.data.asgnRemark;
                    });
                    $scope.transferCustomer = function () {
                        jnForm.validate(self.myForm).then(function () {
                            jnReserveCustomerService.transferPreCustInfo({
                                'assignType': '2',
                                'asgnRemark': $scope.it.asgnRemark,
                                'custNos': $stateParams.custNo,
                                'custType': $stateParams.custClass,
                                'stationType': $scope.it.stationType,
                                'isDevolveOrAllot': 0
                            }).then(function (rsp) {
                                if (rsp.success) {
                                    jnHelper.alert('移交成功！').then(function () {
                                        jnPage.modified = false;
                                        if ($stateParams.custClass == '0') {
                                            //潜在客户列表
                                            $state.go('reserveCustomerList');
                                        } else if ($stateParams.custClass == '1') {
                                            //正式客户列表
                                            $state.go('myCustomer');
                                        }
                                    });

                                } else {
                                    jnHelper.alert(rsp.errMsg);
                                }
                            });
                        });
                    };

                }])
    ;
})();
