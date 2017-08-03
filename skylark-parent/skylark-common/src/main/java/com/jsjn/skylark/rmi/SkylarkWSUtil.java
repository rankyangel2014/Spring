package com.jsjn.skylark.rmi;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.codehaus.xfire.client.Client;
import org.codehaus.xfire.client.XFireProxyFactory;
import org.codehaus.xfire.service.Service;
import org.codehaus.xfire.service.binding.ObjectServiceFactory;

import com.jsjn.pubsys.webservice.IService;
import com.jsjn.pubsys.workflow.po.LoiWfexamideareg;
import com.jsjn.skylark.properties.SkylarkProperties;

public class SkylarkWSUtil {

	private static String MobileServiceURL = SkylarkProperties.get("pubsys")
			+ "/Services/MobileAppService.Service?wsdl";
	private static String CommonServiceURL = SkylarkProperties.get("pubsys")
			+ "/Services/CommonXfire.Service?wsdl";
	private final static Logger LOGGER = Logger.getLogger(SkylarkWSUtil.class);

	/** 查询提醒总览，group by event_type */
	public static final int SqlQuerySysinfoGroup = 0;
	/** 查询某类提醒 */
	public static final int SqlQuerySysinfoList = 1;
	/** 更新提醒状态 */
	public static final int SqlUpdateSysinfoStat = 2;
	/** 查询待办总览，group by flow_type */
	public static final int SqlQueryExamGroup = 3;
	/** 查询某类代办 */
	public static final int SqlQueryExamList = 4;
	/** 查询系统公告 */
	public static final int SqlQuerySysNotice = 5;
	/** app首页查询代办和提醒的数量 */
	public static final int SqlQueryCount = 6;

	private static String invoke(String url, String methodName, Object[] args) {
		Client client;
		try {
			client = new Client(new URL(url));
			Object[] xml = client.invoke(methodName, args);
			return String.valueOf(xml[0]);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			throw new RuntimeException(e);
		}
	}

	/**
	 * 调用pubsys的ws来做登录验证
	 * 
	 * @param deviceId
	 *            设备号
	 * @param loginId
	 *            登录号
	 * @param password
	 *            密码
	 * @param type
	 *            登录方式
	 * @param modId
	 *            系统编号
	 * @param smsFlag
	 * @param token
	 * @param IPAddress
	 * @param sessionId
	 * @return
	 */
	public static String login(String loginId, String pwd, String smcode,
			String deviceId, String type, String modId, String smsFlag,
			String token, String IPAddress, String sessionId) {
		return SkylarkWSUtil.invoke(SkylarkWSUtil.MobileServiceURL, "login2",
				new Object[] { loginId, pwd, smcode, deviceId, type, modId,
						smsFlag, token, IPAddress, sessionId });
	}

	public static String getWDJGInfo(String insttuId) {
		String rsp = SkylarkWSUtil.invoke(SkylarkWSUtil.CommonServiceURL,
				"getWDJGInfo", new Object[] { insttuId });
		return rsp;
	}

	public static String getWDUserInfo(String userId) {
		String rsp = SkylarkWSUtil.invoke(SkylarkWSUtil.CommonServiceURL,
				"getWDUserInfo", new Object[] { userId });
		return rsp;
	}

	public static String sqlCommand(int cmd, String jsonParams) {
		String rsp = SkylarkWSUtil.invoke(SkylarkWSUtil.MobileServiceURL,
				"sqlCommand", new Object[] { cmd, jsonParams });
		return rsp;
	}

	public static String ideal(String userId, String taskinstanceid) {
		String rsp = SkylarkWSUtil.invoke(SkylarkWSUtil.MobileServiceURL,
				"ideal", new Object[] { userId, taskinstanceid });
		return rsp;
	}

	public static String removeDeviceId(String userId) {
		String rsp = SkylarkWSUtil.invoke(SkylarkWSUtil.MobileServiceURL,
				"removeDeviceId", new Object[] { userId });
		return rsp;
	}

	public static String register(String userId, String deviceId,
			String deviceType, String token, String sysId) {
		String rsp = SkylarkWSUtil.invoke(SkylarkWSUtil.MobileServiceURL,
				"register", new Object[] { userId, deviceId, deviceType, token,
						sysId });
		return rsp;
	}

	public static void feedback(String recId, String userId, String topicId,
			String period) {
		SkylarkWSUtil.invoke(SkylarkWSUtil.MobileServiceURL, "feedback",
				new Object[] { recId, userId, topicId, period });
	}

	public static String setTop(String userId, String msgId, String msgTy,
			String operFlag) {
		String rsp = SkylarkWSUtil.invoke(SkylarkWSUtil.MobileServiceURL,
				"setTop", new Object[] { userId, msgId, msgTy, operFlag });
		return rsp;
	}

	public static String getApprHistory(String orgNo, String userId,
			String param, String flowType) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("orgNo", orgNo);
		map.put("userId", userId);
		map.put("param", param);
		map.put("flowType", flowType);
		String rsp = SkylarkWSUtil.invoke(SkylarkWSUtil.CommonServiceURL,
				"getLoiWfexamideareqList", new Object[] { map });
		return rsp;
	}

	public static List<LoiWfexamideareg> getApprHistory(Map map) {
		List<LoiWfexamideareg> resutList = new ArrayList<LoiWfexamideareg>();
		Service serviceModel = new ObjectServiceFactory()
				.create(IService.class);
		IService service = null;
		try {
			service = (IService) new XFireProxyFactory().create(serviceModel,
					SkylarkWSUtil.CommonServiceURL.split("\\?")[0]);
			resutList = service.getLoiWfexamideareqList(map);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return resutList;
	}

	/**
	 * 与公共管理平台交互设置手势密码
	 * 
	 * @param userId
	 * @param deviceId
	 * @param ipAddress
	 * @param sessionId
	 * @param graphicPwd
	 * @return
	 */
	public static String setGraphicPwd2(String userId, String deviceId,
			String ipAddress, String sessionId, String graphicPwd) {
		JSONObject json = new JSONObject();
		json.put("userId", userId);
		json.put("deviceId", deviceId);
		json.put("ipAddress", ipAddress);
		json.put("sessionId", sessionId);
		json.put("graphicPwd", graphicPwd);
		return SkylarkWSUtil.invoke(SkylarkWSUtil.MobileServiceURL,
				"setGraphicPwd2", new Object[] { json.toString() });

	}

	/**
	 * 与公共管理平台交互登陆,包含了手势密码登陆
	 * 
	 * @param loginId
	 * @param pwd
	 * @param smcode
	 * @param deviceId
	 * @param type
	 * @param modId
	 * @param smsFlag
	 * @param token
	 * @param IPAddress
	 * @param sessionId
	 * @return
	 */
	public static String login2(String loginId, String pwd, String smcode,
			String deviceId, String type, String modId, String smsFlag,
			String token, String iPAddress, String sessionId) {
		JSONObject json = new JSONObject();
		json.put("loginId", StringUtils.defaultIfEmpty(loginId, ""));
		json.put("pwd", StringUtils.defaultIfEmpty(pwd, ""));
		json.put("smcode", StringUtils.defaultIfEmpty(smcode, ""));
		json.put("deviceId", StringUtils.defaultIfEmpty(deviceId, ""));
		json.put("type", StringUtils.defaultIfEmpty(type, ""));
		json.put("modId", StringUtils.defaultIfEmpty(modId, ""));
		json.put("smsFlag", StringUtils.defaultIfEmpty(smsFlag, ""));
		json.put("token", StringUtils.defaultIfEmpty(token, ""));
		json.put("IPAddress", StringUtils.defaultIfEmpty(iPAddress, ""));
		json.put("sessionId", StringUtils.defaultIfEmpty(sessionId, ""));
		return SkylarkWSUtil.invoke(SkylarkWSUtil.MobileServiceURL, "login2",
				new Object[] { json.toString() });
	}
}
