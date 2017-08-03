package com.jsjn.jnf.common.utils;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

/**
 * java bean 工具类
 * 
 * @author yincy
 * 
 */
public class BeanUtils {
	private final static Logger logger = Logger.getLogger(BeanUtils.class);

	/**
	 * 利用Introspector,PropertyDescriptor实现 Map --> Bean
	 * 
	 * @param map
	 * @param obj
	 */
	public static void transMap2Bean(Map<String, Object> map, Object obj) {
		try {
			BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
			PropertyDescriptor[] propertyDescriptors = beanInfo
					.getPropertyDescriptors();

			for (PropertyDescriptor property : propertyDescriptors) {
				String key = property.getName();

				if (map.containsKey(key)) {
					Object value = map.get(key);
					// 得到property对应的setter方法
					Method setter = property.getWriteMethod();
					setter.invoke(obj, value);
				}

			}
		} catch (Exception e) {
			logger.error("transMap2Bean Error " + e);
		}
		return;
	}

	/**
	 * 利用Introspector和PropertyDescriptor 将Bean --> Map
	 * 
	 * @param obj
	 * @return hashMap
	 */
	public static Map<String, Object> transBean2Map(Object obj) {

		if (obj == null) {
			return null;
		}
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
			PropertyDescriptor[] propertyDescriptors = beanInfo
					.getPropertyDescriptors();
			for (PropertyDescriptor property : propertyDescriptors) {
				String key = property.getName();

				// 过滤class属性
				if (!key.equals("class")) {
					// 得到property对应的getter方法
					Method getter = property.getReadMethod();
					Object value = getter.invoke(obj);

					map.put(key, value);
				}

			}
		} catch (Exception e) {
			logger.error("transBean2Map Error " + e);
		}

		return map;
	}

	public static Map<String, String> objectToMap(Object obj) throws Exception {
		if (obj == null) {
			return null;
		}
		Map<String, String> map = new HashMap<String, String>();
		Field[] declaredFields = obj.getClass().getDeclaredFields();
		for (Field field : declaredFields) {
			field.setAccessible(true);
			Object fieldObj = field.get(obj);
			String fieldStr = "";
			if (null != fieldObj) {
				fieldStr = fieldObj.toString();
			}
			if("serialVersionUID".equals(field.getName())){
				continue;
			}
			map.put(field.getName(), fieldStr);
		}

		return map;
	}
}
