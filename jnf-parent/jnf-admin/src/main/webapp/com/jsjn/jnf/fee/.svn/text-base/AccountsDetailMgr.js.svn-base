// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.fee');
com.jsjn.jnf.fee.AccountsDetailMgr = function(config) {
	if (typeof(com.jsjn.jnf.fee.AccountsDetailMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.fee.AccountsDetailMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.fee.AccountsDetailMgr']);
		com.jsjn.jnf.fee.AccountsDetailMgr.WINDOW = this;
	}
	return com.jsjn.jnf.fee.AccountsDetailMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.fee.AccountsDetailMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1673692761 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "fee",
				mapping : "fee",
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
				name : "mobile",
				mapping : "mobile",
				type : "string"
			}, {
				name : "resCode",
				mapping : "resCode",
				type : "string"
			}, {
				name : "exception",
				mapping : "exception",
				type : "string"
			}, {
				name : "modified",
				mapping : "modified",
				type : "string"
			}]),
			baseParams : {
				created : "startTime",
				orgNo : "orgNo",
				mid : "mid",
				modified : "endTime"
			},
			autoLoad : true,
			url : appConfig.baseUrl + '/jnf/feeService.do?method=queryAccount'
		});

		this.gridPanel391101344 = new Ext.grid.GridPanel({
			layoutConfig : {},
			autoScroll : false,
			store : this.store1673692761,
			width : "100%",
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.AccountsDetailMgr.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 130,
				sortable : true,
				align : "right",
				dataIndex : "custName",
				header : "姓名"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "idNo",
				header : "身份证号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "mobile",
				header : "手机号码"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "right",
				dataIndex : "resCode",
				header : "返回结果"
			}, {
				hidden : false,
				width : 140,
				sortable : true,
				align : "left",
				dataIndex : "exception",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.AccountsDetailMgr.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "返回结果说明"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "modified",
				header : "请求日期"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "right",
				dataIndex : "fee",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.AccountsDetailMgr.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "单价（元）"
			}],
			autoWidth : false,
			autoHeight : false,
			bbar : new Ext.PagingToolbar({
				displayInfo : true,
				store : this.store1673692761,
				emptyMsg : "无数据显示",
				displayMsg : "显示{0} - {1} 共 {2}",
				xtype : "paging",
				pageSize : 10
			}),
			id : "grid.AccountsDetailMgr",
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

		this.dateField1889015366 = new Ext.form.DateField({
			id : "startTime.AccountsDetailMgr",
			allowBlank : true,
			name : "reqTimeMin",
			format : "Ymd",
			fieldLabel : "调用时间（起）",
			disabled : true,
			anchor : "90%"
		});

		this.textField1899068667 = new Ext.form.TextField({
			id : "mname.AccountsDetailMgr",
			maxLength : 25,
			allowBlank : true,
			width : 200,
			name : "mName",
			fieldLabel : "商户名称",
			disabled : true,
			anchor : "90%"
		});

		this.dateField1197085338 = new Ext.form.DateField({
			id : "endTime.AccountsDetailMgr",
			allowBlank : true,
			name : "reqTimeMax",
			format : "Ymd",
			fieldLabel : "调用时间（止）",
			disabled : true,
			anchor : "90%"
		});

		this.textField1189567329 = new Ext.form.TextField({
			id : "insttuName.AccountsDetailMgr",
			maxLength : 25,
			allowBlank : true,
			name : "custName",
			width : 200,
			fieldLabel : "机构名称",
			disabled : true,
			anchor : "90%"
		});

		this.formPanel1692878715 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			width : 400,
			buttons : [{
				id : "exportExcel",
				text : "导出Excel",
				handler : function(button, event) {
					com.jsjn.jnf.fee.AccountsDetailMgr.exportExcel(button,
							event);
				}
			}, {
				id : "close",
				text : "关闭",
				handler : function(button, event) {
					com.jsjn.jnf.fee.AccountsDetailMgr.close(button, event);
				}
			}],
			collapsed : false,
			id : "form.AccountsDetailMgr",
			height : 450,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "对账详情",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1899068667, this.dateField1889015366],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : "0.5",
					autoWidth : false,
					border : false,
					items : [this.textField1189567329, this.dateField1197085338],
					layout : "form"
				}],
				collapseFirst : false,
				xtype : "fieldset",
				layout : "column",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, this.gridPanel391101344],
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
			id : "win.AccountsDetailMgr",
			title : "对账详情",
			height : "70%",
			items : [this.formPanel1692878715],
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
