// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.UpdateMenuConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.UpdateMenuConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.UpdateMenuConfigMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.UpdateMenuConfigMgr']);
		com.jsjn.jnf.config.UpdateMenuConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.config.UpdateMenuConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.config.UpdateMenuConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textField126115967 = new Ext.form.TextField({
			id : "menuValue.UpdateMenuConfigMgr",
			maxLength : 20,
			allowBlank : false,
			name : "menuValue",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>字典标签",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField251182022 = new Ext.form.TextField({
			id : "menuCde.UpdateMenuConfigMgr",
			allowBlank : false,
			maxLength : 20,
			name : "menuCde",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>选项代码",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField568589998 = new Ext.form.TextField({
			id : "menuKey.UpdateMenuConfigMgr",
			allowBlank : false,
			maxLength : 20,
			name : "menuKey",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>字典值",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField825773515 = new Ext.form.TextField({
			id : "menuSort.UpdateMenuConfigMgr",
			maxLength : 20,
			allowBlank : false,
			name : "menuSort",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>排序",
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
				id : "save.UpdateMenuConfigMgr",
				text : "修改",
				handler : function(button, event) {
					com.jsjn.jnf.config.UpdateMenuConfigMgr.save(button, event);
				}
			}, {
				id : "close.UpdateMenuConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.config.UpdateMenuConfigMgr
							.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.UpdateMenuConfigMgr",
			frame : false,
			height : 200,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				title : "修改下拉参数",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					columnWidth : "0.5",
					autoWidth : false,
					border : false,
					items : [this.textField251182022, this.textField126115967],
					layout : "form"
				}, {
					columnWidth : ".5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField825773515, this.textField568589998],
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
			id : "win.UpdateMenuConfigMgr",
			title : "修改下拉参数",
			height : "28%",
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
