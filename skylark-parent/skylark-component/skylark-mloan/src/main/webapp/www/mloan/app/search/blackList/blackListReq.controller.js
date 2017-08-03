(function () {
    'use strict';

    angular
        .module('blackList')
        .controller('blackList.blackListCtrl',
            ['jnUser', '$stateParams', 'jnBlackListServer', 'jnHelper', '$scope', '$state',
                function (jnUser, $stateParams, jnBlackListServer, jnHelper, $scope, $state) {
                    var self = this;
                    var pf = jnHelper.PaginateFetcher(jnBlackListServer.readList)
                        .params($stateParams);

                    //customers页面交互
                    self.blackList = pf.records();

                    //跳转到个人客户：0，或者企业客户:1
                    $scope.custDetail = function (cust) {

                        if (cust.orgNo != jnUser.insttuId) {
                            return;
                        }

                        if (cust.custManagerNo != jnUser.userId) {
                            return;
                        }

                        if (cust.custType == '0') {
                            $state.go('custDetail', {
                                custNo: cust.custNo,
                                operType: 0,
                                from: '1'
                            });
                        }
                        if (cust.custType == '1') {
                            $state.go('entCustDetail', {
                                custNo: cust.custNo,
                                operType: 0,
                                from: '1'
                            });
                        }
                    };

                    self.more = function () {
                        pf.fetch().then(function (rsp) {
                            // 这里可以进一步处理
                        });
                    };

                    self.more();
                }]
        );

})();

