(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('relatedPsnInfoCtrl', relatedPsnInfoCtrl);


    relatedPsnInfoCtrl.$inject = ['$scope', 'jnUser', 'jnHelper', 'LoanDetailInfoService', 'LoanApplyUtilService', 'jnConstant', '$state'];

    function relatedPsnInfoCtrl($scope, jnUser, jnHelper, LoanDetailInfoService, LoanApplyUtilService, jnConstant, $state) {
        var self = this;

        var parentVM = $scope.loanDetailInfoCtrl; // 获取父scope的VM
        var initParamObj = {
            custNo: parentVM.acceptParamObj.custNo, //主贷人客户号
            loanNo: parentVM.acceptParamObj.loanNo //(贷款借据号)
        }

        //表单是否只读,默认false
        self.isReadOnly = parentVM.acceptParamObj.isReadOnly;

        self.goDetail = goDetail;
        self.deleteRelate = deleteRelate;

        function deleteRelate(item, $event) {
            jnHelper.confirm('确认是否删除？').then(function(confirmed) {
                if (!confirmed) {
                    return;
                }
                LoanDetailInfoService.deleteTogetherOpt({
                    moduleId: "6", //关联人
                    pCustNo: parentVM.acceptParamObj.custNo, //主贷人客户号
                    loanNo: parentVM.acceptParamObj.loanNo, //借据号
                    custNo: item.custNo,
                    custType: item.custType,
                    operType: "2"
                }).then(function(rsp) {
                    if (rsp.success) {
                        jnHelper.alert("删除成功！");
                        //刷新【个人资料】
                        if(parentVM.acceptParamObj.custType == '0'){
                            LoanApplyUtilService.getFormMap("personalInfo").initFunc(true);
                        }
                        //刷新【企业资料】
                        if(rsp.data.custNo == LoanApplyUtilService.getFormMap("companyInfo").form.custNo && parentVM.acceptParamObj.custType == '0'){
                            LoanApplyUtilService.getFormMap("companyInfo").initFunc();
                        }else{
                            LoanApplyUtilService.getFormMap("companyInfo").initFunc(true);
                        }
                        initList();
                    }
                });
            });
            $event.stopPropagation(); //阻止事件冒泡
        }

        function goDetail(item) {
            $state.go('addRelatedPsn', {
                pageFlag: '01',
                loanNo: parentVM.acceptParamObj.loanNo,
                custNo: item.custNo, //客户号（用于查询出该客户）
                pCustNo: parentVM.acceptParamObj.custNo,//主客户号
                pCustType: parentVM.acceptParamObj.custType,//主客户类型
                isReadOnly: parentVM.acceptParamObj.isReadOnly,
                custType: item.custType,
                linkType: item.linkType,
                shareAmt: item.shareAmt,
                sharePct: item.sharePct,
                relationRemark: item.relationRemark
            })
        }

        //初始化【关联人信息】
        function initList() {
            LoanDetailInfoService.getTogetherOptList(initParamObj).then(function(rsp) {
                self.list = rsp;
            })
        }

        //设置当前表单信息，以便于父页面调用
        LoanApplyUtilService.setFormMap({
            formName: "relatedPsnInfo",
            saveFunc: addRelated,
            initFunc: initList,
        });

        //新增
        function addRelated() {
            $state.go('addRelatedPsn', {
                pCustNo: parentVM.acceptParamObj.custNo,//主客户号
                pCustType: parentVM.acceptParamObj.custType,//主客户类型
                loanNo: parentVM.acceptParamObj.loanNo,
                isReadOnly: parentVM.acceptParamObj.isReadOnly,
                pageFlag:'00'//00：新增
            })
        }

        initList();

        //监听状态切换
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            //如果是从【法人代表】【配偶】【股东】【共同经营者】等界面返回，则刷新列表
            if (fromState.name === 'addRelatedPsn' || fromState.name === 'personalRelated' || fromState.name === 'togetherOperator'){
                initList();
            }
        });
    }

})();
