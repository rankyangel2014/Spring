// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.RegInvestMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.RegInvestMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.RegInvestMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.RegInvestMgr']);
		com.jsjn.jnf.member.RegInvestMgr.WINDOW = this;
	}
	return com.jsjn.jnf.member.RegInvestMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.member.RegInvestMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textField716287998 = new Ext.form.TextField({
			id : "insttuId.RegInvestMgr",
			maxLength : 9,
			allowBlank : false,
			name : "insttuId",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>投资人机构号",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField1507286750 = new Ext.form.TextField({
			id : "idNo.RegInvestMgr",
			allowBlank : false,
			maxLength : 18,
			name : "idNo",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "<font color=red>*</font>证件号码",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.store262067435 = new Ext.data.Store({});

		this.comboBox2097857679 = new Ext.form.ComboBox({
			region : "",
			store : this.store262067435,
			emptyText : "--请选择--",
			fieldLabel : "<font color=red>*</font>账号状态",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "state.RegInvestMgr",
			hiddenName : "state",
			displayField : "paramValue",
			name : "state",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "mid.RegInvestMgr",
			allowBlank : false,
			name : "mid",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>商户编号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textArea798182743 = new Ext.form.TextArea({
			id : "remark.RegInvestMgr",
			maxLength : 100,
			allowBlank : true,
			name : "remark",
			columnWidth : "0.5",
			fieldLabel : "备注",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField713575616 = new Ext.form.TextField({
			id : "mobile.RegInvestMgr",
			maxLength : 11,
			allowBlank : false,
			name : "mobile",
			columnWidth : "0.5",
			validateOnBlur : false,
			vtype : "mobilePhone",
			fieldLabel : "<font color=red>*</font>手机号码",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.store117774092 = new Ext.data.Store({});

		this.comboBox1723942272 = new Ext.form.ComboBox({
			region : "",
			store : this.store117774092,
			emptyText : "--请选择--",
			fieldLabel : "<font color=red>*</font>证件类型",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "idType.RegInvestMgr",
			hiddenName : "idType",
			displayField : "paramValue",
			name : "idType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField210009057 = new Ext.form.TextField({
			id : "custName.RegInvestMgr",
			maxLength : 25,
			allowBlank : false,
			name : "custName",
			columnWidth : "0.5",
			validateOnBlur : true,
			fieldLabel : "<font color=red>*</font>用户名称",
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
				id : "save.RegInvestMgr",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.member.RegInvestMgr.save(button, event);
				}
			}, {
				id : "close.RegInvestMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.member.RegInvestMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.RegInvestMgr",
			height : 200,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "创建投资人",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.comboBox2097857679,
							this.textField1507286750, this.textField716287998],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : ".5",
					autoWidth : false,
					border : false,
					items : [this.textField210009057, this.textField713575616,
							this.comboBox1723942272, this.textArea798182743],
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
			id : "win.RegInvestMgr",
			title : "创建投资人",
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
