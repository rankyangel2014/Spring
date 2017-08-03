(function () {
    'use strict';

    angular
        .module('custOtherList')
        .controller(//实际控制人列表
            'custActualListCtrl',
            ['jnTitleMenu', '$stateParams', 'custActualService', 'jnHelper', '$state', '$scope', '$ionicListDelegate',
                function (jnTitleMenu, $stateParams, custActualService, jnHelper, $state, $scope, $ionicListDelegate) {
                    $scope.isDetail = $stateParams.isDetail;
                    var self = this;
                    //查看详情
                    self.toDetail = function (cust) {

                        if (cust.custType == '0') {
                            //个人详情
                            $state.go('perCustActualView', {
                                custNo: cust.custNo,
                                isDetail: $stateParams.isDetail,
                                pCustNo: $stateParams.custNo,
                            });
                        } else {

                            //企业详情
                            $state.go('entCustActualView', {
                                custNo: cust.custNo,
                                isDetail: $stateParams.isDetail,
                                pCustNo: $stateParams.custNo,
                            });
                        }


                    }

                    //列表查询
                    var pf = jnHelper.PaginateFetcher(custActualService.readActualList)
                        .params($stateParams);

                    self.list = pf.records();

                    self.more = function () {
                        pf.fetch();
                    };
                    self.more();

                    //右上角弹出菜单
                    var titleMenu;
                    self.showTitleMenu = function () {
                        if (!titleMenu) {
                            titleMenu = jnTitleMenu.create({
                                items: [{
                                    template: '新增个人控制人',
                                    onTap: function () {
                                        $state.go('perCustActualAdd', {
                                            custNo: $stateParams.custNo,
                                        });
                                    },
                                }, {
                                    template: '新增企业控制人',
                                    onTap: function () {
                                        $state.go('entCustActualAdd', {
                                            custNo: $stateParams.custNo,
                                        });
                                    },
                                }],
                            });
                        }

                        titleMenu.show();
                    };


                    //删除实际控制人
                    self.deleteItem = function (event, item) {
                        event.stopPropagation();
                        var params = {
                            linkTypeflag: '14',
                            custNo: $stateParams.custNo,
                            orgNo: $stateParams.orgNo,
                            linkCustNo: item.custNo,
                            operType: '1'
                        };

                        var text = '确实要删除控制人' + item.custName + '吗？';
                        jnHelper.confirm(text).then(function (confirmed) {
                            if (confirmed) {
                                custActualService.delActual(params)
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
        );

})();
//根据身份证号取年龄
function getAgeByPaperNo(IDCardNo) {
    var len = IDCardNo.length;
    var age = 0;
    if (len != 15 && len != 18)
        return age;
    //获取年龄
    var nowDate = new Date();
    var month = nowDate.getMonth() + 1;
    var day = nowDate.getDate();
    if (len == 18) {
        age = nowDate.getFullYear() - parseInt(IDCardNo.substring(6, 10)) - 1;
        if (IDCardNo.substring(10, 12) < month || IDCardNo.substring(10, 12) == month && IDCardNo.substring(12, 14) <= day) {
            age++;
        }
    } else if (len == 15) {
        age = nowDate.getFullYear() - parseInt("19" + IDCardNo.substring(6, 8)) - 1;
        if (IDCardNo.substring(8, 10) < month || IDCardNo.substring(8, 10) == month && IDCardNo.substring(10, 12) <= day) {
            age++;
        }
    }
    return age;
}

//根据身份证号取出生日期
function getBirthdayByPaperNo(IDCardNo) {
    var len = IDCardNo.length;
    var birthday = "";
    if (len != 15 && len != 18)
        return birthday;
    //获取出生日期
    if (len == 18) {
        birthday = IDCardNo.substring(6, 10) + "-" + IDCardNo.substring(10, 12) + "-" + IDCardNo.substring(12, 14);
    } else if (len == 15) {
        birthday = "19" + IDCardNo.substring(6, 8) + "-" + IDCardNo.substring(8, 10) + "-" + IDCardNo.substring(10, 12);
    }
    return birthday;
}

//根据身份证号取性别
function getSexByPaperNo(IDCardNo) {
    var len = IDCardNo.length;
    var sex = '';
    if (len != 15 && len != 18)
        return sex;
    //获取性别
    if (len == 18) {
        if (parseInt(IDCardNo.substr(16, 1)) % 2 == 1) {
            sex = 'M';
        } else {
            sex = 'F';
        }
    } else if (len == 15) {
        if (parseInt(IDCardNo.substr(13, 1)) % 2 == 1) {
            sex = 'M';
        } else {
            sex = 'F';
        }
    }
    return sex;
}


