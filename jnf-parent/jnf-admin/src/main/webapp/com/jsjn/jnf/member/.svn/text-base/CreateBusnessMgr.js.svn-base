// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.CreateBusnessMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.CreateBusnessMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.CreateBusnessMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.CreateBusnessMgr']);
		com.jsjn.jnf.member.CreateBusnessMgr.PANEL = this;
	}
	return com.jsjn.jnf.member.CreateBusnessMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.member.CreateBusnessMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.panel1805086145 = new Ext.Panel({
			id : "pan.checkbox",
			layoutConfig : {},
			layout : "form",
			border : false
		});

		this.textField1464248676 = new Ext.form.TextField({
			id : "rsaPubKey.amendBusness",
			maxLength : 1024,
			labelStyle : "text-align:left",
			name : "rsaPubKey",
			width : 500,
			fieldLabel : "商户公钥"
		});

		this.textField1647633313 = new Ext.form.TextField({
			id : "whiteList.amendBusness",
			maxLength : 160,
			labelStyle : "text-align:left",
			name : "whiteList",
			width : 500,
			fieldLabel : "IP白名单"
		});

		this.textField1854462256 = new Ext.form.TextField({
			id : "appKey.amendBusness",
			readOnly : true,
			maxLength : 32,
			labelStyle : "text-align:left",
			name : "appKey",
			width : 500,
			value : "（系统自动生成）",
			fieldLabel : "SECERT"
		});

		this.panel836107551 = new Ext.Panel({
			layoutConfig : {},
			style : "margin-left:5px;",
			items : [this.textField1854462256, this.textField1647633313,
					this.textField1464248676],
			layout : "form",
			border : false
		});

		this.textField676968093 = new Ext.form.TextField({
			id : "busLcnsNo.amendBusness",
			maxLength : 18,
			allowBlank : true,
			name : "busLcnsNo",
			fieldLabel : "证件号码",
			anchor : "70%"
		});

		this.textField1799428796 = new Ext.form.TextField({
			id : "addr.amendBusness",
			maxLength : 200,
			allowBlank : true,
			name : "addr",
			fieldLabel : "联系地址",
			anchor : "90%"
		});

		this.textField2136578181 = new Ext.form.TextField({
			id : "mName.amendBusness",
			maxLength : 50,
			allowBlank : true,
			name : "mName",
			fieldLabel : "商户名称",
			anchor : "70%"
		});

		this.radio1855963006 = new Ext.form.Radio({
			id : "status.lock",
			name : "status",
			columnWidth : ".05",
			fieldLabel : "冻结"
		});

		this.radio45642443 = new Ext.form.Radio({
			id : "status.noraml",
			name : "status",
			columnWidth : ".05",
			fieldLabel : "商户状态：正常",
			checked : true
		});

		this.textField456591609 = new Ext.form.TextField({
			id : "phoneNo.amendBusness",
			allowBlank : true,
			maxLength : 20,
			name : "phoneNo",
			fieldLabel : "联系电话",
			anchor : "70%"
		});

		this.textField1887868368 = new Ext.form.TextField({
			id : "mid.amendBusness",
			readOnly : false,
			maxLength : 4,
			allowBlank : true,
			name : "mid",
			maxLengthText : "4",
			fieldLabel : "商户号",
			anchor : "70%"
		});

		this.formPanel2084438115 = new Ext.form.FormPanel({
			layoutConfig : {},
			labelWidth : 100,
			autoScroll : true,
			collapsible : false,
			buttons : [{
				id : "btn.amendExit",
				text : "返回",
				handler : function(button, event) {
					com.jsjn.jnf.member.CreateBusnessMgr.createExit(button,
							event);
				}
			}, {
				id : "btn.amendSave",
				text : "保存",
				handler : function(button, event) {
					com.jsjn.jnf.member.CreateBusnessMgr.createSave(button,
							event);
				}
			}],
			collapsed : false,
			id : "form.amendBusness",
			frame : false,
			items : [{
				layoutConfig : {},
				bodyStyle : "1",
				collapsible : false,
				collapsed : false,
				hideBorders : true,
				defaults : "",
				title : "商户资料",
				style : "margin:5px",
				items : [{
					layoutConfig : {},
					items : [this.textField1887868368, this.textField456591609,
							this.radio45642443, this.radio1855963006],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					style : "margin-top:25px",
					items : [this.textField2136578181, this.textField1799428796],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					style : "margin-top:25px",
					items : [this.textField676968093],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}],
				collapseFirst : false,
				xtype : "fieldset",
				layout : "column",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, {
				layoutConfig : {},
				bodyStyle : "1",
				hideBorders : true,
				title : "安全设置",
				style : "margin-left:5px",
				items : [this.panel836107551],
				layout : "column",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center",
				border : true
			}, {
				layoutConfig : {},
				hideBorders : true,
				title : "权限设置：",
				style : "margin:5px",
				items : [this.panel1805086145],
				layout : "form",
				xtype : "fieldset",
				columnWidth : "1",
				border : true
			}],
			layout : "form",
			columnWidth : "1",
			buttonAlign : "center",
			labelAlign : "right",
			border : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			items : [this.formPanel2084438115]
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
