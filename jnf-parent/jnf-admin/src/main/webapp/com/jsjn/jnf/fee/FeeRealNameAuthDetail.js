// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.fee');
com.jsjn.jnf.fee.FeeRealNameAuthDetail = function(config) {
	if (typeof(com.jsjn.jnf.fee.FeeRealNameAuthDetail.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.fee.FeeRealNameAuthDetail.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.fee.FeeRealNameAuthDetail']);
		com.jsjn.jnf.fee.FeeRealNameAuthDetail.WINDOW = this;
	}
	return com.jsjn.jnf.fee.FeeRealNameAuthDetail.WINDOW;
};
Ext.extend(com.jsjn.jnf.fee.FeeRealNameAuthDetail, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.groupingStore2095352048 = new Ext.data.GroupingStore({
			reader : new Ext.data.JsonReader({
				id : "bussinessId",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "bussinessId",
				mapping : "bussinessId",
				type : "string"
			}, {
				name : "custName",
				mapping : "custName",
				type : "string"
			}, {
				name : "idNo",
				mapping : "idNo",
				type : "string"
			}, {
				name : "bankCardNo",
				mapping : "bankCardNo",
				type : "string"
			}, {
				name : "mobile",
				mapping : "mobile",
				type : "string"
			}, {
				name : "bankName",
				mapping : "bankName",
				type : "string"
			}, {
				name : "modified",
				mapping : "modified",
				type : "date"
			}, {
				name : "fee",
				mapping : "fee",
				type : "float"
			}]),
			baseParams : {
				method : "getFeeRealnameDetail"
			},
			groupField : "",
			autoLoad : true,
			url : appConfig.baseUrl + '/jnf/FeeAction.do'
		});

		this.groupSummaryGridPanel1609795184 = new com.jsjn.ext.extend.GroupSummaryGridPanel({
			layoutConfig : {},
			isSubTotal : false,
			isTotal : true,
			store : this.groupingStore2095352048,
			width : "100%",
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
					return com.jsjn.jnf.fee.FeeRealNameAuthDetail.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "custName",
				header : "用户名称"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "idNo",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeRealNameAuthDetail.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "身份证号码"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "bankCardNo",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeRealNameAuthDetail.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "银行卡号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "mobile",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeRealNameAuthDetail.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "手机号码"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "bankName",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeRealNameAuthDetail.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "开户行名称"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "modified",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeRealNameAuthDetail.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "交易时间"
			}, {
				summaryRenderer : function(v, params, data) {
					return gridSumFieldData(v, params, data);
				},
				hidden : false,
				width : 80,
				sortable : true,
				align : "right",
				dataIndex : "fee",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeRealNameAuthDetail.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				summaryType : "sum",
				header : "费用"
			}],
			autoWidth : true,
			autoHeight : true,
			id : "grid.FeeRealNameAuthDetail",
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
			id : "form.FeeRealNameAuthDetail",
			frame : false,
			items : [this.groupSummaryGridPanel1609795184, {
				id : "orgNo.FeeRealNameAuthDetail",
				xtype : "hidden"
			}, {
				id : "startTime.FeeRealNameAuthDetail",
				xtype : "hidden"
			}, {
				id : "endTime.FeeRealNameAuthDetail",
				xtype : "hidden"
			}, {
				id : "fileName.FeeRealNameAuthDetail",
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
			xtype : "window",
			width : "80%",
			closeAction : "hide",
			buttonAlign : "center",
			buttons : [{
				text : "导出EXCEL",
				handler : function(button, event) {
					com.jsjn.jnf.fee.FeeRealNameAuthDetail.exportExcel(button,
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
