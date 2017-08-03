(function () {
'use strict';

angular
    .module('remind')
    .controller('remind.EntryCtrl',
        ['jnRemind',
        function (jnRemind) {
            var self = this;

            jnRemind.readGroups()
                .then(function (groups) {
                    self.groups = groups;
                });
        }]
    );

})();

