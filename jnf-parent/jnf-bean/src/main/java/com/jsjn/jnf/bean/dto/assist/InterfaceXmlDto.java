package com.jsjn.jnf.bean.dto.assist;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

public class InterfaceXmlDto extends BaseDTO<InterfaceXmlDto>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3176292774076654210L;
	
	/**
	 * 编号
	 */
	@NotBlank(message="编号不能为空")
	private String id;
	
	/**
	 * 方法名
	 */
	@NotBlank(message="方法名不能为空")
	private String method;
	
	/**
	 * 机构码
	 */
	private String orgNo;
	
	/**
	 * 请求报文
	 */
	@NotBlank(message="请求报文不能为空")
	private String inputXml;
	
	/**
	 * 相应报文
	 */
	private String outputXml;
	
	/**
	 * 接口状态
	 */
	private String state;
	
	/**
	 * 调用接口失败原因
	 */
	private String exception;
	
	/**
	 * 业务状态
	 */
	private String bflag;
	
	/**
	 * 业务失败原因
	 */
	private String reason;
	
	/**
	 * 请求时间
	 */
	private String reqTime;
	
	/**
	 * 请求时间
	 */
	private String resTime;
	
	/**
	 * 商户号
	 */
	private String mid;
	
	/**
	 * 是否计费标志
	 */
	private String feeFlag;
	
	public String getFeeFlag() {
		return feeFlag;
	}

	public void setFeeFlag(String feeFlag) {
		this.feeFlag = feeFlag;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getInputXml() {
		return inputXml;
	}

	public void setInputXml(String inputXml) {
		this.inputXml = inputXml;
	}

	public String getOutputXml() {
		return outputXml;
	}

	public void setOutputXml(String outputXml) {
		this.outputXml = outputXml;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getException() {
		return exception;
	}

	public void setException(String exception) {
		this.exception = exception;
	}

	public String getBflag() {
		return bflag;
	}

	public void setBflag(String bflag) {
		this.bflag = bflag;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getReqTime() {
		return reqTime;
	}

	public void setReqTime(String reqTime) {
		this.reqTime = reqTime;
	}

	public String getResTime() {
		return resTime;
	}

	public void setResTime(String resTime) {
		this.resTime = resTime;
	}
	
	
}
