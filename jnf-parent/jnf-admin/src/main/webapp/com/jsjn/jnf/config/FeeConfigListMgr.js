// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.FeeConfigListMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.FeeConfigListMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.FeeConfigListMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.FeeConfigListMgr']);
		com.jsjn.jnf.config.FeeConfigListMgr.WINDOW = this;
	}
	return com.jsjn.jnf.config.FeeConfigListMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.config.FeeConfigListMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store2036854290 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "id",
				mapping : "id",
				type : "string"
			}, {
				name : "mid",
				mapping : "mid",
				type : "string"
			}, {
				name : "mname",
				mapping : "mname",
				type : "string"
			}, {
				name : "orgNo",
				mapping : "orgNo",
				type : "string"
			}, {
				name : "feeType",
				mapping : "feeType",
				type : "string"
			}, {
				name : "startTime",
				mapping : "startTime",
				type : "string"
			}, {
				name : "endTime",
				mapping : "endTime",
				type : "string"
			}, {
				name : "fee",
				mapping : "fee",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/jnf/feeConfigService.do?method=qryFeeConfig'
		});

		this.gridPanel1474794894 = new Ext.grid.GridPanel({
			layoutConfig : {},
			autoScroll : false,
			store : this.store2036854290,
			width : "100%",
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.FeeConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "right",
				dataIndex : "mname",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.FeeConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "商户名称"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "right",
				dataIndex : "feeType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.FeeConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "费用种类"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "startTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.FeeConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "开始时间"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "endTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.FeeConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "结束时间"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "right",
				dataIndex : "fee",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.FeeConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "单价（元）"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.FeeConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "操作"
			}],
			autoWidth : false,
			autoHeight : false,
			id : "grid.FeeConfigListMgr",
			height : 300,
			columnWidth : "1",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false
			}),
			viewConfig : {},
			loadMask : {
				msg : "正在载入数据...",
				title : "提示"
			}
		});

		this.formPanel657914232 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 300,
			autoScroll : true,
			collapsible : false,
			width : "100%",
			buttons : [{
				id : "addBtn",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.config.FeeConfigListMgr.addBtn(button, event);
				}
			}],
			collapsed : false,
			id : "form.FeeConfigListMgr",
			height : 500,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "计费参数配置",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					id : "mid.FeeConfigListMgr",
					xtype : "hidden",
					name : "mid",
					disabled : true
				}, {
					id : "orgNo.FeeConfigListMgr",
					name : "orgNo",
					xtype : "hidden",
					disabled : true
				}],
				layout : "column",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, this.gridPanel1474794894],
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
			id : "win.FeeXmlDetailMgr",
			title : "报文信息详情",
			height : "70%",
			items : [this.formPanel657914232],
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
