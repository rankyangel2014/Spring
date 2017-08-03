(function () {
'use strict';

angular
    .module('entCustDetail')
    .controller('entCustDetail.paramsCtrl',
        ['$scope','$stateParams', 'entCustSer', 'jnHelper','$state','jnForm',
         '$ionicPopup','jnUser','jnReserveCustomerService',
        function ($scope,$stateParams, entCustSer, jnHelper,$state,jnForm,
        		$ionicPopup,jnUser,jnReserveCustomerService) {
            var self = this;
            var params = {};
            $scope.isQry = $stateParams.isQry;
            $scope.flag=$stateParams.flag;
            if (jnUser.hasStation('400')) {
                $scope.isManager=true;
            }else{
            	 $scope.isManager=false;
            }
            
            $scope.editFlag='0';
            params.custNo= $stateParams.custNo;
            var t=entCustSer.qryDetail(params);
            t.then(
            		function(rsp){
            			$scope.entCustDetailData=rsp.root;
            		}
            );
            params.linkType='23';
            params.defFlag='0';
            var faren=entCustSer.qryDetailForPe(params);
            faren.then(
            		function(rsp){
            			$scope.farenData=[rsp.data];
            		}
            );
            params.linkType='19';
            params.defFlag='0';
            var caiwu=entCustSer.qryDetailForPe(params);
            caiwu.then(
            		function(rsp){
            			$scope.caiwuData=[rsp.data];
            		}
            );
            $scope.edit=function(){
            	if($scope.editFlag==='1'){
            		$scope.editFlag='0';
            	}else{
            		$scope.custDetail.form={
            				custName:$scope.custDetail.custName,
                			paperType:$scope.custDetail.paperType,
                			paperNo:$scope.custDetail.paperNo,
                			marryStatus:$scope.custDetail.marryStatus,
                			agricultureType:$scope.custDetail.agricultureType,
                			mobile:$scope.custDetail.contact.split(',')[0],
                			address:$scope.custDetail.contact.split(',')[1],
            		};
            		$scope.editFlag='1';
            	}
            };
            $scope.submit=function(){
            	/* jnForm.validate(custDetail.editForm)
                 .then(function () {
                     $state.go('myCustomer', {});
                 });*/
            	$state.go('myCustomer', {});
            };
          
            
            
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

