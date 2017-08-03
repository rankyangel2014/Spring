// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.panda.extPage');
com.jsjn.panda.extPage.EditParam = function(config) {
	if (typeof(com.jsjn.panda.extPage.EditParam.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.panda.extPage.EditParam.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.panda.extPage.EditParam']);
		com.jsjn.panda.extPage.EditParam.PANEL = this;
	}
	return com.jsjn.panda.extPage.EditParam.PANEL;
};
Ext.extend(com.jsjn.panda.extPage.EditParam, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.panel2122057996 = new Ext.Panel({
			layoutConfig : {},
			items : [{
				text : "确定",
				xtype : "button"
			}, {
				text : "取消",
				xtype : "button"
			}],
			layout : "column",
			border : false
		});

		this.textArea707183238 = new Ext.form.TextArea({
			id : "dscrpt",
			height : 100,
			width : 300,
			fieldLabel : "描述"
		});

		this.store975529858 = new Ext.data.Store({});

		this.comboBox2127515994 = new Ext.form.ComboBox({
			id : "type",
			store : this.store975529858,
			fieldLabel : "参数类型"
		});

		Ext.apply(this, {
			layoutConfig : {},
			items : [this.comboBox2127515994, this.textArea707183238,
					this.panel2122057996],
			layout : "form"
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
