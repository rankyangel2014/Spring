// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.fee');
com.jsjn.jnf.fee.QryTotalFeeListMgr = function(config) {
	if (typeof(com.jsjn.jnf.fee.QryTotalFeeListMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.fee.QryTotalFeeListMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.fee.QryTotalFeeListMgr']);
		com.jsjn.jnf.fee.QryTotalFeeListMgr.PANEL = this;
	}
	return com.jsjn.jnf.fee.QryTotalFeeListMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.fee.QryTotalFeeListMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1121719780 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "mid",
				mapping : "mid",
				type : "string"
			}, {
				name : "orgNo",
				mapping : "orgNo",
				type : "string"
			}, {
				name : "insttuName",
				mapping : "insttuName",
				type : "string"
			}, {
				name : "feeType",
				mapping : "feeType",
				type : "string"
			}, {
				name : "price",
				mapping : "price",
				type : "string"
			}, {
				name : "count",
				mapping : "count",
				type : "string"
			}, {
				name : "totalMoney",
				mapping : "totalMoney",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl + '/jnf/feeService.do?method=qryTotalFee'
		});

		this.gridPanel2072277782 = new Ext.grid.GridPanel({
			layoutConfig : {},
			autoScroll : false,
			store : this.store1121719780,
			width : "100%",
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryTotalFeeListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 400,
				sortable : true,
				align : "center",
				dataIndex : "insttuName",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryTotalFeeListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "机构名称"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "feeType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryTotalFeeListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "收费项目"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "startTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryTotalFeeListMgr.gridRender(
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
					return com.jsjn.jnf.fee.QryTotalFeeListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "结束时间"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "right",
				dataIndex : "price",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryTotalFeeListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "单价（元）"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "right",
				dataIndex : "count",
				header : "笔数"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "right",
				dataIndex : "totalMoney",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryTotalFeeListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "小计（元）"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryTotalFeeListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "操作"
			}],
			autoWidth : false,
			autoHeight : false,
			id : "grid.QryTotalFeeListMgr",
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

		this.textField59963190 = new Ext.form.TextField({
			id : "insttuName.QryTotalFeeListMgr",
			maxLength : 25,
			allowBlank : true,
			name : "insttuName",
			width : 200,
			fieldLabel : "机构名称",
			anchor : "90%"
		});

		this.dateField1994331807 = new Ext.form.DateField({
			id : "endTime.QryTotalFeeListMgr",
			allowBlank : true,
			name : "endTime",
			format : "Ymd",
			fieldLabel : "结束时间",
			anchor : "90%"
		});

		this.textField1267444716 = new Ext.form.TextField({
			id : "feeType.QryTotalFeeListMgr",
			allowBlank : true,
			maxLength : 25,
			width : 200,
			name : "feeType",
			fieldLabel : "收费项目",
			anchor : "90%"
		});

		this.dateField1669034659 = new Ext.form.DateField({
			id : "startTime.QryTotalFeeListMgr",
			allowBlank : true,
			name : "startTime",
			format : "Ymd",
			fieldLabel : "开始时间",
			anchor : "90%"
		});

		this.textField1410492613 = new Ext.form.TextField({
			id : "mname.QryTotalFeeListMgr",
			allowBlank : true,
			maxLength : 25,
			name : "mName",
			width : 200,
			fieldLabel : "商户名称",
			anchor : "90%"
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.QryTotalFeeListMgr",
			height : 500,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "exportExcel.QryTotalFeeListMgr",
					text : "导出Excel",
					handler : function(button, event) {
						com.jsjn.jnf.fee.QryTotalFeeListMgr.exportExcel(button,
								event);
					}
				}, {
					id : "btnQuery.QryTotalFeeListMgr",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.fee.QryTotalFeeListMgr.btnQuery(button,
								event);
					}
				}, {
					id : "btnReset.QryTotalFeeListMgr",
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.fee.QryTotalFeeListMgr.btnReset(button,
								event);
					}
				}],
				collapsed : false,
				defaults : "",
				title : "计费报文汇总查询",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.textField1410492613, this.dateField1669034659],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField1267444716, this.dateField1994331807],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField59963190],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}],
				collapseFirst : false,
				layout : "column",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, this.gridPanel2072277782],
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
