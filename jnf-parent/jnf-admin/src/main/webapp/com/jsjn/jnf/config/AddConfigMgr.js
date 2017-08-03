// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.AddConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.AddConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.AddConfigMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.AddConfigMgr']);
		com.jsjn.jnf.config.AddConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.config.AddConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.config.AddConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.dateField1585694884 = new Ext.form.DateField({
			id : "startTime.AddConfigMgr",
			allowBlank : false,
			name : "startTime",
			format : "Ymd",
			fieldLabel : "<font color=red>*</font>开始时间",
			anchor : "90%"
		});

		this.store231562867 = new Ext.data.Store({});

		this.comboBox436305384 = new Ext.form.ComboBox({
			region : "",
			store : this.store231562867,
			allowBlank : false,
			emptyText : "--请选择--",
			fieldLabel : "<font color=red>*</font>费用种类",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "feeType.AddConfigMgr",
			hiddenName : "feeType",
			displayField : "paramValue",
			name : "feeType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "mid.AddConfigMgr",
			allowBlank : false,
			maxLength : 4,
			name : "mid",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>商户号",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.dateField911831933 = new Ext.form.DateField({
			id : "endTime.AddConfigMgr",
			allowBlank : false,
			name : "endTime",
			format : "Ymd",
			fieldLabel : "<font color=red>*</font>结束时间",
			anchor : "90%"
		});

		this.textField427325402 = new Ext.form.TextField({
			id : "fee.AddConfigMgr",
			allowBlank : false,
			name : "fee",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>费用",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField713575616 = new Ext.form.TextField({
			id : "orgNo.AddConfigMgr",
			allowBlank : false,
			maxLength : 9,
			name : "orgNo",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>机构号",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.formPanel1692878715 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			buttons : [{
				id : "save.AddConfigMgr",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.config.AddConfigMgr.save(button, event);
				}
			}, {
				id : "close.AddConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.config.AddConfigMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.AddConfigMgr",
			frame : false,
			height : 200,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				title : "计费参数新增",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					columnWidth : "0.5",
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.comboBox436305384,
							this.dateField1585694884],
					layout : "form"
				}, {
					columnWidth : ".5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField713575616, this.textField427325402,
							this.dateField911831933],
					layout : "form"
				}],
				layout : "column",
				xtype : "fieldset",
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
			id : "win.AddConfigMgr",
			title : "计费参数新增",
			height : "33%",
			items : [this.formPanel1692878715],
			xtype : "window",
			layout : "fit",
			buttonAlign : "center",
			plain : false,
			modal : true
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
