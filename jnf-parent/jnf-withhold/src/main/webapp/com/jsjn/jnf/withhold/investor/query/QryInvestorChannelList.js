// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold.investor.query');
com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList = function(config) {
	if (typeof(com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList']);
		com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList.PANEL = this;
	}
	return com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList.PANEL;
};
Ext.extend(com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList,
		Ext.Panel, {
			initUIComponents : function() {
				// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
				this.store1068384417 = new Ext.data.Store({
					reader : new Ext.data.JsonReader({
						totalProperty : "total",
						root : "root"
					}, [{
						name : "businessType",
						mapping : "businessType",
						type : "string"
					}, {
						name : "transCardNo",
						mapping : "transCardNo",
						type : "string"
					}, {
						name : "transCardName",
						mapping : "transCardName",
						type : "string"
					}, {
						name : "id",
						mapping : "id",
						type : "string"
					}, {
						name : "recId",
						mapping : "recId",
						type : "string"
					}, {
						name : "cardNo",
						mapping : "cardNo",
						type : "string"
					}, {
						name : "custId",
						mapping : "custId",
						type : "string"
					}, {
						name : "custName",
						mapping : "custName",
						type : "string"
					}, {
						name : "state",
						mapping : "state",
						type : "string"
					}, {
						name : "channelId",
						mapping : "channelId",
						type : "string"
					}, {
						name : "created",
						mapping : "created",
						type : "string"
					}, {
						name : "key",
						mapping : "key",
						type : "string"
					}, {
						name : "bindAccNo",
						mapping : "bindAccNo",
						type : "string"
					}, {
						name : "channelName",
						mapping : "channelName",
						type : "string"
					}]),
					baseParams : {
						limit : "10",
						method : "getWithholdList"
					},
					url : appConfig.baseUrl + '/WithholdController.do'
				});

				this.gridPanel1436652731 = new Ext.grid.GridPanel({
					layoutConfig : {},
					store : this.store1068384417,
					autoScroll : false,
					width : "100%",
					columns : [{
						hideable : false,
						hidden : true,
						resizable : false,
						dataIndex : "recId"
					}, {
						hidden : true,
						dataIndex : "id"
					}, {
						hidden : false,
						width : 50,
						sortable : true,
						align : "center",
						dataIndex : "xh",
						renderer : function(value, cellmeta, record, rowIndex,
								columnIndex, store) {
							return com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
									.rowRenderer(value, cellmeta, record,
											rowIndex, columnIndex, store);
						},
						header : "序号"
					}, {
						hidden : false,
						width : 100,
						sortable : true,
						align : "center",
						dataIndex : "custId",
						header : "机构码"
					}, {
						hidden : false,
						width : 200,
						sortable : true,
						align : "center",
						dataIndex : "custName",
						header : "机构名称"
					}, {
						hidden : false,
						width : 100,
						sortable : true,
						align : "center",
						dataIndex : "bindAccNo",
						header : "商户号"
					}, {
						hidden : false,
						width : 120,
						sortable : true,
						align : "center",
						dataIndex : "key",
						header : "密钥"
					}, {
						hidden : false,
						width : 160,
						sortable : true,
						align : "center",
						dataIndex : "cardNo",
						header : "提现卡号"
					}, {
						hidden : false,
						width : 50,
						sortable : true,
						align : "center",
						dataIndex : "state",
						renderer : function(value, cellmeta, record, rowIndex,
								columnIndex, store) {
							return com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
									.rowRenderer(value, cellmeta, record,
											rowIndex, columnIndex, store);
						},
						header : "状态"
					}, {
						hidden : false,
						width : 80,
						sortable : true,
						align : "center",
						dataIndex : "businessType",
						renderer : function(value, cellmeta, record, rowIndex,
								columnIndex, store) {
							return com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
									.rowRenderer(value, cellmeta, record,
											rowIndex, columnIndex, store);
						},
						header : "业务类型"
					}, {
						hidden : false,
						width : 100,
						sortable : true,
						align : "center",
						dataIndex : "channelName",
						header : "渠道"
					}, {
						hidden : false,
						width : 150,
						sortable : true,
						align : "center",
						dataIndex : "created",
						renderer : function(value, cellmeta, record, rowIndex,
								columnIndex, store) {
							return com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
									.rowRenderer(value, cellmeta, record,
											rowIndex, columnIndex, store);
						},
						header : "创建时间"
					}, {
						hidden : false,
						width : 120,
						sortable : true,
						align : "center",
						dataIndex : "transCardName",
						header : "支付卡户名"
					}, {
						hidden : false,
						width : 160,
						sortable : true,
						align : "center",
						dataIndex : "transCardNo",
						header : "支付卡卡号"
					}, {
						hidden : false,
						width : 50,
						sortable : true,
						align : "center",
						dataIndex : "operator",
						renderer : function(value, cellmeta, record, rowIndex,
								columnIndex, store) {
							return com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
									.rowRenderer(value, cellmeta, record,
											rowIndex, columnIndex, store);
						},
						header : "操作"
					}, {
						hideable : false,
						hidden : true,
						sortable : true,
						dataIndex : "channelId"
					}],
					autoExpandMax : 400,
					autoWidth : false,
					buttons : [{
						id : "btnAdd.QryWithholdList",
						text : "新增",
						handler : function(button, event) {
							com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
									.add(button, event);
						}
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
					id : "grid.QryInvestorChannelList",
					enableHdMenu : false,
					height : 330,
					autoExpandMin : 300,
					enableColumnHide : false,
					columnWidth : "1",
					buttonAlign : "center",
					selModel : new Ext.grid.RowSelectionModel({
						singleSelect : false
					}),
					autoExpandColumn : "4",
					viewConfig : {},
					loadMask : {
						msg : "正在载入数据...",
						title : "提示"
					}
				});

				this.textField1174349131 = new Ext.form.TextField({
					id : "cardNo.QryInvestorChannelList",
					allowBlank : true,
					emptyText : "请输入提现卡号",
					fieldLabel : "提现卡号",
					anchor : "80%"
				});

				this.store936320873 = new Ext.data.Store({});

				this.comboBox1015979219 = new Ext.form.ComboBox({
					listeners : {
						select : {
							fn : function(combo, record, index) {
								return com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
										.changeBusinessType(combo, record,
												index);
							}
						}
					},
					store : this.store936320873,
					allowBlank : true,
					blankText : "请选择业务类型",
					forceSelection : false,
					fieldLabel : "业务类型",
					editable : false,
					anchor : "80%",
					mode : "local",
					id : "businessType.QryInvestorChannelList",
					hiddenName : "businessType",
					displayField : "paramValue",
					name : "businessType",
					valueField : "paramKey",
					value : "",
					triggerAction : "all",
					selectOnFocus : true
				});

				this.store1470690516 = new Ext.data.Store({});

				this.comboBox1274603445 = new Ext.form.ComboBox({
					store : this.store1470690516,
					emptyText : "--请选择--",
					forceSelection : false,
					fieldLabel : "状态",
					editable : false,
					anchor : "80%",
					mode : "local",
					id : "status.QryInvestorChannelList",
					hiddenName : "status",
					displayField : "paramValue",
					name : "status",
					valueField : "paramKey",
					triggerAction : "all",
					selectOnFocus : true
				});

				this.store622488584 = new Ext.data.Store({
					reader : new Ext.data.JsonReader({
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

				this.comboBoxTable76308302 = new com.jsjn.ext.extend.ComboBoxTable({
					listeners : {
						selectRow : {
							fn : function(combo, newValue, oldValue) {
								return com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
										.selectRow(combo, newValue, oldValue);
							}
						}
					},
					allowBlank : true,
					Gridstore : this.store622488584,
					blankText : "请选择机构",
					listWidth : 365,
					columns : [{
						hidden : false,
						width : 205,
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
					anchor : "80%",
					id : "insttuNm.QryInvestorChannelList",
					height : 400,
					displayField : "insttuNm",
					name : "insttuNm",
					valueField : "insttuId",
					value : ""
				});

				this.store1997199624 = new Ext.data.Store({
					reader : new Ext.data.JsonReader({
						id : "channelId"
					}, [{
						name : "paramKey",
						mapping : "channelId",
						type : "string"
					}, {
						name : "paramValue",
						mapping : "channelName",
						type : "string"
					}]),
					autoLoad : true,
					url : 'jnf/withhold.do?method=queryChannelByBusinessType'
				});

				this.comboBox435365921 = new Ext.form.ComboBox({
					allowBlank : true,
					store : this.store1997199624,
					fieldLabel : "渠道",
					forceSelection : false,
					editable : false,
					mode : "remote",
					anchor : "80%",
					id : "channel.QryInvestorChannelList",
					hiddenName : "channel",
					readOnly : true,
					displayField : "paramValue",
					name : "channel",
					valueField : "paramKey",
					triggerAction : "all",
					selectOnFocus : true,
					disabled : true
				});

				this.formPanel239968220 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					autoScroll : true,
					collapsible : false,
					collapsed : false,
					id : "form.QryInvestorChannelList",
					height : 500,
					frame : false,
					items : [{
						layoutConfig : {},
						collapsible : false,
						buttons : [{
							id : "btnQuery.QryWithholdList",
							text : "查询",
							handler : function(button, event) {
								com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
										.query(button, event);
							}
						}, {
							id : "btnRest.QryWithholdList",
							text : "重置",
							handler : function(button, event) {
								com.jsjn.jnf.withhold.investor.query.QryInvestorChannelList
										.rest(button, event);
							}
						}],
						collapsed : false,
						title : "投资人与签约渠道",
						defaults : "",
						collapseFirst : false,
						items : [{
							layoutConfig : {},
							style : "margin-top:30px;",
							items : [this.comboBoxTable76308302],
							layout : "form",
							columnWidth : ".3",
							autoWidth : false,
							border : false
						}, {
							layoutConfig : {},
							style : "margin-top:30px;",
							items : [this.comboBox1274603445],
							layout : "form",
							columnWidth : ".3",
							autoWidth : false,
							border : false
						}, {
							layoutConfig : {},
							style : "margin-top:30px;",
							items : [this.textField1174349131],
							layout : "form",
							columnWidth : ".3",
							autoWidth : false,
							border : false
						}, {
							layoutConfig : {},
							style : "margin-top:30px;",
							items : [this.comboBox1015979219],
							layout : "form",
							columnWidth : ".3",
							autoWidth : false,
							border : false
						}, {
							layoutConfig : {},
							style : "margin-top:30px;",
							items : [this.comboBox435365921],
							layout : "form",
							columnWidth : ".3",
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
// BEGING OF CODE MAIN FOR JAVA METHOD
