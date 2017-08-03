package com.jsjn.jnf.logger;

import java.util.HashMap;

import com.jsjn.panda.client.Invocation;
import com.jsjn.panda.filter.PandaFilter;
import com.jsjn.panda.msg.MsgContext;

public class PandaLoggerFilter implements PandaFilter {

	@Override
	public void destory() {

	}

	@Override
	public void doFilter(Invocation arg0) throws Exception {
		MsgContext mc = arg0.getMc();
		HashMap<String,String> map = (HashMap<String, String>) mc.getMap();
		String loggerId = map.get("loggerId"); 
		if (loggerId == null || "".equals(loggerId)){
			loggerId = Logger.getLoggerId();
		}
		Logger.setLoggerId(loggerId);
	}

	@Override
	public void init() {

	}

}
