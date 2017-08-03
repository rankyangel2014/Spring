// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.fee');
com.jsjn.jnf.fee.QryFeeXmlFlowListMgr = function(config) {
	if (typeof(com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.fee.QryFeeXmlFlowListMgr']);
		com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.PANEL = this;
	}
	return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.fee.QryFeeXmlFlowListMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store2043032162 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "inputXml",
				mapping : "inputXml",
				type : "string"
			}, {
				name : "outputXml",
				mapping : "outputXml",
				type : "string"
			}, {
				name : "mName",
				mapping : "mname",
				type : "string"
			}, {
				name : "custName",
				mapping : "custName",
				type : "string"
			}, {
				name : "method",
				mapping : "method",
				type : "string"
			}, {
				name : "state",
				mapping : "state",
				type : "string"
			}, {
				name : "exception",
				mapping : "exception",
				type : "string"
			}, {
				name : "bflag",
				mapping : "bflag",
				type : "string"
			}, {
				name : "reason",
				mapping : "reason",
				type : "string"
			}, {
				name : "fee",
				mapping : "fee",
				type : "string"
			}, {
				name : "resTime",
				mapping : "resTime",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl + '/jnf/feeService.do?method=qryXmlFlow'
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
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 130,
				sortable : true,
				align : "center",
				dataIndex : "mName",
				header : "商户名称"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "custName",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "机构名称"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "method",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "调用方法"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "state",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "接口状态"
			}, {
				hidden : false,
				width : 140,
				sortable : true,
				align : "center",
				dataIndex : "exception",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "接口失败原因"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "bflag",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "业务状态"
			}, {
				hidden : false,
				width : 140,
				sortable : true,
				align : "center",
				dataIndex : "reason",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "业务失败原因"
			}, {
				hidden : false,
				width : 60,
				sortable : true,
				align : "left",
				dataIndex : "fee",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "单价"
			}, {
				hidden : false,
				width : 160,
				sortable : true,
				align : "center",
				dataIndex : "resTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "调用时间"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "操作"
			}],
			autoWidth : false,
			autoHeight : false,
			bbar : new Ext.PagingToolbar({
				displayInfo : true,
				store : this.store2043032162,
				emptyMsg : "无数据显示",
				displayMsg : "显示{0} - {1} 共 {2}",
				xtype : "paging",
				pageSize : 10
			}),
			id : "grid.QryFeeXmlFlowListMgr",
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

		this.store797387860 = new Ext.data.Store({});

		this.comboBox1082833519 = new Ext.form.ComboBox({
			store : this.store797387860,
			emptyText : "--请选择--",
			fieldLabel : "业务状态",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "bflag.QryFeeXmlFlowListMgr",
			hiddenName : "bflag",
			displayField : "paramValue",
			name : "bflag",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.store770235737 = new Ext.data.Store({});

		this.comboBox962472270 = new Ext.form.ComboBox({
			store : this.store770235737,
			emptyText : "--请选择--",
			fieldLabel : "调用接口状态",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "state.QryFeeXmlFlowListMgr",
			hiddenName : "state",
			displayField : "paramValue",
			name : "state",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.dateField1994331807 = new Ext.form.DateField({
			id : "reqTimeMax.QryFeeXmlFlowListMgr",
			allowBlank : true,
			name : "reqTimeMax",
			format : "Ymd",
			fieldLabel : "调用时间（止）",
			anchor : "90%"
		});

		this.textField1267444716 = new Ext.form.TextField({
			id : "custName.QryFeeXmlFlowListMgr",
			allowBlank : true,
			maxLength : 25,
			width : 200,
			name : "custName",
			fieldLabel : "机构名称",
			anchor : "90%"
		});

		this.dateField1669034659 = new Ext.form.DateField({
			id : "reqTimeMin.QryFeeXmlFlowListMgr",
			allowBlank : true,
			name : "reqTimeMin",
			format : "Ymd",
			fieldLabel : "调用时间（起）",
			anchor : "90%"
		});

		this.textField1410492613 = new Ext.form.TextField({
			id : "mname.QryFeeXmlFlowListMgr",
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
			id : "form.QryFeeXmlFlowListMgr",
			height : 500,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "exportInfo.QryFeeXmlFlowListMgr",
					text : "导出excel",
					handler : function(button, event) {
						com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.exportInfo(
								button, event);
					}
				}, {
					id : "btnQuery.QryFeeXmlFlowListMgr",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.btnQuery(button,
								event);
					}
				}, {
					id : "btnReset.QryFeeXmlFlowListMgr",
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.fee.QryFeeXmlFlowListMgr.btnReset(button,
								event);
					}
				}],
				collapsed : false,
				defaults : "",
				title : "计费报文流水查询",
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
					items : [this.comboBox962472270, this.comboBox1082833519],
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
			}, this.gridPanel79120177],
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
