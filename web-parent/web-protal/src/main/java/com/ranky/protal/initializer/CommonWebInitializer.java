package com.ranky.protal.initializer;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.core.annotation.Order;
import org.springframework.web.WebApplicationInitializer;

@Order(1)
public class CommonWebInitializer implements WebApplicationInitializer {

	/*
	 * @Override public void onStartup(ServletContext container) {
	 * ServletRegistration.Dynamic registration =
	 * container.addServlet("example", new DispatcherServlet());
	 * registration.setLoadOnStartup(1); registration.addMapping("*.do"); }
	 */

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {

		// Log4jConfigListener
		// servletContext.setInitParameter("log4jConfigLocation",
		// "classpath:config/properties/log4j.properties");
		// servletContext.addListener(Log4jServletContextListener.class);
		// OpenSessionInViewFilter
		/*
		 * OpenSessionInViewFilter hibernateSessionInViewFilter = new
		 * OpenSessionInViewFilter(); FilterRegistration.Dynamic
		 * filterRegistration = servletContext.addFilter( "hibernateFilter",
		 * hibernateSessionInViewFilter);
		 * filterRegistration.addMappingForUrlPatterns(
		 * EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD,
		 * DispatcherType.INCLUDE), false, "/");
		 */

		// DemoServlet
		/*
		 * DemoServlet demoServlet = new DemoServlet();
		 * ServletRegistration.Dynamic dynamic = servletContext.addServlet(
		 * "demoServlet", demoServlet); dynamic.setLoadOnStartup(2);
		 * dynamic.addMapping("/demo_servlet");
		 */

	}

}