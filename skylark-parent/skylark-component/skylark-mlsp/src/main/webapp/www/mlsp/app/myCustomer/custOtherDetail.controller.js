(function () {
'use strict';

angular
    .module('custOtherDetail')
    .controller('custOtherDetail.paramsCtrl',
        ['$stateParams', 'custOtherSer', 'jnHelper','$state','$scope','jnUser',
        function ($stateParams, custOtherSer, jnHelper,$state,$scope,jnUser) {
            var self = this;
            //客户经理可以编辑
            $scope.isManager = jnUser.hasStation('400');
            $scope.custPaperNo =$stateParams.custPaperNo;
            $scope.isQry =$stateParams.isQry;
            var title_list={
            		shares:'合伙人信息',
            		relations:'联系人信息',
            		custRelationInfos:'客户关系信息',
            		assignHistoryInfos:'分配历史',
            		custEventInfos:'事件信息',
            };
            var pf = jnHelper.PaginateFetcher(custOtherSer.readList)
            .params($stateParams);
            pf.start=$stateParams["start"];
            
            /*挂载到容器里面*/
         
           var index=$stateParams["index"];
            self.actionFlag=$stateParams["actionFlag"];
            self.title=title_list[$stateParams["actionFlag"]];
            self.list= pf.records();
            self.more = function() {
                pf.fetch().then(
                function(rsp){
                	self.list.items=[self.list.items[index]];
                    $scope.custNo =self.list.items[0].custNo;
                    $scope.linkCustNo =self.list.items[0].linkCustNo;
                    $scope.phoneNo =self.list.items[0].phoneNo;
                    $scope.paperNo =self.list.items[0].paperNo;
                    $scope.custName =self.list.items[0].custName;
                }
                );
                	
            };
            self.more();
            $scope.edit=function(){
	                $state.go('partnerEdit', $stateParams);
              };
        }]
    );

})();

