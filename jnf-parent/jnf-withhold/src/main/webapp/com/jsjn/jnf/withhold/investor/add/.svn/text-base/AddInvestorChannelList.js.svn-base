// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold.investor.add');
com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList = function(config) {
	if (typeof(com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList']);
		com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList.WINDOW = this;
	}
	return com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList.WINDOW;
};
Ext.extend(com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList,
		Ext.Window, {
			initUIComponents : function() {
				// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
				this.store1163817589 = new Ext.data.Store({
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
					baseParams : {
						businessType : "1"
					},
					autoLoad : true,
					url : 'jnf/withhold.do?method=queryChannelByBusinessType'
				});

				this.comboBox1217004543 = new Ext.form.ComboBox({
					listeners : {
						select : {
							fn : function(combo, record, index) {
								return com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList
										.changeChannel(combo, record, index);
							}
						}
					},
					allowBlank : true,
					store : this.store1163817589,
					blankText : "请选择渠道",
					emptyText : "--请选择渠道--",
					fieldLabel : "<font color=red>*</font>渠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道",
					forceSelection : false,
					editable : false,
					mode : "remote",
					anchor : "94%",
					id : "channel.AddInvestorChannelList",
					hiddenName : "channel",
					displayField : "paramValue",
					name : "channel",
					valueField : "paramKey",
					triggerAction : "all",
					selectOnFocus : true
				});

				this.formPanel1015413501 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					autoHeight : true,
					id : "form2.AddInvestorChannelList",
					style : "margin-top:20px;",
					items : [this.comboBox1217004543],
					layout : "form",
					buttonAlign : "center",
					labelAlign : "right",
					border : false
				});

				this.textField1353063057 = new Ext.form.TextField({
					id : "bindAccNo.AddInvestorChannelList",
					allowBlank : true,
					maxLength : 64,
					emptyText : "请输入商户号",
					maxLengthText : "商户号小于64位！",
					fieldLabel : "<font color=red>*</font>商&nbsp;户&nbsp;&nbsp;号",
					anchor : "94%"
				});

				this.formPanel724693608 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					autoHeight : true,
					id : "form3.AddInvestorChannelList",
					style : "margin-top:20px;",
					items : [this.textField1353063057],
					layout : "form",
					buttonAlign : "center",
					labelAlign : "right",
					border : false
				});

				this.textField1225105287 = new Ext.form.TextField({
					id : "cardNo.AddInvestorChannelList",
					allowBlank : true,
					maxLength : 32,
					emptyText : "请输入提现卡号",
					maxLengthText : "提现卡号小于32位！",
					fieldLabel : "<font color=red>*</font>提现卡号",
					anchor : "94%"
				});

				this.formPanel1063329521 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					autoHeight : true,
					id : "form4.AddInvestorChannelList",
					style : "margin-top:20px;",
					items : [this.textField1225105287],
					layout : "form",
					buttonAlign : "center",
					labelAlign : "right",
					border : false
				});

				this.textField625270469 = new Ext.form.TextField({
					id : "key.AddInvestorChannelList",
					allowBlank : true,
					maxLength : 256,
					emptyText : "请输入密钥",
					maxLengthText : "密钥小于256位！",
					fieldLabel : "密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;钥",
					anchor : "94%"
				});

				this.formPanel1922385125 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					autoHeight : true,
					id : "form5.AddInvestorChannelList",
					style : "margin-top:20px;",
					items : [this.textField625270469],
					layout : "form",
					buttonAlign : "center",
					labelAlign : "right",
					border : false
				});

				this.textField2121500528 = new Ext.form.TextField({
					id : "paymentCardName.AddInvestorChannelList",
					maxLength : 16,
					allowBlank : true,
					emptyText : "请输入支付银行卡户名",
					maxLengthText : "支付银行卡户名小于16位！",
					fieldLabel : "<font color=red>*</font>支付银行卡户名",
					anchor : "94%"
				});

				this.formPanel1216799333 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					autoHeight : true,
					id : "form6.AddInvestorChannelList",
					style : "margin-top:20px;",
					items : [this.textField2121500528],
					hidden : true,
					layout : "form",
					buttonAlign : "center",
					labelAlign : "right",
					border : false
				});

				this.textField1835125520 = new Ext.form.TextField({
					id : "paymentCardNo.AddInvestorChannelList",
					allowBlank : true,
					maxLength : 20,
					emptyText : "请输入支付银行卡卡号",
					maxLengthText : "支付银行卡卡号小于20位！",
					fieldLabel : "<font color=red>*</font>支付银行卡卡号",
					anchor : "94%"
				});

				this.formPanel312142767 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					autoHeight : true,
					id : "form7.AddInvestorChannelList",
					style : "margin-top:20px;",
					items : [this.textField1835125520],
					hidden : true,
					layout : "form",
					buttonAlign : "center",
					labelAlign : "right",
					border : false
				});

				this.formPanel1809962384 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					style : "margin-top:50px;",
					layout : "form",
					buttonAlign : "center",
					buttons : [{
						text : "关闭",
						handler : function(button, event) {
							com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList
									.close(button, event);
						}
					}, {
						text : "保存",
						handler : function(button, event) {
							com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList
									.add(button, event);
						}
					}],
					labelAlign : "right",
					autoHeight : true,
					border : false
				});

				this.store1807315456 = new Ext.data.Store({});

				this.comboBox1213109913 = new Ext.form.ComboBox({
					listeners : {
						select : {
							fn : function(combo, record, index) {
								return com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList
										.changeBusinessType(combo, record,
												index);
							}
						}
					},
					store : this.store1807315456,
					allowBlank : true,
					blankText : "请选择业务类型",
					forceSelection : false,
					fieldLabel : "<font color=red>*</font>业务类型",
					editable : false,
					anchor : "94%",
					mode : "local",
					id : "businessType.AddInvestorChannelList",
					hiddenName : "businessType",
					displayField : "paramValue",
					name : "channel",
					valueField : "paramKey",
					value : "1",
					triggerAction : "all",
					selectOnFocus : true
				});

				this.formPanel100569336 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					autoHeight : true,
					id : "form8.AddInvestorChannelList",
					style : "margin-top:20px;",
					items : [this.comboBox1213109913],
					layout : "form",
					buttonAlign : "center",
					labelAlign : "right",
					border : false
				});

				this.store1201837955 = new Ext.data.Store({
					reader : new Ext.data.JsonReader({
						totalProperty : "total",
						root : "root"
					}, [{
						name : "insttuNm",
						mapping : "CNAME",
						type : "string"
					}, {
						name : "insttuId",
						mapping : "INSTTU_ID",
						type : "string"
					}]),
					baseParams : {
						limit : "5000",
						method : "getOrgList"
					},
					url : appConfig.baseUrl + '/TreeController.do'
				});

				this.comboBoxTable1371290437 = new com.jsjn.ext.extend.ComboBoxTable({
					listeners : {
						selectRow : {
							fn : function(combo, newValue, oldValue) {
								return com.jsjn.jnf.withhold.investor.add.AddInvestorChannelList
										.selectRow(combo, newValue, oldValue);
							}
						}
					},
					allowBlank : true,
					Gridstore : this.store1201837955,
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
					fieldLabel : "<font color=red>*</font>机构名称",
					anchor : "94%",
					id : "insttuNm.AddInvestorChannelList",
					height : 350,
					displayField : "insttuNm",
					name : "insttuNm",
					valueField : "insttuId",
					value : ""
				});

				this.formPanel740939780 = new Ext.form.FormPanel({
					layoutConfig : {},
					labelWidth : 100,
					autoHeight : true,
					id : "form1.AddInvestorChannelList",
					style : "margin-top:80px;",
					items : [this.comboBoxTable1371290437],
					layout : "form",
					columnWidth : "1",
					buttonAlign : "center",
					labelAlign : "right",
					border : false
				});

				Ext.apply(this, {
					layoutConfig : {},
					width : 500,
					closeAction : "hide",
					title : "新增关系",
					height : 500,
					frame : true,
					closable : false,
					items : [this.formPanel740939780, this.formPanel100569336,
							this.formPanel1015413501, this.formPanel724693608,
							this.formPanel1063329521, this.formPanel1922385125,
							this.formPanel1216799333, this.formPanel312142767,
							this.formPanel1809962384],
					xtype : "window",
					layout : "form",
					floating : true,
					buttonAlign : "center",
					border : false,
					modal : true,
					draggable : false
				});
				// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
			}
		});
// BEGING OF CODE  MAIN FOR JAVA METHOD
