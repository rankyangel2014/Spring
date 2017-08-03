//package com.jsjn.skylark.mloan.common.config;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.Properties;
//
//import org.apache.log4j.Logger;
//
//public class MloanProperty {
//
//	private static final Logger LOGGER = Logger.getLogger("mloan");
//
//	public static String APP_NAME;
//	public static String APP_DISPLAY_NAME;
//	public static String APP_VERSION;
//	public static String APP_UPDATE_URL;
//	public static String APP_WEB_SERVER;
//
//	static {
//		InputStream in = MloanProperty.class
//				.getResourceAsStream("/mloan/mloan.properties");
//		Properties p = new Properties();
//		try {
//			p.load(in);
//			APP_NAME = p.getProperty("appName");
//			APP_DISPLAY_NAME = p.getProperty("appDisplayName");
//			APP_VERSION = p.getProperty("appVersion");
//			APP_UPDATE_URL = p.getProperty("appUpdateUrl");
//			APP_WEB_SERVER = p.getProperty("appWebServer");
//			printProperties();
//		} catch (IOException e) {
//			LOGGER.error("读取配置文件 classpath:mloan/mloan.properties 失败......", e);
//		}
//	}
//
//	public static void printProperties() {
//
//		LOGGER.info("应用名称：" + APP_NAME + " ,应用版本号： " + APP_VERSION + ",应用更新地址："
//				+ APP_UPDATE_URL);
//	}
//
//}
