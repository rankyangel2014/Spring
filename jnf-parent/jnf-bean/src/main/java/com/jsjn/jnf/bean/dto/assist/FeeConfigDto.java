package com.jsjn.jnf.bean.dto.assist;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * 计费参数配置类
 * 
 * @author fangzheng
 * 
 */
public class FeeConfigDto extends BaseDTO<FeeConfigDto>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 序号
	 */
	private String id;
	
	/**
	 * 商户号
	 */
	@NotBlank(message="商户号不能为空")
	private String mid;

	/**
	 * 机构号
	 */
	private String orgNo;
	
	/**
	 * 费用种类
	 */
	private String feeType;
	
	/**
	 * 开始时间
	 */
	private String startTime;
	
	/**
	 * 结束时间
	 */
	private String endTime;
	
	/**
	 * 费用
	 */
	private String fee;
	
	/**
	 * 商户名称
	 */
	private String mname;
	/**
	 * 机构名称
	 */
	private String insttuName;
	/**
	 * 渠道
	 */
	private String channel;
	
	public String getMname() {
		return mname;
	}

	public void setMname(String mname) {
		this.mname = mname;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getFeeType() {
		return feeType;
	}

	public void setFeeType(String feeType) {
		this.feeType = feeType;
	}
	
	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getFee() {
		return fee;
	}

	public void setFee(String fee) {
		this.fee = fee;
	}

	public String getInsttuName() {
		return insttuName;
	}

	public void setInsttuName(String insttuName) {
		this.insttuName = insttuName;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}
	

}
