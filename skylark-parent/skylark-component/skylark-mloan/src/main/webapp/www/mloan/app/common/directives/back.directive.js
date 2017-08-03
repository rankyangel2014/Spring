(function () {
'use strict';

angular
    .module('common')
    .directive('jnBack', [
        'jnPage',
        'jnHelper',
        function (
            jnPage,
            jnHelper
        ) {
            return {
                template: '\
<button\
    class="button button-clear ion-chevron-left jnBack"\
>返回</button>',

                restrict: 'E',

                link: function ($scope, $element, $attr) {
                    var el = $element[0];

                    el.addEventListener('click', function () {
                        jnPage.back();
                    });

                    (function () {
                        var hammer = new Hammer(el);

                        hammer.get('press').set({
                            time: 1000,
                        });

                        hammer.on('press', function (e) {
                            jnHelper.confirm('是否返回首页？')
                                .then(function (confirmed) {
                                    if (confirmed) {
                                        jnPage.backTo('main');
                                    }
                                });
                        });

                        hammer.on('pressup', function (e) {
                            // 避免触发 click 事件
                            e.srcEvent.stopPropagation();
                        });
                    })();
                },
            };
        }]
    );

})();
