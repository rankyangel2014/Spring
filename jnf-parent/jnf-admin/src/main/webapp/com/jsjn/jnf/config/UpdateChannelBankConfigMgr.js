// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.UpdateChannelBankConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.UpdateChannelBankConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.UpdateChannelBankConfigMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.UpdateChannelBankConfigMgr']);
		com.jsjn.jnf.config.UpdateChannelBankConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.config.UpdateChannelBankConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.config.UpdateChannelBankConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textField1590153001 = new Ext.form.TextField({
			id : "jnBankCode.UpdateChannelBankConfigMgr",
			allowBlank : false,
			name : "jnBankCode",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>金农银行Code",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField998866637 = new Ext.form.TextField({
			id : "maxAmount.UpdateChannelBankConfigMgr",
			allowBlank : true,
			name : "maxAmount",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "单笔最大限额（万元）",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.store724124842 = new Ext.data.Store({});

		this.comboBox1686564087 = new Ext.form.ComboBox({
			region : "",
			store : this.store724124842,
			emptyText : "--请选择--",
			fieldLabel : "<font color=red>*</font>渠道名称",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "channelId.UpdateChannelBankConfigMgr",
			hiddenName : "channelId.UpdateChannelBankConfigMgr",
			displayField : "paramValue",
			name : "channelType",
			valueField : "paramKey",
			triggerAction : "all",
			disabled : true,
			selectOnFocus : true
		});

		this.textField1574201482 = new Ext.form.TextField({
			id : "maxAmountDay.UpdateChannelBankConfigMgr",
			allowBlank : true,
			name : "maxAmountDay",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "单日最大限额（万元）",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField2075344047 = new Ext.form.TextField({
			id : "channelBankCode.UpdateChannelBankConfigMgr",
			allowBlank : false,
			name : "channelBankCode",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>渠道银行Code",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField2036957655 = new Ext.form.TextField({
			id : "bankName.UpdateChannelBankConfigMgr",
			allowBlank : false,
			name : "bankName",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>银行名称",
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
				id : "save.UpdateChannelBankConfigMgr",
				text : "修改",
				handler : function(button, event) {
					com.jsjn.jnf.config.UpdateChannelBankConfigMgr.save(button,
							event);
				}
			}, {
				id : "close.UpdateChannelBankConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.config.UpdateChannelBankConfigMgr.close(
							button, event);
				}
			}],
			collapsed : false,
			id : "form.UpdateChannelBankConfigMgr",
			frame : false,
			height : 200,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				title : "修改渠道银行配置",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					columnWidth : "0.5",
					autoWidth : false,
					border : false,
					items : [this.comboBox1686564087, this.textField1590153001,
							this.textField998866637],
					layout : "form"
				}, {
					columnWidth : ".5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField2036957655,
							this.textField2075344047, this.textField1574201482],
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
			id : "win.UpdateChannelBankConfigMgr",
			title : "修改渠道银行配置",
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
