(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('addRelatedPsnCtrl', addRelatedPsnCtrl);

    addRelatedPsnCtrl.$inject = ['$scope', '$stateParams', 'LoanApplyUtilService', 'LoanDetailInfoService', 'jnHelper', 'jnForm', 'jnPage', 'jnConstant', '$ionicModal', '$state', 'jnValidate'];

    function addRelatedPsnCtrl($scope, $stateParams, LoanApplyUtilService, LoanDetailInfoService, jnHelper, jnForm, jnPage, jnConstant, $ionicModal, $state, jnValidate) {
        var self = this;

        self.psnVM = {};
        self.cpyVM = {};
        var $psnScope = self.psnVM; //personalInfoModal的VM
        var $cpyScope = self.cpyVM; //companyInfoModal的VM

        $psnScope.form = {};
        $cpyScope.form = {};

        /**自定义字段:页面来源()
         * 00:【关联人】新增  01:【关联人】修改
         * 02:【共同经营者】新增  03:【共同经营者】修改
         * 04:【股东】新增  05:【股东】修改
         **/
        var pageFlag = $stateParams.pageFlag;

        //是否初始化数据
        var isInitData = true;

        //临时存储LinkType
        var tempLinkType = "";

        var initParamObj = {};
        var saveParamObj = {};

        switch (pageFlag) {
            //【关联人】新增
            case "00":
                isInitData = false;
                $psnScope.form.paperType = '0';
                $cpyScope.form.cardMerge = 'N';
                self.title = "关联";
                self.isSharePcthide = "hidden";
                saveParamObj = {
                    moduleId: '6',
                    pCustNo: $stateParams.pCustNo,
                    loanNo: $stateParams.loanNo
                };
                break;

                //【关联人】修改
            case "01":
                self.title = "关联";
                self.isCustTypeDisabled = 'disabled';
                self.isSharePcthide = "hidden";
                initParamObj = {
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.custNo,
                    pCustNo: $stateParams.pCustNo
                };
                saveParamObj = {
                    moduleId: '6',
                    pCustNo: $stateParams.pCustNo,
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.custNo
                };
                break;

                //【共同经营者】新增
            case "02":
                self.title = "共同经营者";
                tempLinkType = "14";
                $psnScope.form.paperType = '0';
                $cpyScope.form.cardMerge = 'N';
                isInitData = false;
                self.isLinkTypeDisabled = 'disabled';
                self.isTogetherOpt = true; //标识【共同经营者】
                saveParamObj = {
                    moduleId: '6',
                    pCustNo: $stateParams.pCustNo,
                    loanNo: $stateParams.loanNo
                };
                break;

                //【共同经营者】修改
            case "03":
                self.title = "共同经营者";
                tempLinkType = "14";
                self.isLinkTypeDisabled = 'disabled';
                self.isCustTypeDisabled = 'disabled';
                self.isTogetherOpt = true; //标识【共同经营者】
                initParamObj = {
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.custNo,
                    pCustNo: $stateParams.pCustNo
                };
                saveParamObj = {
                    moduleId: '6',
                    pCustNo: $stateParams.pCustNo,
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.custNo
                };
                break;

                //【股东】新增
            case "04":
                self.title = "股东";
                tempLinkType = "29";
                isInitData = false;
                $psnScope.form.paperType = '0';
                $cpyScope.form.cardMerge = 'N';
                self.isLinkTypeDisabled = 'disabled';
                self.isShareholder = true; //标识【股东】
                saveParamObj = {
                    moduleId: '6',
                    pCustNo: $stateParams.pCustNo,
                    loanNo: $stateParams.loanNo
                };
                break;

                //【股东】修改
            case "05":
                self.title = "股东";
                tempLinkType = "29";
                self.isLinkTypeDisabled = 'disabled';
                self.isCustTypeDisabled = 'disabled';
                self.isShareholder = true; //标识【股东】
                initParamObj = {
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.custNo,
                    pCustNo: $stateParams.pCustNo
                };
                saveParamObj = {
                    moduleId: '6',
                    pCustNo: $stateParams.pCustNo,
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.custNo
                };
                break;
        }

        //表单是否只读
        self.isReadOnly = $stateParams.isReadOnly == 'true' ? true : false;

        //【性别】【出生日期】是否可修改
        self.isSexDisabled = self.isReadOnly;
        //【姓名】【企业名称】是否可修改
        self.isCustNameDisabled = self.isReadOnly;
        //【身份证】【营业执照】是否可修改
        self.isIdCardDisabled = self.isReadOnly;
        //【统一信用代码】是否可修改
        self.isLiceNoDisabled = self.isReadOnly;

        //初始化form表单
        self.form = {
            custType: $stateParams.custType || '0', //默认为【个人】
            linkType: $stateParams.linkType,
            shareAmt: $stateParams.shareAmt ? Number($stateParams.shareAmt) : null,
            sharePct: $stateParams.sharePct ? Number($stateParams.sharePct) : null,
            relationRemark: $stateParams.relationRemark,
            conditionInfo: self.isTogetherOpt ? $stateParams.conditionInfo : null,
            equityHis: self.isShareholder ? $stateParams.equityHis : null
        };

        // 控制折叠选项
        self.checked = {
            pBase: false, //基本信息
            pDetail: false, //详细信息
        };

        //初始化动作
        initLinkTypeOptions();

        self.changeCustType = changeCustType;
        self.openRelatedForm = openRelatedForm;
        self.saveForm = saveForm;
        self.idNoBlur = idNoBlur;
        self.toggleItem = toggleItem;
        self.cardMergeClick = cardMergeClick;

        //个人【姓名】搜索
        self.autoDomClick = autoDomClick;
        //【姓名】【证件号码】确定
        self.confirmClick = confirmClick;

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

            if (componentId == 'addRelatedPsnCtrl-perCustName') { //个人【姓名】
                initObj = {
                    custType: '0',
                    editValCustName: query,
                    custNo: $stateParams.pCustNo,
                    start: itemStart,
                    limit: limit,
                };
            } else if (componentId == 'addRelatedPsnCtrl-perIdNo') { //个人【证件号码】
                initObj = {
                    custType: '0',
                    editValPaperNo: query,
                    custNo: $stateParams.pCustNo,
                    start: itemStart,
                    limit: limit,
                };
            } else if (componentId == 'addRelatedPsnCtrl-cpyCustName') { //企业【企业名称】
                initObj = {
                    custType: '1',
                    editValCustName: query,
                    custNo: $stateParams.pCustNo,
                    start: itemStart,
                    limit: limit,
                }
            } else if (componentId == 'addRelatedPsnCtrl-cpyRegNo') { //企业【营业执照】
                initObj = {
                    custType: '1',
                    editValPaperNo: query,
                    custNo: $stateParams.pCustNo,
                    start: itemStart,
                    limit: limit,
                }
            } else if (componentId == 'addRelatedPsnCtrl-cpyLiceNo') { //企业【组织机构代码】
                initObj = {
                    custType: '1',
                    editValLiceNo: query,
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
            var isCpyCustNameDom = false;
            var isCpyRegNoDom = false;
            var isCpyLiceNoDom = false;
            if (callback.componentId && callback.componentId == 'addRelatedPsnCtrl-perCustName') {
                isCustNameDom = true;
            }
            if (callback.componentId && callback.componentId == 'addRelatedPsnCtrl-perIdNo') {
                isIdCardDom = true;
            }
            if (callback.componentId && callback.componentId == 'addRelatedPsnCtrl-cpyCustName') {
                isCpyCustNameDom = true;
            }
            if (callback.componentId && callback.componentId == 'addRelatedPsnCtrl-cpyRegNo') {
                isCpyRegNoDom = true;
            }
            if (callback.componentId && callback.componentId == 'addRelatedPsnCtrl-cpyLiceNo') {
                isCpyLiceNoDom = true;
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

            //【姓名】
            if (isCustNameDom) {
                //判断是否是新增用户
                if (dataObj.custFlag && dataObj.custFlag == 'add') {
                    //如果是新增【姓名】，并且【表单】没有【客户号
                    if (!$psnScope.form.custNo) {
                        $psnScope.form.custName = dataObj.custName;
                        self.form.custName = dataObj.custName;
                        return;
                    }
                }
            }

            //【证件号码】
            if (isIdCardDom) {
                if (dataObj.cardFlag && dataObj.cardFlag == 'add') {
                    //校验输入的【身份证号】
                    if (!jnValidate.idNo(dataObj.paperNo)) {
                        jnHelper.alert("输入的身份证号码不合法！");
                        return;
                    }
                    idNoBlur(dataObj.paperNo);
                    //只【初始化】身份证
                    if (!$psnScope.form.custNo || self.isCustNameDisabled) {
                        $psnScope.form.paperNo = dataObj.paperNo;
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
                    if (dataObj.paperNo) {
                        idNoBlur(dataObj.paperNo);
                    }
                }
            }

            //[企业名称]
            if (isCpyCustNameDom) {
                if (dataObj.cpyCustFlag && dataObj.cpyCustFlag == 'add') {
                    //如果是新增【姓名】，并且【证件号码】也是新增的，则不需要带出数据。
                    if (!$cpyScope.form.custNo) {
                        $cpyScope.form.custName = dataObj.custName;
                        self.form.custName = dataObj.custName;
                        return;
                    }
                }
            }

            //[营业执照]
            if (isCpyRegNoDom) {
                if (dataObj.regFlag && dataObj.regFlag == 'add') {
                    //校验输入的【营业执照】
                    if (!jnValidate.regNo(dataObj.regNo)) {
                        jnHelper.alert("输入的营业执照不合法！");
                        return;
                    }
                    if (!$cpyScope.form.custNo || self.isCustNameDisabled) {
                        $cpyScope.form.regNo = dataObj.regNo;
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
                    //统一信用代码
                    if (!jnValidate.liceNo(dataObj.liceNo)) {
                        jnHelper.alert("输入的统一信用代码不合法！");
                        return;
                    }
                    if (!$cpyScope.form.custNo || self.isCustNameDisabled) {
                        $cpyScope.form.liceNo = dataObj.liceNo;
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

            //自动带出【客户副本信息】将原来表单覆盖
            if (self.form.custType == '0') {
                //个人
                LoanApplyUtilService.initPersonalForm(dataObj, $psnScope.form);
            } else {
                LoanApplyUtilService.initCompanyForm(dataObj, $cpyScope.form);
                // self.form.linkType = $;
                self.isCardMergeDisabled = LoanApplyUtilService.isCardMergeDisabled(self.isReadOnly, $cpyScope.form.cardMerge);
            }

            //初始化【名称】
            self.form.custName = dataObj.custName;
            //初始化【关联关系】
            if (self.form.linkType) {
                self.form.linkType = tempLinkType + "," + dataObj.linkType;
            }else{
                self.form.linkType = dataObj.linkType;
            }
        }

        //[三证合一]点击事件
        function cardMergeClick(cardMerge) {
            if (cardMerge == 'N') {
                if ($cpyScope.form.liceNo && $cpyScope.form.liceNo.length == 18) {
                    $cpyScope.form.liceNo = null;
                }
            } else {
                if (!self.isIdCardDisabled) {
                    if ($cpyScope.form.liceNo && $cpyScope.form.liceNo.length != 18) {
                        $cpyScope.form.liceNo = null;
                    };
                }
            }
        }

        //折叠列表的显示和隐藏
        function toggleItem(item) {
            self.checked[item] = !self.checked[item];
        };

        //新增【关联人】【共同经营者】【股东】
        function saveForm() {
            var form = {};
            jnForm.validate(self.addRelatedPsnForm).then(function(rsp) {
                if (self.form.custType == '0') {
                    //将个人信息赋值给表单
                    LoanApplyUtilService.initPersonalForm($psnScope.form, self.form);
                    form = $psnScope.personalInfoForm;
                } else {
                    //将企业信息赋值给表单
                    LoanApplyUtilService.initCompanyForm($cpyScope.form, self.form);
                    form = $cpyScope.companyInfoForm;
                }

                jnForm.validate(form).then(function(rsp) {
                    LoanDetailInfoService.addTogetherOpt(jnHelper.merge(self.form, saveParamObj)).then(function(rsp) {
                        if (rsp.success) {
                            jnHelper.alert(self.title + "信息保存成功！");
                            if (self.isShareholder) {
                                $stateParams.equityHis = self.form.equityHis;
                            }
                            jnPage.modified = false;
                            jnPage.back();
                        }
                    });
                });
            });
        }

        //初始化linkTypeOptions
        function initLinkTypeOptions() {
            //只有【关联人】才可以修改
            if (pageFlag == '00' || pageFlag == '01') {
                if ($stateParams.pCustType == '0') {
                    if (self.form.custType == '0') {
                        self.linkTypeOptions = jnConstant.get(5017); //个人客户间关联关系
                    } else {
                        self.linkTypeOptions = jnConstant.get(5018); //个人与企业间关联关系
                    }
                } else {
                    if (self.form.custType == '0') {
                        self.linkTypeOptions = jnConstant.get(5018); //个人与企业间关联关系
                    } else {
                        self.linkTypeOptions = jnConstant.get(5019); //个人与企业间关联关系
                    }
                }
            } else {
                self.linkTypeOptions = jnConstant.get(5033);
            }

            if (self.form.custType == '0') {
                self.custTypeText = "人";
            } else {
                self.custTypeText = "企业";
            }
        }

        //【客户类型改变】
        function changeCustType() {
            initLinkTypeOptions();
            //清除已编辑的客户信息
            self.form = {
                custType: self.form.custType,
                linkType: self.isLinkTypeDisabled == 'disabled' ? self.form.linkType : null,
                shareAmt: self.form.shareAmt,
                sharePct: self.form.sharePct,
                relationRemark: self.form.relationRemark
            };
            //初始化【个人信息】表单
            $psnScope.form = {
                paperType: '0'
            };
            //初始化【企业信息】表单
            $cpyScope.form = {
                cardMerge: 'N'
            };
        }

        //打开关联信息Form表单
        function openRelatedForm() {
            self.checked.pBase = true;
        }

        //根据【身份证号码】实时计算【性别】【生日】
        function idNoBlur(idNo) {
            if (idNo) {
                $psnScope.form.sex = jnHelper.sexFromId(idNo);
                $psnScope.form.birthday = jnHelper.birthFromId(idNo);
                self.isSexDisabled = true;
            } else {
                self.isSexDisabled = false;
            }
        }

        //初始化数据
        if (isInitData) {
            if ($stateParams.custType == '0') {
                //初始化个人信息
                LoanDetailInfoService.getPersonalInfo(initParamObj).then(function(rsp) {
                    self.form.custName = rsp.custName;
                    LoanApplyUtilService.initPersonalForm(rsp, $psnScope.form);
                    //初始化【姓名】是否可编辑
                    if ($psnScope.form.custName) {
                        self.isCustNameDisabled = true;
                    }
                    //初始化【身份证】是否可编辑
                    if ($psnScope.form.paperNo) {
                        self.isIdCardDisabled = true;
                        self.isSexDisabled = true;
                    }
                });
            } else {
                //初始化企业信息
                LoanDetailInfoService.getCompanyInfo(initParamObj).then(function(rsp) {
                    self.form.custName = rsp.custName;
                    LoanApplyUtilService.initCompanyForm(rsp, $cpyScope.form);
                    //初始化【三证合一】是否可编辑
                    self.isCardMergeDisabled = LoanApplyUtilService.isCardMergeDisabled(self.isReadOnly, $cpyScope.form.cardMerge);
                    //初始化【姓名】是否可编辑
                    if ($cpyScope.form.custName) {
                        self.isCustNameDisabled = true;
                    }
                    //初始化【营业执照】【统一信用代码】是否可编辑
                    if ($cpyScope.form.cardMerge == 'N' && $cpyScope.form.regNo) {
                        self.isIdCardDisabled = true;
                        self.isLiceNoDisabled = false;
                    } else if ($cpyScope.form.cardMerge == 'Y' && $cpyScope.form.liceNo) {
                        self.isIdCardDisabled = true;
                        self.isLiceNoDisabled = true;
                    }
                });
            }
        }

        //跳转到法人代表界面
        $cpyScope.goCorporation = function() {
            if (!$cpyScope.form.custNo) {
                jnHelper.alert("请先填写并保存企业资料信息！");
                return;
            }

            // 解决【法人代表】跳转问题，bug11307.
            if ($cpyScope.companyInfoForm.$pristine && self.addRelatedPsnForm.$pristine) {
                jnPage.modified = false;
                $state.go("personalRelated", {
                    pageFlag: '11', //法人代表:11
                    loanNo: $stateParams.loanNo, //贷款合同号
                    custNo: $cpyScope.form.corpCustNo, //【法人代表】客户号
                    pCustNo: $cpyScope.form.custNo, //主客户号（此时公司是主客户号）
                    isReadOnly: self.isReadOnly
                });
            } else {
                jnHelper.confirm('尚未保存，是否继续？').then(function(confirmed) {
                    if (!confirmed) {
                        return;
                    } else {
                        jnPage.modified = false;
                        $state.go("personalRelated", {
                            pageFlag: '11', //法人代表:11
                            loanNo: $stateParams.loanNo, //贷款合同号
                            custNo: $cpyScope.form.corpCustNo, //【法人代表】客户号
                            pCustNo: $cpyScope.form.custNo, //主客户号（此时公司是主客户号）
                            isReadOnly: self.isReadOnly
                        });
                    }
                });
            }
        };
    }
})();
