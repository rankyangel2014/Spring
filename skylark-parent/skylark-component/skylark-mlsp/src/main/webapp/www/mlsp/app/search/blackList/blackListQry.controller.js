(function() {
	'use strict';

	angular.module('blackList').controller(
			'blackList.blackListSearchCtrl',
			[
					'$state',
					'$scope',
					'jnForm',
					'$ionicActionSheet',
					'$cordovaDevice',
					'jnappService',
                    'jnHelper',
                    'jnIdReader',
                    'jnIDVScanner',
                    'jnBlackListServer',
					function($state, $scope, jnForm, $ionicActionSheet,
							$cordovaDevice,jnappService, jnHelper, jnIdReader,
                            jnIDVScanner, jnBlackListServer) {

						var self = this;

                        var checkById = function (id) {
                            jnBlackListServer.readList({
                                blackType: '0', // 本公司
                                idType: '0',
                                idNo: id,
                            }).then(function (rsp) {
                                if (0 < rsp.total) {
                                // 在本公司黑名单上

                                    jnHelper.confirm('用户在本公司黑名单上！',
                                        null, '详情').then(function (goDetail) {
                                        if (goDetail) {
                                            $state.go('custDetail', {
                                                custNo: rsp.items[0].custNo,
                                            });
                                        }
                                    });

                                } else {
                                // 不在本公司黑名单上

                                    return jnBlackListServer.readList({
                                        blackType: '1', // 其他公司
                                        idType: '0',
                                        idNo: id,
                                    });
                                }
                            }).then(function (rsp) {
                                if (0 < rsp.total) {
                                // 在其他公司黑名单上

                                    jnHelper.alert('用户在其他公司黑名单上！');

                                } else {
                                // 不在黑名单上

                                    jnHelper.alert('用户不在黑名单上！');
                                }
                            });
                        };

						self.form = {};

						self.submit = function() {
							jnForm.validate(self.myForm).then(function() {
								$state.go('blackListReq', self.form);
							});
						};

						self.onChangeCustType = function() {
							self.form.idType = '';
							self.onChangeIdType();
						};

						self.onChangeIdType = function() {
							self.form.idNo = '';
						};

						self.scanCard = function($event) {
							if (navigator.userAgent.indexOf('TSV-300A-1') > -1) {
                                jnIdReader.open(function (data) {
                                    checkById(data.id);
                                });

							} else {
                                jnIDVScanner.idCard().then(function (data) {
                                    if (data.idNo) {
                                        checkById(data.idNo);
                                    }
                                });
							}
						}

					} ]);

})();
