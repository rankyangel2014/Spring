(function () {
    'use strict';

    angular
        .module('myBusiness')
        .controller('loanCheckListCtrl',
            ['jnUser', '$stateParams', 'jnLoanCheckService', 'jnPage', 'jnHelper', '$scope', '$state',
                function (jnUser, $stateParams, jnLoanCheckService, jnPage, jnHelper, $scope, $state) {
                    var self = this;

                    self.loanNo = $stateParams.loanNo;
                    self.contTyp = $stateParams.contTyp;
                    self.custNo = $stateParams.custNo;
                    self.ref = $stateParams.ref;
                    //查询结果
                    var pf = jnHelper.PaginateFetcher(jnLoanCheckService.queryList)
                        .params($stateParams);

                    $scope.list = pf.records();

                    self.more = function () {
                        pf.fetch().then(function (rsp) {
                            rsp.items.forEach(function (e) {

                                //是否可以进行检查登记
                                e['isCheck'] = false;
                                if ((e['checkStatus'] == '0' || e['checkStatus'] == '5') ) {

                                    //客户经理本人才可以登记检查
                                    if(jnUser.hasStation('400')&& $stateParams.custManagerNo == jnUser.userId){

                                        e['isCheck'] = true;
                                    }else if (jnUser.hasStation('500')||jnUser.hasStation('566')){

                                        e['isCheck'] = true;
                                    }
                                }

                                e.realCheckDate = '18991231' == e.realCheckDate || '1899-12-31' == e.realCheckDate ? '' : e.realCheckDate;
                            });
                            // 这里可以进一步处理
                        });
                    };

                    self.more();

                    self.onClickCard = function (check) {
                        if ('DocUpload' === jnPage.params.ref) {
                            jnPage.backTo(jnPage.params.ref, {
                                checkType: check.checkType,
                                checkDate: check.checkDate,
                                modelNo: check.modelNo,
                            });
                        }
                    };

                    self.viewAttachments = function (check) {
                        $state.go('DocAll', {
                            bnNo: $stateParams.loanNo,
                            custNo: $stateParams.custNo,
                            custName: $stateParams.custName,
                            applAmt: $stateParams.applAmt,
                            loanStatus: $scope.status,
                            contTyp: $stateParams.contTyp,
                            checkType: check.checkType,
                            checkDate: check.checkDate,
                            modelNo: check.modelNo,
                            readonly: check.isCheck ? 0 : 1,
                        });
                    };

                    self.uploadAttachments = function (check) {
                        jnPage.go('DocUpload', {
                            loanNo: jnPage.params.loanNo,
                            loanStatus: jnPage.params.loanStatus,
                            contTyp: jnPage.params.contTyp,
                            applAmt: jnPage.params.applAmt,
                            custNo: jnPage.params.custNo,
                            custName: jnPage.params.custName,
                            checkType: check.checkType,
                            checkDate: check.checkDate,
                            modelNo: check.modelNo,
                            type: 1,
                            lockCheck: 1,
                        });
                    };
                }]
        );

})();

