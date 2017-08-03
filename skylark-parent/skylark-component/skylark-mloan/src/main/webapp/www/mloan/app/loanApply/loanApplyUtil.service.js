/**
 * 提供[贷款申请]通用工具类
 */

(function() {
    'use strict';

    angular
        .module('loanApply')
        .factory('LoanApplyUtilService', LoanApplyUtilService);

    LoanApplyUtilService.$inject = ['jnUser', 'jnHelper'];

    function LoanApplyUtilService(jnUser, jnHelper) {

        //formMap结构示例
        var formMap = {
            companyInfo: {
                formName: "companyInfo",
                saveFunc: function() { //保存方法
                    return;
                },
                editFunc: function() { //编辑方法
                    return;
                },
                getIsReadOnly: function() { //获取当前表单是否可编辑
                    return;
                }
            }
        };

        return {
            initParam: initParam,
            getFormMap: getFormMap,
            setFormMap: setFormMap,
            getEditAuth: getEditAuth,
            removeItemFromArray: removeItemFromArray,
            initPersonalForm: initPersonalForm,
            initCompanyForm: initCompanyForm,
            getCardMerge: getCardMerge,
            isCardMergeDisabled: isCardMergeDisabled,
        };

        /**
         * 判断【三证合一】是否可编辑
         **/
        function isCardMergeDisabled(isPageReadOnly, cardMerge) {
            if (isPageReadOnly) {
                return true;
            } else {
                if (cardMerge == 'Y') {
                    return true;
                } else {
                    return false;
                }
            }
        }

        /**
         * 根据liceNo长度判断是否是【三证合一】？
         **/
        function getCardMerge(liceNo) {
            if (liceNo && liceNo.length == 18) {
                return "Y";
            } else {
                return "N";
            }
        }

        /**
         * 初始化【企业】Form表单
         */
        function initCompanyForm(sourceForm, targetForm) {
            targetForm.custName = sourceForm.custName;
            targetForm.custNo = sourceForm.custNo;
            targetForm.cardMerge = getCardMerge(sourceForm.liceNo); //三证合一
            targetForm.regNo = sourceForm.regNo; //营业执照
            targetForm.liceNo = sourceForm.liceNo; //组织机构代码（统一信用代码）
            targetForm.mobPhone = sourceForm.mobPhone;
            targetForm.fixPhone = sourceForm.fixPhone;
            targetForm.email = sourceForm.email;
            targetForm.contacter = sourceForm.contacter;
            targetForm.contactAddr = sourceForm.contactAddr;
            targetForm.orgForm = sourceForm.orgForm ? sourceForm.orgForm : '1'; //组织形式（默认为：个体经营）
            targetForm.orgType = sourceForm.orgType;
            targetForm.loanCard = sourceForm.loanCard;
            targetForm.mainBusiness = sourceForm.mainBusiness;
            //【所属行业】名称
            targetForm.inTradeName = sourceForm.inTradeName;
            //【所属行业】代码
            targetForm.inTrade = sourceForm.inTrade;
            targetForm.businessStartDt = sourceForm.businessStartDt;
            targetForm.businessHours = sourceForm.businessHours;
            targetForm.employeeNum = sourceForm.employeeNum;
            targetForm.addressType = sourceForm.addressType ? sourceForm.addressType : '1'; //经营场所(默认为：自有)
            targetForm.addressTypeotherDesc = sourceForm.addressTypeotherDesc;
            targetForm.addressArea = sourceForm.addressArea;
            targetForm.regFund = sourceForm.regFund;
            targetForm.businessAsset = sourceForm.businessAsset;
            targetForm.regAddr = sourceForm.regAddr;
            targetForm.address = sourceForm.address;
            targetForm.remark = sourceForm.remark;
            //【法人代表】客户号
            targetForm.corpCustNo = sourceForm.corpCustNo;
            //【共同经营者】数量
            targetForm.ctrlerNum = sourceForm.ctrlerNum;
            //【股东】数量
            targetForm.stockerNum = sourceForm.stockerNum;
        }

        /**
         * 初始化【个人】Form表单
         */
        function initPersonalForm(sourceForm, targetForm) {
            targetForm.custName = sourceForm.custName;
            targetForm.custNo = sourceForm.custNo;
            //【证件号码】
            targetForm.paperNo = sourceForm.paperNo;
            //【证件类型】：默认是‘身份证’
            targetForm.paperType = sourceForm.paperType ? sourceForm.paperType : '0';
            //【性别】：默认是根据身份证号码判断的
            targetForm.sex = sourceForm.paperNo ? jnHelper.sexFromId(sourceForm.paperNo) : sourceForm.sex;
            //【出生日期】：默认是根据身份证号码判断的
            targetForm.birthday = sourceForm.paperNo ? jnHelper.birthFromId(sourceForm.paperNo) : sourceForm.birthday;
            //【手机】
            targetForm.mobPhone = sourceForm.mobPhone;
            //【固定电话】
            targetForm.fixPhone = sourceForm.fixPhone;
            targetForm.address = sourceForm.address;
            targetForm.marryStatus = sourceForm.marryStatus;
            targetForm.nation = sourceForm.nation;
            targetForm.eduLevel = sourceForm.eduLevel;
            targetForm.email = sourceForm.email;
            //【居住情况】：默认为【自有】
            targetForm.housingStatus = sourceForm.housingStatus ? sourceForm.housingStatus : '1';
            targetForm.housingDesc = sourceForm.housingDesc;
            targetForm.housingType = sourceForm.housingType;
            targetForm.domPlace = sourceForm.domPlace;
            targetForm.netIncomeY = sourceForm.netIncomeY;
            targetForm.home = sourceForm.home;
            targetForm.workUnit = sourceForm.workUnit;
            targetForm.workAddr = sourceForm.workAddr;
            targetForm.remark = sourceForm.remark;
            //配偶的【客户号】
            targetForm.spouseCustNo = sourceForm.spouseCustNo;
        }

        /**
         * 删除数组中指定的item
         * @param array 目标数组
         * @return removeItems
         */
        function removeItemFromArray(array, item) {
            var index = getArrayIndex(array, item);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        function getArrayIndex(array, item) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].formName == item) return i;
            }
            return -1;
        }

        /**
         * 根据【贷款状态】和【岗位信息】获取编辑权限
         * @param obj 贷款当前信息
         * @return true:有编辑权限 false:没有
         */
        function getEditAuth(obj) {
            //判断是否处于【已申请】或者【申请未提交】状态
            if (obj.status !== '10' && obj.status !== '11') {
                return false;
            }

            //判断当前登录岗位是否是【客户经理岗】或者【后台人员】
            if (!jnUser.hasStation('400|566')) {
                return false;
            }

            //判断当前贷款所属【客户经理】是否和【登录】的是同一人
            if (jnUser.hasStation('400') && obj.custManagerNo && jnUser.userId !== obj.custManagerNo) {
                return false;
            }

            return true;
        }

        //设置form表单
        function setFormMap(formObj) {
            if (!formMap[formObj.formName]) {
                formMap[formObj.formName] = {};
            }
            formMap[formObj.formName] = formObj;
        }

        //获取form表单对象
        function getFormMap(formName) {
            return formMap[formName];
        }

        //初始化机构参数和团队经理代码
        function initParam(paramObj) {
            var justManager = jnUser.hasStation('400'); //客户经理
            var justTeamManager = jnUser.hasStation('500'); //团队经理
            var justSysManager = jnUser.hasStation('566'); //后台人员

            //团队经理或者后台人员
            if (justTeamManager || justSysManager) {
                paramObj.deptId = jnUser.deptId;
            }
            //客户经理
            if (justManager) {
                paramObj.custManagerNo = jnUser.userId;
            }

            return paramObj;
        }
    }

})();
