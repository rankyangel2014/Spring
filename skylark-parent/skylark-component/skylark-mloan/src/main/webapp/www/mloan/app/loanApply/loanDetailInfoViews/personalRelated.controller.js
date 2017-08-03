(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('personalRelatedCtrl', personalRelatedCtrl);

    personalRelatedCtrl.$inject = ['$scope', '$stateParams', 'LoanApplyUtilService', 'LoanDetailInfoService', 'jnHelper', 'jnForm', 'jnPage', 'jnValidate'];

    function personalRelatedCtrl($scope, $stateParams, LoanApplyUtilService, LoanDetailInfoService, jnHelper, jnForm, jnPage, jnValidate) {
        var self = this;

        //自定义字段:页面来源(10:配偶 11:法人代表)
        var pageFlag = $stateParams.pageFlag;

        //是否初始化数据
        var isInitData = true;

        var initParamObj = {};
        var saveParamObj = {};

        self.form = {};

        // 控制折叠选项
        self.checked = {
            pDetail: false, //更多
        };

        //是否可编辑
        self.isReadOnly = $stateParams.isReadOnly == 'true' ? true : false;

        //【性别】【出生日期】是否可修改
        self.isSexDisabled = self.isReadOnly;

        //【姓名】【企业名称】是否可修改
        self.isCustNameDisabled = self.isReadOnly;
        //【身份证】【营业执照】是否可修改
        self.isIdCardDisabled = self.isReadOnly;

        self.saveForm = saveForm;
        self.idNoBlur = idNoBlur;
        self.toggleItem = toggleItem;

        //【姓名】证件号码】搜索
        self.autoDomClick = autoDomClick;
        //【姓名】【证件号码】确定
        self.confirmClick = confirmClick;

        //根据页面来源判断【标题显示内容】
        switch (pageFlag) {
            case "10":
                self.relatedName = "配偶";
                //[配偶]客户号为空时不初始化
                if (!$stateParams.custNo) {
                    isInitData = false;
                    self.form.paperType = '0'; //没有数据时，默认【证件类型】：身份证
                }
                initParamObj = {
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.custNo, //配偶的客户号
                    pCustNo: $stateParams.pCustNo //主贷人的客户号
                };
                saveParamObj = {
                    custType: '0', //个人客户
                    moduleId: '6', //关联人
                    linkType: '4', //关联关系（4:配偶）
                    pCustNo: $stateParams.pCustNo, //主客户号
                    loanNo: $stateParams.loanNo, //借据号
                };
                break;

            case "11":
                self.relatedName = "法人代表";
                //[法人代表]客户号为空时不初始化
                if (!$stateParams.custNo) {
                    isInitData = false;
                    self.form.paperType = '0'; //没有数据时，默认【证件类型】：身份证
                }
                initParamObj = {
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.custNo, //法人代表的客户号
                    pCustNo: $stateParams.pCustNo //主贷人的客户号
                };
                saveParamObj = {
                    custType: '0', //个人客户
                    moduleId: '6', //关联人
                    linkType: '23', //关联关系（23:法人代表）
                    pCustNo: $stateParams.pCustNo, //主客户号
                    loanNo: $stateParams.loanNo, //借据号
                };
                break;
        }

        //初始化信息
        if (isInitData) {
            LoanDetailInfoService.getPersonalInfo(initParamObj).then(function(rsp) {
                //初始化个人信息
                LoanApplyUtilService.initPersonalForm(rsp, self.form);
                if (self.form.paperNo) {
                    self.isSexDisabled = true;
                }
            });
        }

        var itemStart;
        var limit = 10;
        var custFlag = '';
        var cardFlag = '';

        //【姓名】搜索框点击事件(加载更多)
        function autoDomClick(query, componentId, isFetchMore) {
            //判断是否是【加载更多】
            if (isFetchMore && isFetchMore == 'more') {
                itemStart = itemStart + limit;
            } else {
                itemStart = 0;
            }

            var initObj = {};
            if (componentId == 'personalRelated-custName') { //【姓名】
                initObj = {
                    custType: '0', //[配偶][法人代表]默认为’0‘
                    editValCustName: query,
                    custNo: $stateParams.pCustNo,
                    start: itemStart,
                    limit: limit,
                }
            } else if (componentId == 'personalRelated-paperNo') { //【证件号码】
                initObj = {
                    custType: '0', //[配偶][法人代表]默认为’0‘
                    editValPaperNo: query,
                    custNo: $stateParams.pCustNo,
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

            var isCustNameDom = false;
            var isIdCardDom = false;
            if (callback.componentId && callback.componentId == 'personalRelated-custName') {
                isCustNameDom = true;
            }
            if (callback.componentId && callback.componentId == 'personalRelated-paperNo') {
                isIdCardDom = true;
            }
            //判断是否是【新增】的字段
            var isAddItem = angular.isString(callback.selectedItem);
            var selectedItem = callback.selectedItem;
            var dataObj = {};

            //初始化【选择对象】
            if (isAddItem) {
                if (isCustNameDom) {
                    dataObj = {
                        custName: selectedItem,
                        custType: '0',
                        custFlag: 'add', //标记为新增客户
                    }
                }

                if (isIdCardDom) {
                    dataObj = {
                        paperNo: selectedItem,
                        custType: '0',
                        cardFlag: 'add' //标记为新增【证件号码】
                    }
                }
            } else {
                dataObj = selectedItem.dataObj;
            }

            //校验输入的【身份证号】
            if (dataObj.paperNo) {
                if (!jnValidate.idNo(dataObj.paperNo)) {
                    jnHelper.alert("输入的身份证号码不合法！");
                    return;
                }
                if (!idNoBlur(dataObj.paperNo)) {
                    return;
                }
            }

            //【姓名】
            if (isCustNameDom) {
                //判断是否是新增用户
                if (dataObj.custFlag && dataObj.custFlag == 'add') {
                    custFlag = 'add';
                    //如果是新增【姓名】，并且【证件号码】也是新增的，则不需要带出数据。
                    if (cardFlag == 'add') {
                        self.form.custName = dataObj.custName;
                        return;
                    }
                } else {
                    custFlag = 'exist';
                }
            }

            //【证件号码】
            if (isIdCardDom) {
                if (dataObj.cardFlag && dataObj.cardFlag == 'add') {
                    cardFlag = 'add';
                    //如果是新增【姓名】或者选择的客户没有【证件号码】
                    //并且【证件号码】也是新增的，则不需要带出数据。
                    if (custFlag == 'add' || !self.form.paperNo) {
                        self.form.paperNo = dataObj.paperNo;
                        return;
                    }
                } else {
                    cardFlag = 'exist';
                }
            }

            //自动带出【客户副本信息】将原来表单覆盖
            LoanApplyUtilService.initPersonalForm(dataObj, self.form);
        }


        //折叠列表的显示和隐藏
        function toggleItem(item) {
            self.checked[item] = !self.checked[item];
        }

        //根据【身份证号码】实时计算【性别】【生日】
        function idNoBlur(idNo) {
            if (idNo) {
                var sex = jnHelper.sexFromId(idNo);
                if (sex == $stateParams.pSex) {
                    jnHelper.alert("配偶性别与主贷款客户性别冲突！");
                    // self.form.paperNo = null;
                    // self.form.sex = null;
                    // self.form.birthday = null;
                    self.isSexDisabled = false;
                    return false;
                } else {
                    self.form.sex = sex;
                    self.form.birthday = jnHelper.birthFromId(self.form.paperNo);
                    self.isSexDisabled = true;
                }
            } else {
                // self.form.paperNo = null;
                // self.form.sex = null;
                // self.form.birthday = null;
                self.isSexDisabled = false;
            }

            return true;
        }

        //保存
        function saveForm() {
            jnForm.validate(self.personalRelatedInfoForm).then(function() {
                var param = jnHelper.merge(self.form, saveParamObj);
                LoanDetailInfoService.savePersonalInfo(param).then(function(rsp) {
                    if (rsp.success) {
                        jnHelper.alert(self.relatedName + "信息保存成功！");
                        jnPage.modified = false;
                        if (self.form.paperNo) {
                            self.isSexDisabled = true;
                        }
                    }
                });
            });
        }
    }

})();
