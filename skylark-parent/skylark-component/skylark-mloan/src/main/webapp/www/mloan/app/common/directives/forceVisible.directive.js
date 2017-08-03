(function () {
'use strict';

angular
    .module('common')
    .directive('jnForceVisible', [
        function (
        ) {
            return {
                restrict: 'A',

                link: function ($scope, $element, $attr) {
                    var margin = parseInt($attr.margin) || 20;
                    var elem = $element[0];
                    var container;

                    var forceVisible = function (offset) {
                        var pos;

                        container = elem;

                        while (document.body !== container) {
                            pos = window.getComputedStyle(container).position;

                            if (-1 < ['absolute', 'fixed'].indexOf(pos)) {
                                container.style.transform =
                                container.style.webkitTransform =
                                    'translateY(' + (offset - margin) + 'px)';

                                break;
                            }

                            container = container.parentElement;
                        }
                    };

                    var onKbShow = function () {
                        // 窗体高度
                        var wh = window.innerHeight;

                        // 焦点元素底部与窗体底部的垂直距离
                        var fb = wh - elem.getBoundingClientRect().bottom;

                        if (fb < margin) {
                            forceVisible(fb);
                        } else {
                            container = null;
                        }
                    };

                    var onKbHide = function () {
                        if (container) {
                            container.style.transform =
                            container.style.webkitTransform = '';
                        }
                    };

                    window.addEventListener('native.keyboardshow', onKbShow);
                    window.addEventListener('native.keyboardhide', onKbHide);

                    $scope.$on('$destroy', function () {
                        window.removeEventListener(
                            'native.keyboardshow', onKbShow);
                        window.removeEventListener(
                            'native.keyboardhide', onKbHide);
                    });
                },
            };
        }
    ]);

})();
