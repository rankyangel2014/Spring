package com.jsjn.jnf.common.config;

import java.util.Map;

import com.google.common.collect.Maps;
import com.jsjn.jnf.common.utils.PropertiesLoader;
import com.jsjn.jnf.common.utils.StringUtils;

/**
 * 全局配置类
 * 
 * @author lilong
 */
public class Global {

	/**
	 * 当前对象实例
	 */
	private static Global global = new Global();
	/**
	 * 保存全局属性值
	 */
	private static Map<String, String> map = Maps.newHashMap();

	/**
	 * 属性文件加载对象
	 */
	private static PropertiesLoader loader = new PropertiesLoader(
			"jnf_common.properties");
	/**
	 * yinliandaikou kazeleixing ka = 0
	 */
	public static String BANK_CARD_TYPE = "0";

	/**
	 * 显示/隐藏
	 */
	public static final String SHOW = "1";
	public static final String HIDE = "0";

	/**
	 * 是/否
	 */
	public static final String YES = "1";
	public static final String NO = "0";

	/**
	 * 对/错
	 */
	public static final String TRUE = "true";
	public static final String FALSE = "false";

	// 记录集字段名称
	public final static String SQL_LIST_NAME = "recList";
	// 分页大小
	public final static int PAGE_SIZE = 10;
	// 最大分页条数
	public final static long PAGE_MAX_SIZE = 5000;

	// 响应信息存放字段名称
	public static final String RSP_MSG = "rspMsg";
	
	
	public static final String SUCCESS_MSG="SUCCESS";
	
	public static final String SERVICE_PANDA_ID = "0020";
	
	public static final int TOKENLENGTH = 32;
	
	public static final String IDTYPE = "1";//身份证：1
	
	public static final int OVERTIME = 5;//设置超时时间
	
	public static final int CODELENGTH = 4;//设置验证码长度
	
	public static final int SMSVERIFYCODE = 6;//设置验证码长度
	
	public static final String MESSAGETYPE = "VALIDATE_CODE_TEMPLET";//短信模板的type
	
	public static final String AMT_MIN = "0.01";			//金额允许的最小值
	
	public static final String AMT_MAX = "9999999999.99";	//金额允许的最大值
	
	public static final int HTTPSTIMEOUT = 30000; //https请求超时时间 毫秒
	
	public static final int SOCKETTIMEOUT = 7200; //socket通讯默认超时时间  毫秒
		
	public static final String SOCKET_SEND_ENCODE_TYPE = "GBK"; //socket发送字符编码方式
	
	public static final String SOCKET_ACCEPT_ENCODE_TYPE = "GBK"; //socket接收字符编码方式
	
	public static final String RES_FAILTURE="999999";
	
	public static final String RES_SUCCESS="000000";
	
	/**
	 * IP地址分隔符
	 */
	public static final String IP_SPLIT_SEPARATOR = ";";
	
	/**
	 * 获取当前对象实例
	 */
	public static Global getInstance() {
		return global;
	}

	/**
	 * 获取配置*
	 */
	public static String getConfig(String key) {
		
		String value = map.get(key);
		if (value == null) {
			value = loader.getProperty(key);
			map.put(key, value != null ? value : StringUtils.EMPTY);
		}
		return value;
	}
	
	
}
