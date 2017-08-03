(function () {
'use strict';

angular
    .module('common')
    .factory('jnValidate', [
        function () {
            var service = {};

            /**
             * 正数
             */
            service.positive = function (value) {
                return 0 <= Number(value);
            };

            /**
             * 负数
             */
            service.negative = function (value) {
                return Number(value) <= 0;
            };

            /**
             * 整数
             */
            service.integer = function (value) {
                return /^[-+]?[\d]+$/.test(value);
            };

            /**
             * 浮点精度
             */
            service.decimalPrecision = function (value, len) {
                return value.length <= Number(value).toFixed(len).length;
            };

            /**
             * 字母（26个英文字母大小写）
             */
            service.alpha = function (value) {
                return /^[a-zA-Z]+$/.test(value);
            };

            /**
             * 字母（26个英文字母大小写）和数字
             */
            service.alphaNum = function (value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            };

            /**
             * IP 地址
             */
            service.ip = function (value) {
                return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value);
            };

            /**
             * 电子邮件地址
             */
            service.email = function (value) {
                return /^([A-Za-z0-9])(\w)+@(\w)+(\.)(com|com\.cn|net|cn|net\.cn|org|biz|info|gov|gov\.cn|edu|edu\.cn)/.test(value);
            };

            /**
             * 微信帐号
             *
             * 不支持中文帐号
             * 长度6-20，可以使用字母、数字、下划线和减号
             * 必须以字母开头
             */
            service.weChat = function (value) {
                return /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(value);
            };

            /**
             * QQ帐号
             */
            service.qq = function (value) {
                return /^[1-9]{1}[0-9]{4,8}$/.test(value);
            };

            /**
             * 邮编
             */
            service.postcode = function (value) {
                return /^[1-9]\d{5}(?!\d)$/.test(value);
            };

            /**
             * 中文
             */
            service.chinese = function (value) {
                return /[\u4e00-\u9fa5]/.test(value);
            };

            /**
             * 电话号码（包括固话和手机）
             */
            service.tel = function (value) {
                //return /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/.test(value);
                return /^((0\d{2,3})(-)?)(\d{7,8})(-(\d{3,}))?$/.test(value)|| /^1[3456789]\d{9}$/.test(value);
            };

            /**
             * 固话号码
             */
            service.phone = function (value) {
                //return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value);
                return /^((0\d{2,3})(-)?)(\d{7,8})(-(\d{3,}))?$/.test(value);
            };

            /**
             * 手机号码
             */
            service.mobile = function (value) {
                //return /^1[3458]\d{9}$/.test(value);
                return /^1[3456789]\d{9}$/.test(value);
            };

            /**
             * 年龄（18-100）
             */
            service.age = function (value) {
                var n = Number(value);
                return n < 18 || 100 < n;
            };

            /**
             *  输入框检验输入字节长度。
             */
            service.inputLength = function(val, len) {
                return val.replace(/[^x00-xff]/ig, 'aa').length <= parseInt(len,10);
            };

            /**
             * 身份证
             */
            service.idNo = function (val) {
                var area = {
                    11 : "北京",
                    12 : "天津",
                    13 : "河北",
                    14 : "山西",
                    15 : "内蒙古",
                    21 : "辽宁",
                    22 : "吉林",
                    23 : "黑龙江",
                    31 : "上海",
                    32 : "江苏",
                    33 : "浙江",
                    34 : "安徽",
                    35 : "福建",
                    36 : "江西",
                    37 : "山东",
                    41 : "河南",
                    42 : "湖北",
                    43 : "湖南",
                    44 : "广东",
                    45 : "广西",
                    46 : "海南",
                    50 : "重庆",
                    51 : "四川",
                    52 : "贵州",
                    53 : "云南",
                    54 : "西藏",
                    61 : "陕西",
                    62 : "甘肃",
                    63 : "青海",
                    64 : "宁夏",
                    65 : "新疆",
                    71 : "台湾",
                    81 : "香港",
                    82 : "澳门",
                    91 : "国外"
                };

                var Y, JYM, S, M, ereg;
                var idcard_array = val.split("");

                // 地区检验
                if (area[parseInt(val.substr(0, 2))] == null) {
                    return false;
                }

                // 身份号码位数及格式检验
                switch (val.length) {
                    case 15 :
                        if ((parseInt(val.substr(6, 2)) + 1900) % 4 == 0
                                || ((parseInt(val.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(val
                                        .substr(6, 2)) + 1900)
                                        % 4 == 0)) {
                            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
                        } else {
                            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
                        }

                        return ereg.test(val);
                    case 18 :
                        // 18位身份号码检测
                        // 出生日期的合法性检查
                        // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                        // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                        if (parseInt(val.substr(6, 4)) % 4 == 0
                                || (parseInt(val.substr(6, 4)) % 100 == 0 && parseInt(val
                                        .substr(6, 4))
                                        % 4 == 0)) {
                            ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
                        } else {
                            ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
                        }

                        if (ereg.test(val)) {// 测试出生日期的合法性
                            // 计算校验位
                            S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
                                    * 7
                                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
                                    * 9
                                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
                                    * 10
                                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
                                    * 5
                                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
                                    * 8
                                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
                                    * 4
                                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
                                    * 2
                                    + parseInt(idcard_array[7])
                                    * 1
                                    + parseInt(idcard_array[8])
                                    * 6
                                    + parseInt(idcard_array[9]) * 3;
                            Y = S % 11;
                            M = "F";
                            JYM = "10X98765432";
                            M = JYM.substr(Y, 1);// 判断校验位

                            return M == idcard_array[17];
                        }

                        return false; //逻辑错误，身份证校验 #8972

                    default :
                        return false;
                }
            };


            /**
             * 营业执照
             */
            service.regNo = function (val) {
                var no = val;
                var reg = /^\d{15}$/;
                if (!reg.test(no)) {
                    return false;
                }
                var m, n, s, p, i;
                var value;
                var p = 10;
                var m = 10;
                var n = 11;
                for (var i = 1; i <= 14; i++) {
                    value = no.substr(i - 1, 1);
                    s = Number(value);
                    p = p + s;
                    p = p % m;
                    if (p == 0) {
                        p = m;
                    }
                    p = p * 2;
                    p = p % n;
                }
                value = no.substr(14, 1);
                p = p + Number(value);
                p = p % m;
                if (p == 1) {
                    return true;
                } else {
                    var check = new RegExp('^\\d{6}(n|n)([a-z]|[0-9]|[a-z]){1}\\d{6}(x|x)$');
                    if (check.test(no)) {
                        return true;
                    }
                    check = new RegExp('^([0-9]|[a-z]){13}$');
                    if (check.test(no)) {
                        return true;
                    }
                    return false;
                }
            };

            /**
             * 银行帐号
             */
            service.bankNo = function (val) {
                var reMasterCard = /^(5[1-5]\d{2})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-](\d{4})$/;
                if (reMasterCard.test(val)) {
                    var sCardNum = RegExp.$1 + RegExp.$2 + RegExp.$3 + RegExp.$4;

                    var iOddSum = 0;
                    var iEvenSum = 0;
                    var bIsOdd = true;
                    for (var i = sCardNum.length - 1; i >= 0; i--) {
                        var iNum = parseInt(sCardNum.charAt(i));
                        if (bIsOdd) {
                            // 反向奇数求和
                            iOddSum += iNum;
                        } else {
                            // 偶数
                            if (iNum > 9) {
                                iNum = eval(iNum.toString().split("").join("+"));
                            }
                            iEvenSum += iNum;
                        }
                        bIsOdd = !bIsOdd;
                    }
                    return (iEvenSum + iOddSum) % 10 == 0;
                } else {
                    return false;
                }
            };

            (function () {
                var orgNoCommon = function (val) {
                    var orgNo = val;
                    var orgLen = val.length;

                    var org_str = new Array();
                    var k = 0;
                    while (k < orgNo.length) {
                        org_str[k] = orgNo.charCodeAt(k);
                        k++;
                    }
                    var w_i = [3, 7, 9, 10, 5, 8, 4, 2];
                    var c_i = new Array(10);
                    var j, c, s = 0;
                    if (orgLen == 10 && org_str[8] != 45) { // 如果组织机构代码证长度为10，那么第9位必须是“-”号，否则不合法
                        return false;
                    }
                    for (j = 0; j < 8; j++) {
                    c = org_str[j];
                    if(c >= 65 && c <= 90){
                    c_i[j] = c - 55;
                    }else if(c >= 48 && c <= 57){
                    c_i[j] = c - 48;
                    }else{
                    return false;
                    }
                        s += w_i[j] * c_i[j];
                    }
                    c = 11 - s % 11;
                    if (org_str[orgLen - 1] == 88 && c == 10 || c == 11 && org_str[orgLen - 1] == 48 || c == org_str[orgLen - 1] - 48) {
                        return true; // 校验通过
                    } else {
                        return false; // 校验未通过
                    }
                };

                var orgNo = function (val) {
                    switch (val.length) {
                        case 9:
                        case 10:
                            return orgNoCommon(val);
                        default:
                            return false;
                    }
                };

                var uniteCreditNo = function (val) {
                    switch (val.length) {
                        case 18:
                            var charBetFirAndEig = val.substring(0, 8);
                            var charBetEigAndSeventeen = val.substring(8, 17);
                            var reg1 = /^[0-9A-Z]{2}\d{6}$/g;
                            var reg2 = /[0-9A-Z]/g;
                            if (!reg1.test(charBetFirAndEig))   //校验1到8位
                                return false;
                            if(!orgNoCommon(charBetEigAndSeventeen))  //校验9到17位
                                return false;
                            if(!reg2.test(val.charAt(17)))      //校验18位
                                return false;
                                return true;
                        default:
                            return false;
                    }
                };

                service.liceNo = uniteCreditNo;

                service.orgNo = function (val) {
                    return orgNo(val) || uniteCreditNo(val);
                };
                
                //比较函数A>B（日期，字符串），不支持数字
                //A>B = true
                //A<=B = false
                //A==undefined || B=undefined || A=null || B=null return false;
                service.isGreaterThan = function(A,B){
                	//如果undefined，null不做判断，等同于false
                	if (A==undefined||B==undefined||A==null||B==null||A=="undefined"||B=="undefined"){
                		return false;
                	}
                	if (A>B){
                		return true;
                	}else{
                		return false;
                	}
                };
                
                //比较函数A>=B（日期，字符串），不支持数字
                //A>=B = true
                //A<B = false
                //A==undefined || B=undefined || A=null || B=null return false;                
                service.isGreaterThanOrEqualTo = function(A,B){
                	//如果undefined，null不做判断，等同于false
                	if (A==undefined||B==undefined||A==null||B==null||A=="undefined"||B=="undefined"){
                		return false;
                	}
                	if (A>=B){
                		return true;
                	}else{
                		return false;
                	}
                };
                
            })();

            return service;
        }
    ]);

})();
