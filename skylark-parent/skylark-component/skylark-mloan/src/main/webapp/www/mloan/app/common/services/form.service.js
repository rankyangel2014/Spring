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
            var service = {};

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
                jnLiceNo: '为无效的统一信用代码',
                jnRegNo: '为无效的营业执照号码',
                jnBankNo: '为无效的银行卡号',
                jnWeChat:'为无效的微信账号',
                jnQq:'为无效的QQ账号',
                jnInputLength:'输入长度过长',
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

            var getLabel = function (form, inputName) {
                var input = document.querySelector(
                    'form[name="' + form.$name +
                    '"] [name="' + inputName + '"]');

                if (!input){
                    input = document.querySelector('.modal-backdrop .active [name=' + inputName + ']');
                }

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
                var label = getLabel(form, invalid.name);
                var msg = errMsgMap[invalid.type];
                return label  + msg;
            };

            service.validate = function (form) {
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
            service.rspDateFromJsDate = function (date) {
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
            service.jsDateFromRspDate = function (rspDate) {
            	if(rspDate){
            		return new Date(rspDate.replace(
            				/(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/, '$1-$2-$3'));
            	}
            };

            /**
             *把yyyyMMdd 格式转化为yyyy-MM-dd
             */
            service.dateFormat = function (rspDate){
            	if(rspDate){
            		return rspDate.substring(0, 4) + "-" + rspDate.substring(4, 6) + "-" + rspDate.substring(6, 8);
            	}
            };

            /**
             * 用生日计算年龄
             */
            service.ageFromBirth = function (b) {
                if (! b) {
                    return '';
                }

                var bParts = /(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/.exec(b),
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

                return age;
            };

            /**
             * 从身份证号获取生日
             */
            service.birthFromId = function (id) {
                if (id) {
                    return id.substring(6, 14)
                }

                return '';
            };
            /**
             * 从身份证号获取性别
             */
            service.sexFromId = function (id) {
                if (id) {
                    return 0 === Number(id.charAt(16)) % 2 ? 'F' : 'M';
                }

                return '';
            };

            /**
             * 新表单验证框架
             *
             * @TODO 复杂表达式的出错提示
             */
            (function () {
                /**
                 * 被此修饰器修饰的验证函数，
                 * 即使接受的参数是空字符串，
                 * 也视为合法
                 */
                var _ = function (fn) {
                    return function () {
                        return '' === arguments[0]
                            || fn.apply(null, arguments);
                    };
                };

                var customValidators = {};

                // {{{ validators

                /**
                 * 内置的验证函数集
                 *
                 * required: 必填
                 * regex: 正则
                 * eq: 等于
                 * gt: 大于
                 * gte: 大于等于
                 * lt: 小于
                 * lte: 小于等于
                 * range: 区间
                 * minlen: 最小长度
                 * maxlen: 最大长度
                 * int: 整数
                 * float: 浮点数
                 * precision: 浮点精度
                 * num: 数字
                 * alpha: 字母
                 * ip: IP
                 * email: email
                 * wechat: 微信
                 * qq: QQ
                 * postcode: 邮编
                 * phone: 固话
                 * mobile: 手机
                 * id: 身份证
                 * reg: 营业执照
                 * org: 组织机构代码
                 * lice: 统一信用代码
                 * bank: 银行卡号
                 */
                var validators = (function () {
                    var exports = {};

                    /**
                     * 必填
                     */
                    exports.required = [
                        function (value) {
                            return '' !== value;
                        },
                        function (name) {
                            return name + '为必填项';
                        }
                    ];

                    /**
                     * 正则
                     */
                    exports.regex = [
                        _(function (value, expr) {
                            var match = expr.match(/^\/(.+?)\/(.*)$/, '$1');
                            var patt = match[1];
                            var flags = match[2];
                            var re;

                            if (! patt) {
                                throw SyntaxError(expr +
                                    '不是一个合法的正则表达式');
                            }

                            return RegExp(patt, flags).test(value);
                        }),
                        function (name, expr) {
                            return name + '不符合规则';
                        }
                    ];

                    /**
                     * 等于
                     *
                     * @TODO 支持其他类型数据
                     */
                    exports.eq = [
                        _(function (value, cmp) {
                            value = Number(value);
                            cmp = Number(cmp);
                            return cmp === value;
                        }),
                        function (name, cmp) {
                            return name + '必须等于' + cmp;
                        }
                    ];

                    /**
                     * 大于
                     *
                     * @TODO 支持其他类型数据
                     */
                    exports.gt = [
                        _(function (value, cmp) {
                            value = Number(value);
                            cmp = Number(cmp);
                            return cmp < value;
                        }),
                        function (name, cmp) {
                            return name + '必须大于' + cmp;
                        }
                    ];

                    /**
                     * 大于等于
                     *
                     * @TODO 支持其他类型数据
                     */
                    exports.gte = [
                        _(function (value, cmp) {
                            value = Number(value);
                            cmp = Number(cmp);
                            return cmp <= value;
                        }),
                        function (name, cmp) {
                            return name + '必须大于等于' + cmp;
                        }
                    ];

                    /**
                     * 小于
                     *
                     * @TODO 支持其他类型数据
                     */
                    exports.lt = [
                        _(function (value, cmp) {
                            value = Number(value);
                            cmp = Number(cmp);
                            return value < cmp;
                        }),
                        function (name, cmp) {
                            return name + '必须小于' + cmp;
                        }
                    ];

                    /**
                     * 小于等于
                     *
                     * @TODO 支持其他类型数据
                     */
                    exports.lte = [
                        _(function (value, cmp) {
                            value = Number(value);
                            cmp = Number(cmp);
                            return value <= cmp;
                        }),
                        function (name, cmp) {
                            return name + '必须小于等于' + cmp;
                        }
                    ];

                    /**
                     * 区间
                     *
                     * @TODO
                     */
                    exports.range = [
                        _(function (value, expr) {
                        }),
                        function (name, cmp) {
                        }
                    ];

                    /**
                     * 最小长度（闭区间）
                     */
                    exports.minlen = [
                        _(function (val, len) {
                            len = Number(len);
                            return len <= jnHelper.strlen(val);
                        }),
                        function (name, len) {
                            return name + '必须输入不少于' + len + '个字';
                        }
                    ];

                    /**
                     * 最大长度（闭区间）
                     */
                    exports.maxlen = [
                        _(function (val, len) {
                            len = Number(len);
                            return jnHelper.strlen(val) <= len;
                        }),
                        function (name, len) {
                            return name + '只能输入不超过' + len + '个字';
                        }
                    ];

                    /**
                     * 整数
                     */
                    exports.int = [
                        _(function (value) {
                            return /^[-+]?[\d]+$/.test(value);
                        }),
                        function (name) {
                            return name + '只能输入整数';
                        }
                    ];

                    /**
                     * 浮点
                     */
                    exports.float = [
                        _(function (value) {
                            return /^[-+]?[\d]+(.\d+)?$/.test(value);
                        }),
                        function (name) {
                            return name + '只能输入浮点数';
                        }
                    ];

                    /**
                     * 浮点精度
                     */
                    exports.precision = [
                        _(function (value, len) {
                            var match;

                            len = Number(len);
                            match = value.match(/^[-+]?[\d]+(?:.(\d+))?$/);

                            if (! match) {
                                return false;
                            }

                            return match[1].length <= len;
                        }),
                        function (name, len) {
                            return name + '小数点后只能输入' + len + '位数字';
                        }
                    ];

                    /**
                     * 数字（0-9）
                     */
                    exports.num = [
                        _(function (value) {
                            return /^[0-9]+$/.test(value);
                        }),
                        function (name) {
                            return name + '只能输入数字';
                        }
                    ];

                    /**
                     * 字母（26个英文字母大小写）
                     */
                    exports.alpha = [
                        _(function (value) {
                            return /^[a-zA-Z]+$/.test(value);
                        }),
                        function (name) {
                            return name + '只能输入字母';
                        }
                    ];

                    /**
                     * IP
                     */
                    exports.ip = [
                        _(function (value) {
                            return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value);
                        }),
                        function (name) {
                            return name + '为无效的IP地址';
                        }
                    ];

                    /**
                     * email
                     */
                    exports.email = [
                        _(function (value) {
                            return /^([A-Za-z0-9])(\w)+@(\w)+(\.)(com|com\.cn|net|cn|net\.cn|org|biz|info|gov|gov\.cn|edu|edu\.cn)/.test(value);
                        }),
                        function (name) {
                            return name + '为无效的电子邮件地址';
                        }
                    ];


                    /**
                     * 微信
                     *
                     * 不支持中文帐号
                     * 长度6-20，可以使用字母、数字、下划线和减号
                     * 必须以字母开头
                     */
                    exports.wechat = [
                        _(function (value) {
                            return /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(value);
                        }),
                        function (name) {
                            return name + '为无效的微信帐号';
                        }
                    ];

                    /**
                     * QQ
                     */
                    exports.qq = [
                        _(function (value) {
                            return /^[1-9]{1}[0-9]{4,8}$/.test(value);
                        }),
                        function (name) {
                            return name + '为无效的QQ号码';
                        }
                    ];

                    /**
                     * 邮编
                     */
                    exports.postcode = [
                        _(function (value) {
                            return /^[1-9]\d{5}(?!\d)$/.test(value);
                        }),
                        function (name) {
                            return name + '为无效的邮编';
                        }
                    ];

                    /**
                     * 固话
                     */
                    exports.phone = [
                        _(function (value) {
                            return /^((0\d{2,3})(-)?)(\d{7,8})(-(\d{3,}))?$/.test(value);
                        }),
                        function (name) {
                            return name + '为无效的固话号码';
                        }
                    ];

                    /**
                     * 手机
                     */
                    exports.mobile = [
                        _(function (value) {
                            return /^1[3456789]\d{9}$/.test(value);
                        }),
                        function (name) {
                            return name + '为无效的手机号码';
                        }
                    ];

                    /**
                     * 身份证
                     *
                     * @TODO 重写（抄别人的，写的太烂）
                     */
                    exports.id = [
                        _(function (val) {
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
                        }),
                        function (name) {
                            return name + '为无效的身份证号码';
                        }
                    ];


                    /**
                     * 营业执照
                     *
                     * @TODO 重写（抄别人的，写的太烂）
                     */
                    exports.reg = [
                        _(function (val) {
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
                        }),
                        function (name) {
                            return name + '为无效的营业执照号码';
                        }
                    ];

                    /**
                     * 银行卡号
                     *
                     * @TODO 重写（抄别人的，写的太烂）
                     */
                    exports.bank = [
                        _(function (val) {
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
                        }),
                        function (name) {
                            return name + '为无效的银行卡号';
                        }
                    ];

                    // @TODO 重写（抄别人的，写的太烂）
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

                        /**
                         * 组织机构代码
                         */
                        exports.org = [
                            _(function (val) {
                                switch (val.length) {
                                    case 9:
                                    case 10:
                                        return orgNoCommon(val);
                                    default:
                                        return false;
                                }
                            }),
                            function (name) {
                                return name + '为无效的组织机构代码';
                            }
                        ];

                        /**
                         * 统一信用代码
                         */
                        exports.lice = [
                            _(function (val) {
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
                            }),
                            function (name) {
                                return name + '为无效的统一信用代码';
                            }
                        ];
                    })();

                    return exports;
                })();;

                // }}}
                // {{{ Parser

                /**
                 * 把验证表达式解析为语法树
                 */
                var Parser = (function () {
                    var skip = function () {};

                    var syntaxError = function () {
                        throw SyntaxError(this._expr + ' :' + this._charIdx);
                    };

                    var stateMachines = {
                        unit: {
                            ' ': skip,

                            ',': syntaxError,

                            '/': syntaxError,

                            '(': function () {
                                this._beginBlock();
                            },

                            ')': syntaxError,

                            'A': function () {
                                this._beginName();
                                this._changeState('pred_name');
                            },

                            '$$': syntaxError,
                        },

                        logic: {
                            ' ': skip,

                            ',': syntaxError,

                            '/': syntaxError,

                            '(': syntaxError,

                            ')': function () {
                                this._endBlock();
                            },

                            'A': function () {
                                this._beginName();
                                this._changeState('logic_name');
                            },

                            '$$': skip,
                        },

                        logic_name: {
                            ' ': function () {
                                this._makeLogic();
                                this._changeState('unit');
                            },

                            ',': syntaxError,

                            '/': syntaxError,

                            '(': function () {
                                this._makeLogic();
                                this._beginBlock();
                                this._changeState('unit');
                            },

                            ')': syntaxError,

                            'A': function () {
                                this._appendName();
                            },

                            '$$': syntaxError,
                        },

                        pred_name: {
                            ' ': function () {
                                this._makePred();
                                this._changeState('logic');
                            },

                            ',': syntaxError,

                            '/': syntaxError,

                            '(': function () {
                                this._makePred();
                                this._changeState('pred_arg');
                            },

                            ')': function () {
                                this._makePred();
                                this._endBlock();
                                this._changeState('logic');
                            },

                            'A': function () {
                                this._appendName();
                            },

                            '$$': function () {
                                this._makePred();
                            },
                        },

                        pred_arg: {
                            ' ': skip,

                            ',': syntaxError,

                            '/': function () {
                                this._beginName();
                                this._changeState('pred_arg_name_re');
                            },

                            '(': syntaxError,

                            ')': function () {
                                this._changeState('logic');
                            },

                            'A': function () {
                                this._beginName();
                                this._changeState('pred_arg_name');
                            },

                            '$$': syntaxError,
                        },

                        pred_arg_name: {
                            ' ': syntaxError,

                            ',': function () {
                                this._appendPredArg();
                                this._changeState('pred_arg');
                            },

                            '/': syntaxError,

                            '(': syntaxError,

                            ')': function () {
                                this._appendPredArg();
                                this._changeState('logic');
                            },

                            'A': function () {
                                this._appendName();
                            },

                            '$$': syntaxError,
                        },

                        pred_arg_name_re: {
                            '/': function () {
                                this._appendName();
                                this._changeState('pred_arg_name');
                            },

                            'A': function () {
                                this._appendName();
                            },

                            '$$': syntaxError,
                        },
                    };

                    var C = function () {
                        this._name = '';
                        this._char = '';
                        this._trees = [null];
                        this._validators = mixValidators();
                        this._changeState('unit');
                    };

                    C.prototype.parse = function (expr) {
                        this._expr = expr;

                        Array.prototype.forEach.call(expr, (function (self) {
                            return function (c, i) {
                                var parse;

                                self._char = c;
                                self._charIdx = i;

                                parse = self._state[c] || self._state.A;
                                parse.apply(self);
                            };
                        })(this));

                        this._state.$$.apply(this);

                        if (1 < this._trees.length) {
                        // 括号未闭合
                            this._charIdx += 1;
                            this._syntaxError();
                        }

                        return this._trees[0];
                    };

                    C.prototype._changeState = function (name) {
                        this._state = stateMachines[name];
                    };

                    C.prototype._beginName = function () {
                        this._name = this._char;
                    };

                    C.prototype._appendName = function () {
                        this._name += this._char;
                    };

                    C.prototype._isLogic = function (s) {
                        return /and|or/i.test(s);
                    };

                    C.prototype._getLastTree = function () {
                        return this._trees[this._trees.length - 1];
                    };

                    C.prototype._setLastTree = function (node) {
                        this._trees[this._trees.length - 1] = node;
                    };

                    C.prototype._appendUnit = function (unit) {
                        var node = this._getLastTree();

                        if (node) {
                            node.oper.push(unit);
                        } else {
                            this._setLastTree(unit);
                        }
                    };

                    C.prototype._appendPredArg = function () {
                        var node = this._getLastTree();

                        if ('L' === node.type) {
                            node = node.oper[1];
                        }

                        node.args.push(this._name);
                    };

                    C.prototype._makePred = function () {
                        var node;

                        if (this._isLogic(this._name)) {
                            this._syntaxError();
                        }

                        if (! this._validators[this._name]) {
                            throw ReferenceError("未定义的校验函数 '"
                                + this._name + "' @ '" + this._expr + "'");
                        }

                        node = {
                            type: 'P',
                            name: this._name,
                            args: [],
                        };

                        this._appendUnit(node);
                    };

                    C.prototype._makeLogic = function () {
                        var node;

                        if (! this._isLogic(this._name)) {
                            this._syntaxError();
                        }

                        node = {
                            type: 'L',
                            name: this._name,
                            oper: [this._getLastTree()],
                        }

                        this._setLastTree(node);
                    };

                    C.prototype._beginBlock = function () {
                        this._trees.push(null);
                    };

                    C.prototype._endBlock = function () {
                        this._appendUnit(this._trees.pop());
                    };

                    return C;
                })();

                // }}}
                // {{{ mixValidators()

                /**
                 * 合并内置/自定义验证函数集合
                 */
                var mixValidators = function () {
                    // 参数顺序重要，保证内置规则不被意外覆盖
                    return jnHelper.merge(customValidators, validators);
                };

                // }}}
                // {{{ buildValidator()

                /**
                 * 把 Parser 生成的语法树编译为最终验证函数
                 */
                var buildValidator = (function () {
                    var parseNode = function (node) {
                        if ('L' === node.type) {
                            return parseLogic(node);
                        }

                        if ('P' === node.type) {
                            return parsePred(node);
                        }
                    };

                    var parseLogic = (function () {
                        var logicMap = {
                            'and': function (oper) {
                                return 'function () {\
                                    var r = ' + oper[0] + '();\
                                    return r.valid ? ' + oper[1] + '() : r;\
                                }';
                            },

                            'or': function (oper) {
                                return 'function () {\
                                    var r = ' + oper[0] + '();\
                                    return r.valid ? r : ' + oper[1] + '();\
                                }';
                            },
                        };

                        return function (node) {
                            return logicMap[node.name](
                                node.oper.map(parseNode));
                        };
                    })();

                    var parsePred = function (pred) {
                        return 'function () {\
                            var fn, args;\
                            fn = validators["' + pred.name + '"][0];\
                            args = [value].concat([' +
                                pred.args.map(function (o) {
                                    return "'" + o + "'";
                                }).join() + ']);\
                            if (fn.apply(null, args)) {\
                                return {\
                                    valid: true,\
                                };\
                            }\
                            fn = validators["' + pred.name + '"][1];\
                            args = [name].concat([' +
                                pred.args.map(function (o) {
                                    return "'" + o + "'";
                                }).join() + ']);\
                            return {\
                                valid: false,\
                                msg: fn.apply(null, args),\
                            }\
                        }';
                    };

                    return function (syntaxTree) {
                        var parsed = parseNode(syntaxTree);

                        var wrapper = Function(
                            ['validators'],
                            'return function (name, value) {\
                                return (' + parsed + ')();\
                            };'
                        );

                        return wrapper(mixValidators());
                    };
                })();

                // }}}
                // {{{ validateInput()

                /**
                 * 验证单个输入框
                 */
                var validateInput = (function () {
                    /**
                     * 取得验证提示名
                     */
                    var validateName = function (input) {
                        var name = input.getAttribute('jn-validate-name');

                        if (name) {
                            return name;
                        }

                        console.warn(
                            '没有提供校验名称，提示信息将不完整：',
                            input);

                        return '';
                    };

                    /**
                     * 取得验证表达式
                     */
                    var validateExpr = function (input) {
                        return input.getAttribute('jn-validate');
                    };

                    /**
                     * 取得输入值
                     */
                    var inputValue = function (input) {
                        return input.value;
                    };

                    /**
                     * 通过验证表达式产生验证函数
                     */
                    var parseValidateExpr = function (expr) {
                        var parser = new Parser();
                        var syntaxTree = parser.parse(expr);
                        return buildValidator(syntaxTree);
                    };

                    return function (input) {
                        var expr, name, value, doValidate;

                        expr = validateExpr(input);

                        if (expr) {
                            doValidate = parseValidateExpr(expr);
                            name = validateName(input);
                            value = inputValue(input);
                            return doValidate(name, value);
                        }

                        return {
                            valid: true,
                        };
                    };
                })();

                // }}}

                service.validate2 = function (form) {
                    var formResult = {
                        valid: true,
                    };

                    Array.prototype.some.call(form.elements, function (e) {
                        var inputResult = validateInput(e);

                        if (! inputResult.valid) {
                            formResult = inputResult;
                            return true; // 终止迭代
                        }
                    });

                    return formResult;
                };

                service.addValidator = function (name, validate, errMsg) {
                    customValidators[name] = [_(validate), errMsg];
                };

                Object.defineProperties(service, {
                    validators: {
                        get: function () {
                            var exports = {};
                            var p;

                            for (p in validators) {
                                // 只暴露验证函数
                                // 防止修改的同时提供更友好的接口
                                exports[p] = validators[p][0];
                            }

                            return exports;
                        },
                    }
                });
            })();

            return service;
        }
    ]);

})();
