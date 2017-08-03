// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold.sign.query');
com.jsjn.jnf.withhold.sign.query.QryWithholdList = function(config) {
	if (typeof(com.jsjn.jnf.withhold.sign.query.QryWithholdList.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.sign.query.QryWithholdList.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.sign.query.QryWithholdList']);
		com.jsjn.jnf.withhold.sign.query.QryWithholdList.PANEL = this;
	}
	return com.jsjn.jnf.withhold.sign.query.QryWithholdList.PANEL;
};
Ext.extend(com.jsjn.jnf.withhold.sign.query.QryWithholdList, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store1068384417 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "Id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "lastRepayDt",
				mapping : "lastRepayDt",
				type : "string"
			}, {
				name : "mobile",
				mapping : "mobile",
				type : "string"
			}, {
				name : "cardNo",
				mapping : "cardNo",
				type : "string"
			}, {
				name : "aid",
				mapping : "aid",
				type : "string"
			}, {
				name : "loanNo",
				mapping : "loanNo",
				type : "string"
			}, {
				name : "custNo",
				mapping : "custNo",
				type : "string"
			}, {
				name : "signRecordId",
				mapping : "signRecordId",
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
				name : "custName",
				mapping : "custName",
				type : "string"
			}, {
				name : "custType",
				mapping : "idType",
				type : "string"
			}, {
				name : "idType",
				mapping : "idType",
				type : "string"
			}, {
				name : "idNo",
				mapping : "idNo",
				type : "string"
			}, {
				name : "contNo",
				mapping : "contNo",
				type : "string"
			}, {
				name : "repayType",
				mapping : "repayType",
				type : "string"
			}, {
				name : "osPrcp",
				mapping : "osPrcp",
				type : "string"
			}, {
				name : "state",
				mapping : "state",
				type : "string"
			}, {
				name : "channel",
				mapping : "channel",
				type : "string"
			}]),
			url : appConfig.baseUrl + '/jnf/withhold.do'
		});

		this.checkboxSelectionModel1540706286 = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true,
			width : 23,
			sortable : true
		});

		this.gridPanel1436652731 = new Ext.grid.GridPanel({
			layoutConfig : {},
			store : this.store1068384417,
			autoScroll : false,
			width : "100%",
			columns : [this.checkboxSelectionModel1540706286, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "center",
				dataIndex : "insttuName",
				header : "小贷公司名称"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "custName",
				header : "客户名称"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "idNo",
				header : "证件号码"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "contNo",
				header : "贷款合同号"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "repayType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.query.QryWithholdList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "还款方式"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "right",
				dataIndex : "osPrcp",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.query.QryWithholdList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "贷款本金"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "state",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.query.QryWithholdList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "签约状态"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "channel",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.query.QryWithholdList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "签约渠道"
			}, {
				hidden : false,
				width : 140,
				sortable : true,
				align : "center",
				dataIndex : "lastRepayDt",
				header : "最近一次应还款日"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.query.QryWithholdList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "操作"
			}, {
				hidden : true,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "insttuId",
				header : "机构码"
			}, {
				hidden : true,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "idType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.query.QryWithholdList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "证件类型"
			}, {
				hidden : true,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "custType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.withhold.sign.query.QryWithholdList
							.gridRender(value, cellmeta, record, rowIndex,
									columnIndex, store);
				},
				header : "客户类型"
			}, {
				hidden : true,
				sortable : true,
				dataIndex : "cardNo"
			}, {
				hidden : true,
				sortable : true,
				dataIndex : "mobile"
			}],
			autoWidth : false,
			buttons : [{
				id : "btnAdd.QryWithholdList",
				text : "新增",
				handler : function(button, event) {
					com.jsjn.jnf.withhold.sign.query.QryWithholdList.btnAdd(
							button, event);
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
			id : "grid.QryWithholdList",
			enableHdMenu : false,
			height : 300,
			columnWidth : "1",
			buttonAlign : "center",
			selModel : this.checkboxSelectionModel1540706286,
			viewConfig : {
				forceFit : true
			},
			loadMask : {
				msg : "正在载入数据...",
				title : "提示"
			}
		});

		this.store1804308537 = new Ext.data.Store({});

		this.comboBox132917499 = new Ext.form.ComboBox({
			store : this.store1804308537,
			emptyText : "--请选择--",
			forceSelection : false,
			fieldLabel : "签约状态",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "state.QryWithholdList",
			hiddenName : "state",
			displayField : "paramValue",
			name : "signState",
			value : "3",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField776038273 = new Ext.form.TextField({
			id : "custName.QryWithholdList",
			maxLength : 21,
			allowBlank : true,
			name : "custName",
			width : 200,
			fieldLabel : "客户名称",
			anchor : "90%"
		});

		this.textField672415566 = new Ext.form.TextField({
			id : "idNo.QryWithholdList",
			allowBlank : true,
			maxLength : 21,
			name : "idNo",
			width : 200,
			vtype : "IDCard",
			fieldLabel : "证件号码",
			anchor : "90%"
		});

		this.store984091761 = new Ext.data.Store({});

		this.comboBox1812932837 = new Ext.form.ComboBox({
			store : this.store984091761,
			emptyText : "--请选择--",
			fieldLabel : "证件类型",
			forceSelection : false,
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "idType.QryWithholdList",
			readOnly : true,
			hiddenName : "idType",
			displayField : "paramValue",
			name : "idType",
			valueField : "paramKey",
			value : "0",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.store1505762287 = new Ext.data.Store({
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

		this.comboBoxTable133991251 = new com.jsjn.ext.extend.ComboBoxTable({
			listeners : {
				selectRow : {
					fn : function(combo, newValue, oldValue) {
						return com.jsjn.jnf.withhold.sign.query.QryWithholdList
								.selectRow(combo, newValue, oldValue);
					}
				}
			},
			allowBlank : true,
			Gridstore : this.store1505762287,
			blankText : "请选择机构",
			listWidth : 352,
			columns : [{
				hidden : false,
				width : 200,
				sortable : true,
				dataIndex : "insttuNm",
				header : "机构名称"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				dataIndex : "insttuId",
				header : "机构码"
			}],
			emptyText : "--请选择--",
			fieldLabel : "机构名称",
			anchor : "90%",
			id : "insttuId.QryWithholdList",
			height : 350,
			displayField : "insttuNm",
			name : "insttuNm",
			valueField : "insttuId",
			value : ""
		});

		this.textField423852786 = new Ext.form.TextField({
			id : "contNo.QryWithholdList",
			allowBlank : true,
			maxLength : 40,
			name : "contNo",
			width : 200,
			fieldLabel : "贷款合同号",
			anchor : "90%"
		});

		this.store1690834045 = new Ext.data.Store({});

		this.comboBox900409282 = new Ext.form.ComboBox({
			store : this.store1690834045,
			emptyText : "--请选择--",
			fieldLabel : "客户类型",
			forceSelection : false,
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "custType.QryWithholdList",
			readOnly : true,
			hiddenName : "custType",
			displayField : "paramValue",
			name : "custType",
			valueField : "paramKey",
			value : "0",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.QryWithholdList",
			frame : false,
			height : 500,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "btnQuery.QryWithholdList",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.withhold.sign.query.QryWithholdList
								.btnQuery(button, event);
					}
				}, {
					id : "btnReset.QryWithholdList",
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.withhold.sign.query.QryWithholdList
								.btnReset(button, event);
					}
				}],
				collapsed : false,
				title : "查询条件",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					items : [this.comboBox900409282, this.textField423852786,
							this.comboBoxTable133991251],
					layout : "form",
					columnWidth : "0.33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBox1812932837, this.textField672415566],
					layout : "form",
					columnWidth : "0.33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField776038273, this.comboBox132917499],
					layout : "form",
					columnWidth : "0.33",
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
// BEGING OF CODE  MAIN FOR JAVA METHOD
