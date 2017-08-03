// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.payment');
com.jsjn.jnf.payment.DealExceptionMgr = function(config) {
	if (typeof(com.jsjn.jnf.payment.DealExceptionMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.payment.DealExceptionMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.payment.DealExceptionMgr']);
		com.jsjn.jnf.payment.DealExceptionMgr.WINDOW = this;
	}
	return com.jsjn.jnf.payment.DealExceptionMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.payment.DealExceptionMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textArea814377674 = new Ext.form.TextArea({
			id : "exception.DealExceptionMgr",
			maxLength : 1000,
			allowBlank : false,
			name : "exception",
			fieldLabel : "异常原因：",
			selectOnFocus : false,
			anchor : "90%"
		});

		this.formPanel1692878715 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			buttons : [{
				id : "close.DealExceptionMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.payment.DealExceptionMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.DealExceptionMgr",
			height : 150,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "success.DealExceptionMgr",
					text : "支付成功",
					handler : function(button, event) {
						com.jsjn.jnf.payment.DealExceptionMgr.success(button,
								event);
					}
				}, {
					id : "fail.DealExceptionMgr",
					text : "支付失败",
					handler : function(button, event) {
						com.jsjn.jnf.payment.DealExceptionMgr.fail(button,
								event);
					}
				}],
				collapsed : false,
				defaults : "",
				title : "异常信息处理",
				style : "margin:5px",
				items : [{
					columnWidth : "1",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textArea814377674],
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
			id : "win.DealExceptionMgr",
			title : "异常信息处理",
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
