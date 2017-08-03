(function () {
'use strict';
angular
    .module('app')
    .factory('jnDocImageViewer', [
        '$rootScope',
        '$q',
        '$sce',
        '$ionicPopup',
        '$ionicModal',
        'jnHelper',
        'jnApp',
        'jnImageViewer',
        function (
            $rootScope,
            $q,
            $sce,
            $ionicPopup,
            $ionicModal,
            jnHelper,
            jnApp,
            jnImageViewer
        ) {
            var service = {};

            var scope = $rootScope.$new();

            var popupRename = function (image) {
                scope.newName = {
                    value: image.name.replace(/\.[^.]+$/, ''),
                };

                return $ionicPopup.show({
                    template: '\
                        <input\
                            type="text"\
                            ng-model="newName.value"\
                            jn-force-visible\
                        />',
                    title: '请输入新文件名',
                    subTitle: '扩展名会根据文件类型自动添加，请不要手工输入',
                    scope: scope,
                    buttons: [{
                        text: '取消',
                    }, {
                        text: '确定',
                        type: 'button-positive',
                        onTap: function () {
                            return scope.newName.value;
                        },
                    }],
                });
            };

            var makeRename = function (viewer, before, rename) {
                return function (image) {
                    (before || popupRename)(image, popupRename)
                        .then(function (newName) {
                            if (newName) {
                                image.name = image.name.replace(
                                    /.+(?=\.[^.]+$)/, newName);

                                rename(image);
                                viewer.setTitle(image.name);
                            }
                        });
                };
            };

            var confirmRemove = function (image) {
                var msg = '确实要删除图片' + image.name + '吗？';
                return jnHelper.confirm(msg)
                    .then(function (confirmed) {
                        if (! confirmed) {
                            return $q.reject();
                        }
                    });
            };

            var makeRemove = function (viewer, before, remove) {
                return function (image) {
                    (before || confirmRemove)(image, confirmRemove)
                        .then(function () {
                            viewer.eraseCurrent();
                            remove(image);
                        });
                };
            };

            service.open = function (opt) {
                var buttons = [];
                var viewer;

                opt.startAt = opt.images.indexOf(opt.current);

                viewer = jnImageViewer.open(opt);

                if (opt.rename) {
                    buttons.push({
                        content: '<i class="icon ion-compose"></i>',
                        onClick: makeRename(
                            viewer, opt.beforeRename, opt.rename),
                    });
                }

                if (opt.remove) {
                    buttons.push({
                        content: '<i class="icon ion-ios-trash"></i>',
                        onClick: makeRemove(
                            viewer, opt.beforeRemove, opt.remove),
                    });
                }

                viewer.setButtons(buttons);
            };

            return service;
        }]
    );
})();
