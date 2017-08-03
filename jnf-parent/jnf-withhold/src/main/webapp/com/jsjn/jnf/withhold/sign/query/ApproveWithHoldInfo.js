// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold.sign.query');
com.jsjn.jnf.withhold.sign.query.ApproveWithHoldInfo = function(config) {
	if (typeof(com.jsjn.jnf.withhold.sign.query.ApproveWithHoldInfo.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.sign.query.ApproveWithHoldInfo.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.sign.query.ApproveWithHoldInfo']);
		com.jsjn.jnf.withhold.sign.query.ApproveWithHoldInfo.PANEL = this;
	}
	return com.jsjn.jnf.withhold.sign.query.ApproveWithHoldInfo.PANEL;
};
Ext.extend(com.jsjn.jnf.withhold.sign.query.ApproveWithHoldInfo, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textArea1057732788 = new Ext.form.TextArea({
			id : "idea.ApproveWithHoldInfo",
			fieldLabel : "审批意见",
			anchor : "90%"
		});

		this.radio1943040008 = new Ext.form.Radio({
			id : "disagree.ApproveWithHoldInfo",
			autoShow : true,
			name : "operation",
			value : "N",
			boxLabel : "拒绝",
			hideLabel : false
		});

		this.panel1647937601 = new Ext.Panel({
			region : "west",
			layoutConfig : {},
			items : [this.radio1943040008],
			layout : "form",
			columnWidth : "0.5",
			border : false
		});

		this.radio1597434695 = new Ext.form.Radio({
			id : "agree.ApproveWithHoldInfo",
			name : "operation",
			value : "Y",
			boxLabel : "同意",
			checked : true,
			fieldLabel : "审批意见"
		});

		this.panel2047590908 = new Ext.Panel({
			layoutConfig : {},
			items : [this.radio1597434695],
			layout : "form",
			columnWidth : "0.5",
			border : false
		});

		this.textField1813244301 = new Ext.form.TextField({
			id : "payStartDay.ApproveWithHoldInfo",
			allowBlank : false,
			name : "payStartDay",
			fieldLabel : "扣款启动日",
			disabled : true,
			anchor : "100%"
		});

		this.panel1572161271 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField1813244301],
			layout : "form",
			columnWidth : "0.33",
			border : false
		});

		this.textField703031571 = new Ext.form.TextField({
			id : "isBatchPay.ApproveWithHoldInfo",
			allowBlank : false,
			name : "isBatchPay",
			fieldLabel : "是否参加批量代扣",
			disabled : true,
			anchor : "100%"
		});

		this.panel632447186 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField703031571],
			layout : "form",
			columnWidth : "0.33",
			border : false
		});

		this.textField1136638964 = new Ext.form.TextField({
			id : "bankName.ApproveWithHoldInfo",
			allowBlank : false,
			maxLength : 21,
			width : 200,
			name : "bankName",
			fieldLabel : "所属银行",
			disabled : true,
			anchor : "100%"
		});

		this.panel1431741370 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField1136638964],
			layout : "form",
			columnWidth : "0.33",
			border : false
		});

		this.panel40692670 = new Ext.Panel({
			layoutConfig : {},
			items : [this.panel1431741370, this.panel632447186,
					this.panel1572161271],
			layout : "column",
			border : false
		});

		this.textField2075860121 = new Ext.form.TextField({
			id : "cardNo.ApproveWithHoldInfo",
			maxLength : 21,
			allowBlank : false,
			name : "cardNo",
			width : 200,
			fieldLabel : "银行卡号",
			disabled : true,
			anchor : "100%"
		});

		this.panel1408041169 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField2075860121],
			layout : "form",
			columnWidth : "0.33",
			border : false
		});

		this.textField8758512 = new Ext.form.TextField({
			id : "mobile.ApproveWithHoldInfo",
			maxLength : 21,
			allowBlank : false,
			name : "mobile",
			width : 200,
			fieldLabel : "预留手机",
			disabled : true,
			anchor : "100%"
		});

		this.panel1114692953 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField8758512],
			layout : "form",
			columnWidth : "0.33",
			border : false
		});

		this.textField163058145 = new Ext.form.TextField({
			id : "idNo.ApproveWithHoldInfo",
			allowBlank : false,
			maxLength : 21,
			width : 200,
			name : "idNo",
			fieldLabel : "身份证号",
			disabled : true,
			anchor : "100%"
		});

		this.panel527566131 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField163058145],
			layout : "form",
			columnWidth : "0.33",
			border : false
		});

		this.panel1328462563 = new Ext.Panel({
			layoutConfig : {},
			items : [this.panel527566131, this.panel1114692953,
					this.panel1408041169],
			layout : "column",
			border : false
		});

		this.textField144994182 = new Ext.form.TextField({
			id : "custName.ApproveWithHoldInfo",
			allowBlank : false,
			width : 200,
			name : "custName",
			fieldLabel : "姓名",
			disabled : true,
			anchor : "100%"
		});

		this.panel225272178 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField144994182],
			layout : "form",
			columnWidth : "0.33",
			border : false
		});

		this.textField206550095 = new Ext.form.TextField({
			id : "channel.ApproveWithHoldInfo",
			allowBlank : false,
			name : "channel",
			fieldLabel : "签约渠道",
			disabled : true,
			anchor : "100%"
		});

		this.panel1233829658 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField206550095],
			layout : "form",
			columnWidth : "0.33",
			border : false
		});

		this.textField1942152383 = new Ext.form.TextField({
			id : "contNo.ApproveWithHoldInfo",
			allowBlank : false,
			name : "contNo",
			fieldLabel : "合同号",
			disabled : true,
			anchor : "100%"
		});

		this.panel1763379598 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField1942152383],
			layout : "form",
			columnWidth : "0.33",
			border : false
		});

		this.panel1839544556 = new Ext.Panel({
			layoutConfig : {},
			items : [this.panel1763379598, this.panel1233829658,
					this.panel225272178],
			layout : "column",
			border : false
		});

		this.formPanel2080694638 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			width : "60%",
			autoWidth : false,
			autoHeight : false,
			collapsed : false,
			id : "form.ApproveWithHoldInfo",
			frame : false,
			items : [{
				layoutConfig : {},
				collapsible : false,
				width : "80%",
				collapsed : false,
				id : "approveInfo.ApproveWithHoldInfo",
				title : "审批信息",
				defaults : "",
				style : "padding:10px 10px 10px 10px",
				bodyBorder : false,
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					autoScroll : false,
					items : [this.panel1839544556, this.panel1328462563,
							this.panel40692670, {
								layoutConfig : {},
								items : [{
									layoutConfig : {},
									layout : "form",
									columnWidth : "1",
									autoWidth : false,
									buttonAlign : "left",
									html : "<div style='padding:20px 0px 20px 100px;font-weight:bold;font-size:18px'>身份证照片信息</div>",
									border : false
								}, {
									id : "front.ApproveWithHoldInfo",
									layoutConfig : {},
									layout : "form",
									columnWidth : "0.5",
									autoWidth : false,
									buttonAlign : "left",
									border : false
								}, {
									id : "back.ApproveWithHoldInfo",
									layoutConfig : {},
									layout : "form",
									columnWidth : "0.5",
									autoWidth : false,
									buttonAlign : "left",
									border : false
								}],
								layout : "column",
								columnWidth : "1",
								autoWidth : false,
								buttonAlign : "left",
								border : false
							}, {
								layoutConfig : {},
								items : [{
									layoutConfig : {},
									layout : "form",
									columnWidth : "1",
									autoWidth : false,
									html : "<div style='padding:20px 0px 20px 100px;font-weight:bold;font-size:18px'>代扣协议附件</div>",
									buttonAlign : "left",
									border : false
								}, {
									id : "other.ApproveWithHoldInfo",
									layoutConfig : {},
									layout : "form",
									columnWidth : "1",
									autoWidth : false,
									buttonAlign : "left",
									border : false
								}],
								layout : "form",
								columnWidth : "1",
								autoWidth : false,
								buttonAlign : "left",
								border : false
							}],
					layout : "form",
					columnWidth : "0.8",
					autoWidth : false,
					buttonAlign : "left",
					border : false
				}],
				xtype : "fieldset",
				layout : "form",
				columnWidth : "0.6",
				buttonAlign : "center",
				border : true
			}, {
				layoutConfig : {},
				collapsible : false,
				width : "80%",
				buttons : [{
					text : "提交",
					handler : function(button, event) {
						com.jsjn.jnf.withhold.sign.query.ApproveWithHoldInfo
								.approveSubmit(button, event);
					}
				}],
				collapsed : false,
				id : "approveResult.ApproveWithHoldInfo",
				title : "审批结果",
				defaults : "",
				style : "padding:10px 10px 10px 10px",
				bodyBorder : false,
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					items : [this.panel2047590908, this.panel1647937601],
					layout : "column",
					columnWidth : "0.9",
					autoWidth : false,
					split : true,
					buttonAlign : "left",
					border : false
				}, {
					layoutConfig : {},
					items : [this.textArea1057732788],
					layout : "form",
					columnWidth : "0.9",
					autoWidth : false,
					buttonAlign : "left",
					split : true,
					border : false
				}],
				xtype : "fieldset",
				layout : "form",
				titleCollapse : false,
				columnWidth : "0.6",
				buttonAlign : "center",
				border : true
			}],
			layout : "form",
			buttonAlign : "center",
			labelAlign : "right",
			border : false
		});

		this.panel1330742913 = new Ext.Panel({
			id : "panelInfo.ApproveWithHoldInfo",
			layoutConfig : {},
			region : "center",
			autoScroll : true,
			style : "padding:2% 0 0 15%",
			items : [this.formPanel2080694638],
			columnWidth : "0.6",
			autoWidth : false,
			autoHeight : false,
			border : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			autoScroll : true,
			items : [this.panel1330742913],
			bodyBorder : false,
			layout : "form",
			autoWidth : false,
			autoHeight : false
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
