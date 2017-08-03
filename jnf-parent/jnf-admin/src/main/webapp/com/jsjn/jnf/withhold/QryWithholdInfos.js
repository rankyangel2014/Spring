// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold');
com.jsjn.jnf.withhold.QryWithholdInfos = function(config) {
	if (typeof(com.jsjn.jnf.withhold.QryWithholdInfos.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.QryWithholdInfos.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.QryWithholdInfos']);
		com.jsjn.jnf.withhold.QryWithholdInfos.PANEL = this;
	}
	return com.jsjn.jnf.withhold.QryWithholdInfos.PANEL;
};
Ext.extend(com.jsjn.jnf.withhold.QryWithholdInfos, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1068384417 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "mname",
				mapping : "mname",
				type : "string"
			}, {
				name : "userName",
				mapping : "userName",
				type : "string"
			}, {
				name : "loanNo",
				mapping : "loanNo",
				type : "string"
			}, {
				name : "custName",
				mapping : "custName",
				type : "string"
			}, {
				name : "insttuName",
				mapping : "insttuName",
				type : "string"
			}, {
				name : "type",
				mapping : "type",
				type : "string"
			}, {
				name : "state",
				mapping : "state",
				type : "string"
			}, {
				name : "channel",
				mapping : "channel",
				type : "string"
			}, {
				name : "created",
				mapping : "created",
				type : "string"
			}, {
				name : "signRecordId",
				mapping : "signRecordId"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/qryWithholdInfos.do?method=qryWithholdInfos'
		});

		this.gridPanel1436652731 = new Ext.grid.GridPanel({
			layoutConfig : {},
			autoScroll : false,
			store : this.store1068384417,
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.QryWithholdInfos.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "mname",
				header : "商户名称"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "userName",
				header : "机构名称"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "loanNo",
				header : "借据号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "custName",
				header : "付款方姓名"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "insttuName",
				header : "收款方姓名"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "type",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.QryWithholdInfos.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "协议类型"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "state",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.QryWithholdInfos.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "签约状态"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "channel",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.QryWithholdInfos.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "渠道"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "created",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.QryWithholdInfos.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "签约时间"
			}, {
				hidden : false,
				width : 130,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.QryWithholdInfos.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "操作"
			}],
			autoWidth : false,
			buttons : [{
				id : "btnExport",
				text : "导出EXCEL"
			}],
			autoHeight : false,
			bbar : new Ext.PagingToolbar({
				displayInfo : true,
				store : this.store1068384417,
				emptyMsg : "无数据显示",
				displayMsg : "显示{0} - {1} 共 {2}",
				xtype : "paging",
				pageSize : 10
			}),
			id : "grid.withhodInfo",
			height : 350,
			style : "margin-left:12px",
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

		this.store1116828352 = new Ext.data.Store({});

		this.comboBox765937356 = new Ext.form.ComboBox({
			store : this.store1116828352,
			emptyText : "--请选择--",
			fieldLabel : "渠道",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "withhold.channel",
			displayField : "paramValue",
			name : "tradeType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.store662569750 = new Ext.data.Store({});

		this.comboBox337487577 = new Ext.form.ComboBox({
			store : this.store662569750,
			emptyText : "--请选择--",
			fieldLabel : "签约状态",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "withhold.state",
			displayField : "paramValue",
			name : "tradeType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField1997242498 = new Ext.form.TextField({
			id : "withhold.insttuName",
			allowBlank : true,
			maxLength : 32,
			name : "externLoanNo",
			fieldLabel : "收款方名称",
			anchor : "90%"
		});

		this.store572788897 = new Ext.data.Store({});

		this.comboBox1432869610 = new Ext.form.ComboBox({
			store : this.store572788897,
			emptyText : "--请选择--",
			fieldLabel : "协议类型",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "withhold.type",
			displayField : "paramValue",
			name : "tradeType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField1021524558 = new Ext.form.TextField({
			id : "withhold.loanNo",
			maxLength : 32,
			allowBlank : true,
			name : "externLoanNo",
			fieldLabel : "借据号",
			anchor : "90%"
		});

		this.textField1388776963 = new Ext.form.TextField({
			id : "withhold.custName",
			maxLength : 32,
			allowBlank : true,
			name : "externLoanNo",
			fieldLabel : "付款方姓名",
			anchor : "90%"
		});

		this.dateField1498259580 = new Ext.form.DateField({
			id : "withhold.endTime",
			allowBlank : true,
			name : "modifiedMin",
			format : "Ymd",
			fieldLabel : "交易时间（止）",
			anchor : "90%"
		});

		this.dateField1342462351 = new Ext.form.DateField({
			id : "withhold.startTime",
			allowBlank : true,
			name : "modifiedMin",
			format : "Ymd",
			fieldLabel : "交易时间（起）",
			anchor : "90%"
		});

		this.store991925115 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				root : "root"
			}, [{
				name : "custName",
				mapping : "custName",
				type : "string"
			}, {
				name : "custId",
				mapping : "custId",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/qryWithholdInfos.do?method=geTinstitution'
		});

		this.comboBox1566838960 = new Ext.form.ComboBox({
			store : this.store991925115,
			emptyText : "--请选择--",
			fieldLabel : "机构名称",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "withhold.userName",
			displayField : "custName",
			name : "tradeType",
			valueField : "custId",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.store515402429 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				root : "root"
			}, [{
				name : "mName",
				mapping : "mName",
				type : "string"
			}, {
				name : "mid",
				mapping : "mid",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/qryWithholdInfos.do?method=getCommercial'
		});

		this.comboBox1601317067 = new Ext.form.ComboBox({
			listeners : {
				select : {
					fn : function(combo, record, index) {
						return com.jsjn.jnf.withhold.QryWithholdInfos
								.selectMid(combo, record, index);
					}
				}
			},
			store : this.store515402429,
			emptyText : "--请选择--",
			fieldLabel : "商户名称",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "withhold.mid",
			displayField : "mName",
			valueField : "mid",
			value : "",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : false,
			collapsible : false,
			collapsed : false,
			id : "form.Withhold",
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "btnQuery.QryTradeListMgr",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.withhold.QryWithholdInfos.query(button,
								event);
					}
				}, {
					id : "btnReset.QryTradeListMgr",
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.withhold.QryWithholdInfos.reset(button,
								event);
					}
				}],
				collapsed : false,
				defaults : "",
				title : "代扣信息查询",
				style : "margin:12px",
				items : [{
					layoutConfig : {},
					style : "margin-top:10px;",
					items : [this.comboBox1601317067, this.comboBox1566838960,
							this.dateField1342462351, this.dateField1498259580],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					style : "margin-top:10px",
					items : [this.textField1388776963,
							this.textField1021524558, this.comboBox1432869610],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					style : "margin-top:10px",
					items : [this.textField1997242498, this.comboBox337487577,
							this.comboBox765937356],
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
			}, this.gridPanel1436652731],
			layout : "form",
			columnWidth : "1",
			buttonAlign : "center",
			labelAlign : "right",
			border : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			autoScroll : false,
			items : [this.formPanel239968220],
			layout : "form",
			border : false
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
