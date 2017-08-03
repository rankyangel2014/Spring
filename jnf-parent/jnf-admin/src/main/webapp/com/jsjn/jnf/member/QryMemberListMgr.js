// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.QryMemberListMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.QryMemberListMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.QryMemberListMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.QryMemberListMgr']);
		com.jsjn.jnf.member.QryMemberListMgr.PANEL = this;
	}
	return com.jsjn.jnf.member.QryMemberListMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.member.QryMemberListMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store2043032162 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "custId",
				mapping : "custId",
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
				mapping : "idType",
				type : "string"
			}, {
				name : "idNo",
				mapping : "idNo",
				type : "string"
			}, {
				name : "mName",
				mapping : "mName",
				type : "string"
			}, {
				name : "state",
				mapping : "state",
				type : "string"
			}, {
				name : "modified",
				mapping : "modified",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/jnf/MemberController.do?method=queryMembers'
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
					return com.jsjn.jnf.member.QryMemberListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "custId",
				header : "客户号"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "custName",
				header : "名称"
			}, {
				hidden : false,
				width : 80,
				sortable : true,
				align : "center",
				dataIndex : "custType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryMemberListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "客户类型"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "idType",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryMemberListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "证件类型"
			}, {
				hidden : false,
				width : 140,
				sortable : true,
				align : "center",
				dataIndex : "idNo",
				header : "证件号码"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "mName",
				header : "商户名称"
			}, {
				hidden : false,
				width : 70,
				sortable : true,
				align : "left",
				dataIndex : "state",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryMemberListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "签约状态"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "modified",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryMemberListMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "注册时间"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.QryMemberListMgr.gridRender(
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
			id : "grid.QryMemberListMgr",
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

		this.textField881382982 = new Ext.form.TextField({
			id : "idNo.QryMemberListMgr",
			allowBlank : true,
			maxLength : 18,
			name : "idNo",
			width : 200,
			fieldLabel : "证件号码",
			anchor : "90%"
		});

		this.store770235737 = new Ext.data.Store({});

		this.comboBox962472270 = new Ext.form.ComboBox({
			store : this.store770235737,
			emptyText : "--请选择--",
			fieldLabel : "客户类型",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "custType.QryMemberListMgr",
			hiddenName : "custType",
			displayField : "paramValue",
			name : "custType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.dateField1994331807 = new Ext.form.DateField({
			id : "modifiedMax.QryMemberListMgr",
			allowBlank : true,
			name : "modifiedMax",
			format : "Ymd",
			fieldLabel : "认证时间（止）",
			anchor : "90%"
		});

		this.store1859404661 = new Ext.data.Store({});

		this.comboBox1960193549 = new Ext.form.ComboBox({
			store : this.store1859404661,
			emptyText : "--请选择--",
			fieldLabel : "证件类型",
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "idType.QryMemberListMgr",
			hiddenName : "idType",
			displayField : "paramValue",
			name : "idType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField1267444716 = new Ext.form.TextField({
			id : "custName.QryMemberListMgr",
			allowBlank : true,
			maxLength : 128,
			width : 200,
			name : "custName",
			fieldLabel : "客户名称",
			anchor : "90%"
		});

		this.dateField1669034659 = new Ext.form.DateField({
			id : "modifiedMin.QryMemberListMgr",
			allowBlank : true,
			name : "modifiedMin",
			format : "Ymd",
			fieldLabel : "认证时间（起）",
			anchor : "90%"
		});

		this.textField144541117 = new Ext.form.TextField({
			id : "mId.QryMemberListMgr",
			allowBlank : true,
			maxLength : 4,
			width : 200,
			name : "mId",
			fieldLabel : "商户编号",
			anchor : "90%"
		});

		this.textField1410492613 = new Ext.form.TextField({
			id : "custId.QryMemberListMgr",
			allowBlank : true,
			maxLength : 13,
			name : "custId",
			width : 200,
			fieldLabel : "客户号",
			anchor : "90%"
		});

		this.formPanel239968220 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.QryMemberListMgr",
			height : 500,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				buttons : [{
					id : "btnQuery.QryMemberListMgr",
					text : "查询",
					handler : function(button, event) {
						com.jsjn.jnf.member.QryMemberListMgr.btnQuery(button,
								event);
					}
				}, {
					id : "btnReset.QryMemberListMgr",
					text : "重置",
					handler : function(button, event) {
						com.jsjn.jnf.member.QryMemberListMgr.btnReset(button,
								event);
					}
				}],
				collapsed : false,
				defaults : "",
				title : "会员查询",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.textField1410492613, this.textField144541117,
							this.dateField1669034659],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField1267444716, this.comboBox1960193549,
							this.dateField1994331807],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBox962472270, this.textField881382982],
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
