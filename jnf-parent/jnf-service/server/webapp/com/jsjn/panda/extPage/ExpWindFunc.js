/**
 * generated by JNGU-2012-ExtPlugins.
 * please  write here  com.jsjn.panda.extPage.ExpWind's method:
 * Javascript class static method be used as ExtJs's event method handler,like 'com.jsjn.panda.extPage.ExpWind.method(); this is Class static method'
 * Javasctipt object method be used as get or set object's properties,like 'com.jsjn.panda.extPage.ExpWind.prototype.method(); this is object's method'
 * com.jsjn.panda.extPage.ExpWind.PANEL is com.jsjn.panda.extPage.ExpWind's  Singleton instance object .
 * you can get com.jsjn.panda.extPage.ExpWind.PANEL's reference  by appfram.getInstance('com.jsjn.panda.extPage.ExpWind'). 
 */

var node;
var index;
var total;

var jsonReader;
var treeData = [];

appframe.afterInstance("com.jsjn.panda.extPage.ExpWind",function(p){	
	jsonReader = new Ext.data.JsonReader({
	 	root: 'root',
	    totalProperty: 'total',
	    fields: [
	        {name: 'name', mapping: 'name'},
	        {name: 'type', mapping: 'type'},
	    ]
	});
	Ext.getCmp("beanProp").getStore().reader = jsonReader;
	Ext.getCmp("tempExp").setAutoScroll(true);
});

showParamInfo = function(index2, editable) {
	Ext.getCmp("tempExp").setReadOnly(!editable);
	Ext.getCmp("reset1").setDisabled(!editable);
	Ext.getCmp("reset2").setDisabled(!editable);
	
	var p = node.data("WFattr").params.root[index2];
	Ext.getCmp("paramType").setValue(p.vtype);
	Ext.getCmp("paramDscrpt").setValue(p.dscrpt);
	Ext.getCmp("tempExp").setValue(p.express);
	
	Ext.getCmp("expPanel").setTitle("取值表达式（第 "+(Number(index2)+1)+"/"+total+" 个参数）");
	if(index2 == 0) {
		Ext.getCmp("pre").disable();
	} else {
		Ext.getCmp("pre").enable();
	}
	if(index2 == total - 1) {
		Ext.getCmp("next").disable();
	} else {
		Ext.getCmp("next").enable();
	}
	if(parent.beanCache[p.vtype] != undefined) {
		var zip = parent.beanCache[p.vtype];
		Ext.getCmp("reset2").setDisabled(false || (!editable));
		Ext.getCmp("beanProp").getStore().loadData({total:zip.length, root:zip});
	} else {
		Ext.getCmp("reset2").disable();
		Ext.getCmp("beanProp").getStore().removeAll();
	}
}

function preOutTree(n) {
	var attr = n.data("WFattr");
	if(attr.pre != null && attr.pre != undefined) {
		preOutTree(attr.pre);
	}
	var data = generateTreeData(n);
	if(data != null) {
		var text;
		if(n.data("NodeType") == "StartEvent") {
			text = "start";
		} else {
			text = attr.Id+":"+attr.MethodName;
		}
		treeData.push({
			text : text,
			value : "",
			children : data,
			leaf : false
		});
	}
}

function generateTreeData(n) {
	var attr = n.data("WFattr");
	var data = [];
	if(n.data("NodeType") == "StartEvent") {
		var root = attr.params.root;
		if(root != null && root.length > 0) {
			for(var i =0;i<root.length;i++) {
				var type = root[i].vtype;
				if(parent.beanCache[type] != undefined) {
					var props = parent.beanCache[type];
					var propLeaves = [];
					for(var j=0;j<props.length;j++) {
						var text = props[j].name + ":" + props[j].type;
						var value = "{$In["+(root[i].seq - 1)+"]"+"."+props[j].name+"}";
						propLeaves.push({
							text : text,
							value : value,
							leaf : true
						});
					}
					data.push({
							children : propLeaves,
							text : (root[i].seq - 1)+":"+type,
							value : "{$In["+(root[i].seq - 1)+"]}",
							leaf : false
					});
				} else {
					data.push({
							text : (root[i].seq - 1)+":"+type,
							value : "{$In["+(root[i].seq - 1)+"]}",
							leaf : true
					});
				}
			}
		} else {
			return null;
		}
		return data;
	} else if(n.data("NodeType") == "ScriptTask") {
		var type = attr.fh;
		if(parent.beanCache[type] != undefined) {
			var props = parent.beanCache[type];
			var propLeaves = [];
			for(var i = 0;i<props.length;i++) {
				var text = props[i].name +":"+props[i].type;
				var value = "{$"+attr.Id+".out."+props[i].name+"}";
				propLeaves.push({
					text : text,
					value : value,
					leaf : true
				});
			}
			data.push({
				text : type,
				value : "{$"+attr.Id+".out}",
				children : propLeaves,
				leaf : false
			});
		} else if(type == "void") {
			return null;
		} else {
			data.push({
				text : type,
				value : "{$"+attr.Id+".out}",
				leaf : true
			});
		}
		return data;
	} else {
		return null;
	}
}

valColRender = function (value, cellmeta, record, rowIndex,	columnIndex, store) {
	return "<input type='text'></input>";
}

okBtnClick = function (button, event) {
	var ntype = node.data("NodeType");
	node.data("WFattr").params.root[index].express = Ext.getCmp("tempExp").getValue();
	if(ntype == "EndEvent") {
		node.data("WFattr").Out = Ext.getCmp("tempExp").getValue();
	} else if (ntype == "DivergeGateway") {
		node.data("WFattr").Express = Ext.getCmp("tempExp").getValue();
	}
	
	window.parent.showNodeInfo(node);
	window.parent.subWin.setVisible(false);
}

cancelBtnClick = function (button, event) {
	window.parent.subWin.setVisible(false);
}

prevBtnClick = function (button, event) {
	//先保存切换之前的值
	node.data("WFattr").params.root[index].express = Ext.getCmp("tempExp").getValue();
	
	index--;
	
	//显示切换之后的值
	showParamInfo(index, parent.editing);
}

nextBtnClick = function (button, event) {
	//先保存切换之前的值
	node.data("WFattr").params.root[index].express = Ext.getCmp("tempExp").getValue();
	
	index++;
	
	//显示切换之后的值
	showParamInfo(index, parent.editing);
}

//用于简单赋值操作
reset1Click = function (button, event) {
	var attr = node.data("WFattr");
	if(attr.MethodType == undefined || attr.MethodType != "RemoteBean") {
		var text = "";
		var ntype = node.data("NodeType");
		if(ntype == "ScriptTask") {
			text = "<in index=\""+index+"\" value=\"\"/>";
		} else if(ntype == "EndEvent") {
			text = "<out id=\""+node.data("WFattr").Id+"\" value=\"\"/>";
		} else if(ntype == "DivergeGateway") {
			text = "{  }";
		}
		Ext.getCmp("tempExp").setValue(text);
	} else {
		var text = "<in index=\"0\" value=\"\"/>\n<in index=\"1\" value=\"\"/>\n...";
		Ext.getCmp("tempExp").setValue(text);
	}
	
}
//用于复杂赋值操作
reset2Click = function (button, event) {
	var text = "";
	var paramType = "";
	var ntype = node.data("NodeType");
	if(ntype == "ScriptTask") {
		paramType = node.data("WFattr").params.root[index].vtype;
	} else if(ntype == "EndEvent") {
		paramType = node.data("WFattr").fh;
	}
	var props = parent.beanCache[paramType];
	for(var i = 0;i< props.length;i++) {
		text += "\t<property name=\""+props[i].name+"\" value=\"\"/>\n";
	}
	text = "<in index=\""+index+"\">\n"+text+"</in>";
	Ext.getCmp("tempExp").setValue(text);
}

initSubwin = function(editable) {
	index = window.parent.index;
	node = window.parent.editingNode;
	total = node.data("WFattr").params.total;
	if (index == 0) {
		Ext.getCmp("pre").disable();
	}
	if (index == total - 1) {
		Ext.getCmp("next").disable();
	}
	Ext.getCmp("expPanel").setTitle(
			"取值表达式（第 " + (Number(index) + 1) + "/" + total + " 个参数）");
	
	//寻找pre节点的输出信息, 生成数据到treeData
	treeData = [];
	if(node.data("WFattr").pre != null) {
		preOutTree(node.data("WFattr").pre);
		var root = {
			text : "该节点之前的输入输出",
			value : "",
			children : treeData,
			leaf : false
		};
		Ext.getCmp("preParams").setRootNode(root);
        Ext.getCmp("preParams").expandAll();
	}
	
	showParamInfo(index, editable);
}

treeNodeClick = function (node, e) {
	Ext.getCmp("expValue").setValue(node.attributes.value);
}