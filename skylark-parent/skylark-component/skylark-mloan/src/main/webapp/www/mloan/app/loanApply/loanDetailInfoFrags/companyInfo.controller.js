(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('companyInfoCtrl', companyInfoCtrl);


    companyInfoCtrl.$inject = ['$scope', 'jnUser', 'jnHelper', 'LoanDetailInfoService', 'LoanApplyUtilService', 'jnForm', '$state', 'jnValidate'];


    function companyInfoCtrl($scope, jnUser, jnHelper, LoanDetailInfoService, LoanApplyUtilService, jnForm, $state, jnValidate) {
        var self = this;

        var parentVM = $scope.loanDetailInfoCtrl; //获取父scope的VM

        //表单是否只读
        self.isReadOnly = parentVM.acceptParamObj.isReadOnly;

        //【证件号码】是否是必填项，主贷人【个人】：非必填。
        self.isRegNoRequired = parentVM.acceptParamObj.custType == '0' ? false : true;

        self.isCardMergeDisabled = self.isReadOnly;
        //【姓名】【企业名称】是否可修改
        self.isCustNameDisabled = self.isReadOnly;
        //【身份证】【营业执照】是否可修改
        self.isIdCardDisabled = self.isReadOnly;
        //【统一信用代码】是否可修改
        self.isLiceNoDisabled = self.isReadOnly;

        self.form = {};

        // 控制折叠选项
        self.checked = {
            pDetail: false, //更多
        };

        self.goCorporation = goCorporation;
        self.goTogetherOpt = goTogetherOpt;
        self.goStocker = goStocker;
        self.toggleItem = toggleItem;
        self.cardMergeClick = cardMergeClick;

        // 搜索
        self.autoDomClick = autoDomClick;
        // 确定
        self.confirmClick = confirmClick;

        //客户名称是否改变
        var isCustNameChangeOrEmpty = false;

        var itemStart = 0;
        var limit = 10;

        //搜索框点击事件(加载更多)
        function autoDomClick(query, componentId, isFetchMore) {
            //判断是否是【加载更多】
            if (isFetchMore && isFetchMore == 'more') {
                itemStart = itemStart + limit;
            } else {
                itemStart = 0;
            }

            var initObj = {};
            if (componentId == 'companyInfoCtrl-cpyCustName') { //企业【企业名称】
                initObj = {
                    custType: '1',
                    editValCustName: query,
                    // custNo: parentVM.acceptParamObj.custNo,
                    start: itemStart,
                    limit: limit,
                }
            } else if (componentId == 'companyInfoCtrl-cpyRegNo') { //企业【营业执照】
                initObj = {
                    custType: '1',
                    editValPaperNo: query,
                    // custNo: parentVM.acceptParamObj.custNo,
                    start: itemStart,
                    limit: limit,
                }
            } else if (componentId == 'companyInfoCtrl-cpyLiceNo') { //企业【组织机构代码】
                initObj = {
                    custType: '1',
                    editValLiceNo: query,
                    // custNo: parentVM.acceptParamObj.custNo,
                    start: itemStart,
                    limit: limit,
                }
            }

            return LoanDetailInfoService.getRelationAndAllNew(initObj).then(function(rsp) {
                var dataList = rsp.root;
                var moreRecord = false;
                //判断是否需要分页
                if (rsp.total > itemStart + limit) {
                    moreRecord = true;
                }
                var searchList = [];
                var i;
                for (i = 0; i < dataList.length; i++) {
                    searchList.push({
                        custNo: dataList[i].custNo,
                        custName: dataList[i].custName,
                        custType: dataList[i].custType,
                        cardNo: dataList[i].paperNo,
                        phoneNo: dataList[i].mobPhone,
                        dataObj: dataList[i],
                        moreRecord: moreRecord, //用于分页
                    });
                }
                return searchList;
            });
        }

        //【姓名】【证件号码】确定按钮逻辑
        function confirmClick(callback) {
            if (!callback || !callback.selectedItem) {
                return;
            }

            var isCpyCustNameDom = false;
            var isCpyRegNoDom = false;
            var isCpyLiceNoDom = false;
            if (callback.componentId && callback.componentId == 'companyInfoCtrl-cpyCustName') {
                isCpyCustNameDom = true;
            }
            if (callback.componentId && callback.componentId == 'companyInfoCtrl-cpyRegNo') {
                isCpyRegNoDom = true;
            }
            if (callback.componentId && callback.componentId == 'companyInfoCtrl-cpyLiceNo') {
                isCpyLiceNoDom = true;
            }
            //判断是否是【新增】的字段
            var isAddItem = angular.isString(callback.selectedItem);
            var selectedItem = callback.selectedItem;
            var dataObj = {};

            //初始化【选择对象】
            if (isAddItem) {
                if (isCpyCustNameDom) {
                    dataObj = {
                        custName: selectedItem,
                        custType: '0',
                        cpyCustFlag: 'add', //标记为新增客户
                    }
                }

                if (isCpyRegNoDom) {
                    dataObj = {
                        regNo: selectedItem,
                        custType: '0',
                        regFlag: 'add' //标记为新增【营业执照】
                    }
                }

                if (isCpyLiceNoDom) {
                    dataObj = {
                        liceNo: selectedItem,
                        custType: '0',
                        liceNoFlag: 'add' //标记为新增【组织机构代码】
                    }
                }
            } else {
                dataObj = selectedItem.dataObj;
            }

            //[企业名称]
            if (isCpyCustNameDom) {
                if (dataObj.cpyCustFlag && dataObj.cpyCustFlag == 'add') {
                    //如果是新增【姓名】，并且当前表单没有【客户号】，则只初始化名称。
                    if (!self.form.custNo) {
                        self.form.custName = dataObj.custName;
                        return;
                    }
                }
            }

            //[营业执照]
            if (isCpyRegNoDom) {
                if (dataObj.regFlag && dataObj.regFlag == 'add') {
                    //校验新增的【营业执照】
                    if (!jnValidate.regNo(dataObj.regNo)) {
                        jnHelper.alert("输入的营业执照不合法！");
                        return;
                    }
                    //如果是新增【营业执照】，并且当前表单没有【客户号】，则只初始化【营业执照】。
                    if (!self.form.custNo || self.isCustNameDisabled) {
                        self.form.regNo = dataObj.regNo;
                        return;
                    }
                } else {
                    //检查【选择】的客户和【已录入的姓名】是否冲突
                    if (self.isCustNameDisabled) {
                        if (dataObj.custName != self.form.custName) {
                            jnHelper.alert("当前选择用户名称与已录入名称不符，请检查");
                            return;
                        }
                    }
                }
            }

            //[统一信用代码]
            if (isCpyLiceNoDom) {
                if (dataObj.liceNoFlag && dataObj.liceNoFlag == 'add') {
                    //校验新增的【统一信用代码】
                    if (!jnValidate.liceNo(dataObj.liceNo)) {
                        jnHelper.alert("输入的统一信用代码不合法！");
                        return;
                    }
                    //如果是新增【统一信用代码】，并且当前表单没有【客户号】，则只初始化【统一信用代码】。
                    if (!self.form.custNo || self.isCustNameDisabled) {
                        self.form.liceNo = dataObj.liceNo;
                        return;
                    }
                } else {
                    //检查【选择】的客户和【已录入的姓名】是否冲突
                    if (self.isCustNameDisabled) {
                        if (dataObj.custName != self.form.custName) {
                            jnHelper.alert("当前选择用户名称与已录入名称不符，请检查");
                            return;
                        }
                    }
                }
            }
            //覆盖原有表单数据
            LoanApplyUtilService.initCompanyForm(dataObj, self.form);
            self.isCardMergeDisabled = LoanApplyUtilService.isCardMergeDisabled(self.isReadOnly, self.form.cardMerge);
        }

        //[三证合一]点击事件
        function cardMergeClick(cardMerge) {
            if (cardMerge == 'N') {
                if (self.form.liceNo && self.form.liceNo.length == 18) {
                    self.form.liceNo = null;
                }
            } else {
                if (!self.isIdCardDisabled) {
                    if (self.form.liceNo && self.form.liceNo.length != 18) {
                        self.form.liceNo = null;
                    };
                }
            }
        }

        //折叠列表的显示和隐藏
        function toggleItem(item) {
            self.checked[item] = !self.checked[item];
        }

        //跳转到[股东]界面
        function goStocker() {
            if (isNoCompanyNo("股东")) {
                return;
            }
            $state.go("togetherOperator", {
                pageFlag: "29",
                loanNo: parentVM.acceptParamObj.loanNo, //贷款合同号
                pCustNo: self.form.custNo, //主客户号（此时公司是主客户号）
                equityHis: self.form.equityHis, //股权变更历史
                isReadOnly: self.isReadOnly
            });
        }

        //跳转到[共同经营者]界面
        function goTogetherOpt() {
            if (isNoCompanyNo("共同经营者")) {
                return;
            }
            $state.go("togetherOperator", {
                pageFlag: "14",
                loanNo: parentVM.acceptParamObj.loanNo, //贷款合同号
                pCustNo: self.form.custNo, //主客户号（此时公司是主客户号）
                isReadOnly: self.isReadOnly
            });
        }

        //跳转到[法人代表]界面
        function goCorporation() {
            if (isNoCompanyNo("法人代表")) {
                return;
            }
            $state.go("personalRelated", {
                pageFlag: '11', //法人代表:11
                loanNo: parentVM.acceptParamObj.loanNo, //贷款合同号
                custNo: self.form.corpCustNo, //【法人代表】客户号
                pCustNo: self.form.custNo, //主客户号（此时公司是主客户号）
                isReadOnly: self.isReadOnly
            });
        }

        //判断是否没有公司客户号
        function isNoCompanyNo(msg) {
            var warning = "";
            if (isCustNameChangeOrEmpty) {
                if (self.isReadOnly) {
                    warning = "【企业资料】未录入<br>无法查看【" + msg + "】信息";
                } else {
                    warning = "请先填写并保存【企业资料】信息！";
                }
                jnHelper.alert(warning);
                return true;
            }
            return false;
        }

        //初始化【三证合一】是否可编辑
        function initFormItemDisabled() {
            if (self.isReadOnly) {
                return;
            }

            if (!self.form.custNo){
                self.isCustNameDisabled = false;
                self.isIdCardDisabled = false;
                self.isLiceNoDisabled = false;
                self.isCardMergeDisabled = false;
                return;
            }

            self.isCardMergeDisabled = LoanApplyUtilService.isCardMergeDisabled(self.isReadOnly, self.form.cardMerge);

            //主贷人是【企业】
            if (parentVM.acceptParamObj.custType == '1') {
                self.isCustNameDisabled = true;
                self.isIdCardDisabled = true;
                if (self.isCardMergeDisabled) {
                    self.isLiceNoDisabled = true;
                }
            } else {
                if (self.form.custName) {
                    self.isCustNameDisabled = true;
                }
                if (self.isCardMergeDisabled) {
                    self.isLiceNoDisabled = true;
                } else {
                    if (self.form.regNo) {
                        self.isIdCardDisabled = true;
                    }
                }
            }
        }

        //初始化信息
        function initForm(isViewBack) {
            LoanDetailInfoService.getCompanyInfo({
                loanNo: parentVM.acceptParamObj.loanNo,
                custNo: parentVM.acceptParamObj.custNo,
                pCustType: parentVM.acceptParamObj.custType,
                pCustNo: parentVM.acceptParamObj.custNo
            }, true).then(function(rsp) {
                //初始化企业信息
                if(isViewBack){
                    //【法人代表】客户号
                    self.form.corpCustNo = rsp.corpCustNo;
                    //【共同经营者】数量
                    self.form.ctrlerNum = rsp.ctrlerNum;
                    //【股东】数量
                    self.form.stockerNum = rsp.stockerNum;
                }else{
                    LoanApplyUtilService.initCompanyForm(rsp, self.form);
                }
                self.form.equityHis = rsp.equityHis; //【股权变更历史】
                initFormItemDisabled();
            }, function(err) {
                if (err.message == '根据条件没有找到数据') {
                    isCustNameChangeOrEmpty = true;
                    if(self.form.custNo){
                        self.form = {};
                        initFormItemDisabled();
                    }
                    if (!self.isReadOnly) {
                        self.form.cardMerge = 'N';
                    }
                } else {
                    jnHelper.alert(err.message);
                }
            });
        }

        //保存
        function saveForm() {
            jnForm.validate(self.companyInfoForm).then(function() {
                var param = jnHelper.merge(self.form, {
                    moduleId: '2',
                    custType: '0',
                    custNo: self.form.custNo, //当前企业的客户号
                    loanNo: parentVM.acceptParamObj.loanNo,
                    pCustNo: parentVM.acceptParamObj.custNo //主贷人的客户号
                });
                LoanDetailInfoService.saveCompanyInfo(param).then(function(rsp) {
                    if (rsp.success) {
                        isCustNameChangeOrEmpty = false;
                        jnHelper.alert("企业资料保存成功！");
                        //【主贷人】是【个人】，则刷新【关联信息】列表
                        if(parentVM.acceptParamObj.custType == '0'){
                            LoanApplyUtilService.getFormMap("relatedPsnInfo").initFunc();
                        }
                        initFormItemDisabled();
                    }
                });
            });
        }

        //设置当前表单信息，以便于父页面调用
        LoanApplyUtilService.setFormMap({
            formName: "companyInfo",
            saveFunc: saveForm,
            initFunc: initForm,
            form: self.form
        });

        initForm();

        //监听状态切换
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //如果是从【法人代表】【股东】等返回，则刷新列表
            if (fromState.name === 'togetherOperator' || fromState.name === 'personalRelated') {
                var isViewBack = true;
                initForm(isViewBack);
            }
        });
    }
})();
