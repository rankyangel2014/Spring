// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.AuthorityConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.AuthorityConfigMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.AuthorityConfigMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.AuthorityConfigMgr']);
		com.jsjn.jnf.member.AuthorityConfigMgr.WINDOW = this;
	}
	return com.jsjn.jnf.member.AuthorityConfigMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.member.AuthorityConfigMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1931233033 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "id",
				mapping : "apiRole.id",
				type : "string"
			}, {
				name : "permission",
				mapping : "apiRole.permission",
				type : "string"
			}, {
				name : "desc",
				mapping : "apiRole.desc",
				type : "string"
			}]),
			url : appConfig.baseUrl
					+ '/jnf/apiRoleService.do?method=findPlatRoles'
		});

		this.checkboxSelectionModel388802834 = new Ext.grid.CheckboxSelectionModel({
			singleSelect : false,
			sortable : true
		});

		this.gridPanel1124045165 = new Ext.grid.GridPanel({
			layoutConfig : {},
			autoScroll : false,
			store : this.store1931233033,
			columns : [this.checkboxSelectionModel388802834, {
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "id",
				header : "序号"
			}, {
				hidden : false,
				width : 250,
				sortable : true,
				align : "left",
				dataIndex : "permission",
				header : "权限标识"
			}, {
				hidden : false,
				width : 250,
				sortable : true,
				align : "left",
				dataIndex : "desc",
				header : "权限说明"
			}],
			autoWidth : false,
			buttons : [{
				id : "save.AuthorityConfigMgr",
				text : "保存",
				handler : function(button, event) {
					com.jsjn.jnf.member.AuthorityConfigMgr.save(button, event);
				}
			}, {
				id : "close.AuthorityConfigMgr",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.member.AuthorityConfigMgr.close(button, event);
				}
			}],
			autoHeight : false,
			id : "grid.AuthorityConfigMgr",
			height : 300,
			columnWidth : "1",
			buttonAlign : "center",
			selModel : this.checkboxSelectionModel388802834,
			viewConfig : {}
		});

		this.textField975177989 = new Ext.form.TextField({
			id : "mName.AuthorityConfigMgr",
			style : "width:300px;",
			allowBlank : true,
			fieldClass : "x-form-field-my",
			name : "mName",
			width : 25,
			fieldLabel : "商户名称",
			disabled : false,
			anchor : "90%"
		});

		this.formPanel1688224970 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 60,
			autoScroll : true,
			collapsible : false,
			width : 600,
			collapsed : false,
			id : "form.AuthorityConfigMgr",
			height : 400,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "商户权限配置",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.textField975177989],
					layout : "form",
					columnWidth : "60",
					autoWidth : false,
					border : false
				}],
				collapseFirst : false,
				layout : "column",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, this.gridPanel1124045165, {
				id : "mid.hidden.AuthorityConfigMgr",
				xtype : "hidden"
			}],
			layout : "column",
			columnWidth : "1",
			buttonAlign : "center",
			labelAlign : "right",
			border : false
		});

		Ext.apply(this, {
			id : "window.AuthorityConfigMgr",
			layoutConfig : {},
			height : 400,
			items : [this.formPanel1688224970],
			xtype : "window",
			width : 600,
			closeAction : "hide",
			buttonAlign : "center"
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
