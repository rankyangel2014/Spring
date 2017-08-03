/**
 * 提供表单服务
 */

(function () {
'use strict';

angular
    .module('common')
    .factory('jnForm', [
        '$q', '$ionicPopup', 'jnHttp', 'jnUser', 'jnHelper',
        function ($q, $ionicPopup, jnHttp, jnUser, jnHelper) {
            var errMsgMap = {
                required: '为必填项',
                date: '不是一个有效日期',
                min: '数值太小',
                max: '数值太大',
                minlength: '长度太短',
                maxlength: '长度太长',
                pattern: '不符合规则',
                number:'只能输入数字',
                jnPositive: '必须大于等于0',
                jnNegative: '必须小于等于0',
                jnInteger: '只能输入整数',
                jnFloat: '只能输入浮点数',
                jnDecimalPrecision: '精度过高',
                jnAlpha: '只能输入英文字母',
                jnAlphaNum: '只能输入英文字母或数字',
                jnChinese: '只能输入中文',
                jnTel: '为无效的电话号码',
                jnPhone: '为无效的固话号码',
                jnMobile: '为无效的手机号码',
                jnAge: '要在18-100岁之间',
                jnIp: '为无效的IP地址',
                jnPostcode: '为无效的邮编',
                jnEmail: '为无效的电子邮件地址',
                jnIdNo: '为无效的身份证号码',
                jnOrgNo: '为无效的组织机构代码/统一信用代码',
                jnRegNo: '为无效的营业执照号码',
                jnBankNo: '为无效的银行卡号',
                jnWeChat:'为无效的微信账号',
                jnQq:'为无效的QQ账号',
                jnInputLength:'输入长度过长',
                jnRange:'输入超出范围',
            };

            var firstInvalid = function (form) {
                var errType, name;

                for (errType in form.$error) {
                    break;
                }

                name = form.$error[errType][0].$name;

                return {
                    type: errType,
                    name: name,
                };
            };

            var getLabel = function (inputName) {
                var input = document.querySelector(
                    '[nav-view=active] [name=' + inputName + ']');

                while (input.parentElement) {
                    input = input.parentElement;
                    if (input.classList.contains('item-input')) {
                        break;
                    }
                }

                return input.firstElementChild.textContent;
            };

            var errMsg = function (form) {
                var invalid = firstInvalid(form);
                var label = getLabel(invalid.name);
                var msg = errMsgMap[invalid.type];
                return label  + msg;
            };

            var validate = function (form) {
                return $q(function (resolve, reject) {
                    if (form.$valid) {
                        resolve();
                    } else {
                        reject();
                        jnHelper.alert(errMsg(form));
                    }
                });
            };

            /**
             * 把 JS 日期对象转化为 yyyyMMdd 格式的字符串
             */
            var rspDateFromJsDate = function (date) {
                var y, m, d;

                if (date) {
                    y = String(date.getFullYear());

                    m = String(date.getMonth() + 1);
                    if (m.length === 1) {
                        m = '0' + m;
                    }

                    d = String(date.getDate());
                    if (d.length === 1) {
                        d = '0' + d;
                    }

                    return y + m + d;
                }
            };

            /**
             * 把 yyyyMMdd 格式的字符串转化为 JS 日期对象
             */
            var jsDateFromRspDate = function (rspDate) {
            	if(rspDate){
            		return new Date(rspDate.replace(
            				/(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/, '$1-$2-$3'));
            	}
            };
            
            /**
             *把yyyyMMdd 格式转化为yyyy-MM-dd
             */
            var dateFormat = function (rspDate){
            	if(rspDate){
            		return rspDate.substring(0, 4) + "-" + rspDate.substring(4, 6) + "-" + rspDate.substring(6, 8);
            	}
            };
            

            return {
                validate: validate,
                rspDateFromJsDate: rspDateFromJsDate,
                jsDateFromRspDate: jsDateFromRspDate,
                dateFormat: dateFormat,
            };
        }
    ]);

})();
