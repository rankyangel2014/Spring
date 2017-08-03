// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold.sign.query');
com.jsjn.jnf.withhold.sign.query.WithHoldResign = function(config) {
	if (typeof(com.jsjn.jnf.withhold.sign.query.WithHoldResign.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.sign.query.WithHoldResign.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.sign.query.WithHoldResign']);
		com.jsjn.jnf.withhold.sign.query.WithHoldResign.WINDOW = this;
	}
	return com.jsjn.jnf.withhold.sign.query.WithHoldResign.WINDOW;
};
Ext.extend(com.jsjn.jnf.withhold.sign.query.WithHoldResign, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.panel1725851962 = new Ext.Panel({
			layoutConfig : {},
			id : "other.WithHoldResign",
			width : "100%",
			autoHeight : false,
			border : false
		});

		this.panel570823870 = new Ext.Panel({
			layoutConfig : {},
			id : "otherImg.WithHoldResign",
			border : false
		});

		this.panel894147071 = new Ext.Panel({
			layoutConfig : {},
			items : [this.panel570823870, this.panel1725851962],
			layout : "column",
			autoHeight : false,
			border : false
		});

		this.panel1190788473 = new Ext.Panel({
			layoutConfig : {},
			items : [{
				xtype : "label",
				html : "<div style='padding:0px 0px'><img src='com/jsjn/jnf/withhold/sign/add/form/demo_back.jpg'  alt='示例图片' style='width: 90%; height: 150px'></img></div>"
			}],
			columnWidth : "0.5",
			border : false
		});

		this.panel571054663 = new Ext.Panel({
			layoutConfig : {},
			id : "backImg.WithHoldResign",
			border : false
		});

		this.panel124860080 = new Ext.Panel({
			layoutConfig : {},
			items : [this.panel571054663, {
				layoutConfig : {},
				id : "back.WithHoldResign",
				layout : "table",
				columnWidth : "0.5",
				autoWidth : false,
				buttonAlign : "left",
				border : false
			}],
			layout : "form",
			columnWidth : "0.5",
			autoWidth : false,
			border : false
		});

		this.panel28462046 = new Ext.Panel({
			layoutConfig : {},
			items : [this.panel124860080, this.panel1190788473],
			layout : "column",
			autoHeight : false,
			border : false
		});

		this.panel601737907 = new Ext.Panel({
			layoutConfig : {},
			items : [{
				xtype : "label",
				html : "<div style='padding:0px 0px'><img src='com/jsjn/jnf/withhold/sign/add/form/demo_front.jpg'  alt='示例图片' style='width: 90%; height: 150px'></img></div>"
			}],
			columnWidth : "0.5",
			border : false
		});

		this.panel192760446 = new Ext.Panel({
			layoutConfig : {},
			id : "frontImg.WithHoldResign",
			border : false
		});

		this.panel778118890 = new Ext.Panel({
			layoutConfig : {},
			items : [this.panel192760446, {
				id : "front.WithHoldResign",
				layoutConfig : {},
				layout : "table",
				columnWidth : "0.5",
				autoWidth : false,
				buttonAlign : "left",
				autoHeight : false,
				border : false
			}],
			layout : "form",
			columnWidth : "0.5",
			autoWidth : false,
			border : false
		});

		this.panel1462405872 = new Ext.Panel({
			layoutConfig : {},
			items : [this.panel778118890, this.panel601737907],
			layout : "column",
			autoHeight : false,
			border : false
		});

		this.store1759047274 = new Ext.data.Store({});

		this.comboBox872201060 = new Ext.form.ComboBox({
			allowBlank : true,
			store : this.store1759047274,
			forceSelection : false,
			fieldLabel : "扣款启动日(天)",
			editable : false,
			anchor : "90%",
			mode : "local",
			id : "payStartDay.WithHoldResign",
			hiddenName : "payStartDay",
			displayField : "paramValue",
			name : "payStartDay",
			value : "",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.panel155078504 = new Ext.Panel({
			id : "batchTip.WithHoldResign",
			layoutConfig : {},
			hidden : true,
			layout : "form",
			columnWidth : "0.5",
			html : "<div style='padding:3px 10px;font-size:13px;color:red;font-weight:bold'>提示:系统会优先通过支付渠道进行扣款还款</div>",
			border : false
		});

		this.radio1042309467 = new Ext.form.Radio({
			id : "isNotBatchPay.WithHoldResign",
			autoShow : true,
			name : "isBatchPay",
			value : "N",
			boxLabel : "否",
			hideLabel : false
		});

		this.panel745668065 = new Ext.Panel({
			layoutConfig : {},
			region : "west",
			items : [this.radio1042309467],
			layout : "form",
			columnWidth : "0.25",
			border : false
		});

		this.radio391634359 = new Ext.form.Radio({
			id : "isBatchPay.WithHoldResign",
			name : "isBatchPay",
			value : "Y",
			fieldLabel : "是否参加批量代扣",
			checked : true,
			boxLabel : "是"
		});

		this.panel688275761 = new Ext.Panel({
			layoutConfig : {},
			items : [this.radio391634359],
			layout : "form",
			columnWidth : "0.25",
			border : false
		});

		this.textField198570454 = new Ext.form.TextField({
			id : "mobile.WithHoldResign",
			listeners : {
				blur : {
					fn : function(form) {
						return com.jsjn.jnf.withhold.sign.query.WithHoldResign
								.chkMobile(form);
					}
				}
			},
			allowBlank : false,
			maxLength : 21,
			width : 200,
			name : "mobile",
			fieldLabel : "预留手机",
			disabled : false,
			anchor : "90%"
		});

		this.textField1324345735 = new Ext.form.TextField({
			id : "recourse.WithHoldResign",
			name : "recourse"
		});

		this.textField480991470 = new Ext.form.TextField({
			id : "loanNo.WithHoldResign",
			name : "loanNo"
		});

		this.textField1367837685 = new Ext.form.TextField({
			id : "osPrcp.WithHoldResign",
			name : "osPrcp"
		});

		this.textField1647839518 = new Ext.form.TextField({
			id : "repayType.WithHoldResign",
			name : "repayType"
		});

		this.panel1954964507 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField1647839518, this.textField1367837685,
					this.textField480991470, this.textField1324345735],
			hidden : true,
			border : false
		});

		this.textField1060712696 = new Ext.form.TextField({
			id : "idNo.WithHoldResign",
			maxLength : 21,
			allowBlank : false,
			name : "idNo",
			width : 200,
			fieldLabel : "身份证号",
			disabled : true,
			anchor : "90%"
		});

		this.textField2112342131 = new Ext.form.TextField({
			id : "cardNo.WithHoldResign",
			listeners : {
				blur : {
					fn : function(form) {
						return com.jsjn.jnf.withhold.sign.query.WithHoldResign
								.queryCardBin(form);
					}
				}
			},
			allowBlank : false,
			maxLength : 21,
			width : 200,
			name : "cardNo",
			fieldLabel : "银行卡号",
			disabled : false,
			anchor : "90%"
		});

		this.textField1826858447 = new Ext.form.TextField({
			id : "bankName.WithHoldResign",
			maxLength : 21,
			allowBlank : false,
			name : "bankName",
			width : 200,
			fieldLabel : "所属银行",
			disabled : true,
			anchor : "90%"
		});

		this.textField1464298969 = new Ext.form.TextField({
			id : "custName.WithHoldResign",
			allowBlank : false,
			width : 200,
			name : "custName",
			fieldLabel : "姓名",
			disabled : true,
			anchor : "90%"
		});

		this.store741740534 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id"
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
				insttuId : appConfig.Session.loginUserInfo.id.insttuId
			},
			autoLoad : true,
			url : 'jnf/withhold.do?method=qryChannelByInvestorId'
		});

		this.comboBox285539029 = new Ext.form.ComboBox({
			allowBlank : true,
			store : this.store741740534,
			emptyText : "--请选择--",
			forceSelection : false,
			fieldLabel : "签约渠道",
			editable : false,
			anchor : "100%",
			mode : "local",
			id : "channel.WithHoldResign",
			hiddenName : "channel",
			displayField : "paramValue",
			name : "channel",
			value : "",
			valueField : "paramKey",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.textField1490569756 = new Ext.form.TextField({
			id : "contNo.WithHoldResign",
			allowBlank : false,
			name : "contNo",
			fieldLabel : "<font color='red'>*</font>合同号",
			disabled : true,
			anchor : "90%"
		});

		this.formPanel1502819831 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.WithHoldResign",
			frame : false,
			height : "100%",
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				title : "实名认证",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					items : [this.textField1490569756],
					layout : "form",
					columnWidth : "1",
					autoWidth : false,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [{
						layoutConfig : {},
						items : [this.comboBox285539029],
						layout : "form",
						columnWidth : "0.8",
						autoWidth : false,
						buttonAlign : "left",
						border : false
					}, {
						layoutConfig : {},
						items : [{
							id : "queryFeeInfo.WithHoldResign",
							listeners : {
								click : {
									fn : function(button, e) {
										return com.jsjn.jnf.withhold.sign.query.WithHoldResign
												.showFee(button, e);
									}
								}
							},
							text : "资费说明",
							xtype : "button",
							disabled : false
						}],
						layout : "form",
						columnWidth : "0.2",
						autoWidth : false,
						buttonAlign : "left",
						border : false
					}],
					layout : "column",
					columnWidth : "0.9",
					autoWidth : false,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField1464298969],
					layout : "form",
					columnWidth : "0.8",
					autoWidth : false,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField1060712696],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField2112342131],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					split : true,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField1826858447],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					buttonAlign : "left",
					split : true,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField198570454],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					buttonAlign : "left",
					split : true,
					border : false
				}, this.panel1954964507],
				xtype : "fieldset",
				layout : "form",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, {
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				title : "扣款信息",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					items : [this.panel688275761, this.panel745668065,
							this.panel155078504],
					layout : "column",
					columnWidth : "0.9",
					autoWidth : false,
					buttonAlign : "left",
					split : true,
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBox872201060],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					buttonAlign : "left",
					split : true,
					border : false
				}],
				xtype : "fieldset",
				layout : "form",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, {
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "上传附件信息",
				style : "margin:5px",
				items : [this.panel1462405872, this.panel28462046,
						this.panel894147071],
				collapseFirst : false,
				layout : "form",
				xtype : "fieldset",
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
			listeners : {
				hide : {
					fn : function(component) {
						return com.jsjn.jnf.withhold.sign.query.WithHoldResign
								.winClose(component);
					}
				},
				beforeshow : {
					fn : function(component) {
						return com.jsjn.jnf.withhold.sign.query.WithHoldResign
								.winInit(component);
					}
				}
			},
			autoScroll : true,
			width : 600,
			closeAction : "hide",
			buttons : [{
				text : "提交",
				handler : function(button, event) {
					com.jsjn.jnf.withhold.sign.query.WithHoldResign.submitForm(
							button, event);
				}
			}],
			id : "window.WithHoldResign",
			title : "重新签约",
			height : "90%",
			items : [this.formPanel1502819831],
			xtype : "window",
			buttonAlign : "center",
			modal : true
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
