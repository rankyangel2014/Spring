// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.panda.extPage');
com.jsjn.panda.extPage.ExpWind = function(config) {
	if (typeof(com.jsjn.panda.extPage.ExpWind.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.panda.extPage.ExpWind.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.panda.extPage.ExpWind']);
		com.jsjn.panda.extPage.ExpWind.PANEL = this;
	}
	return com.jsjn.panda.extPage.ExpWind.PANEL;
};
Ext.extend(com.jsjn.panda.extPage.ExpWind, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.textField1942321017 = new Ext.form.TextField({
			id : "paramType",
			readOnly : true,
			fieldLabel : "参数类型"
		});

		this.store1772654023 = new Ext.data.Store({});

		this.gridPanel1011358370 = new Ext.grid.GridPanel({
			layoutConfig : {},
			id : "beanProp",
			height : 330,
			store : this.store1772654023,
			columns : [{
				hidden : false,
				width : 75,
				sortable : true,
				dataIndex : "name",
				header : "name"
			}, {
				hidden : false,
				width : 75,
				sortable : true,
				dataIndex : "type",
				header : "type"
			}],
			columnWidth : ".33",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false
			}),
			autoHeight : true,
			viewConfig : {}
		});

		this.textArea1789840454 = new Ext.form.TextArea({
			id : "tempExp",
			height : 330,
			width : 300,
			columnWidth : ".67"
		});

		this.panel2096816739 = new Ext.Panel({
			layoutConfig : {},
			tbar : new Ext.Toolbar([{
				id : "reset1",
				text : "整体赋值",
				handler : function(button, event) {
					reset1Click(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "reset2",
				text : "按属性赋值",
				handler : function(button, event) {
					reset2Click(button, event);
				}
			}]),
			items : [this.textArea1789840454, this.gridPanel1011358370],
			layout : "column"
		});

		this.textField1592829383 = new Ext.form.TextField({
			id : "paramDscrpt",
			readOnly : true,
			fieldLabel : "参数描述"
		});

		this.panel1765153331 = new Ext.Panel({
			region : "center",
			layoutConfig : {},
			tbar : new Ext.Toolbar([{
				id : "pre",
				text : "上一个",
				handler : function(button, event) {
					prevBtnClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "next",
				text : "下一个",
				handler : function(button, event) {
					nextBtnClick(button, event);
				}
			}]),
			id : "expPanel",
			title : "取值表达式",
			items : [this.textField1942321017, this.textField1592829383,
					this.panel2096816739],
			layout : "form",
			columnWidth : ".6",
			split : true
		});

		this.treePanel924869296 = new Ext.tree.TreePanel({
			region : "center",
			layoutConfig : {},
			id : "preParams",
			listeners : {
				click : {
					fn : function(node, e) {
						return treeNodeClick(node, e);
					}
				}
			},
			title : "可选属性",
			height : 400,
			autoScroll : true,
			root : new Ext.tree.AsyncTreeNode({
				id : "0",
				text : "Root",
				allowDrap : false,
				allowDrop : false,
				draggable : false,
				expandable : true
			}),
			loader : new Ext.tree.TreeLoader({}),
			autoHeight : false
		});

		this.textField1736520910 = new Ext.form.TextField({
			id : "expValue",
			width : "100%",
			selectOnFocus : true
		});

		this.panel770847143 = new Ext.Panel({
			region : "north",
			layoutConfig : {},
			title : "所选属性的表达式",
			items : [this.textField1736520910]
		});

		this.panel1557930680 = new Ext.Panel({
			region : "west",
			layoutConfig : {},
			items : [this.panel770847143, this.treePanel924869296],
			width : 250,
			layout : "form",
			columnWidth : ".2",
			split : true
		});

		this.panel303135566 = new Ext.Panel({
			layoutConfig : {},
			region : "center",
			items : [this.panel1557930680, this.panel1765153331],
			layout : "border"
		});

		Ext.apply(this, {
			layoutConfig : {},
			items : [this.panel303135566],
			layout : "border",
			buttons : [{
				id : "ok",
				text : "确定",
				handler : function(button, event) {
					okBtnClick(button, event);
				}
			}, {
				id : "cancel",
				text : "取消",
				handler : function(button, event) {
					cancelBtnClick(button, event);
				}
			}],
			buttonAlign : "center",
			border : false
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
