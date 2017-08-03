// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.UpdateBussinessMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.UpdateBussinessMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.UpdateBussinessMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.UpdateBussinessMgr']);
		com.jsjn.jnf.member.UpdateBussinessMgr.WINDOW = this;
	}
	return com.jsjn.jnf.member.UpdateBussinessMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.member.UpdateBussinessMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textArea669515624 = new Ext.form.TextArea({
			id : "addr.UpdateBussinessMgr",
			allowBlank : false,
			maxLength : 100,
			name : "addr",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>联系地址",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField375692108 = new Ext.form.TextField({
			id : "busLcnsNo.UpdateBussinessMgr",
			maxLength : 18,
			allowBlank : false,
			name : "busLcnsNo",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>证件号码",
			selectOnFocus : false,
			disabled : false,
			anchor : "90%"
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "mid.UpdateBussinessMgr",
			allowBlank : false,
			maxLength : 4,
			name : "mid",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>商户号",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField713575616 = new Ext.form.TextField({
			id : "phoneNo.UpdateBussinessMgr",
			allowBlank : false,
			maxLength : 11,
			name : "phoneNo",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>联系电话",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.store117774092 = new Ext.data.Store({});

		this.comboBox1723942272 = new Ext.form.ComboBox({
			region : "",
			store : this.store117774092,
			emptyText : "--请选择--",
			fieldLabel : "<font color=red>*</font>状态",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "status.UpdateBussinessMgr",
			hiddenName : "status",
			displayField : "paramValue",
			name : "status",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField1181073381 = new Ext.form.TextField({
			id : "mName.UpdateBussinessMgr",
			maxLength : 25,
			allowBlank : false,
			name : "mName",
			columnWidth : "0.5",
			fieldLabel : "<font color=red>*</font>商户名称",
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
				id : "update.UpdateBussinessMgr",
				text : "修改",
				handler : function(button, event) {
					com.jsjn.jnf.member.UpdateBussinessMgr
							.update(button, event);
				}
			}, {
				id : "close.UpdateBussinessMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.member.UpdateBussinessMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.UpdateBussinessMgr",
			frame : false,
			height : 200,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				title : "商户修改",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					columnWidth : "0.5",
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.textField375692108,
							this.textArea669515624],
					layout : "form"
				}, {
					columnWidth : ".5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1181073381, this.textField713575616,
							this.comboBox1723942272],
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
			id : "win.UpdateBussinessMgr",
			title : "商户修改",
			height : "60%",
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
