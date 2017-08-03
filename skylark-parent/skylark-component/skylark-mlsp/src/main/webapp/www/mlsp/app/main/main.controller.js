(function () {
'use strict';

angular
    .module('app')
    .controller('MainCtrl', [
        'jnMenu', 'jnMain','$ionicHistory',
        function (jnMenu, jnMain,$ionicHistory) {
            var self = this;

            self.style = jnMenu.style;

            $ionicHistory.clearCache();

            jnMain.readNoticeCount().then(function (rsp) {
                self.examCount = rsp.examCount;
                self.infoCount = rsp.infoCount;
            });

            jnMenu.items().then(function (rsp) {
                self.menuItems = rsp;
            })
        }
    ])
    .controller(
    		'indexCtrl',
    		   ['$scope',
    		    '$state',
                'jnMenu',
    			'jnLogin',
                'jnAnalysis',
    			'$ionicSideMenuDelegate',
                'jnSetGesturePwdPopover',
    			function($scope,$state, jnMenu, jnLogin, jnAnalysis, $ionicSideMenuDelegate, jnSetGesturePwdPopover) {
                    $scope.indexStyle = jnMenu.style === 'list'

    			    //取消【拖动内容弹出侧边栏】
    				$ionicSideMenuDelegate.canDragContent(false);
    				//注销用户
    				$scope.logout = function() {
                        jnAnalysis.send('LOGOUT');
    					jnLogin.logout().then(function () {
                            jnMenu.clear();
                        });
    				};
    				//解除绑定
    				$scope.removeDeviceId = function() {
                        jnAnalysis.send('UNBIND');
    					jnLogin.removeDeviceId().then(function () {
                            jnMenu.clear();
                        });
    				};
    				
    				$scope.changeIndexStyle = function() {
                        var style = jnMenu.style;

                        if (style === 'list') {
                            $scope.indexStyle = false;
                            jnMenu.style = 'grid';

                        } else{
                            $scope.indexStyle = true;
                            jnMenu.style = 'list';
                        }

    					$state.go('main', {}, { reload: true });
    				};

                    $scope.setGesturePwd = function () {
                        jnSetGesturePwdPopover.show();
                    };
    			} ]);

})();
