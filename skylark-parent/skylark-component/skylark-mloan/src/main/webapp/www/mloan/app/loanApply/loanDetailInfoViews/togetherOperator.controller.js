(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('togetherOperatorCtrl', togetherOperatorCtrl);


    togetherOperatorCtrl.$inject = ['$scope', '$stateParams', 'jnUser', 'jnHelper', 'LoanDetailInfoService', '$state'];


    function togetherOperatorCtrl($scope, $stateParams, jnUser, jnHelper, LoanDetailInfoService, $state) {
        var self = this;

        //自定义字段:页面来源(14:共同经营者, 29:股东)
        var pageFlag = $stateParams.pageFlag;

        //是否初始化数据
        var isInitData = true;

        var initParamObj = {};
        var saveParamObj = {};

        switch (pageFlag) {
            case "14":
                self.viewName = "共同经营者";
                initParamObj = {
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.pCustNo,
                    linkType: "14" //关联类型(14:共同经营者)
                };
                break;

            case "29":
                self.viewName = "股东";
                initParamObj = {
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.pCustNo,
                    linkType: "29" //关联类型(29:股东)
                };
                break;
        }

        //是否可编辑
        self.isReadOnly = $stateParams.isReadOnly == 'true' ? true : false;

        self.addOperator = addOperator;
        self.deleteOperator = deleteOperator;
        self.goDetail = goDetail;



        //删除
        function deleteOperator(item, $event) {
            jnHelper.confirm('确认是否删除？').then(function(confirmed) {
                if (!confirmed) {
                    return;
                }
                LoanDetailInfoService.deleteTogetherOpt({
                    moduleId: "6", //关联人
                    pCustNo: $stateParams.pCustNo, //主贷人客户号
                    loanNo: $stateParams.loanNo, //借据号
                    custNo: item.custNo,
                    custType: item.custType,
                    operType: "2"
                }).then(function(rsp) {
                    if (rsp.success) {
                        jnHelper.alert("删除成功！");
                        initList();
                    }
                });
            });
            $event.stopPropagation(); //阻止事件冒泡
        }

        //查看详情
        function goDetail(item) {
            $state.go('addRelatedPsn', {
                pageFlag: pageFlag == '14' ? '03' : '05', //03:【共同经营者】查看 05:【股东】查看
                loanNo: $stateParams.loanNo,
                custNo: item.custNo, //客户号（用于查询出该客户）
                pCustNo: $stateParams.pCustNo, //主客户号
                isReadOnly: $stateParams.isReadOnly,
                custType: item.custType,
                linkType: item.linkType,
                shareAmt: item.shareAmt,
                sharePct: item.sharePct,
                relationRemark: item.relationRemark,
                conditionInfo: item.conditionInfo, //【共同经营者状况】客户维度
                equityHis: $stateParams.equityHis, //【股权变更历史】贷款维度
            })
        }

        //新增
        function addOperator() {
            var params = {
                pageFlag: pageFlag == '14' ? '02' : '04', //02:【共同经营者】新增 04:【股东】新增
                pCustNo: $stateParams.pCustNo, //主客户号
                loanNo: $stateParams.loanNo,
                isReadOnly: $stateParams.isReadOnly,
                linkType: pageFlag == '14' ? '14' : '29', //14:【共同经营者】 29:【股东】
            };
            $state.go('addRelatedPsn', params);
        }

        //初始化【共同经营者信息】【股东信息】
        function initList() {
            LoanDetailInfoService.getTogetherOptList(initParamObj).then(function(rsp) {
                self.list = rsp;
            })
        }

        //监听状态切换
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //如果是从【股东】【共同经营者】等界面返回，则刷新列表
            if (fromState.name === 'addRelatedPsn') {
                if(fromParams.equityHis){
                    $stateParams.equityHis = fromParams.equityHis;
                }
                initList();
            }
        });

        initList();
    }

})();
