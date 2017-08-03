(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.GLREntEditCtrl', [
        '$state',
        '$stateParams',
        'jnConstant',
        'jnForm',
        'jnPage',
        'jnHelper',
        'jnCustomerGLR',
        'myCustomerSer',
        function (
            $state,
            $stateParams,
            jnConstant,
            jnForm,
            jnPage,
            jnHelper,
            jnCustomerGLR,
            myCustomerSer
        ) {
            var self = this;

            jnCustomerGLR.readGLR({
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                self.form = rsp;
                self.form.cCustName = self.form.custName;
                self.form.phoneNo = self.form.fixPhone;
                self.form.addressEnb = self.form.custAddr;
                self.form.linkType = $stateParams.linkType;
                self.form.pCustNo = $stateParams.pCustNo;
                self.form.businessStartDt = jnForm.jsDateFromRspDate(
                    self.form.businessStartDt
                );

                self.sealCardMerge = 'Y' === self.form.cardMerge;
                self.sealLiceNo = '' !== self.form.liceNo;
                self.sealRegNo = '' !== self.form.regNo;
                self.sealOrgNo = '' !== self.form.orgNo;
            });

            self.linkTypeOptions = jnConstant.get(5018);

            self.submit = function () {
                jnForm.validate(self.editForm).then(function () {
                    var args = jnHelper.merge(self.form, {
                        businessStartDt: jnForm.rspDateFromJsDate(
                            self.form.businessStartDt),
                        custAddr: self.form.addressEnb,
                        custType: 1,
                        custTypeTmp: 1,
                    });

                    if ('Y' === args.cardMerge) {
                        args.paperType = 11;
                        args.paperNoTmp = args.liceNo;
                        args.regNo = '';
                        args.orgNo = '';
                        args.paperNo = '';

                    } else {
                        args.paperType = 10;
                        args.paperNoTmp = args.regNo;
                        args.liceNo = args.orgNo;
                    }

                    jnCustomerGLR.createGLR(args).then(function () {
                        jnPage.modified = false;
                        jnHelper.alert('修改成功').then(function(rsp){
                            jnPage.back();
                        });
                    });
                });
            };
        }]
    );

})();

