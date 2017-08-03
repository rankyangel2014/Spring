(function () {
    'use strict';

    angular
        .module('myCustomer')
        .controller('addPerCustCtrl', [
            '$state', '$stateParams',
            '$scope', 'jnPersonCustService',
            'jnForm', 'jnHelper', 'jnUser', 'jnPage',
            'jnIdReader', 'jnIDVScanner', 'jnConstant','$filter',
            function
                ($state, $stateParams,
                 $scope, jnPersonCustService,
                 jnForm, jnHelper, jnUser, jnPage,
                 jnIdReader, jnIDVScanner, jnConstant,$filter) {
                var self = this;
                self.form = {
                        paperType:'0',
                        sex:'M',
                        perTyp:0
                    };
                self.submit = function () {
                    jnForm.validate(self.myForm)
                        .then(function () {
                            jnPersonCustService
                                .addPerCustBaseInfo(self.form)
                                .then(function (rsp) {
                                    if (rsp.success) {
                                        jnHelper.alert('保存成功！').then(function () {
                                            jnPage.modified = false;
                                            jnPage.back();
                                        });
                                    } else {
                                        jnHelper.alert(rsp.errMsg);
                                    }
                                });
                        });

                }

                var fillCustDataTSV = function (data) {
                    fillCustData({
                        name: data.name,
                        birthday: data.birth,
                        idNo: data.id,
                        addr: data.address,
                        gender: data.gender,
                        nation: data.nation,
                    });
                };

                var fillCustData = function (data) {
                    self.form.custName = data.name;
                    self.form.birthday = new Date(data.birthday);
                    self.form.paperNo = data.idNo;
                    self.form.custAddr = data.addr;
                    self.form.phoneNo = data.mobile || data.tel;

                    if ('男' === data.gender) {
                        self.form.sex = 'M';
                    } else if ('女' === data.gender) {
                        self.form.sex = 'F';
                    } else {
                        self.form.sex = '';
                    }

                    (function () {
                        var nationMap = jnConstant.get(8);
                        var val = data.nation + '族';
                        var p;

                        self.form.nation = '';

                        for (p in nationMap) {
                            if (nationMap[p] === val) {
                                self.form.nation = p;
                                break;
                            }
                        }
                    })();
                };

                self.scanIDCard = function () {

                    if (navigator.userAgent.indexOf('TSV-300A-1') > -1) {
                        jnIdReader.open(fillCustDataTSV);

                    } else {
                        jnIDVScanner.idCard().then(fillCustData);
                    }
                };

                self.scanVCard = function () {
                    jnIDVScanner.vCard().then(fillCustData);
                };

                self.onChangePaperNo=function(paperNo){
                    var birthday = '';
                    var sex = 'M';
                    console.log(paperNo);
                    if(paperNo && paperNo.length==15){
                        birthday = new Date($filter('jnDate')('19'+paperNo.substr(6,6)));
                        sex =  parseInt(paperNo.substr(14,1))%2==0?'F':'M';
                        self.form["birthday"]=birthday;
                        self.form['sex'] = sex;
                    }else if(paperNo && paperNo.length==18 ) {
                        birthday = new Date($filter('jnDate')(paperNo.substr(6,8)));
                        sex =  parseInt(paperNo.substr(16,1))%2==0?'F':'M';
                        self.form["birthday"]=birthday;
                        self.form['sex'] = sex;
                    }
                };
                $scope.lostBlurCheckName = function() {
                	if(self.form.regNo!=""&&self.form.regNo!=null){
		            	jnPersonCustService.getName(self).then(function(rsp){
		                    if (rsp.data.jsonData.data.BASIC.frname!=""&&rsp.data.jsonData.data.BASIC.frname!=null){
		                        if(self.form.custName!=""&&self.form.custName!=null){
		                        	if(self.form.custName!=rsp.data.jsonData.data.BASIC.frname){
		                        		jnHelper.alert("当前客户名称【"+self.form.custName+"】与征信查询法人名称【"+rsp.data.jsonData.data.BASIC.frname+"】不符，请核实！");
		                        	}
		                        }else{
		                        	self.form.custName = rsp.data.jsonData.data.BASIC.frname;
		                        }
		                    }
		                });
                	}
                };


                self.confirmed = function(){
                    jnHelper.confirm("客户名称:"
                        +self.form.custName+" ,"
                        +" 身份证号码:"
                        +self.form.paperNo
                        +"请确认以上客户信息，是否保存？").then(function(ok){
                        if(ok){
                            jnPersonCustService
                                .addPerCustBaseInfo(self.form)
                                .then(function (rsp) {
                                    if (rsp.success) {
                                        jnHelper.alert('保存成功！').then(function () {
                                            jnPage.modified = false;
                                            jnPage.back();
                                        });
                                    } else {
                                        jnHelper.alert(rsp.errMsg);
                                    }
                                });
                        }
                    });
                }

                self.submit = function (b,s) {
                    jnForm.validate(self.myForm)
                        .then(function () {
                            var confirmedString  = "";
                            if( $filter('date')(self.form.birthday,'yyyyMMdd') != $filter('date')(b,'yyyyMMdd')){
                                    confirmedString = "输入的身份证号码和生日不匹配，是否继续保存个人客户信息？";
                                    jnHelper.confirm(confirmedString,'提示').then(function(confirmed){
                                        if (confirmed) {
                                            self.confirmed();
                                        }else {
                                            return ;
                                        }
                                    });
                            }else  if (self.form.sex!=s){
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
        )
        .controller('custRelationAddCtrl', [
            '$state', '$stateParams',
            '$scope', 'jnPersonCustService',
            'jnForm', 'jnHelper', 'jnUser', 'jnPage',
            function
                ($state, $stateParams,
                 $scope, jnPersonCustService,
                 jnForm, jnHelper, jnUser, jnPage) {
                var self = this;
                self.form = {
                    'paperType': '0',
                    'operate': '0',
                    'custNo': $stateParams.custNo,
                };
                self.submit = function () {
                    jnForm.validate(self.myForm)
                        .then(function () {
                            jnPersonCustService
                                .updatePerCustRelationInfo(self.form)
                                .then(function (rsp) {
                                    if (rsp.success) {
                                        jnHelper.alert('保存成功！').then(function () {
                                            jnPage.modified = false;
                                            jnPage.back();
                                        });
                                    } else {
                                        jnHelper.alert(rsp.errMsg);
                                    }
                                });
                        });
                };
                self.nameDisable = false;

                self.onChangePaperNo = function(paperNo){
                    if(paperNo){
                        if($stateParams.custPaperNo==paperNo){
                            jnHelper.alert('身份证号码不能和主客户相同，请重新输入！','提示');
                            return ;
                        }else {
                            jnPersonCustService.getNameByPaperNo(paperNo).then(function(rsp){
                                if (rsp.success && rsp.root[0]){
                                    self.form.custName = rsp.root[0].custName;
                                    self.form.phoneNo = rsp.root[0].phoneNo ;
                                    self.nameDisable = true;
                                }else{
                                    self.nameDisable = false;
                                    self.form.custName = '';
                                    self.form.phoneNo = '' ;
                                }
                            });
                        }
                    }
                }

            }])
        .controller('custRelationEditCtrl', [
        '$state', '$stateParams',
        '$scope', 'jnPersonCustService',
        'jnForm', 'jnHelper', 'jnUser', 'jnPage',
        function
            ($state, $stateParams,
             $scope, jnPersonCustService,
             jnForm, jnHelper, jnUser, jnPage) {
            var self = this;
            self.nameDisable = true;
            self.form = {
                'paperType': '0',
                'operate': '1',
                'phoneNo': $stateParams.phoneNo,
                'paperNo': $stateParams.paperNo,
                'custPaperNo': $stateParams.custPaperNo,
                'custName': $stateParams.custName,
                'linkCustNo': $stateParams.linkCustNo,
                'custNo': $stateParams.custNo,
            };
            self.submit = function () {
                jnForm.validate(self.myForm)
                    .then(function () {
                        jnPersonCustService
                            .updatePerCustRelationInfo(self.form)
                            .then(function (rsp) {
                                if (rsp.success) {
                                    jnHelper.alert('保存成功！').then(function () {
                                        jnPage.modified = false;
                                        $state.go('custOtherList',{
                                        custNo:$stateParams.custNo,
                                        linkType:'25',
                                        actionFlag:'relations',
                                        })
                                    });
                                } else {
                                    jnHelper.alert(rsp.errMsg);
                                }
                            });
                    });
            };


            self.onChangePaperNo = function(paperNo){
                if(paperNo){
                    if($stateParams.custPaperNo==paperNo){
                        jnHelper.alert('身份证号码不能和主客户相同，请重新输入！','提示');
                        return ;
                    }else {
                        jnPersonCustService.getNameByPaperNo(paperNo).then(function(rsp){
                            if (rsp.success && rsp.root[0]){
                                self.form.custName = rsp.root[0].custName;
                                self.form.phoneNo = rsp.root[0].phoneNo ;
                                self.nameDisable = true;
                            }else{
                                self.nameDisable = false;
                                self.form.custName = '';
                                self.form.phoneNo = '' ;
                            }
                        });
                    }
                }
            }

        }])

})();

