// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.trade');
com.jsjn.jnf.trade.QryTradeExceptionListMgr = function(config) {
	if (typeof(com.jsjn.jnf.trade.QryTradeExceptionListMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.trade.QryTradeExceptionListMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.trade.QryTradeExceptionListMgr']);
		com.jsjn.jnf.trade.QryTradeExceptionListMgr.PANEL = this;
	}
	return com.jsjn.jnf.trade.QryTradeExceptionListMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.trade.QryTradeExceptionListMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1068384417 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "tradeNo",
				mapping : "tradeNo",
				type : "string"
			}, {
				name : "tradeType",
				mapping : "tradeType",
				type : "string"
			}, {
				name : "mid",
				mapping : "mid",
				type : "string"
			}, {
				name : "mSerialNo",
				mapping : "mSerialNo",
				type : "string"
			}, {
				name : "externLoanNo",
				mapping : "externLoanNo",
				type : "string"
			}, {
				name : "payerName",
				mapping : "payerName",
				type : "string"
			}, {
				name : "payeeName",
				mapping : "payeeName",
				type : "string"
			}, {
				name : "amount",
				mapping : "amount",
				type : "float"
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
					+ '/jnf/tradeService.do?method=queryTransactionByCondition&qryFlag=1'
		});

		this.gridPanel1436652731 = new Ext.grid.GridPanel({
			layoutConfig : {},
			store : this.store1068384417,
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
					return com.jsjn.jnf.trade.QryTradeExceptionListMgr
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "tradeNo",
				header : "交易订单编号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "tradeType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.trade.QryTradeExceptionListMgr
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "交易类型"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "mid",
				header : "商户编号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "mSerialNo",
				header : "商户订单流水号"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "externLoanNo",
				header : "外部合同号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "payerName",
				header : "付款人名称"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "left",
				dataIndex : "payeeName",
				header : "收款人名称"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "amount",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.trade.QryTradeExceptionListMgr
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "交易金额"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "status",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.trade.QryTradeExceptionListMgr
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "交易状态"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "modified",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.trade.QryTradeExceptionListMgr
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "交易时间"
			}, {
				hidden : false,
				width : 130,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.trade.QryTradeExceptionListMgr
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "操作"
			}],
			autoWidth : false,
			autoHeight : false,
			bbar : new Ext.PagingToolbar({
				displayInfo : true,
				store : this.store1068384417,
				emptyMsg : "无数据显示",
				displayMsg : "显示{0} - {1} 共 {2}",
				xtype : "paging",
				pageSize : 10
			}),
			id : "grid.QryTradeExceptionListMgr",
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

		this.dateField612596260 = new Ext.form.DateField({
			id : "modifiedMax.QryTradeExceptionListMgr",
			allowBlank : true,
			name : "modifiedMax",
			format : "Ymd",
			fieldLabel : "交易时间（止）",
			anchor : "90%"
		});

		this.textField1942793430 = new Ext.form.TextField({
			id : "externLoanNo.QryTradeExceptionListMgr",
			allowBlank : true,
			maxLength : 32,
			width : 200,
			name : "externLoanNo",
			fieldLabel : "外部合同号",
			anchor : "90%"
		});

		this.textField1267444716 = new Ext.form.TextField({
			id : "mid.QryTradeExceptionListMgr",
			allowBlank : true,
			maxLength : 4,
			name : "mid",
			width : 200,
			fieldLabel : "商户编号",
			anchor : "90%"
		});

		this.store515402429 = new Ext.data.Store({});

		this.comboBox1601317067 = new Ext.form.ComboBox({
			store : this.store515402429,
			emptyText : "--请选择--",
			fieldLabel : "交易类型",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "tradeType.QryTradeExceptionListMgr",
			displayField : "paramValue",
			name : "tradeType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.dateField751638090 = new Ext.form.DateField({
			id : "modifiedMin.QryTradeExceptionListMgr",
			allowBlank : true,
			name : "modifiedMin",
			format : "Ymd",
			fieldLabel : "交易时间（起）",
			anchor : "90%"
		});

		this.textField1005322592 = new Ext.form.TextField({
			id : "mSerialNo.QryTradeExceptionListMgr",
			allowBlank : true,
			maxLength : 32,
			name : "mSerialNo",
			width : 200,
			fieldLabel : "商户订单流水号",
			anchor : "90%"
		});

		this.textField1410492613 = new Ext.form.TextField({
			id : "tradeNo.QryTradeExceptionListMgr",
			allowBlank : true,
			maxLength : 21,
			width : 200,
			name : "tradeNo",
			fieldLabel : "交易订单编号",
			anchor : "90%"
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.QryTradeExceptionListMgr",
			frame : false,
			height : 500,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "btnQuery.QryTradeExceptionListMgr",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.trade.QryTradeExceptionListMgr.btnQuery(
								button, event);
					}
				}, {
					id : "btnReset.QryTradeExceptionListMgr",
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.trade.QryTradeExceptionListMgr.btnReset(
								button, event);
					}
				}],
				collapsed : false,
				title : "异常交易信息查询",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					items : [this.textField1410492613,
							this.textField1005322592, {
								id : "amountMin.QryTradeExceptionListMgr",
								allowBlank : true,
								width : 200,
								name : "amountMin",
								xtype : "numberfield",
								fieldLabel : "交易金额（起）",
								anchor : "90%"
							}, this.dateField751638090, this.comboBox1601317067],
					layout : "form",
					columnWidth : "0.5",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField1267444716,
							this.textField1942793430, {
								id : "amountMax.QryTradeExceptionListMgr",
								allowBlank : true,
								xtype : "numberfield",
								name : "amountMax",
								width : 200,
								fieldLabel : "交易金额（止）",
								anchor : "90%"
							}, this.dateField612596260],
					layout : "form",
					columnWidth : "0.5",
					autoWidth : false,
					border : false
				}],
				xtype : "fieldset",
				layout : "column",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, this.gridPanel1436652731],
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
