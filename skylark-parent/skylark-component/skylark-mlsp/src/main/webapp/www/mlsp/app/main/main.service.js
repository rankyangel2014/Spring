(function () {
'use strict';

angular
    .module('app')
    .factory('jnMain', [
        '$q', 'jnHttp', 'jnUser', 'jnStorage',
        function ($q, jnHttp, jnUser, jnStorage) {
            return {
                readNoticeCount: function () {
                    var params = {
                        method: 'getCount',
                        userId: jnUser.userId,
                        stationId: jnUser.stationId,
                        zwrq: jnUser.jyrq,
                    };

                    return jnHttp.post('/skylark/MaspService.do', params);
                },
            };
        }
    ]);

})();
