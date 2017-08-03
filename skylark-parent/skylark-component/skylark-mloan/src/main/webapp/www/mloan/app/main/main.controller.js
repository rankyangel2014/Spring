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
            	self.menugroup = [];
                for ( var int = 0; int < rsp.length; int++) {
					if(int%3===0){
						self.menugroup[self.menugroup.length] = [];
					}
					self.menugroup[parseInt(int/3,10)][self.menugroup[parseInt(int/3,10)].length] = rsp[int];
				}
                var max = self.menugroup.length*3-rsp.length;
                for ( var int2 = 0; int2 < max; int2++) {
                	 var index = self.menugroup[self.menugroup.length-1].length;
                	 self.menugroup[self.menugroup.length-1][index] = {};
				}
            });
        }
    ])
    .controller(
    		'indexCtrl',
    		   ['$scope',
    		    '$state',
                'jnMenu',
    			'jnLogin',
    			'$ionicSideMenuDelegate',
                'jnSetGesturePwdPopover',
    			function($scope,$state, jnMenu, jnLogin, $ionicSideMenuDelegate, jnSetGesturePwdPopover) {
                    $scope.indexStyle = jnMenu.style === 'list'

    			    //取消【拖动内容弹出侧边栏】
    				$ionicSideMenuDelegate.canDragContent(false);
    				//注销用户
    				$scope.logout = function() {
    					jnLogin.logout();
    				};
    				//解除绑定
    				$scope.removeDeviceId = function() {
    					jnLogin.unbind();
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
