(function () {
'use strict';

angular
    .module('common')
    .directive('jnSelectCustomer', [
        'jnHelper',
        'jnForm',
        'jnSelectCustomer',
        function (
            jnHelper,
            jnForm,
            jnSelectCustomer
        ) {
            return {
                template: '\
                    <input\
                        type="text"\
                        name="{{ name }}"\
                        ng-change="ngChange"\
                        ng-model="ngModel"\
                        ng-readonly="ngReadonly"\
                        ng-disabled="ngDisabled"\
                        ng-required="ngRequired"\
                        placeholder="{{ placeholder }}"\
                        maxlength="120"\
                        style="display: inline-block; width: 60%;"\
                    />\
                    <button\
                        ng-click="select()"\
                        ng-disabled="disableSelect"\
                    >选择</button>',
                restrict: 'E',
                scope: {
                    ngReadonly: '=',
                    ngDisabled: '=',
                    ngRequired: '=',
                    disableSelect: '=',
                    ngChange: '&',
                    onSelect: '=',
                    ngModel: '=', // 客户名称
                    ngModelCustNo: '=', // 客户编号
                    ngModelCustType: '=', // 客户类型
                    ngModelPaperType: '=', // 证件类型
                    ngModelPaperNo: '=', // 证件号码
                    ngModelLiceNoFound: '=', // 是否已存在统一信用证
                    ngModelRegNoFound: '=', // 是否已存在营业执照
                    ngModelIdNo: '=', // 身份证
                    ngModelRegNo: '=', // 营业执照
                    ngModelLiceNo: '=', // 统一信用证
                    ngModelCardMerge: '=', // 是否三证合一
                    ngModelPhone: '=', // 联系方式
                    ngModelAddr: '=', // 地址
                    ngModelBirth: '=', // 生日
                    ngModelSex: '=', // 性别
                    custNo: '=', // 父客户号
                    custType: '=', // 过滤条件：客户类型
                    placeholder: '@',
                    name: '@',
                },
                link: function ($scope, $element, $attr) {
                    $scope.select = function () {
                        jnSelectCustomer.open(
                            $scope.custNo,
                            $scope.custType,
                            function (data) {
                                $scope.ngReadonly = true;
                                $scope.ngModel = data.custName;
                                $scope.ngModelCustNo = data.custNo;
                                $scope.ngModelPaperType = data.paperType;
                                $scope.ngModelPaperNo = data.paperNo;
                                $scope.ngModelPhone = data.phoneNo;
                                $scope.ngModelAddr = data.custAddr;

                                if ('0' === data.paperType) {
                                // 身份证
                                    $scope.ngModelIdNo = data.paperNo;
                                    $scope.ngModelSex = jnHelper.sexFromId(
                                        data.paperNo);

                                    $scope.ngModelBirth = jnForm.jsDateFromRspDate(jnHelper.birthFromId(data.paperNo));

                                } else if ('10' === data.paperType) {
                                // 营业执照
                                    $scope.ngModelRegNo = data.paperNo;
                                    $scope.ngModelLiceNo = '';
                                    $scope.ngModelCardMerge = 'N';
                                    $scope.ngModelRegNoFound = true;
                                    $scope.ngModelLiceNoFound = false;

                                } else if ('11' === data.paperType) {
                                // 统一信用证
                                    $scope.ngModelLiceNo = data.paperNo;
                                    $scope.ngModelRegNo = '';
                                    $scope.ngModelCardMerge = 'Y';
                                    $scope.ngModelRegNoFound = false;
                                    $scope.ngModelLiceNoFound = true;
                                }

                                if ($scope.onSelect) {
                                    $scope.onSelect(data);
                                }
                            }
                        );
                    };
                },
            };
        }
    ]);

})();
