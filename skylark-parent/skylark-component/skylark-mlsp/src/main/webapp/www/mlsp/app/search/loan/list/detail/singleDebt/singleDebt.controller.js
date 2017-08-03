(function() {
    'use strict';
    angular.module('loan').controller(
            'SingleDebtLoanInfoCtrl',
            [
                    '$scope',
                    'jnLoanService',
                    'jnHelper',
                    '$stateParams',
                    function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '还款记录详情';
                        jnLoanService.readCustLoanInfo($stateParams).then(
                                function(data) {
                                    $scope.it = data.items[0];
                                    $scope.it.crtTxNo=$stateParams.crtTxNo;
                                    $scope.it.crtDt=$stateParams.crtDt;
                                    if ('1' == $scope.it.unipayFlg) {
                                        $scope.it.unipayFlg = '有效签约，可进行银联代扣还款！';
                                    } else {
                                        $scope.it.unipayFlg = '无有效签约，不可银联代扣还款！';
                                    }
                                    
                                    
                                    jnLoanService.readSingleLoanSchedList($stateParams).then(
                                          function(data) {
                                              if ('b' == data.items.txTyp) {
                                                  $scope.it.ssds = '有效签约，可进行实时代收还款！';
                                              } else if ('6' == data.items.txTyp) {
                                                  $scope.it.ssds = '无有效签约，不可进行实时代收还款！';
                                              } else {
                                                  $scope.it.ssds = '无有效签约，不可进行实时代收还款！';
                                              }
                                              $scope.it.repayRemark = data.items.loanList[0].repayRemark;
                                              jnLoanService.readRepayerInfo($stateParams).then(
                                                  function(data1) {
                                                      data1.items.forEach(function (d) {
                                                          if (d.custNo == data.items.loanList[0].repayCustNo) {
                                                              $scope.it.repayer = d.custName;
                                                          }
                                                      });
                                                      
                                                  });
                                          });
                                });
                    } ]).controller(
            'SingleDebtLoanDetailInfoCtrl',
            [
                    '$scope',
                    'jnLoanService',
                    'jnHelper',
                    '$stateParams',
                    function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '还款信息';
                        jnLoanService.readSingleLoanSchedList($stateParams).then(
                                function(data) {
                                    $scope.it = data.items;
                                    $scope.it.fee = 0;
                                    var feeRecList = data.items['feeRecList'];
                                    feeRecList.forEach(function (f) {
                                        $scope.it.fee += f.setlPrcp;
                                    });
                                    $scope.it.txTyp=$scope.it.txTyp==='9' ? '2' : '1';
                                    if ('0' === data.items.loanList[0].optFlagInter) {
                                        $scope.it.setlTyp = '3';
                                    } else {
                                        $scope.it.setlTyp = data.items.loanList[0].setlTyp;
                                    }
                                });

                    } ]).controller(
            'SingleDebtLoanDetailCtrl',
            [ '$scope', 'jnLoanService', 'jnHelper', '$stateParams','$filter',
                    function($scope, jnLoanService, jnHelper, $stateParams,$filter) {
                        $scope.title = '还款明细';
                        jnLoanService.readSingleLoanSchedList($stateParams).then(
                                function(data) {
                                    $scope.it = data.items['repayList'];
                                    $scope.it = $scope.it.map(function (data) {
                                        (function () {
                                            var v = data.receivableTotal - data.setlTotal
                                                - data.wvTotal;

                                            if (0 == $filter('number')(v, 0)) {
                                                data.setlFlag = '是';
                                            } else {
                                                data.setlFlag = '否';
                                            }
                                        })();
                                        return data;
                                    });
                                    
                                    if ('0' === data.items.loanList[0].optFlagInter) {
                                        $scope.it.setlTypId = '3';
                                    } else {
                                        $scope.it.setlTypId = data.items.loanList[0].setlTyp;
                                    }
                                    
                                    if ('3' === $scope.it.setlTypId) {
                                        $scope.it = $scope.it.filter(function (r) {
                                            return 9999 !== r.perdNo;
                                        });
                                    }
                                    
                                    
                                    
                                });
                    } ]).controller(
            'SingleDebtPaymentRecordCtrl',
            [ '$scope', 'jnLoanService', 'jnHelper', '$stateParams',
                    function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '收款记录';
                        jnLoanService.readSingleLoanSchedList($stateParams).then(
                                function(data) {
                                    $scope.it = data.items['bankBackFillList'];
                                });
                        
                    } ]).controller(
            'SingleDebtBalanceTreatmentCtrl',
            [ '$scope', 'jnLoanService', 'jnHelper', '$stateParams',
                    function($scope, jnLoanService, jnHelper, $stateParams) {
                        $scope.title = '费用及余款处理';
                        jnLoanService.readSingleLoanSchedList($stateParams).then(
                                function(data) {
                                    var list =  data.items['feeRecList'];
                                    jnLoanService.readFeeParam().then(
                                            function(data) {
                                                list.forEach(function(d){
                                                    data.items.forEach(function(t){
                                                        if(d.feeCde==t.feeCde){
                                                            d.feeDesc = t.feeDesc;
                                                        }
                                                    });
                                                });
                                                $scope.it = list ;
                                    });
                                });
                        

                    } ]);
})();
