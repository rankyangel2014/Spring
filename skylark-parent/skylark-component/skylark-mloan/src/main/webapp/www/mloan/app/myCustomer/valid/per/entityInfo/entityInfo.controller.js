(function () {
    'use strict';

    angular
        .module('custOtherList')
        .controller('custEntityListCtrl',
            ['$stateParams', 'custEntityService', 'jnHelper', '$state', '$scope', 'jnUser', '$ionicListDelegate',
                function ($stateParams, custEntityService, jnHelper, $state, $scope, jnUser, $ionicListDelegate) {
                    $scope.isDetail = $stateParams.isDetail;
                    var self = this;
                    //登录客户userid
                    self.toDetail = function (entCustNo, custNo) {
                        $state.go('custEntityView', {
                            entCustNo: entCustNo,
                            custNo: custNo,
                            isDetail: $stateParams.isDetail,
                        });
                    }

                    var pf = jnHelper.PaginateFetcher(custEntityService.readEntityList)
                        .params($stateParams);

                    /*挂载到容器里面*/

                    self.list = pf.records();
                    self.totalCustNo = $stateParams["custNo"];

                    self.more = function () {
                        pf.fetch();
                    };
                    self.more();

                    self.toggleItem = function (index) {
                        if (self.list.items[index].expandFlag === '1') {
                            self.list.items[index].expandFlag = '0';

                        } else {
                            self.list.items[index].expandFlag = '1';
                        }
                        event.stopPropagation();
                    };

                    //新增
                    self.add = function () {

                        $state.go('custEntityAdd', $stateParams);
                    };

                    self.deleteItem = function (event, item) {
                        event.stopPropagation();

                        var text = '确实要删除实体' + item.custName + '吗？';
                        jnHelper.confirm(text).then(function (confirmed) {
                            if (confirmed) {
                                custEntityService.delEntity($stateParams.custNo, item.entCustNo)
                                    .then(function () {
                                        jnHelper.removeArrayItem(self.list.items,
                                            function (e) {
                                                return e.entCustNo === item.entCustNo;
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
        .controller(//实体信息新增
            'custEntityAddCtrl',
            ['$filter', 'myCustomerSer', '$scope', '$stateParams', 'custEntityService', 'jnHelper', '$state', 'jnForm', 'jnPage', 'jnConstant',
                function ($filter, myCustomerSer, $scope, $stateParams, custEntityService, jnHelper, $state, jnForm, jnPage, jnConstant) {
                    var self = this;
                    //实体添加
                    self.stxx = {
                        'custNo': $stateParams.custNo,
                        liceNoOrNewCard: 'N',
                        opt: 'add'
                    };

                    self.onSelect = function (cust) {
                        self.stxx.custNo = cust.custNo;
                    }

                    self.changeCardType = function (cardType) {
//                        if (cardType == 'Y') {
//
//                            self.stxx.regNo = '';
//                            self.stxx.orgNo = '';
//                        }
                    }
                    //修改提交
                    self.submit = function () {
                        self.stxx.custNo = $stateParams.custNo;
                        jnForm.validate(self.form.stxx)
                            .then(function () {
                                //实体存在
                                var json = [];

                                if (self.stxx.entCustNo) {
                                    //先把共同经营者查回来
                                    custEntityService.readEntityPartner(self.stxx)
                                        .then(function (rsp) {
                                            json = [];
                                            if (rsp.items && rsp.items.length > 0) {
                                                json = refine(rsp.items, [
                                                    'custAddr',
                                                    'custName',
                                                    'custNo',
                                                    'custType',
                                                    'liceNo',
                                                    'linkType',
                                                    'paperNo',
                                                    'paperType',
                                                    'phoneNo',
                                                    'regNo',
                                                    'sharePct',
                                                    'workUnit',
                                                ]);
                                            }
                                            json = JSON.stringify(json);
                                            self.stxx.json = json;
                                            custEntityService.addEntity(self.stxx).then(function (rsp) {
                                                if (rsp.success) {
                                                    jnPage.modified = false;
                                                    jnHelper.alert('添加成功').then(function () {
                                                            jnPage.back();
                                                        }
                                                    );
                                                }
                                            });
                                        });

                                } else {
                                    self.stxx.json = JSON.stringify([]);

                                    custEntityService.addEntity(self.stxx).then(function (rsp) {
                                        if (rsp.success) {
                                            jnPage.modified = false;
                                            jnHelper.alert('添加成功').then(function (rsp) {
                                                    jnPage.back();
                                                }
                                            );
                                        }
                                    });
                                }

                            });


                    };

                    //根据统一信用代码查询实体信息
                    self.onChangeLiceNo = function (liceNo) {
                        if (!liceNo || liceNo.length != 18) {
                            return;
                        }
                        custEntityService.readEntity({liceNo: liceNo}).then(function (rsp) {
                            if (rsp.success) {
                                self.stxx = {
                                    opt: 'modifyForAdd',
                                    custNo:rsp.data.custNo,
                                    entCustNo:rsp.data.entCustNo,
                                    custNameDisabled: true,//当查询到统一信用代码时禁用实体名称
                                    liceNoDisabled: true,//当查询到统一信用代码时禁用统一信用代码
                                    liceNoOrNewCardDisabled: true,//当查询到统一信用代码时禁用三证合一
                                    custName: rsp.data.custName,
                                    liceNoOrNewCard: 'Y' ,
                                    liceNo: rsp.data.liceNo,
                                    orgForm: rsp.data.orgForm,
                                    corpReprst: rsp.data.corpReprst,
                                    employeeNum: rsp.data.employeeNum,
                                    orgType: rsp.data.orgType,
                                    fixPhone: rsp.data.fixPhone,
                                    businessStartDt: new Date($filter('jnDate')(rsp.data.businessStartDt)),
                                    businessHours: rsp.data.businessHours,
                                    address: rsp.data.address,
                                    addressArea: rsp.data.addressArea,
                                    addressType: rsp.data.addressType,
                                    addressTypeotherDesc: rsp.data.addressTypeotherDesc,
                                };

                            }

                        });

                    };

                    //根据营业执照查询用户信息
                    self.onChangeRegNo = function (regNo) {
                        if (!regNo || regNo.length != 15) {
                            return;
                        }

                        custEntityService.readEntity({regNo: regNo}).then(function (rsp) {

                            if (rsp.success) {

                                self.stxx = {
                                    opt: 'modifyForAdd',
                                    custNameDisabled: true,
                                    entCustNo:rsp.data.entCustNo,
                                    custNo:rsp.data.custNo,
                                    //查询出营业执照和组织机构代码时禁用营业执照和实体名称
                                    regNoDisabled: rsp.data.regNo && rsp.data.liceNo,
                                    custName: rsp.data.custName,
                                    liceNoOrNewCard:  'N' ,
                                    liceNo: rsp.data.liceNo,
                                    regNo: rsp.data.regNo,
                                    orgForm: rsp.data.orgForm,
                                    corpReprst: rsp.data.corpReprst,
                                    employeeNum: rsp.data.employeeNum,
                                    orgType: rsp.data.orgType,
                                    fixPhone: rsp.data.fixPhone,
                                    businessStartDt: new Date($filter('jnDate')(rsp.data.businessStartDt)),
                                    businessHours: rsp.data.businessHours,
                                    address: rsp.data.address,
                                    addressArea: rsp.data.addressArea,
                                    addressType: rsp.data.addressType,
                                    addressTypeotherDesc: rsp.data.addressTypeotherDesc,
                                };
                            }
                        });

                    };

                }]
        )
        .controller(//实体信息详情
            'custEntityViewCtrl',
            ['$scope', '$stateParams', 'custEntityService', 'jnHelper', '$state', 'jnForm', 'jnPage', 'jnConstant',
                function ($scope, $stateParams, custEntityService, jnHelper, $state, jnForm, jnPage, jnConstant) {
                    var self = this;

                    self.isDetail = $stateParams.isDetail;

                    custEntityService.readEntity({
                        custNo: $stateParams.custNo,
                        entCustNo: $stateParams.entCustNo,
                    }).then(function (rsp) {
                        $scope.e = rsp.data;
                        if (rsp.data.liceNo && rsp.data.liceNo.length == 18) {

                            $scope.e.cardMerge = 'Y';
                        } else {

                            $scope.e.cardMerge = 'N';
                        }


                    });

                    self.edit = function () {


                        $state.go('custEntityEdit', {
                            custNo: $stateParams.custNo,
                            entCustNo: $stateParams.entCustNo,
                        });
                    };
                    self.toDetail = function () {
                        $state.go('custOtherList', {
                            custNo: $stateParams.custNo,
                            entCustNo: $stateParams.entCustNo,
                            actionFlag: 'gtjyz',
                            isDetail: $stateParams.isDetail,
                        });
                    };


                }]
        )
        .controller(//个人客户实体信息修改
            'custEntityEditCtrl',
            ['$filter', '$stateParams', 'custEntityService', 'jnHelper', '$state', 'jnForm', 'myCustomerSer', 'jnValidate', 'jnPage',
                function ($filter, $stateParams, custEntityService, jnHelper, $state, jnForm, myCustomerSer, jnValidate, jnPage) {
                    var self = this;
                    custEntityService.readEntity({
                        custNo: $stateParams.custNo,
                        entCustNo: $stateParams.entCustNo,
                    }).then(function (rsp) {
                        self.stxx = rsp.data;
                        self.stxx.custNo = $stateParams.custNo;

                        if (rsp.data.liceNo && rsp.data.liceNo.length == 18) {

                            self.stxx.liceNoOrNewCard = 'Y';
                            self.stxx.liceNoDisabled = true ;
                            self.stxx.liceNoOrNewCardDisabled = true ;
                        } else {
                            if(rsp.data.liceNo && rsp.data.regNo){
                                self.stxx.regNoDisabled = true ;
                            }

                            self.stxx.liceNoOrNewCard = 'N';
                        }

                    });
                    //self.onSelect = function (cust) {
                    //    self.stxx.custNo = cust.custNo;
                    //}

                    //self.changeCardType = function (cardType) {
                    //    self.stxx.liceNo = '';
                    //    self.stxx.regNo = '';
                    //    self.stxx.orgNo = '';
                    //    self.stxx.custNameDisabled = false;
                    //
                    //}

                    //self.changeCardType = function (cardType) {
                    //    if (cardType == 'Y') {
                    //
                    //        self.stxx.regNo = '';
                    //        self.stxx.orgNo = '';
                    //    }
                    //
                    //}

                    //修改提交
                    self.submit = function () {
                        jnForm.validate(self.form.stxx)
                            .then(function () {
                                //先把共同经营者查回来
                                custEntityService.readEntityPartner({
                                    custNo: $stateParams.custNo,
                                    entCustNo: $stateParams.entCustNo,
                                }).then(
                                    function (rsp) {
                                        var json = [];
                                        if (rsp.items && rsp.items.length > 0) {
                                            json = refine(rsp.items, [
                                                'custAddr',
                                                'custName',
                                                'custNo',
                                                'custType',
                                                'liceNo',
                                                'linkType',
                                                'paperNo',
                                                'paperType',
                                                'phoneNo',
                                                'regNo',
                                                'sharePct',
                                                'workUnit',
                                            ]);
                                        }
                                        json = JSON.stringify(json);
                                        self.stxx.json = json;
                                        self.stxx.custNo = $stateParams.custNo;
                                        custEntityService.updateEntity(self.stxx).then(function (rsp) {
                                            if (rsp.data.success) {
                                                jnPage.modified = false;
                                                jnHelper.alert('修改成功').then(function (rsp) {
                                                        jnPage.back();
                                                    }
                                                );
                                            }
                                        });
                                    }
                                );


                            });


                    };

                    //根据统一信用代码查询实体信息
                    self.onChangeLiceNo = function (liceNo) {
                        if (!liceNo || liceNo.length != 18) {
                            return;
                        }
                        custEntityService.readEntity({liceNo: liceNo}).then(function (rsp) {
                            if (rsp.success) {
                                self.stxx = {
                                    opt:'modifyForAdd',
                                    entCustNo:rsp.data.entCustNo,
                                    liceNoDisabled: true,//当查询到统一信用代码时禁用统一信用代码
                                    liceNoOrNewCardDisabled: true,//当查询到统一信用代码时禁用三证合一
                                    custName: rsp.data.custName,
                                    liceNoOrNewCard: 'Y' ,
                                    liceNo: rsp.data.liceNo,
                                    orgForm: rsp.data.orgForm,
                                    corpReprst: rsp.data.corpReprst,
                                    employeeNum: rsp.data.employeeNum,
                                    orgType: rsp.data.orgType,
                                    fixPhone: rsp.data.fixPhone,
                                    businessHours: rsp.data.businessHours,
                                    address: rsp.data.address,
                                    addressArea: rsp.data.addressArea,
                                    addressType: rsp.data.addressType,
                                    addressTypeotherDesc: rsp.data.addressTypeotherDesc,
                                    businessStartDt: new Date($filter('jnDate')(rsp.data.businessStartDt)),
                                };

                            }

                        });

                    };
                    //根据营业执照查询用户信息
                    self.onChangeRegNo = function (regNo) {
                        if (!regNo || regNo.length != 15) {
                            return;
                        }

                        custEntityService.readEntity({regNo: regNo}).then(function (rsp) {

                            if (rsp.success) {
                                self.stxx = {
                                    opt:'modifyForAdd',
                                    entCustNo:rsp.data.entCustNo,
                                    //查询出营业执照和组织机构代码时禁用营业执照和实体名称
                                    regNoDisabled: rsp.data.regNo && rsp.data.liceNo,
                                    custName: rsp.data.custName,
                                    regNo: rsp.data.regNo,
                                    liceNoOrNewCard: 'N',
                                    liceNo: rsp.data.liceNo,
                                    orgForm: rsp.data.orgForm,
                                    corpReprst: rsp.data.corpReprst,
                                    employeeNum: rsp.data.employeeNum,
                                    orgType: rsp.data.orgType,
                                    fixPhone: rsp.data.fixPhone,
                                    businessStartDt: new Date($filter('jnDate')(rsp.data.businessStartDt)),
                                    businessHours: rsp.data.businessHours,
                                    address: rsp.data.address,
                                    addressArea: rsp.data.addressArea,
                                    addressType: rsp.data.addressType,
                                    addressTypeotherDesc: rsp.data.addressTypeotherDesc,
                                };
                            }
                        });

                    };
                }]
        );
    /**
     * 创建过滤器，过滤器返回一个新的对象，只保留 filterList 包含的字段。
     */
    function refine(data, filterList) {
        var refined = [];
        var t = null;
        for (var i = 0; i < data.length; i++) {
            t = {};
            filterList.forEach(function (key) {
                t[key] = data[i][key];
            });
            refined.push(t);
        }
        return refined;
    }

})();




