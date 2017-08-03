/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * @author ZSMJ
 * 交易流水查询请求/响应数据
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { 
			"tranNo", 
			"recType", 
			"custNo", 
			"custName", 
			"amount", 
			"status",
			"startTime",
			"endTime",
			"bankCardNo"
			})
public class TradeFlowResDataBO {
	
	/**
	 * 开始日期(响应)
	 */
	private String startTime;
	
	/**
	 * 结束日期(响应)
	 */
	private String endTime;
	
	/**
	 * 交易订单号(响应)
	 */
	private String tranNo;
	
	/**
	 * 交易类型 0：转账 1：代扣(响应)
	 */
	private String recType;
	
	/**
	 * 交易用户编号(响应)
	 */
	private String custNo;
	
	/**
	 * 交易用户名称(响应)
	 */
	private String custName;
	
	/**
	 * 交易金额(响应)
	 */
	private BigDecimal amount;
	
	/**
	 * 交易状态: 0 ：处理中，1：成功，2:失败(响应)
	 */
	private String status;
	
	
	/**
	 * 银行卡号
	 */
	private String bankCardNo;


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


	public String getTranNo() {
		return tranNo;
	}


	public void setTranNo(String tranNo) {
		this.tranNo = tranNo;
	}


	public String getRecType() {
		return recType;
	}


	public void setRecType(String recType) {
		this.recType = recType;
	}


	public String getCustNo() {
		return custNo;
	}


	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}


	public String getCustName() {
		return custName;
	}


	public void setCustName(String custName) {
		this.custName = custName;
	}


	public BigDecimal getAmount() {
		return amount;
	}


	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getBankCardNo() {
		return bankCardNo;
	}


	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}
}
