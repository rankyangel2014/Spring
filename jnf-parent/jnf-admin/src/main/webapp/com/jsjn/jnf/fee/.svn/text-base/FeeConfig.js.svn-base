// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.fee');
com.jsjn.jnf.fee.FeeConfig = function(config) {
	if (typeof(com.jsjn.jnf.fee.FeeConfig.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.fee.FeeConfig.superclass.constructor.call(this);
		appframe.loadScripts(appframe.importJses['com.jsjn.jnf.fee.FeeConfig']);
		com.jsjn.jnf.fee.FeeConfig.PANEL = this;
	}
	return com.jsjn.jnf.fee.FeeConfig.PANEL;
};
Ext.extend(com.jsjn.jnf.fee.FeeConfig, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1006691610 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
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
				name : "insttuId",
				mapping : "insttuId",
				type : "string"
			}, {
				name : "insttuName",
				mapping : "insttuName",
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
				name : "channel",
				mapping : "channel",
				type : "string"
			}, {
				name : "feeType",
				mapping : "feeType",
				type : "string"
			}, {
				name : "fee",
				mapping : "fee",
				type : "float"
			}]),
			baseParams : {
				method : "qryFeeConfig"
			},
			url : appConfig.baseUrl + '/jnf/feeConfigService.do'
		});

		this.gridPanel252530244 = new Ext.grid.GridPanel({
			layoutConfig : {},
			id : "grid.FeeConfig",
			height : 330,
			store : this.store1006691610,
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "xh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeConfig.gridRender(value,
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
				header : "机构名称"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "feeType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeConfig.gridRender(value,
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
					return com.jsjn.jnf.fee.FeeConfig.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "渠道"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "startTime",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeConfig.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
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
					return com.jsjn.jnf.fee.FeeConfig.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "结束时间"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "right",
				dataIndex : "fee",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.fee.FeeConfig.gridRender(value,
							cellmeta, record, rowIndex, columnIndex, store);
				},
				header : "费率（元/笔）"
			}],
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false
			}),
			buttonAlign : "center",
			buttons : [{
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.fee.FeeConfig.addConfig(button, event);
				}
			}],
			autoHeight : false,
			viewConfig : {}
		});

		this.store2029602991 = new Ext.data.Store({});

		this.comboBox263620863 = new Ext.form.ComboBox({
			store : this.store2029602991,
			allowBlank : true,
			autoCreate : true,
			emptyText : "--请选择--",
			fieldLabel : "渠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "channel.FeeConfig",
			displayField : "paramValue",
			value : "",
			valueField : "paramKey",
			triggerAction : "all"
		});

		this.store1972051220 = new Ext.data.Store({});

		this.comboBox857280415 = new Ext.form.ComboBox({
			allowBlank : true,
			store : this.store1972051220,
			emptyText : "--请选择--",
			fieldLabel : "业务类型",
			forceSelection : false,
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "businessType.FeeConfig",
			hiddenName : "businessType",
			displayField : "paramValue",
			name : "businessType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.store256630616 = new Ext.data.Store({
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

		this.comboBoxTable566331957 = new com.jsjn.ext.extend.ComboBoxTable({
			listeners : {
				selectRow : {
					fn : function(combo, newValue, oldValue) {
						return com.jsjn.jnf.fee.FeeConfig.InsttuSelectRow(
								combo, newValue, oldValue);
					}
				}
			},
			allowBlank : true,
			Gridstore : this.store256630616,
			blankText : "请选择机构",
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
			id : "insttuName.FeeConfig",
			height : 400,
			baseParams : "",
			displayField : "insttuNm",
			name : "insttuNm",
			valueField : "insttuId",
			value : "",
			disabled : false
		});

		this.store640495386 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "insttuId",
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

		this.comboBoxTable946232844 = new com.jsjn.ext.extend.ComboBoxTable({
			listeners : {
				selectRow : {
					fn : function(combo, newValue, oldValue) {
						return com.jsjn.jnf.fee.FeeConfig.BusinessSelectRow(
								combo, newValue, oldValue);
					}
				}
			},
			Gridstore : this.store640495386,
			allowBlank : true,
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
			id : "mname.FeeConfig",
			height : 400,
			displayField : "insttuNm",
			value : "",
			valueField : "insttuId",
			disabled : false
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.FeeConfig",
			frame : false,
			style : "padding-left:30px ;",
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.fee.FeeConfig.btnQuery(button, event);
					}
				}, {
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.fee.FeeConfig.btnReset(button, event);
					}
				}],
				autoHeight : false,
				collapsed : false,
				defaults : "",
				title : "计费设置查询",
				items : [{
					layoutConfig : {},
					items : [this.comboBoxTable946232844],
					layout : "form",
					columnWidth : ".25",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBoxTable566331957],
					layout : "form",
					columnWidth : ".25",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBox857280415],
					layout : "form",
					columnWidth : ".25",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBox263620863],
					layout : "form",
					columnWidth : ".25",
					autoWidth : false,
					border : false
				}],
				collapseFirst : false,
				layout : "column",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, this.gridPanel252530244],
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
			layout : "fit",
			border : false
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
