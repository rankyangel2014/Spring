/**
 * generated by JNGU-2012-ExtPlugins.
 * please  write here  com.jsjn.jnf.trade.TradeInfoDetailMgr's method:
 * Javascript class static method be used as ExtJs's event method handler,like 'com.jsjn.jnf.trade.TradeInfoDetailMgr.method(); this  is Class static method'
 * Javasctipt object method be used as get or set object's properties,like 'com.jsjn.jnf.trade.TradeInfoDetailMgr.prototype.method(); this is object's method'
 * com.jsjn.jnf.trade.TradeInfoDetailMgr.main method is the beginning of all.
 * com.jsjn.jnf.trade.TradeInfoDetailMgr.WINDOW  iscom.jsjn.jnf.trade.TradeInfoDetailMgr's  Singleton instance object .
 * you can get com.jsjn.jnf.trade.TradeInfoDetailMgr.WINDOW reference  by appfram.getInstance('com.jsjn.jnf.trade.TradeInfoDetailMgr'). 
 */
appframe.afterInstance("com.jsjn.jnf.trade.TradeInfoDetailMgr", function() {
	
});

com.jsjn.jnf.trade.TradeInfoDetailMgr.panelInit = function(record){
	var tradeNo = record.json.tradeNo;			//交易订单编号
	var bNo = record.json.bNo;					//交易批次号
	var tradeType = record.json.tradeType;		//交易类型
	var mid = record.json.mid;					//商户编号
	var mSerialNo = record.json.mSerialNo;		//商户订单流水号
	var externLoanNo = record.json.externLoanNo;//外部合同编号
	var payer = record.json.payer;				//付款人
	var payerName = record.json.payerName;		//付款人姓名
	var payerBankCardNo = record.json.payerBankCardNo;//付款人银行卡号
	var payee = record.json.payee;				//收款人
	var payeeName = record.json.payeeName;		//收款人姓名
	var amount = record.json.amount;			//金额
	var status = record.json.status;			//交易状态
	var failReason = record.json.failReason;	//失败原因
	var desc = record.json.desc;				//交易说明
	var created = record.json.created;			//交易开始时间
	var modified = record.json.modified;		//交易结束时间
	
	Ext.getCmp('tradeNo.TradeInfoDetailMgr').setValue(tradeNo);
	Ext.getCmp('bNo.TradeInfoDetailMgr').setValue(bNo);
	Ext.getCmp('tradeType.TradeInfoDetailMgr').setValue(storeFind(tradeTypeStore, tradeType));
	Ext.getCmp('mid.TradeInfoDetailMgr').setValue(mid);
	Ext.getCmp('mSerialNo.TradeInfoDetailMgr').setValue(mSerialNo);
	Ext.getCmp('externLoanNo.TradeInfoDetailMgr').setValue(externLoanNo);
	Ext.getCmp('payer.TradeInfoDetailMgr').setValue(payer);
	Ext.getCmp('payerName.TradeInfoDetailMgr').setValue(payerName);
	Ext.getCmp('payerBankCardNo.TradeInfoDetailMgr').setValue(payerBankCardNo);
	Ext.getCmp('payee.TradeInfoDetailMgr').setValue(payee);
	Ext.getCmp('payeeName.TradeInfoDetailMgr').setValue(payeeName);
	Ext.getCmp('amount.TradeInfoDetailMgr').setValue(formatMoney(amount));
	Ext.getCmp('status.TradeInfoDetailMgr').setValue(storeFind(tradeStatusStore, status));
	Ext.getCmp('failReason.TradeInfoDetailMgr').setValue(failReason);
	Ext.getCmp('desc.TradeInfoDetailMgr').setValue(desc);
	Ext.getCmp('created.TradeInfoDetailMgr').setValue(formatDateToPattern("YYYY-MM-DD",new Date(new Number(created))));
	Ext.getCmp('modified.TradeInfoDetailMgr').setValue(formatDateToPattern("YYYY-MM-DD",new Date(new Number(modified))));
	
};

/**
 * 关闭
 */
com.jsjn.jnf.trade.TradeInfoDetailMgr.close = function(){
	com.jsjn.jnf.trade.TradeInfoDetailMgr.WINDOW.hide();
};