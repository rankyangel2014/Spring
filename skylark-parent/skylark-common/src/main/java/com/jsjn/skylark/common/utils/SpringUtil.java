package com.jsjn.skylark.common.utils;

import javax.servlet.ServletContext;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class SpringUtil {

	private static ApplicationContext context;
	
	public static void setContext(ServletContext servletContext) {
		context = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
	}
	
	public static Object getBean(String beanName) {
		return context.getBean(beanName);
	}
	
	@SuppressWarnings("unchecked")
	public static <T> T getBean(String beanName, T type) {
		return (T) context.getBean(beanName, type);
	}
	
}
