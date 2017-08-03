(function () {
'use strict';

angular
    .module('common')
    .directive('jnInputLiceNo', [
        'jnHttp',
        'jnForm',
        function (
            jnHttp,
            jnForm
        ) {
            var search = function (liceNo) {
                return jnHttp.post(
                    '/mloan/router/rest/FormalServicedAction.do?method=qryKzCust',
                    {
                        liceNo: liceNo,
                    },
                    {
                        quiet: true,
                    }

                ).then(
                    function (rsp) {
                        return rsp.data;
                    },

                    function () {
                        return null;
                    }
                );
            };

            return {
                template: '\
                    <input\
                        name="{{ name }}"\
                        type="text"\
                        ng-model="ngModel"\
                        ng-readonly="ngReadonly"\
                        ng-disabled="ngDisabled"\
                        placeholder="{{ placeholder }}"\
                        jn-lice-no\
                    />',

                restrict: 'E',

                scope: {
                    ngReadonly: '=',
                    ngDisabled: '=',
                    ngModel: '=',
                    ngModelCustNo: '=', // 客户编号
                    ngModelCustName: '=', // 客户名称
                    ngModelAddr: '=', // 经营地址
                    ngModelAddrType: '=', // 经营场所
                    ngModelAddrDesc: '=', // 经营场所：其他
                    ngModelPhone: '=', // 联系方式
                    ngModelBizHours: '=', // 营业时间
                    ngModelBizStart: '=', // 业务开始时间
                    ngModelEmpNum: '=', // 雇员人数
                    ngModelInTrade: '=', // 所属行业
                    ngModelLoanCard: '=', // 贷款卡编号
                    ngModelMainBiz: '=', // 主营业务
                    ngModelOrgType: '=', // 实体类型
                    ngModelFound: '=',
                    name: '@',
                    placeholder: '@',
                },

                link: function ($scope, $element, $attr) {
                    $element.children('input').on('change', function () {
                        if (! $scope.ngModel) {
                            return;
                        }

                        search($scope.ngModel).then(function (rsp) {
                            if (! rsp) {
                                return;
                            };

                            $scope.ngReadonly = true;
                            $scope.ngModelFound = true;
                            $scope.ngModelCustNo = rsp.custNo;
                            $scope.ngModelCustName = rsp.custName;
                            $scope.ngModelAddr = rsp.address;
                            $scope.ngModelAddrType = rsp.addressType;
                            $scope.ngModelAddrDesc = rsp.addressTypeotherDesc;
                            $scope.ngModelPhone = rsp.fixPhone;
                            $scope.ngModelBizHours = rsp.businessHours;
                            $scope.ngModelBizStart = jnForm.jsDateFromRspDate(
                                rsp.businessStartDt);
                            $scope.ngModelEmpNum = Number(rsp.employeeNum);
                            $scope.ngModelInTrade = rsp.inTrade;
                            $scope.ngModelLoanCard = rsp.loanCard;
                            $scope.ngModelMainBiz = rsp.mainBusiness;
                            $scope.ngModelOrgType = rsp.orgType;
                        });
                    });
                },
            };
        }
    ]);

})();
