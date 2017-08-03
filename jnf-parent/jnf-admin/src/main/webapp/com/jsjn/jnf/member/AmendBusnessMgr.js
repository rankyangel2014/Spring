// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.member');
com.jsjn.jnf.member.AmendBusnessMgr = function(config) {
	if (typeof(com.jsjn.jnf.member.AmendBusnessMgr.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.member.AmendBusnessMgr.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.member.AmendBusnessMgr']);
		com.jsjn.jnf.member.AmendBusnessMgr.PANEL = this;
	}
	return com.jsjn.jnf.member.AmendBusnessMgr.PANEL;
};
Ext.extend(com.jsjn.jnf.member.AmendBusnessMgr, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
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

		this.panel1805086145 = new Ext.Panel({
			id : "pan.checkbox",
			layoutConfig : {},
			layout : "form",
			border : false
		});

		this.textField1750211134 = new Ext.form.TextField({
			id : "busLcnsNo.amendBusness",
			allowBlank : true,
			maxLength : 18,
			name : "busLcnsNo",
			fieldLabel : "证件号码",
			anchor : "70%"
		});

		this.textField847974964 = new Ext.form.TextField({
			id : "addr.amendBusness",
			allowBlank : true,
			maxLength : 200,
			name : "addr",
			fieldLabel : "联系地址",
			anchor : "90%"
		});

		this.textField1111013194 = new Ext.form.TextField({
			id : "mName.amendBusness",
			allowBlank : true,
			maxLength : 50,
			name : "mName",
			fieldLabel : "商户名称",
			anchor : "70%"
		});

		this.radio1940147074 = new Ext.form.Radio({
			id : "status.lock",
			name : "status",
			columnWidth : ".05",
			fieldLabel : "冻结"
		});

		this.radio1539152554 = new Ext.form.Radio({
			id : "status.noraml",
			name : "status",
			columnWidth : ".05",
			checked : true,
			fieldLabel : "商户状态：正常"
		});

		this.textField1429883866 = new Ext.form.TextField({
			id : "phoneNo.amendBusness",
			maxLength : 20,
			allowBlank : true,
			name : "phoneNo",
			fieldLabel : "联系电话",
			anchor : "70%"
		});

		this.textField169815894 = new Ext.form.TextField({
			id : "mid.amendBusness",
			readOnly : false,
			allowBlank : true,
			maxLength : 4,
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
					com.jsjn.jnf.member.AmendBusnessMgr
							.amendExit(button, event);
				}
			}, {
				id : "btn.amendSave",
				text : "保存",
				handler : function(button, event) {
					com.jsjn.jnf.member.AmendBusnessMgr
							.amendSave(button, event);
				}
			}],
			collapsed : false,
			id : "form.amendBusness",
			frame : false,
			items : [{
				bodyStyle : "1",
				layoutConfig : {},
				collapsible : false,
				collapsed : false,
				hideBorders : true,
				title : "商户资料",
				defaults : "",
				style : "margin:5px",
				collapseFirst : false,
				items : [{
					layoutConfig : {},
					items : [this.textField169815894, this.textField1429883866,
							this.radio1539152554, this.radio1940147074],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					style : "margin-top:25px",
					items : [this.textField1111013194, this.textField847974964],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}, {
					layoutConfig : {},
					style : "margin-top:25px",
					items : [this.textField1750211134],
					layout : "form",
					columnWidth : ".33",
					autoWidth : false,
					border : false
				}],
				layout : "column",
				xtype : "fieldset",
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
