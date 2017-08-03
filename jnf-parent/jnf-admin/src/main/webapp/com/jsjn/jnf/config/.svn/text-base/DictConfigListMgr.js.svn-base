// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.DictConfigListMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.DictConfigListMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.DictConfigListMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.DictConfigListMgr']);
		com.jsjn.jnf.config.DictConfigListMgr.PANEL = this;
	}
	return com.jsjn.jnf.config.DictConfigListMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.config.DictConfigListMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store2043032162 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "id",
				mapping : "id",
				type : "string"
			}, {
				name : "value",
				mapping : "value",
				type : "string"
			}, {
				name : "testValue",
				mapping : "testValue",
				type : "string"
			}, {
				name : "label",
				mapping : "label",
				type : "string"
			}, {
				name : "type",
				mapping : "type",
				type : "string"
			}, {
				name : "desc",
				mapping : "desc",
				type : "string"
			}, {
				name : "sort",
				mapping : "sort",
				type : "string"
			}, {
				name : "parentId",
				mapping : "parentId",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl + '/jnf/dictService.do?method=qryDictInfo'
		});

		this.gridPanel79120177 = new Ext.grid.GridPanel({
			layoutConfig : {},
			autoScroll : false,
			store : this.store2043032162,
			width : "100%",
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.DictConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "left",
				dataIndex : "value",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.DictConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "正式环境字典值"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "left",
				dataIndex : "testValue",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.DictConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "测试环境字典值"
			}, {
				hidden : false,
				width : 300,
				sortable : true,
				align : "left",
				dataIndex : "label",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.DictConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "字典标签"
			}, {
				hidden : false,
				width : 250,
				sortable : true,
				align : "left",
				dataIndex : "type",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.DictConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "字典类型"
			}, {
				hidden : false,
				width : 300,
				sortable : true,
				align : "left",
				dataIndex : "desc",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.DictConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "字典说明"
			}],
			autoWidth : false,
			buttons : [{
				id : "btnAdd",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.config.DictConfigListMgr.btnAdd(button, event);
				}
			}, {
				id : "btnUpdate",
				text : "修改",
				handler : function(button, event) {
					com.jsjn.jnf.config.DictConfigListMgr.btnUpdate(button,
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
			id : "grid.DictConfigListMgr",
			height : 350,
			columnWidth : "1",
			buttonAlign : "center",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false
			}),
			viewConfig : {},
			loadMask : {
				msg : "正在载入数据...",
				title : "提示"
			}
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.DictConfigListMgr",
			frame : false,
			height : 500,
			items : [this.gridPanel79120177],
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
