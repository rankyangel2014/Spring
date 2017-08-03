package com.jsjn.jnf.bean.bo.integration;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * 卡BIN查询请求对象
 * 
 * @author xiekx
 * 
 */
@XmlRootElement(name = "message")
public class WithholdStatusReqDto extends CommonMessageReq {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String orderNo;// 业务编号 代扣订单编号

	/**
	 * 默认构造函数
	 */
	public WithholdStatusReqDto() {
	}

	@Override
	public String toString() {
		return "[orgNo=" + super.getOrgNo() + ", tranCd=" + super.getTranCd()
				+ ", tranDt=" + super.getTranDt() + "orderNo=" + orderNo + "]";
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

}
