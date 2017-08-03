(function () {
'use strict';

angular
    .module('remind')
    .controller('remind.ListCtrl',
        ['$state', '$stateParams', '$ionicListDelegate', 'jnRemind', 'jnHelper',
        function ($state, $stateParams, $ionicListDelegate, jnRemind, jnHelper) {
            var self = this;
            var pf = jnHelper.PaginateFetcher(jnRemind.readMessages)
                .limitParam('pageLimit')
                .params($stateParams);

            $state.current.jnBackTo = $stateParams.backTo || 'remind';

            self.messageName = $stateParams.messageName;
            self.messages = pf.records();

            self.more = function () {
                pf.fetch();
            };

            self.setRead = function (msgId) {
                jnRemind.setRead({
                    messageId: msgId,
                }).then(function () {
                    self.messages.items.some(function (e, i, arr) {
                        if (e.messageId === msgId) {
                            arr.splice(i, 1);
                            return true;
                        }
                    });

                    self.messages.total -= 1;
                    pf.start -= 1; // 避免漏查数据
                });
            };

            self.setTop = function (msgId) {
                jnRemind.setTop({
                    msgId: msgId,
                }).then(function () {
                    $ionicListDelegate.closeOptionButtons();

                    self.messages.items.some(function (e, i, arr) {
                        if (e.messageId === msgId) {
                            e.operFlag = '1';
                            return true;
                        }
                    });
                });
            };

            self.unsetTop = function (msgId) {
                jnRemind.unsetTop({
                    msgId: msgId,
                }).then(function () {
                    $ionicListDelegate.closeOptionButtons();

                    self.messages.items.some(function (e, i, arr) {
                        if (e.messageId === msgId) {
                            e.operFlag = '0';
                            return true;
                        }
                    });
                });
            };

            self.more();
        }]
    );

})();

