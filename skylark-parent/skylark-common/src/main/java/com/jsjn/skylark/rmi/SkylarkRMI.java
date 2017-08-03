package com.jsjn.skylark.rmi;

import com.alibaba.fastjson.JSONArray;
import com.jsjn.panda.client.PandaClient;
import com.jsjn.panda.client.Result;

public class SkylarkRMI {

	public static Result contactFacade(String action, Object...params) throws Exception {
		if(params == null) {
			return PandaClient.invoke("0000", "contact", action, null);
		} else {
			JSONArray array = new JSONArray();
			for(Object o : params) {
				array.add(o);
			}
			return PandaClient.invoke("0000", "contact", action, array);
		}
	}
	
	public static Result analysisFacade(String action, Object...params) throws Exception {
		if(params == null) {
			return PandaClient.invoke("0000", "analysis", action, null);
		} else {
			JSONArray array = new JSONArray();
			for(Object o : params) {
				array.add(o);
			}
			return PandaClient.invoke("0000", "analysis", action, array);
		}
	}
	
	public static Result authorizationFacade(String action, Object...params) throws Exception {
		if(params == null) {
			return PandaClient.invoke("0000", "auth", action, null);
		} else {
			JSONArray array = new JSONArray();
			for(Object o : params) {
				array.add(o);
			}
			return PandaClient.invoke("0000", "auth", action, array);
		}
	}
	
	public static Result officeFacade(String action, Object...params) throws Exception {
		if(params == null) {
			return PandaClient.invoke("0000", "office", action, null);
		} else {
			JSONArray array = new JSONArray();
			for(Object o : params) {
				array.add(o);
			}
			return PandaClient.invoke("0000", "office", action, array);
		}
	}
}
