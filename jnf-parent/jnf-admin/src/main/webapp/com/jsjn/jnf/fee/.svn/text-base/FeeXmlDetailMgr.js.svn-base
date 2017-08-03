// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.fee');
com.jsjn.jnf.fee.FeeXmlDetailMgr = function(config) {
	if (typeof(com.jsjn.jnf.fee.FeeXmlDetailMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.fee.FeeXmlDetailMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.fee.FeeXmlDetailMgr']);
		com.jsjn.jnf.fee.FeeXmlDetailMgr.WINDOW = this;
	}
	return com.jsjn.jnf.fee.FeeXmlDetailMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.fee.FeeXmlDetailMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textArea1143308661 = new Ext.form.TextArea({
			id : "inputXml.FeeXmlDetailMgr",
			maxLength : 4000,
			allowBlank : true,
			name : "inputXml",
			columnWidth : "1",
			fieldLabel : "输入报文",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textArea1831932924 = new Ext.form.TextArea({
			id : "outputXml.FeeXmlDetailMgr",
			allowBlank : true,
			maxLength : 4000,
			name : "outputXml",
			columnWidth : "1",
			fieldLabel : "输出报文",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.formPanel1692878715 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			width : 400,
			buttons : [{
				id : "close",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.fee.FeeXmlDetailMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.FeeXmlDetailMgr",
			height : 450,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "报文信息详情",
				style : "margin:5px",
				items : [{
					columnWidth : "1",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textArea1143308661],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : "1",
					autoWidth : false,
					border : false,
					items : [this.textArea1831932924],
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
			id : "win.FeeXmlDetailMgr",
			title : "报文信息详情",
			height : "70%",
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
