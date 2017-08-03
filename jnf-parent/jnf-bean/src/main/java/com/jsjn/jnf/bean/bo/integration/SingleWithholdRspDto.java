package com.jsjn.jnf.bean.bo.integration;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * 单笔代扣响应对象
 * 
 * @author xiekx
 * 
 */
@XmlRootElement(name = "message")
public class SingleWithholdRspDto extends CommonMessageRsp {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public String toString() {
		return " [resCode=" + super.getResCode() + ", resMsg="
				+ super.getResMsg() + ", orderNo=" + orderNo + ", serialNo="
				+ serialNo + ", status=" + status + "]";
	}

	private String orderNo; // 业务编号
	private String serialNo; // 中间业务平台提供的流水号
	private String status; // 代扣返回状态 000000成功 EEEEEE通讯异常 其他：失败银联返回四位错误码才认为确定失败

	/**
	 * 默认构造函数
	 */
	public SingleWithholdRspDto() {
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
