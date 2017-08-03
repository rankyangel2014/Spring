package com.jsjn.skylark.bean;

import java.util.ArrayList;

/**
 * 下拉参数列表Dto
 * 
 * @author Yang
 * 
 */
public class ParamDto extends BaseDto<ParamDto> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String modId;
	private String paraId;
	private String paraNo;
	private String paramKey; // 下拉参数值paraValue
	private String paramValue; // 下拉参数描述 paraDesc
	private String shortDesc; // 简称
	private String orgNo;
	private String loanNo;
	private String remark;


	private ArrayList<ParamDto> recList;

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getLoanNo() {
		return loanNo;
	}

	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public java.lang.String getModId() {
		return modId;
	}

	public void setModId(java.lang.String modId) {
		this.modId = modId;
	}

	public java.lang.String getParaId() {
		return paraId;
	}

	public void setParaId(java.lang.String paraId) {
		this.paraId = paraId;
	}

	public String getParamKey() {
		return paramKey;
	}

	public void setParamKey(String paramKey) {
		this.paramKey = paramKey;
	}

	public String getParamValue() {
		return paramValue;
	}

	public void setParamValue(String paramValue) {
		this.paramValue = paramValue;
	}

	public java.lang.String getParaNo() {
		return paraNo;
	}

	public void setParaNo(java.lang.String paraNo) {
		this.paraNo = paraNo;
	}

	public ArrayList<ParamDto> getRecList() {
		return recList;
	}

	public void setRecList(ArrayList<ParamDto> recList) {
		this.recList = recList;
	}

	public String getShortDesc() {
		return shortDesc;
	}

	public void setShortDesc(String shortDesc) {
		this.shortDesc = shortDesc;
	}

}
