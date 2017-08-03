(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('personalInfoCtrl', personalInfoCtrl);

    personalInfoCtrl.$inject = ['$scope', 'jnUser', 'jnHelper', 'LoanDetailInfoService', 'LoanApplyUtilService', 'jnForm', '$state'];

    function personalInfoCtrl($scope, jnUser, jnHelper, LoanDetailInfoService, LoanApplyUtilService, jnForm, $state) {
        var self = this;

        var parentVM = $scope.loanDetailInfoCtrl; //获取父scope的VM

        //表单是否只读
        self.isReadOnly = parentVM.acceptParamObj.isReadOnly;

        self.form = {};

        // 控制折叠选项
        self.checked = {
            pDetail: false, //更多
        };

        self.goSpouse = goSpouse;
        self.toggleItem = toggleItem;

        //折叠列表的显示和隐藏
        function toggleItem(item) {
            self.checked[item] = !self.checked[item];
        }

        //跳转到配偶界面
        function goSpouse() {
            $state.go("personalRelated", {
                pageFlag: '10', //配偶:10
                loanNo: parentVM.acceptParamObj.loanNo, //贷款合同号
                custNo: self.form.spouseCustNo, //配偶客户号
                pCustNo: parentVM.acceptParamObj.custNo, //主贷人客户号
                pSex: self.form.sex, //主贷人的性别
                isReadOnly: self.isReadOnly
            })
        }

        //初始化信息
        function initForm(isViewBack) {
            LoanDetailInfoService.getPersonalInfo({
                loanNo: parentVM.acceptParamObj.loanNo,
                custNo: parentVM.acceptParamObj.custNo
            }).then(function(rsp) {
                //初始化个人信息
                if(isViewBack){
                    self.form.spouseCustNo = rsp.spouseCustNo;
                }else{
                    LoanApplyUtilService.initPersonalForm(rsp, self.form);
                }
            });
        }

        //保存
        function saveForm() {
            jnForm.validate(self.personalInfoForm).then(function() {
                var param = jnHelper.merge(self.form, {
                    moduleId: '1',
                    custType: '0',
                    custNo: parentVM.acceptParamObj.custNo,
                    loanNo: parentVM.acceptParamObj.loanNo
                });
                LoanDetailInfoService.savePersonalInfo(param).then(function(rsp) {
                    if (rsp.success) {
                        jnHelper.alert("个人资料保存成功！")
                    }
                });
            });
        }

        //设置当前表单信息，以便于父页面调用
        LoanApplyUtilService.setFormMap({
            formName: "personalInfo",
            saveFunc: saveForm,
            initFunc: initForm
        });

        initForm();

        //监听状态切换
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            //如果是从【配偶】返回，则刷新列表
            if (fromState.name === 'personalRelated'){
                var isViewBack = true;
                initForm(isViewBack);
            }
        });
    }
})();
