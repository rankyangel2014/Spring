(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('customer.GLREntAddCtrl', [
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

            self.form = {
                pCustNo: $stateParams.pCustNo,
                cardMerge: 'N',
            };

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

                    } else {
                        args.paperType = 10;
                        args.paperNoTmp = args.regNo;
                        args.liceNo = args.orgNo;
                    }

                    jnCustomerGLR.createGLR(args).then(function () {
                        jnPage.modified = false;
                        jnHelper.alert('新增成功').then(function(rsp){
                            jnPage.back();
                        });
                    });
                });
            };
        }]
    );

})();

