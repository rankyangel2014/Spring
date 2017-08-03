/****************************************************
 * Filter row class.
 * edit by JNGF
 ************************************************/
Ext.namespace('Ext.ux.grid');
Ext.ux.grid.FilterRow = function(config) {
    Ext.apply(this, config);
//    this.addEvents(
//        "change"
//    );
    Ext.ux.grid.FilterRow.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.grid.FilterRow, Ext.util.Observable, {	
	init: function(grid) {
		this.grid = grid;
		grid.filterRow =this;
		this.grid.addClass('filter-row');
		var view = grid.getView();
		var headerTpl = new Ext.Template(
			'<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
				'<thead><tr class="x-grid3-hd-row  ">{cells}</tr></thead>',
			"</table>"
		);
        Ext.applyIf(view, { templates: {} });
		view.templates.header = headerTpl;
		view.templates.hcell = new Ext.Template(
			'<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
				'<div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',
					this.grid.enableHdMenu ? '<a class="x-grid3-hd-btn" href="#"></a>' : '',
					'{value}',
					'<div class="x-small-editor filterInput" id="'+grid.id+'-filter-{id}"></div>',
					'<img class="x-grid3-sort-icon" src="', Ext.BLANK_IMAGE_URL, '" />',
				'</div>',
			'</td>'
       	);

        grid.on('resize', this.syncFields, this);
        grid.on('columnresize', this.syncFields, this);
        grid.on('render', this.renderFields, this);
		var FilterRow = this;
		view.updateHeaders = function(){
			this.innerHd.firstChild.innerHTML = this.renderHeaders();
			this.innerHd.firstChild.style.width = this.getOffsetWidth();
			this.innerHd.firstChild.firstChild.style.width = this.getTotalWidth();
			FilterRow.renderFields();
		};
        Ext.apply(grid, {
            enableColumnHide_: false,
            enableColumnMove: true
        });
    },
    filterquery:function(){
    	var data = this.getData();
    	var grid = this.grid;
		if(typeof(grid.store.baseParams)=="undefined" || grid.store.baseParams==null){
			grid.store.baseParams ={};
		}
		for(var i in data){
			grid.store.baseParams[i] = data[i];
		}
		grid.store.reload();   	
    },
    renderFields: function() {
        var grid = this.grid;
		var filterRow = this;
		grid.filter={};
        var cm = grid.getColumnModel();
        var cols = cm.config;
        var gridId = grid.id;
        Ext.each(cols, function(col) {
            if (!col.hidden) {
                var filterDivId = gridId + "-filter-" + col.id;
                if(typeof(col.filterInput)=="undefined"){
                	 col.filterInput=new Ext.form.TextField();
                }
                var editor 		= col.filterInput;
				if(Ext.isIE){
					col.filterInput = editor = editor.cloneConfig({value:editor.getValue()});
				}
				editor.on("specialkey",function(editor,e){
					var keys = e.getKey();
		            if (e.getKey()  == Ext.EventObject.ENTER) {
							filterRow.filterquery();
		            }
		            return false;
		        });
				grid.filter[filterDivId]= new Ext.Panel({border:false, layout:'fit', items:editor, renderTo:filterDivId});
            }
        }, this);
        
    },
    
    setFilterEditor:function(columNumber,editor){
    	var grid = this.grid;
    	var gridId = grid.id;
    	var cm = grid.getColumnModel();
    	var cols = cm.config;
    	var col = cols[columNumber];
    	col.filterInput = editor;
		if(Ext.isIE){
			col.filterInput = editor = editor.cloneConfig({value:editor.getValue()});
		}
		editor.on("specialkey",function(editor,e){
			var keys = e.getKey();
             if (keys == Ext.EventObject.ENTER) {
					filterRow.filterquery();
             }
        });
    	var filterDivId = gridId + "-filter-" + columNumber;
    	grid.filter[filterDivId].removeAll();
    	grid.filter[filterDivId].add(col.filterInput);
    	grid.filter[filterDivId].doLayout();
    },


    getData: function() {
        var grid 	= this.grid;
        var cm 		= grid.getColumnModel();
        var cols 	= cm.config;       
        var data 	= {};
		var value	= '';
		var dataIndex = '';
        Ext.each(cols, function(col) {
            if (!col.hidden) {
                var editor = col.filterInput;				
                if (editor) {
					value = editor.getValue();
					if(editor.getXType()=='datefield' && value.format){
						value = value.format(editor.format);
					}
					dataIndex = editor.dataIndex?editor.dataIndex:col.dataIndex;
                    data[dataIndex] 				= value;
                }
            }
        });
        return data;
    },
    syncFields: function(){
        var grid 	= this.grid;
        var cm 		= grid.getColumnModel();
        var cols 	= cm.config;
        Ext.each(cols, function(col){
            if (!col.hidden) {              
                var editor = col.filterInput; 
                editor.setSize(col.width - 18);
            }
        });
    }
});

Ext.namespace('com.jsjn.ext.extend');
com.jsjn.ext.extend.ComboBoxTable = Ext.extend(Ext.form.ComboBox, {
    Gridstore : new Ext.data.Store({
			reader : new Ext.data.JsonReader({
				totalProperty : "total",
				root : "root",
				id : "id"
			}, [{
				mapping : "name",
				name : "name"
			}, {
				mapping : "age",
				type : "int",
				name : "age"
			}]),
			proxy : new Ext.data.HttpProxy({})
	}),
    columns:[{
				hidden : false,
				header : "name",
				dataIndex : "name",
				sortable : true
			}, {
				hidden : false,
				header : "age",
				dataIndex : "age",
				sortable : true
	}],
	gridPageSize:20,
	store : new Ext.data.SimpleStore({
            fields : [],
            data : [[]]
    }),
    listHeight:300,
    listWidth:250,
    shadow:false,
    editable : false, //
    mode : 'local',
    //disabled :true,
    name:"test",
    triggerAction : 'all',
    shadow:false,
    valueField:"name",
    displayField:"age",
    maxHeight : 500,   
    selectedClass : '',
    emptyText : '请选择...',
    onSelect:Ext.emptyFn,
    
    

    /**
     *
     * Init
     */
    initComponent : function() {
    	var combo = this;
        com.jsjn.ext.extend.ComboBoxTable.superclass.initComponent.call(this);
        this.tplId = Ext.id();
        this.tpl = '<div id="' + this.tplId + '" style="height:' + this.listHeight + 'px;overflow:hidden;"></div>';
        var filterRow = new Ext.ux.grid.FilterRow();
		var grid = new Ext.grid.GridPanel({
			store: this.Gridstore,
			autoScroll : true,
			width:this.listWidth,
			loadMask:"请稍等",
			border:false,
			columns: this.columns,
			plugins: [filterRow],
			stripeRows: true,
			height: this.listHeight,
			enableHdMenu:false,
			bbar : new Ext.PagingToolbar({
					autoScroll:true,
					autoWidth:true,
					enableOverflow :true,
					displayInfo : false,
					store : this.Gridstore,
					xtype : "paging",
					pageSize : this.gridPageSize,
					emptyMsg : "没有数据"
			})
		});
        grid.on('rowdblclick',function(grid,rowIndex,event){
        	var record = grid.getSelectionModel().getSelected() ;
        	//alert(record.get(combo.displayField));
           	//alert( record.get(combo.valueField));
            combo.setValue(record.get(combo.displayField));
            
            combo.hiddenField.value = record.get(combo.valueField);
            combo.collapse();
           // alert(combo.getValue());
           // alert(combo.hiddenField.value);
        });
        this.grid = grid;
        this.panel = new  Ext.Panel({
        	autoScroll : true,
        	border:false,
        	height: this.listHeight,
        	width:this.listWidth,
        	items:[grid]
        });
        
    },
    
    setFilterEditor:function(columNumber,editor){
    	this.grid.setFilterEditor(columNumber,editor);
    },
    
   onViewClick : function(doFocus){     
   		this.el.blur(); 
	   	var index = this.view.getSelectedIndexes()[0],            
	   	s = this.store,            
	   	r = s.getAt(index);        
	   	if(r){            
	   		this.onSelect(r, index);        
	   	}    
	   	     
   },    

    /**
     * ------------------
     * Listener
     * ------------------
     */
    listeners : {
        'expand' : {
            fn: function() {
                if (!this.panel.rendered && this.tplId) {
                	this.panel.render(this.tplId);
                	//this.panel.add(this.grid);
                	//this.panel.doLayout();
                	//this.panel.add(this.grid);
                	//this.panel.doLayout();
                   // this.grid.render(this.tplId);
                }
                this.panel.show(); 
                
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