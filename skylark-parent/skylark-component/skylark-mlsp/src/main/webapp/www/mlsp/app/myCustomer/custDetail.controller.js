(function () {
'use strict';

angular
    .module('custDetail')
    .controller('custDetail.paramsCtrl',
        ['$scope','$stateParams', 'myCustomerSer','$state','jnForm','$ionicPopup'
         ,'jnUser','jnReserveCustomerService','jnHelper',
        function ($scope,$stateParams, myCustomerSer,$state,jnForm,$ionicPopup
        		,jnUser,jnReserveCustomerService,jnHelper) {
            var self = this;
            var params = {};
            $scope.editFlag='0';
            $scope.editable=$stateParams.editable;
            $scope.isQry=$stateParams.isQry;
            params.custNo= $stateParams.custNo;
            $scope.flag=$stateParams.flag;
            //客户经理可以编辑
            $scope.isManager = jnUser.hasStation('400');


            //查询客户信息详细
            self.qry=function(){
            	 var t=myCustomerSer.qryDetail(params);
                 t.then(
                 		function(rsp){
                 			$scope.custDetailData=rsp.root;
                 		}
                 );
            };
           self.qry();
            $scope.edit=function(){
            	$state.go('custEdit', {custNo: $stateParams.custNo});
            };
            $scope.submit=function(){
            	/* jnForm.validate(custDetail.editForm)
                 .then(function () {
                     $state.go('myCustomer', {});
                 });*/
            	$state.go('myCustomer', {});
            };


            //管理员，风险审查岗，决策岗可以分配
            $scope.enableAssign=jnUser.hasStation('200|300|700');
            if($scope.enableAssign){
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
            }


            $scope.assign = function() {
            	var custNo=$stateParams.custNo;
                var myPopup = $ionicPopup
                        .show({
                            templateUrl : 'app/myCustomer/reserveCustomer/assign.html',
                            title : '正式客户分配',
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
                        'assignType':1,
                    }).then(function(rsp) {
                        if (rsp.success) {
                            jnHelper.alert(rsp.data.remark);
                        } else {
                            jnHelper.alert(rsp.errMsg);
                        }
                    });
                });
            };
        }]
    );

})();

