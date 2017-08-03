package com.jsjn.skylark.properties;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jsjn.skylark.common.Constant;

public class SkylarkProperties {

	private static Properties p = null;
	

	private static Logger logger = LoggerFactory
			.getLogger(SkylarkProperties.class);
	
	static {
		p = new Properties();
		String location = "/skylark/skylark.properties";
		InputStream is = null;
		try {
			is = Constant.loanFileInputStream(location);
			p.load(is);
		} catch (IOException ex) {
			logger.error("Could not load properties from path:" + location
					+ ", " + ex.getMessage());
		} finally {
			IOUtils.closeQuietly(is);
		}
	}
	
	public static String get(String pName) {
		return p.getProperty(pName);
	}
	
	@Deprecated
	public static Map<String, Object> getAppConfig(String os) {
		Map<String, Object> map = new HashMap<String, Object>();
		Set<? extends Object> set = p.keySet();
		for(Object o : set) {
			if(o != null) {
				String key = o.toString();
				if(os == null) {
					if(key.startsWith("common.")) {
						map.put(key.substring(key.indexOf(".") + 1), p.getProperty(key));
					}
				} else {
					if(key.startsWith("common.") || key.startsWith(os+".")) {
						map.put(key.substring(key.indexOf(".") + 1), p.getProperty(key));
					}
				}
			}
		}
		return map;
	}
	
	public static Map<String, Object> getAppConfig2(String os, String sysId) {
		Map<String, Object> map = new HashMap<String, Object>();
		Set<? extends Object> set = p.keySet();
		for(Object o : set) {
			if(o != null) {
				String key = o.toString();
				if(os == null) {
					if(key.startsWith("common.")) {
						map.put(key.substring(key.lastIndexOf(".") + 1), p.getProperty(key));
					}
				} else {
					if(key.startsWith("common.") || key.startsWith(os+".common.") || key.startsWith(os+"."+sysId+".")) {
						map.put(key.substring(key.lastIndexOf(".") + 1), p.getProperty(key));
					}
				}
			}
		}
		return map;
	}
}
