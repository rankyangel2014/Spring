/**
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';

angular
    .module('myBusiness')
    .controller('myBusiness.detailCtrl',
        ['jnHttp', 'jnUser','$stateParams','$scope',
        function (jnHttp, jnUser,$stateParams,$scope) {
           var data = {};
           
           data.busType = $stateParams.busType;//0:贷款 1:授信
           data.contNoExt = $stateParams.contNoExt;//贷款合同号
           data.status = $stateParams.status;
           data.custName = $stateParams.custName;//客户名称
           data.phoneNo = $stateParams.phoneNo;//客户电话
           data.custManagerName = $stateParams.custManagerName;//客户经理
           data.applAmt = $stateParams.applAmt;//贷款：申请时为申请金额，其他状态为贷款金额；授信：申请额度
           data.applDt = $stateParams.applDt;//申请日期
           data.flowType = $stateParams.flowType;//申请状态
           data.actvDt = $stateParams.actvDt;//生效日期
           data.custNo = $stateParams.custNo;
           data.loanNo = $stateParams.loanNo;
           data.params = $stateParams.params;
           data.crdtNo = $stateParams.crdtNo;
           
           var params = {};
           if( $stateParams.busType == '1'){
        	   //授信参数
        	   params.crdtNo = $stateParams.crdtNo;
        	   params.userId = jnUser.userId;
               params.applSeq = '0';
               
               return jnHttp.post('/mlsp/router/rest.do?_transCode=LNLNB101',
       	            params).then(function(rsp){
       	            	$scope.credit = rsp.root[0];
       	            	$scope.it = data;
       	            });
           }
           
           if( $stateParams.busType == '0' ){
        	   //贷款参数
        	   params.custNo = $stateParams.custNo;//客户编号
        	   params.loanNo = $stateParams.loanNo;//借据号
        	   return jnHttp.post('/mlsp/router/rest.do?_transCode=QRY350',
        			   params).then(function(rsp){
        				   data.applPerd = rsp.root[0].applPerd;//申请期限
        				   data.exapAmt = rsp.root[0].exapAmt;//贷款金额
        				   data.mainGurTyp = rsp.root[0].mainGurTyp;//担保方式
        				   data.loanUse = rsp.root[0].loanUse; //借款事由
        				   data.commcust = rsp.root[0].commcust; //共同借款人
        				   data.applRemark = rsp.root[0].applRemark; //贷款描述
        				   data.intStartDt = rsp.root[0].intStartDt; //起息日
        				   data.lastDueDt = rsp.root[0].lastDueDt; //到期日
        				   data.repayTyp = rsp.root[0].repayTyp; //还款方式
        				   data.intRate = rsp.root[0].intRate; //执行年利率
        				   $scope.it = data;
        			   });
           }
                       
        }]
    );

})();
