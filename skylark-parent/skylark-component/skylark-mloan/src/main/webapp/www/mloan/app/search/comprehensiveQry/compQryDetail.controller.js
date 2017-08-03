/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
    'use strict';

    angular
        .module('comprehensiveQry')
        .controller('compQry.DetailCtrl',
            ['jnHttp', 'jnUser', '$stateParams', '$scope',
                function (jnHttp, jnUser, $stateParams, $scope) {
                    var params = {};
                    params.custNo = $stateParams.custNo;//客户编号
                    params.loanNo = $stateParams.loanNo;//贷款合同号
                    //params.contType = $stateParams.contType;//主合同类型

                    jnHttp.post('/mloan/router/rest/LoanDetailAction.do?method=getLoanApplyDtl',
                        params).then(function (rsp) {
                        $scope.custNo = $stateParams.custNo;
                        $scope.loanNo = $stateParams.loanNo;
                        $scope.contType = $stateParams.contType;
                        $scope.it = rsp.data;
                    });


                    // 控制折叠选项
                    $scope.checked = {
                        "jbxx": false,//基本信息
                        "hksx": false,//还款属性和利率
                        "khzh": false,//客户账户
                    };
                    // 折叠列表的显示和隐藏
                    $scope.toggleItem = function (p) {
                        if ($scope.checked[p]) {
                            $scope.checked[p] = false;
                        } else {
                            $scope.checked[p] = true;
                        }
                    };

                }]
        );

})();
