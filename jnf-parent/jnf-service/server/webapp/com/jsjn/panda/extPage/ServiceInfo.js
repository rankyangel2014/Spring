// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.panda.extPage');
com.jsjn.panda.extPage.ServiceInfo = function(config) {
	if (typeof(com.jsjn.panda.extPage.ServiceInfo.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.panda.extPage.ServiceInfo.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.panda.extPage.ServiceInfo']);
		com.jsjn.panda.extPage.ServiceInfo.PANEL = this;
	}
	return com.jsjn.panda.extPage.ServiceInfo.PANEL;
};
Ext.extend(com.jsjn.panda.extPage.ServiceInfo, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE
		this.panel1646026903 = new Ext.Panel({
			id : "pdPanel",
			region : "center",
			layoutConfig : {},
			allowDomMove : true,
			title : "流程图",
			collapsible : false,
			html : "<iframe name='raphael' src='raphael/process.html' width='100%' height='100%'/>",
			split : true,
			draggable : false,
			collapsed : false
		});

		this.textArea752448586 = new Ext.form.TextArea({
			id : "realcode",
			readOnly : true,
			height : 120,
			width : "98%",
			selectOnFocus : true
		});

		this.panel7757782 = new Ext.Panel({
			layoutConfig : {},
			title : "正式调用",
			items : [this.textArea752448586],
			columnWidth : ".5",
			border : false
		});

		this.textArea1018376649 = new Ext.form.TextArea({
			id : "testcode",
			readOnly : true,
			height : 120,
			width : "98%",
			selectOnFocus : true
		});

		this.panel1087972778 = new Ext.Panel({
			layoutConfig : {},
			title : "测试调用",
			items : [this.textArea1018376649],
			columnWidth : ".5",
			border : false
		});

		this.panel474348030 = new Ext.Panel({
			layoutConfig : {},
			title : "调用代码",
			height : 150,
			bodyBorder : false,
			items : [this.panel1087972778, this.panel7757782],
			layout : "column",
			border : false
		});

		this.textArea602700971 = new Ext.form.TextArea({
			id : "realsub",
			readOnly : true,
			height : 120,
			width : "98%",
			selectOnFocus : true
		});

		this.panel1182683128 = new Ext.Panel({
			layoutConfig : {},
			title : "正式订阅",
			items : [this.textArea602700971],
			columnWidth : ".5",
			border : false
		});

		this.textArea1750753385 = new Ext.form.TextArea({
			id : "testsub",
			height : 120,
			readOnly : true,
			width : "98%",
			selectOnFocus : true
		});

		this.panel235659967 = new Ext.Panel({
			layoutConfig : {},
			title : "测试订阅",
			items : [this.textArea1750753385],
			columnWidth : ".5",
			border : false
		});

		this.panel721790981 = new Ext.Panel({
			layoutConfig : {},
			title : "订阅配置",
			height : 150,
			items : [this.panel235659967, this.panel1182683128],
			width : "100%",
			layout : "column",
			border : false
		});

		this.store1974691007 = new Ext.data.Store({});

		this.editorGridPanel1833980179 = new Ext.grid.EditorGridPanel({
			layoutConfig : {},
			listeners : {
				celldblclick : {
					fn : function(grid, rowIndex, columnIndex, e) {
						return gridDbclick(grid, rowIndex, columnIndex, e);
					}
				}
			},
			autoScroll : true,
			store : this.store1974691007,
			columns : [{
				hidden : false,
				sortable : true,
				dataIndex : "seq",
				header : "序号"
			}, {
				hidden : false,
				sortable : true,
				dataIndex : "name",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return nameRender(value, cellmeta, record, rowIndex,
							columnIndex, store);
				},
				header : "参数名"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				dataIndex : "dscrpt",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return dscrptRender(value, cellmeta, record, rowIndex,
							columnIndex, store);
				},
				header : "参数描述"
			}, {
				hidden : false,
				width : 150,
				sortable : true,
				dataIndex : "vtype",
				header : "变量类型"
			}, {
				hidden : false,
				width : 200,
				sortable : true,
				dataIndex : "express",
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return expRender(value, cellmeta, record, rowIndex,
							columnIndex, store);
				},
				header : "取值表达式"
			}, {
				hidden : false,
				sortable : true,
				dataIndex : "bz",
				header : "备注"
			}],
			autoWidth : true,
			autoHeight : true,
			id : "paramList",
			defaults : "",
			title : "参数列表",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false
			}),
			viewConfig : {},
			loadMask : ""
		});

		this.textField585419589 = new Ext.form.TextField({
			id : "goto",
			readOnly : true,
			fieldLabel : "goto"
		});

		this.panel1755286019 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField585419589],
			layout : "form",
			columnWidth : ".2",
			border : false
		});

		this.textField771127366 = new Ext.form.TextField({
			id : "fh",
			readOnly : true,
			fieldLabel : "return"
		});

		this.panel1855593479 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField771127366],
			layout : "form",
			columnWidth : ".2",
			border : false
		});

		this.textField409382057 = new Ext.form.TextField({
			id : "ffms",
			readOnly : true,
			fieldLabel : "方法描述"
		});

		this.panel1829201972 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField409382057],
			layout : "form",
			columnWidth : ".2",
			autoWidth : false,
			border : false
		});

		this.textField1141968751 = new Ext.form.TextField({
			id : "propId",
			readOnly : true,
			hideParent : false,
			fieldLabel : "id",
			disabled : false,
			hideLabel : false
		});

		this.panel1020542654 = new Ext.Panel({
			layoutConfig : {},
			items : [this.textField1141968751],
			layout : "form",
			columnWidth : ".2",
			autoWidth : false,
			border : false
		});

		this.panel476994700 = new Ext.Panel({
			layoutConfig : {},
			items : [this.panel1020542654, this.panel1829201972,
					this.panel1855593479, this.panel1755286019],
			layout : "column"
		});

		this.panel425130888 = new Ext.Panel({
			region : "south",
			layoutConfig : {},
			title : "属性",
			height : 250,
			autoScroll : true,
			items : [this.panel476994700, {
				layoutConfig : {},
				items : [this.editorGridPanel1833980179, this.panel721790981,
						this.panel474348030],
				xtype : "tabpanel",
				activeTab : 0,
				border : false
			}],
			collapsible : true,
			split : true,
			collapsed : false
		});

		this.panel2141127536 = new Ext.Panel({
			id : "mainPanel",
			region : "north",
			layoutConfig : {},
			tbar : new Ext.Toolbar([{
				text : "|",
				xtype : "tbtext"
			}]),
			bbar : new Ext.Toolbar([{
				id : "createService",
				text : "新建服务",
				handler : function(button, event) {
					createButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "deleteService",
				text : "删除服务",
				handler : function(button, event) {
					delSerButtonClick(button, event);
				}
			}, {
				text : "|",
				xtype : "tbtext"
			}, {
				id : "start",
				text : "开始节点",
				handler : function(button, event) {
					startButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "end",
				text : "结束节点",
				handler : function(button, event) {
					endButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "new",
				text : "方法节点",
				handler : function(button, event) {
					newButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "branch",
				text : "判断节点",
				handler : function(button, event) {
					branchButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "line",
				text : "是否处于画线状态：画线off",
				handler : function(button, event) {
					lineButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "delete",
				text : "删除节点",
				handler : function(button, event) {
					deleteButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "clear",
				text : "清空流程图",
				handler : function(button, event) {
					clearButtonClick(button, event);
				}
			}, {
				text : "|",
				xtype : "tbtext"
			}, {
				id : "save",
				text : "保存流程",
				handler : function(button, event) {
					saveButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "export",
				text : "导出流程",
				handler : function(button, event) {
					exportButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "import",
				text : "导入流程",
				handler : function(button, event) {
					importButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "quitEdit",
				text : "结束编辑",
				handler : function(button, event) {
					quitButtonClick(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				xtype : "tbfill"
			}, {
				id : "allSub",
				text : "全部订阅",
				handler : function(button, event) {
					allSubButtonClick(button, event);
				}
			}])
		});

		this.panel1410208902 = new Ext.Panel({
			region : "center",
			layoutConfig : {},
			items : [this.panel2141127536, this.panel1646026903,
					this.panel425130888],
			layout : "border",
			split : true
		});

		this.panel638413056 = new Ext.Panel({
			id : "serviceTreePanel",
			region : "west",
			layoutConfig : {},
			title : "服务列表1",
			autoScroll : false,
			collapsible : true,
			layout : "fit",
			width : 250,
			split : true,
			collapsed : false
		});

		Ext.apply(this, {
			layoutConfig : {},
			items : [this.panel638413056, this.panel1410208902],
			layout : "border"
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
