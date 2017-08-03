/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('entCustDetail')
    .controller('partnerDetail.paramCtrl',
        ['jnHttp', 'jnUser','$stateParams','$scope','$state','custActualService',
        function (jnHttp, jnUser,$stateParams,$scope,$state,custActualService) {
        	$scope.isDetail=$stateParams.isDetail;
           var self=this;
           self.param=$stateParams;
           console.info($stateParams);
           custActualService.readActual({
               custNo: $stateParams.custNo,
           }).then(function (rsp) {
        	   console.info(rsp);
        	   self.param = rsp.data;
        	   self.param.pCustNo =	$stateParams.pCustNo;
        	   self.param.sharePct = $stateParams.sharePct;
           });

            //修改
           self.edit=function(){
               if(self.param.custType == '0'){
                   self.param.phoneNo = self.param.mobPhone;
                   $state.go('partnerPerEdit',self.param);
               }else {
                   self.param.phoneNo = self.param.fixPhone;
                   $state.go('partnerEntEdit',self.param);
               }
           };
        }]
    )
    .controller('relationPerDetail.paramCtrl',
		['$filter', '$scope', '$stateParams', 'custActualService', 'jnHelper', '$state', 'jnForm', 'jnPage', 'jnConstant',
		 function ($filter,$scope, $stateParams, custActualService, jnHelper, $state, jnForm, jnPage, jnConstant) {
			var self = this;

            self.isDetail = $stateParams.isDetail;
            custActualService.readActual({
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
            	console.info(rsp);
                $scope.it = rsp.data;
                if ($scope.it.paperNo) {
                    $scope.it.birthday = $filter('jnDate')(getBirthdayByPaperNo($scope.it.paperNo));
                    $scope.it.age = getAgeByPaperNo($scope.it.paperNo);
                    $scope.it.sex = getSexByPaperNo($scope.it.paperNo);
                }
                $scope.it.linkTypeName = $stateParams.linkTypeName;
                $scope.it.linkType = $stateParams.linkType;
            });

            self.edit = function (custNo) {
                $state.go('relationPerEdit', {
                    custNo: custNo,
                    isDetail: self.isDetail,
                    pCustNo: $stateParams.pCustNo,
                    linkType: $stateParams.linkType,
                });
            };
        }]
    )
    .controller('relationEntDetail.paramCtrl',
		['$scope', '$stateParams', 'custActualService', 'jnHelper', '$state', 'jnForm', 'jnPage', 'jnConstant',
		 function ($scope, $stateParams, custActualService, jnHelper, $state, jnForm, jnPage, jnConstant) {
			var self = this;

            self.isDetail = $stateParams.isDetail;

            custActualService.readActual({
                custNo: $stateParams.custNo,
            }).then(function (rsp) {
                $scope.it = rsp.data;
                if ('10' === $scope.it.paperType) {
                    $scope.it.cardMerge = 'N';
                } else if ('11' === $scope.it.paperType) {
                    $scope.it.cardMerge = 'Y';
                }
                $scope.it.linkTypeName = $stateParams.linkTypeName;
                $scope.it.linkType = $stateParams.linkType;
            });

            self.edit = function (custNo) {
                $state.go('relationEntEdit', {
                    custNo: custNo,
                    isDetail: self.isDetail,
                    pCustNo: $stateParams.pCustNo,
                    linkType: $stateParams.linkType,
                });
            };

        }]
    )
	.controller('contactDetail.paramCtrl',
			['jnHttp', 'jnUser','$stateParams','$scope','$state','jnContactInfoServer',
			 function (jnHttp, jnUser,$stateParams,$scope,$state,jnContactInfoServer) {
				var self=this;
				$scope.isDetail=$stateParams.isDetail;
				
				jnContactInfoServer.readList({
					custNo:$stateParams.custNo,
					operType:'0',}).then(
						function(rsp){
							console.info(rsp);
							var data=rsp.items[$stateParams.index];
							
							self.param={
								'linkCustNo':data.linkCustNo, // 编号
								'linkCustName':data.linkCustName, // 姓名
								'linkCustAddr':data.linkCustAddr, // 地址
								'linkType':data.linkType, // 人企关系
								'linkPhoneNo':data.linkPhoneNo, // 电话
								'linkPaperNo':data.linkPaperNo, // 身份证
								'linkWorkUnit':data.linkWorkUnit, // 工作单位
							};
							
						}
					);
				
				self.edit=function(){
					$state.go('contactEdit',$stateParams);
				};
				
				
			}]
	);
})();
