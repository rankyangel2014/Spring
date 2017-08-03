// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold.sign.add');
com.jsjn.jnf.withhold.sign.add.QryFeeInfoList = function(config) {
	if (typeof(com.jsjn.jnf.withhold.sign.add.QryFeeInfoList.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.sign.add.QryFeeInfoList.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.sign.add.QryFeeInfoList']);
		com.jsjn.jnf.withhold.sign.add.QryFeeInfoList.WINDOW = this;
	}
	return com.jsjn.jnf.withhold.sign.add.QryFeeInfoList.WINDOW;
};
Ext.extend(com.jsjn.jnf.withhold.sign.add.QryFeeInfoList, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store788408129 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({}, [{
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
			url : appConfig.baseUrl
					+ '/jnf/bankCardInfo.do?method=queryBankList&channelId='
					+ appConfig.Param.channelId
		});

		this.gridPanel527979096 = new Ext.grid.GridPanel({
			layoutConfig : {},
			store : this.store788408129,
			autoScroll : false,
			columns : [{
				hidden : false,
				width : 60,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryFeeInfoList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "channelId",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryFeeInfoList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "渠道"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "bankName",
				header : "银行名称"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "right",
				dataIndex : "maxAmount",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryFeeInfoList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "	单笔额度(元)"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "right",
				dataIndex : "maxAmountDay",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryFeeInfoList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "	单日额度(元)"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "right",
				dataIndex : "fee",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.add.QryFeeInfoList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "费用(元)"
			}],
			autoWidth : false,
			autoHeight : false,
			id : "grid.QryFeeInfoList",
			height : 380,
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

		Ext.apply(this, {
			layoutConfig : {},
			title : "资费说明",
			height : 400,
			items : [this.gridPanel527979096],
			xtype : "window",
			width : 600,
			closeAction : "hide"
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
