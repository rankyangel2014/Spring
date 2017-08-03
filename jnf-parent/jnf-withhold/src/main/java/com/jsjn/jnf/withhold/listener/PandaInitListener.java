package com.jsjn.jnf.withhold.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.jsjn.jnf.panda.client.PandaClient2;

public class PandaInitListener implements ServletContextListener{

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		try {
			PandaClient2.subscribe();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		
	}

}
