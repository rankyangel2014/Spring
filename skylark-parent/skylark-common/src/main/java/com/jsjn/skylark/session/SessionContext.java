package com.jsjn.skylark.session;

import java.util.Collections;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

public class SessionContext {
	private static  Logger log=Logger.getLogger(SessionContext.class);
	
	public static final String USER_INFO="userInfo";
	public static final String STATION_INFO="stationInfo";
	public static final String INSTTU_INFO = "insttuInfo";
	
	private static final ThreadLocal sessionContext=new ThreadLocal();
	
	public static void setSession(HttpSession session){
		sessionContext.get();
		sessionContext.set(session);
	}
	
	public static  Object getAttribute(String name){
		HttpSession session = (HttpSession)sessionContext.get();
		try{
			if(session!=null)
				return session.getAttribute(name);
		}catch(Exception e){
			return null;
		}
		return null;
	}

	public static void removeAllAttributes(){
		HttpSession session = (HttpSession)sessionContext.get();
		if(session!=null){
			List list = (List) Collections.list(session.getAttributeNames());
			for (int i = 0; i < list.size(); i++) {
				String name = (String) list.get(i);
				session.removeAttribute(name);
				log.warn("删除session属性："+name);
			}
		}
	}
	 
	public static HttpSession getSession(){
		return (HttpSession)sessionContext.get();
	}
	
	public static void cleaCookies(Cookie[] cookies){
		for(Cookie cookie:cookies){
			cookie.setMaxAge(0);
		}
	}
}
