// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.trade');
com.jsjn.jnf.trade.TradeExceptionInfoDetailMgr = function(config) {
	if (typeof(com.jsjn.jnf.trade.TradeExceptionInfoDetailMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.trade.TradeExceptionInfoDetailMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.trade.TradeExceptionInfoDetailMgr']);
		com.jsjn.jnf.trade.TradeExceptionInfoDetailMgr.WINDOW = this;
	}
	return com.jsjn.jnf.trade.TradeExceptionInfoDetailMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.trade.TradeExceptionInfoDetailMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textArea592979836 = new Ext.form.TextArea({
			id : "desc.TradeExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "desc",
			value : "",
			columnWidth : "0.5",
			fieldLabel : "交易说明",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField1137792427 = new Ext.form.TextField({
			id : "modified.TradeExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "modified",
			columnWidth : "0.5",
			fieldLabel : "交易结束时间",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField816117846 = new Ext.form.TextField({
			id : "status.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "status",
			columnWidth : "0.5",
			fieldLabel : "交易状态",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1595224495 = new Ext.form.TextField({
			id : "amount.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 500,
			name : "amount",
			columnWidth : "1",
			fieldLabel : "交易金额",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField35822796 = new Ext.form.TextField({
			id : "payee.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "payee",
			columnWidth : "0.5",
			fieldLabel : "收款人",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1364971702 = new Ext.form.TextField({
			id : "payer.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "payer",
			columnWidth : "0.5",
			fieldLabel : "付款人",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField736311967 = new Ext.form.TextField({
			id : "mSerialNo.TradeExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "mSerialNo",
			columnWidth : "0.5",
			fieldLabel : "商户订单流水号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField375692108 = new Ext.form.TextField({
			id : "tradeType.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "tradeType",
			columnWidth : "0.5",
			fieldLabel : "交易类型",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "tradeNo.TradeExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "tradeNo",
			columnWidth : "0.5",
			fieldLabel : "交易订单编号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textArea207284239 = new Ext.form.TextArea({
			id : "exception.TradeExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "exception",
			value : "",
			columnWidth : "0.5",
			fieldLabel : "异常原因",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textArea542618200 = new Ext.form.TextArea({
			id : "failReason.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "failReason",
			columnWidth : "0.5",
			value : "",
			fieldLabel : "失败原因",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField2100341382 = new Ext.form.TextField({
			id : "created.TradeExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "created",
			columnWidth : "0.5",
			fieldLabel : "交易开始时间",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField322044898 = new Ext.form.TextField({
			id : "payerBankCardNo.TradeExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "payerBankCardNo",
			columnWidth : "0.5",
			fieldLabel : "付款人银行卡号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField939531252 = new Ext.form.TextField({
			id : "payeeName.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "payeeName",
			columnWidth : "0.5",
			fieldLabel : "收款人姓名",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField837590486 = new Ext.form.TextField({
			id : "payerName.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "payerName",
			columnWidth : "0.5",
			fieldLabel : "付款人姓名",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField462110756 = new Ext.form.TextField({
			id : "externLoanNo.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "externLoanNo",
			columnWidth : "0.5",
			fieldLabel : "外部合同编号",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField713575616 = new Ext.form.TextField({
			id : "mid.TradeExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "mid",
			columnWidth : "0.5",
			fieldLabel : "商户编号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField1181073381 = new Ext.form.TextField({
			id : "bNo.TradeExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "bNo",
			columnWidth : "0.5",
			fieldLabel : "交易批次号",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.formPanel1692878715 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			buttons : [{
				id : "close.TradeExceptionInfoDetailMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.trade.TradeExceptionInfoDetailMgr.close(
							button, event);
				}
			}],
			collapsed : false,
			id : "form.TradeExceptionInfoDetailMgr",
			height : 150,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "异常交易信息详情",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.textField375692108,
							this.textField736311967, this.textField1364971702,
							this.textField35822796, this.textField1595224495,
							this.textField816117846, this.textField1137792427,
							this.textArea592979836],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : "0.5",
					autoWidth : false,
					border : false,
					items : [this.textField1181073381, this.textField713575616,
							this.textField462110756, this.textField837590486,
							this.textField939531252, this.textField322044898,
							this.textField2100341382, this.textArea542618200,
							this.textArea207284239],
					layout : "form"
				}],
				collapseFirst : false,
				xtype : "fieldset",
				layout : "column",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}],
			layout : "column",
			columnWidth : "1",
			buttonAlign : "center",
			labelAlign : "right",
			border : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			width : "80%",
			closeAction : "hide",
			id : "win.TradeExceptionInfoDetailMgr",
			title : "异常交易信息详情",
			height : "60%",
			items : [this.formPanel1692878715],
			layout : "fit",
			xtype : "window",
			buttonAlign : "center",
			plain : false,
			modal : true
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
