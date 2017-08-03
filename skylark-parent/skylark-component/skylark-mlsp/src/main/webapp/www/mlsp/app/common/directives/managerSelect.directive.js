(function () {
'use strict';

var makeOptTag = function (value, label) {
    var opt = document.createElement('option');
    opt.text = label;
    opt.value = value;
    return opt;
};

angular
    .module('common')
    .directive('jnManagerSelect', [
        'jnHttp', 'jnUser',
        function (jnHttp, jnUser) {
            var readManagers = function () {
                var deptId = '';
                var custManagerNo = '';

                if (jnUser.hasStation('500|566')){
                    deptId =  jnUser.deptId;
                } else if(jnUser.hasStation('400')){
                    deptId =  jnUser.deptId;
                    custManagerNo = jnUser.userId;
                }

                return jnHttp.post('/mlsp/router/rest.do?_transCode=QRY161', {
                    stationId: '400',
                    isUseCurOrgNo: 'true',
                    deptId: deptId,
                    userId: custManagerNo,
                }).then(function (rsp) {
                    return rsp.root.map(function (e) {
                        return {
                            id: e.userId,
                            name: e.userName,
                        };
                    });
                });
            };

            return {
                restrict: 'A',
                compile: function ($element, $attr) {
                    var placeholder = $attr.placeholder || '-- 请选择 --';
                    $element.append(makeOptTag('', placeholder));

                    return function ($scope, $element, $attr) {
                        readManagers().then(function (rsp) {
                            rsp.forEach(function (e) {
                                $element.append(makeOptTag(e.id, e.name));
                            });
                        });
                    };
                },
            };
        }
    ]);

})();
