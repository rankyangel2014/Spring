//同步加载下拉选项数据
var  loadScript = function(url, callback){
    document.write('<script type="text/javascript" src="'+url+'" ><\/script>');

};
loadScript("js/kmStore.js?type=ggxh&t="+ Date.prototype.formatDate(new Date(), 'yyyyMMdd'));

//根据paraNo加载下拉菜单选项
var load_local_ggxh_data = function(paraNo){
	var array = ggxhstoredata;
	var narray = [];
	//记载默认空选项
	var defulat_ = {"menuSort":"","menuCde":"","menuKey":"","menuValue":"--请选择--"};
	narray[0] = defulat_;
	for (var i = 0; i < array.length; i++) {
		var data = array[i];
		if (data.menuCde === paraNo) {
			narray[narray.length] = data;
		}
	}
	return narray;
};

var xhreader = new Ext.data.JsonReader({
				id : "id"
			}, [ {
				mapping : "menuKey",
				type : "string",
				name : "paramKey"
			}, {
				mapping : "menuValue",
				type : "string",
				name : "paramValue"
			} ]);

/** 证件类型 */
idTypeStore = {};
idTypeStore.getStore = function() {
	if (idTypeStore.data == undefined || idTypeStore.data == '') {
		var data = load_local_ggxh_data('ID_TYPE');
		idTypeStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		idTypeStore.data.loadData(data);
	}
	return idTypeStore.data;
};


withhold = {};
withhold.getStore = function() {
	if (withhold.data == undefined || withhold.data == '') {
		var data = load_local_ggxh_data('WITHHOLD_CHANNEL');
		withhold.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		withhold.data.loadData(data);
	}
	return withhold.data;
};

withholdSignState = {};
withholdSignState.getStore = function() {
	if (withholdSignState.data == undefined || withholdSignState.data == '') {
		var data = load_local_ggxh_data('WITHHOLD_SIGN_STATE');
		withholdSignState.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		withholdSignState.data.loadData(data);
	}
	return withholdSignState.data;
};

signTradeType = {};
signTradeType.getStore = function() {
	if (signTradeType.data == undefined || signTradeType.data == '') {
		var data = load_local_ggxh_data('TRADE_TYPE');
		signTradeType.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		signTradeType.data.loadData(data);
	}
	return signTradeType.data;
};

/** 客户类型 */
custTypeStore = {};
custTypeStore.getStore = function() {
	if (custTypeStore.data == undefined || custTypeStore.data == '') {
		var data = load_local_ggxh_data('CUST_TYPE');
		custTypeStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		custTypeStore.data.loadData(data);
	}
	return custTypeStore.data;
};


/** 签约状态 */
signStatusStore = {};
signStatusStore.getStore = function() {
	if (signStatusStore.data == undefined || signStatusStore.data == '') {
		var data = load_local_ggxh_data('SIGN_STATUS');
		signStatusStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		signStatusStore.data.loadData(data);
	}
	return signStatusStore.data;
};

/** 支付状态 */
paymentStatusStore = {};
paymentStatusStore.getStore = function() {
	if (paymentStatusStore.data == undefined || paymentStatusStore.data == '') {
		var data = load_local_ggxh_data('PAYMENT_STATUS');
		paymentStatusStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		paymentStatusStore.data.loadData(data);
	}
	return paymentStatusStore.data;
};

/** 支付渠道 */
paymentChannelStore = {};
paymentChannelStore.getStore = function() {
	if (paymentChannelStore.data == undefined || paymentChannelStore.data == '') {
		var data = load_local_ggxh_data('PAYMENT_CHANNEL');
		paymentChannelStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		paymentChannelStore.data.loadData(data);
	}
	return paymentChannelStore.data;
};

/** 交易状态 */
tradeStatusStore = {};
tradeStatusStore.getStore = function() {
	if (tradeStatusStore.data == undefined || tradeStatusStore.data == '') {
		var data = load_local_ggxh_data('TRADE_STATUS');
		tradeStatusStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		tradeStatusStore.data.loadData(data);
	}
	return tradeStatusStore.data;
};

/** 交易类型 */
tradeTypeStore = {};
tradeTypeStore.getStore = function() {
	if (tradeTypeStore.data == undefined || tradeTypeStore.data == '') {
		var data = load_local_ggxh_data('TRADE_TYPE');
		tradeTypeStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		tradeTypeStore.data.loadData(data);
	}
	return tradeTypeStore.data;
};

/** 账号状态 */
memberStateStore = {};
memberStateStore.getStore = function() {
	if (memberStateStore.data == undefined || memberStateStore.data == '') {
		var data = load_local_ggxh_data('MEMBER_STATUS');
		memberStateStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		memberStateStore.data.loadData(data);
	}
	return memberStateStore.data;
};

/** 调用接口状态 */
interfaceStateStore = {};
interfaceStateStore.getStore = function() {
	if (interfaceStateStore.data == undefined || interfaceStateStore.data == '') {
		var data = load_local_ggxh_data('INTERFACE_STATUS');
		interfaceStateStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		interfaceStateStore.data.loadData(data);
	}
	return interfaceStateStore.data;
};

/** 调用业务状态 */
interBussStateStore = {};
interBussStateStore.getStore = function() {
	if (interBussStateStore.data == undefined || interBussStateStore.data == '') {
		var data = load_local_ggxh_data('INTER_BUSS_STATUS');
		interBussStateStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		interBussStateStore.data.loadData(data);
	}
	return interBussStateStore.data;
};

/** 计费类型 */
feeTypeStore = {};
feeTypeStore.getStore = function() {
	if (feeTypeStore.data == undefined || feeTypeStore.data == '') {
		var data = load_local_ggxh_data('FEE_TYPE');
		feeTypeStore.data = new Ext.data.Store({
			autoLoad : true,
			reader : xhreader
		});
		feeTypeStore.data.loadData(data);
	}
	return feeTypeStore.data;
};


/** 签约渠道 */
withholdChannelStore = {};
withholdChannelStore.getStore = function() {
    if (withholdChannelStore.data == undefined
            || withholdChannelStore.data == '') {
        var data = load_local_ggxh_data('WITHHOLD_CHANNEL');
        withholdChannelStore.data = new Ext.data.Store({
            autoLoad : true,
            reader : xhreader
        });
        withholdChannelStore.data.loadData(data);
    }
    return withholdChannelStore.data;
};
/** 业务类型 */
businessTypeStore = {};
businessTypeStore.getStore = function() {
    if (businessTypeStore.data == undefined
            || businessTypeStore.data == '') {
        var data = load_local_ggxh_data('JNF_BUSINESS_TYPE');
        businessTypeStore.data = new Ext.data.Store({
            autoLoad : true,
            reader : xhreader
        });
        businessTypeStore.data.loadData(data);
    }
    return businessTypeStore.data;
};

_getStore=function(url){
	var oXmlHttp = appframe.getXmlHttpRequest() ;
	oXmlHttp.open('GET', url, false); 
	oXmlHttp.setRequestHeader("X-Requested-With","XMLHttpRequest");
	oXmlHttp.send(null);
	return Ext.decode(oXmlHttp.responseText);
};

