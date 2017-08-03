(function () {
    'use strict';

    angular
        .module('custOtherList')
        .controller(//实际控制人详情（企业）
            'entCustActualViewCtrl',
            ['$scope', '$stateParams', 'custActualService', '$state',
                function ($scope, $stateParams, custActualService, $state) {
                    var self = this;

                    self.isDetail = $stateParams.isDetail;

                    custActualService.readActual({
                        custNo: $stateParams.custNo,
                    }).then(function (rsp) {
                        $scope.it = rsp.data;
                        if ($scope.it.paperNo.length == 18) {
                            $scope.it.cardMerge = 'Y';
                        } else {
                            $scope.it.cardMerge = 'N';
                        }
                    });

                    //跳转到修改页面
                    self.edit = function (custNo) {
                        $state.go('entCustActualEdit', {
                            custNo: custNo,
                            isDetail: self.isDetail,
                            pCustNo: $stateParams.pCustNo,
                        });
                    };

                }]
        );

})();

