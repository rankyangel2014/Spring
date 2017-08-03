(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('guaranteeWayCtrl', guaranteeWayCtrl);

    guaranteeWayCtrl.$inject = ['$scope', '$stateParams', 'LoanDetailInfoService', 'jnHelper', 'jnForm', 'jnPage'];

    function guaranteeWayCtrl($scope, $stateParams, LoanDetailInfoService, jnHelper, jnForm, jnPage) {
        var self = this;

        self.gurTypeList = {
            credit: false, //信用
            ensure: false, //保证
            mortgage: false, //抵押
            pledge: false //质押
        };

        //保证列表
        self.ensureOptList = [{
            label: '企业担保',
            value: false
        }, {
            label: '个人担保',
            value: false
        }];

        //质押列表
        self.pledgeOptList = [{
            label: '存单',
            value: false
        }, {
            label: '其他',
            value: false
        }];

        //抵押列表
        self.mortgageOptList = [{
            label: '住宅',
            value: false
        }, {
            label: '商业房产',
            value: false
        }, {
            label: '土地',
            value: false
        }, {
            label: '出租车经营权',
            value: false
        }, {
            label: '机器设备',
            value: false
        }, {
            label: '运输工具',
            value: false
        }, {
            label: '存货',
            value: false
        }, {
            label: '其他',
            value: false
        }];


        self.form = {};
        //是否可编辑
        self.isReadOnly = $stateParams.isReadOnly == 'true' ? true : false;
        self.changeCredit = changeCredit;
        self.changeEnsure = changeEnsure;
        self.changeMortgage = changeMortgage;
        self.changePledge = changePledge;
        self.saveForm = saveForm;

        //【信用】改变
        function changeCredit(value) {
            if (value) {
                self.gurTypeList.ensure = false;
                self.gurTypeList.mortgage = false;
                self.gurTypeList.pledge = false;
                changeEnsure(false);
                changeMortgage(false);
                changePledge(false);
            }
        }

        //【保证】改变
        function changeEnsure(value) {
            if (!value) {
                self.form.dbqymc = null;
                self.form.dbqyjkr = null;
                self.form.dbgrmc = null;
                self.form.dbgrjkr = null;
                //清空【保证】列表
                resetList(self.ensureOptList);
            }
        }

        //【抵押】改变
        function changeMortgage(value) {
            if (!value) {
                self.form.dyStatusText = null;
                //清空【抵押】列表
                resetList(self.mortgageOptList);
            }
        }

        //【质押】改变
        function changePledge(value) {
            if (!value) {
                self.form.zyStatusText = null;
                //清空【质押】列表
                resetList(self.pledgeOptList);
            }
        }

        //保存表单
        function saveForm() {
            var data = angular.copy(self.form);

            data._gurTyp = transfGurTyp(self.gurTypeList); //担保方式

            if (self.gurTypeList.credit) { //信用
                data.gurTyp = '1';
            } else {
                data.bzStatusStr = self.gurTypeList.ensure ? transfList(self.ensureOptList) : null; //转化【保证】
                data.dyStatusStr = self.gurTypeList.mortgage ? transfList(self.mortgageOptList) : null; //转化【抵押】
                data.zyStatusStr = self.gurTypeList.pledge ? transfList(self.pledgeOptList) : null; //转化【质押】
            }

            jnForm.validate(self.applyInfoForm).then(function() {
                var param = {
                    moduleId: '26',
                    loanNo: $stateParams.loanNo,
                    custNo: $stateParams.custNo,
                    _gurTyp: data._gurTyp,
                    bzStatusStr: data.bzStatusStr,
                    dyStatusStr: data.dyStatusStr,
                    zyStatusStr: data.zyStatusStr,
                    dbqymc: self.ensureOptList[0].value ? data.dbqymc : null, //企业【保证】
                    dbqyjkr: self.ensureOptList[0].value ? data.dbqyjkr : null,
                    dbgrmc: self.ensureOptList[1].value ? data.dbgrmc : null, //个人【保证】
                    dbgrjkr: self.ensureOptList[1].value ? data.dbgrjkr : null,
                    dyStatusText: self.mortgageOptList[7].value ? data.dyStatusText : null, //其他【抵押】
                    zyStatusText: self.pledgeOptList[1].value ? data.zyStatusText : null //其他【质押】
                }
                LoanDetailInfoService.saveGuaranteeInfo(param).then(function(rsp) {
                    if (rsp.success) {
                        jnHelper.alert("担保方式保存成功！");
                        jnPage.modified = false;
                    }
                });
            });
        }

        //初始化表单
        function initForm() {
            LoanDetailInfoService.getGuaranteeInfo({
                moduleId: '18',
                loanNo: $stateParams.loanNo,
                custNo: $stateParams.custNo
            }).then(function(rsp) {
                if (rsp.success) {
                    if (!rsp.data) {
                        return;
                    }
                    initGurTyp(rsp.data.mainGurTyp); //初始化【担保方式】
                    initList(rsp.data.bzStatus, 'ensure'); //初始化【保证】
                    initList(rsp.data.dyStatus, 'mortgage'); //初始化【保证】
                    initList(rsp.data.zyStatus, 'pledge'); //初始化【保证】
                    self.form.dbqymc = rsp.data.dbqymc;
                    self.form.dbqyjkr = rsp.data.dbqyjkr;
                    self.form.dbgrmc = rsp.data.dbgrmc;
                    self.form.dbgrjkr = rsp.data.dbgrjkr;
                    self.form.dyStatusText = rsp.data.dyStatusText;
                    self.form.zyStatusText = rsp.data.zyStatusText;
                }
            });
        }

        function initList(arr, typeStr) {
            switch (typeStr) {
                case 'ensure':
                    for (var i = 0; i < arr.length; i++) {
                        self.ensureOptList[arr[i] - 1].value = true;
                    }
                    break;

                case 'mortgage':
                    for (var i = 0; i < arr.length; i++) {
                        self.mortgageOptList[arr[i] - 1].value = true;
                    }
                    break;

                case 'pledge':
                    for (var i = 0; i < arr.length; i++) {
                        self.pledgeOptList[arr[i] - 1].value = true;
                    }
                    break;
            }
        }

        //根据数组中对象的value值做转化
        function transfList(arr) {
            var transfArr = "";
            var flag = false; //是否有选中
            var i;
            for (i = 0; i < arr.length; i++) {
                if (arr[i].value) {
                    transfArr = transfArr + '1';
                    flag = true;
                } else {
                    transfArr = transfArr + '0';
                }
            }

            if (flag) {
                return transfArr;
            } else {
                return null;
            }
        }

        //初始化【担保方式】
        function initGurTyp(str) {
            var arr = str.split('');

            if (arr[0] == '1') {
                self.gurTypeList.credit = true;
            }
            if (arr[1] == '1') {
                self.gurTypeList.ensure = true;
            }
            if (arr[2] == '1') {
                self.gurTypeList.mortgage = true;
            }
            if (arr[3] == '1') {
                self.gurTypeList.pledge = true;
            }
        }

        //转化【担保方式】为字符串
        function transfGurTyp(obj) {
            var str = "";

            if (self.gurTypeList.credit) {
                str = "1";
            } else {
                str = "0";
            }

            if (self.gurTypeList.ensure) {
                str = str + "1";
            } else {
                str = str + "0";
            }

            if (self.gurTypeList.mortgage) {
                str = str + "1";
            } else {
                str = str + "0";
            }

            if (self.gurTypeList.pledge) {
                str = str + "1";
            } else {
                str = str + "0";
            }

            return str;
        }

        //将制定checkbox置零
        function resetList(arr) {
            var i;
            for (i = 0; i < arr.length; i++) {
                arr[i].value = false;
            }
        }

        initForm();
    }

})();
