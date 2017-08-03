// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.AddBussinessMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.AddBussinessMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.AddBussinessMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.AddBussinessMgr']);
		com.jsjn.jnf.member.AddBussinessMgr.WINDOW = this;
	}
	return com.jsjn.jnf.member.AddBussinessMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.member.AddBussinessMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textArea236857917 = new Ext.form.TextArea({
			id : "addr.AddBussinessMgr",
			maxLength : 100,
			allowBlank : false,
			name : "addr",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>联系地址",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField375692108 = new Ext.form.TextField({
			id : "busLcnsNo.AddBussinessMgr",
			allowBlank : false,
			maxLength : 18,
			name : "busLcnsNo",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>证件号码",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "mName.AddBussinessMgr",
			maxLength : 25,
			allowBlank : false,
			name : "mName",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>商户名称",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.store117774092 = new Ext.data.Store({});

		this.comboBox1723942272 = new Ext.form.ComboBox({
			region : "",
			store : this.store117774092,
			emptyText : "--请选择--",
			fieldLabel : "<font color=red>*</font>状态",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "status.AddBussinessMgr",
			hiddenName : "status",
			displayField : "paramValue",
			name : "status",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField713575616 = new Ext.form.TextField({
			id : "phoneNo.AddBussinessMgr",
			maxLength : 11,
			allowBlank : false,
			name : "phoneNo",
			columnWidth : "0.5",
			validateOnBlur : false,
			vtype : "mobilePhone",
			fieldLabel : "<font color=red>*</font>联系电话",
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
				id : "save.AddBussinessMgr",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.member.AddBussinessMgr.save(button, event);
				}
			}, {
				id : "close.AddBussinessMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.member.AddBussinessMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.AddBussinessMgr",
			height : 200,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "商户新增",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.textField375692108,
							this.textArea236857917],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : ".5",
					autoWidth : false,
					border : false,
					items : [this.textField713575616, this.comboBox1723942272],
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
			id : "win.AddBussinessMgr",
			title : "商户新增",
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
