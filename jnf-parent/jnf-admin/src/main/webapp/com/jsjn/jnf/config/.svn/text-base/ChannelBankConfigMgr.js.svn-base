// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.ChannelBankConfigMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.ChannelBankConfigMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.ChannelBankConfigMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.ChannelBankConfigMgr']);
		com.jsjn.jnf.config.ChannelBankConfigMgr.PANEL = this;
	}
	return com.jsjn.jnf.config.ChannelBankConfigMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.config.ChannelBankConfigMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store2043032162 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "channelId",
				mapping : "channelId",
				type : "string"
			}, {
				name : "bankName",
				mapping : "bankName",
				type : "string"
			}, {
				name : "jnBankCode",
				mapping : "jnBankCode",
				type : "string"
			}, {
				name : "channelBankCode",
				mapping : "channelBankCode",
				type : "string"
			}, {
				name : "maxAmount",
				mapping : "maxAmount",
				type : "string"
			}, {
				name : "maxAmountDay",
				mapping : "maxAmountDay",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/jnf/channelBankService.do?method=queryAllBankList'
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
					return com.jsjn.jnf.config.ChannelBankConfigMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "channelId",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.ChannelBankConfigMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "渠道"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "bankName",
				header : "银行名称"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "jnBankCode",
				header : "金农银行CODE"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "channelBankCode",
				header : "渠道银行CODE"
			}, {
				hidden : false,
				width : 130,
				sortable : true,
				align : "right",
				dataIndex : "maxAmount",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.ChannelBankConfigMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "单笔限额（万元）"
			}, {
				hidden : false,
				width : 130,
				sortable : true,
				align : "right",
				dataIndex : "maxAmountDay",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.ChannelBankConfigMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "单日限额（万元）"
			}],
			autoWidth : false,
			buttons : [{
				id : "btnAdd",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.config.ChannelBankConfigMgr.btnAdd(button,
							event);
				}
			}, {
				id : "btnUpdate",
				text : "修改",
				handler : function(button, event) {
					com.jsjn.jnf.config.ChannelBankConfigMgr.btnUpdate(button,
							event);
				}
			}, {
				id : "btnDelete",
				text : "删除",
				handler : function(button, event) {
					com.jsjn.jnf.config.ChannelBankConfigMgr.btnDelete(button,
							event);
				}
			}],
			autoHeight : false,
			bbar : new Ext.PagingToolbar({
				displayInfo : true,
				store : this.store2043032162,
				emptyMsg : "无数据显示",
				displayMsg : "显示{0} - {1} 共 {2}",
				xtype : "paging",
				pageSize : 10
			}),
			id : "grid.ChannelBankConfigMgr",
			height : 350,
			columnWidth : "1",
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

		this.textField1811330215 = new Ext.form.TextField({
			id : "bankName.ChannelBankConfigMgr",
			allowBlank : true,
			maxLength : 20,
			name : "bankName",
			width : 100,
			fieldLabel : "银行名称",
			anchor : "60%"
		});

		this.store1015114413 = new Ext.data.Store({});

		this.comboBox799792946 = new Ext.form.ComboBox({
			region : "",
			store : this.store1015114413,
			emptyText : "--请选择--",
			fieldLabel : "渠道名称",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "channelId.ChannelBankConfigMgr",
			hiddenName : "channelId",
			displayField : "paramValue",
			name : "channelId",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.ChannelBankConfigMgr",
			height : 500,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "渠道银行查询",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.comboBox799792946],
					width : 100,
					layout : "form",
					columnWidth : "0.3",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField1811330215],
					layout : "form",
					width : 100,
					columnWidth : "0.3",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [{
						id : "btnQuery",
						listeners : {
							click : {
								fn : function(button, e) {
									return com.jsjn.jnf.config.ChannelBankConfigMgr
											.btnQuery(button, e);
								}
							}
						},
						text : "查询",
						xtype : "button"
					}],
					width : 100,
					layout : "form",
					columnWidth : "0.3",
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
			layout : "form",
			columnWidth : "1",
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
