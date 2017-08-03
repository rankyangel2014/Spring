(function () {
'use strict';

angular
    .module('app')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function (
            $stateProvider,
            $urlRouterProvider
        ) {
            $stateProvider.state('bootstrap', {
                url: '/',
                cache:'false',
                controller: 'Bootstrap',
            });

            $urlRouterProvider.otherwise('/');
        }
    ])
    .controller('Bootstrap', [
        '$cordovaSplashscreen',
        'jnPage',
        'jnLogin',
        'jnLoginPopover',
        'jnGestureLoginPopover',
        function (
            $cordovaSplashscreen,
            jnPage,
            jnLogin,
            jnLoginPopover,
            jnGestureLoginPopover
        ) {
            document.addEventListener('deviceready', function () {
                $cordovaSplashscreen.hide();
                window.openOuterUrl = cordova.InAppBrowser.open;
            });

            if (jnLogin.isGestureSet()) {
                jnGestureLoginPopover.open().then(function () {
                    jnPage.go('main');
                });
            }
            else {
                jnLoginPopover.open().then(function () {
                    jnPage.go('main');
                });
            }
        }
    ]);
})();
