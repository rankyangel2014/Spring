package com.jsjn.jnf.common.security;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

public class DataBaseEncrypt extends PropertyPlaceholderConfigurer {

	private final static Logger LOGGER = LoggerFactory.getLogger(DataBaseEncrypt.class);

	public static String DEFAULT_KEY = "9f58a20946b47e190003ec716c1c457d";

	static {
		ResourceLoader resourceLoader = new DefaultResourceLoader();
		Resource resource = resourceLoader.getResource("classpath:0aa7052e738a4e43aefa38380f6fda4c.properties");
		InputStream is = null;
		try {
			is = resource.getInputStream();
			Properties props = new Properties();
			props.load(is);
			DEFAULT_KEY = props.getProperty("defaultKey");
		} catch (IOException e) {
			LOGGER.error(e.getMessage(), e);
		} finally {
			IOUtils.closeQuietly(is);
		}

	}

	private String[] encryptPropNames = { "jdbcUrl", "user", "password", "keystorePasswd", "saltFilePath",
			"certFilePath" };

	/**
	 * 解密数据库连接字符串
	 * 
	 * @param propertyName
	 * @param propertyValue
	 * @return String
	 */
	protected String convertProperty(String propertyName, String propertyValue) {
		if (isEncryptProp(propertyName)) {
			String decryptValue = Cryptos.aesDecrypt(propertyValue, DEFAULT_KEY);
			return decryptValue;
		} else {
			return propertyValue;
		}
	}

	/**
	 * 判断是否是加密的属性
	 * 
	 * @param propertyName
	 * @return
	 */
	private boolean isEncryptProp(String propertyName) {
		for (String encryptpropertyName : encryptPropNames) {
			if (encryptpropertyName.equals(propertyName))
				return true;
		}
		return false;
	}

}
