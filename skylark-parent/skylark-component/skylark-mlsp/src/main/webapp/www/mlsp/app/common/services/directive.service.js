(function () {
'use strict';

angular
    .module('common')
    .factory('jnDirective', [
        function () {
            return {
                copyAttr: function ($attr, elem, exclude) {
                    var p, name, value;

                    exclude = exclude || [];

                    for (p in $attr.$attr) {
                        if (exclude.indexOf(p) < 0) {
                            name = $attr.$attr[p];
                            value = $attr[p];
                            elem.setAttribute(name, value);
                        }
                    }
                },
            };
        }
    ]);

})();

