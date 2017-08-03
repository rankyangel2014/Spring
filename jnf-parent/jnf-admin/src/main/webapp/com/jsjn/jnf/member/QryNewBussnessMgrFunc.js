/**
 * generated by JNGU-2012-ExtPlugins.
 * please  write here  com.jsjn.jnf.member.QryNewBussnessMgr's method:
 * Javascript class static method be used as ExtJs's event method handler,like 'com.jsjn.jnf.member.QryNewBussnessMgr.method(); this is Class static method'
 * Javasctipt object method be used as get or set object's properties,like 'com.jsjn.jnf.member.QryNewBussnessMgr.prototype.method(); this is object's method'
 * com.jsjn.jnf.member.QryNewBussnessMgr.PANEL is com.jsjn.jnf.member.QryNewBussnessMgr's  Singleton instance object .
 * you can get com.jsjn.jnf.member.QryNewBussnessMgr.PANEL's reference  by appfram.getInstance('com.jsjn.jnf.member.QryNewBussnessMgr'). 
 */

appframe.afterInstance("com.jsjn.jnf.member.QryNewBussnessMgr",function() {
		girdStoreAddExceptionEvent('grid.qryNewbusness',
		"com.jsjn.jnf.member.QryNewBussnessMgr");
		//渲染下拉框
		Ext.apply(Ext.getCmp('status.qryNewbusness'), {
			store : signStatusStore.getStore()
		});	
});

com.jsjn.jnf.member.QryNewBussnessMgr.addParams = function() {
	var mid = Ext.getCmp('mid.qryNewbusness').getValue();	//商户号
	var mName = Ext.getCmp('mName.qryNewbusness').getValue();	//商户名称
	var status = Ext.getCmp('status.qryNewbusness').getValue(); //状态

	var params = {
		mid : mid,
		mName : mName,
		status : status
	};
	
	var gStore = Ext.getCmp('grid.qryNewbusness').getStore();
	// 判断grid的store中存在查询参数和查询结果
	if (undefined != gStore && gStore.getCount() > 0) {
		gStore.removeAll(); // 清空表格store中的查询参数
	}
	gStore.baseParams = params;

};

com.jsjn.jnf.member.QryNewBussnessMgr.gridRender = function(value, cellmeta,
		record, rowIndex, columnIndex, store) {
	var dataIndex = Ext.getCmp("grid.qryNewbusness").getColumnModel()
			.getDataIndex(columnIndex);
	if (dataIndex == 'cplsh') {
		return rowIndex + 1;
	}
	if (dataIndex == 'operator') {
		var operater = "";
		operater += "<a href=\"#\" onclick=\"com.jsjn.jnf.member.QryNewBussnessMgr.amend();\" style=\"vertical-align:bottom; text-decoration:none\">【设&nbsp&nbsp&nbsp置】</a>";
		return operater;
	}
	if (dataIndex == 'created') {
		return formatDateToPattern("YYYY-MM-DD",new Date(new Number(value)));
	}
	if (dataIndex == 'status') {
		return storeFind(signStatusStore, value);
	}
	if (dataIndex == 'modified') {
		return formatDateToPattern("YYYY-MM-DD",new Date(new Number(value)));
	}
	if (dataIndex == 'addr') {
		cellmeta.attr = "ext:qtip= '"+value+"'";
	}
	
	return value;
};
com.jsjn.jnf.member.QryNewBussnessMgr.amend = function(){
	var record = Ext.getCmp('grid.qryNewbusness').getSelectionModel().getSelected();
	var mid = record.data.mid;
	window.location.replace(appConfig.baseUrl+"/com.jsjn.jnf.member.AmendBusnessMgr.view?mid='"+mid+"'");
	/*window.location = appConfig.baseUrl+"/com.jsjn.jnf.member.AmendBusnessMgr.view?mid='"+mid+"'";*/
};

/**
 * 查询商户信息
 */
com.jsjn.jnf.member.QryNewBussnessMgr.qryNewBuness = function(button, e){
	com.jsjn.jnf.member.QryNewBussnessMgr.addParams();
	Ext.getCmp('grid.qryNewbusness').getStore().load();
};

/**
 * 跳转新增页面
 */
com.jsjn.jnf.member.QryNewBussnessMgr.btnAdd = 	function(button,
		event){
	window.location.replace(appConfig.baseUrl+"/com.jsjn.jnf.member.CreateBusnessMgr.view");
};