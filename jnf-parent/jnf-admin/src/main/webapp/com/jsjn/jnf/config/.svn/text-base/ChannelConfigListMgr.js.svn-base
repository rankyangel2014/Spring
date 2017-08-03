// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.config');
com.jsjn.jnf.config.ChannelConfigListMgr = function(config) {
	if (typeof(com.jsjn.jnf.config.ChannelConfigListMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.config.ChannelConfigListMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.config.ChannelConfigListMgr']);
		com.jsjn.jnf.config.ChannelConfigListMgr.PANEL = this;
	}
	return com.jsjn.jnf.config.ChannelConfigListMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.config.ChannelConfigListMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store677609520 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "channelId",
				mapping : "channelId",
				type : "string"
			}, {
				name : "channelName",
				mapping : "channelName",
				type : "string"
			}, {
				name : "fee",
				mapping : "fee",
				type : "string"
			}, {
				name : "channelType",
				mapping : "channelType",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/jnf/channelService.do?method=queryChannel'
		});

		this.gridPanel1284188325 = new Ext.grid.GridPanel({
			layoutConfig : {},
			autoScroll : false,
			store : this.store677609520,
			width : "100%",
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.ChannelConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "channelId",
				header : "渠道编号"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "center",
				dataIndex : "channelName",
				header : "渠道名称"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "right",
				dataIndex : "fee",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.ChannelConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "第三方渠道收费（笔）"
			}, {
				hidden : false,
				width : 300,
				sortable : true,
				align : "center",
				dataIndex : "channelType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.config.ChannelConfigListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "渠道支持的业务类型"
			}],
			autoWidth : false,
			buttons : [{
				id : "bttAdd",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.config.ChannelConfigListMgr.btnAdd(button,
							event);
				}
			}, {
				id : "btnUpdate",
				text : "修改",
				handler : function(button, event) {
					com.jsjn.jnf.config.ChannelConfigListMgr.btnUpdate(button,
							event);
				}
			}, {
				id : "btnDelete",
				text : "删除",
				handler : function(button, event) {
					com.jsjn.jnf.config.ChannelConfigListMgr.btnDelete(button,
							event);
				}
			}],
			autoHeight : false,
			id : "grid.ChannelConfigListMgr",
			height : 300,
			columnWidth : "1",
			buttonAlign : "center",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false
			}),
			viewConfig : {},
			loadMask : {
				msg : "正在载入数据...",
				title : "提示"
			}
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.ChannelConfigListMgr",
			height : 500,
			frame : false,
			items : [this.gridPanel1284188325],
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
