/**
 * 
 */
package com.jsjn.jnf.common.security;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author ZSMJ SQL注入过滤器
 */
public class SQLInjection {

	//private static final String SQL_INJECTSTR = "'|and|exec|insert|select|delete|update|count|\\*|%|chr|mid|master|truncate|char|declare|;|or|-|\\+|,";
	/*
	 * 修改防止sql注入过滤规则，去掉一些常用的符号 modify by xiekx
	 */
	private static final String SQL_INJECTSTR = "'|;|--|drop|exec|insert|select|delete|update|master|truncate|declare";

	/**
	 * 将存在SQL注入关键词过滤掉
	 * 
	 * @param str
	 * @return
	 */
	public static String sqlInjectFilter(String str) {
		Pattern pa = Pattern.compile(SQL_INJECTSTR, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pa.matcher(str);
		return matcher.replaceAll("");
	}

	public static boolean containKeyWord(String str) {
		Pattern pa = Pattern.compile(SQL_INJECTSTR, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pa.matcher(str);
		while (matcher.find())
			return true;
		return false;
	}
}
