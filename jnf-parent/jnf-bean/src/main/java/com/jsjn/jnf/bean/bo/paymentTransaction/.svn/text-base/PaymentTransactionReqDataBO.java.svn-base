package com.jsjn.jnf.bean.bo.paymentTransaction;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.validator.constraints.CheckAmount;

/**
 * 银行代付
 * 
 * @author xiekx
 */
public class PaymentTransactionReqDataBO {

	/**
	 * 业务编号(请求)
	 */
	@NotBlank(message = "业务编号不能为空")
	private String serialNo;
	/**
	 * 机构号
	 */
	@NotBlank(message = "机构号不能为空")
	private String orgNo;

	/**
	 * 借据号
	 */
	@NotBlank(message = "借据号不能为空")
	private String loanNo;

	/**
	 * 签约协议号
	 */
	@NotBlank(message = "签约协议号不能为空")
	private String aid;
	/**
	 * 交易金额
	 */
	@CheckAmount(min = Global.AMT_MIN, max = Global.AMT_MAX)
	private BigDecimal amount;
	/**
	 * 收款账号
	 */
	@NotBlank(message = "收款账号不能为空")
	private String payeeAccountNo;
	/**
	 * 收款账号户名
	 */
	@NotBlank(message = "收款账号户名不能为空")
	private String payeeAccountName;
	/**
	 * 收款账号联行号
	 */
	@NotBlank(message = "收款账号联行号不能为空")
	private String payeeBankNo;
	/**
	 * 收款账号银行名称
	 */
	@NotBlank(message = "收款账号银行名称不能为空")
	private String payeeBankName;
	/**
	 * 交易币种默认为 '01':人民币
	 */
	private String curCode;
	/**
	 * 加急标识默认为 '0':普通
	 */
	private String urgencyFlag;

	public String getAid() {
		return aid;
	}

	public void setAid(String aid) {
		this.aid = aid;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getPayeeAccountNo() {
		return payeeAccountNo;
	}

	public void setPayeeAccountNo(String payeeAccountNo) {
		this.payeeAccountNo = payeeAccountNo;
	}

	public String getPayeeAccountName() {
		return payeeAccountName;
	}

	public void setPayeeAccountName(String payeeAccountName) {
		this.payeeAccountName = payeeAccountName;
	}

	public String getPayeeBankNo() {
		return payeeBankNo;
	}

	public void setPayeeBankNo(String payeeBankNo) {
		this.payeeBankNo = payeeBankNo;
	}

	public String getPayeeBankName() {
		return payeeBankName;
	}

	public void setPayeeBankName(String payeeBankName) {
		this.payeeBankName = payeeBankName;
	}

	public String getLoanNo() {
		return loanNo;
	}

	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getCurCode() {
		return curCode;
	}

	public void setCurCode(String curCode) {
		this.curCode = curCode;
	}

	public String getUrgencyFlag() {
		return urgencyFlag;
	}

	public void setUrgencyFlag(String urgencyFlag) {
		this.urgencyFlag = urgencyFlag;
	}

}
