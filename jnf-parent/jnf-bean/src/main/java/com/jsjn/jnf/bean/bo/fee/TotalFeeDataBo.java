package com.jsjn.jnf.bean.bo.fee;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

public class TotalFeeDataBo extends BaseDTO<TotalFeeDataBo>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3916292174076654210L;
	
	/**
	 * 商户名称
	 */
	private String mname;
	
	/**
	 * 机构名称
	 */
	private String insttuName;
	
	/**
	 * 收费项目
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
	 * 单价
	 */
	private String price;
	
	/**
	 * 笔数
	 */
	private String count;
	
	/**
	 * 金额合计
	 */
	private String totalMoney;
	
	/**
	 * 商户号
	 */
	private String mid;
	
	/**
	 * 机构号
	 */
	private String orgNo;
	
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
	
	public String getMname() {
		return mname;
	}

	public void setMname(String mname) {
		this.mname = mname;
	}

	public String getInsttuName() {
		return insttuName;
	}

	public void setInsttuName(String insttuName) {
		this.insttuName = insttuName;
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

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public String getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(String totalMoney) {
		this.totalMoney = totalMoney;
	}
	
}
