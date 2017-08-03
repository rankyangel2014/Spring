// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.test');
com.jsjn.jnf.test.Test = function(config) {
	if (typeof(com.jsjn.jnf.test.Test.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.test.Test.superclass.constructor.call(this);
		appframe.loadScripts(appframe.importJses['com.jsjn.jnf.test.Test']);
		com.jsjn.jnf.test.Test.PANEL = this;
	}
	return com.jsjn.jnf.test.Test.PANEL;
};
Ext.extend(com.jsjn.jnf.test.Test, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.formPanel867284063 = new Ext.form.FormPanel({
			id : "frm.RepayCrdtBatchPrint",
			region : "center",
			autoScroll : true,
			style : "margin-right:5px",
			items : [{
				hideBorders : false,
				title : "微贷接口测试",
				style : "margin:2px;",
				autoScroll : false,
				items : [{
					columnWidth : ".25",
					border : false,
					items : [{
						id : "loanInfoTest",
						region : "center",
						listeners : {
							click : {
								fn : function(button, e) {
									return com.jsjn.jnf.test.Test.loanInfoTest(
											button, e);
								}
							}
						},
						text : "贷款信息查询接口测试",
						xtype : "button"
					}],
					layout : "column"
				}, {
					columnWidth : ".25",
					border : false,
					items : [{
						id : "btn2",
						region : "center",
						listeners : {
							click : {
								fn : function(button, e) {
									return com.jsjn.sc.test.Demo
											.btn2(button, e);
								}
							}
						},
						text : "贷款信息查询接口测试",
						xtype : "button"
					}],
					layout : "form"
				}, {
					columnWidth : ".25",
					border : false,
					items : [{
						region : "center",
						id : "btn3",
						listeners : {
							click : {
								fn : function(button, e) {
									return com.jsjn.sc.test.Demo
											.btn3(button, e);
								}
							}
						},
						text : "资产包还款计划表查询查询接口测试",
						xtype : "button"
					}],
					layout : "form"
				}],
				collapsible : true,
				layout : "column",
				xtype : "fieldset",
				columnWidth : "1",
				buttonAlign : "center"
			}],
			layout : "column",
			columnWidth : "1",
			labelAlign : "right",
			autoHeight : false,
			border : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			items : [this.formPanel867284063]
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
