// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.panda.extPage');
com.jsjn.panda.extPage.NewService = function(config) {
	if (typeof(com.jsjn.panda.extPage.NewService.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.panda.extPage.NewService.superclass.constructor.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.panda.extPage.NewService']);
		com.jsjn.panda.extPage.NewService.PANEL = this;
	}
	return com.jsjn.panda.extPage.NewService.PANEL;
};
Ext.extend(com.jsjn.panda.extPage.NewService, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.store443684344 = new Ext.data.Store({});

		this.comboBox540843570 = new Ext.form.ComboBox({
			allowBlank : false,
			store : this.store443684344,
			hidden : true,
			width : "80%",
			enableKeyEvents : true,
			fieldLabel : "返回类型"
		});

		this.store1967478450 = new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				id : "id",
				totalProperty : "total",
				root : "root"
			}, [{
				name : "seq",
				mapping : "seq",
				type : "int"
			}, {
				name : "vtype",
				mapping : "vtype",
				type : "string"
			}, {
				name : "dscrpt",
				mapping : "dscrpt",
				type : "string"
			}]),
			data : {
				total : 3,
				root : [{
					seq : 1,
					vtype : "int",
					dscrpt : "an integer"
				}, {
					seq : 2,
					vtype : "String",
					dscrpt : "a string"
				},

				{
					seq : 3,
					vtype : "TestBean",
					dscrpt : "a testbean"
				}]
			}
		});

		this.checkboxSelectionModel275223638 = new Ext.grid.CheckboxSelectionModel({
			singleSelect : false,
			width : 25,
			sortable : true
		});

		this.editorGridPanel1249891103 = new Ext.grid.EditorGridPanel({
			layoutConfig : {},
			listeners : {
				afteredit : {
					fn : function(e) {
						return afterEdit(e);
					}
				}
			},
			store : this.store1967478450,
			autoScroll : true,
			clicksToEdit : 1,
			columns : [this.checkboxSelectionModel275223638, {
				hidden : false,
				dataIndex : "seq",
				header : "序号"
			}, {
				hidden : false,
				width : 200,
				dataIndex : "vtype",
				header : "参数类型"
			}, {
				hidden : false,
				width : 350,
				dataIndex : "dscrpt",
				header : "描述"
			}],
			autoHeight : false,
			bbar : new Ext.Toolbar([{
				id : "add",
				text : "添加参数",
				handler : function(button, event) {
					addParam(button, event);
				}
			}, {
				xtype : "tbspacer"
			}, {
				id : "delete",
				text : "删除参数",
				handler : function(button, event) {
					deleteParam(button, event);
				}
			}, {
				xtype : "tbseparator"
			}, {
				id : "save",
				text : "保  存",
				handler : function(button, event) {
					saveBtnClick(button, event);
				}
			}, {
				xtype : "tbspacer"
			}, {
				id : "cancel",
				text : "取  消",
				handler : function(button, event) {
					cancelBtnClick(button, event);
				}
			}]),
			id : "grid",
			autoShow : true,
			height : 250,
			selModel : this.checkboxSelectionModel275223638,
			viewConfig : {},
			loadMask : ""
		});

		this.textField1184193941 = new Ext.form.TextField({
			id : "returnType",
			allowBlank : false,
			width : "80%",
			fieldLabel : "返回类型"
		});

		this.textField1243221091 = new Ext.form.TextField({
			id : "methodDscrpt",
			width : "80%",
			fieldLabel : "方法描述"
		});

		this.textField1176264853 = new Ext.form.TextField({
			id : "regid",
			readOnly : false,
			allowBlank : false,
			width : "80%",
			fieldLabel : "服务号",
			disabled : true
		});

		this.textField1801801751 = new Ext.form.TextField({
			id : "methodName",
			listeners : {
				keyup : {
					fn : function(textfield, e) {
						return keyup(textfield, e);
					}
				},
				keypress : {
					fn : function(textfield, e) {
						return keypress(textfield, e);
					}
				},
				keydown : {
					fn : function(textfield, e) {
						return keydown(textfield, e);
					}
				}
			},
			allowBlank : false,
			enableKeyEvents : true,
			width : "80%",
			fieldLabel : "方法名"
		});

		Ext.apply(this, {
			layoutConfig : {},
			items : [this.textField1801801751, this.textField1176264853,
					this.textField1243221091, this.textField1184193941,
					this.comboBox540843570, {
						text : "方法参数:",
						xtype : "label"
					}, this.editorGridPanel1249891103],
			layout : "form",
			buttonAlign : "center"
		});
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
