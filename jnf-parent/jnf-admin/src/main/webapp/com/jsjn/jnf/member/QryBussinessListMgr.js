// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.QryBussinessListMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.QryBussinessListMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.QryBussinessListMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.QryBussinessListMgr']);
		com.jsjn.jnf.member.QryBussinessListMgr.PANEL = this;
	}
	return com.jsjn.jnf.member.QryBussinessListMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.member.QryBussinessListMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1984418334 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "mid",
				mapping : "mid",
				type : "string"
			}, {
				name : "mName",
				mapping : "mName",
				type : "string"
			}, {
				name : "busLcnsNo",
				mapping : "busLcnsNo",
				type : "string"
			}, {
				name : "phoneNo",
				mapping : "phoneNo",
				type : "string"
			}, {
				name : "addr",
				mapping : "addr",
				type : "string"
			}, {
				name : "created",
				mapping : "created",
				type : "string"
			}, {
				name : "status",
				mapping : "status",
				type : "string"
			}, {
				name : "modified",
				mapping : "modified",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/jnf/businessService.do?method=findBussiness'
		});

		this.gridPanel1414778547 = new Ext.grid.GridPanel({
			layoutConfig : {},
			autoScroll : false,
			store : this.store1984418334,
			width : "100%",
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryBussinessListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "mid",
				header : "商户号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "mName",
				header : "商户名称"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "center",
				dataIndex : "busLcnsNo",
				header : "证件号码"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "phoneNo",
				header : "手机号码"
			}, {
				hidden : false,
				width : 300,
				sortable : true,
				align : "center",
				dataIndex : "addr",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryBussinessListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "联系地址"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "created",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryBussinessListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "入驻时间"
			}, {
				hidden : false,
				width : 60,
				sortable : true,
				align : "center",
				dataIndex : "status",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryBussinessListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "状态"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "modified",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryBussinessListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "最后修改时间"
			}, {
				hidden : false,
				width : 400,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryBussinessListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "操作"
			}],
			autoWidth : false,
			buttons : [{
				id : "add.QryBussinessListMgr",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.member.QryBussinessListMgr.btnAdd(button,
							event);
				}
			}],
			autoHeight : false,
			id : "grid.QryBussinessListMgr",
			height : 400,
			columnWidth : "1",
			buttonAlign : "center",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
			viewConfig : {},
			loadMask : {
				msg : "正在载入数据...",
				title : "提示"
			}
		});

		this.store770235737 = new Ext.data.Store({});

		this.comboBox962472270 = new Ext.form.ComboBox({
			store : this.store770235737,
			emptyText : "--请选择--",
			fieldLabel : "状态",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "status.QryBussinessListMgr",
			hiddenName : "status",
			displayField : "paramValue",
			name : "status",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField1267444716 = new Ext.form.TextField({
			id : "mName.QryBussinessListMgr",
			allowBlank : true,
			maxLength : 25,
			width : 200,
			name : "mName",
			fieldLabel : "商户名称",
			anchor : "90%"
		});

		this.textField1410492613 = new Ext.form.TextField({
			id : "mid.QryBussinessListMgr",
			allowBlank : true,
			maxLength : 4,
			name : "mid",
			width : 200,
			fieldLabel : "商户号",
			anchor : "90%"
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.QryBussinessListMgr",
			height : 500,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "btnQuery.QryBussinessListMgr",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.member.QryBussinessListMgr.btnQuery(
								button, event);
					}
				}, {
					id : "btnReset.QryBussinessListMgr",
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.member.QryBussinessListMgr.btnReset(
								button, event);
					}
				}],
				collapsed : false,
				defaults : "",
				title : "商户查询",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.textField1410492613],
					layout : "form",
					columnWidth : ".25",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField1267444716],
					layout : "form",
					columnWidth : ".25",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBox962472270],
					layout : "form",
					columnWidth : ".25",
					autoWidth : false,
					border : false
				}],
				collapseFirst : false,
				layout : "column",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, this.gridPanel1414778547],
			layout : "column",
			columnWidth : "1",
			buttonAlign : "center",
			labelAlign : "right",
			border : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			autoScroll : false,
			items : [this.formPanel239968220],
			layout : "fit",
			border : false
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
