(function () {
'use strict';

angular
    .module('common')
    .directive('jnSelectTeam', [
        'jnHttp',
        function (
            jnHttp
        ) {
            var readTeams = function () {
                return jnHttp.post(
                    '/mloan/router/rest/param.do?method=getDeptInfoSByOrgId'
                ).then(function (rsp) {
                    return rsp.root.map(function (e) {
                        return {
                            id: e.deptId,
                            name: e.deptName,
                        };
                    });
                });
            };

            return {
                template: '\
<select\
    name="{{ name }}"\
    ng-model="ngModel"\
    ng-disabled="ngDisabled"\
    ng-required="ngRequired"\
>\
    <option value="">-- 请选择 --</option>\
    <option\
        ng-repeat="e in options"\
        value="{{ e.id }}"\
    >{{ e.name }}</option>\
</select>',

                restrict: 'E',

                scope: {
                    name: '@',
                    ngModel: '=',
                    ngDisabled: '=',
                    ngRequired: '=',
                },

                link: function ($scope, $element, $attr) {
                    readTeams().then(function (rsp) {
                        $scope.options = rsp;
                    });
                },
            };
        }
    ]);

})();
