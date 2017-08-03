package com.jsjn.skylark.session;

import java.io.Serializable;

public class UserInfo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String userId;
	private String userName;
	private String mobile;
	private String loginId;
	private String insttuId;
	private String insttuName;
	private String insttuTy;
	private String stationId;
	private String stationName;
	private String deptId;
	private String jyrq;
	private String modId;
	
	
	public String getModId() {
		return modId;
	}
	public void setModId(String modId) {
		this.modId = modId;
	}
	public String getInsttuTy() {
		return insttuTy;
	}
	public void setInsttuTy(String insttuTy) {
		this.insttuTy = insttuTy;
	}
	public String getDeptId() {
		return deptId;
	}
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	public String getInsttuId() {
		return insttuId;
	}
	public void setInsttuId(String insttuId) {
		this.insttuId = insttuId;
	}
	public String getInsttuName() {
		return insttuName;
	}
	public void setInsttuName(String insttuName) {
		this.insttuName = insttuName;
	}
	public String getStationId() {
		return stationId;
	}
	public void setStationId(String stationId) {
		this.stationId = stationId;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public String getJyrq() {
		return jyrq;
	}
	public void setJyrq(String jyrq) {
		this.jyrq = jyrq;
	}
}
