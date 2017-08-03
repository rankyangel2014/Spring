Ext.onReady(function(){	
	var sampleGridColumns= [{
		header: 'Id',
		width:90,
		dataIndex: 'id'
		//filterInput: new Ext.form.TextField()
	},{
		header: 'Title', 
		dataIndex: 'title',
		width:150
		//filterInput: new Ext.form.TextField()
		
	},{
		header: 'Alias', 
		dataIndex: 'alias',
		width:230
		//filterInput: new Ext.form.TextField()
		
	},{
		header: 'Created',
		width:130,
		dataIndex: 'created_date'
		//filterInput: new Ext.form.DateField({format:'Y-m-d'})
	},{
		header: 'Published', 
		dataIndex: 'state',
		sortable: true,
		renderer:function(v){if(v==1){return 'Published'}else{return '<span style="color:red">UnPublished</span>'}}
//		filterInput	:  new Ext.form.ComboBox({				
//			displayField	: 'name',
//			valueField		: 'state',
//			triggerAction	: 'all',		
//			typeAhead		: false,				
//			mode			: 'local',
//			listWidth		: 160,
//			hideTrigger		: false,
//			emptyText		: 'Select',
//			store			:[['1','Published'],['0','UnPublished']]
//		})
	}];
	
	var sampleGridReader = new Ext.data.JsonReader({
			totalProperty: 'total',
			successProperty: 'success',
			idProperty: 'id',
			root: 'root'
		},[
			{name: 'id'},
			{name: 'title'},
			{name: 'created'},
			{name: 'state'},
			{name: 'alias'},
			{name: 'created_date'}			
	]);
	
	var filterRow = new Ext.ux.grid.FilterRow();
	
	// Typical Store collecting the Proxy, Reader and Writer together.
	var sampleGridStore = new Ext.data.Store({
		baseParams : {
				method : "filterRowData"
		},
		reader		: sampleGridReader,
		autoLoad	: true,	
		url			: appConfig.baseUrl + '/com.jsjn.sample.grid.RenderGrid.do'
	});
	
	var grid = new Ext.grid.GridPanel({
		store: sampleGridStore,
		//renderTo:'filterRowGridExample',
		columns: sampleGridColumns,
		plugins: [filterRow],
		stripeRows: true,
		height: 350,
		enableHdMenu:false,
		bbar : new Ext.PagingToolbar({
				displayInfo : true,
				displayMsg : "{0} - {1} of {2}",
				store : sampleGridStore,
				xtype : "paging",
				pageSize : 20,
				emptyMsg : "No data to display"
		}),
		title: 'Grid with Filters'
	});
	grid.render('filterRowGridExample');
	
	grid.filterRow.setFilterEditor(4,new Ext.form.ComboBox({				
			displayField	: 'name',
			valueField		: 'state',
			triggerAction	: 'all',		
			typeAhead		: false,				
			mode			: 'local',
			listWidth		: 160,
			hideTrigger		: false,
			emptyText		: 'Select',
			store			:[['1','Published'],['0','UnPublished']]
	}));
		
	grid.filterRow.setFilterEditor(3,
		new Ext.form.DateField({format:'Y-m-d'})
	);
		
	

});