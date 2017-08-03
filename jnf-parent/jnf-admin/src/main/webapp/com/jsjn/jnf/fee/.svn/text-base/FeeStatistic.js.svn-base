// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.fee');
com.jsjn.jnf.fee.FeeStatistic = function(config) {
	if (typeof(com.jsjn.jnf.fee.FeeStatistic.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.fee.FeeStatistic.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.fee.FeeStatistic']);
		com.jsjn.jnf.fee.FeeStatistic.PANEL = this;
	}
	return com.jsjn.jnf.fee.FeeStatistic.PANEL;
};
Ext.extend(com.jsjn.jnf.fee.FeeStatistic, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.groupingStore1509055384 = new Ext.data.GroupingStore({
			reader : new Ext.data.JsonReader({
				totalProperty : "total",
				root : "root"
			}, [{
				name : "mid",
				mapping : "mid",
				type : "string"
			}, {
				name : "mname",
				mapping : "mname",
				type : "string"
			}, {
				name : "insttuName",
				mapping : "insttuName",
				type : "string"
			}, {
				name : "insttuId",
				mapping : "insttuId",
				type : "string"
			}, {
				name : "businessType",
				mapping : "businessType",
				type : "string"
			}, {
				name : "channel",
				mapping : "channel",
				type : "string"
			}, {
				name : "startTime",
				mapping : "startTime",
				type : "date"
			}, {
				name : "endTime",
				mapping : "endTime",
				type : "date"
			}, {
				name : "price",
				mapping : "price",
				type : "float"
			}, {
				name : "count",
				mapping : "count",
				type : "int"
			}, {
				name : "totalMoney",
				mapping : "totalMoney",
				type : "float"
			}]),
			baseParams : {
				method : "getFeeStatisticList"
			},
			groupField : "",
			url : appConfig.baseUrl + '/jnf/FeeAction.do'
		});

		this.groupSummaryGridPanel1221801197 = new com.jsjn.ext.extend.GroupSummaryGridPanel({
			layoutConfig : {},
			isSubTotal : false,
			isTotal : true,
			store : this.groupingStore1509055384,
			width : "80%",
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
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "mname",
				header : "商户名称"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "center",
				dataIndex : "insttuName",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "机构名称"
			}, {
				hidden : true,
				sortable : true,
				dataIndex : "insttuId"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "businessType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "业务类型"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "channel",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "渠道"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "startTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "开始时间"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "endTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "结束时间"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "right",
				dataIndex : "price",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "单价（元）"
			}, {
				summaryRenderer : function(v, params, data) {
					return gridSumFieldDataInt(v, params, data);
				},
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "count",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				summaryType : "sum",
				header : "笔数"
			}, {
				summaryRenderer : function(v, params, data) {
					return gridSumFieldData(v, params, data);
				},
				hidden : false,
				width : 120,
				sortable : true,
				align : "right",
				dataIndex : "totalMoney",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				summaryType : "sum",
				header : "小计（元）"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeStatistic.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "操作"
			}],
			autoWidth : false,
			buttons : [{
				id : "exportExcel.FeeStatistic",
				text : "导出EXCEL",
				handler : function(button, event) {
					com.jsjn.jnf.fee.FeeStatistic.exportExcel(button, event);
				}
			}],
			autoHeight : false,
			id : "grid.FeeStatistic",
			height : 330,
			isGroup : false,
			columnWidth : "1",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false
			}),
			buttonAlign : "center",
			viewConfig : {}
		});

		this.store175493518 = new Ext.data.Store({});

		this.comboBox1064967584 = new Ext.form.ComboBox({
			store : this.store175493518,
			allowBlank : true,
			autoCreate : true,
			emptyText : "--请选择--",
			fieldLabel : "渠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "channel.FeeStatistic",
			displayField : "paramValue",
			value : "",
			valueField : "paramKey",
			triggerAction : "all"
		});

		this.store861582107 = new Ext.data.Store({});

		this.comboBox348037786 = new Ext.form.ComboBox({
			allowBlank : true,
			store : this.store861582107,
			emptyText : "--请选择--",
			fieldLabel : "业务类型",
			forceSelection : false,
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "businessType.FeeStatistic",
			hiddenName : "businessType",
			displayField : "paramValue",
			name : "businessType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.dateField1994331807 = new Ext.form.DateField({
			id : "endTime.FeeStatistic",
			allowBlank : true,
			name : "endTime",
			value : moment().add(-1, 'month').endOf('month').toDate(),
			format : "Y-m-d",
			fieldLabel : "结束时间",
			editable : false,
			anchor : "90%"
		});

		this.store903796814 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "insttuId",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "insttuId",
				mapping : "INSTTU_ID",
				type : "string"
			}, {
				name : "insttuNm",
				mapping : "CNAME",
				type : "string"
			}]),
			baseParams : {
				limit : "5000",
				method : "getOrgList"
			},
			url : appConfig.baseUrl + '/TreeController.do'
		});

		this.comboBoxTable1025303523 = new com.jsjn.ext.extend.ComboBoxTable({
			listeners : {
				selectRow : {
					fn : function(combo, newValue, oldValue) {
						return com.jsjn.jnf.fee.FeeStatistic.InsttuSelectRow(
								combo, newValue, oldValue);
					}
				}
			},
			Gridstore : this.store903796814,
			allowBlank : true,
			listWidth : 465,
			columns : [{
				hidden : false,
				width : 300,
				sortable : true,
				dataIndex : "insttuNm",
				header : "机构名称"
			}, {
				hidden : false,
				width : 155,
				sortable : true,
				dataIndex : "insttuId",
				header : "机构码"
			}],
			emptyText : "--请选择--",
			fieldLabel : "机构名称",
			anchor : "90%",
			id : "insttuId.FeeStatistic",
			height : 400,
			displayField : "insttuNm",
			name : "insttuNm",
			value : "",
			valueField : "insttuId",
			disabled : false
		});

		this.dateField1669034659 = new Ext.form.DateField({
			id : "startTime.FeeStatistic",
			allowBlank : true,
			name : "startTime",
			width : "100%",
			value : moment().add(-1, 'month').startOf('month').toDate(),
			format : "Y-m-d",
			fieldLabel : "开始时间",
			editable : false,
			anchor : "90%"
		});

		this.store1429741970 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "mid",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "insttuId",
				mapping : "mid",
				type : "string"
			}, {
				name : "insttuNm",
				mapping : "mName",
				type : "string"
			}]),
			baseParams : {
				limit : "5000",
				method : "getBusinessList"
			},
			autoLoad : true,
			url : appConfig.baseUrl + '/TreeController.do'
		});

		this.comboBoxTable1965957699 = new com.jsjn.ext.extend.ComboBoxTable({
			listeners : {
				selectRow : {
					fn : function(combo, newValue, oldValue) {
						return com.jsjn.jnf.fee.FeeStatistic.BusinessSelectRow(
								combo, newValue, oldValue);
					}
				}
			},
			allowBlank : true,
			Gridstore : this.store1429741970,
			blankText : "请选商户",
			listWidth : 365,
			columns : [{
				hidden : false,
				width : 205,
				sortable : true,
				dataIndex : "insttuNm",
				header : "商户名称"
			}, {
				hidden : false,
				width : 155,
				sortable : true,
				dataIndex : "insttuId",
				header : "商户号"
			}],
			emptyText : "--请选择--",
			fieldLabel : "商户名称",
			anchor : "90%",
			id : "mid.FeeStatistic",
			height : 400,
			displayField : "insttuNm",
			name : "insttuNm",
			valueField : "insttuId",
			value : "",
			disabled : false
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.FeeStatistic",
			height : 500,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "btnQuery..FeeStatistic",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.fee.FeeStatistic.btnQuery(button, event);
					}
				}, {
					id : "btnReset..FeeStatistic",
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.fee.FeeStatistic.btnReset(button, event);
					}
				}],
				collapsed : false,
				defaults : "",
				title : "计费统计",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.comboBoxTable1965957699,
							this.dateField1669034659],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBoxTable1025303523,
							this.dateField1994331807],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBox348037786, this.comboBox1064967584],
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
			}, this.groupSummaryGridPanel1221801197],
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
