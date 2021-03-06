/**
 * generated by JNGU-2012-ExtPlugins.
 * please  write here  com.jsjn.jnf.member.AmendBusnessMgr's method:
 * Javascript class static method be used as ExtJs's event method handler,like 'com.jsjn.jnf.member.AmendBusnessMgr.method(); this is Class static method'
 * Javasctipt object method be used as get or set object's properties,like 'com.jsjn.jnf.member.AmendBusnessMgr.prototype.method(); this is object's method'
 * com.jsjn.jnf.member.AmendBusnessMgr.PANEL is com.jsjn.jnf.member.AmendBusnessMgr's  Singleton instance object .
 * you can get com.jsjn.jnf.member.AmendBusnessMgr.PANEL's reference  by appfram.getInstance('com.jsjn.jnf.member.AmendBusnessMgr'). 
 */
appframe.afterInstance("com.jsjn.jnf.member.AmendBusnessMgr",function() {
	   var mid = appConfig.Param.mid;
	   if(mid.indexOf("'")>=0){
		   mid = mid.substring(1,mid.length-1);
	   }
	   com.jsjn.jnf.member.AmendBusnessMgr.initAjax(mid);
});

com.jsjn.jnf.member.AmendBusnessMgr.amendExit = function(button, event){
	window.location.replace(appConfig.baseUrl+"/com.jsjn.jnf.member.QryNewBussnessMgr.view");
};

com.jsjn.jnf.member.AmendBusnessMgr.amendSave = function(button, event){
	com.jsjn.jnf.member.AmendBusnessMgr.amendAjax();
};

com.jsjn.jnf.member.AmendBusnessMgr.amendAjax = function(){
	var mid = Ext.getCmp('mid.amendBusness').getValue();
	var mName = Ext.getCmp('mName.amendBusness').getValue();
	var busLcnsNo = Ext.getCmp('busLcnsNo.amendBusness').getValue();
	var phoneNo = Ext.getCmp('phoneNo.amendBusness').getValue();
	var addr = Ext.getCmp('addr.amendBusness').getValue();
	var status = "";
	if(Ext.getCmp('status.noraml').checked){
		status = 1;
	}else{
		status =2;
	}
	var appKey = Ext.getCmp('appKey.amendBusness').getValue();
	var whiteList = Ext.getCmp('whiteList.amendBusness').getValue();
	var rsaPubKey = Ext.getCmp('rsaPubKey.amendBusness').getValue();
	var myCheckboxGroup = Ext.getCmp('group.checkbox').items;
	   var cbitems = myCheckboxGroup.items;    
	   var roles = [];
    for (var i = 0; i < cbitems.length; i++) {    
 	   if(cbitems[i].checked){
 		   roles.push(cbitems[i].name);
 	   }
    } 
	Ext.Ajax.request({
	    params : {
	        mid :mid,
	        mName:mName,
	        busLcnsNo:busLcnsNo,
	        phoneNo:phoneNo,
	        addr:addr,
	        status:status,
	        appkey:appKey,
	        whiteList:whiteList,
	        rsaPubKey:rsaPubKey,
	        roles:roles.join(",").toString()
	    },
	    method : "POST",
	    url : appConfig.baseUrl + '/jnf/qryNewBusness.do?method=amendBusness',
	    success : function(response) {
	        var result = Ext.decode(response.responseText);
	        if (result.success) {
	        	 Ext.MessageBox.alert('提示', result.infoMsg);
	        	 window.location.replace(appConfig.baseUrl+"/com.jsjn.jnf.member.QryNewBussnessMgr.view");
	        } else {
	            Ext.MessageBox.alert('提示', result.infoMsg);
	        }
	    }
	});
};
com.jsjn.jnf.member.AmendBusnessMgr.initAjax = function(mid){
	Ext.Ajax.request({
	    params : {
	        mid :mid
	    },
	    method : "POST",
	    url : appConfig.baseUrl + '/jnf/qryNewBusness.do?method=qryBusnessAll',
	    success : function(response) {
	        var result = Ext.decode(response.responseText);
	        if (result.success) {
	        	//查询商户的信息
	        	Ext.getCmp('mid.amendBusness').setValue(result.busness.mid);
	        	Ext.getCmp('mName.amendBusness').setValue(result.busness.mName);
	        	Ext.getCmp('busLcnsNo.amendBusness').setValue(result.busness.busLcnsNo);
	        	Ext.getCmp('phoneNo.amendBusness').setValue(result.busness.phoneNo);
	        	Ext.getCmp('addr.amendBusness').setValue(result.busness.addr);
	        	var statu = result.busness.status;
	        	if(statu==1){
	        		Ext.getCmp('status.noraml').setValue(true);
	        	}else{
	        		Ext.getCmp('status.lock').setValue(true);
	        	}
	        	Ext.getCmp('appKey.amendBusness').setValue(result.busnessCfg.appkey);
	        	Ext.getCmp('whiteList.amendBusness').setValue(result.busnessCfg.whiteList);
	        	Ext.getCmp('rsaPubKey.amendBusness').setValue(result.busnessCfg.rsaPubKey);
	        	//权限的信息
	        	var data = result.perList;
	        	var myCheckboxItems = [];    
	        	for(var i=0;i<data.length;i++){
	        		  var boxLabel = data[i].desc;
		                var name = data[i].rid;
		                myCheckboxItems.push({    
		                            boxLabel : boxLabel,    
		                            name : name    
		                        });    
	        	}
	        	var myCheckboxGroup = new Ext.form.CheckboxGroup({    
	                xtype : 'checkboxgroup',    
	                itemCls : 'x-check-group-alt',
	                id:'group.checkbox',
	                name :'insTypeCb', 
	                msgTarget:"side",
	                columns:5,
	                anchor:'60%',
	                layout : 'form',
	               msgTarget:"side",
	                items : myCheckboxItems    
	            });    
	        	var panel = Ext.getCmp('pan.checkbox');
	        	panel.add(myCheckboxGroup);
	        	panel.doLayout();
	    		var myCheckboxGroup = Ext.getCmp('group.checkbox').items;
	    		   var cbitems = myCheckboxGroup.items;    
	    		   var list = result.list;
	    	       for (var i = 0; i < cbitems.length; i++) {    
	    	    	   for(var j=0;j<list.length;j++){
	    	    		   if(cbitems[i].name==list[j].rid){
	    	    			   cbitems[i].setValue(true);
	    	    			   break;
	    	    		   }
	    	    	   }
	    	/*           if (cbitems[i].checked) {    
	    	        	   alert(cbitems[i].name);
//	    	               ids.push(cbitems.itemAt(i).name);    
	    	           }    */
	    	       } 
	        	/* var ids = [];    
                 var cbitems = myCheckboxGroup.items;    
                 for (var i = 0; i < cbitems.length; i++) {    
                     if (cbitems.itemAt(i).checked) {    
                         ids.push(cbitems.itemAt(i).name);    
                     }    
                 }    */
	        } else {
	            Ext.MessageBox.alert('提示', result.errMsg);
	        }
	    }
	});
};

