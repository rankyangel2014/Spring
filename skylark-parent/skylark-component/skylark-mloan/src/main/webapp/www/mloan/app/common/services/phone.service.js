/**
 * 电话功能
 */

(function() {
'use strict';

angular
    .module('common')
    .factory('jnPhone', [
        '$q',
        '$cordovaSms',
        function (
            $q,
            $cordovaSms
        ) {
            return {
                call: function (num) {
                    return $q(function (resolve, reject) {
                        window.plugins.CallNumber.callNumber(
                            resolve, reject, num);
                    });

                },

                sms: function (num, text) {
                    text = text || '';

                    return $cordovaSms.send(num, text, {
                        replaceLineBreaks: true,
                        android: {
                            intent: 'INTENT',
                        },
                    });
                },
            };
        }
    ]);

})();
