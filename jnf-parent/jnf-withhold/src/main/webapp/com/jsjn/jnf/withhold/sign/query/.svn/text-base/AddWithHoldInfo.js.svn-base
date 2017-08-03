// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold.sign.query');
com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo = function(config) {
	if (typeof(com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo.WINDOW) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo']);
		com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo.WINDOW = this;
	}
	return com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo.WINDOW;
};
Ext.extend(com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo, Ext.Window, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.panel1806882081 = new Ext.Panel({
			layoutConfig : {},
			items : [{
				id : "other.AddWithholdInfo",
				layoutConfig : {},
				layout : "table",
				columnWidth : "1",
				autoWidth : false,
				buttonAlign : "left",
				border : false
			}],
			layout : "column",
			autoHeight : false,
			border : false
		});

		this.panel1889015853 = new Ext.Panel({
			layoutConfig : {},
			items : [{
				xtype : "label",
				html : "<div style='padding:20px 0px'><img src='com/jsjn/jnf/withhold/sign/add/form/demo_back.jpg'  alt='示例图片' style='width: 90%; height: 150px'></img></div>"
			}],
			columnWidth : "0.5",
			border : false
		});

		this.panel1747028185 = new Ext.Panel({
			layoutConfig : {},
			items : [{
				layoutConfig : {},
				id : "back.AddWithholdInfo",
				layout : "table",
				columnWidth : "0.5",
				autoWidth : false,
				buttonAlign : "left",
				border : false
			}, this.panel1889015853],
			layout : "column",
			autoHeight : false,
			border : false
		});

		this.panel663038926 = new Ext.Panel({
			layoutConfig : {},
			items : [{
				xtype : "label",
				html : "<div style='padding:20px 0px'><img src='com/jsjn/jnf/withhold/sign/add/form/demo_front.jpg'  alt='示例图片' style='width: 90%; height: 150px'></img></div>"
			}],
			columnWidth : "0.5",
			border : false
		});

		this.panel682676444 = new Ext.Panel({
			layoutConfig : {},
			items : [{
				id : "front.AddWithholdInfo",
				layoutConfig : {},
				layout : "table",
				columnWidth : "0.5",
				autoWidth : false,
				buttonAlign : "left",
				autoHeight : false,
				border : false
			}, this.panel663038926],
			layout : "column",
			autoHeight : false,
			border : false
		});

		this.store1305801096 = new Ext.data.Store({});

		this.comboBox313933756 = new Ext.form.ComboBox({
			store : this.store1305801096,
			allowBlank : true,
			fieldLabel : "扣款启动日(天)",
			forceSelection : false,
			editable : false,
			mode : "local",
			anchor : "90%",
			id : "payStartDay.AddWithHoldInfo",
			hiddenName : "payStartDay",
			displayField : "paramValue",
			name : "payStartDay",
			valueField : "paramKey",
			value : "",
			triggerAction : "all",
			disabled : false,
			selectOnFocus : true
		});

		this.panel2120729915 = new Ext.Panel({
			layoutConfig : {},
			id : "batchTip.AddWithHoldInfo",
			hidden : true,
			layout : "form",
			columnWidth : "0.5",
			html : "<div style='padding:3px 10px;font-size:13px;color:red;font-weight:bold'>提示:系统会优先通过支付渠道进行扣款还款</div>",
			border : false
		});

		this.radio23491030 = new Ext.form.Radio({
			id : "isNotBatchPay.AddWithHoldInfo",
			autoShow : true,
			name : "isBatchPay",
			value : "N",
			boxLabel : "否",
			hideLabel : false
		});

		this.panel121574630 = new Ext.Panel({
			region : "west",
			layoutConfig : {},
			items : [this.radio23491030],
			layout : "form",
			columnWidth : "0.25",
			border : false
		});

		this.radio422078845 = new Ext.form.Radio({
			id : "isBatchPay.AddWithHoldInfo",
			name : "isBatchPay",
			value : "Y",
			boxLabel : "是",
			checked : true,
			fieldLabel : "是否参加批量代扣"
		});

		this.panel567144504 = new Ext.Panel({
			layoutConfig : {},
			items : [this.radio422078845],
			layout : "form",
			columnWidth : "0.25",
			border : false
		});

		this.textField2022215593 = new Ext.form.TextField({
			id : "mobile.AddWithHoldInfo",
			listeners : {
				blur : {
					fn : function(form) {
						return com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo
								.chkMobile(form);
					}
				}
			},
			maxLength : 21,
			allowBlank : false,
			name : "mobile",
			width : 200,
			fieldLabel : "预留手机",
			disabled : false,
			anchor : "90%"
		});

		this.textField400163482 = new Ext.form.TextField({
			id : "recourse.AddWithHoldInfo",
			name : "recourse"
		});

		this.textField826095838 = new Ext.form.TextField({
			id : "other.AddWithHoldInfo",
			name : "other"
		});

		this.textField1272877978 = new Ext.form.TextField({
			id : "back.AddWithHoldInfo",
			name : "back"
		});

		this.textField1453837477 = new Ext.form.TextField({
			id : "front.AddWithHoldInfo",
			name : "front"
		});

		this.textField694743222 = new Ext.form.TextField({
			id : "loanNo.AddWithHoldInfo",
			name : "loanNo"
		});

		this.textField1880781240 = new Ext.form.TextField({
			id : "osPrcp.AddWithHoldInfo",
			name : "osPrcp"
		});

		this.textField2022527000 = new Ext.form.TextField({
			id : "repayType.AddWithHoldInfo",
			name : "repayType"
		});

		this.panel946980335 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField2022527000, this.textField1880781240,
					this.textField694743222, this.textField1453837477,
					this.textField1272877978, this.textField826095838,
					this.textField400163482],
			hidden : true,
			border : false
		});

		this.textField129758347 = new Ext.form.TextField({
			id : "idNo.AddWithHoldInfo",
			allowBlank : false,
			maxLength : 21,
			width : 200,
			name : "idNo",
			fieldLabel : "身份证号",
			disabled : true,
			anchor : "90%"
		});

		this.textField544502337 = new Ext.form.TextField({
			id : "cardNo.AddWithHoldInfo",
			maxLength : 21,
			allowBlank : false,
			name : "cardNo",
			width : 200,
			fieldLabel : "银行卡号",
			disabled : false,
			anchor : "90%"
		});

		this.textField926392708 = new Ext.form.TextField({
			id : "bankName.AddWithHoldInfo",
			allowBlank : false,
			maxLength : 21,
			width : 200,
			name : "bankName",
			fieldLabel : "所属银行",
			disabled : true,
			anchor : "90%"
		});

		this.textField243093986 = new Ext.form.TextField({
			id : "custName.AddWithHoldInfo",
			allowBlank : false,
			name : "custName",
			width : 200,
			fieldLabel : "姓名",
			disabled : true,
			anchor : "90%"
		});

		this.store1175490533 = new Ext.data.Store({
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

		this.comboBox1033502865 = new Ext.form.ComboBox({
			listeners : {
				change : {
					fn : function(form, newValue, oldValue) {
						return com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo
								.changeButton(form, newValue, oldValue);
					}
				}
			},
			store : this.store1175490533,
			allowBlank : true,
			emptyText : "--请选择--",
			fieldLabel : "<font color='red'>*</font>签约渠道",
			forceSelection : false,
			editable : false,
			mode : "local",
			anchor : "100%",
			id : "channel.AddWithHoldInfo",
			hiddenName : "channel",
			displayField : "paramValue",
			name : "channel",
			valueField : "paramKey",
			value : "",
			triggerAction : "all",
			selectOnFocus : true
		});

		this.panel243878807 = new Ext.Panel({
			layoutConfig : {},
			items : [{
				listeners : {
					click : {
						fn : function(button, e) {
							return com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo
									.qryLoanNo(button, e);
						}
					}
				},
				text : "请选择...",
				xtype : "button"
			}],
			layout : "form",
			columnWidth : "0.2",
			autoWidth : false,
			border : false
		});

		this.textField919819694 = new Ext.form.TextField({
			id : "contNo.AddWithHoldInfo",
			allowBlank : false,
			name : "contNo",
			fieldLabel : "<font color='red'>*</font>合同号",
			disabled : true,
			anchor : "100%"
		});

		this.panel2059352336 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField919819694],
			layout : "form",
			columnWidth : "0.8",
			autoWidth : false,
			border : false
		});

		this.formPanel432158937 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			collapsed : false,
			id : "form.AddWithHoldInfo",
			height : "100%",
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "实名认证",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.panel2059352336, this.panel243878807],
					layout : "column",
					columnWidth : "1",
					autoWidth : false,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [{
						layoutConfig : {},
						items : [this.comboBox1033502865],
						layout : "form",
						columnWidth : "0.8",
						autoWidth : false,
						buttonAlign : "left",
						border : false
					}, {
						layoutConfig : {},
						items : [{
							id : "queryFeeInfo.AddWithHoldInfo",
							listeners : {
								click : {
									fn : function(button, e) {
										return com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo
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
					items : [this.textField243093986],
					layout : "form",
					columnWidth : "0.8",
					autoWidth : false,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField129758347],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField544502337],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					buttonAlign : "left",
					split : true,
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField926392708],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					split : true,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [this.textField2022215593],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					split : true,
					buttonAlign : "left",
					border : false
				}, this.panel946980335],
				collapseFirst : false,
				layout : "form",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, {
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				defaults : "",
				title : "扣款信息",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.panel567144504, this.panel121574630,
							this.panel2120729915],
					layout : "column",
					columnWidth : "0.9",
					autoWidth : false,
					split : true,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [this.comboBox313933756],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					split : true,
					buttonAlign : "left",
					border : false
				}],
				collapseFirst : false,
				layout : "form",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, {
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				title : "上传附件信息",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [this.panel682676444, this.panel1747028185,
						this.panel1806882081],
				xtype : "fieldset",
				layout : "form",
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
						return com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo
								.pageInit(component);
					}
				},
				beforeshow : {
					fn : function(component) {
						return com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo
								.btnDis(component);
					}
				}
			},
			autoScroll : true,
			width : 600,
			closeAction : "hide",
			buttons : [{
				text : "提交",
				handler : function(button, event) {
					com.jsjn.jnf.withhold.sign.query.AddWithHoldInfo
							.submitForm(button, event);
				}
			}],
			autoHeight : false,
			id : "window.AddWithHoldInfo",
			title : "新增代扣签约",
			height : "90%",
			items : [this.formPanel432158937],
			xtype : "window",
			buttonAlign : "center",
			modal : true
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
