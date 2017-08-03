// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.MemberInfoDetailMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.MemberInfoDetailMgr.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.MemberInfoDetailMgr.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.MemberInfoDetailMgr']);
		com.jsjn.jnf.member.MemberInfoDetailMgr.WINDOW = this;
	}
	return com.jsjn.jnf.member.MemberInfoDetailMgr.WINDOW;
};
Ext.extend(com.jsjn.jnf.member.MemberInfoDetailMgr, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store2032332923 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "aid",
				mapping : "aid",
				type : "string"
			}, {
				name : "bankCardNo",
				mapping : "bankCardNo",
				type : "string"
			}, {
				name : "mobile",
				mapping : "mobile",
				type : "string"
			}, {
				name : "mName",
				mapping : "mName",
				type : "string"
			}, {
				name : "bankName",
				mapping : "bankName",
				type : "string"
			}, {
				name : "state",
				mapping : "state",
				type : "string"
			}, {
				name : "modified",
				mapping : "modified",
				type : "string"
			}, {
				name : "signNo",
				mapping : "signNo",
				type : "string"
			}]),
			autoLoad : true,
			url : appConfig.baseUrl
					+ '/jnf/BindCardController.do?method=queryUserBindCardInfo'
		});

		this.gridPanel462916936 = new Ext.grid.GridPanel({
			layoutConfig : {},
			autoScroll : false,
			store : this.store2032332923,
			width : "100%",
			columns : [{
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "cplsh",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.MemberInfoDetailMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "序号"
			}, {
				hidden : false,
				width : 50,
				sortable : true,
				align : "center",
				dataIndex : "aid",
				header : "协议号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "bankCardNo",
				header : "签约卡号"
			}, {
				hidden : false,
				width : 120,
				sortable : true,
				align : "center",
				dataIndex : "mobile",
				header : "预留手机号"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				align : "center",
				dataIndex : "mName",
				header : "所属商户"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "bankName",
				header : "所属银行"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "state",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.MemberInfoDetailMgr.gridRender(
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
					return com.jsjn.jnf.member.MemberInfoDetailMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "签约时间"
			}, {
				hidden : false,
				width : 100,
				sortable : true,
				align : "center",
				dataIndex : "signNo",
				header : "银联协议号"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				align : "center",
				dataIndex : "operator",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return com.jsjn.jnf.member.MemberInfoDetailMgr.gridRender(
							value, cellmeta, record, rowIndex, columnIndex,
							store);
				},
				header : "操作"
			}],
			autoWidth : false,
			buttons : [{
				id : "qry.MemberInfoDetailMgr",
				text : "查询",
				handler : function(button, event) {
					com.jsjn.jnf.member.MemberInfoDetailMgr.Qry(button, event);
				}
			}],
			autoHeight : false,
			id : "grid.MemberInfoDetailMgr",
			title : "签约的银行卡",
			height : 280,
			columnWidth : "1",
			buttonAlign : "center",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
			viewConfig : {},
			loadMask : {
				msg : "正在载入数据...",
				title : "提示"
			}
		});

		this.textField1364971702 = new Ext.form.TextField({
			id : "idType.MemberInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "idType",
			columnWidth : "0.5",
			fieldLabel : "证件类型",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField736311967 = new Ext.form.TextField({
			id : "custType.MemberInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "custType",
			columnWidth : "0.5",
			fieldLabel : "客户类型",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField375692108 = new Ext.form.TextField({
			id : "custName.MemberInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "custName",
			columnWidth : "0.5",
			fieldLabel : "客户名称",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField1590153001 = new Ext.form.TextField({
			id : "custId.MemberInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "custId",
			columnWidth : "0.5",
			fieldLabel : "客户号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField837590486 = new Ext.form.TextField({
			id : "modified.MemberInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "modified",
			columnWidth : "0.5",
			fieldLabel : "最后更新时间",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField462110756 = new Ext.form.TextField({
			id : "created.MemberInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "created",
			columnWidth : "0.5",
			fieldLabel : "创建时间",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.textField713575616 = new Ext.form.TextField({
			id : "insttuId.MemberInfoDetailMgr",
			maxLength : 200,
			allowBlank : true,
			name : "insttuId",
			columnWidth : "0.5",
			fieldLabel : "投资人机构号",
			selectOnFocus : false,
			disabled : true,
			anchor : "90%"
		});

		this.textField1181073381 = new Ext.form.TextField({
			id : "idNo.MemberInfoDetailMgr",
			allowBlank : true,
			maxLength : 200,
			name : "idNo",
			columnWidth : "0.5",
			fieldLabel : "证件号码",
			disabled : true,
			selectOnFocus : false,
			anchor : "90%"
		});

		this.formPanel1692878715 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			width : 400,
			collapsed : false,
			id : "form.MemberInfoDetailMgr",
			height : 450,
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "会员信息详情",
				style : "margin:5px",
				items : [{
					columnWidth : "0.5",
					layoutConfig : {},
					autoWidth : false,
					border : false,
					items : [this.textField1590153001, this.textField375692108,
							this.textField736311967, this.textField1364971702],
					layout : "form"
				}, {
					layoutConfig : {},
					columnWidth : "0.5",
					autoWidth : false,
					border : false,
					items : [this.textField1181073381, this.textField713575616,
							this.textField462110756, this.textField837590486],
					layout : "form"
				}],
				collapseFirst : false,
				xtype : "fieldset",
				layout : "column",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, this.gridPanel462916936],
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
			id : "win.MemberInfoDetailMgr",
			title : "会员信息详情",
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
