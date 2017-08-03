package com.jsjn.skylark.common.utils;

import java.util.List;

import org.apache.http.cookie.Cookie;


public class HttpResult {

	private String content;
	
	private List<Cookie> cookies;

	

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<Cookie> getCookies() {
		return cookies;
	}

	public void setCookies(List<Cookie> cookies) {
		this.cookies = cookies;
	}
	
	
}
