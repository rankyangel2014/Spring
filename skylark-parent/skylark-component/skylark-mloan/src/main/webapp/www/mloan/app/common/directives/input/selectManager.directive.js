(function () {
'use strict';

angular
    .module('common')
    .directive('jnSelectManager', [
        'jnHttp',
        function (
            jnHttp
        ) {
            var readManagers = function (teamId) {
                return jnHttp.post(
                    '/mloan/router/rest/param.do?method=getCustManagerInfosByDeptIds',
                    {
                        deptId: teamId,
                    }
                ).then(function (rsp) {
                    return rsp.root.map(function (e) {
                        return {
                            id: e.userId,
                            name: e.userName,
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
                    team: '=',
                },

                link: function ($scope, $element, $attr) {
                    var update = function () {
                        readManagers($scope.team).then(function (rsp) {
                            $scope.options = rsp;
                        });
                    };

                    $scope.$watch('team', update);
                },
            };
        }
    ]);

})();
