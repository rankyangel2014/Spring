// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.MenuConfigListMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.MenuConfigListMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.MenuConfigListMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.MenuConfigListMgr']);
		com.jsjn.jnf.config.MenuConfigListMgr.PANEL = this;
	}
	return com.jsjn.jnf.config.MenuConfigListMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.config.MenuConfigListMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store2043032162 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "menuCde",
				mapping : "menuCde",
				type : "string"
			}, {
				name : "menuKey",
				mapping : "menuKey",
				type : "string"
			}, {
				name : "menuValue",
				mapping : "menuValue",
				type : "string"
			}, {
				name : "menuSort",
				mapping : "menuSort",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/jnf/menuConfigService.do?method=findAllMenuByCode'
		});

		this.gridPanel79120177 = new Ext.grid.GridPanel({
			layoutConfig : {},
			store : this.store2043032162,
			autoScroll : false,
			width : "100%",
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.MenuConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 350,
				sortable : true,
				align : "left",
				dataIndex : "menuCde",
				header : "选项代码"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "menuKey",
				header : "字典值"
			}, {
				hidden : false,
				width : 350,
				sortable : true,
				align : "left",
				dataIndex : "menuValue",
				header : "字典标签"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "menuSort",
				header : "排序"
			}],
			autoWidth : false,
			buttons : [{
				id : "btnAdd",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.config.MenuConfigListMgr.btnAdd(button, event);
				}
			}, {
				id : "btnUpdate",
				text : "修改",
				handler : function(button, event) {
					com.jsjn.jnf.config.MenuConfigListMgr.btnUpdate(button,
							event);
				}
			}, {
				id : "btnDelete",
				text : "删除",
				handler : function(button, event) {
					com.jsjn.jnf.config.MenuConfigListMgr.btnDelete(button,
							event);
				}
			}, {
				id : "btnClear",
				text : "清除缓存",
				handler : function(button, event) {
					com.jsjn.jnf.config.MenuConfigListMgr.btnClearCache(button,
							event);
				}
			}],
			autoHeight : false,
			bbar : new Ext.PagingToolbar({
				displayInfo : true,
				store : this.store2043032162,
				emptyMsg : "无数据显示",
				displayMsg : "显示{0} - {1} 共 {2}",
				xtype : "paging",
				pageSize : 10
			}),
			id : "grid.MenuConfigListMgr",
			height : 350,
			columnWidth : "1",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false
			}),
			buttonAlign : "center",
			viewConfig : {},
			loadMask : {
				msg : "正在载入数据...",
				title : "提示"
			}
		});

		this.textField1811330215 = new Ext.form.TextField({
			id : "menuCde.MenuConfigListMgr",
			allowBlank : true,
			maxLength : 20,
			name : "cde",
			width : 100,
			fieldLabel : "选项代码",
			anchor : "60%"
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.MenuConfigListMgr",
			height : 500,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "下拉参数表查询",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.textField1811330215],
					layout : "form",
					width : 100,
					columnWidth : "0.6",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [{
						region : "center",
						id : "btnQuery",
						listeners : {
							click : {
								fn : function(button, e) {
									return com.jsjn.jnf.config.MenuConfigListMgr
											.btnQuery(button, e);
								}
							}
						},
						text : "查询",
						xtype : "button"
					}],
					width : 100,
					layout : "form",
					columnWidth : "0.4",
					autoWidth : false,
					border : false
				}],
				collapseFirst : false,
				layout : "column",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, this.gridPanel79120177],
			layout : "form",
			columnWidth : "1",
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
