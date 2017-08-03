(function () {
'use strict';

angular
    .module('myCustomer')
    .controller('myCustomer.listCtrl',
        ['$stateParams', 'myCustomerSer', 'jnHelper','$state','jnUser', 'jnTitleMenu',
        function ($stateParams, myCustomerSer, jnHelper,$state,jnUser, jnTitleMenu) {
            var self = this;
            self.isManager = jnUser.hasStation('400');

            self.toDetail = function (cust) {
                var state = {
                    '0': 'custDetail',
                    '1': 'entCustDetail',
                }[cust.custType];

                $state.go(state, {
                    custNo: cust.custNo,
                    flag: 1,
                    editable: cust.custManagerName === jnUser.userName ?  1 : 0,
                });
            };

            self.custSearch=function(){
            	$state.go('custSearch', {});      	      
            };
            self.custAdd=function(){
            	$state.go('custAdd', {});      	      
            };

            var titleMenu;

            self.showTitleMenu = function () {
                if (! titleMenu) {
                    titleMenu = jnTitleMenu.create({
                        items: [{
                                template: '查询',
                                onTap: function () {
                                    $state.go('custSearch');
                                },
                            }, {
                                template: '新增个人',
                                onTap: function () {
                                    $state.go('addPerCust');
                                },
                            }/*, {
                                template: '新增企业',
                                onTap: function () {
                                    $state.go('addEntCust');
                                },
                            }*/],
                    });
                }

                titleMenu.show();
            };
           
            var pf = jnHelper.PaginateFetcher(myCustomerSer.readList)
            .params($stateParams);
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
           
           self.back=function(){
         		
         			$state.go("main");
         	 };
        }]
    );

})();

