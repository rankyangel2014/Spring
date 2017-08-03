package com.jsjn.jnf.common.utils.network;

import java.net.URL;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.xfire.client.Client;

public class WebServiceUtil {


	/**
	 * 调用征信系统webService
	 * 
	 * @param type
	 *            字典表中的type
	 * @param methodName
	 *            方法名称
	 * @param params
	 *            参数列表
	 * @return
	 * @throws Exception
	 */
	public static String invoke(String wsUrl, String userName,String password ,String methodName, Object[] params)
			throws Exception {
		URL url = null;
		Client client = null;
		Object[] result = null;
		if (StringUtils.isNoneBlank(wsUrl)) {
			url = new URL(wsUrl);
			client = new Client(url);
			client.addOutHandler(new WsClientHandler(userName,password));
			result = client.invoke(methodName, params);
			if (ArrayUtils.isNotEmpty(result)) {
				return (String) result[0];
			} else {
				return null;
			}
		}
		return null;
	}
}
