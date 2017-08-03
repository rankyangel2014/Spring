/**
 * generated by JNGU-2012-ExtPlugins.
 * please  write here  com.jsjn.jnf.member.QryBussinessListMgr's method:
 * Javascript class static method be used as ExtJs's event method handler,like 'com.jsjn.jnf.member.QryBussinessListMgr.method(); this is Class static method'
 * Javasctipt object method be used as get or set object's properties,like 'com.jsjn.jnf.member.QryBussinessListMgr.prototype.method(); this is object's method'
 * com.jsjn.jnf.member.QryBussinessListMgr.PANEL is com.jsjn.jnf.member.QryBussinessListMgr's  Singleton instance object .
 * you can get com.jsjn.jnf.member.QryBussinessListMgr.PANEL's reference  by appfram.getInstance('com.jsjn.jnf.member.QryBussinessListMgr'). 
 */
appframe.afterInstance("com.jsjn.jnf.member.QryBussinessListMgr",function() {
		girdStoreAddExceptionEvent('grid.QryBussinessListMgr',
		"com.jsjn.jnf.member.QryBussinessListMgr");
		
		//渲染下拉框
		Ext.apply(Ext.getCmp('status.QryBussinessListMgr'), {
			store : signStatusStore.getStore()
		});	
		
});

com.jsjn.jnf.member.QryBussinessListMgr.addParams = function() {
	var mid = Ext.getCmp('mid.QryBussinessListMgr').getValue();	//商户号
	var mName = Ext.getCmp('mName.QryBussinessListMgr').getValue();	//商户名称
	var status = Ext.getCmp('status.QryBussinessListMgr').getValue(); //状态

	var params = {
		mid : mid,
		mName : mName,
		status : status
	};
	
	var gStore = Ext.getCmp('grid.QryBussinessListMgr').getStore();
	// 判断grid的store中存在查询参数和查询结果
	if (undefined != gStore && gStore.getCount() > 0) {
		gStore.removeAll(); // 清空表格store中的查询参数
	}
	gStore.baseParams = params;

};

/**
 *点击查询按钮 
 */
com.jsjn.jnf.member.QryBussinessListMgr.btnQuery = function() {
	var mid = Ext.getCmp('mid.QryBussinessListMgr').value;	//商户号
	var mName = Ext.getCmp('mName.QryBussinessListMgr').value;	//商户名称
	var status = 	 Ext.getCmp('status.QryBussinessListMgr').getValue(); //状态
	Ext.getCmp('grid.QryBussinessListMgr').getStore().load();

};

/**
 *点击重置按钮 
 */
com.jsjn.jnf.member.QryBussinessListMgr.btnReset = function() {
	Ext.getCmp('form.QryBussinessListMgr').getForm().reset();
};

com.jsjn.jnf.member.QryBussinessListMgr.gridRender = function(value, cellmeta,
		record, rowIndex, columnIndex, store) {
	var dataIndex = Ext.getCmp("grid.QryBussinessListMgr").getColumnModel()
			.getDataIndex(columnIndex);
	if (dataIndex == 'cplsh') {
		return rowIndex + 1;
	}
	if (dataIndex == 'operator') {
		var operater = "";
		operater += "<a href=\"#\" onclick=\"com.jsjn.jnf.member.QryBussinessListMgr.update();\" style=\"vertical-align:bottom; text-decoration:none\">【修改】</a>";
		operater += "<a href=\"#\" onclick=\"com.jsjn.jnf.member.QryBussinessListMgr.auth();\" style='vertical-align:bottom; text-decoration:none'>【权限】</a>";
		operater += "<a href=\"#\" onclick=\"com.jsjn.jnf.member.QryBussinessListMgr.config();\" style='vertical-align:bottom; text-decoration:none'>【接入配置】</a>";
		operater += "<a href=\"#\" onclick=\"com.jsjn.jnf.member.QryBussinessListMgr.regInvest();\" style='vertical-align:bottom; text-decoration:none'>【创建投资人】</a>";
		operater += "<a href=\"#\" onclick=\"com.jsjn.jnf.member.QryBussinessListMgr.feeConfig();\" style='vertical-align:bottom; text-decoration:none'>【计费参数配置】</a>";
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


/**
 * 
 * 新增按钮
 * 
 * 
 */
com.jsjn.jnf.member.QryBussinessListMgr.btnAdd = function(){
	
	var win = appframe.getInstance("com.jsjn.jnf.member.AddBussinessMgr");

	win.show();
	
	//清空新增 信息
	Ext.getCmp('form.AddBussinessMgr').getForm().reset();
	
};

/**
 * 
 * 修改按钮
 * 
 * 
 */
com.jsjn.jnf.member.QryBussinessListMgr.update = function(){
	
	var record = Ext.getCmp('grid.QryBussinessListMgr').getSelectionModel().getSelected();
	
	var win = appframe.getInstance("com.jsjn.jnf.member.UpdateBussinessMgr");
	
	win.show();
	
	com.jsjn.jnf.member.UpdateBussinessMgr.panelInit(record);
	
};

/**
 * 
 * 权限配置按钮
 * 
 * 
 */
com.jsjn.jnf.member.QryBussinessListMgr.auth = function(){
	
	var record = Ext.getCmp('grid.QryBussinessListMgr').getSelectionModel().getSelected();
	
	var win = appframe.getInstance("com.jsjn.jnf.member.AuthorityConfigMgr");
	
	win.show();
	
	com.jsjn.jnf.member.AuthorityConfigMgr.panelInit(record);
	
};

/**
 * 
 * 接入配置按钮
 * 
 * 
 */
com.jsjn.jnf.member.QryBussinessListMgr.config = function(){
	
	var record = Ext.getCmp('grid.QryBussinessListMgr').getSelectionModel().getSelected();
	
	var win = appframe.getInstance("com.jsjn.jnf.member.AccessConfigMgr");
	
	win.show();
	
	com.jsjn.jnf.member.AccessConfigMgr.panelInit(record);
	
};

/**
 * 
 * 创建投资人
 * 
 * 
 */
com.jsjn.jnf.member.QryBussinessListMgr.regInvest = function(){
	
	var record = Ext.getCmp('grid.QryBussinessListMgr').getSelectionModel().getSelected();
	
	var win = appframe.getInstance("com.jsjn.jnf.member.RegInvestMgr");
	
	win.show();
	
	com.jsjn.jnf.member.RegInvestMgr.panelInit(record);
	
};

/**
 * 
 * 创建投资人
 * 
 * 
 */
com.jsjn.jnf.member.QryBussinessListMgr.feeConfig = function(){
	
	var record = Ext.getCmp('grid.QryBussinessListMgr').getSelectionModel().getSelected();
	
	var win = appframe.getInstance("com.jsjn.jnf.config.FeeConfigListMgr");
	
	win.show();
	
	com.jsjn.jnf.config.FeeConfigListMgr.panelInit(record);
	
};


