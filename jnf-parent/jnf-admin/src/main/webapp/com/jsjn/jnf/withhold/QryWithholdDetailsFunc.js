/**
 * generated by JNGU-2012-ExtPlugins.
 * please  write here  com.jsjn.jnf.withhold.QryWithholdDetails's method:
 * Javascript class static method be used as ExtJs's event method handler,like 'com.jsjn.jnf.withhold.QryWithholdDetails.method(); this  is Class static method'
 * Javasctipt object method be used as get or set object's properties,like 'com.jsjn.jnf.withhold.QryWithholdDetails.prototype.method(); this is object's method'
 * com.jsjn.jnf.withhold.QryWithholdDetails.main method is the beginning of all.
 * com.jsjn.jnf.withhold.QryWithholdDetails.WINDOW  iscom.jsjn.jnf.withhold.QryWithholdDetails's  Singleton instance object .
 * you can get com.jsjn.jnf.withhold.QryWithholdDetails.WINDOW reference  by appfram.getInstance('com.jsjn.jnf.withhold.QryWithholdDetails'). 
 */

com.jsjn.jnf.withhold.QryWithholdDetails.detail = function(record) {
	com.jsjn.jnf.withhold.QryWithholdDetails
			.qryDetail(record.data.signRecordId);
};

com.jsjn.jnf.withhold.QryWithholdDetails.qryDetail = function(signRecordId) {
	Ext.Ajax.request({
		params : {
			signRecordId : signRecordId
		},
		method : "POST",
		url : appConfig.baseUrl
				+ '/qryWithholdInfos.do?method=queryWithDetails',
		success : function(response) {
			var result = Ext.decode(response.responseText);
			if (result.success) {
				var state = storeFind(withholdSignState, result.state);
				var channel = storeFind(withhold, result.channel);
				Ext.getCmp('with.mid').setValue(result.mname);
				Ext.getCmp('with.userName').setValue(result.userName);
				Ext.getCmp('with.signNO').setValue(result.aid);
				Ext.getCmp('with.state').setValue(state);
				Ext.getCmp('with.channel').setValue(channel);
				Ext.getCmp('with.signTime').setValue(
						formatDateToPattern("YYYY-MM-DD hh:mm:ss", new Date(
								result.created)));
				Ext.getCmp('with.insttuName').setValue(result.userName);
				Ext.getCmp('with.custId').setValue(result.bindAccNo);
				Ext.getCmp('with.inschannel').setValue(channel);
				var ids = result.idFiles.split("|");
				var sign = result.signFiles;
				if(sign.indexOf("|")>-1){
					var signs = sign.split["|"];
					sign = signs[0];
				}
				var id1 = ids[0];
				var id2 = ids[1];
				var a = "<lable>协议附件：</lable><img src='" + appConfig.baseUrl
						+ "/fileServer.do?method=getfile&filepath=" + sign
						+ "' width ='110' height='110' style='margin-left:35px;'/>";
				var panel = Ext.getCmp('signPanel');
				panel.body.update(a);
				Ext.getCmp('with.custName').setValue(result.custName);
				Ext.getCmp('with.cardNo').setValue(result.cardNo);
				Ext.getCmp('with.mobile').setValue(result.mobile);

				var az = "<lable>身份证正反照片：</lable><img src='" + appConfig.baseUrl
						+ "/fileServer.do?method=getfile&filepath=" + id1
						+ "' width ='180' height='125' style='margin-left:35px;'/>";
				var af = "<img src='" + appConfig.baseUrl
						+ "/fileServer.do?method=getfile&filepath=" + id2
						+ "' width ='180' height='125'  style='margin-left:50px;'/>";
				var idz = Ext.getCmp('idNoz');
				var idf = Ext.getCmp('idNof');
				idz.body.update(az);
				idf.body.update(af);
				Ext.getCmp('with.loanNo').setValue   (result.loanNo);
				Ext.getCmp('with.contNo').setValue(result.contNo);
				Ext.getCmp('with.repayType').setValue(result.repayType);
				var money = "";
				if (result.osPrcp != "") {
					money = parseFloat(result.osPrcp);
				}
				Ext.getCmp('with.osPrcp').setValue(money.toFixed(2));
			}
		}
	});
};