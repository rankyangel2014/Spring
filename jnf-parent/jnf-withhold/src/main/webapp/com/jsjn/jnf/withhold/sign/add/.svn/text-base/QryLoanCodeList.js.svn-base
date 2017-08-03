// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold.sign.add');
com.jsjn.jnf.withhold.sign.add.QryLoanCodeList = function(config) {
	if (typeof(com.jsjn.jnf.withhold.sign.add.QryLoanCodeList.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.sign.add.QryLoanCodeList.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.sign.add.QryLoanCodeList']);
		com.jsjn.jnf.withhold.sign.add.QryLoanCodeList.WINDOW = this;
	}
	return com.jsjn.jnf.withhold.sign.add.QryLoanCodeList.WINDOW;
};
Ext.extend(com.jsjn.jnf.withhold.sign.add.QryLoanCodeList, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1615170778 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "Id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "loanNo",
				mapping : "loanNo",
				type : "string"
			}, {
				name : "custNo",
				mapping : "custNo",
				type : "string"
			}, {
				name : "custName",
				mapping : "custName",
				type : "string"
			}, {
				name : "custType",
				mapping : "custType",
				type : "string"
			}, {
				name : "idType",
				mapping : "paperType",
				type : "string"
			}, {
				name : "idNo",
				mapping : "paperNo",
				type : "string"
			}, {
				name : "contNo",
				mapping : "contNoExt",
				type : "string"
			}, {
				name : "repayType",
				mapping : "repayTyp",
				type : "string"
			}, {
				name : "osPrcp",
				mapping : "prcpOrig",
				type : "string"
			}, {
				name : "resPrcp",
				mapping : "prcpBal",
				type : "string"
			}, {
				name : "startTime",
				mapping : "intStartDt",
				type : "string"
			}, {
				name : "endTime",
				mapping : "lastDueDt",
				type : "string"
			}, {
				name : "lastRepayDt",
				mapping : "lastRepayDt",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/jnf/withhold.do?method=findContNoByCondition'
		});

		this.checkboxSelectionModel1155151147 = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true,
			width : 23,
			sortable : true
		});

		this.gridPanel8258512 = new Ext.grid.GridPanel({
			layoutConfig : {},
			store : this.store1615170778,
			autoScroll : false,
			width : "99%",
			columns : [this.checkboxSelectionModel1155151147, {
				hidden : true,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryLoanCodeList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "custName",
				header : "客户名称"
			}, {
				hidden : false,
				width : 60,
				sortable : true,
				align : "center",
				dataIndex : "custType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryLoanCodeList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "客户类型"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "idType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryLoanCodeList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "证件类型"
			}, {
				hidden : false,
				width : 140,
				sortable : true,
				align : "left",
				dataIndex : "idNo",
				header : "证件号码"
			}, {
				hidden : false,
				width : 180,
				sortable : true,
				align : "left",
				dataIndex : "contNo",
				header : "贷款合同号"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "repayType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryLoanCodeList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "还款方式"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "right",
				dataIndex : "osPrcp",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryLoanCodeList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "贷款本金"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "right",
				dataIndex : "resPrcp",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryLoanCodeList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "剩余本金"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "startTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryLoanCodeList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "起息日"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "endTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryLoanCodeList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "到期日"
			}],
			autoWidth : false,
			autoHeight : false,
			bbar : new Ext.PagingToolbar({
				displayInfo : true,
				store : this.store1615170778,
				emptyMsg : "无数据显示",
				displayMsg : "显示{0} - {1} 共 {2}",
				xtype : "paging",
				pageSize : 10
			}),
			id : "grid.QryLoanCodeList",
			height : 280,
			columnWidth : "1",
			selModel : this.checkboxSelectionModel1155151147,
			viewConfig : {},
			loadMask : {
				msg : "正在载入数据...",
				title : "提示"
			}
		});

		this.dateField1268831849 = new Ext.form.DateField({
			id : "endTime.QryLoanCodeList",
			style : "border:#4667c2 1px solid;",
			name : "endTime",
			format : "Ymd",
			editable : false,
			hideLabel : true,
			anchor : "90%"
		});

		this.dateField855211457 = new Ext.form.DateField({
			id : "startTime.QryLoanCodeList",
			style : "border:#4667c2 1px solid;",
			name : "startTime",
			format : "Ymd",
			editable : false,
			anchor : "90%",
			hideLabel : true
		});

		this.panel303911097 = new Ext.Panel({
			layoutConfig : {},
			columnWidth : "1",
			style : "margin:1px 1px 1px 5px",
			border : false,
			items : [{
				columnWidth : ".42",
				border : false,
				items : [this.dateField855211457],
				layout : "form"
			}, {
				columnWidth : ".06",
				html : "<div align='center'><font size='2em'>~</font></div>",
				xtype : "label"
			}, {
				columnWidth : ".44",
				style : "margin:0 0 0 14px",
				border : false,
				items : [this.dateField1268831849],
				layout : "form"
			}],
			layout : "column"
		});

		this.textField1972055884 = new Ext.form.TextField({
			id : "idNo.QryLoanCodeList",
			allowBlank : true,
			name : "idNo",
			columnWidth : "0.25",
			validateOnBlur : true,
			fieldLabel : "证件号码",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.store1951972844 = new Ext.data.Store({});

		this.comboBox1893623061 = new Ext.form.ComboBox({
			region : "",
			allowBlank : true,
			store : this.store1951972844,
			emptyText : "--请选择--",
			fieldLabel : "证件类型",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "idType.QryLoanCodeList",
			hiddenName : "idType",
			displayField : "paramValue",
			name : "idType",
			valueField : "paramKey",
			value : "",
			triggerAction : "all",
			selectOnFocus : true,
			disabled : true
		});

		this.store545804775 = new Ext.data.Store({});

		this.comboBox615413677 = new Ext.form.ComboBox({
			store : this.store545804775,
			emptyText : "--请选择--",
			fieldLabel : "客户类型",
			forceSelection : false,
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "custType.QryLoanCodeList",
			hiddenName : "custType",
			displayField : "paramValue",
			name : "custType",
			valueField : "paramKey",
			value : "",
			triggerAction : "all",
			selectOnFocus : true,
			disabled : true
		});

		this.textField1322182474 = new Ext.form.TextField({
			id : "contNo.QryLoanCodeList",
			allowBlank : true,
			name : "contNo",
			columnWidth : "0.5",
			validateOnBlur : false,
			fieldLabel : "贷款合同号",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "custName.QryLoanCodeList",
			allowBlank : true,
			name : "custName",
			columnWidth : "0.25",
			validateOnBlur : true,
			fieldLabel : "客户名称",
			disabled : false,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.formPanel1692878715 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			buttons : [{
				id : "confirm.QryLoanCodeList",
				text : "确认",
				handler : function(button, event) {
					com.jsjn.jnf.withhold.sign.add.QryLoanCodeList.confirm(
							button, event);
				}
			}],
			collapsed : false,
			id : "form.QryLoanCodeList",
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "qry.QryLoanCodeList",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.withhold.sign.add.QryLoanCodeList.qry(
								button, event);
					}
				}, {
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.withhold.sign.add.QryLoanCodeList.reset(
								button, event);
					}
				}],
				collapsed : false,
				defaults : "",
				title : "贷款查询",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					id : "form1.QryLoanCodeList",
					items : [this.textField1590153001,
							this.textField1322182474, this.comboBox615413677],
					layout : "form",
					columnWidth : "0.5",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					id : "form2.QryLoanCodeList",
					items : [this.comboBox1893623061, this.textField1972055884,
							{
								border : false,
								items : [{
									autoWidth : false,
									html : "<div style='text-align:right; font:12px tahoma, arial, helvetica, sans-serif'>贷款起息日:</div>",
									style : "margin:4px 0 0 0;",
									xtype : "label",
									width : "100px"
								}, this.panel303911097],
								layout : "column"
							}],
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
			}, this.gridPanel8258512],
			layout : "column",
			columnWidth : "1",
			buttonAlign : "center",
			labelAlign : "right",
			border : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			width : "95%",
			closeAction : "hide",
			id : "win.AddConfigMgr",
			title : "贷款合同查询",
			height : "80%",
			items : [this.formPanel1692878715],
			xtype : "window",
			layout : "fit",
			buttonAlign : "center",
			plain : false,
			modal : true
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
