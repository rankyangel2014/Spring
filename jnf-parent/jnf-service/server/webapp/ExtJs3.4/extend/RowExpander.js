/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ns('Ext.ux.grid');

/**
 * @class Ext.ux.grid.RowExpander
 * @extends Ext.util.Observable
 * Plugin (ptype = 'rowexpander') that adds the ability to have a Column in a grid which enables
 * a second row body which expands/contracts.  The expand/contract behavior is configurable to react
 * on clicking of the column, double click of the row, and/or hitting enter while a row is selected.
 *
 * @ptype rowexpander
 */
Ext.ux.grid.RowExpander = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {Boolean} expandOnEnter
     * <tt>true</tt> to toggle selected row(s) between expanded/collapsed when the enter
     * key is pressed (defaults to <tt>true</tt>).
     */
    expandOnEnter : true,
    /**
     * @cfg {Boolean} expandOnDblClick
     * <tt>true</tt> to toggle a row between expanded/collapsed when double clicked
     * (defaults to <tt>true</tt>).
     */
    expandOnDblClick : true,
    header : '',
    width : 20,
    sortable : false,
    fixed : true,
    hideable: false,
    menuDisabled : true,
    dataIndex : '',
    id : 'expander',
    lazyRender : true,
    enableCaching : true,
    constructor: function(config){
        Ext.apply(this, config);
        this.addEvents({
            /**
             * @event beforeexpand
             * Fires before the row expands. Have the listener return false to prevent the row from expanding.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            beforeexpand: true,
            /**
             * @event expand
             * Fires after the row expands.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            expand: true,
            /**
             * @event beforecollapse
             * Fires before the row collapses. Have the listener return false to prevent the row from collapsing.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            beforecollapse: true,
            /**
             * @event collapse
             * Fires after the row collapses.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            collapse: true
        });
        Ext.ux.grid.RowExpander.superclass.constructor.call(this);
        if(this.tpl){
            if(typeof this.tpl == 'string'){
                this.tpl = new Ext.Template(this.tpl);
            }
            this.tpl.compile();
        }

        this.state = {};
        this.bodyContent = {};
    },

    getRowClass : function(record, rowIndex, p, ds){
        p.cols = p.cols-1;
        var content = this.bodyContent[record.id];
        if(!content && !this.lazyRender){
            content = this.getBodyContent(record, rowIndex);
        }
        if(content){
            p.body = content;
        }
        return this.state[record.id] ? 'x-grid3-row-expanded' : 'x-grid3-row-collapsed';
    },

    init : function(grid){
        this.grid = grid;

        var view = grid.getView();
        view.getRowClass = this.getRowClass.createDelegate(this);

        view.enableRowBody = true;


        grid.on('render', this.onRender, this);
        grid.on('destroy', this.onDestroy, this);
    },

    // @private
    onRender: function() {
        var grid = this.grid;
        var mainBody = grid.getView().mainBody;
        mainBody.on('mousedown', this.onMouseDown, this, {delegate: '.x-grid3-row-expander'});
        if (this.expandOnEnter) {
            this.keyNav = new Ext.KeyNav(this.grid.getGridEl(), {
                'enter' : this.onEnter,
                scope: this
            });
        }
        if (this.expandOnDblClick) {
            grid.on('rowdblclick', this.onRowDblClick, this);
        }
    },
    
    // @private    
    onDestroy: function() {
        if(this.keyNav){
            this.keyNav.disable();
            delete this.keyNav;
        }
        /*
         * A majority of the time, the plugin will be destroyed along with the grid,
         * which means the mainBody won't be available. On the off chance that the plugin
         * isn't destroyed with the grid, take care of removing the listener.
         */
        var mainBody = this.grid.getView().mainBody;
        if(mainBody){
            mainBody.un('mousedown', this.onMouseDown, this);
        }
    },
    // @private
    onRowDblClick: function(grid, rowIdx, e) {
        this.toggleRow(rowIdx);
    },

    onEnter: function(e) {
        var g = this.grid;
        var sm = g.getSelectionModel();
        var sels = sm.getSelections();
        for (var i = 0, len = sels.length; i < len; i++) {
            var rowIdx = g.getStore().indexOf(sels[i]);
            this.toggleRow(rowIdx);
        }
    },

    getBodyContent : function(record, index){
        if(!this.enableCaching){
            return this.tpl.apply(record.data);
        }
        var content = this.bodyContent[record.id];
        if(!content){
            content = this.tpl.apply(record.data);
            this.bodyContent[record.id] = content;
        }
        //console.info(content);
        return content;
    },

    onMouseDown : function(e, t){
        e.stopEvent();
        var row = e.getTarget('.x-grid3-row');
        this.toggleRow(row);
    },

    renderer : function(v, p, record){
        p.cellAttr = 'rowspan="2"';
        return '<div class="x-grid3-row-expander">&#160;</div>';
    },

    beforeExpand : function(record, body, rowIndex){
        if(this.fireEvent('beforeexpand', this, record, body, rowIndex) !== false){
            if(this.tpl && this.lazyRender){
            	//if(body.innerHTML==""){
                	body.innerHTML = this.getBodyContent(record, rowIndex);
            	//}
            }
            return true;
        }else{
            return false;
        }
    },

    toggleRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        this[Ext.fly(row).hasClass('x-grid3-row-collapsed') ? 'expandRow' : 'collapseRow'](row);
    },

    expandRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.DomQuery.selectNode('tr:nth(2) div.x-grid3-row-body', row);
        if(this.beforeExpand(record, body, row.rowIndex)){
            this.state[record.id] = true;
            Ext.fly(row).replaceClass('x-grid3-row-collapsed', 'x-grid3-row-expanded');
            this.fireEvent('expand', this, record, body, row.rowIndex);
        }
    },

    collapseRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.fly(row).child('tr:nth(1) div.x-grid3-row-body', true);
        if(this.fireEvent('beforecollapse', this, record, body, row.rowIndex) !== false){
            this.state[record.id] = false;
            Ext.fly(row).replaceClass('x-grid3-row-expanded', 'x-grid3-row-collapsed');
            this.fireEvent('collapse', this, record, body, row.rowIndex);
        }
    }
});

Ext.preg('rowexpander', Ext.ux.grid.RowExpander);
//backwards compat
Ext.grid.RowExpander = Ext.ux.grid.RowExpander;

/**
 * 
 */
Ext.namespace('com.jsjn.ext.extend');

com.jsjn.ext.extend.NestedGridPanel = Ext.extend(Ext.grid.EditorGridPanel, {
	sunStoreMeta:null,
	sunColumnMeta:null,
	sunIsPage:false,
	sunTitle:"嵌套数据表",
	sunPageSize:10,
	plugins:[],
	viewConfig: {
            forceFit:true
    },
	initComponent : function() {
		var idProperty = this.store.reader.meta.id;
		if(typeof(idProperty)=="undefined" || idProperty == null){
			Ext.Msg.alert('alert', "masetr grid's reader must assigned id");

		}
		var masterGrid =this;
		var expander = new Ext.grid.RowExpander({
	        tpl : new Ext.XTemplate(
	        "<div class='title'>"+this.sunTitle+":</div>",
	        '<div id= sunGrid{'+idProperty+'}_'+masterGrid.id+' class="detailData">',
	          '',
	        '</div>'
	        )
	    });
	    
	   if(masterGrid.sunColumnMeta == null){
	    	masterGrid.sunColumnMeta  = masterGrid.columns;
	   }
	   this.store.on("load",function(store){
	    	//store.removeAll(true);
	   	var ic = store.getRange().length;
	   		for(var i=0;i<ic;i++){
	   			row = masterGrid.view.getRow(i);
	   			Ext.fly(row).replaceClass('x-grid3-row-expanded', 'x-grid3-row-collapsed');
	   		}
	   		console.info("1");
	   		
	   });
	   expander.on("expand",function(expander,row,body,rowIndex){
	   		var renderId = "sunGrid"+(row.get(idProperty));
//	    	if(typeof(expander[renderId]) =="undefined"){
		   		if(masterGrid.sunStoreMeta  != null){
		   			if(typeof(masterGrid.sunStoreMeta.data)!="undefined"){
		   				var storeMeta = appframe.clone(masterGrid.sunStoreMeta);
		   				storeMeta.data = row.json[masterGrid.sunStoreMeta.data];
		   				storeMeta.reader = masterGrid.sunStoreMeta.reader;
		   				var tempStore = new Ext.data.Store(storeMeta);
		   			}else{
		   				var tempStore =  new Ext.data.Store(masterGrid.sunStoreMeta);
		   				tempStore.setBaseParam("idProperty",row.get(idProperty));
		   			}
		   		}
		    	var snnGrid = new Ext.grid.GridPanel({
				    store:tempStore,
				    columns:masterGrid.sunColumnMeta,
				    autoWidth:true,
				    autoHeight:true,
				    border:false,
				    bbar : masterGrid.sunIsPage ? new Ext.PagingToolbar({
						displayInfo : true,
						displayMsg : "{0} - {1} of {2}",
						store : tempStore,
						xtype : "paging",
						pageSize : masterGrid.sunPageSize,
						emptyMsg : "没有数据"
					}) : {}
			  	});
			  	snnGrid.on("mouseover",function(e){
			  		e.stopEvent();
			  	});
				snnGrid.on("rowmousedown",function(g, row, e){
				        e.stopEvent();
				});
				snnGrid.on("dblclick",function(e){
				        e.stopEvent();
				});
				snnGrid.render(renderId+'_'+masterGrid.id);
	    		expander[renderId] = snnGrid.id;
	    		
//	    	}else{
//	    		var sungrid = Ext.getCmp(expander[renderId]);
//	    		sungrid.getStore ().reload();
//	    	}
	    	

	    });
	    this.columns=([expander].concat(this.columns));
	    this.plugins.push(expander);
    	com.jsjn.ext.extend.NestedGridPanel.superclass.initComponent.call(this);
	}
});
Ext.preg('nestedgridpanel', com.jsjn.ext.extend.NestedGridPanel);

Ext.grid.NestedGridPanel = com.jsjn.ext.extend.NestedGridPanel;