// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.payment');
com.jsjn.jnf.payment.QryPaymentListMgr = function(config) {
	if (typeof(com.jsjn.jnf.payment.QryPaymentListMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.payment.QryPaymentListMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.payment.QryPaymentListMgr']);
		com.jsjn.jnf.payment.QryPaymentListMgr.PANEL = this;
	}
	return com.jsjn.jnf.payment.QryPaymentListMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.payment.QryPaymentListMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1068384417 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "orderNo",
				mapping : "orderNo",
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
				name : "amount",
				mapping : "amount",
				type : "float"
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
				name : "modified",
				mapping : "modified",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/jnf/paymentService.do?method=findPaymentInfoByCondition'
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
					return com.jsjn.jnf.payment.QryPaymentListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "orderNo",
				header : "支付订单编号"
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
				dataIndex : "payAccount",
				header : "付款账号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "payer",
				header : "付款人"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "collAccount",
				header : "收款账号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "payee",
				header : "收款人"
			}, {
				hidden : false,
				width : 60,
				sortable : true,
				align : "left",
				dataIndex : "amount",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.payment.QryPaymentListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "支付金额"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "channel",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.payment.QryPaymentListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "支付通道"
			}, {
				hidden : false,
				width : 60,
				sortable : true,
				align : "center",
				dataIndex : "status",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.payment.QryPaymentListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "支付状态"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "left",
				dataIndex : "failReason",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.payment.QryPaymentListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "失败原因"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "modified",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.payment.QryPaymentListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "交易时间"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.payment.QryPaymentListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
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
			id : "grid.QryPaymentListMgr",
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
			id : "modifiedMax.QryPaymentListMgr",
			allowBlank : true,
			name : "modifiedMax",
			format : "Ymd",
			fieldLabel : "支付时间（止）",
			anchor : "90%"
		});

		this.textField1267444716 = new Ext.form.TextField({
			id : "payAccount.QryPaymentListMgr",
			allowBlank : true,
			maxLength : 21,
			name : "payAccount",
			width : 200,
			fieldLabel : "付款账号",
			anchor : "90%"
		});

		this.dateField751638090 = new Ext.form.DateField({
			id : "modifiedMin.QryPaymentListMgr",
			allowBlank : true,
			name : "modifiedMin",
			format : "Ymd",
			fieldLabel : "支付时间（起）",
			anchor : "90%"
		});

		this.textField1410492613 = new Ext.form.TextField({
			id : "orderNo.QryPaymentListMgr",
			allowBlank : true,
			maxLength : 21,
			width : 200,
			name : "orderNo",
			fieldLabel : "支付订单编号",
			anchor : "90%"
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.QryPaymentListMgr",
			frame : false,
			height : 500,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "btnQuery.QryPaymentListMgr",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.payment.QryPaymentListMgr.btnQuery(button,
								event);
					}
				}, {
					id : "btnReset.QryPaymentListMgr",
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.payment.QryPaymentListMgr.btnReset(button,
								event);
					}
				}],
				collapsed : false,
				title : "支付信息查询",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					items : [this.textField1410492613, {
						id : "amountMin.QryPaymentListMgr",
						allowBlank : true,
						width : 200,
						name : "amountMin",
						xtype : "numberfield",
						fieldLabel : "支付金额（起）",
						anchor : "90%"
					}, this.dateField751638090],
					layout : "form",
					columnWidth : "0.5",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField1267444716, {
						id : "amountMax.QryPaymentListMgr",
						allowBlank : true,
						xtype : "numberfield",
						name : "amountMax",
						width : 200,
						fieldLabel : "支付金额（止）",
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
