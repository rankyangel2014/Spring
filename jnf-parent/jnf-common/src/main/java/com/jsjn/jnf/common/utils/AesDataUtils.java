package com.jsjn.jnf.common.utils;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jsjn.jnf.common.annotation.AesAnnontation;
import com.jsjn.jnf.common.security.Cryptos;

public class AesDataUtils {

	private final static Logger logger = LoggerFactory
			.getLogger(AesDataUtils.class);

	/**
	 * java对象
	 * 
	 * @param javaBean
	 * @return
	 */
	public static Object aesEncryptObject(Object javaBean) {
		Object obj = null;
		if (null != javaBean) {
			Class<? extends Object> raw = javaBean.getClass();
			try {
				if (raw.isInterface())
					return obj;
				Object clone = javaBean;
				Set<Integer> referenceCounter = new HashSet<Integer>();
				AesDataUtils.replace(Reflections.findAllField(raw), clone,
						referenceCounter, true);
				referenceCounter.clear();
				referenceCounter = null;
				return clone;
			} catch (Throwable e) {
				logger.error("对称加密对象出现异常", e);
			}
		}
		return obj;
	}

	/**
	 * java对象
	 * 
	 * @param javaBean
	 * @return
	 */
	public static Object aesDecryptObject(Object javaBean) {
		Object obj = null;
		if (null != javaBean) {
			Class<? extends Object> raw = javaBean.getClass();
			try {
				if (raw.isInterface())
					return obj;
				Object clone = javaBean;
				Set<Integer> referenceCounter = new HashSet<Integer>();
				AesDataUtils.replace(Reflections.findAllField(raw), clone,
						referenceCounter, false);
				referenceCounter.clear();
				referenceCounter = null;
				return clone;
			} catch (Throwable e) {
				logger.error("对称解密对象出现异常", e);
			}
		}
		return obj;
	}

	/**
	 * 递归反射动态转码值
	 * @param fields
	 * @param javaBean
	 * @param referenceCounter
	 * @param encrypt
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	private static void replace(Field[] fields, Object javaBean,
			Set<Integer> referenceCounter, boolean encrypt)
			throws IllegalArgumentException, IllegalAccessException {
		if (null != fields && fields.length > 0) {
			for (Field field : fields) {
				if (field != null) {
					Reflections.makeAccessible(field);
					if (null != field && null != javaBean) {
						Object value = field.get(javaBean);
						if (null != value) {
							Class<?> type = value.getClass();
							// 1.处理子属性，包括集合中的
							if (type.isArray()) {
								int len = Array.getLength(value);
								for (int i = 0; i < len; i++) {
									Object arrayObject = Array.get(value, i);
									AesDataUtils.replace(Reflections
											.findAllField(arrayObject
													.getClass()), arrayObject,
											referenceCounter, encrypt);
								}
							} else if (value instanceof Collection<?>) {
								Collection<?> c = (Collection<?>) value;
								Iterator<?> it = c.iterator();
								while (it.hasNext()) {
									Object collectionObj = it.next();
									AesDataUtils.replace(Reflections
											.findAllField(collectionObj
													.getClass()),
											collectionObj, referenceCounter,
											encrypt);
								}
							} else if (value instanceof Map<?, ?>) {
								Map<?, ?> m = (Map<?, ?>) value;
								Set<?> set = m.entrySet();
								for (Object o : set) {
									Entry<?, ?> entry = (Entry<?, ?>) o;
									Object mapVal = entry.getValue();
									AesDataUtils.replace(Reflections
											.findAllField(mapVal.getClass()),
											mapVal, referenceCounter, encrypt);
								}
							} else if (!type.isPrimitive()
									&& !StringUtils.startsWith(type
											.getPackage().getName(), "javax.")
									&& !StringUtils.startsWith(type
											.getPackage().getName(), "java.")
									&& !StringUtils.startsWith(field.getType()
											.getName(), "javax.")
									&& !StringUtils.startsWith(field.getName(),
											"java.")
									&& referenceCounter.add(value.hashCode())) {
								AesDataUtils.replace(
										Reflections.findAllField(type), value,
										referenceCounter, encrypt);
							}
						}
						// 2. 处理自身的属性
						AesAnnontation annotation = field
								.getAnnotation(AesAnnontation.class);
						if (field.getType().equals(String.class)
								&& null != annotation) {
							String valueStr = (String) value;
							if (StringUtils.isNoneBlank(valueStr)) {
								if (encrypt) {
									valueStr = Cryptos.aesEncrypt(valueStr);
								} else {
									valueStr = Cryptos.aesDecrypt(valueStr);
								}
							}
							field.set(javaBean, valueStr);
						}
					}
				}
			}
		}
	}

}
