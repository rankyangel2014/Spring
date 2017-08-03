(function (exports){
'use strict';

// {{{ namespaces

var jn = {
    obj: {},
    fn: {},
    angular: {},
    util: {},
};

// }}}
// {{{ Error

(function () {
    function jnError(message) {
        this.name = 'jnError';
        this.message = message;
        this.stack = (new Error()).stack;
    };

    jnError.prototype = Object.create(Error.prototype);
    jnError.prototype.constructor = jnError;

    jn.Error = jnError;
})();

// }}}
// {{{ mix()

jn.mix = function () {
    var mixed = {};

    Array.prototype.forEach.call(arguments, function (e) {
        var k;

        for (k in e) {
            mixed[k] = e[k];
        }
    });

    return mixed;
};

// }}}
// {{{ fn.body()

jn.fn.body = function (fn) {
    return fn.toString().replace(
        /^[\s\S]*?\{([\s\S]*)\}[\s\S]*$/, '$1');
};

// }}}
// {{{ obj.setAttr()

jn.obj.setAttr = function (obj, path, value) {
    var names = path.split('.');
    var i;

    for (i = 0; i < names.length - 1; i += 1) {
        obj = obj[names[i]];
    }

    obj[names[i]] = value;
};

// }}}
// {{{ angular.findCtrlScope()

jn.angular.findCtrlScope = function (scope) {
    var p = scope;

    while (p) {
        if (p.hasOwnProperty('__controller__')) {
            break;
        }

        p = p.$parent;
    }

    return p;
};

// }}}
// {{{ angular.page() / framePage() / nestedPage()

(function () {
    var joinUrl = function (url, params) {
        if (params && 0 < params.length) {
            url += '?' + params.join('&');
        }

        return url;
    };

    var nameFromUrl = function (url) {
        return url.slice(1).split('/').map(function (e) {
            return e[0].toUpperCase() + e.slice(1);
        }).join('');
    };

    var enchantCtrlFn = function (name, inject, fn) {
        var ctrlFn = eval('\
            (function (' + inject.join() + ') {\
                $scope.__controller__ = \'' + name + '\';\
                fn.apply(this, arguments);\
            })\
        ');

        ctrlFn.$inject = inject;
        return ctrlFn;
    };

    var enchantController = function (name, ctrl) {
        var inject = ctrl.slice(0, -1);
        var fn = ctrl[ctrl.length - 1];
        return enchantCtrlFn(name, inject, fn);
    };

    jn.angular.page = function (opt) {
        var pageName = opt.state || nameFromUrl(opt.url);
        var ctrl = enchantController(pageName, opt.controller);
        var tmpl = opt.template || 'app' + opt.url + '.page.html';
        var params = opt.params || [];

        angular
            // @TODO 改用用 window.APP_ID
            .module('app')
            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider.state(pageName, {
                        url: joinUrl(opt.url, params),
                        templateUrl: tmpl,
                        controller: pageName,
                        cache: opt.cache || false,
                        reloadOnSearch: opt.reloadOnSearch || false,
                        jnBackTo: opt.backTo,
                    });
                }
            ])
            .controller(pageName, ctrl);
    };

    jn.angular.framePage = function (opt) {
        var pageName = opt.state || nameFromUrl(opt.url);
        var tmpl = opt.template || 'app' + opt.url + '.page.html';
        var params = opt.params || [];

        angular
            // @TODO 改用用 window.APP_ID
            .module('app')
            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider.state(pageName, {
                        url: joinUrl(opt.url, params),
                        templateUrl: tmpl,
                        jnVirtual: true,
                        cache: opt.cache || false,
                        reloadOnSearch: opt.reloadOnSearch || false,
                    });
                }
            ]);
    };

    jn.angular.nestedPage = function (opt) {
        var pState = opt.parent;
        var pageName = opt.state || nameFromUrl(opt.url);
        var ctrl = enchantController(pState + pageName, opt.controller);
        var tmpl = opt.template || 'app' + opt.url + '.page.html';
        var params = opt.params || [];

        angular
            // @TODO 改用用 window.APP_ID
            .module('app')
            .config([
                '$stateProvider',
                function ($stateProvider) {
                    var views = {};
                    views[pageName] = {
                        templateUrl: tmpl,
                        controller: pState + pageName,
                    };

                    $stateProvider.state(pState + '.' + pageName, {
                        url: joinUrl(opt.url, params),
                        views: views,
                        cache: opt.cache || false,
                        reloadOnSearch: opt.reloadOnSearch || false,
                        jnBackTo: opt.backTo,
                    });
                }
            ])
            .controller(pState + pageName, ctrl);
    };
})();

// }}}
// {{{ util.extFromFilename()

/**
 * 从文件名中提取扩展名
 *
 * 支持包含路径的全名
 * 只提取最后一个 '.'（不包含 '.'）后的扩展名
 * 总是返回小写字符串
 * 如果没有扩展名，返回空字符串
 */
jn.util.extFromFilename = function (filename) {
    return filename.replace(/^[^.]*$|^.*\.([^.]*)$/, '$1').toLowerCase();
}

// }}}
// {{{ util.splitFilename()

/**
 */
jn.util.splitFilename = function (filename) {
    var match = filename.match(/(.*)\.(.*)/);

    if (match) {
        return match.slice(1);
    }

    return [filename, ''];
}

// }}}
// {{{ util.guid()

/**
 */
jn.util.guid = (function () {
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16).substring(1);
    };

    return function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4()
            + '-' + s4() + s4() + s4();
    }
})();

// }}}
// {{{ util.joinPath()

/**
 */
jn.util.joinPath = function () {
    var first = arguments[0];
    var last = arguments[arguments.length - 1];
    var middle = Array.prototype.slice.call(arguments, 1, -1);

    first = first.replace(/(.*)\/$/, '$1');
    last = last.replace(/^\/(.*)/, '$1');

    if (0 < middle.length) {
        middle = middle.map(function (e) {
            return e.replace(/^\/?(.*?)\/?$/, '$1');
        });

        return first + '/' + middle.join('/') + '/' + last;
    }

    return first + '/' + last;
};

// }}}
// {{{ util.onTransitionEnd() / offTransitionEnd()

(function () {
    var eventName = (function () {
        var transitions = {
            transition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd',
        };

        var el = new Image();

        var p;

        for (p in transitions) {
            if (el.style[p] !== undefined) {
                return transitions[p];
            }
        }
    })();

    jn.util.onTransitionEnd = function (el, listener) {
        el.addEventListener(eventName, listener);
    };

    jn.util.offTransitionEnd = function (el, listener) {
        el.removeEventListener(eventName, listener);
    };

    jn.util.oneTransitionEnd = function (el, listener) {
        var wrappedListener = function (e) {
            jn.util.offTransitionEnd(el, wrappedListener);
            listener(e);
        };

        el.addEventListener(eventName, wrappedListener);
    };
})();

// }}}

exports.jn = jn;

})(window);
