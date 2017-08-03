(function () {
'use strict';

jn.angular.nestedPage({
    parent: 'DocTransfer',
    url: '/history',
    template: 'app/doc/transferHistory.page.html',
    backTo: 'DocUpload',
    controller: [
        '$scope',
        '$q',
        'jnApp',
        'jnDocImage',
        'jnDocImageViewer',
        'jnDocHistory',
        function (
            $scope,
            $q,
            jnApp,
            jnDocImage,
            jnDocImageViewer,
            jnDocHistory
        ) {
            $scope.files = jnDocHistory.files;

            $scope.files.forEach(function (f) {
                f.thumb = jn.util.joinPath(jnApp.baseUrl, f.thumbUrl);
            });

            $scope.viewImage = function (image) {
                jnDocImageViewer.open({
                    images: $scope.files,
                    current: image,

                    loadImage: function (image) {
                        return $q(function (resolve, reject) {
                            resolve(jn.util.joinPath(
                                jnApp.baseUrl, image.url));
                        });
                    },

                    loadThumb: function (image) {
                        return $q(function (resolve, reject) {
                            resolve(jn.util.joinPath(
                                jnApp.baseUrl, image.thumbUrl));
                        });
                    },
                });
            };

            $scope.clear = function () {
                jnDocHistory.clear();
            }
        }
    ]
});
})();

