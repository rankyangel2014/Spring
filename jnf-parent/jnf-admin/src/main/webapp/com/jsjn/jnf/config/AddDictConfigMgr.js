// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.AddDictConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.AddDictConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.AddDictConfigMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.AddDictConfigMgr']);
		com.jsjn.jnf.config.AddDictConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.config.AddDictConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.config.AddDictConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textField1259572205 = new Ext.form.TextField({
			id : "desc.AddDictConfigMgr",
			maxLength : 100,
			allowBlank : false,
			name : "desc",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>字典备注说明",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textArea624341401 = new Ext.form.TextArea({
			id : "label.AddDictConfigMgr",
			allowBlank : false,
			name : "label",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>字典中文标签",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textArea817738877 = new Ext.form.TextArea({
			id : "testValue.AddDictConfigMgr",
			allowBlank : false,
			name : "testValue",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>测试环境字典值",
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textArea1613161101 = new Ext.form.TextArea({
			id : "type.AddDictConfigMgr",
			allowBlank : false,
			name : "type",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>字典英文标签",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textArea769498052 = new Ext.form.TextArea({
			id : "value.AddDictConfigMgr",
			allowBlank : false,
			name : "value",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>正式环境字典值",
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
				id : "save.AddDictConfigMgr",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.config.AddDictConfigMgr.save(button, event);
				}
			}, {
				id : "close.AddDictConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.config.AddDictConfigMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.AddDictConfigMgr",
			height : 200,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "新增参数配置",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textArea817738877, this.textArea624341401,
							this.textField1259572205],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : ".5",
					autoWidth : false,
					border : false,
					items : [this.textArea769498052, this.textArea1613161101],
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
			id : "win.AddDictConfigMgr",
			title : "新增参数配置",
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
