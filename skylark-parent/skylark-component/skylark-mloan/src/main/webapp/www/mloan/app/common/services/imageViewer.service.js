(function () {
'use strict';
angular
    .module('common')
    .factory('jnImageViewer', [
        '$rootScope',
        '$q',
        '$sce',
        '$ionicPopup',
        '$ionicModal',
        'jnHelper',
        'jnApp',
        function (
            $rootScope,
            $q,
            $sce,
            $ionicPopup,
            $ionicModal,
            jnHelper,
            jnApp
        ) {
            var service = {};

            var loadImage = function (loader, image) {
                loader(image).then(function (src) {
                    //image.src = $sce.trustAsResourceUrl(src);
                    image.src = src;
                });
            };

            service.open = function (opt) {
                var scope = $rootScope.$new();
                var images = opt.images.slice();

                scope.__controller__ = 'ImageViewer';
                scope.current = scope.startAt = opt.startAt || 0;
                scope.buttons = [];
                scope.toolbarVisibility = 'hidden';

                scope.makePage = function (i) {
                    var _scope;

                    if (i < 0 || images.length <= i) {
                        return null;
                    }

                    _scope = scope.$new();
                    _scope.image = images[i];

                    loadImage(opt.loadImage, _scope.image);

                    return ['\
                        <jn-img\
                            style="width: 100%; height: 100%;"\
                            src="image.src"\
                        ></jn-img>', _scope];
                };

                scope.onChange = function (i) {
                    scope.title = images[i].name;
                    scope.current = i;
                    scope.$apply();
                };

                scope.toggleToolbars = function () {
                    if ('hidden' === scope.toolbarVisibility) {
                        scope.toolbarVisibility = 'visible';
                    } else {
                        scope.toolbarVisibility = 'hidden';
                    }
                };

                scope.quit = function () {
                    jnApp.restoreOnBackBtn();
                    scope.modal.hide();
                };

                images.forEach(function (e) {
                    loadImage(opt.loadThumb, e);
                });

                jnApp.onBackBtn(scope.quit);

                $ionicModal.fromTemplateUrl(
                    'app/common/services/imageViewer.html', {
                        scope: scope,
                        backdropClickToClose: false,

                    }).then(function (modal) {
                        scope.modal = modal;
                        modal.show();
                    });

                return {
                    setTitle: function (text) {
                        scope.title = text;
                    },

                    setButtons: function (buttons) {
                        scope.buttons = buttons.map(function (e) {
                            return {
                                content: e.content,
                                onClick: function () {
                                    e.onClick(images[scope.current]);
                                },
                            };
                        });
                    },

                    eraseCurrent: function () {
                        images.splice(scope.current, 1);

                        if (0 === images.length) {
                        // 删除的是最后一张图片

                            // 退出
                            scope.modal.hide();

                        } else if (scope.current < images.length) {
                        // 删除的不是末尾

                            // 显示下一张
                            scope.slideManager.current = scope.current

                        } else {
                        // 删除的是末尾

                            // 显示上一张
                            scope.slideManager.current = scope.current - 1
                        }
                    },
                };
            };

            return service;
        }]
    );
})();
