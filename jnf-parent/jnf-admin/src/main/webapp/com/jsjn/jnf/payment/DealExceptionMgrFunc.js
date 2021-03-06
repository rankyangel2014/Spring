/**
 * generated by JNGU-2012-ExtPlugins.
 * please  write here  com.jsjn.jnf.payment.DealExceptionMgr's method:
 * Javascript class static method be used as ExtJs's event method handler,like 'com.jsjn.jnf.payment.DealExceptionMgr.method(); this  is Class static method'
 * Javasctipt object method be used as get or set object's properties,like 'com.jsjn.jnf.payment.DealExceptionMgr.prototype.method(); this is object's method'
 * com.jsjn.jnf.payment.DealExceptionMgr.main method is the beginning of all.
 * com.jsjn.jnf.payment.DealExceptionMgr.WINDOW  iscom.jsjn.jnf.payment.DealExceptionMgr's  Singleton instance object .
 * you can get com.jsjn.jnf.payment.DealExceptionMgr.WINDOW reference  by appfram.getInstance('com.jsjn.jnf.payment.DealExceptionMgr'). 
 */
appframe.afterInstance("com.jsjn.jnf.payment.DealExceptionMgr", function() {
	
});

com.jsjn.jnf.payment.DealExceptionMgr.panelInit = function(record){
	com.jsjn.jnf.payment.DealExceptionMgr.orderNo = record.data.orderNo;			//支付订单编号
};

/**
 * 支付成功
 */
com.jsjn.jnf.payment.DealExceptionMgr.success = function(){
	com.jsjn.jnf.payment.DealExceptionMgr.deal('2');
};

/**
 * 支付失败
 */
com.jsjn.jnf.payment.DealExceptionMgr.fail = function(){
	com.jsjn.jnf.payment.DealExceptionMgr.deal('9');
};

/**
 * 异常处理
 */
com.jsjn.jnf.payment.DealExceptionMgr.deal = function(status){
	var orderNo =  com.jsjn.jnf.payment.DealExceptionMgr.orderNo;
	var exception = Ext.getCmp('exception.DealExceptionMgr').getValue();
	
	if(valueIsEmpty(orderNo)){
		Ext.Msg.alert('系统提示', '支付订单号不能为空!');
		return false;
	}
	if(valueIsEmpty(status)){
		Ext.Msg.alert('系统提示', '支付状态不能为空!');
		return false;
	}
	if(valueIsEmpty(exception)){
		Ext.Msg.alert('系统提示', '异常原因不能为空!');
		return false;
	}
	
	var url = '/jnf/paymentService.do?method=dealException';
	var param = {
				'orderNo':orderNo,
				'status':status,
				'failReason':exception
				};
	ajaxLoad(url, param, '', '', '', function(response) {
		var success = Ext.decode(response.responseText).success;
		var resMsg = Ext.decode(response.responseText).resMsg;
		var temp = Ext.decode(response.responseText).root;
		if(temp){
			Ext.getCmp('grid.QryPaymentExceptionListMgr')
				.getStore().reload();
			Ext.Msg.alert("系统提示", "异常处理成功！", function() {
				com.jsjn.jnf.payment.DealExceptionMgr
					.WINDOW.hide();
					});
		}else{
			Ext.Msg.alert("系统提示", "异常处理失败！"+resMsg, function(){});
		}
	
	});
};


/**
 * 关闭
 */
com.jsjn.jnf.payment.DealExceptionMgr.close = function(){
	com.jsjn.jnf.payment.DealExceptionMgr.WINDOW.hide();
};