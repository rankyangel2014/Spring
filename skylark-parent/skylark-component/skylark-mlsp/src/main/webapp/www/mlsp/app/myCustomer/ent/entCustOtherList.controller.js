(function () {
'use strict';

angular
    .module('entCustOtherList')
    .controller('entCustOtherList.listCtrl',
        ['$stateParams', 'entCustOtherSer', 'jnHelper','$state',
        function ($stateParams, custOtherSer, jnHelper,$state) {
            var self = this;
            var title_list={
            		faRenInfo:'法人代表信息',
            		caiWuInfo:'财务负责人信息',
            		custRelationInfos:'客户关系信息',
            		assignHistoryInfos:'分配历史',
            		custEventInfos:'事件信息',
            };
            
            
            self.toDetail=function(custNo){
            	 $state.go('custDetail', {custNo: custNo});      	      
            };
            self.custSearch=function(){
            	$state.go('custSearch', {});      	      
            };
            self.custAdd=function(){
            	$state.go('custAdd', {});      	      
            };
            
            var pf = jnHelper.PaginateFetcher(custOtherSer.readList)
            .params($stateParams);
            
            /*挂载到容器里面*/
          
            self.actionFlag=$stateParams["actionFlag"];
            self.title=title_list[$stateParams["actionFlag"]];
            self.list= pf.records();
            
            
            self.more = function() {
                pf.fetch();
            };
            self.more();
        }]
    );

})();

