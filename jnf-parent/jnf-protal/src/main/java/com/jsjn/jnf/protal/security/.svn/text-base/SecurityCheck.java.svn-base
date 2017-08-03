package com.jsjn.jnf.protal.security;

import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.jsjn.jnf.bean.dto.assist.ApiRoleCtrlDto;
import com.jsjn.jnf.bean.dto.assist.ApiRoleDto;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.SecurityReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.security.FlowControl;
import com.jsjn.jnf.common.security.VerifyRSASign;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.HttpUtils;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.TimeUtils;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

/**
 * @author ZSMJ 安全性检测(包含PORTAL 和 OPEN)
 */
public class SecurityCheck {

	private final static Logger logger = Logger.getLogger(SecurityCheck.class);

	/**
	 * 验证规则：portal
	 */
	public final static String VERIFY_TYPE_PORTAL = "0";

	/**
	 * 验证规则：openapi
	 */
	public final static String VERIFY_TYPE_OPEN = "1";

	/**
	 * 获取商户配置信息
	 * 
	 * @param appKey
	 * @return
	 * @throws Exception
	 */
	public static JSONObject getBusinessConfig(String appkey) throws Exception {
		Result result = null;
		try {
			BizConfigDto config = new BizConfigDto();
			config.setAppkey(appkey);
			result = PandaClient2.invoke(SysConfigBean.REFRESH_CONFIG_SEC,
					Global.SERVICE_PANDA_ID,
					"queryBussinessConfig",
					config);
		} catch (Exception e) {
			logger.error("Panda远程调用获取商户公钥失败！" + e);
			throw new Exception("Panda远程调用获取商户公钥失败！" + e);
		}

		return JSONObject.fromObject(result.getResult());
	}

	/**
	 * 流控
	 * 
	 * @param request
	 * @return
	 */
	public static String
			verifyFlow(HttpServletRequest request, Hashtable<String, List<String>> table, List<String> list) {

		String clientIp = HttpUtils.getRemoteHost(request);
		String sessionId = request.getSession().getId();
		logger.info("本次访问的IP：" + clientIp + "本次访问的sessionId：" + sessionId);
		if (!FlowControl.validateOverFlowForIp(table,
				clientIp,
				SysConfigBean.ACC_MAX_COUNT_FOR_IP,
				SysConfigBean.COOLING_SEC_FOR_IP)) {
			logger.info("IP" + clientIp + "在60s内超过最大访问次数，且未超过冷却期，请求拒绝！");
			return SecurityReturnCode.SYS_BUSY.getCode();
		}

		if (!FlowControl.validateOverFlowForIp(table,
				sessionId,
				SysConfigBean.ACC_MAX_COUNT_FOR_IP,
				SysConfigBean.COOLING_SEC_FOR_IP)) {
			logger.info("SESSIONID" + sessionId + "在60s内超过最大访问次数，且未超过冷却期，请求拒绝！");
			return SecurityReturnCode.SYS_BUSY.getCode();
		}

		if (!FlowControl.validateOverFlowForSys(list,
				SysConfigBean.ACC_MAX_COUNT_FOR_SYS,
				SysConfigBean.COOLING_SEC_FOR_SYS)) {
			logger.info("全平台在60s内超过最大访问次数，且未超过冷却期，请求拒绝！");
			return SecurityReturnCode.SYS_BUSY.getCode();
		}
		return SecurityReturnCode.SUCCESS.getCode();
	}

	/**
	 * 校验工作时间
	 * 
	 * @return
	 */
	public static String verifyWorkingTime() {
		if (TimeUtils.timeInRange(SysConfigBean.NO_WORKING_START_TIME, SysConfigBean.NO_WORKING_END_TIME, true)) {
			logger.error("系统非工作时间" + SysConfigBean.NO_WORKING_START_TIME + "~" + SysConfigBean.NO_WORKING_END_TIME
					+ "请于工作时间访问，请求拒绝！！");
			return SecurityReturnCode.INVALID_WORKING_TIME.getCode();
		}
		return SecurityReturnCode.SUCCESS.getCode();
	}

	/**
	 * 时间戳验证
	 * 
	 * @param timeStamp
	 *            请求时间戳
	 * @return
	 */
	public static String verifyTimeStamp(String timeStamp) {
		long currentTimeStamp = System.currentTimeMillis();
		long timeStampLong = DateUtils.parseDate(timeStamp).getTime();
		if (timeStampLong < currentTimeStamp - SysConfigBean.EFFECTIVE_SEC * 1000
				|| timeStampLong > currentTimeStamp + SysConfigBean.EFFECTIVE_SEC * 1000) {
			logger.error("时间戳验证失败,当前时间戳" + currentTimeStamp + ",请求时间戳" + timeStampLong + "，请求拒绝！！");
			return SecurityReturnCode.INVALID_TIMESTAMP.getCode();
		}
		return SecurityReturnCode.SUCCESS.getCode();
	}

	/**
	 * 商户权限验证
	 * 
	 * @param mid
	 *            商户ID
	 * @param service
	 *            请求SERVICE名称
	 * @return
	 */
	public static String verifyApiRoleCtrl(String mid, String service) {
		Result result = null;
		try {
			ApiRoleCtrlDto apiRoleCtrl = new ApiRoleCtrlDto();
			ApiRoleDto apiRole = new ApiRoleDto();
			apiRole.setPermission(service);
			apiRoleCtrl.setMid(mid);
			apiRoleCtrl.setApiRole(apiRole);
			result = PandaClient2.invoke(SysConfigBean.REFRESH_CONFIG_SEC,
					Global.SERVICE_PANDA_ID,
					"validateRoleCtrl",
					apiRoleCtrl);

		} catch (Exception e) {
			logger.error("Panda远程调用获取商户权限失败！");
			return SecurityReturnCode.SYS_BUSY.getCode();
		}
		if (!Boolean.parseBoolean(result.getResult())) {
			logger.error("商户无此权限,请求拒绝！");
			return SecurityReturnCode.INVALID_ROLE_CTRL.getCode();
		}
		return SecurityReturnCode.SUCCESS.getCode();
	}

	/**
	 * 商户白名单验证
	 * 
	 * @param clientIp
	 *            商户客户端IP
	 * @param whiteList
	 *            白名单列表
	 * @return
	 */
	public static String verifyWhiteList(String clientIp, String whiteList) {
		if (!StringUtils.containSubStr(whiteList, clientIp, Global.IP_SPLIT_SEPARATOR)) {
			logger.error("非白名单商户，请求拒绝!" + clientIp);
			return SecurityReturnCode.INVALID_IP.getCode();
		}
		return SecurityReturnCode.SUCCESS.getCode();
	}

	/**
	 * 验证请求合法性(PROTOL/OPENAPI共有部分) 1、开关机认证 2、流量控制 3、非工作时间控制 4、商户公钥验签控制
	 * 5、时间戳认证控制（+/-60s） 6、商户权限认证 6、白名单验证
	 * 
	 * @param request
	 * @param verifyType
	 *            (0:protal 1:openAPI)
	 * @return
	 */
	public static String verify(HttpServletRequest request, String verifyType, Hashtable<String, List<String>> table,
			List<String> list) {
		logger.info("收到API请求...开始进行安全性校验...");
		/**
		 * 1、系统状态校验
		 */
		if (!SysConfigBean.PORTAL_CURRENT_STATUS.equals(TabsConstant.PORTAL_CURRENT_STATUS_ON.val())) {
			return SecurityReturnCode.SYSTEM_POWER_OFF.getCode();
		}
		/**
		 * 2、流控校验
		 */
		if (!verifyFlow(request, table, list).equals(SecurityReturnCode.SUCCESS.getCode())) {
			return SecurityReturnCode.SYS_BUSY.getCode();
		}

		/**
		 * 3、非工作时间控制
		 */
		if (!verifyWorkingTime().equals(SecurityReturnCode.SUCCESS.getCode())) {
			return SecurityReturnCode.INVALID_WORKING_TIME.getCode();
		}

		// 获取请求参数
		String reqXMLData = HttpUtils.getRequestData(request);
		logger.info("请求开始，输出请求报文" + reqXMLData);
		Map<String, String> map = null;
		try {
			map = VerifyRSASign.getBaseParamFromOpen(reqXMLData);
		} catch (Exception e) {
			return SecurityReturnCode.INVALID_PARAMS.getCode();
		}

		// 获取商户配置信息
		JSONObject businessConfig = null;
		try {
			businessConfig = getBusinessConfig(map.get("appkey").toString());
		} catch (Exception e) {
			return SecurityReturnCode.ERR_BUSINESS_CONFIG.getCode();
		}

		/**
		 * 4、公钥验签控制
		 */
		String publicKey = businessConfig.get("rsaPubKey").toString();
		if (!VerifyRSASign.verifySign(map, publicKey).equals(SecurityReturnCode.SUCCESS.getCode())) {
			return SecurityReturnCode.INVALID_SIGN.getCode();
		}

		/**
		 * 5、验证时间戳
		 */
		String timeStamp = map.get("timeStamp").toString();
		if (!verifyTimeStamp(timeStamp).equals(SecurityReturnCode.SUCCESS.getCode())) {
			return SecurityReturnCode.INVALID_TIMESTAMP.getCode();
		}

		/**
		 * 6、商户权限验证
		 */
		String mid = businessConfig.get("mid").toString();
		if (!verifyApiRoleCtrl(mid, map.get("service").toString()).equals(SecurityReturnCode.SUCCESS.getCode())) {
			return SecurityReturnCode.INVALID_ROLE_CTRL.getCode();
		}

		/**
		 * 7、白名单验证(OPENAPI)
		 */
		if (VERIFY_TYPE_OPEN.equalsIgnoreCase(verifyType)) {
			String clientIp = HttpUtils.getRemoteHost(request);
			String whiteList = businessConfig.get("whiteList").toString();
			if (!verifyWhiteList(clientIp, whiteList).equals(SecurityReturnCode.SUCCESS.getCode())) {
				return SecurityReturnCode.INVALID_IP.getCode();
			}
		}

		// 将部分信息传入request中供以后使用
		request.setAttribute("mid", mid);
		request.setAttribute("reqXMLData", reqXMLData);
		request.setAttribute("service", map.get("service").toString());

		return SecurityReturnCode.SUCCESS.getCode();
	}

}
