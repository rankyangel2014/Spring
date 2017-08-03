/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('myBusiness')
        .controller('myBusiness.detailCtrl',
            ['jnHttp',
                'jnUser',
                '$state',
                '$stateParams',
                '$scope',
                'LoanBaseInfoService',
                function (jnHttp,
                          jnUser,
                          $state,
                          $stateParams,
                          $scope,
                          LoanBaseInfoService) {

                    var params = {};
                    $scope.custNo = $stateParams.custNo;
                    params.custNo = $stateParams.custNo;
                    params.custType = $stateParams.custType;
                    params.loanNo = $stateParams.loanNo;


                    $scope.custNo = $stateParams.custNo;
                    $scope.custType = $stateParams.custType;
                    $scope.loanNo = $stateParams.loanNo;
                    $scope.crdtNo = $stateParams.crdtNo;

                    //点击申请链接
                    $scope.clickLoanApply = function () {

                        if ($scope.contTyp != '3') {//普通贷款和最高额授信

                            $state.go('loanDetailInfo', {
                                custNo: $scope.custNo,
                                custType: $scope.custType,
                                loanNo: $scope.loanNo,
                                loanState: $scope.status
                            });
                        } else {//用信编辑 同一团队的后台人员可以编辑用信
                            if ($scope.status == '11'
                                && ($stateParams.custManagerNo == jnUser.userId || jnUser.hasStation('566'))) {

                                $state.go('creditLoanApplyAdd', {
                                    custNo: $scope.custNo,
                                    custType: $scope.custType,
                                    loanNo: $scope.loanNo,
                                    crdtNo: $scope.crdtNo
                                });
                            }
                            else {//用信详情

                                $state.go('creditLoanApplyView', {
                                    custNo: $scope.custNo,
                                    custType: $scope.custType,
                                    loanNo: $scope.loanNo,
                                    crdtNo: $scope.crdtNo,
                                });
                            }
                        }

                    }


                    jnHttp.post('/mloan/router/rest/MloanCommAction.do?method=getLoanInfo', params)
                        .then(function (rsp) {
                            $scope.it = rsp.data.loanNoInf;
                            $scope.contTypId = $stateParams.contTypId;
                            $scope.contTyp = $stateParams.contTyp;
                            $scope.applAmt = $stateParams.applAmt;
                            $scope.status = rsp.data.loanNoInf['status'];
                            $scope.deptId = rsp.data['orgNo'];
                            
                            var contTyp = $stateParams.contTyp;
                            var status = rsp.data.loanNoInf['status'];
                            var store = rsp.loanHisList.root;
                            var count = store.length;
                            var operType = undefined;
                            if (count >= 2) {
                                operType = store[count - 2].operType;
                            }

                            $scope.checkAbled = false;//是否显示贷后检查链接
                            $scope.loanApplyAbled = true;//是否显示新增用信链接
                            //1 普通贷款 ， 2 授信 ，3 用信
                            if (($stateParams.contTyp == '1' || $stateParams.contTyp == '3')
                                && status == '61') {
                                $scope.checkAbled = true;

                            }

                            //以下代码是为判断是否可以申请最高额授信
                            if (!jnUser.hasStation(400) && !jnUser.hasStation(500) && !jnUser.hasStation(566)) {
                                $scope.loanApplyAbled = false;
                            } else if ($stateParams.contTyp != '2') {//1 普通贷款 ， 2 授信 ，3 用信
                                $scope.loanApplyAbled = false;
                            } else if (status != '49') {
                                $scope.loanApplyAbled = false;
                            } else if (!jnUser.hasStation(566) && $stateParams.custManagerNo != jnUser.userId) {
                                $scope.loanApplyAbled = false;
                            } else {
                                LoanBaseInfoService.getCreditApplyCount({
                                    crdtNo: $stateParams.loanNo
                                }).then(function (data) {
                                    if (data.success && data.count > 0) {
                                        $scope.loanApplyAbled = false;
                                    }
                                })
                            }


                            $scope.zcClass = 'pending';//注册
                            $scope.sqClass = 'pending';//申请
                            $scope.dcClass = 'pending';//调查
                            $scope.hsClass = 'pending';//会审
                            $scope.qyClass = 'pending';//签约
                            $scope.fkClass = 'pending';//放款

                            if (contTyp == '2') {//panel初始化处理-最高额贷款
                                if ((status >= 70 && status < 80) || status == 49) {
                                    if (status == 70) {
                                        if (!store || count < 2) {
                                            $scope.zcClass = '';//注册
                                            $scope.sqClass = '';//申请
                                            $scope.dcClass = 'pending';//调查
                                            $scope.hsClass = 'pending';//会审
                                            $scope.qyClass = 'pending';//签约

                                        } else {
                                            if (operType == '0' || operType == '1' || operType == '2' || operType == '3' || operType == '4') {

                                                $scope.zcClass = '';//注册
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = 'pending';//调查
                                                $scope.hsClass = 'pending';//会审
                                                $scope.qyClass = 'pending';//签约

                                            } else if (operType == '5' || operType == '6' || operType == '7' || operType == '8' || operType == '9' || operType == 'a' || operType == 'b' || operType == 'c' || operType == 'd') {
                                                $scope.zcClass = '';//注册
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = 'pending';//会审
                                                $scope.qyClass = 'pending';//签约
                                            } else if (operType == 'e' || operType == 'f' || operType == 'g' || operType == 'h') {
                                                $scope.zcClass = '';//注册
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = '';//会审
                                                $scope.qyClass = 'pending';//签约
                                            } else {
                                                $scope.zcClass = '';//注册
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = '';//会审
                                                $scope.qyClass = '';//签约
                                            }
                                        }

                                    } else if (status == 71) {

                                        $scope.zcClass = '';//注册
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = 'pending';//调查
                                        $scope.hsClass = 'pending';//会审
                                        $scope.qyClass = 'pending';//签约

                                    } else if (status == 72 || status == 73) {
                                        $scope.zcClass = '';//注册
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = 'pending';//会审
                                        $scope.qyClass = 'pending';//签约
                                    } else if (status == 74) {
                                        $scope.zcClass = '';//注册
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = '';//会审
                                        $scope.qyClass = 'pending';//签约
                                    } else {
                                        $scope.zcClass = '';//注册
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = '';//会审
                                        $scope.qyClass = '';//签约
                                    }
                                } else if (!status || status < 10) {

                                    $scope.zcClass = 'active';//注册
                                    $scope.sqClass = 'pending';//申请
                                    $scope.dcClass = 'pending';//调查
                                    $scope.hsClass = 'pending';//会审
                                    $scope.qyClass = 'pending';//签约
                                } else if (status >= 10 && status < 20) {
                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = 'active';//申请
                                    $scope.dcClass = 'pending';//调查
                                    $scope.hsClass = 'pending';//会审
                                    $scope.qyClass = 'pending';//签约
                                } else if (status >= 20 && status < 30) {
                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = 'active';//调查
                                    $scope.hsClass = 'pending';//会审
                                    $scope.qyClass = 'pending';//签约
                                } else if (status >= 30 && status < 40) {
                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = 'active';//会审
                                    $scope.qyClass = 'pending';//签约
                                } else if (status >= 40 && status < 50 && status != 49) {
                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = '';//会审
                                    $scope.qyClass = 'active';//签约
                                } else if (status >= 50 && status < 70) {
                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = '';//会审
                                    $scope.qyClass = '';//签约
                                }

                            } else if (contTyp == '3') { //panel初始化处理-用信贷款

                                if (status >= 70 && status < 80) {
                                    if (status == 70) {
                                        if (!store || count < 2) {

                                            $scope.sqClass = '';//申请
                                            $scope.dcClass = 'pending';//调查
                                            $scope.hsClass = 'pending';//会审
                                            $scope.qyClass = 'pending';//签约
                                            $scope.fkClass = 'pending';//放款

                                        } else {

                                            if (operType == '0' || operType == '1' || operType == '2' || operType == '3' || operType == '4') {

                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = 'pending';//调查
                                                $scope.hsClass = 'pending';//会审
                                                $scope.qyClass = 'pending';//签约
                                                $scope.fkClass = 'pending';//放款

                                            } else if (operType == '5' || operType == '6' || operType == '7' || operType == '8' || operType == '9' || operType == 'a' || operType == 'b' || operType == 'c' || operType == 'd') {


                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = 'pending';//会审
                                                $scope.qyClass = 'pending';//签约
                                                $scope.fkClass = 'pending';//放款
                                            } else if (operType == 'e' || operType == 'f' || operType == 'j' || operType == 'h') {
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = '';//会审
                                                $scope.qyClass = 'pending';//签约
                                                $scope.fkClass = 'pending';//放款
                                            } else if (operType == 'i') {
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = '';//会审
                                                $scope.qyClass = '';//签约
                                                $scope.fkClass = 'pending';//放款
                                            } else {
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = '';//会审
                                                $scope.qyClass = '';//签约
                                                $scope.fkClass = '';//放款
                                            }
                                        }

                                    } else if (status == 71) {

                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = 'pending';//调查
                                        $scope.hsClass = 'pending';//会审
                                        $scope.qyClass = 'pending';//签约
                                        $scope.fkClass = 'pending';//放款


                                    } else if (status == 72 || status == 73) {
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = 'pending';//会审
                                        $scope.qyClass = 'pending';//签约
                                        $scope.fkClass = 'pending';//放款
                                    } else if (status == 74) {
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = '';//会审
                                        $scope.qyClass = 'pending';//签约
                                        $scope.fkClass = 'pending';//放款
                                    } else if (status == 78) {
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = '';//会审
                                        $scope.qyClass = '';//签约
                                        $scope.fkClass = 'pending';//放款
                                    } else {
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = '';//会审
                                        $scope.qyClass = '';//签约
                                        $scope.fkClass = '';//放款
                                    }
                                } else if (!status || status < 20) {
                                    $scope.sqClass = 'active';//申请
                                    $scope.dcClass = 'pending';//调查
                                    $scope.hsClass = 'pending';//会审
                                    $scope.qyClass = 'pending';//签约
                                    $scope.fkClass = 'pending';//放款
                                } else if (status >= 20 && status < 30) {
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = 'active';//调查
                                    $scope.hsClass = 'pending';//会审
                                    $scope.qyClass = 'pending';//签约
                                    $scope.fkClass = 'pending';//放款
                                } else if (status >= 30 && status < 40) {
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = 'active';//会审
                                    $scope.qyClass = 'pending';//签约
                                    $scope.fkClass = 'pending';//放款


                                } else if (status >= 40 && status < 50 && status != 49) {

                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = '';//会审
                                    $scope.qyClass = 'active';//签约
                                    $scope.fkClass = 'pending';//放款
                                } else if (status >= 50 && status < 60) {
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = '';//会审
                                    $scope.qyClass = '';//签约
                                    $scope.fkClass = 'active';//放款
                                } else if (status >= 60 && status < 70) {

                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = '';//会审
                                    $scope.qyClass = '';//签约
                                    $scope.fkClass = '';//放款

                                }

                            } else {//panel初始化处理-普通贷款
                                if (status >= 70 && status < 80) {
                                    if (status == 70) {
                                        if (!store || count < 2) {
                                            $scope.zcClass = '';//注册
                                            $scope.sqClass = '';//申请
                                            $scope.dcClass = 'pending';//调查
                                            $scope.hsClass = 'pending';//会审
                                            $scope.qyClass = 'pending';//签约
                                            $scope.fkClass = 'pending';//放款
                                        } else {
                                            if (operType == '0' || operType == '1' || operType == '2' || operType == '3' || operType == '4') {
                                                $scope.zcClass = '';//注册
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = 'pending';//调查
                                                $scope.hsClass = 'pending';//会审
                                                $scope.qyClass = 'pending';//签约
                                                $scope.fkClass = 'pending';//放款

                                            } else if (operType == '5' || operType == '6' || operType == '7' || operType == '8' || operType == '9' || operType == 'a' || operType == 'b' || operType == 'c' || operType == 'd') {

                                                $scope.zcClass = '';//注册
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = 'pending';//会审
                                                $scope.qyClass = 'pending';//签约
                                                $scope.fkClass = 'pending';//放款
                                            } else if (operType == 'e' || operType == 'f' || operType == 'g' || operType == 'h') {

                                                $scope.zcClass = '';//注册
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = '';//会审
                                                $scope.qyClass = 'pending';//签约
                                                $scope.fkClass = 'pending';//放款
                                            } else if (operType == 'i') {
                                                $scope.zcClass = '';//注册
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = '';//会审
                                                $scope.qyClass = '';//签约
                                                $scope.fkClass = 'pending';//放款

                                            } else {

                                                $scope.zcClass = '';//注册
                                                $scope.sqClass = '';//申请
                                                $scope.dcClass = '';//调查
                                                $scope.hsClass = '';//会审
                                                $scope.qyClass = '';//签约
                                                $scope.fkClass = '';//放款
                                            }
                                        }

                                    } else if (status == 71) {

                                        $scope.zcClass = '';//注册
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = 'pending';//调查
                                        $scope.hsClass = 'pending';//会审
                                        $scope.qyClass = 'pending';//签约
                                        $scope.fkClass = 'pending';//放款

                                    } else if (status == 72 || status == 73) {

                                        $scope.zcClass = '';//注册
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = 'pending';//会审
                                        $scope.qyClass = 'pending';//签约
                                        $scope.fkClass = 'pending';//放款

                                    } else if (status == 74) {

                                        $scope.zcClass = '';//注册
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = '';//会审
                                        $scope.qyClass = 'pending';//签约
                                        $scope.fkClass = 'pending';//放款
                                    } else if (status == 78) {

                                        $scope.zcClass = '';//注册
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = '';//会审
                                        $scope.qyClass = '';//签约
                                        $scope.fkClass = 'pending';//放款
                                    } else {

                                        $scope.zcClass = '';//注册
                                        $scope.sqClass = '';//申请
                                        $scope.dcClass = '';//调查
                                        $scope.hsClass = '';//会审
                                        $scope.qyClass = '';//签约
                                        $scope.fkClass = '';//放款
                                    }
                                } else if (!status || status < 10) {

                                    $scope.zcClass = 'active';//注册
                                    $scope.sqClass = 'pending';//申请
                                    $scope.dcClass = 'pending';//调查
                                    $scope.hsClass = 'pending';//会审
                                    $scope.qyClass = 'pending';//签约
                                    $scope.fkClass = 'pending';//放款

                                } else if (status >= 10 && status < 20) {
                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = 'active';//申请
                                    $scope.dcClass = 'pending';//调查
                                    $scope.hsClass = 'pending';//会审
                                    $scope.qyClass = 'pending';//签约
                                    $scope.fkClass = 'pending';//放款
                                } else if (status >= 20 && status < 30) {

                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = 'active';//调查
                                    $scope.hsClass = 'pending';//会审
                                    $scope.qyClass = 'pending';//签约
                                    $scope.fkClass = 'pending';//放款
                                } else if (status >= 30 && status < 40) {
                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = 'active';//会审
                                    $scope.qyClass = 'pending';//签约
                                    $scope.fkClass = 'pending';//放款
                                } else if (status >= 40 && status < 50 && status != 49) {
                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = '';//会审
                                    $scope.qyClass = 'active';//签约
                                    $scope.fkClass = 'pending';//放款
                                } else if (status >= 50 && status < 60) {

                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = '';//会审
                                    $scope.qyClass = '';//签约
                                    $scope.fkClass = 'active';//放款
                                } else if (status >= 60 && status < 70) {
                                    $scope.zcClass = '';//注册
                                    $scope.sqClass = '';//申请
                                    $scope.dcClass = '';//调查
                                    $scope.hsClass = '';//会审
                                    $scope.qyClass = '';//签约
                                    $scope.fkClass = '';//放款

                                }

                            }

                        });

                    $scope.goAttachment = function () {
                        $state.go('DocAll', {
                            bnNo: $stateParams.loanNo,
                            custNo: $stateParams.custNo,
                            custName: $stateParams.custName,
                            applAmt: $stateParams.applAmt,
                            loanStatus: $scope.status,
                            contTyp: $stateParams.contTyp,
                        });
                    };

                    $scope.goLoanCheck = function () {
                        $state.go('loanCheckList', {
                            loanNo: $stateParams.loanNo,
                            custNo: $stateParams.custNo,
                            custName: $stateParams.custName,
                            applAmt: $stateParams.applAmt,
                            loanStatus: $scope.status,
                            contTyp: $stateParams.contTyp,
                            custManagerNo: $stateParams.custManagerNo,
                        });
                    };
                }]
        );

})();
