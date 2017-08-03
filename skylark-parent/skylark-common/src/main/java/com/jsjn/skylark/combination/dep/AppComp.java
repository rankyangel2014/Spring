package com.jsjn.skylark.combination.dep;

import com.alibaba.fastjson.JSONObject;

public class AppComp {
	
	private String displayName;
	private String appName;
	private String url;
	private String version;
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String toString() {
		JSONObject temp = new JSONObject();
		temp.put(this.displayName, new JSONObject());
		temp.getJSONObject(this.displayName).put("comp", this.appName);
		temp.getJSONObject(this.displayName).put("url", this.url);
		temp.getJSONObject(this.displayName).put("version", this.version);
		return temp.toJSONString();
	}
	
}
