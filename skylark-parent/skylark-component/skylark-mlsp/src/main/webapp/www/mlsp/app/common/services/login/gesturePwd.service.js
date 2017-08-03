/**
 * 手势密码管理
 */

(function() {
'use strict';

angular
    .module('common')
    .factory('jnGesturePwd', [
        'jnStorage',
        function (jnStorage) {
            var STO_KEY = 'mlsp.gesture';

            var savedPwd = jnStorage.get(STO_KEY);
            var lastSetPwd;

            var checkPwd = function (pwd) {
                return savedPwd === pwd;
            };

            var isSet = function () {
                return savedPwd !== null;
            };

            var setPwd = function (pwd) {
                lastSetPwd = pwd;
            };

            var setPwdAgain = function (pwd) {
                if (lastSetPwd && lastSetPwd === pwd) {
                    savedPwd = pwd;
                    lastSetPwd = null;
                    jnStorage.set(STO_KEY, pwd);

                    return true;
                }

                lastSetPwd = null;
                return false;
            };

            var clear = function () {
                savedPwd = null;
                jnStorage.remove(STO_KEY);
            };

            return {
                clear: clear,
                checkPwd: checkPwd,
                isSet: isSet,
                setPwd: setPwd,
                setPwdAgain: setPwdAgain,
            };
    }]);

})();
