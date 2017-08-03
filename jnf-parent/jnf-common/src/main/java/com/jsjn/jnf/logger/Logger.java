package com.jsjn.jnf.logger;

import java.util.UUID;

public class Logger {
	private static ThreadLocal<String> loggerId = new ThreadLocal<String>();

	public static String getLoggerId() {
		String id = loggerId.get();
		if (id==null||"".equals(id)){
			id=UUID.randomUUID().toString().replaceAll("-", "");
			setLoggerId(id);
		}
		return id;
	}

	public static void setLoggerId(String id) {
		System.out.println("loggerid===================="+id);
		loggerId.set(id);
	}
}
