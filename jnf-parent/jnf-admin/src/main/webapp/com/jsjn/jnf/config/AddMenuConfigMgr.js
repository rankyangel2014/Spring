// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.AddMenuConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.AddMenuConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.AddMenuConfigMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.AddMenuConfigMgr']);
		com.jsjn.jnf.config.AddMenuConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.config.AddMenuConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.config.AddMenuConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textField998866637 = new Ext.form.TextField({
			id : "menuValue.AddMenuConfigMgr",
			allowBlank : false,
			maxLength : 20,
			name : "menuValue",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>字典标签",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "menuCde.AddMenuConfigMgr",
			maxLength : 20,
			allowBlank : false,
			name : "menuCde",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>选项代码",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField713575616 = new Ext.form.TextField({
			id : "menuKey.AddMenuConfigMgr",
			maxLength : 20,
			allowBlank : false,
			name : "menuKey",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>字典值",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField2036957655 = new Ext.form.TextField({
			id : "menuSort.AddMenuConfigMgr",
			allowBlank : false,
			maxLength : 20,
			name : "menuSort",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>排序",
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
				id : "save.AddMenuConfigMgr",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.config.AddMenuConfigMgr.save(button, event);
				}
			}, {
				id : "close.AddMenuConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.config.AddMenuConfigMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.AddMenuConfigMgr",
			height : 200,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "新增下拉参数",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.textField998866637],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : ".5",
					autoWidth : false,
					border : false,
					items : [this.textField2036957655, this.textField713575616],
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
			id : "win.AddMenuConfigMgr",
			title : "新增下拉参数",
			height : "28%",
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
