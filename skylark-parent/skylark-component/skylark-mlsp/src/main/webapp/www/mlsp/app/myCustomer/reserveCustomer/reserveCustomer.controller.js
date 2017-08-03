(function() {
    'use strict';
    angular
            .module('myCustomer')
            .controller(
                    // 储备客户查询
                    'ReserveCustomerQueryCtrl',
                    [ '$state', '$stateParams',
                      '$scope', 'jnReserveCustomerService',
                      'jnForm', 'jnHelper','jnUser',
                        function($state, $stateParams, $scope,
                                jnReserveCustomerService, jnForm, jnHelper,jnUser) {
                            var self = this;
                            self.form = {};
                            if (jnUser.hasStation('400')) {
                                $scope.isManager=true;
                            }
                            self.submit = function() {
                                jnForm.validate(self.myForm).then(
                                    function() {
                                        $state.go( 'reserveCustomerList', self.form);
                                });
                            };

                        } ])
            .controller(
                    // 储备客户新增
                    'ReserveCustomerAddCtrl',
                    [ '$state', '$stateParams',
                      '$scope', 'jnReserveCustomerService',
                      'jnForm', 'jnHelper',
                      'jnStorage', '$ionicPopup',
                      '$filter', 'jnPage',
                       function($state, $stateParams, $scope, jnReserveCustomerService, 
                                    jnForm, jnHelper,jnStorage,$ionicPopup,$filter,jnPage) {
                                var self = this;
                                $scope.it = {
                                    'inTrade' : '',
                                    'custName' : '',
                                    'custNo' : '',
                                    'sex' : 'M',
                                    'isJuridical' : '0',
                                    'orgForm' : '',
                                    'enbName' : '',
                                    'loanAmt' : '',
                                    'loanUse' : '',
                                    'period' : '',
                                    'loanRate' : '',
                                    'phoneNo' : '',
                                    'custAddr' : '',
                                    'adTypeId' : '',
                                    'referrer' : '',
                                    'adTitle' : '',
                                    'remark' : '',
                                };
                                $scope.it.isJuridicalChecked=true;
                                $scope.devList = [];
                                var p, object =  jnStorage.get('mlsp.constants')['9999'];
                                for(p in object){
                                    var obj = {};
                                    obj.paramKey=p;
                                    obj.paramValue=object[p];
                                    obj.checked=false ;
                                    $scope.devList.push(obj);
                                }
                                $scope.alertPop = function() {
                                    var myPopup = $ionicPopup
                                            .show({
                                                template : '<ion-scroll zooming="true" scrollbar-x="false" direction="y" style="height:300px;width:240px;"><div id="syxz" style="height:300px;width:240px;"> <ion-checkbox  ng-repeat="item in devList" ng-model="item.checked" ng-checked="item.checked" style="font-size: 14px;">{{item.paramValue}} </ion-checkbox></div></ion-scroll>',
                                                title : '从事行业选择',
                                                scope : $scope,
                                                buttons : [ {
                                                    text : '关闭'
                                                }, {
                                                    text : '<b>确定</b>',
                                                    type : 'button-positive',
                                                    onTap : function(e) {
                                                        return  $scope.devList.filter(function(data){
                                                            return data.checked;
                                                        });
                                                    }
                                                } ]
                                            });
                                    myPopup.then(function(res) {
                                        if(res){
                                            var checkedList = '';
                                            var checkedListName = '';
                                            res.forEach(function(d){
                                                checkedList+=d.paramKey+',';
                                                checkedListName+=d.paramValue+',';
                                            });
                                            checkedList = checkedList.substring(0,checkedList.length-1);
                                            $scope.it.inTrade=checkedList;
                                            $scope.it.inTradeName=checkedListName;
                                        }
                                    });
                                };
                                $scope.checked = {
                                    "dkyx" : false,// 贷款意向
                                    "frxx" : false,// 法人信息
                                    "xxtj" : false,// 信息途径
                                };
                                $scope.toggleItem = function(p) {
                                    if ($scope.checked[p]) {
                                        $scope.checked[p] = false;
                                    } else {
                                        $scope.checked[p] = true;
                                    }
                                };
                                $scope.change = function(p) {
                                    if (!p) {
                                        $scope.it.orgForm = '';
                                        $scope.it.enbName = '';
                                    }
                                };
                                $scope.save = function() {
                                    jnForm.validate(self.myForm)
                                    .then(function() {
                                        jnReserveCustomerService
                                           .addPreCustBaseInfo(self.myForm)
                                           .then(function( rsp) {
                                                    if (rsp.success) {
                                                        $scope.it = rsp.data;
                                                        $scope.it.inTradeName=$filter('jnConstant')($scope.it.inTrade,9999);
                                                        if ($scope.it.isJuridical == '0') {
                                                            $scope.it.isJuridicalChecked = true;
                                                        } else {
                                                            $scope.it.isJuridicalChecked = false;
                                                        }
                                                        jnHelper.alert('保存成功！').then(function(){
                                                            jnPage.modified=false;
                                                            history.back();
                                                        });
                                                    } else {
                                                        jnHelper.alert(rsp.errMsg);
                                                    }
                                              });
                                    });
                            };
                        } ])
            .controller(
                    // 储备客户编辑
                    'ReserveCustomerEditCtrl',
                    [ '$state', '$stateParams', 
                      '$scope', 'jnReserveCustomerService',
                      'jnHelper', 'jnForm',
                      'jnStorage', '$filter',
                      '$ionicPopup', 'jnPage',
                            function($state, $stateParams, $scope,
                                    jnReserveCustomerService, jnHelper, jnForm,
                                    jnStorage, $filter,$ionicPopup,jnPage) {
                                var self = this;
                                $scope.checked = {
                                    "dkyx" : false,// 贷款意向
                                    "frxx" : false,// 法人信息
                                    "xxtj" : false,// 信息途径
                                };
                                $scope.toggleItem = function(p) {
                                    if ($scope.checked[p]) {
                                        $scope.checked[p] = false;
                                    } else {
                                        $scope.checked[p] = true;
                                    }
                                };
                                $scope.change = function(p) {
                                    if (!p) {
                                        $scope.it.orgForm = '';
                                        $scope.it.enbName = '';
                                    }
                                };
                                $scope.save = function() {
                                    jnForm.validate(self.myForm)
                                        .then(function() {
                                           jnReserveCustomerService.modifyPreCustBaseInfo(self.myForm)
                                            .then(function(rsp) {
                                                if (rsp.success) {
                                                    $scope.it = rsp.data;
                                                    $scope.it.inTradeName=$filter('jnConstant')($scope.it.inTrade,9999);
                                                    if ($scope.it.isJuridical == '0') {
                                                        $scope.it.isJuridicalChecked = true;
                                                    } else {
                                                        $scope.it.isJuridicalChecked = false;
                                                    }
                                                    jnHelper.alert('保存成功！').then(function(){
                                                        jnPage.modified=false;
                                                        history.back();
                                                    });
                                                } else {
                                                    jnHelper.alert(rsp.errMsg);
                                                }
                                            });
                                        });
                                };
                               $scope.devList = [];
                               var  p,object =  jnStorage.get('mlsp.constants')['9999'];
                               for(p in object){
                                   var obj = {};
                                   obj.paramKey=p;
                                   obj.paramValue=object[p];
                                   obj.checked=false ;
                                   $scope.devList.push(obj);
                               }
                               
                                $scope.alertPop = function() {
                                    var myPopup = $ionicPopup
                                            .show({
                                                template : '<ion-scroll zooming="true" scrollbar-x="false" direction="y" style="height:300px;width:240px;"><div id="syxz" style="height:300px;width:240px;"> <ion-checkbox  ng-repeat="item in devList" ng-model="item.checked" ng-checked="item.checked" style="font-size: 14px;">{{item.paramValue}} </ion-checkbox></div></ion-scroll>',
                                                title : '从事行业选择',
                                                scope : $scope,
                                                buttons : [ {
                                                    text : '关闭'
                                                }, {
                                                    text : '<b>确定</b>',
                                                    type : 'button-positive',
                                                    onTap : function(e) {
                                                        return  $scope.devList.filter(function(data){
                                                            return data.checked;
                                                        });
                                                    }
                                                } ]
                                            });
                                    myPopup.then(function(res) {
                                        if(res){
                                            var checkedList = '';
                                            var checkedListName = '';
                                            res.forEach(function(d){
                                                checkedList+=d.paramKey+',';
                                                checkedListName+=d.paramValue+',';
                                            });
                                            checkedList = checkedList.substring(0,checkedList.length-1);
                                            $scope.it.inTrade=checkedList;
                                            $scope.it.inTradeName=checkedListName;
                                        }
                                    });
                                };
                                jnReserveCustomerService.getPreCustInfo(
                                        $stateParams).then(function(rsp) {
                                    $scope.it = rsp.items[0];
                                    $scope.it.inTradeName=$filter('jnConstant')($scope.it.inTrade,9999);
                                    if ($scope.it.isJuridical == '0') {
                                        $scope.it.isJuridicalChecked = true;
                                    } else {
                                        $scope.it.isJuridicalChecked = false;
                                    }

                                });
                            } ])
            .controller(
                    // 储备客户列表显示
                    'ReserveCustomerCtrl',
                    [   '$state', '$stateParams',
                        '$scope', 'jnReserveCustomerService',
                        'jnHelper', 'jnUser','$ionicPopup','$ionicPopover',
                            function($state, $stateParams, $scope,
                                    jnReserveCustomerService, jnHelper,jnUser,$ionicPopup,$ionicPopover) {
                                var self = this;
                                if (jnUser.hasStation('400')) {
                                    $scope.isManager=true;
                                }else{
                                    $scope.isManager=false;
                                }
                               
                                $ionicPopover.fromTemplateUrl('app/myCustomer/reserveCustomer/popover.html', {
                                    scope: $scope,
                                    hardwareBackButtonClose:true,
                                    backdropClickToClose:true
                                }).then(function(popover) {
                                    $scope.popover = popover;
                                });

                                $scope.openPopover = function($event) {
                                    $scope.popover.show($event);
                                };
                                 
                                $scope.colsePopover = function($event) {
                                	$scope.popover.remove();
                                };
                                 
                                $scope.$on('$destroy', function() {
                                     $scope.popover.remove();
                                });
                                var pf = undefined ;
                                if(!$scope.isManager){
                                    
                                    pf = jnHelper.PaginateFetcher(
                                            jnReserveCustomerService.getAvailablePreCustInfo)
                                            .params($stateParams);
                                }else{
                                    pf = jnHelper
                                        .PaginateFetcher(
                                                jnReserveCustomerService.getPreCustInfos)
                                        .params($stateParams);
                                }
                                $scope.it = pf.records();
                                
                                self.jump = function(state) {
                                    $state.go(state, {
                                        oprFlag : new Date().getTime()
                                    });
                                };

                                $scope.more = function() {
                                    pf.fetch();
                                };
                                $scope.more();
                                
                                
                            } ])
            .controller(
                    // 储备客户详情
                    'ReserveCustomerDetailCtrl',
                    [   '$state', '$stateParams',
                        '$scope', 'jnReserveCustomerService',
                        'jnHelper', 'jnConstant',
                        'jnStorage', '$ionicPopup', 'jnUser',
                            function($state, $stateParams, $scope,
                                    jnReserveCustomerService, jnHelper,
                                    jnConstant, jnStorage, $ionicPopup,jnUser) {
                        
                                //判断是否是客户经理
                                if (jnUser.hasStation('400')) {
                                    $scope.isManager=true;
                                }
                                //控制折叠选项
                                $scope.checked = {
                                    "dkyx" : false,// 贷款意向
                                    "frxx" : false,// 法人信息
                                    "xxtj" : false,// 信息途径
                                };
                                //查询储备客户信息
                                jnReserveCustomerService.getPreCustInfo(
                                        $stateParams).then(function(rsp) {
                                            $scope.it = rsp.items[0];
                                        });
                                //储备客户作废
                                $scope.disabled = function() {
                                    jnReserveCustomerService
                                            .nullifyPreCustInfo($stateParams)
                                            .then(function(rsp) {
                                                $scope.it.status = '1';
                                                if (rsp.success) {
                                                    jnHelper.alert('作废成功！').then(function(){
                                                        jnPage.modified=false;
                                                        history.back();
                                                    });
                                                } else {
                                                    jnHelper.alert(rsp.errMsg);
                                                }
                                            });
                                };
                                //折叠列表的显示和隐藏
                                $scope.toggleItem = function(p) {
                                    if ($scope.checked[p]) {
                                        $scope.checked[p] = false;
                                    } else {
                                        $scope.checked[p] = true;
                                    }
                                };

                                //储备客户修改
                                $scope.edit = function(value) {
                                    $state.go('reserveCustomerEdit', {
                                        'custNo' : value
                                    });
                                };
                                //储备客户分配选择客户经理的map映射(userId:userName)
                                var managers = {};
                                jnReserveCustomerService.getNotCancelCustManagers().then(function(rsp) {
                                   
                                    $scope.devList = rsp.items;
                                    $scope.data = {
                                            userId : '',
                                            remark:''
                                    };
                                    $scope.devList.forEach(function(e){
                                        managers[e.userId] = e.userName;
                                        e.checked = false;
                                    });
                                });
                                //储备客户分配页面
                                $scope.assign = function(custNo) {
                                    var myPopup = $ionicPopup
                                            .show({
                                                templateUrl : 'app/myCustomer/reserveCustomer/assign.html',
                                                title : '储备客户分配',
                                                scope : $scope,
                                                buttons : [ {
                                                    text : '关闭'
                                                }, {
                                                    text : '保存',
                                                    type : 'button-positive',
                                                    onTap : function(e) {
                                                        if($scope.data.remark.length>500){
                                                            jnHelper.alert('描述信息最多输入500个字符！');
                                                            e.preventDefault();
                                                        }else if($scope.data.userId==''){
                                                            jnHelper.alert('请选择一个客户经理！');
                                                            e.preventDefault();
                                                        }else{
                                                            return  $scope.data.userId;
                                                        }
                                                    }
                                                } ]
                                            });
                                    myPopup.then(function(res) {
                                        if(res === void 0){
                                            return ;
                                        }
                                        jnReserveCustomerService
                                        .assignPreCustInfo({
                                            'custNos':custNo,
                                            'remark':$scope.data.remark,
                                            'afCustManagerNo':$scope.data.userId,
                                            'afCustManagerName':managers[$scope.data.userId],
                                            'assignType':0,
                                        }).then(function(rsp) {
                                            if (rsp.success) {
                                                jnHelper.alert(rsp.data.remark);
                                            } else {
                                                jnHelper.alert(rsp.errMsg);
                                            }
                                        });
                                    });
                                };
                               
                            } ])
            // 储备客户事件列表
            .controller(
                    'ReserveCustomerEventCtrl',
                    [  '$state', '$stateParams', '$scope', 
                       'jnReserveCustomerService', 'jnHelper',
                            function($state, $stateParams, $scope,
                                    jnReserveCustomerService, jnHelper) {
                                var pf = jnHelper.PaginateFetcher(
                                        jnReserveCustomerService.getEventInfos)
                                        .params($stateParams);
                                $scope.it = pf.records();
                                $scope.more = function() {
                                    pf.fetch();
                                };
                                $scope.more();
                            } ])
            .controller(
                    // 储备客户分配历史
                    'ReserveCustomerAssignCtrl',
                    [ '$state', '$stateParams', '$scope',
                      'jnReserveCustomerService', 'jnHelper',
                            function($state, $stateParams, $scope,
                                    jnReserveCustomerService, jnHelper) {
                                var pf = jnHelper
                                        .PaginateFetcher(
                                                jnReserveCustomerService.getAssignHistoryInfos)
                                        .params($stateParams);
                                $scope.it = pf.records();
                                $scope.more = function() {
                                    pf.fetch();
                                };
                                $scope.more();

                            } ]).controller(
                    // 储备客户事件详情
                    'reserveCustomerEventDetail',
                    [  '$state', '$stateParams',  '$scope',
                       'jnReserveCustomerService', 'jnHelper',
                            function($state, $stateParams, $scope,
                                    jnReserveCustomerService, jnHelper) {
                                jnReserveCustomerService.getEventInfo($stateParams).then(function(rsp){
                                    $scope.it = rsp.items[0];
                                });
                            } ]);
})();
