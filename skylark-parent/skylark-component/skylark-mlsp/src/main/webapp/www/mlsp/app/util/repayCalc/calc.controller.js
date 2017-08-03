(function () {
'use strict';

angular
    .module('util.repayCalc')
    .controller('util.repayCalc.CalcCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        '$timeout',
        '$ionicPopup',
        'jnUser',
        'jnForm',
        'jnStorage',
        'jnHelper',
        'jnUtilRepayCalc',
        function (
            $scope,
            $state,
            $stateParams,
            $timeout,
            $ionicPopup,
            jnUser,
            jnForm,
            jnStorage,
            jnHelper,
            jnUtilRepayCalc
        ) {
            var self = this;
            var jyrq = jnForm.jsDateFromRspDate(jnUser.jyrq);
            var repayTyp = 'B' === $stateParams.repayTyp ?
                'X' : $stateParams.repayTyp;

            var global_wdqRow, // 未到期行号
                global_curRecord, // 未到期记录
                global_sInt, // 实收本金产生利息
                global_rInt; // 应还本金产生利息

            var loanList,
                repayList,
                receivableTotal, //应还合计
                receivablePrcp, //应还本金
                receivableInt, //应还利息
                receivableOdInt, //应还罚息
                receivableCmpdInt, //应还复利
                aheadReceivablePrcp,
                aqhxCurPerdNo,
                lsbqCurPerdNo;

            self.form = {
                setlDt: jyrq,
                aheadSetlPrcp: 0,
            };

            var locked = false;

            var roundNum = function (v, p) {
                return Math.round(v * Math.pow(10, p)) / Math.pow(10, p);
            };

            var showHideInputs = function () {
                if ('3' === self.form.setlTyp) {
                    self.showAheadSetlPrcp = false;
                    self.showSchedAdjTyp = false;
                    self.showCalcuRateTyp = false;

                } else if ('1' === self.form.setlTyp || '2' === self.form.setlTyp) {
                    self.showAheadSetlPrcp = true;
                    self.showSchedAdjTyp = true;
                    self.showCalcuRateTyp = true;

                    if ('X' === repayTyp) {
                        self.showCalcuRateTyp = true;
                        self.showSchedAdjTyp = false;
                    } else {
                        self.showCalcuRateTyp = false;
                        self.showSchedAdjTyp = '2' !== self.form.setlTyp;
                    }

                    //处理部分提前计息下拉参数显隐
                    self.atqghbj = '1' === self.form.setlTyp;
                }
            };

            var initForm = function () {
                self.form.setlTyp = '3';
                showHideInputs();

                self.form.schedAdjTyp = '1';
                self.form.calcuRateTyp = '3';

                jnUtilRepayCalc.readRepayCalcSchedList({
                    setlDt: jnForm.rspDateFromJsDate(self.form.setlDt),
                    custNo: $stateParams.custNo,
                    loanNo: $stateParams.loanNo,
                }).then(function (rsp) {
                    loanList = rsp.loanList;
                    repayList = rsp.repayList;
                    receivableTotal = rsp.receivableTotal; //应还合计
                    receivablePrcp = rsp.receivablePrcp; //应还本金
                    receivableInt = rsp.receivableInt; //应还利息
                    receivableOdInt = rsp.receivableOdInt; //应还罚息
                    receivableCmpdInt = rsp.receivableCmpdInt; //应还复利
                    aheadReceivablePrcp = rsp.aheadReceivablePrcp;
                    aqhxCurPerdNo = rsp.aqhxCurPerdNo;
                    lsbqCurPerdNo = rsp.lsbqCurPerdNo;
                });
            };

            /**
             * 判断是否是起息日当天
             */
            var checkIsIntStartDt = function () {
                var setlDt;

                if (null === global_curRecord) {
                    return false;
                }

                setlDt = jnForm.rspDateFromJsDate(self.form.setlDt);

                if ($stateParams.intStartDt === setlDt) {
                    jnHelper.alert('贷款起息日当天不允许提前还款！');
                    self.form.setlTyp = '3';
                    return true;
                }

                return false;
            };

            /**
             * 校验提前还款合法性
             */
            var checkAheadRepay = function() {
                if (0 === repayList.length) {
                    jnHelper.alert('当前没有获取到还款信息，不能进行提前还款！');
                    self.form.setlTyp = '3';
                    return false;
                }

                global_curRecord = null;

                repayList.some(function (e, i) {
                    if (9999 === e.perdNo) {
                        global_wdqRow = i;
                        global_curRecord = repayList[i];

                        return true;
                    }
                });

                if (!global_curRecord) {
                    jnHelper.alert('该笔贷款没有未到期期次，不能进行提前还款！')
                        .then(function () {
                            self.form.setlTyp = '3';
                        });

                    return false;
                }

                // 贷款在起息日当天不允许提前还款
                return ! checkIsIntStartDt();
            };

            /**
             * 归还未到期(首先设置选中行，其次设置未到期金额)
             */
            var repayFuture = function (callBack) {
                //取消勾选所有还款明细，待后台重新计算应还、实收
                if ('X' !== repayTyp) {
                    repayList.forEach(function (e) {
                        e.isCheck = false;
                    });
                }

                // 起息日当天不能提前还款
                if(checkIsIntStartDt()) {
                    return;
                }

                return genDtlRepayGrid('1', global_wdqRow, 0);
            };

            /**
             * 生成还款记录明细表
             */
            var genDtlRepayGrid = function (optFlag, row, column) {
                return jnUtilRepayCalc.readGenDtlRepayGrid({
                    custNo: $stateParams.custNo,
                    loanNo: $stateParams.loanNo,
                    optFlag: optFlag, // 金额分配操作标识 1:勾选还款明细 2:取消勾选还款明细 3:修改单元格金额 4:自动分配金额
                    setlDt: jnForm.rspDateFromJsDate(self.form.setlDt), // 还款日期
                    row: row, // 还款明细grid行号（从0开始）
                    column: column, // 还款明细grid列号（从0开始）
                    hkmxGridStore: repayList, //还款明细
                    loanGridStore: loanList, //未结清贷款
                }).then(function (rsp) {
                    repayList = rsp.repayList;
                    loanList = rsp.loanList;
                    receivableTotal = rsp.receivableTotal;//应还合计
                    receivablePrcp = rsp.receivablePrcp;//应还本金
                    receivableInt = rsp.receivableInt;//应还利息
                    receivableOdInt = rsp.receivableOdInt;//应还罚息
                    receivableCmpdInt = rsp.receivableCmpdInt;//应还复利

                    return repayList;
                });
            }

            /**
             * 计算还息金额-只针对按期还息到期还本、利随本清有效
             */
            var calcuInt = function (payAmt) {
                return jnUtilRepayCalc.readCalcuPayInt({
                    setlDt: jnForm.rspDateFromJsDate(self.form.setlDt), // 还款日期
                    loanNo: $stateParams.loanNo, //贷款合同号
                    repayTyp: repayTyp, //还款方式
                    aheadSetlPrcp: payAmt, //提前归还本金
                    aqhxCurPerdNo: aqhxCurPerdNo,
                    lsbqCurPerdNo: lsbqCurPerdNo,
                }).then(function (rsp) {
                    global_sInt = roundNum(rsp.sInt, 2);
                    global_rInt = roundNum(rsp.rInt, 2);
                    self.showCalcuRateTyp = 0 < global_rInt;
                });
            };

            /**
            * 重新设置选择行之后的分配金额
            */
            var setDisAmt = function () {
                genDtlRepayGrid('8', global_wdqRow, -1);
            };

            var setAheadToHkmx = function() {
                var payInt=0;
                var repay;

                // 获取还款明细表中未到期记录信息
                repayList.some(function (e) {
                    if (9999 === e.perdNo) {
                        repay = e;
                        return true;
                    }
                });

                if('X' === repayTyp) {
                    if('1' === self.form.calcuRateTyp && global_sInt) {
                    //计算实收本金产生利息
                        payInt = global_sInt;

                    } else if ('2' === self.form.calcuRateTyp && global_rInt) {
                    //计算应还本金产生利息
                        payInt = global_rInt;
                    }
                }

                //按期还息到期还本修改当期还款及利息明细
                if ('X' === repayTyp) {
                    repay.newInt = global_rInt; // 新结利息

                    if ('3' === self.form.calcuRateTyp) {
                        repay.receivableIntT = 0; // 应还利息
                    } else {
                        repay.receivableIntT = payInt; // 应还利息
                    }

                    if (0 < global_rInt) {
                        //按期还息到期还本提前还款修改还款明细表
                        genDtlRepayGrid('7', global_wdqRow, -1);
                    } else {
                        setDisAmt();
                    }

                } else {
                    setDisAmt();
                }
            };

            /**
             * 设置提前还款相应信息
             */
            var setAheadInfo = function () {
                var setlPrcp = 0; //实收本金

                if('2' === self.form.setlTyp) {
                //全部提前还款
                    setlPrcp = aheadReceivablePrcp; // 剩余本金
                } else {
                //部分提前还款
                    setlPrcp = self.form.aheadSetlPrcp;
                }

                //计算还息金额-只针对按期还息到期还本、利随本清有效
                if ('X' === repayTyp) {
                    calcuInt(setlPrcp).then(setAheadToHkmx)

                } else {
                    //设置提前还款对应金额到还款明细中
                    setAheadToHkmx();
                }
            };

            initForm();

            self.onChangeSetlDt = function () {
                if (self.form.setlDt) {
                    if (self.form.setlDt < jyrq) {
                        jnHelper.alert('还款日期不能小于当前账务日期！');
                        self.form.setlDt = jyrq;
                    } else {
                        initForm();
                    }
                } else {
                    self.form.setlDt = jyrq;
                    self.form.setlTyp = '3';
                    showHideInputs();
                }
            };

            self.onChangeSetlTyp = function () {
                if ('3' === self.form.setlTyp) {
                    if (1 === repayList.length
                        && 9999 === repayList[0].perdNo) {
                        jnHelper.alert('当前贷款只有未到期期次，只能进行提前还款！');
                        self.form.setlTyp = '3';
                        return;
                    }

                    self.form.aheadSetlPrcp = 0;
                    showHideInputs();
                    initForm();

                } else if ('1' === self.form.setlTyp || '2' === self.form.setlTyp) {
                    if (! checkAheadRepay()) {
                        self.form.setlTyp = '3';
                        showHideInputs();
                        return;
                    }

                    self.form.aheadSetlPrcp = 0;

                    if ('1' === self.form.setlTyp) {
                        self.disableAheadSetlPrcp = false;
                        self.disableSchedAdjTyp = false;
                        self.disableCalcuRateTyp = false;

                        // 本段程序移植自小微贷APP
                        // 原程序这里有个错误
                        // global_isRepayedCurPerd 是个全局变量
                        // 整个程序只有这里使用但没有任何一处给它赋值
                        // 即它的值永远是 undefined
                        // 下面的选择分支1永远不会到达
                        // 本处和原程序保持一致
                        var global_isRepayedCurPerd;

                        if ('X' === repayTyp && global_isRepayedCurPerd) {
                            self.form.calcuRateTyp = '2';
                        } else {
                            self.form.calcuRateTyp = '3';
                        }

                    } else {
                        self.disableAheadSetlPrcp = true;
                        self.disableSchedAdjTyp = true;
                        self.form.aheadSetlPrcp = aheadReceivablePrcp;
                        self.form.calcuRateTyp = '2';
                    }

                    if('Q' === repayTyp) {
                    //气球贷只能减少期数
                        self.form.schedAdjTyp = '2';
                        self.disableSchedAdjTyp = true;
                    } else {
                        self.form.schedAdjTyp = '1';
                    }

                    showHideInputs();
                    repayFuture().then(setAheadInfo);
                }
            };

            self.onChangeAheadSetlPrcp = function () {
                locked = true;

                if (isNaN(self.form.aheadSetlPrcp)) {
                    jnHelper.alert('提前归还本金不是有效数值，请重新输入！')
                        .then(function () {
                            locked = false;
                            self.form.aheadSetlPrcp = 0;
                        });

                    return;
                }

                if (self.form.aheadSetlPrcp <= 0) {
                    jnHelper.alert('提前归还本金必须大于零！')
                        .then(function () {
                            self.form.aheadSetlPrcp = 0;
                            locked = false;
                        });

                    return;

                }

                if (aheadReceivablePrcp < self.form.aheadSetlPrcp) {
                    jnHelper.alert('提前归还本金【'
                        + self.form.aheadSetlPrcp
                        + '】不能大于剩余本金【'
                        + aheadReceivablePrcp
                        + '】')
                        .then(function () {
                            self.form.aheadSetlPrcp = 0;
                            locked = false;
                        });

                    return;
                }

                if (self.form.aheadSetlPrcp === aheadReceivablePrcp) {
                    $ionicPopup.confirm({
                        template: '请确认是否全部提前还款？',
                        okText: '确定',
                        cancelText: '取消',
                    }).then(function (sure) {
                        if (sure) {
                            self.form.setlTyp = '2';
                            self.onChangeSetlTyp();
                        } else {
                            self.form.aheadSetlPrcp = 0;
                        }

                        locked = false;
                    });
                } else {
                    setAheadInfo();
                    locked = false;
                }
            };

            self.onChangeCalcuRateTyp = function () {
                var payInt = 0;

                if (! repayList) {
                    self.form.calcuRateTyp = '3';
                    return;
                }

                if ('1' === self.form.calcuRateTyp && global_sInt) {
                //计算实收本金产生利息
                    payInt = global_sInt;
                } else if ('2' === self.form.calcuRateTyp && global_rInt) {
                //计算应还本金产生利息
                    payInt = global_rInt;
                }

                repayList.forEach(function (e) {
                    e.wvInt = 0;

                    if (9999 === e.perdNo) {
                        e.setlInt = payInt;

                        if ('X' === repayTyp) {
                            e.receivableIntT = payInt;
                        }
                    } else {
                        e.setlInt = e.receivableIntT;
                    }
                });

                setDisAmt();
            };

            var calc = function () {
                var receivablePrcpTmp, receivableTotalTmp;

                if ('3' !== self.form.setlTyp
                    && self.form.aheadSetlPrcp <= 0) {
                    jnHelper.alert('还款类型为提前还款时，提前还款额必须大于0才可试算！');
                    return false;
                }

                // 归还欠款/当期，则无需显示未到期还款明细记录
                var refinedRepayList = repayList.filter(function (e) {
                    return e.isCheck
                       && ('3' !== self.form.setlTyp || 9999 !== e.perdNo);
                });

                receivablePrcpTmp = receivablePrcp;

                if ('3' !== self.form.setlTyp) {
                    repayList.slice().reverse().some(function (e) {
                        if (9999 === e.perdNo) {
                            receivablePrcpTmp = roundNum(
                                receivablePrcp - e.receivablePrcp
                                + self.form.aheadSetlPrcp, 2);

                            return true;
                        }
                    });
                }

                receivableTotalTmp = roundNum(receivablePrcpTmp
                    + receivableInt + receivableOdInt + receivableCmpdInt, 2);

                var returnData={
                    receivableInt: receivableInt,
                    receivableOdInt: receivableOdInt,
                    receivableCmpdInt: receivableCmpdInt,
                    receivablePrcp: receivablePrcpTmp,
                    receivableTotal: receivableTotalTmp,
                    contNoExt: $stateParams.contNoExt,
                    loanNo: $stateParams.loanNo,
                    repayList: refinedRepayList,
                }

                jnStorage.set('NEW_REPAY_LIST_DATA', returnData);

                return true;
            };

            self.submit = function () {
                $timeout(function () {
                    if (! locked) {
                        jnForm.validate(self.calcForm)
                            .then(function () {
                                if (calc()) {
                                    $state.go('utilRepayCalcResult', {
                                        custNo: $stateParams.custNo,
                                        setlDt: jnForm.rspDateFromJsDate(
                                            self.form.setlDt),
                                    }, {
                                        reload: true,
                                    });
                                }
                            });
                    }
                }, 100);
            };
        }]
    );

})();

