// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.AddChannelConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.AddChannelConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.AddChannelConfigMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.AddChannelConfigMgr']);
		com.jsjn.jnf.config.AddChannelConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.config.AddChannelConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.config.AddChannelConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textField998866637 = new Ext.form.TextField({
			id : "channelName.AddChannelConfigMgr",
			maxLength : 20,
			allowBlank : false,
			name : "channelName",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>渠道名称",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "channelId.AddChannelConfigMgr",
			allowBlank : false,
			maxLength : 20,
			name : "channelId",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>渠道编号",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.store793764322 = new Ext.data.Store({});

		this.comboBox1218133649 = new Ext.form.ComboBox({
			region : "",
			store : this.store793764322,
			emptyText : "--请选择--",
			fieldLabel : "渠道支持的业务类型",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "channelType.AddChannelConfigMgr",
			hiddenName : "channelType",
			displayField : "paramValue",
			name : "channelType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField2036957655 = new Ext.form.TextField({
			id : "fee.AddChannelConfigMgr",
			maxLength : 20,
			allowBlank : false,
			name : "fee",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>第三方渠道每笔收费",
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
				id : "save.AddChannelConfigMgr",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.config.AddChannelConfigMgr.save(button, event);
				}
			}, {
				id : "close.AddChannelConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.config.AddChannelConfigMgr
							.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.AddChannelConfigMgr",
			frame : false,
			height : 200,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				title : "新增下拉参数",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					columnWidth : "0.5",
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.textField998866637],
					layout : "form"
				}, {
					columnWidth : ".5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField2036957655, this.comboBox1218133649],
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
			id : "win.AddMenuConfigMgr",
			title : "新增渠道配置",
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
