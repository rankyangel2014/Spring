package com.jsjn.jnf.bean.dto.member;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * @author xiekx
 */
public class FeeStatisticDataBO extends BaseDTO<FeeStatisticDataBO> {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3916292774076654210L;

	private String id;// id
	private String mid;// 商户号
	private String mname;// 商户名称
	private String insttuId;// 机构号
	private String insttuName;// 机构名称
	private Double price;// 单价
	private Integer count;// 笔数
	private String businessType;// 业务类型
	private String channel;// 渠道
	private String startTime;// 开始时间
	private String endTime;// 结束时间
	private Double totalMoney;// 总价

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getMname() {
		return mname;
	}

	public void setMname(String mName) {
		this.mname = mName;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getInsttuName() {
		return insttuName;
	}

	public void setInsttuName(String insttuName) {
		this.insttuName = insttuName;
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

	public Double getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(Double totalMoney) {
		this.totalMoney = totalMoney;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getInsttuId() {
		return insttuId;
	}

	public void setInsttuId(String insttuId) {
		this.insttuId = insttuId;
	}

	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}
}
