(function () {
'use strict';

angular
    .module('custDetail1')
    .controller('custDetail1.paramsCtrl',
        ['$scope','$stateParams','$state','jnForm','$ionicPopup'
         ,'jnUser','jnHelper',
        function ($scope,$stateParams,$state,jnForm,$ionicPopup
        		,jnUser,jnHelper) {
            var self = this;
            $scope.checked = {
            		// 个人资料
                    "grzl": false,
                    // 申请要求
                    "sqyq": false,
                    //企业资料
                    "qyzl": false,
                    // 财务信息概述
                    "cwxx": false,
                    // 担保方式
                    "dbfs": false,
                    // 授权书
                    "sqs": false,
                    //客户提交的资料及第一印象
                    "khtj": false,
                    // 筛查结果
                    "scjg": false,
                };
            /*$scope.checked = {
            		// 个人资料
                    "grzl": true,
                    // 申请要求
                    "sqyq": true,
                    //企业资料
                    "qyzl": true,
                    // 财务信息概述
                    "cwxx": true,
                    // 担保方式
                    "dbfs": true,
                    // 授权书
                    "sqs": true,
                    //客户提交的资料及第一印象
                    "khtj": true,
                    // 筛查结果
                    "scjg": true,
                };*/
            $scope.toggleItem = function (p) {
                if ($scope.checked[p]) {
                    $scope.checked[p] = false;
                } else {
                    $scope.checked[p] = true;
                }
            };
        }]
    );

})();

