package com.jsjn.skylark.mloan.web.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

//import org.apache.log4j.Logger;

//import com.jsjn.mloan.common.factory.support.TranCodeDefinition;

public class MloanServletContextListener implements ServletContextListener {

//	private static final Logger LOGGER = Logger.getLogger("mloan");

	@Override
	public void contextInitialized(ServletContextEvent event) {

		servletContext = event.getServletContext();
//		try {
//			TranCodeDefinition.loadBeanDefinitions();
//		} catch (Exception e) {
//			LOGGER.error(e.getMessage(),e);
//		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		servletContext = null;
	}

	public static ServletContext getServletContext() {
		return servletContext;
	}

	public static void setServletContext(ServletContext servletContext) {
		MloanServletContextListener.servletContext = servletContext;
	}

	private static ServletContext servletContext;

}
