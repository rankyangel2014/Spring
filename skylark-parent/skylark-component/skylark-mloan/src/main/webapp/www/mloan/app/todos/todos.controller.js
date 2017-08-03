(function () {
    'use strict';
    angular
        .module('todos')
        .controller(
            'TodosQueryAllCtrl',
            [
                '$scope',
                '$stateParams',
                'jnPage',
                'jnUser',
                'jnHttp',
                'jnTodosListService',
                function ($scope, $stateParams, jnPage, jnUser, jnHttp,
                          jnTodosListService) {
                    $scope.title = '待办工作';
                    jnTodosListService.queryGroup().then(
                        function (data) {
                            $scope.todosList = data;
                        });

                    $scope.viewTodo = function (item, type) {
                        if (0 === type && 0 === item.persionTotal) {
                            return;
                        }

                        if (1 === type && 0 === item.stationTotal) {
                            return;
                        }

                        if (2 === type && 0 === item.hisTotal) {
                            return;
                        }

                        jnPage.go('todosAssign', {
                            operType: type,
                            pendType: item.pendType,
                            pendName: item.pendName,
                        });
                    };

                    $scope.viewRemind = function (item) {
                        jnPage.go('remindTabs', {
                            messageType: item.messageType,
                            messageName: item.messageName,
                            backTo: jnPage.current.name,
                        });
                    };
                }])
        .controller(
            'TodosQueryAssignCtrl',
            [
                'jnHelper',
                '$scope',
                '$state',
                '$stateParams',
                '$ionicPopup',
                'jnUser',
                'jnHttp',
                'jnTodosListService',
                function (jnHelper, $scope, $state, $stateParams,
                          $ionicPopup, jnUser, jnHttp,
                          jnTodosListService) {
                    if ($stateParams.operType === '0') {

                        $scope.title = $stateParams.pendName + "（"
                            + "个人" + "）";
                    } else if ($stateParams.operType === '1') {

                        $scope.title = $stateParams.pendName + "（"
                            + "岗位" + "）";
                    } else {

                        $scope.title = $stateParams.pendName + "（"
                            + "历史" + "）";
                    }

                    var pf = jnHelper.PaginateFetcher(
                        jnTodosListService.queryList)
                        .limitParam('pageLimit').params(
                            $stateParams);
                    $scope.todosList = pf.records();
                    $scope.more = function () {
                        pf.fetch();
                    };
                    $scope.more();


                    $scope.claim = function (todo) {
                        var todoParams = todo.params.split('-');
                        if (todo.operType == '2') {
                            return;
                        }
                        if ('51' === todo.pendType) {//贷款预判审批
                        	var template = todo.operType === '1' && (todo.actorId==undefined || todo.actorId ==null || todo.actorId == '' ) 
                        		? '请确认是否认领并审批？' : '请确认是否审批？';
                            $ionicPopup
                                .show({
                                    template: template,
                                    title: '提示',
                                    buttons: [
                                        {
                                            text: '确定',
                                            type: 'button-positive',
                                            onTap: function () {

                                                if (todo.operType == '0') {//个人
                                                    $state.go('loanApply',
                                                        {
                                                            custNo: todoParams[2],
                                                            loanNo: todoParams[3],
                                                            eventId: todoParams[todoParams.length - 2],
                                                        });
                                                } else {//岗位
                                                    jnTodosListService
                                                        .claim(
                                                            {
                                                                taskinstanceid: todo.pendId,
                                                            })
                                                        .then(
                                                            function () {
                                                                $state.go('loanApply',
                                                                    {
                                                                        custNo: todoParams[2],
                                                                        loanNo: todoParams[3],
                                                                        eventId: todoParams[todoParams.length - 2],
                                                                    });
                                                            });
                                                }


                                            },
                                        },
                                        {
                                            text: '取消',
                                        }],
                                });


                        }
                        else if ('55' === todo.pendType) {//潜在客户移交分配

                            // 团队经理
                            if (jnUser.hasStation('500')) {

                                $ionicPopup
                                    .show({
                                        template: '请选择分配或移交！',
                                        title: '提示',
                                        buttons: [
                                            {
                                                text: '分配',
                                                type: 'button-positive',
                                                onTap: function () {

                                                    if (todo.operType == '0') {//个人

                                                        $state
                                                            .go(
                                                                'reserveCustomerAssignedList',
                                                                {
                                                                    custNo: todoParams[2],
                                                                    custType: '0',
                                                                    pendId: todo.pendId,
                                                                    'todos': true,
                                                                });

                                                    } else {
                                                        jnTodosListService
                                                            .claim(
                                                                {
                                                                    taskinstanceid: todo.pendId,
                                                                })
                                                            .then(
                                                                function () {
                                                                    $state
                                                                        .go(
                                                                            'reserveCustomerAssignedList',
                                                                            {
                                                                                custNo: todoParams[2],
                                                                                custType: '0',
                                                                                pendId: todo.pendId,
                                                                                'todos': true,
                                                                            });
                                                                });


                                                    }


                                                },
                                            },
                                            {
                                                text: '移交',
                                                type: 'button-positive',
                                                onTap: function () {

                                                    if (todo.operType == '0') {//个人

                                                        $state
                                                            .go(
                                                                'reserveCustomerTransferList',
                                                                {
                                                                    custNo: todoParams[2],
                                                                    custType: '0',
                                                                    pendId: todo.pendId,
                                                                    'todos': true,
                                                                });

                                                    } else {
                                                        jnTodosListService
                                                            .claim(
                                                                {
                                                                    taskinstanceid: todo.pendId,
                                                                })
                                                            .then(
                                                                function () {
                                                                    $state
                                                                        .go(
                                                                            'reserveCustomerTransferList',
                                                                            {
                                                                                custNo: todoParams[2],
                                                                                custType: '0',
                                                                                pendId: todo.pendId,
                                                                                'todos': true,
                                                                            });
                                                                });


                                                    }

                                                },
                                            },
                                            {
                                                text: '取消',
                                            }],
                                    });


                            }
                            // 决策岗
                            else if (jnUser.hasStation('700')) {
                                $ionicPopup
                                    .show({
                                        template: '请处理相关待办事项！',
                                        title: '提示',
                                        buttons: [
                                            {
                                                text: '分配',
                                                type: 'button-positive',
                                                onTap: function () {

                                                    if (todo.operType == '0') {//个人
                                                        $state
                                                            .go(
                                                                'reserveCustomerAssignedList',
                                                                {
                                                                    custNo: todoParams[2],
                                                                    custType: '0',
                                                                    pendId: todo.pendId,
                                                                    'todos': true,
                                                                });
                                                    } else {

                                                        jnTodosListService
                                                            .claim(
                                                                {
                                                                    taskinstanceid: todo.pendId,
                                                                })
                                                            .then(
                                                                function () {
                                                                    $state
                                                                        .go(
                                                                            'reserveCustomerAssignedList',
                                                                            {
                                                                                custNo: todoParams[2],
                                                                                custType: '0',
                                                                                pendId: todo.pendId,
                                                                                'todos': true,
                                                                            });
                                                                });

                                                    }


                                                },
                                            },
                                            {
                                                text: '取消',
                                            }],
                                    });


                            }
                            else {
                                jnHelper.alert('移动端尚不支持该业务，请在电脑端完成审批操作！');
                            }


                        }
                        else if ('56' === todo.pendType) {
                            // 团队经理
                            if (jnUser.hasStation('500')) {

                                // 正式客户

                                $ionicPopup
                                    .show({
                                        template: '请选择分配或移交！',
                                        title: '提示',
                                        buttons: [
                                            {
                                                text: '分配',
                                                type: 'button-positive',
                                                onTap: function () {
                                                    jnTodosListService
                                                        .claim(
                                                            {
                                                                taskinstanceid: todo.pendId,
                                                            })
                                                        .then(
                                                            function () {
                                                                $state
                                                                    .go(
                                                                        'reserveCustomerAssignedList',
                                                                        {
                                                                            custNo: todoParams[2],
                                                                            custType: '1',
                                                                            pendId: todo.pendId,
                                                                            'todos': true,
                                                                        });
                                                            });
                                                },
                                            },
                                            {
                                                text: '移交',
                                                type: 'button-positive',
                                                onTap: function () {
                                                    jnTodosListService
                                                        .claim(
                                                            {
                                                                taskinstanceid: todo.pendId,
                                                            })
                                                        .then(
                                                            function () {
                                                                $state
                                                                    .go(
                                                                        'reserveCustomerTransferList',
                                                                        {
                                                                            custNo: todoParams[2],
                                                                            custType: '1',
                                                                            pendId: todo.pendId,
                                                                            'todos': true,
                                                                        });
                                                            });
                                                },
                                            },
                                            {
                                                text: '取消',
                                            }],
                                    });


                            }
                            // 决策岗
                            else if (jnUser.hasStation('700')) {


                                // 正式客户

                                $ionicPopup
                                    .show({
                                        template: '请处理相关待办事项！',
                                        title: '提示',
                                        buttons: [
                                            {
                                                text: '分配',
                                                type: 'button-positive',
                                                onTap: function () {
                                                    jnTodosListService
                                                        .claim(
                                                            {
                                                                taskinstanceid: todo.pendId,
                                                            })
                                                        .then(
                                                            function () {
                                                                $state
                                                                    .go(
                                                                        'reserveCustomerAssignedList',
                                                                        {
                                                                            custNo: todoParams[2],
                                                                            custType: '1',
                                                                            pendId: todo.pendId,
                                                                            'todos': true,
                                                                        });
                                                            });
                                                },
                                            },
                                            {
                                                text: '取消',
                                            }],
                                    });

                            }
                            else {
                                jnHelper.alert('移动端尚不支持该业务，请在电脑端完成审批操作！');
                            }

                        } else {

                            jnHelper.alert('移动端尚不支持该业务，请在电脑端完成审批操作！');
                        }
                    };


                }]);
})();
