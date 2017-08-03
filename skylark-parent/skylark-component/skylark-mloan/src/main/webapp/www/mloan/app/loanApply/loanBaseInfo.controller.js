(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('loanBaseInfoCtrl', loanBaseInfoCtrl);

    loanBaseInfoCtrl.$inject = ['$scope', '$ionicModal', 'LoanBaseInfoService', 'jnUser', 'jnHelper', '$state', 'LoanApplyUtilService', 'LoanDetailInfoService', 'jnForm', 'jnPage'];

    function loanBaseInfoCtrl($scope, $ionicModal, LoanBaseInfoService, jnUser, jnHelper, $state, LoanApplyUtilService, LoanDetailInfoService, jnForm, jnPage) {
        var self = this;
        var getCrdtLoanListParam = {}; //获取授信贷款参数对象
        var getProdTypeListParam = {}; //获取产品类型参数对象

        self.form = {
            contTyp: '1', //业务类型默认为【普通贷款】
            cardMerge: 'N' //三证合一默认为”否“
        };
        self.prodTypeList = {}; //产品类型的VM
        self.crdtLoanModalConf = {}; //crdtLoanModal的VM
        self.custNameModalConf = {}; //custNameModal的VM
        self.changeCustType = changeCustType; //watch【客户类型】
        self.saveForm = saveForm; //保存

        function saveForm() {
            jnForm.validate(self.loanBaseInfoForm).then(function() {
                if (self.form.contTyp == '1') {
                    if (self.form.custType == '0') {
                        //保存【个人信息】并生成借据号
                        LoanDetailInfoService.savePersonalInfo(jnHelper.merge(self.form, {
                            flowFlag: self.selectPrefix == "reserve" ? '1' : '', //潜在客户1
                            moduleId: '1',
                            custType: self.form.custType,
                            prodNo: self.form.prodNo,
                            pCustNo: self.form.custNo,
                        })).then(function(rsp) {
                            if (rsp.success) {
                                jnPage.modified = false;
                                //跳转到【个人申请详情界面】
                                $state.go("loanDetailInfo", {
                                    loanNo: rsp.data.loanNo,
                                    custNo: rsp.data.custNo,
                                    custType: self.form.custType,
                                    loanState: "11"
                                });
                            }
                        });
                    } else if (self.form.custType == '1') {
                        //保存【企业信息】并生成借据号
                        LoanDetailInfoService.saveCompanyInfo(jnHelper.merge(self.form, {
                            flowFlag: self.selectPrefix == "reserve" ? '1' : '', //潜在客户1
                            moduleId: '2',
                            custType: self.form.custType,
                            prodNo: self.form.prodNo,
                            pCustNo: self.form.custNo,
                            paperType: self.form.cardMerge == 'N' ? '10' : '11', //证件类型
                        })).then(function(rsp) {
                            if (rsp.success) {
                                jnPage.modified = false;
                                //跳转到【企业申请详情界面】
                                $state.go("loanDetailInfo", {
                                    loanNo: rsp.data.loanNo,
                                    custNo: rsp.data.custNo,
                                    custType: self.form.custType,
                                    loanState: "11"
                                });
                            }
                        });
                    }
                } else if (self.form.contTyp == '3') { //用信申请

                    if (!jnUser.hasStation(400) && !jnUser.hasStation(500) && !jnUser.hasStation(566)) {
                        jnHelper.alert('当前登录人员，无操作权限！');
                        return;
                    }


                    if (self.form.crdtLoan == null || self.form.crdtLoan == undefined || self.form.crdtLoan == '') {
                        jnHelper.alert('请选择授信贷款信息！');
                        return;
                    }

                    if (!jnUser.hasStation(566) && $clmScope.crdtLoanTemp.custManagerNo != jnUser.userId) {
                        jnHelper.alert("仅能使用当前用户名下的最高额授信进行用信贷款申请！");
                        return;
                    }


                    LoanBaseInfoService.getCreditApplyCount({
                        crdtNo: self.form.crdtLoan
                    }).then(function(data) {
                        if (data.success && data.count <= 0) {
                            jnPage.modified = false;
                            $state.go("creditLoanApplyAdd", {
                                crdtNo: $clmScope.crdtLoanTemp.loanNo,
                                custNo: $clmScope.crdtLoanTemp.custNo,
                                loanNo: '',
                                custType: $clmScope.crdtLoanTemp.custType
                            });
                        } else {
                            jnHelper.alert('该最高额授信下已存在申请中的用信贷款！');
                        }
                    })

                }
            });
        }

        //watch【客户类型】
        function changeCustType() {
            //还原原先选择的客户
            self.form.custName = "";
            self.form.custNo = "";
            self.form.paperType = "";
            self.form.paperNo = "";
            self.form.regNo = "";
            self.form.cardMerge = "N";
            self.isCardMergeDisabled = "able";
            $custScope.selected = "";
            startFormal = 0;
            startReserve = 0;
            $custScope.formalCustList = {
                total: 0,
                items: []
            };
            $custScope.reserveCustList = {
                total: 0,
                items: []
            };

            getProdTypeListParam.paramValue = self.form.custType;
            //获取产品类型
            LoanBaseInfoService.getProdTypeList(getProdTypeListParam).then(
                function(data) {
                    self.prodTypeList = data;
                });
        }

        var $clmScope = self.crdtLoanModalConf; //crdtLoanModal的VM
        var $custScope = self.custNameModalConf; //custNameModal的VM

        //[选择授信贷款]modal
        $ionicModal.fromTemplateUrl("app/loanApply/crdtLoanModal.html", {
            scope: $scope,
            animation: "slide-in-up",
            backdropClickToClose: false
        }).then(function(modal) {
            $scope.crdtLoanModal = modal;
        });

        $clmScope.openCrdtLoanModal = function() {
            $clmScope.keywords = '';
            $scope.crdtLoanModal.show();
            $clmScope.creditList = {
                total: 0,
                items: []
            }
            var start = 0;
            var limit = 10;

            //获取授信贷款
            $clmScope.getloan = function(start, limit) {
                LoanBaseInfoService.getAllLoanList({
                    contTyp: '2',
                    status: '49',
                    start: start,
                    limit: limit,
                    custName: $clmScope.keywords
                }).then(
                    function(data) {
                        $clmScope.creditList.total = data.total;
                        var items = $clmScope.creditList.items.concat(data.items);
                        $clmScope.creditList.items = items;
                    });
            }

            $clmScope.more = function() {
                $clmScope.getloan(start, limit);
                start += 10;
            }

            $clmScope.search = function() {
                start = 0;
                $clmScope.creditList.items = [];
                $clmScope.getloan(start, limit);
            }
            $clmScope.more();

        };


        $clmScope.hideCrdtLoanModal = function() {
            $clmScope.crdtLoanTemp = {}; //临时存放选取的授信贷款
            $clmScope.selected = '';
            self.form.crdtLoan = '';
            self.form.contNoExt = '';
            $scope.crdtLoanModal.hide();
        };

        //选择贷款
        $clmScope.chooseCrdtLoan = function(item, index) {
            $clmScope.crdtLoanTemp = item; //临时存放选取的授信贷款
            $clmScope.selected = item.loanNo;
        };

        //判断元素是否被选中
        $clmScope.isItemSelected = function(loanNo) {
            if ($clmScope.selected === loanNo) {
                return true;
            } else {
                return false;
            }
        };

        $clmScope.confirmCrdtLoan = function() {
            if ($clmScope.crdtLoanTemp) {
                self.form.crdtLoan = $clmScope.crdtLoanTemp.loanNo;
                self.form.contNoExt = $clmScope.crdtLoanTemp.contNoExt || self.form.crdtLoan;
                LoanBaseInfoService.getCreditApplyCount({
                    crdtNo: self.form.crdtLoan
                }).then(function(data) {
                    if (data.count > 0) {
                        jnHelper.alert('该最高额授信下已存在申请中的用信贷款！');
                        return;
                    } else {
                        $scope.crdtLoanModal.hide();
                    }
                })
            } else {
                jnHelper.alert("您还未选择【授信贷款】!");
            }
        };



        //[选择客户]modal
        $ionicModal.fromTemplateUrl("app/loanApply/custNameModal.html", {
            scope: $scope,
            animation: "slide-in-up",
            backdropClickToClose: false
        }).then(function(modal) {
            $scope.custNameModal = modal;
        });

        $custScope.formalCustList = {
            total: 0,
            items: []
        };
        $custScope.reserveCustList = {
            total: 0,
            items: []
        };
        var startFormal = 0,
            startReserve = 0,
            limit = 10;

        //打开选择客户窗口
        $custScope.openCustNameModal = function() {
            if (!self.form.custType) {
                jnHelper.alert("请先选择客户类型！");
                return;
            }


            //正式客户筛选条件
            var initFormalCustListParam = {
                    custType: self.form.custType, //客户类型
                }
                //潜在客户筛选条件
            var initReserveCustListParam = {
                custType: self.form.custType, //客户类型
            }

            //init param
            LoanApplyUtilService.initParam(initFormalCustListParam);
            LoanApplyUtilService.initParam(initReserveCustListParam);

            //获取正式客户
            $custScope.getFormalCustList = function(startFormal, limit) {
                LoanBaseInfoService.getCustList(jnHelper.merge(initFormalCustListParam, {
                    start: startFormal,
                    limit: limit,
                    custName: $custScope.formalKeywords,
                    custClass: '0' //bug?? 过滤掉关联客户
                })).then(function(data) {
                    $custScope.formalCustList.total = data.total;
                    $custScope.formalCustList.items = $custScope.formalCustList.items.concat(data.root);
                });
            }

            //正式客户 加载更多
            $custScope.moreFormal = function() {
                $custScope.getFormalCustList(startFormal, limit);
                startFormal += 10;
            }

            //搜索正式客户
            $custScope.searchFormal = function() {
                startFormal = 0;
                $custScope.formalCustList.items = [];
                $custScope.getFormalCustList(startFormal, limit);
                if ($custScope.custTemp && $custScope.custTemp.selectPrefix == "formal") {
                    $custScope.selected = "";
                }
            }

            //获取潜在客户
            $custScope.getReserveCustList = function(startReserve, limit) {
                LoanBaseInfoService.getPreCustInfoList(jnHelper.merge(initReserveCustListParam, {
                    start: startReserve,
                    _pageLimit: limit,
                    custName: $custScope.reserveKeywords,
                    visitResult: '2', //最近回访结果：有意向
                    status: '0', //客户状态：有效
                })).then(function(data) {
                    $custScope.reserveCustList.total = data.total;
                    $custScope.reserveCustList.items = $custScope.reserveCustList.items.concat(data.root);
                });
            }

            //潜在客户 加载更多
            $custScope.moreReserve = function() {
                $custScope.getReserveCustList(startReserve, limit);
                startReserve += 10;
            }

            //搜索潜在客户
            $custScope.searchReserve = function() {
                startReserve = 0;
                $custScope.reserveCustList.items = [];
                $custScope.getReserveCustList(startReserve, limit);
                if ($custScope.custTemp && $custScope.custTemp.selectPrefix == "reserve") {
                    $custScope.selected = "";
                }
            }

            if ($custScope.formalCustList.total == 0) {
                startFormal = 0,
                    $custScope.moreFormal();
            }
            if ($custScope.reserveCustList.total == 0) {
                startReserve = 0,
                    $custScope.moreReserve();
            }

            $scope.custNameModal.show();
        };

        //取消
        $custScope.hideCustNameModal = function() {
            $custScope.selected = "";
            $scope.custNameModal.hide();
        };

        //选择客户
        $custScope.chooseCustName = function(item, prefix, index) {
            $custScope.custTemp = item; //临时存放选取的授信贷款
            $custScope.selected = prefix + index;
            $custScope.custTemp.selectPrefix = prefix; //用来区分是否是【潜在客户】
        };

        //判断元素是否被选中
        $custScope.isItemSelected = function(prefix, index) {
            if ($custScope.selected === (prefix + index)) {
                return true;
            } else {
                return false;
            }
        };

        //确定
        $custScope.confirmCustName = function() {
            if ($custScope.custTemp) {
                //校验该客户是否有贷款资格，并给出相应提醒
                LoanBaseInfoService.getCustWarning($custScope.custTemp).then(function(rsp) {
                    if (rsp) {
                        jnHelper.confirm(rsp).then(function(confirmed) {
                            if (!confirmed) {
                                return;
                            }

                            self.form.custName = $custScope.custTemp.custName;
                            self.form.custNo = $custScope.custTemp.custNo;
                            self.selectPrefix = $custScope.custTemp.selectPrefix;

                            if ($custScope.custTemp.custType == '0') {
                                self.form.paperNo = $custScope.custTemp.paperNo;
                                //初始化个人信息
                                LoanDetailInfoService.getPersonalInfo({
                                    custNo: self.form.custNo,
                                    loanApplModFlag: self.selectPrefix == "reserve" ? 'reserveCust' : 'formalCust', //潜在客户1
                                }).then(function(rsp) {
                                    LoanApplyUtilService.initPersonalForm(rsp, self.form);
                                    $scope.custNameModal.hide();
                                });
                            } else {
                                //初始化企业信息
                                LoanDetailInfoService.getCompanyInfo({
                                    custNo: self.form.custNo,
                                    pCustType: self.form.custType,
                                    pCustNo: self.form.custNo,
                                    loanApplModFlag: self.selectPrefix == "reserve" ? 'reserveCust' : 'formalCust', //潜在客户1
                                }).then(function(rsp) {
                                    //初始化企业信息
                                    LoanApplyUtilService.initCompanyForm(rsp, self.form);
                                    //清空【营业执照】【组织机构代码】
                                    self.form.regNo = null;
                                    self.form.liceNo = null;
                                    if ($custScope.custTemp.paperType == '10') { //营业执照注册号
                                        self.form.cardMerge = 'N';
                                        self.isCardMergeDisabled = "able";
                                        self.form.regNo = $custScope.custTemp.paperNo;
                                    } else if ($custScope.custTemp.paperType == '11') { //统一信用代码
                                        self.form.cardMerge = 'Y';
                                        self.isCardMergeDisabled = "disabled";
                                        self.form.liceNo = $custScope.custTemp.paperNo;
                                    } else {
                                        self.isCardMergeDisabled = "able";
                                    }
                                    $scope.custNameModal.hide();
                                });
                            }
                        });
                    } else {
                        self.form.custName = $custScope.custTemp.custName;
                        self.form.custNo = $custScope.custTemp.custNo;
                        self.selectPrefix = $custScope.custTemp.selectPrefix;

                        if ($custScope.custTemp.custType == '0') {
                            self.form.paperNo = $custScope.custTemp.paperNo;
                            //初始化个人信息
                            LoanDetailInfoService.getPersonalInfo({
                                custNo: self.form.custNo,
                                loanApplModFlag: self.selectPrefix == "reserve" ? 'reserveCust' : 'formalCust', //潜在客户1
                            }).then(function(rsp) {
                                LoanApplyUtilService.initPersonalForm(rsp, self.form);
                                $scope.custNameModal.hide();
                            });
                        } else {
                            //初始化企业信息
                            LoanDetailInfoService.getCompanyInfo({
                                custNo: self.form.custNo,
                                pCustType: self.form.custType,
                                pCustNo: self.form.custNo,
                                loanApplModFlag: self.selectPrefix == "reserve" ? 'reserveCust' : 'formalCust', //潜在客户1
                            }).then(function(rsp) {
                                //初始化企业信息
                                LoanApplyUtilService.initCompanyForm(rsp, self.form);
                                //清空【营业执照】【组织机构代码】
                                self.form.regNo = null;
                                self.form.liceNo = null;
                                if ($custScope.custTemp.paperType == '10') { //营业执照注册号
                                    self.form.cardMerge = 'N';
                                    self.isCardMergeDisabled = "able";
                                    self.form.regNo = $custScope.custTemp.paperNo;
                                } else if ($custScope.custTemp.paperType == '11') { //统一信用代码
                                    self.form.cardMerge = 'Y';
                                    self.isCardMergeDisabled = "disabled";
                                    self.form.liceNo = $custScope.custTemp.paperNo;
                                } else {
                                    self.isCardMergeDisabled = "able";
                                }
                                $scope.custNameModal.hide();
                            });
                        }
                    }
                });
            } else {
                jnHelper.alert("您还未选择【客户】!");
            }
        };

        $custScope.tabs = [{
            "text": "正式客户",
            "fragmentURL": "app/loanApply/chooseCustNameFrags/formalFragment.html"
        }, {
            "text": "潜在客户",
            "fragmentURL": "app/loanApply/chooseCustNameFrags/reserveFragment.html"
        }, {
            "text": "新增客户",
            "fragmentURL": "app/loanApply/chooseCustNameFrags/addCustFragment.html"
        }];
        
        if(jnUser.hasStation(566)&&!jnUser.hasStation(400) && !jnUser.hasStation(500)){
        	 $custScope.tabs = [{
                 "text": "正式客户",
                 "fragmentURL": "app/loanApply/chooseCustNameFrags/formalFragment.html"
             }, {
                 "text": "新增客户",
                 "fragmentURL": "app/loanApply/chooseCustNameFrags/addCustFragment.html"
             }];
        }

        $custScope.titleBtn = 0; //0:显示


        //监听页面滑动事件
        $scope.onSlideMove = function(data) {
            if (data.index === 2) {
                $custScope.titleBtn = 1; //隐藏【确定】按钮
            } else {
                $custScope.titleBtn = 0; //显示【确定】按钮
            }
        };


        //scope销毁时，将dom删除
        $scope.$on("$destroy", function() {
            $scope.crdtLoanModal.remove();
            $scope.custNameModal.remove();
        });

    }

})();
