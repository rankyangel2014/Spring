// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.payment');
com.jsjn.jnf.payment.PaymentExceptionInfoDetailMgr = function(config) {
	if (typeof(com.jsjn.jnf.payment.PaymentExceptionInfoDetailMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.payment.PaymentExceptionInfoDetailMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.payment.PaymentExceptionInfoDetailMgr']);
		com.jsjn.jnf.payment.PaymentExceptionInfoDetailMgr.WINDOW = this;
	}
	return com.jsjn.jnf.payment.PaymentExceptionInfoDetailMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.payment.PaymentExceptionInfoDetailMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textField1595224495 = new Ext.form.TextField({
			id : "failReason.PaymentExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 500,
			name : "failReason",
			columnWidth : "1",
			fieldLabel : "失败原因",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField35822796 = new Ext.form.TextField({
			id : "status.PaymentExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "status",
			columnWidth : "0.5",
			fieldLabel : "支付状态",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1364971702 = new Ext.form.TextField({
			id : "amount.PaymentExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "amount",
			columnWidth : "0.5",
			fieldLabel : "支付金额",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField736311967 = new Ext.form.TextField({
			id : "collAccount.PaymentExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "collAccount",
			columnWidth : "0.5",
			fieldLabel : "收款账号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField375692108 = new Ext.form.TextField({
			id : "payAccount.PaymentExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "payAccount",
			columnWidth : "0.5",
			fieldLabel : "付款账号",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "orderNo.PaymentExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "orderNo",
			columnWidth : "0.5",
			fieldLabel : "支付订单编号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField939531252 = new Ext.form.TextField({
			id : "modified.PaymentExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "modified",
			columnWidth : "0.5",
			fieldLabel : "交易时间",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField837590486 = new Ext.form.TextField({
			id : "channel.PaymentExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "channel",
			columnWidth : "0.5",
			fieldLabel : "支付通道",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField462110756 = new Ext.form.TextField({
			id : "payee.PaymentExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "payee",
			columnWidth : "0.5",
			fieldLabel : "收款人",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField713575616 = new Ext.form.TextField({
			id : "payer.PaymentExceptionInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "payer",
			columnWidth : "0.5",
			fieldLabel : "付款人",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField1181073381 = new Ext.form.TextField({
			id : "tradeNo.PaymentExceptionInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "tradeNo",
			columnWidth : "0.5",
			fieldLabel : "交易订单编号",
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
				id : "close.PaymentExceptionInfoDetailMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.payment.PaymentExceptionInfoDetailMgr.close(
							button, event);
				}
			}],
			collapsed : false,
			id : "form.PaymentExceptionInfoDetailMgr",
			height : 150,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "异常支付信息详情",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.textField375692108,
							this.textField736311967, this.textField1364971702,
							this.textField35822796, this.textField1595224495],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : "0.5",
					autoWidth : false,
					border : false,
					items : [this.textField1181073381, this.textField713575616,
							this.textField462110756, this.textField837590486,
							this.textField939531252],
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
			id : "win.PaymentExceptionInfoDetailMgr",
			title : "异常支付信息详情",
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
