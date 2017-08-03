// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.ext.extend');
com.jsjn.ext.extend.ComboBoxTree = Ext.extend(Ext.form.ComboBox, {
    treeHeight : 180,
    allowUnLeafClick:false,
    url:'',
    store : new Ext.data.SimpleStore({
            fields : [],
            data : [[]]
    }),
    shadow:false,
    valueField:"id",
    displayField:"text",
    editable : false, // 禁止手写及联想功能
    mode : 'local',
    triggerAction : 'all',
    maxHeight : 500,
    selectedClass : '',
    emptyText : '--请选择--',
    baseParams:{n:'n'},
    onSelect:Ext.emptyFn,
    /**
     * 初始化
     * Init
     */
    initComponent : function() {
        com.jsjn.ext.extend.ComboBoxTree.superclass.initComponent.call(this);
        this.tplId = Ext.id();
        this.tpl = '<div id="' + this.tplId + '" style="height:' + this.treeHeight + 'px;overflow:hidden;"></div>';
        var tree = new Ext.tree.TreePanel({
            root:new Ext.tree.AsyncTreeNode({id:'4#@@#-100',text:''}),
            loader:new Ext.tree.TreeLoader({dataUrl:this.url}),
            autoScroll:true,
            height:this.treeHeight,
            rootVisible:false,
            border:false,
            baseParams:this.baseParams
        });
        var combo = this;
        tree.on('beforeload',function(node){
            tree.loader.dataUrl = combo.url;
        });
        tree.on('dblclick',function(node){
            if (combo.allowUnLeafClick == true){
            	combo.fireEvent("selectNode",combo,node.attributes[combo.valueField],combo.hiddenField.value);
                combo.setValue(node.attributes[combo.displayField]);
                combo.hiddenField.value = node.attributes[combo.valueField];
                combo.collapse();
            }
            else if (node.leaf == true){
            	combo.fireEvent("selectNode",combo,node.attributes[combo.valueField],combo.hiddenField.value);
                combo.setValue(node.attributes[combo.displayField]);
                combo.hiddenField.value = node.attributes[combo.valueField];
                combo.collapse();
            }
            
        });
        this.tree = tree;
    },
   onViewClick : function(doFocus){     
	   	var index = this.view.getSelectedIndexes()[0],            
	   	s = this.store,            
	   	r = s.getAt(index);        
	   	if(r){            
	   		this.onSelect(r, index);        
	   	}  
	   	if(doFocus !== false){
            this.el.focus();
        }

	   	     
   }, 

    /**
     * ------------------
     * 事件监听器 
     * Listener
     * ------------------
     */
    listeners : {
        'expand' : {
            fn: function() {
                if (!this.tree.rendered && this.tplId) {
                    this.tree.render(this.tplId);
                    this.tree.root.expand();
                     this.tree.root.select();
                }
                this.tree.show();
            }
        },
        'render':{
            fn:function(){
                this.hiddenField = this.el.insertSibling({
                    tag:'input',
                    type:'hidden',
                    name:this.getName()
                },'before',true);
                this.el.dom.removeAttribute('name');
            }
        }
    }
});

/**
 * --------------------------------- 
 * 将ComboBoxTree注册为Ext的组件,以便使用
 * Ext的延迟渲染机制，xtype:'combotree' 
 * ---------------------------------
 */
Ext.reg('combotree', com.jsjn.ext.extend.ComboBoxTree);
