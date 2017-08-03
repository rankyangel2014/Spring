/**
 * 
 */
package com.jsjn.jnf.protal.security;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.jsjn.jnf.bean.dto.assist.DictDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;
import com.jsjn.panda.exception.NoServiceException;
import com.jsjn.panda.exception.PandaRemoteException;
import com.jsjn.panda.exception.TimeoutException;

/**
 * @author ZSMJ
 * 
 */
public class SysConfigBean {

	private final static Logger logger = Logger.getLogger(SysConfigBean.class);

	/**
	 * 非工作起始时间
	 */
	public static String NO_WORKING_START_TIME = "18:00:00";

	/**
	 * 非工作终止时间
	 */
	public static String NO_WORKING_END_TIME = "8:00:00";

	/**
	 * 时间戳认证时长(正负秒数)
	 */
	public static long EFFECTIVE_SEC = 60;

	/**
	 * IP/SESSION级别60s内最大访问次数
	 */
	public static long ACC_MAX_COUNT_FOR_IP = 3;

	/**
	 * 系统级别60s内最大访问次数
	 */
	public static long ACC_MAX_COUNT_FOR_SYS = 1000;

	/**
	 * 60s内超过最大访问次数冷却时间（针对某一个IP）
	 */
	public static long COOLING_SEC_FOR_IP = 300;

	/**
	 * 60s内超过最大访问次数冷却时间(针对 全平台)
	 */
	public static long COOLING_SEC_FOR_SYS = 60;

	/**
	 * 动态刷新系统配置
	 */
	public static long REFRESH_CONFIG_SEC = 3600;

	/**
	 * 系统当前状态 1：开机 0：关机（非物理关机）
	 */
	public static String PORTAL_CURRENT_STATUS = "1";

	/**
	 * 获取系统参数
	 * 
	 * @return
	 */
	public static boolean getSysConfig() {
		try {
			// 封装参数
			DictDto dto = new DictDto();
			String[] types = { "NO_WORKING_START_TIME", "NO_WORKING_END_TIME", "EFFECTIVE_SEC", "ACC_MAX_COUNT_FOR_IP",
					"ACC_MAX_COUNT_FOR_SYS", "COOLING_SEC_FOR_IP", "COOLING_SEC_FOR_SYS", "REFRESH_CONFIG_SEC",
					"PORTAL_CURRENT_STATUS" };
			dto.setTypes(types);

			Result result = PandaClient2.invoke(REFRESH_CONFIG_SEC, Global.SERVICE_PANDA_ID, "getSysConfigByTypes", dto);
			String sysConfigStr = result.getResult();

			JSONArray array = JSONArray.fromObject(sysConfigStr);
			// TODO 查询的数据需要经过校验，如果数据非法则使用默认值或不变更上次的值
			for (int i = 0; i < array.size(); i++) {
				JSONObject obj = array.getJSONObject(i);
				String type = obj.get("type").toString();
				String value = obj.get("value").toString();

				logger.info("获取系统参数 " + type + " : " + value);

				if (type.equalsIgnoreCase("NO_WORKING_START_TIME") && DateUtils.validateDate(value, "HH:mm:ss"))
					NO_WORKING_START_TIME = value;

				else if (type.equalsIgnoreCase("NO_WORKING_END_TIME") && DateUtils.validateDate(value, "HH:mm:ss"))
					NO_WORKING_END_TIME = value;

				else if (type.equalsIgnoreCase("EFFECTIVE_SEC") && StringUtils.toLong(value) > 0)
					EFFECTIVE_SEC = Long.parseLong(value);

				else if (type.equalsIgnoreCase("ACC_MAX_COUNT_FOR_IP") && StringUtils.toLong(value) > 0)
					ACC_MAX_COUNT_FOR_IP = Long.parseLong(value);

				else if (type.equalsIgnoreCase("ACC_MAX_COUNT_FOR_SYS") && StringUtils.toLong(value) > 0)
					ACC_MAX_COUNT_FOR_SYS = Long.parseLong(value);

				else if (type.equalsIgnoreCase("COOLING_SEC_FOR_IP") && StringUtils.toLong(value) > 0)
					COOLING_SEC_FOR_IP = Long.parseLong(value);

				else if (type.equalsIgnoreCase("COOLING_SEC_FOR_SYS") && StringUtils.toLong(value) > 0)
					COOLING_SEC_FOR_SYS = Long.parseLong(value);

				else if (type.equalsIgnoreCase("REFRESH_CONFIG_SEC") && StringUtils.toLong(value) > 0) {
					REFRESH_CONFIG_SEC = Long.parseLong(value);
				}

				else if (type.equalsIgnoreCase("PORTAL_CURRENT_STATUS")
						&& (value.equals(TabsConstant.PORTAL_CURRENT_STATUS_OFF.val()) || value.equals(TabsConstant.PORTAL_CURRENT_STATUS_ON.val())))
					PORTAL_CURRENT_STATUS = value;
			}

		} catch (PandaRemoteException e) {
			logger.error("Panda远程调用获取系统参数失败！");
			return false;
		} catch (NoServiceException e) {
			logger.error("无此[getSysConfigByTypes]SERVICE！");
			return false;
		} catch (TimeoutException e) {
			logger.error("调用SERVICE[getSysConfigByTypes]超时！");
			return false;
		}
		return true;
	}

	//	public static void main(String[]args){
	//		String s = "1ee";
	//		System.out.println(Long.parseLong(s));
	//	}

}
