(function () {
    'use strict';

    angular
        .module('custOtherList')
        .controller(//实际控制人详情（个人）
            'perCustActualViewCtrl',
            ['$filter', '$scope', '$stateParams', 'custActualService', '$state',
                function ($filter, $scope, $stateParams, custActualService, $state) {
                    var self = this;

                    self.isDetail = $stateParams.isDetail;

                    custActualService.readActual({
                        custNo: $stateParams.custNo,
                    }).then(function (rsp) {
                        $scope.it = rsp.data;
                        if ($scope.it.paperNo) {
                            $scope.it.birthday = $filter('jnDate')(getBirthdayByPaperNo($scope.it.paperNo));
                            $scope.it.age = getAgeByPaperNo($scope.it.paperNo);
                            $scope.it.sex = getSexByPaperNo($scope.it.paperNo);
                        }

                    });

                    //【修改】响应函数
                    self.edit = function (custNo) {
                        $state.go('perCustActualEdit', {
                            custNo: custNo,
                            isDetail: self.isDetail,
                            pCustNo: $stateParams.pCustNo,
                        });
                    };
                }]
        );

})();

