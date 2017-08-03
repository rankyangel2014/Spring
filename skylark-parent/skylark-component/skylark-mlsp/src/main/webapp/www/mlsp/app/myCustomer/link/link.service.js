(function () {
'use strict';

angular
    .module('myCustomer')
    .factory('jnCustomerLink', [
        'jnHttp',
        'jnHelper',
        function (
            jnHttp,
            jnHelper
        ) {
            return {
                readList: function (params) {
                    return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=QRY253', params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                },

                create: function (params) {
                    params = jnHelper.merge(params, {
                        operate: 0,
                        linkStatus: 0,
                    });

                    return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=CUST_REL_UPDATE',
                        params);
                },

                update: function (params) {
                    params = jnHelper.merge(params, {
                        operate: 1,
                        linkStatus: 0,
                    });

                    return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=CUST_REL_UPDATE',
                        params);
                },

                'delete': function (params) {
                    return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=CUST_REL_DEL',
                        params);
                },
            };
        }]
    );

})();
