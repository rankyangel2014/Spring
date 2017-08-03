/**
 * 身份证/名片 OCR
 */

(function() {
'use strict';

angular
    .module('common')
    .factory('jnIDVScanner', [
        '$q',
        '$ionicLoading',
        '$ionicActionSheet',
        'jnappService',
        'jnHelper',
        function (
            $q,
            $ionicLoading,
            $ionicActionSheet,
            jnappService,
            jnHelper
        ) {
            var birthday = function (y, m, d) {
                if (m.length < 2) {
                    m = '0' + m;
                }

                if (d.length < 2) {
                    d = '0' + d;
                }

                return new Date(y + '-' + m + '-' + d);
            };

            var scan = function (type) {
                return $q(function (resolve, reject) {
                    var idData = function (res) {
                        var data = {};

                        data.name = res.name;
                        data.addr = res.address;
                        data.gender = res.gender;
                        data.idNo = res.idnumber;
                        data.nation = res.people;
                        data.birthday = birthday(
                            res.byear, res.bmonth, res.bday);
                        data.tel = '';
                        data.mobile = '';
                        data.fax = '';
                        data.email = '';
                        data.corp = '';
                        data.im = '';

                        return data;
                    };

                    var vData = function (res) {
                        var data = {};
                        data.name = res.name[0] || '';
                        data.tel = res.tel[0] || '';
                        data.mobile = res.mobile[0] || '';
                        data.fax = res.fax[0] || '';
                        data.email = res.email[0] || '';
                        data.corp = res.comp[0] || '';
                        data.im = res.im[0] || '';
                        data.addr = res.addr[0] || '';
                        data.birthday = '';
                        data.gender = '';
                        data.idNo = '';
                        data.nation = '';

                        return data;
                    };

                    var ok = function (res) {
                        $ionicLoading.hide();

                        res = JSON.parse(res.msg || res);

                        if ('ID' === type) {
                            resolve(idData(res));
                        } else if ('VC' === type) {
                            resolve(vData(res));
                        }

                    };

                    var err = function (res) {
                        $ionicLoading.hide();
                        reject(res.msg || res);
                    };

                    var onClick = [
                        function () {
                            jnappService.hanvonOCR(type, 'A', ok, err);
                        },
                        function () {
                            jnappService.hanvonOCR(type, 'C', ok, err);
                        },
                    ];

                    var hide = $ionicActionSheet.show({
                        buttons: [{
                            text: '从图片库中选取',
                        }, {
                            text: '拍照',
                        }],
                        cancelText: '取消',
                        buttonClicked: function (i) {
                            $ionicLoading.show({
                                template: '请稍候...'
                            });

                            onClick[i]();
                            hide();
                        },
                    });
                });
            };

            return {
                idCard: function () {
                    return scan('ID').catch(jnHelper.alert);
                },
                vCard: function () {
                    return scan('VC').catch(jnHelper.alert);
                },
            };
        }
    ]);

})();
