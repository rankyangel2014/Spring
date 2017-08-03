// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.fee');
com.jsjn.jnf.fee.FeeAddConfig = function(config) {
	if (typeof(com.jsjn.jnf.fee.FeeAddConfig.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.fee.FeeAddConfig.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.fee.FeeAddConfig']);
		com.jsjn.jnf.fee.FeeAddConfig.WINDOW = this;
	}
	return com.jsjn.jnf.fee.FeeAddConfig.WINDOW;
};
Ext.extend(com.jsjn.jnf.fee.FeeAddConfig, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store119785323 = new Ext.data.Store({});

		this.comboBox927357940 = new Ext.form.ComboBox({
			allowBlank : true,
			store : this.store119785323,
			autoCreate : true,
			emptyText : "--请选择--",
			fieldLabel : "<font color='red'>*</font>渠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "channel.FeeAddConfig",
			displayField : "paramValue",
			valueField : "paramKey",
			value : "",
			triggerAction : "all"
		});

		this.store43032942 = new Ext.data.Store({});

		this.comboBox276221424 = new Ext.form.ComboBox({
			allowBlank : false,
			store : this.store43032942,
			emptyText : "--请选择--",
			fieldLabel : "<font color=red>*</font>业务类型",
			forceSelection : false,
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "businessType.FeeAddConfig",
			hiddenName : "businessType",
			displayField : "paramValue",
			name : "businessType",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.dateField1340167425 = new Ext.form.DateField({
			id : "endTime.FeeAddConfig",
			allowBlank : true,
			name : "endTime",
			format : "Ymd",
			fieldLabel : "<font color='red'>*</font>结束时间",
			anchor : "90%"
		});

		this.store307327366 = new Ext.data.Store({
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

		this.comboBoxTable1569462445 = new com.jsjn.ext.extend.ComboBoxTable({
			listeners : {
				selectRow : {
					fn : function(combo, newValue, oldValue) {
						return com.jsjn.jnf.fee.FeeAddConfig.InsttuSelectRow(
								combo, newValue, oldValue);
					}
				}
			},
			Gridstore : this.store307327366,
			allowBlank : true,
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
			fieldLabel : "<font color='red'>*</font>机构名称",
			anchor : "90%",
			id : "insttuName.FeeAddConfig",
			baseParams : "",
			height : 400,
			displayField : "insttuNm",
			name : "insttuNm",
			value : "",
			valueField : "insttuId",
			disabled : false
		});

		this.checkbox1440683849 = new Ext.form.Checkbox({
			id : "isGlobal.FeeAddConfig",
			listeners : {
				check : {
					fn : function(checkbox, checked) {
						return com.jsjn.jnf.fee.FeeAddConfig.checkGlobal(
								checkbox, checked);
					}
				}
			},
			checked : false,
			fieldLabel : "商户全局费率",
			anchor : "90%"
		});

		this.store1260765788 = new Ext.data.Store({
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

		this.comboBoxTable515907242 = new com.jsjn.ext.extend.ComboBoxTable({
			listeners : {
				selectRow : {
					fn : function(combo, newValue, oldValue) {
						return com.jsjn.jnf.fee.FeeAddConfig.BusinessSelectRow(
								combo, newValue, oldValue);
					}
				}
			},
			allowBlank : true,
			Gridstore : this.store1260765788,
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
			fieldLabel : "<font color='red'>*</font>商户名称",
			anchor : "90%",
			id : "mname.FeeAddConfig",
			height : 400,
			displayField : "insttuNm",
			valueField : "insttuId",
			value : "",
			disabled : false
		});

		this.dateField1268060693 = new Ext.form.DateField({
			id : "startTime.FeeAddConfig",
			allowBlank : true,
			width : "100%",
			name : "startTime",
			value : moment().toDate(),
			format : "Ymd",
			fieldLabel : "<font color='red'>*</font>开始时间",
			anchor : "90%"
		});

		this.formPanel140884334 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.FeeAddConfig",
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				autoHeight : false,
				collapsed : false,
				title : "计费设置",
				defaults : "",
				style : "margin:10px 0px;",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					style : "margin:10px 0px;",
					items : [this.comboBoxTable515907242,
							this.checkbox1440683849, {
								id : "price.FeeAddConfig",
								decimalPrecision : 2,
								allowBlank : true,
								xtype : "numberfield",
								allowNegative : false,
								allowDecimals : true,
								fieldLabel : "<font color='red'>*</font>费率（元/笔）",
								anchor : "90%"
							}, this.dateField1268060693],
					layout : "form",
					columnWidth : ".5",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					style : "margin:10px 0px;",
					items : [this.comboBoxTable1569462445,
							this.comboBox276221424, this.comboBox927357940,
							this.dateField1340167425],
					layout : "form",
					columnWidth : ".5",
					autoWidth : false,
					border : false
				}],
				xtype : "fieldset",
				layout : "column",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}],
			layout : "column",
			columnWidth : "1",
			buttonAlign : "center",
			labelAlign : "right",
			border : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			title : "计费设置新增",
			items : [this.formPanel140884334],
			width : 800,
			xtype : "window",
			closeAction : "hide",
			buttons : [{
				text : "保存",
				handler : function(button, event) {
					com.jsjn.jnf.fee.FeeAddConfig.btnSave(button, event);
				}
			}, {
				text : "重置",
				handler : function(button, event) {
					com.jsjn.jnf.fee.FeeAddConfig.btnReset(button, event);
				}
			}],
			buttonAlign : "center",
			autoHeight : true
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
