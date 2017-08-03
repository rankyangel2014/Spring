package com.jsjn.skylark.listener;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
//import java.util.Properties;
import java.util.Set;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
//import org.apache.log4j.PropertyConfigurator;

import com.jsjn.panda.client.PandaClient;
import com.jsjn.skylark.combination.Combination;
//import com.jsjn.skylark.properties.SkylarkProperties;
import com.jsjn.skylark.common.utils.ClassUtil;
import com.jsjn.skylark.common.utils.SpringUtil;


public class StartupListener implements ServletContextListener {

	public static Map<String, Combination> combs = new HashMap<String, Combination>();
//	private Properties prop = new Properties();
	private static final Logger logger = Logger
			.getLogger(StartupListener.class);

	public void contextInitialized(ServletContextEvent event) {
		SpringUtil.setContext(event.getServletContext());

		// panda订阅
		PandaClient.subscribe();

		String packageName = Combination.class.getPackage().getName();
		List<Class<?>> classes = ClassUtil.getClasses(packageName);
		for (Class<?> cls : classes) {
			if (Combination.class.isAssignableFrom(cls) && !cls.isInterface()) {
				try {
					Combination com = (Combination) cls.newInstance();
					combs.put(com.getAppName(), com);
				} catch (InstantiationException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
			}
		}

		Set<String> set = combs.keySet();
		for (String appName : set) {
			// 初始化日志配置
			// initLog4j(appName);

			// 调用各app的listener
			ServletContextListener scl = combs.get(appName).getListener();
			if (scl != null) {
				scl.contextInitialized(event);
			}
		}

		// 输出信息
		StringBuffer sb = new StringBuffer();
		int index = 1;
		sb.append("skylark平台集成的应用如下：\n");
		for (String appName : set) {
			sb.append(index++ + ". " + appName + "\t version: "
					+ combs.get(appName).getVersion() + "\n");
		}
		logger.info(sb.substring(0, sb.lastIndexOf("\n")));
	}

	public void contextDestroyed(ServletContextEvent event) {
		Set<String> set = combs.keySet();
		for (String appName : set) {
			ServletContextListener scl = combs.get(appName).getListener();
			if (scl != null) {
				scl.contextDestroyed(event);
			}
		}
	}

}
