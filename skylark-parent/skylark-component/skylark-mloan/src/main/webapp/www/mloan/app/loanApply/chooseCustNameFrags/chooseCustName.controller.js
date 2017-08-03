(function() {
    'use strict';

    angular
        .module('loanApply')
        .controller('addCustCtrl', addCustCtrl);

    addCustCtrl.$inject = ['$scope', 'jnUser', 'jnHelper', 'LoanBaseInfoService', 'jnForm', 'jnPage', 'LoanApplyUtilService'];

    //新增正式客户ctrl
    function addCustCtrl($scope, jnUser, jnHelper, LoanBaseInfoService, jnForm, jnPage, LoanApplyUtilService) {
        var self = this;

        var parentVM = $scope.loanBaseInfoCtrl;

        self.form = {
            cardMerge: 'N'
        };

        //如果是后台人员，则显示【客户经理】选择框
        if(jnUser.hasStation('566')){
            self.isCustManagerShow = "show";
        }


        //初始化岗位信息
        LoanApplyUtilService.initParam(self.form);
        
        //新增正式客户
        self.addFormalCust = function() {
            var ll = self.form;
            jnForm.validate(self.validateForm).then(function() {
                LoanBaseInfoService.addFormalCust(jnHelper.merge(self.form, {
                    custType: parentVM.form.custType,
                    liceNoOrNewCard: self.form.cardMerge //三证合一？？
                })).then(function(rsp) {
                    if (rsp.success) {
                    	self.form = {
                                cardMerge: 'N'
                        };
                    	  //初始化岗位信息
                        LoanApplyUtilService.initParam(self.form);
                        jnHelper.alert("客户注册成功！");
                        parentVM.form.custName = rsp.data.custName;
                        parentVM.form.custNo = rsp.data.custNo;

                        if (rsp.data.custType == '0') {
                            parentVM.form.paperNo = rsp.data.paperNo;
                        } else {
                            parentVM.isCardMergeDisabled = "disabled";
                            if (rsp.data.paperType == '10') { //营业执照注册号
                                parentVM.form.cardMerge = 'N';
                                parentVM.form.regNo = rsp.data.paperNo;
                            } else {
                                parentVM.form.cardMerge = 'Y';
                                parentVM.form.liceNo = rsp.data.paperNo;
                            }
                        }
                        parentVM.custNameModalConf.hideCustNameModal();
                    }
                });
            });
        };
    }

})();
