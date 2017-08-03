(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('myCustomer.listCtrl',
        ['jnUser','$stateParams', 'myCustomerSer', 'jnHelper','$state','$scope',
        function (jnUser,$stateParams, myCustomerSer, jnHelper,$state,$scope) {
            var self = this;

            self.toDetail = function (cust) {
                var state = {
                    0: 'custDetail',
                    1: 'entCustDetail',
                }[cust.custType];

                $state.go(state, {
                    custNo: cust.custNo,
                    custType: cust.custType,
                    custManagerNo: cust.custManagerNo,
                    isDetail: 2,
                    asgnStatus:$stateParams.asgnStatus=='2'?'2':'1',
                });
            };

            self.custSearch=function(){
            	$state.go('custSearch', {});      	      
            };
            self.custAdd=function(){
            	$state.go('custAdd', {});      	      
            };

			self.justManager = jnUser.getMaxStation() == '400';//客户经理
			self.justTeamManager = jnUser.getMaxStation() == '500';//团队经理
			self.justSysManager = jnUser.getMaxStation() == '566';//后台人员

			//团队经理
			if (self.justTeamManager||self.justSysManager) {
				$stateParams.deptId = jnUser.deptId;
			}
			//客户经理
			if (self.justManager) {
				$stateParams.custManagerNo = jnUser.userId;
				$stateParams.deptId = jnUser.deptId;
			}


            var pf =null;
			 pf = jnHelper.PaginateFetcher(myCustomerSer.readList).params($stateParams);

            if($stateParams.tmp)
            self.tmp="1";
            
            /*挂载到容器里面*/
            self.list= pf.records();
            
            self.more = function() {
                pf.fetch();
            };
            self.more();
            
            self.jump=function(state){
           	 $state.go(state, {oprFlag:new Date().getTime()});
           };
        }]
    ).controller(//个人客户详情
    		'custDetail.paramsCtrl',
            ['$scope','$stateParams', 'myCustomerSer','$state','jnForm','jnUser','jnHelper',
             function ($scope,$stateParams, myCustomerSer,$state,jnForm,jnUser,jnHelper) {
                 var self = this;
                 var params = {};
                 //登录客户userid
                 $scope.userId=jnUser.userId;
                 //登录用户岗位
                 $scope.station=jnUser.getMaxStation();
                 
                 if($scope.station == '500' && ($scope.userId == $stateParams.custManagerNo) 
                     && $stateParams.isDetail=='2' && $stateParams.asgnStatus=='1'){
                     $scope.assignedAble = true ;
                 }
                 
                 if($stateParams.asgnStatus!=='2'){
                         $scope.transferAble = true ;
                 }
                 //if ($scope.station=='700' && $stateParams.isDetail=='2' && $stateParams.asgnStatus=='1'){
                 //    $scope.assignedAble = true ;
                 //}
                 
                 $scope.from=$stateParams.from;
                 params.custNo= $stateParams.custNo;
                 params.operType= $stateParams.operType;
                 //查询客户信息详细
                myCustomerSer.qryDetail(params).then(
                 		function(rsp){
                  			$scope.custDetail=rsp.data;
                  			if ('2' == $stateParams.isDetail
                  		            &&  $scope.userId === $stateParams.custManagerNo//团队经理和客户经理只能编辑自己名下的客户
									&&  jnUser.hasStation('400|500')) {//客户经理和团队经理有编辑的权限
                  				    $scope.isDetail = '0';
                  				    $scope.editable = '1';
                  		        } else {
                  		        	$scope.isDetail = '1';
                  				    $scope.editable = '0';
                  		        }
                  		}
                  );
                 
                 $scope.edit=function(){
                 	$state.go('custOtherEdit', {custNo:$scope.custDetail.custNo,actionFlag:'gyxx'});
                 };
               
             }]
         )
       .controller(//个人客户移交
         		'custAssign.paramCtrl',
                ['$scope','$stateParams', 'myCustomerSer','$state','jnForm','jnUser','jnHelper',
                 function ($scope,$stateParams, myCustomerSer,$state,jnForm,jnUser,jnHelper) {
                     var self = this;
                     var params = {};
                     //登录客户userid
                     $scope.userId=jnUser.userId;
                     $scope.station=jnUser.stationId;
                     
                     $scope.editFlag='0';
                     params.custNo= $stateParams.custNo;
                     params.operType='0';
                     
                     //查询客户信息详细
                    myCustomerSer.qryDetail(params).then(
                     		function(rsp){
                     			console.info(rsp);
                      			$scope.custDetail=rsp.data;
                      			 if(jnUser.hasStation('400')){
                        				$scope.custDetail.isStation='3';
                        			 }
                        			 if(jnUser.hasStation('500')){
                        				 $scope.custDetail.isStation='1';
                        			 }
                        			 if(jnUser.hasStation('700')){
                        				 $scope.custDetail.isStation='2';
                        			 }
                      			
                      			$scope.assign={};
                      			$scope.assign.form={
                      					custNos:$scope.custDetail.custNo,
                      			};
                      		}
                      );
                     
                     self.submit=function(){
                     	 jnForm.validate(self.assignForm)
                          .then(function () {
                        	  myCustomerSer.assignCustInfo(self.assignForm).then(function(rsp){
                        		  console.info(rsp);
                        		  
                        		  if(rsp.success){
                        			  jnHelper.alert(rsp.data.remark);
                        			  $state.go('myCustomer',{tmp:1});
                        		  }
                        	  });
                          });
                     };
                   
                 }]
             )
		.controller(//管户历史
		'custAssignHistory.paramCtrl',
		['$scope','$stateParams', 'myCustomerSer','$state','jnForm','jnUser','jnHelper',
		 function ($scope,$stateParams, myCustomerSer,$state,jnForm,jnUser,jnHelper) {
			var self = this;
			var params = {};
			//登录客户userid
			$scope.userId=jnUser.userId;
			$scope.station=jnUser.station;
			
			params.custNo= $stateParams.custNo;
			params.custType= $stateParams.custType;
			
			var pf=null;
			 pf = jnHelper.PaginateFetcher(myCustomerSer.getAssignHistoryInfos)
         	.params(params);
			 
			 /*挂载到容器里面*/
	          self.list= pf.records();
	            
	          self.more = function() {
	                pf.fetch().then(
	                	function(rsp){
	                		console.info(rsp);
	                });
	            };
	          
	            self.more();
			
		}]
    )
	.controller('blackOperateHistory.paramCtrl', [           //黑名单历史操作
              '$scope','$state', 'jnUser', 'jnForm','$stateParams','jnHelper','myCustomerSer',
              function ($scope,$state, jnUser, jnForm,$stateParams,jnHelper,myCustomerSer) {
            	  var self = this;
      			var params = {};
      			$scope.custName=$stateParams.custName;
      			params.custNo= $stateParams.custNo;
      			
      			var pf=null;
      			 pf = jnHelper.PaginateFetcher(myCustomerSer.getBlackOperateHistory)
               	.params(params);
      			 
      			 /*挂载到容器里面*/
      	          self.list= pf.records();
      	            
      	          self.more = function() {
      	                pf.fetch().then(
      	                	function(rsp){
      	                		console.info(rsp);
      	                });
      	            };
      	          
      	            self.more();
      	            
      	            
      	          self.toggleItem = function(index) {
                  	if(self.list.items[index].expandFlag==='1'){
                  		self.list.items[index].expandFlag='0';
                  		
                  	}else{
                  		self.list.items[index].expandFlag='1';
                  	}
                  	   event.stopPropagation();
                    };
            	  
      	          /*黑名单操作类型: [
      	                  {paramKey: '0', paramValue: '自动设置'},
      	                  {paramKey: '1', paramValue: '手动设置'},
      	                  {paramKey: '8', paramValue: '八级'},
      	                  {paramKey: '9', paramValue: '九级'},
      	              ],*/
            	  
              }]
	);

})();

