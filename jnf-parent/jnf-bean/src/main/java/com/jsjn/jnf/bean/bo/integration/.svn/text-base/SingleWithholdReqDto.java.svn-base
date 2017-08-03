package com.jsjn.jnf.bean.bo.integration;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * 单笔代扣请求对象
 * 
 * @author xiekx
 * 
 */
@XmlRootElement(name = "message")
public class SingleWithholdReqDto extends CommonMessageReq {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String orderNo; // 业务编号
	private String custSignNo; // 客户签约号
	private String signNo; // 银联代扣签约序号
	private BigDecimal amount; // 代扣金额
	private String sign; // 签名

	/**
	 * 默认构造函数
	 */
	public SingleWithholdReqDto() {
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getCustSignNo() {
		return custSignNo;
	}

	public void setCustSignNo(String custSignNo) {
		this.custSignNo = custSignNo;
	}

	public String getSignNo() {
		return signNo;
	}

	public void setSignNo(String signNo) {
		this.signNo = signNo;
	}

	@Override
	public String toString() {
		return " [orgNo=" + super.getOrgNo() + ", tranCd=" + super.getTranCd()
				+ ", tranDt=" + super.getTranDt() + "orderNo=" + orderNo
				+ ", custSignNo=" + custSignNo + ", signNo=" + signNo
				+ ", amount=" + amount + ", sign=" + sign + "]";
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

}
