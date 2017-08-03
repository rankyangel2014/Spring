(function () {
'use strict';

angular
    .module('common')
    .directive('jnInputIdNo', [
        'jnHttp',
        'jnHelper',
        'jnForm',
        function (
            jnHttp,
            jnHelper,
            jnForm
        ) {
            var search = function (id) {
                return jnHttp.post(
                    '/mloan/router/rest/FormalServicedAction.do?method=qryKzPerson',
                    {
                        paperNo: id,
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
                        ng-change="ngChange()"\
                        ng-blur="ngBlur()"\
                        placeholder="{{ placeholder }}"\
                        jn-id-no\
                    />',

                restrict: 'E',

                scope: {
                    ngReadonly: '=',
                    ngDisabled: '=',
                    ngChange: '&',
                    ngBlur: '&',
                    ngModel: '=',
                    ngModelCustNo: '=',
                    ngModelCustName: '=',
                    ngModelPaperType: '=',
                    ngModelSex: '=',
                    ngModelBirth: '=',
                    ngModelAddr: '=',
                    ngModelMobile: '=',
                    ngModelPhone: '=',
                    ngModelEduLv: '=',
                    ngModelHouse: '=',
                    ngModelHouseDesc: '=',
                    ngModelMarriage: '=',
                    ngModelFound: '=',
                    onFetch: '=',
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
                            $scope.ngModelPaperType = rsp.paperType;
                            $scope.ngModelAddr = rsp.address;
                            $scope.ngModelMobile = rsp.mobPhone;
                            $scope.ngModelPhone = rsp.fixPhone;
                            $scope.ngModelEduLv = rsp.eduLevel;
                            $scope.ngModelHouse = rsp.housingStatus;
                            $scope.ngModelHouseDesc = rsp.housingDesc;
                            $scope.ngModelMarriage = rsp.marryStatus;

                            if (rsp.sex) {
                                $scope.ngModelSex = rsp.sex;
                            } else {
                                $scope.ngModelSex = jnHelper.sexFromId(
                                    $scope.ngModel);
                            }

                            if (rsp.birthday) {
                                $scope.ngModelBirth = jnForm.jsDateFromRspDate(
                                    rsp.birthday);
                            } else {
                                $scope.ngModelBirth = jnForm.jsDateFromRspDate(
                                    jnHelper.birthFromId($scope.ngModel)
                                );
                            }

                            $scope.onFetch(rsp);
                        });
                    });
                },
            };
        }
    ]);

})();
