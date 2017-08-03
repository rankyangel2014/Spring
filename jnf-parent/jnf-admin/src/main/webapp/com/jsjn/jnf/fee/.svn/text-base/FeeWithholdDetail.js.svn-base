// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.fee');
com.jsjn.jnf.fee.FeeWithholdDetail = function(config) {
	if (typeof(com.jsjn.jnf.fee.FeeWithholdDetail.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.fee.FeeWithholdDetail.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.fee.FeeWithholdDetail']);
		com.jsjn.jnf.fee.FeeWithholdDetail.WINDOW = this;
	}
	return com.jsjn.jnf.fee.FeeWithholdDetail.WINDOW;
};
Ext.extend(com.jsjn.jnf.fee.FeeWithholdDetail, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.groupingStore2095352048 = new Ext.data.GroupingStore({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "id",
				mapping : "id",
				type : "string"
			}, {
				name : "tradeNo",
				mapping : "tradeNo",
				type : "string"
			}, {
				name : "payAccount",
				mapping : "payAccount",
				type : "string"
			}, {
				name : "payer",
				mapping : "payer",
				type : "string"
			}, {
				name : "collAccount",
				mapping : "collAccount",
				type : "string"
			}, {
				name : "payee",
				mapping : "payee",
				type : "string"
			}, {
				name : "channel",
				mapping : "channel",
				type : "string"
			}, {
				name : "status",
				mapping : "status",
				type : "string"
			}, {
				name : "failReason",
				mapping : "failReason",
				type : "string"
			}, {
				name : "tradeTime",
				mapping : "tradeTime",
				type : "string"
			}, {
				name : "fee",
				mapping : "fee",
				type : "float"
			}, {
				name : "amount",
				mapping : "amount",
				type : "float"
			}]),
			baseParams : {
				method : "getWithholdDetail"
			},
			groupField : "",
			url : appConfig.baseUrl + '/jnf/FeeAction.do'
		});

		this.groupSummaryGridPanel1609795184 = new com.jsjn.ext.extend.GroupSummaryGridPanel({
			layoutConfig : {},
			isSubTotal : false,
			isTotal : true,
			autoScroll : true,
			store : this.groupingStore2095352048,
			columns : [{
				summaryRenderer : function(v, params, data) {
					return gridSumFieldDesc(v, params, data);
				},
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "xh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "序号"
			}, {
				hidden : true,
				sortable : true,
				dataIndex : "id"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "center",
				dataIndex : "tradeNo",
				header : "业务流水号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "payAccount",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "付款账号"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "payer",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "付款人"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "collAccount",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "收款账号"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "payee",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "收款人"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "channel",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "支付渠道"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "status",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "状态"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "failReason",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "备注"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "tradeTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "交易时间"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "right",
				dataIndex : "fee",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "费用（元）"
			}, {
				summaryRenderer : function(v, params, data) {
					return gridSumFieldData(v, params, data);
				},
				hidden : false,
				width : 150,
				sortable : true,
				align : "right",
				dataIndex : "amount",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeWithholdDetail.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				summaryType : "sum",
				header : "扣款金额（元）"
			}],
			autoWidth : false,
			autoHeight : false,
			id : "grid.FeeWithholdDetail",
			height : 330,
			isGroup : false,
			columnWidth : "1",
			buttonAlign : "left",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false
			}),
			viewConfig : {}
		});

		this.formPanel1274297896 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.FeeWithholdDetail",
			frame : false,
			items : [this.groupSummaryGridPanel1609795184, {
				id : "orgNo.FeeWithholdDetail",
				xtype : "hidden"
			}, {
				id : "startTime.FeeWithholdDetail",
				xtype : "hidden"
			}, {
				id : "endTime.FeeWithholdDetail",
				xtype : "hidden"
			}, {
				id : "fileName.FeeWithholdDetail",
				xtype : "hidden"
			}],
			layout : "column",
			columnWidth : "1",
			buttonAlign : "center",
			labelAlign : "right",
			border : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			height : 400,
			items : [this.formPanel1274297896],
			width : "80%",
			xtype : "window",
			closeAction : "hide",
			buttonAlign : "center",
			buttons : [{
				text : "导出EXCEL",
				handler : function(button, event) {
					com.jsjn.jnf.fee.FeeWithholdDetail.exportExcel(button,
							event);
				}
			}],
			modal : true,
			draggable : false
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
