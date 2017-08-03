/**
 * generated by JNGU-2012-ExtPlugins.
 * please  write here  com.jsjn.jnf.payment.QryPaymentListMgr's method:
 * Javascript class static method be used as ExtJs's event method handler,like 'com.jsjn.jnf.payment.QryPaymentListMgr.method(); this is Class static method'
 * Javasctipt object method be used as get or set object's properties,like 'com.jsjn.jnf.payment.QryPaymentListMgr.prototype.method(); this is object's method'
 * com.jsjn.jnf.payment.QryPaymentListMgr.PANEL is com.jsjn.jnf.payment.QryPaymentListMgr's  Singleton instance object .
 * you can get com.jsjn.jnf.payment.QryPaymentListMgr.PANEL's reference  by appfram.getInstance('com.jsjn.jnf.payment.QryPaymentListMgr'). 
 */

appframe.afterInstance("com.jsjn.jnf.payment.QryPaymentListMgr",function() {
		girdStoreAddExceptionEvent('grid.QryPaymentListMgr',
		"com.jsjn.jnf.payment.QryPaymentListMgr");
		
		Ext.getCmp('grid.QryPaymentListMgr').getView().getRowClass=function(record,rowIndex,rowParams,store){
		    var valid = record.json.valid;
		    
			if(valid == false){
				return 'x-grid-record-red';
			};
		};
		
});

com.jsjn.jnf.payment.QryPaymentListMgr.addParams = function() {
	var orderNo = Ext.getCmp('orderNo.QryPaymentListMgr').getValue();	//支付订单编号
	var payAccount = Ext.getCmp('payAccount.QryPaymentListMgr').getValue();	//付款账号
	var amountMin = Ext.getCmp('amountMin.QryPaymentListMgr').getValue(); //支付金额（起）
	var amountMax = Ext.getCmp('amountMax.QryPaymentListMgr').getValue(); //支付金额（止）
	var modifiedMin = Ext.getCmp('modifiedMin.QryPaymentListMgr').getRawValue(); //支付时间（起）
	var modifiedMax = Ext.getCmp('modifiedMax.QryPaymentListMgr').getRawValue(); //支付时间（止）

	
	if( amountMin != '' && amountMax != '' && amountMin > amountMax){
		Ext.Msg.alert('系统提示', '支付金额（起）不能大于支付金额（止）');
		return false;
	}
	if( modifiedMin != '' && modifiedMax != '' && modifiedMin > modifiedMax){
		Ext.Msg.alert('系统提示', '支付时间（起）不能大于支付时间（止）');
		return false;
	}
	
	var params = {
		orderNo : orderNo,
		payAccount : payAccount,
		amountMin : amountMin,
		amountMax : amountMax,
		modifiedMin : modifiedMin,
		modifiedMax : modifiedMax
	};
	
	var gStore = Ext.getCmp('grid.QryPaymentListMgr').getStore();
	// 判断grid的store中存在查询参数和查询结果
	if (undefined != gStore && gStore.getCount() > 0) {
		gStore.removeAll(); // 清空表格store中的查询参数
	}
	gStore.baseParams = params;

};

com.jsjn.jnf.payment.QryPaymentListMgr.gridRender = function(value, cellmeta,
		record, rowIndex, columnIndex, store) {
	
	var valid = record.json.valid;//数据是否被篡改
	
	var dataIndex = Ext.getCmp("grid.QryPaymentListMgr").getColumnModel()
			.getDataIndex(columnIndex);
	if (dataIndex == 'cplsh') {
		return rowIndex + 1;
	}
	if (dataIndex == 'operator') {
		var operater = "";
		if(valid == true){
			operater += "<a href=\"#\" onclick=\"com.jsjn.jnf.payment.QryPaymentListMgr.detail();\" style=\"vertical-align:bottom; text-decoration:none\">【详情】</a>";
		}else{
			operater += "警告：数据被篡改";
		}
		return operater;
	}
	if (dataIndex == 'amount') {
		return formatMoney(value);
	}
	if (dataIndex == 'status') {
		return storeFind(paymentStatusStore, value);
	}
	if (dataIndex == 'modified') {
		return value.substr(0,10);
	}
	if (dataIndex == 'channel') {
		return storeFind(paymentChannelStore, value);
	}
	if (dataIndex == 'failReason') {
		cellmeta.attr = "ext:qtip= '"+value+"'";
	}
	
	return value;
};


/**
 * 点击查询按钮
 */
com.jsjn.jnf.payment.QryPaymentListMgr.btnQuery = function(){

	Ext.getCmp('grid.QryPaymentListMgr').getStore().load();
};

/**
 * 点击重置按钮
 */
com.jsjn.jnf.payment.QryPaymentListMgr.btnReset = function(){
	Ext.getCmp('form.QryPaymentListMgr').getForm().reset();
};

/**
 * 详情按钮
 */
com.jsjn.jnf.payment.QryPaymentListMgr.detail = function(){
	var record = Ext.getCmp('grid.QryPaymentListMgr').getSelectionModel().getSelected();
	
	var win = appframe.getInstance("com.jsjn.jnf.payment.PaymentInfoDetailMgr");
	
	win.show();
	
	com.jsjn.jnf.payment.PaymentInfoDetailMgr.panelInit(record);
};