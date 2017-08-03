/**
 * @author think
 */

// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.ext.extend');
com.jsjn.ext.extend.FilterTree = Ext.extend(Ext.tree.TreePanel, {
	checkMode: '',//single, up, down, up_down 
	showUnmatchChild: false,
    emptyText : '输入搜索条件...',
	filter: {},
	layoutConfig : {},
	dataUrl: "",
	autoScroll: true, 
    initComponent : function() {
		var tree = this;
		var searchBox = new Ext.form.TextField({  
					width: 150,  
					emptyText: this.emptyText,
					enableKeyEvents: true,
					listeners:{
						keydown: {
							fn: function(tf, e) {
								tree.filter.clear();
								if(!tf.getValue()){
									return;
								}
								tree.expandAll();
								var re = new RegExp(Ext.escapeRe(tf.getValue()), 'i');
								tree.filter.filter(re, "text");
							},
							buffer: 350,
							scope: this
						},
						scope: this
					}
				});
		tree.on("checkchange", function(node, checked) {
			if(tree.checkMode == 'single') {
				if(checked == false) {
				} else {
					var nds = tree.getChecked();
					for(var i=0;i<nds.length;i++) {
						nds[i].attributes.checked = false;
						nds[i].ui.checkbox.checked = false;
					}
					node.attributes.checked = true;
					node.ui.checkbox.checked = true;
				}
			} else if(tree.checkMode == 'up') {
				if(checked == true) {
					var parent = node.parentNode;
					while(parent != undefined) {
						if(parent.ui.checkbox.disabled==false) {
							parent.attributes.checked = true;
							parent.ui.checkbox.checked = true;
						}
						parent = parent.parentNode;
					}
				}
			} else if(tree.checkMode == 'down') {
				node.cascade(function(n){
					if(n.ui.checkbox.disabled==false) {
						n.attributes.checked = checked;
						n.ui.checkbox.checked = checked;
					}
				});
			} else if(tree.checkMode == 'up_down') {
				if(checked == true) {
					var parent = node.parentNode;
					while(parent != undefined) {
						if(parent.ui.checkbox.disabled==false) {
							parent.attributes.checked = true;
							parent.ui.checkbox.checked = true;
						}
						parent = parent.parentNode;
					}
				}
				node.cascade(function(n){
					if(n.ui.checkbox.disabled==false) {
						n.attributes.checked = checked;
						n.ui.checkbox.checked = checked;
					}
				});
			} else {
				
			}
		});
		
		//控制初始状态展开到第几层
		var expFun = function(node, deep, anim) {
			if (node.getDepth() > tree.expandDept) {
				return false;
			}
		};
        tree.on("beforeexpandnode", expFun);
		
		Ext.apply(this,{
			animCollapse:false,
	        animate: false,
			lines:false, 
			tbar:[' ',  
				searchBox,' ',
				{
					icon: 'ExtJs3.4/extend/filterTree/expand-all.gif',
					tooltip: '展开',
					handler: function(){ this.root.expand(true); },
					scope: this
				}, '-', 
				{
					icon: 'ExtJs3.4/extend/filterTree/collapse-all.gif',
					tooltip: '收起',
					handler: function(){ this.root.collapse(true); },
					scope: this
				}
			],
			root : new Ext.tree.AsyncTreeNode({
				id : "root_0",
				text : "Root",
				draggable : false,
				checked: false,
				expandable : true, 
				expanded: true
			}),
			loader : new Ext.tree.TreeLoader({
				preloadChildren: true,
				dataUrl : this.dataUrl
			}),
			border : true,
            width:this.width || 300,
            height: this.height || 300,
			border: this.border,
			rootVisible: this.rootVisible,
            baseParams:this.baseParams || {}
        });
        com.jsjn.ext.extend.FilterTree.superclass.initComponent.call(this);
        
//		tree.expandAll();
		
		var filter = new Ext.tree.TreeFilter(this, {
			filter : function(value, attr, startNode){
				attr = attr || "text";
				var f;
				if(typeof value == "string"){
					var vlen = value.length;
					// auto clear empty filter
					if(vlen == 0 && this.clearBlank){
						this.clear();
						return;
					}
					value = value.toLowerCase();
					f = function(n){
						return n.attributes[attr].indexOf(value) >= 0;
						//return n.attributes[attr].substr(0, vlen).toLowerCase() == value;
					};
				}else if(value.exec){ // regex?
					f = function(n){
						return value.test(n.attributes[attr]);
					};
				}else{
					throw 'Illegal filter type, must be string or regex';
				}
				this.filterBy(f, null, startNode);
			},
			filterBy : function(fn, scope, startNode){
				startNode = startNode || this.tree.root;
				if(this.autoClear){
					this.clear();
				}
				var af = this.filtered, rv = this.reverse;
			
				var flag = false;
				flag = fun(startNode, fn, af, rv, tree.showUnmatchChild);
			}
		});
		this.filter = filter;
		
    }
   
});

function fun(node, fn, af, rv, showUnmatchChild) {
		var cns = node.childNodes;
		var flag = false;
		for(var i=0;i<cns.length;i++) {
			if(cns[i].isLeaf() == true) {
				var m = fn.call(cns[i], cns[i]);
				if(!m || rv){
	                af[cns[i].id] = cns[i];
	                cns[i].ui.hide();
	            } else {
	            	flag = true;
	            }
			} else {
				if (showUnmatchChild == true) {
					flag = flag || fun(cns[i], fn, af, rv, showUnmatchChild);
				} else {
					flag = fun(cns[i], fn, af, rv, showUnmatchChild) || flag;
				}
			}
		}
		
		if(!flag || rv) {
			var m = fn.call(node, node);
			if(!m || rv) {
				if(node.id != 'root_0') {
					af[node.id] = node;
					node.ui.hide();
				}
			} else {
				return true;
			}
		}
		return flag;
	};

/**
 * --------------------------------- 
 * 将FilterTree注册为Ext的组件,以便使用
 * Ext的延迟渲染机制，xtype:'filtertree' 
 * ---------------------------------
 */
Ext.reg('filtertree', com.jsjn.ext.extend.FilterTree);
