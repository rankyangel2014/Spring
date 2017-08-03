Ext.Ajax.timeout=360000;//360秒 
/**
 * 校验身份证号码输入法人是否正确
 * 
 * @param {}
 *            id
 * @return {Boolean}
 */
function chkIDCard(id) {
	var errorMsg = "";
	// return /(^[0-9]{17}([0-9]|[Xx])$)|(^[0-9]{17}$)/.test(_v);
	var val = Ext.getCmp(id).getValue();
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
	// if(null==val || ""==val){
	// return;
	// }
	var Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard_array = val.split("");
	// 地区检验
	if (area[parseInt(val.substr(0, 2))] == null) {
		// errorMsg = "身份证号码地区非法！";
		Ext.MessageBox.show({
			title : '身份证号码校验提示',
			msg : '身份证号码地区非法！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		Ext.getCmp(id).focus(true, true);
		return false;
	}
	// 身份号码位数及格式检验
	switch (val.length) {
	case 15:
		if ((parseInt(val.substr(6, 2)) + 1900) % 4 == 0
				|| ((parseInt(val.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(val
						.substr(6, 2)) + 1900) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
		} else {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
		}
		if (ereg.test(val))
			return true;
		else {
			// errorMsg = "身份证号码出生日期超出范围";
			Ext.MessageBox.show({
				title : '身份证号码校验提示',
				msg : '身份证号码出生日期超出范围！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			Ext.getCmp(id).focus(true, true);
			return false;
		}
		break;
	case 18:
		// 18位身份号码检测
		// 出生日期的合法性检查
		// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
		// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
		if (parseInt(val.substr(6, 4)) % 4 == 0
				|| (parseInt(val.substr(6, 4)) % 100 == 0 && parseInt(val
						.substr(6, 4)) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
		} else {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
		}
		if (ereg.test(val)) {// 测试出生日期的合法性
			// 计算校验位
			S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
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
					* 2 + parseInt(idcard_array[7]) * 1
					+ parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9])
					* 3;
			Y = S % 11;
			M = "F";
			JYM = "10X98765432";
			M = JYM.substr(Y, 1);// 判断校验位
			// alert(idcard_array[17]);
			if (M == idcard_array[17]) {
				return true; // 检测ID的校验位
			} else {
				// this.IDCardText = "身份证号码末位校验位校验出错,请注意X的大小写";
				// errorMsg = "身份证号码末位校验位校验出错";
				Ext.MessageBox.show({
					title : '身份证号码校验提示',
					msg : '身份证号码末位校验位校验出错！',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				Ext.getCmp(id).focus(true, true);
				return false;
			}
		} else {
			// errorMsg = "身份证号码出生日期超出范围";
			Ext.MessageBox.show({
				title : '身份证号码校验提示',
				msg : '身份证号码出生日期超出范围！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			Ext.getCmp(id).focus(true, true);
			return false;
		}
		break;
	default:
		// errorMsg = "身份证号码位数不对,应该为15位或18位";
		Ext.MessageBox.show({
			title : '身份证号码校验提示',
			msg : '身份证号码位数不对,应该为15位或18位！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		Ext.getCmp(id).focus(true, true);
		return false;
		break;
	}
};

/**
 * 组织机构代码校验
 * 
 * @param {}
 *            id
 * @return {Boolean}
 */
function chkAdjustOrgNo(id) {
	var val = Ext.getCmp(id).getValue();
	// if(null==val || ""==val){
	// return;
	// }
	var Errors = new Array("组织机构代码长度小于9，请重新输入", "请输入正确的组织机构代码");
	var orgNo = val;
	if (orgNo.length < 9) {
		// this.adjustOrgNoText = Errors[0];
		Ext.MessageBox.show({
			title : '组织机构代码校验提示',
			msg : '组织机构代码长度小于9，请重新输入！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return false;
	}

	var org_str = new Array();
	var k = 0;
	while (k < orgNo.length) {
		org_str[k] = orgNo.charCodeAt(k);
		k = k + 1;
	}
	var out_org = new Array(20);
	var w_i = [ 3, 7, 9, 10, 5, 8, 4, 2 ];
	var c_i = new Array(10);
	var i, j, c, s = 0;
	var fir_value, sec_value;
	if (org_str[8] != 45) { // 第9位必须是“-”号，否则不合法
		// this.adjustOrgNoText = Errors[1];
		Ext.MessageBox.show({
			title : '组织机构代码校验提示',
			msg : '请输入正确的组织机构代码！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return false;
	}
	for (i = 0; i < 10; i++) {// 含有小写英文字母，不合法
		c = org_str[i];
		if (c <= 122 && c >= 97) {
			// this.adjustOrgNoText = Errors[1];
			Ext.MessageBox.show({
				title : '组织机构代码校验提示',
				msg : '请输入正确的组织机构代码！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return false;
		}
		out_org[i] = c;
	}
	fir_value = org_str[0];
	sec_value = org_str[1];
	if (fir_value >= 65 && fir_value <= 90) {// 第一位含有大写英文字母，转换
		c_i[0] = (fir_value + 32) - 87;
	} else if (fir_value >= 48 && fir_value <= 57) {// 第一位在0-9范围内，
		c_i[0] = fir_value - 48;
	} else {// 第一位不是大写的英文字母 也不是数字 不合法
		// this.adjustOrgNoText = Errors[1];
		Ext.MessageBox.show({
			title : '组织机构代码校验提示',
			msg : '请输入正确的组织机构代码！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return false;
	}
	s += w_i[0] * c_i[0];
	if (sec_value >= 65 && sec_value <= 90) {
		c_i[1] = (sec_value - 65) + 10;
	} else if (sec_value >= 48 && sec_value <= 57) {
		c_i[1] = sec_value - 48;
	} else {
		// this.adjustOrgNoText = Errors[1];
		Ext.MessageBox.show({
			title : '组织机构代码校验提示',
			msg : '请输入正确的组织机构代码！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return false;
	}
	s += w_i[1] * c_i[1];
	for (j = 2; j < 8; j++) {
		if (org_str[j] < 48 || org_str[j] > 57) {
			// this.adjustOrgNoText = Errors[1];
			Ext.MessageBox.show({
				title : '组织机构代码校验提示',
				msg : '请输入正确的组织机构代码！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return false;
		}
		c_i[j] = org_str[j] - 48;
		s += w_i[j] * c_i[j];
	}
	c = 11 - s % 11;
	out_org[9] = c + 48;
	if (c == 10)
		out_org[9] = 88;
	if (c == 11)
		out_org[9] = 48;
	if (org_str[9] == 88 && c == 10 || c == 11 && org_str[9] == 48
			|| c == org_str[9] - 48) {
		return true; // 校验通过
	} else {
		// this.adjustOrgNoText = Errors[1];
		Ext.MessageBox.show({
			title : '组织机构代码校验提示',
			msg : '请输入正确的组织机构代码！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return false; // 校验未通过
	}
};

/**
 * 营业执照号码输入校验
 * 
 * @param {}
 *            id
 * @return {Boolean}
 */
function chkCodeXy(id) {
	var val = Ext.getCmp(id).getValue();
	// if(null==val || ""==val){
	// return;
	// }
	var Errors = new Array("请输入正确的营业执照号码", "");
	var no = String(val); // 将营业执照号码转换成String类型
	var reg = new RegExp("\d{15}");
	if (reg.test(no)) {
		// this.codeXyText = Errors[0];
		Ext.MessageBox.show({
			title : '营业执照号码校验提示',
			msg : '请输入正确的营业执照号码！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return false;
	}
	var m, n, s, p, i;
	var value;
	var p = 10;
	var m = 10;
	var n = 11;
	for ( var i = 1; i <= 14; i++) {
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
		var check = new RegExp('^\\d{6}(n|N)([a-z]|[0-9]|[A-Z]){1}\\d{6}(x|X)$');
		if (check.test(no)) {
			return true;
		}
		check = new RegExp('^([0-9]|[a-z]){13}$');
		if (check.test(no)) {
			return true;
		}
		// this.codeXyText = Errors[0];
		Ext.MessageBox.show({
			title : '营业执照号码校验提示',
			msg : '请输入正确的营业执照号码！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return false;
	}
};

/**
 * 将所传递的数字四舍五入到所需的精度 v:待转换数字 p:精度
 */
function roundNum(v, p) {
	return Math.round(v * Math.pow(10, p)) / Math.pow(10, p);
};

/**
 * 将所传递的数字四舍五入到所需的精度 v:待转换数字 p:精度
 */
function roundMoney(v, p) {
	v = Ext.num(v, 0); // ensure v is a valid numeric value, otherwise use 0 as
	// a base (fixes $NaN.00 appearing in summaryRow when no
	// records exist)
	v = (Math.round((v - 0) * 100)) / 100;
	v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v
			+ "0" : v);
	v = String(v);
	var ps = v.split('.');
	var whole = ps[0];
	var sub = ps[1] ? '.' + ps[1] : '.00';
	var r = /(\d+)(\d{3})/;
	while (r.test(whole)) {
		whole = whole.replace(r, '$1' + ',' + '$2');
	}
	v = whole + sub;
	/*
	 * if (v.charAt(0) == '-') { return v.substr(1); }
	 */
	return v;
};

// 将Num1取小数后Num2位长度，并对小数后Num2位后的数字进行四舍五入
function formatNum(Num1, Num2) {
	if (isNaN(Num1) || isNaN(Num2)) {
		return (0);
	} else {
		Num1 = Num1.toString();
		Num2 = parseInt(Num2);
		if (Num1.indexOf('.') == -1) {
			return (Num1);
		} else {
			var b = Num1.substring(0, Num1.indexOf('.') + Num2 + 1);
			var c = Num1.substring(Num1.indexOf('.') + Num2 + 1, Num1
					.indexOf('.')
					+ Num2 + 2);
			if (c == "") {
				return (b);
			} else {
				if (parseInt(c) < 5) {
					return (b);
				} else {
					return ((Math.round(parseFloat(b) * Math.pow(10, Num2)) + Math
							.round(parseFloat(Math.pow(0.1, Num2).toString()
									.substring(
											0,
											Math.pow(0.1, Num2).toString()
													.indexOf('.')
													+ Num2 + 1))
									* Math.pow(10, Num2))) / Math.pow(10, Num2));
				}
			}
		}
	}
};

/**
 * 检查输入的值是否为空格
 * 
 * @param {}
 *            data
 * @return {Boolean}
 */
function checkstring_allSpace(data) {
	if (data.length > 0 && trim(data) == "") {
		return false;
	}
	return true;
}

/**
 * 取出右边的空格
 * 
 * @param {}
 *            val
 * @return {String}
 */
function trim(val) {
	var str = val + "";
	if (str.length == 0)
		return str;
	var re = /^\s*/;
	str = str.replace(re, '');
	re = /\s*$/;
	return str.replace(re, '');
}

// 判断是否是一个整数，包含负数（可带+/-号）。
function isInteger(value) {
	if (checkstring_allSpace(value)) {
		var re = /^[-\+]?\d+$/;
		if (re.test(value)) {
			return true;
		} else {
			// alert("格式不匹配，只能输入0-9的整数（可以带+/-符号）！");
			return false;
		}
	}
}

// 判断是否是一个正整数。
function isPositiveNumber(value) {
	if (checkstring_allSpace(value)) {
		var re = /^[0-9]\d*$/;
		if (re.test(value)) {
			return true;
		} else {
			// alert("格式不匹配，只能输入0-9的正整数！");
			return false;
		}
	}
}

// 检查值是否是一个合法的浮点数，包含负数（可带+/-号）。
function isFloat(value) {
	if (checkstring_allSpace(value)) {
		var re = /^[-\+]?\d+(\.\d+)?$/;
		if (re.test(value)) {
			return true;
		} else {
			// alert("格式不匹配，不是一个合法的浮点数！");
			return false;
		}
	}
}

// 判断是否由A-Z，a-z组成。
function isEnglish(value) {
	if (checkstring_allSpace(value)) {
		var re = /^[A-Za-z]+$/;
		if (re.test(value)) {
			return true;
		} else {
			// alert("格式不匹配，只能由A-Z，a-z组成！");
			return false;
		}
	}
}

// 判断是否由A-Z,a-z,0-9组成。
function isEnglishAndNumber(value) {
	if (checkstring_allSpace(value)) {
		var re = /^[a-zA-Z0-9]+$/;
		if (re.test(value)) {
			return true;
		} else {
			// alert("格式不匹配，只能由A-Z，a-z，0-9组成！");
			return false;
		}
	}
}

/**
 * 验证表单中的必填项是否输入完整
 * 
 * @param {}
 *            id
 */
function checkForm(id, message) {
	var form = Ext.getCmp(id);
	if (form) {
		if (!form.getForm().isValid()) {
			Ext.MessageBox.show({
				title : '提示信息',
				msg : null == message || "" == message ? "请检查必填项和必选项是否完整！"
						: "请检查" + message + "信息的必填项和必选项是否完整！",
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
			return false;
		}
		return true;
	}
};

/**
 * 营业执照号码校验
 * 
 * @param {}
 *            id : 营业务执照号码控件的id
 */
function checkCodexy(id) {
	var licenseNo = Ext.getCmp(id);
	if (!licenseNo) {
		return;
	}
	if ("" == licenseNo.getValue()) {
		return;
	}
	no = String(no);
	var check = new RegExp("\d{15}");
	if (check.test(no)) {
		Ext.MessageBox.show({
			title : '提示信息',
			msg : '输入的营业执照号码的格式不正确！',
			icon : Ext.MessageBox.ERROR
		});
		licenseNo.focus(true, true);
		return false;
	}
	var m, n, s, p, i;
	var value;
	var p = 10;
	var m = 10;
	var n = 11;
	for ( var i = 1; i <= 14; i++) {
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
		var check = new RegExp('^\\d{6}(n|N)([a-z]|[0-9]|[A-Z]){1}\\d{6}(x|X)$');
		if (check.test(no)) {
			return true;
		}
		check = new RegExp('^([0-9]|[a-z]){13}$');
		if (check.test(no)) {
			return true;
		}
		Ext.MessageBox.show({
			title : '提示信息',
			msg : '输入的营业执照号码的格式不正确！',
			icon : Ext.MessageBox.ERROR
		});
		licenseNo.focus(true, true);
		return false;
	}
};

/**
 * 
 * @param val
 *            测试value值是否为空
 * @returns {Boolean}
 */
function valueIsEmpty(val) {
	if (typeof(val)=='undefined'||val == undefined || val == '' || val == null || val == 'null'
			|| val == 'undefined') {
		return true;
	} else if (typeof val == "string"
			&& val.replace(/(^\s*)|(\s*$)/g, "") == '') {
		return true;
	}

	return false;
}

/**
 * 格式化日期
 * 
 * @param {}
 *            date 日期对象
 * @return {} format 日期格式
 */
Date.prototype.formatDate = function(date, format) {
	var o = {
		"M+" : date.getMonth() + 1, // month
		"d+" : date.getDate(), // day
		"h+" : date.getHours(), // hour
		"m+" : date.getMinutes(), // minute
		"s+" : date.getSeconds(), // second
		"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
		"S" : date.getMilliseconds()
	// millisecond
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

/**
 * 日期校验，判断date1是否大于date2
 * 
 * @param date1
 * @param date2
 * @returns {Boolean}
 */
function compareDate(date1, date2) {
	if (typeof date1 == "string")
		date1 = new Date(Date.parse(date1.replace(/\-/g, "\/")));
	if (typeof date2 == "string")
		date2 = new Date(Date.parse(date2.replace(/\-/g, "\/")));
	if (date1 > date2)
		return true;
	else
		return false;
}
/**
 * 计算两日期相差天数
 * 
 * @param date1
 * @param date2
 * @returns {int}
 */
function diffDate(date1, date2) {
	if (typeof date1 == "string")
		date1 = new Date(Date.parse(date1.replace(/\-/g, "\/")));
	if (typeof date2 == "string")
		date2 = new Date(Date.parse(date2.replace(/\-/g, "\/")));
	var days = parseInt(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24);// 把相差的毫秒数转换为天数
	return days;
}
/**
 * 计算两日期相差天数(不取绝对值)
 * 
 * @param date1
 * @param date2
 * @returns {int}
 */
function diffDateNoAbs(date1, date2) {
	if (typeof date1 == "string")
		date1 = new Date(Date.parse(date1.replace(/\-/g, "\/")));
	if (typeof date2 == "string")
		date2 = new Date(Date.parse(date2.replace(/\-/g, "\/")));
	var days = parseInt((date1 - date2) / 1000 / 60 / 60 / 24);// 把相差的毫秒数转换为天数
	return days;
}
// Date 日期加法
function AddDays(date, value) {
	return new Date(date.setDate(date.getDate() + value));
}

/**
 * date:日期 value:需要增加的天数 format:返回的日期的格式
 */
function DaysAdd(date, value, format) {
	if (undefined != date && "" != date) {
		// 判断传递过来的date是否包含"-"符号
		if (date.indexOf('-') < 0) {
			date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-'
					+ date.substr(6);
		}
		if (undefined != format && "" != format) {
			return formatDate(format, new Date(Date.parse(new Date(date
					.replace(/-/g, '/')))
					+ (86400000 * value)));
		} else {
			return formatDate('YYYYMMDD', new Date(Date.parse(new Date(date
					.replace(/-/g, '/')))
					+ (86400000 * value)));
		}
	}
};

/**
 * 验证字符数
 * 
 * @param {}
 *            str
 * @param {}
 *            len
 * @return {Boolean}
 */
function chkStrLen(comId, title, lenNum) {
	// /<summary>获得字符串实际长度，中文2，英文1</summary>
	// /<param name="str">要获得长度的字符串</param>
	var comVal = Ext.getCmp(comId).getValue();
	if (!checkstring_allSpace(comVal)) {
		Ext.MessageBox.show({
			title : '提示信息',
			msg : '【' + title + '】不能输入空格，请重新填写！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		Ext.getCmp(comId).focus(true, true);
		// return false;
		return false;
	}
	if (null != comVal || "" != comVal) {
		var realLength = 0, len = comVal.length, charCode = -1;
		for ( var i = 0; i < len; i++) {
			charCode = comVal.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128)
				realLength += 1;
			else
				realLength += 2;
		}
		// alert('realLength:'+parseInt(realLength));
		// alert('len:'+parseInt(lenNum));
		if (parseInt(realLength) > parseInt(lenNum)) {
			Ext.MessageBox.show({
				title : '提示信息',
				// msg : '【' + title + '】不能超过【' + (lenNum/2) +
				// '】个汉字，请重新输入！\n注：汉字为两个字符，字母、数字和符号为一个字符！',
				msg : '【' + title + '】信息输入的长度过长，请重新输入！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			Ext.getCmp(comId).focus(true, true);
			// return false;
			return false;
		} else {
			return true;
		}
		/*
		 * else { return true; }
		 */
	}
};

/**
 * 计算字符数
 * 
 * @param {}
 *            str
 * @param {}
 *            len
 * @return {Boolean}
 */
function calcuStrLen(comVal) {
	var realLength = 0;
	if (null != comVal || "" != comVal) {
		var len = comVal.length, charCode = -1;
		for ( var i = 0; i < len; i++) {
			charCode = comVal.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128)
				realLength += 1;
			else
				realLength += 2;
		}
	}
	return parseInt(realLength);
};
// 判断金额类输入项输入是否合法
function checkAmt(comId, title) {
	var comVal = Ext.getCmp(comId).getValue();
	if (!checkstring_allSpace(comVal)) {
		Ext.MessageBox.show({
			title : '提示信息',
			msg : '【' + title + '】的不能输入空格，请重新填写！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		Ext.getCmp(comId).focus(true, true);
		return false;
	}
	if (null != comVal || "" != comVal) {
		if (comVal < 0) {
			Ext.MessageBox.show({
				title : '提示信息',
				msg : '【' + title + '】不能输入负数，请重新输入！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			Ext.getCmp(comId).focus(true, true);
			return false;
		} else {
			return true;
		}
	}
};

// js日期格式转换
// pattern : 转换后的格式
// YYYY-MM-DD、YYYYMMDD
// date : 要转换的日期对象
function formatDate(pattern, date) {
	function formatNumber(data, format) {// 3
		format = format.length;
		data = data || 0;
		// return format == 1 ? data :
		// String(Math.pow(10,format)+data).substr(-format);//该死的IE6！！！
		return format == 1 ? data
				: (data = String(Math.pow(10, format) + data))
						.substr(data.length - format);
	}
	return pattern.replace(/([YMDhsm])\1*/g, function(format) {
		switch (format.charAt()) {
		case 'Y':
			return formatNumber(date.getFullYear(), format);
		case 'M':
			return formatNumber(date.getMonth() + 1, format);
		case 'D':
			return formatNumber(date.getDate(), format);
		case 'w':
			return date.getDay() + 1;
		case 'h':
			return formatNumber(date.getHours(), format);
		case 'm':
			return formatNumber(date.getMinutes(), format);
		case 's':
			return formatNumber(date.getSeconds(), format);
		}
	});
};

//// 日期格式化
//Date.prototype.format = function(formatStr) {
//	var date = this;
//	/*
//	 * 函数：填充0字符 参数：value-需要填充的字符串, length-总长度 返回：填充后的字符串
//	 */
//	var zeroize = function(value, length) {
//		if (!length) {
//			length = 2;
//		}
//		value = new String(value);
//		for ( var i = 0, zeros = ''; i < (length - value.length); i++) {
//			zeros += '0';
//		}
//		return zeros + value;
//	};
//	return formatStr
//			.replace(
//					/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g,
//					function($0) {
//						switch ($0) {
//						case 'd':
//							return date.getDate();
//						case 'dd':
//							return zeroize(date.getDate());
//						case 'ddd':
//							return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri',
//									'Sat' ][date.getDay()];
//						case 'dddd':
//							return [ 'Sunday', 'Monday', 'Tuesday',
//									'Wednesday', 'Thursday', 'Friday',
//									'Saturday' ][date.getDay()];
//						case 'M':
//							return date.getMonth() + 1;
//						case 'MM':
//							return zeroize(date.getMonth() + 1);
//						case 'MMM':
//							return [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//									'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][date
//									.getMonth()];
//						case 'MMMM':
//							return [ 'January', 'February', 'March', 'April',
//									'May', 'June', 'July', 'August',
//									'September', 'October', 'November',
//									'December' ][date.getMonth()];
//						case 'yy':
//							return new String(date.getFullYear()).substr(2);
//						case 'yyyy':
//							return date.getFullYear();
//						case 'h':
//							return date.getHours() % 12 || 12;
//						case 'hh':
//							return zeroize(date.getHours() % 12 || 12);
//						case 'H':
//							return date.getHours();
//						case 'HH':
//							return zeroize(date.getHours());
//						case 'm':
//							return date.getMinutes();
//						case 'mm':
//							return zeroize(date.getMinutes());
//						case 's':
//							return date.getSeconds();
//						case 'ss':
//							return zeroize(date.getSeconds());
//						case 'l':
//							return date.getMilliseconds();
//						case 'll':
//							return zeroize(date.getMilliseconds());
//						case 'tt':
//							return date.getHours() < 12 ? 'am' : 'pm';
//						case 'TT':
//							return date.getHours() < 12 ? 'AM' : 'PM';
//						}
//					});
//};
// Date 转字符串
function dateToStr(inDate, format) {
	if (format == undefined) {
		format = '';
	}
	var strYear = new String(inDate.getFullYear());
	var strMonth = new String(inDate.getMonth() + 1);
	var strDate = new String(inDate.getDate());
	if (strMonth.length == 1) {
		strMonth = '0' + strMonth;
	}
	if (strDate.length == 1) {
		strDate = '0' + strDate;
	}
	return strYear + format + strMonth + format + strDate;
};
// yyymmdd转 yyyy/mm
function transDate(inDate, format) {
	if (format == undefined) {
		format = '/';
	}
	var strYear = inDate.substring(0, 4);
	var strMonth = inDate.substring(4, 6);
	var strDate = inDate.substring(6, 8);
	// if(strMonth.length == 1){
	// strMonth = '0' + strMonth;
	// }
	// if(strDate.length == 1){
	// strDate = '0' + strDate;
	// }
	return strYear + format + strMonth + format + strDate;
};
//
dateStrFormat = function(inStr, format) {
	if (format == undefined) {
		format = '/';
	}
	var year = inStr.substring(0, 4);
	var month = inStr.substring(4, 6);
	var day = inStr.substring(6, 8);
	return year + format + month + format + day;
};

/**
 * 返回到历史页面
 */
function backToHisPage() {
	history.back();
};

function Map() {
	this.elements = new Array();
	// 获取MAP元素个数
	this.size = function() {
		return this.elements.length;
	};

	// 判断MAP是否为空
	this.isEmpty = function() {
		return (this.elements.length < 1);
	};

	// 删除MAP所有元素
	this.clear = function() {
		this.elements = new Array();
	};

	// 向MAP中增加元素（key, value)
	this.put = function(_key, _value) {
		this.elements.push({
			key : _key,
			value : _value
		});
	};

	// 删除指定KEY的元素，成功返回True，失败返回False
	this.remove = function(_key) {
		var bln = false;
		try {
			for ( var i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};

	// 获取指定KEY的元素值VALUE，失败返回NULL
	this.get = function(_key) {
		try {
			for ( var i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return this.elements[i].value;
				}
			}
		} catch (e) {
			return null;
		}
	};

	// 获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
	this.element = function(_index) {
		if (_index < 0 || _index >= this.elements.length) {
			return null;
		}
		return this.elements[_index];
	};

	// 判断MAP中是否含有指定KEY的元素
	this.containsKey = function(_key) {
		var bln = false;
		try {
			for ( var i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};

	// 判断MAP中是否含有指定VALUE的元素
	this.containsValue = function(_value) {
		var bln = false;
		try {
			for ( var i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};

	// 获取MAP中所有VALUE的数组（ARRAY）
	this.values = function() {
		var arr = new Array();
		for ( var i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].value);
		}
		return arr;
	};

	// 获取MAP中所有KEY的数组（ARRAY）
	this.keys = function() {
		var arr = new Array();
		for ( var i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].key);
		}
		return arr;
	};
};
/** js构建Map集合* */

/**
 * 展示润乾报表打印页面 map : 生成润乾报表参数集合Map对象 报表名称的名称约定，例如：map.put("raq","test");
 */
function showReportPrintWin(map) {
	/*
	 * var arr = param.each; for(var i=0;i<arr.length;i++){ alert(arr[i]);
	 * alert(param.get(arr[i])); }
	 */
	// 判断生成润乾报表打印的参数不为空
	if (map.size() > 0) {
		// 跳转到润乾报表的打印页面
		var url = appConfig.baseUrl + '/report/jsp/report.jsp';
		var arr = new Array();
		arr = map.keys();// 获取所有的参数键值信息
		url += '?raq=' + map.get('raq') + '.raq&params=pagesize=1;firstRow=0;maxRow=9999;pageNo=1;';// 设置打印参数信息
		var title="";
		for ( var i = 0; i < arr.length; i++) {
			var key = arr[i];
			var val = map.get(key);
			url += key + '=' + val + ';';
			if(key=="title"){
				title=val;
			}
		};
		url += "&title=" + title;
		// 以模式对话框的形式显示润乾打印页面
		// window.showModalDialog( url, "",
		// "dialogWidth:880px;dialogHeight:680px;resizable:no;status:no" );
		var mapWin = window
				.open(
						url,
						"",
						'menubar=1,toolbar=0,directories=0,location=1,scrollbars=yes,status=yes,resizable=yes,top=120,left=150');
	}
};

/**
 * 比较两个日期的大小 date1:日期1的值 date2:日期2的值 compId:获取焦点的控件的id msg:错误的提示信息
 */
function compDate(date1, date2, compId, msg) {
	if (typeof date1 == "string")
		date1 = new Date(Date.parse(date1.replace(/\-/g, "\/")));
	if (typeof date2 == "string")
		date2 = new Date(Date.parse(date2.replace(/\-/g, "\/")));
	if (date1 > date2) {
		Ext.MessageBox.show({
			title : '系统提示',
			msg : undefined != msg || '' != msg ? msg : '日期选择有误，请重新选择！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		Ext.getCmp(compId).focus();// 日期控件获取焦点
		return true;
	} else {
		return false;
	}
};

// 校验电话号码
function checkPhoneNo(id) {
	var val = Ext.getCmp(id).getValue();
	if (undefined != val || "" != val) {
		// 判断输入的电话号码是否合法
		try {
			if (/^((0\d{2,3})(-)?)(\d{7,8})(-(\d{3,}))?$/.test(val)
					|| /^1[3458]\d{9}$/.test(val)) {
				return true;
			} else {
				Ext.MessageBox.show({
					title : '提示信息',
					msg : '请输入正确的联系电话！',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				Ext.getCmp(id).focus();
				return false;
			}
		} catch (e) {
			return false;
		}
	}
};

// 验证营业执照号码的格式是否正确
function chkQueryCodeXy(id) {
	var val = Ext.getCmp(id).getValue();
	// if(undefined==val || ""==val){
	// return;
	// }
	// var Errors = new Array("请输入正确的营业执照号码", "");
	var no = String(val); // 将营业执照号码转换成String类型
	var reg = new RegExp("\d{15}");
	if (reg.test(no)) {
		// this.codeXyText = Errors[0];
		return false;
	}
	var m, n, s, p, i;
	var value;
	var p = 10;
	var m = 10;
	var n = 11;
	for ( var i = 1; i <= 14; i++) {
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
		var check = new RegExp('^\\d{6}(n|N)([a-z]|[0-9]|[A-Z]){1}\\d{6}(x|X)$');
		if (check.test(no)) {
			return true;
		}
		check = new RegExp('^([0-9]|[a-z]){13}$');
		if (check.test(no)) {
			return true;
		}
		// this.codeXyText = Errors[0];
		return false;
	}
};

// 格式日期字符串
function formatDateStr(dtStr) {
	var tempVal = dtStr;
	if (dtStr != null && dtStr != '') {
		var array = dtStr.split("-");
		if (array.length == 3) {
			tempVal = array[0] + array[1] + array[2];
		}
	}
	return tempVal;
};
/*
 * 对会计后台pubGetFld函数里面的特殊字符进行预处理 半角字符转为全角字符
 */
function doFilter_pubGetFld(str) {
	if (valueIsEmpty(str))
		return '';

	return str.replace(/\:/g, "：").replace(/\'/g, "‘").replace(/\\/g, "\\")
			.replace(/\=/g, "＝").replace(/\>/g, "》").replace(/\|/g, "｜")
			.replace(/\,/g, "，").replace(/\{/g, "｛").replace(/\}/g, "｝")
			.replace(/\]/g, "】").replace(/\[/g, "【");
};
function StringToDate(DateStr) {
	var y = DateStr.substr(0, 4);
	var m = DateStr.substr(4, 2);
	var d = DateStr.substr(6, 2);
	return new Date(y, --m, d);
}

function MonthBetween(start, end) {
	var dStart = StringToDate(start);
	var dEnd = StringToDate(end);
	return (dEnd.getMonth() + 1)
			+ ((dEnd.getFullYear() - dStart.getFullYear()) * 12)
			- (dStart.getMonth() + 1);
}

// 浮点数相加
function dcmAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (dcmMul(arg1, m) + dcmMul(arg2, m)) / m;
}
// 浮点数相减
function dcmSub(arg1, arg2) {
	return dcmAdd(arg1, -arg2);
}
// 浮点数相乘
function dcmMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m);
}
Number.prototype.add = function(arg) {
	return dcmAdd(this, arg);
}
Number.prototype.sub = function(arg) {
	return dcmSub(this, arg);
}
Number.prototype.mul = function(arg) {
	return dcmMul(this, arg);
}