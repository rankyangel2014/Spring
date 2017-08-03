// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.UpdateDictConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.UpdateDictConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.UpdateDictConfigMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.UpdateDictConfigMgr']);
		com.jsjn.jnf.config.UpdateDictConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.config.UpdateDictConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.config.UpdateDictConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textArea2048125688 = new Ext.form.TextArea({
			id : "label.UpdateDictConfigMgr",
			allowBlank : false,
			name : "label",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>字典中文标签",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textArea1956981074 = new Ext.form.TextArea({
			id : "testValue.UpdateDictConfigMgr",
			allowBlank : false,
			name : "testValue",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>测试环境字典值",
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1183582439 = new Ext.form.TextField({
			id : "id.UpdateDictConfigMgr",
			maxLength : 100,
			allowBlank : false,
			name : "desc",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>编号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textArea475981126 = new Ext.form.TextArea({
			id : "type.UpdateDictConfigMgr",
			allowBlank : false,
			name : "type",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>字典英文标签",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textArea87182324 = new Ext.form.TextArea({
			id : "value.UpdateDictConfigMgr",
			allowBlank : false,
			name : "value",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>正式环境字典值",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField1375763069 = new Ext.form.TextField({
			id : "desc.UpdateDictConfigMgr",
			allowBlank : false,
			maxLength : 100,
			name : "desc",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>字典备注说明",
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
				id : "save.UpdateDictConfigMgr",
				text : "修改",
				handler : function(button, event) {
					com.jsjn.jnf.config.UpdateDictConfigMgr.save(button, event);
				}
			}, {
				id : "close.UpdateDictConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.config.UpdateDictConfigMgr
							.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.UpdateDictConfigMgr",
			height : 200,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "修改参数配置",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1183582439, this.textArea1956981074,
							this.textArea2048125688],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : ".5",
					autoWidth : false,
					border : false,
					items : [this.textField1375763069, this.textArea87182324,
							this.textArea475981126],
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
			id : "win.UpdateDictConfigMgr",
			title : "修改参数配置",
			height : "33%",
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
