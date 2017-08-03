(function () {
'use strict';
angular
    .module('custEdit')
    .controller('custEdit.paramsCtrl',
        ['$filter','$scope','$stateParams', 'myCustomerSer', 'jnHelper','$state','jnForm','jnPersonCustService','jnPage',
        function ($filter,$scope,$stateParams, myCustomerSer, jnHelper,$state,jnForm,jnPersonCustService,jnPage) {
            var self = this;
            self.form = {};
            var params = {};
            var birthday = '';
            var sex = 'M';
            var paperNo = '';
            $scope.editFlag='0';
            params.custNo= $stateParams.custNo;
            myCustomerSer.qryDetail(params).then(
            		function(rsp){
                        self.form=rsp.root[0];
                        self.form["birthday"]=new Date(self.form['birthday']);
                        self.form["phoneNo"]=self.form.contact.split(",")[0];
                        self.form["custAddr"]=self.form.contact.split(",")[1];
                        self.form["custNo"]= $stateParams.custNo;
            			paperNo = self.form['paperNo'];
            			if(self.form['regNo'] && self.form['regNo']!=="X"){

                            self.form['perTyp']='1';
            			}else{
                            self.form['perTyp']='0';
            			}
            			 if(paperNo && paperNo.length==15){
                             birthday = new Date($filter('jnDate')('19'+paperNo.substr(6,6)));
                             sex =  parseInt(paperNo.substr(14,1))%2==0?'F':'M';
                         }
                         else if(paperNo && paperNo.length==18 ) {
                             birthday = new Date($filter('jnDate')(paperNo.substr(6,8)));
                             sex =  parseInt(paperNo.substr(16,1))%2==0?'F':'M';
                         }
            		}

            );
            self.confirmed = function(){
                //jnHelper.confirm("客户名称:"
                //    +self.form.custName+" ,"
                //    +" 身份证号码:"
                //    +self.form.paperNo
                //    +"请确认以上客户信息，是否保存？").then(function(ok){
                //    if(ok){


                        jnPersonCustService.addPerCustBaseInfo(self.form).then(function(rsp){
                            if (rsp.success) {
                                var str = '保存成功！';
                                if(self.form["custClass"]=='1'){
                                    str = '个人关联客户转个人正式客户成功！';
                                }
                                jnHelper.alert(str).then(function(){
                                    jnPage.modified=false;
                                    jnPage.back();
                                });
                            } else {
                                jnHelper.alert(rsp.errMsg);
                            }
                        });
                //    }
                //});
            }

            self.submit = function (b,s) {
                jnForm.validate(self.editForm)
                    .then(function () {
                        var confirmedString  = "";
                        if( $filter('date')(birthday,'yyyyMMdd') != $filter('date')(b,'yyyyMMdd')){
                            confirmedString = "输入的身份证号码和生日不匹配，是否继续保存个人客户信息？";
                            jnHelper.confirm(confirmedString,'提示').then(function(confirmed){
                                if (confirmed) {
                                    self.confirmed();
                                }else {
                                    return ;
                                }
                            });
                        }else  if (sex!=s){
                            confirmedString = "输入的身份证号码和性别不匹配，是否继续保存个人客户信息？";
                            jnHelper.confirm(confirmedString,'提示').then(function(confirmed){
                                if (confirmed) {
                                    self.confirmed();
                                }else {
                                    return ;
                                }
                            });
                        }else {
                            self.confirmed();
                        }
                    });
            };
        }]
    );

})();