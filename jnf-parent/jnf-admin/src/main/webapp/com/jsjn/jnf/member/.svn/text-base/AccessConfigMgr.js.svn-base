// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.AccessConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.AccessConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.AccessConfigMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.AccessConfigMgr']);
		com.jsjn.jnf.member.AccessConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.member.AccessConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.member.AccessConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textField2137060523 = new Ext.form.TextField({
			cls : "border:0",
			allowBlank : true,
			anchor : "90%",
			id : "hiden.AccessConfigMgr",
			readOnly : true,
			maxLength : 200,
			style : "border:0;background-color:#FFF;color:red;",
			hidden : true,
			name : "hiden",
			columnWidth : "1",
			value : "该商户的接入配置数据被篡改！请联系管理员",
			disabled : false,
			selectOnFocus : false
		});

		this.textField1599205154 = new Ext.form.TextField({
			id : "rsaPubKey.AccessConfigMgr",
			allowBlank : false,
			maxLength : 1024,
			name : "rsaPubKey",
			columnWidth : "1",
			fieldLabel : "<font color=red>*</font>商户公钥",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField736311967 = new Ext.form.TextField({
			id : "whiteList.AccessConfigMgr",
			maxLength : 160,
			allowBlank : false,
			name : "whiteList",
			columnWidth : "1",
			fieldLabel : "<font color=red>*</font>IP白名单",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField375692108 = new Ext.form.TextField({
			id : "appkey.AccessConfigMgr",
			allowBlank : false,
			maxLength : 200,
			name : "appkey",
			columnWidth : "1",
			emptyText : "（系统自动生成）",
			fieldLabel : "<font color=red>*</font>安全验证码",
			disabled : true,
			selectOnFocus : false,
			anchor : "80%"
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "mid.AccessConfigMgr",
			maxLength : 200,
			allowBlank : false,
			width : 200,
			name : "mid",
			columnWidth : "1",
			emptyText : "（系统自动生成）",
			fieldLabel : "<font color=red>*</font>商户号",
			selectOnFocus : false,
			disabled : true,
			anchor : "80%"
		});

		this.formPanel1692878715 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			buttons : [{
				id : "save.AccessConfigMgr",
				text : "保存",
				handler : function(button, event) {
					com.jsjn.jnf.member.AccessConfigMgr.save(button, event);
				}
			}, {
				id : "close.AccessConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.member.AccessConfigMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.AccessConfigMgr",
			height : 200,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "商户接入配置",
				style : "margin:5px",
				items : [{
					columnWidth : "1",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.textField375692108,
							this.textField736311967, this.textField1599205154,
							this.textField2137060523],
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
			id : "win.AccessConfigMgr",
			title : "商户接入配置",
			height : "60%",
			items : [this.formPanel1692878715],
			layout : "fit",
			xtype : "window",
			resizable : false,
			buttonAlign : "center",
			plain : false,
			modal : true
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
