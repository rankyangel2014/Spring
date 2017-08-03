// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.UpdateConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.UpdateConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.UpdateConfigMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.UpdateConfigMgr']);
		com.jsjn.jnf.config.UpdateConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.config.UpdateConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.config.UpdateConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.dateField1585694884 = new Ext.form.DateField({
			id : "startTime.UpdateConfigMgr",
			allowBlank : false,
			name : "startTime",
			format : "Ymd",
			fieldLabel : "<font color=red>*</font>开始时间",
			anchor : "90%"
		});

		this.store231562867 = new Ext.data.Store({});

		this.comboBox436305384 = new Ext.form.ComboBox({
			region : "",
			allowBlank : false,
			store : this.store231562867,
			emptyText : "--请选择--",
			fieldLabel : "<font color=red>*</font>费用种类",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "feeType.UpdateConfigMgr",
			hiddenName : "feeType",
			displayField : "paramValue",
			name : "feeType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "mid.UpdateConfigMgr",
			maxLength : 4,
			allowBlank : false,
			name : "mid",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>商户号",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.dateField911831933 = new Ext.form.DateField({
			id : "endTime.UpdateConfigMgr",
			allowBlank : false,
			name : "endTime",
			format : "Ymd",
			fieldLabel : "<font color=red>*</font>结束时间",
			anchor : "90%"
		});

		this.textField427325402 = new Ext.form.TextField({
			id : "fee.UpdateConfigMgr",
			allowBlank : false,
			name : "fee",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>费用",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField713575616 = new Ext.form.TextField({
			id : "orgNo.UpdateConfigMgr",
			maxLength : 9,
			allowBlank : false,
			name : "orgNo",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>机构号",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.formPanel1692878715 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			buttons : [{
				id : "save.UpdateConfigMgr",
				text : "修改",
				handler : function(button, event) {
					com.jsjn.jnf.config.UpdateConfigMgr.save(button, event);
				}
			}, {
				id : "close.UpdateConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.config.UpdateConfigMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.UpdateConfigMgr",
			height : 200,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "计费参数新增",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.comboBox436305384,
							this.dateField1585694884],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : ".5",
					autoWidth : false,
					border : false,
					items : [this.textField713575616, this.textField427325402,
							this.dateField911831933],
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
			id : "win.UpdateConfigMgr",
			title : "计费参数修改",
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
