/**
 * generated by JNGU-2012-ExtPlugins.
 * please  write here  com.jsjn.jnf.test.Test's method:
 * Javascript class static method be used as ExtJs's event method handler,like 'com.jsjn.jnf.test.Test.method(); this is Class static method'
 * Javasctipt object method be used as get or set object's properties,like 'com.jsjn.jnf.test.Test.prototype.method(); this is object's method'
 * com.jsjn.jnf.test.Test.PANEL is com.jsjn.jnf.test.Test's  Singleton instance object .
 * you can get com.jsjn.jnf.test.Test.PANEL's reference  by appfram.getInstance('com.jsjn.jnf.test.Test'). 
 */
appframe.afterInstance("com.jsjn.jnf.test.Test",function(){

});

com.jsjn.jnf.test.Test.loanInfoTest = function(button, event){
	var reqUrl = "MLoanAction.do";
    var params = {
		method: 'getLoanInfoList'
	};
	ajaxLoad(reqUrl, params, function(response) {
		var respData = Ext.decode(response.responseText);
		if (respData.success){
			Ext.Msg.alert('系统提示','接口调用成功！');
			console.log(respData);
		} else {
			Ext.Msg.alert('系统提示','接口调用失败！');
		}
	});
};