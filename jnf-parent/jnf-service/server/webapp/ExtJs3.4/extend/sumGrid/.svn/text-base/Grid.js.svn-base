Ext.namespace('com.jsjn.ext.extend');

/**
 * 扩展extjs的EditorGrid功能使之能够进行分组小计和全表总计的功能;
 * 注意该功能不需要用在分页的场合.所以不带有分页的功能.
 * @class com.jsjn.ext.extend.GroupSummaryGrid
 * @extends Ext.grid.EditorGridPanel
 */
com.jsjn.ext.extend.GroupSummaryGridPanel = Ext.extend(Ext.grid.EditorGridPanel, {
	isGroup:false,
	isSubTotal:false,
	isTotal:false,
	plugins:[],
	initComponent : function() {
		if(this.isGroup){
			this.view=new Ext.grid.GroupingView({
	            forceFit: true,
	            showGroupName: false,
	            enableNoGroups: true,
	            enableGrouping:true,
				enableGroupingMenu: false,
	            hideGroupedColumn: false
	        });
		}
		if(this.isSubTotal && this.isGroup){
   			var Groupsummary = new Ext.ux.grid.GroupSummary();
   			this.plugins.push(Groupsummary);
   			
		}
		if(this.isTotal){
    		var summary = new Ext.ux.grid.GridSummary();
			this.plugins.push(summary);
		}
        com.jsjn.ext.extend.GroupSummaryGridPanel.superclass.initComponent.call(this);
	}
});

Ext.reg('groupsummarygridpanel', com.jsjn.ext.extend.GroupSummaryGridPanel);