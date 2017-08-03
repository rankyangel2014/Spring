(function () {
    'use strict';
    angular
        .module('contacts')
        .controller('ContactsListCtrl', [
            '$state', '$stateParams', '$scope','jnContactsService','jnApp',
            function ($state, $stateParams, $scope,jnContactsService,jnApp) {
                var flattenTree = function (flat, node, pName) {
                    var dept, subDepts;

                    if (void 0 === node.children || '0' === node.useable) {
                        return;
                    }

                    dept = {
                        name: pName + (pName ? ' - ' : '') + node.name,
                    };

                    flat.push(dept);

                    // node.children 可能为 null
                    if (node.children) {
                        // 因为不能打乱顺序所以不能在一个迭代里同时处理子部门和人员

                        dept.members = node.children.filter(function (e) {
                            return void 0 === e.children;
                        });
                        dept.members = dept.members.map(function(e){
                            if(e.head){
                                e.head=jnApp.baseUrl+'/'+e.head;
                            }
                            return e;
                        });

                        subDepts = node.children.filter(function (e) {
                            return void 0 !== e.children;
                        });

                        subDepts.forEach(function (e) {
                            flattenTree(flat, e, dept.name);
                        });
                    }
                };
                $scope.title='通讯录';
                $scope.search = function(f){
                    if(f!='1'){
                        $stateParams.keywords = $scope.Ctrl.keywords;
                    }
                    jnContactsService.queryAllContacts($stateParams).then(
                            function(data) {
                                if(data.items.hasOwnProperty('children')){
                                var datalist = data.items.children ;
                                var flat = [];
                                if (datalist[0] && datalist[0].hasOwnProperty('children')) {
                                    datalist[0].children.forEach(function (e) {
                                        flattenTree(flat, e, '');
                                    });
                                }
                                $scope.it = flat;
                            }
                    });
                    
                };
                $scope.search('1');
            }
        ])
        .controller('ContactsViewCtrl', [
            '$state', '$stateParams', '$scope','jnContactsService','$filter',
            function ($state, $stateParams, $scope,jnContactsService,$filter) {
                $scope.title='通讯录详情';
                $scope.it = $stateParams ;
                var birthday = $stateParams['birthday'];
                var bParts = /(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/.exec(birthday),
                by = Number(bParts[1]),
                bm = Number(bParts[2]),
                bd = Number(bParts[3]),
                now = new Date(),
                ny = now.getFullYear(),
                nm = now.getMonth() + 1,
                nd = now.getDate(),
                age = ny - by;
                if (nm < bm || (nm === bm && nd < bd)) {
                // 今年生日还未到
                    age -= 1;
                }
                $scope.it.age = age ;
            }
        ]);
})();
