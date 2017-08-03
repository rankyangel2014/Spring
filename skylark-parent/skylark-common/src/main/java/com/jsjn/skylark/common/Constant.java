package com.jsjn.skylark.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import com.google.common.collect.Maps;
import com.jsjn.skylark.common.utils.PropertiesLoader;
import com.jsjn.skylark.session.SessionContext;

public final class Constant {

	public Constant() {
	}

	private static Logger logger = Logger.getLogger(Constant.class);

	private static PropertiesLoader loader = new PropertiesLoader(
			"/skylark/skylark.properties");
	/**
	 * 保存全局属性值
	 */
	private static Map<String, String> map = Maps.newHashMap();

	// 后台响应码-成功
	public static final String RESPONSE_OK = "000000";

	// 后台响应码-找不到数据
	public static final String RESPONSE_NO_DATA_FOUND = "001403";

	// 分页大小
	public final static long PAGE_SIZE = 10;

	// 最大分页数量
	public final static long PAGE_MAX_SIZE = 5000;

	// 后台响应码-失败
	public static final String RESPONSE_FAIL = "999999";

	// 后台响应信息-失败
	public static final String RESPONSE_FAIL_DEFAULT_MSG = "服务器维护中，请稍后再试!";

	// 平台整合 存放用户和机构信息
	public static final java.lang.String BANK_IN_SESSION = SessionContext.INSTTU_INFO;

	// 下拉参数查询交易码
	public static final String QRY8888 = "QRY8888";

	/**
	 * 获取配置
	 */
	public static String getConfig(String key) {
		String value = map.get(key);
		if (value == null) {
			value = loader.getProperty(key);
			map.put(key, value != null ? value : StringUtils.EMPTY);
		}
		return value;
	}

	public static InputStream loanFileInputStream(String location)
			throws IOException {
		ResourceLoader resourceLoader = new DefaultResourceLoader();
		InputStream is = null;
		String path = System.getProperty("user.home") + File.separator
				+ "config" + location;
		File file = new File(path);
		if (file.exists()) {
			logger.info("config file path :" + path);
			is = new FileInputStream(file);
		} else {
			logger.info("config file path :" + location);
			Resource resource = resourceLoader.getResource(location);
			is = resource.getInputStream();
		}
		return is;
	}

}
