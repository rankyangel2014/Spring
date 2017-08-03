(function () {
    'use strict';

    angular
        .module('loanCalc')
        .controller('loanCalcCtrl', [
                '$state', '$scope', 'jnForm', 'jnLoanCalcService', '$filter', 'jnUser', 'jnHelper', 'jnConstant',
                function ($state, $scope, jnForm, jnLoanCalcService, $filter, jnUser, jnHelper, jnConstant) {

                    var self = this;

                    self.form = {};
                    self.form.dueDay = 20;
                    self.form.repayTyp = 'X';
                    self.form.rateType = '2';
                    self.form.instmFreqNumUnit = '1';
                    self.form.instmFreqUnitTyp = 'M';
                    self.form.rateTypeTitle = jnConstant.get(9001)[self.form.rateType];
                    self.hkfs = jnConstant.get(327);
                    self.form.intStartDt = $filter('jnDate')(jnUser.jyrq);
                    self.submit = function () {

                        var dataStart = new Date(self.form.intStartDt);
                        var endStart = new Date(self.form.lastDueDt);

                        //不超过100个月
                        //if (moment(self.form.intStartDt).isAfter(moment(self.form.lastDueDt).add(-100, 'M'))) {
                        if (moment(self.form.intStartDt).add(100, 'M').format('YYYYMMDD') <= moment(self.form.lastDueDt).format('YYYYMMDD')) {
                            jnHelper.alert('【到期日与起息日相差不大于100个月】!');
                            return;
                        }

                        if (self.form.intStartDt >= self.form.lastDueDt) {
                            jnHelper.alert('【到期日必须大于起息日】!');
                            return;
                        }
                        if (self.form.repayTyp != "B") {
                            //除了利随本清外，其他情况下要判断首次还贷日要大于起息日，小于到期日
                            if (self.form.fstPaymDt <= self.form.intStartDt) {
                                jnHelper.alert('【首次还贷日要大于起息日】!');
                                return;
                            }
                            if (self.form.fstPaymDt > self.form.lastDueDt) {
                                jnHelper.alert('【首次还贷日要小于等于到期日】!');
                                return;
                            }

                        }
                        jnForm.validate(self.myForm)
                            .then(function () {
                                jnLoanCalcService.genPaySched(self.form).then(
                                    function (rsp) {
                                        $state.go('loanCalcList', self.form);
                                    });
                            });
                    };
                    self.fstPaymDtDisabled = false;
                    self.dueDayDisabled = false;

                    self.changeLastDueDt = function () {
                        self.calcFstDt();
                    }

                    //改变还款方式响应函数
                    self.changeRepayTyp = function () {
                        var newValue = self.form.repayTyp;

                        if (newValue == "B") {// 利随本清
                            self.fstPaymDtDisabled = true;

                            var lastDueDt = self.form.lastDueDt;
                            if (lastDueDt) {
                                self.form.fstPaymDt = lastDueDt;
                            }

                            self.form.dueDay = 20;
                            self.dueDayDisabled = true;

                        } else {
                            self.fstPaymDtDisabled = false;
                            self.dueDayDisabled = false;
                            self.calcFstDt();
                        }

                        var parCde = '';
                        if ('P' == newValue) {//等额本金
                            parCde = 'RATETYPE_MATCHING_PRCP';
                        } else if ('T' == newValue) {//等额本息
                            parCde = 'RATETYPE_MATCHING_PRCP_INT';
                        } else if ('X' == newValue) {//按期还息到期还本
                            parCde = 'RATETYPE_SETTLEMENT_PRCP_INT';
                        } else if ('B' == newValue) {//利随本清
                            parCde = 'RATETYPE_INT_WITH_PRCP_CLEAR';
                        } else if ('Q' == newValue) {//气球贷
                            parCde = 'RATETYPE_BALLOON_LOAN';
                        }

                        jnLoanCalcService.transRateType({parCde: parCde}).then(function (rsp) {
                            self.form.rateType = rsp.data.parValue;
                            self.form.rateTypeTitle = jnConstant.get(9001)[self.form.rateType];
                        });

                    }

                    self.calcFstDt = function () {

                        if (moment(self.form.intStartDt).isAfter(moment(self.form.lastDueDt))) {
                            self.form.intStartDt = $filter('jnDate')(jnUser.jyrq);
                        }

//                    if (moment(self.form.intStartDt).add(100, 'M').format('YYYYMMDD') <= moment(self.form.lastDueDt).format('YYYYMMDD')) {
//
//                        jnHelper.alert('【到期日与起息日相差不大于100个月】!');
//                        return;
//                    }
//
//                    if (self.form.intStartDt >= self.form.lastDueDt) {
//
//                        jnHelper.alert('【到期日必须大于起息日】!');
//                        return;
//                    }

                        if (self.form.intStartDt
                            && self.form.lastDueDt
                            && self.form.dueDay) {
                            jnLoanCalcService.queryFstPaymDt({
                                intStartDt: self.form.intStartDt.replace(/(\d{4})[-\/](\d{2})[-\/](\d{2})/, '$1$2$3'),
                                lastDueDt: self.form.lastDueDt.replace(/(\d{4})[-\/](\d{2})[-\/](\d{2})/, '$1$2$3'),
                                instmFreqNumUnit: '1',
                                instmFreqUnitTyp: 'M',
                                dueDay: self.form.dueDay,
                            }).then(function (rsp) {
                                    self.form.fstPaymDt = $filter('jnDate')(rsp.fstPaymDt);
                                }
                            );
                        }
                    }

                    self.reset = function () {
                        self.myForm.$rollbackViewValue();
                        self.form = {};
                        self.form.rateType = '3';
                    };
                }]
        );

})();

