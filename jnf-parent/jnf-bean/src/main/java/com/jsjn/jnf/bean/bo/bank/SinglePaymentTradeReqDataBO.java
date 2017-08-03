package com.jsjn.jnf.bean.bo.bank;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.validator.constraints.CheckAmount;
import com.jsjn.jnf.common.validator.constraints.CheckBankNo;


/**
 * 单笔对外支付    商户请求报文数据类
 * @author yincy
 * 
 */
public class SinglePaymentTradeReqDataBO {
	
	/**
	 * 业务编号（商户流水号），唯一
	 */
	@NotBlank(message="实际业务编号不能为空")
	private String serialNo;
	
	/**
	 * 外部贷款合同号，由业务发起方提供
	 */
	private String externLoanNo;
	
	/**
	 * 付款账号 (银行卡卡号)
	 */
	@NotBlank(message="付款账号不能为空")
	@CheckBankNo(message="付款账号不正确")
	private String payorAccountNo;
	
	/**
	 * 付款户名
	 */
	@NotBlank(message="付款户名不能为空")
	@Length(max=70,message="付款户名超过70位")
	private String payorAccountName;
	
	/**
	 * 收款账号
	 */
	@NotBlank(message="收款账号不能为空")
	@CheckBankNo(message="收款账号不正确")
	private String payeeAccountNo;
	
	/**
	 * 收款户名
	 */
	@NotBlank(message="收款户名不能为空")
	@Length(max=70,message="收款户名超过70位")
	private String payeeAccountName;
	
	/**
	 * 收款账号联行号
	 */
	@Length(max=12,message="联行号不正确")
	private String payeeBankNo;
	
	/**
	 * 收款账号银行名称
	 */
	@Length(max=60,message="收款账号银行名称超过60位")
	private String payeeBankName;
	
	/**
	 * 交易币种
	 */
	private String curCode;
	
	/**
	 * 交易金额
	 */
	@CheckAmount(min = Global.AMT_MIN, max = Global.AMT_MAX)
	private BigDecimal amount;
	
	/**
	 * 加急标志
	 */
	private String urgencyFlag;
	
	/**
	 * 用途
	 */
	@Length(max=30,message="用途超过30位")
	private String purpose;

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getExternLoanNo() {
		return externLoanNo;
	}

	public void setExternLoanNo(String externLoanNo) {
		this.externLoanNo = externLoanNo;
	}

	public String getPayorAccountNo() {
		return payorAccountNo;
	}

	public void setPayorAccountNo(String payorAccountNo) {
		this.payorAccountNo = payorAccountNo;
	}

	public String getPayorAccountName() {
		return payorAccountName;
	}

	public void setPayorAccountName(String payorAccountName) {
		this.payorAccountName = payorAccountName;
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

	public String getCurCode() {
		return curCode;
	}

	public void setCurCode(String curCode) {
		this.curCode = curCode;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getUrgencyFlag() {
		return urgencyFlag;
	}

	public void setUrgencyFlag(String urgencyFlag) {
		this.urgencyFlag = urgencyFlag;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}
	
	//比较数据
	public String secCheckString() {
		return this.getSerialNo() + "|" + this.getExternLoanNo() + "|" + this.getPayorAccountNo() + "|" + this.getPayorAccountName() + "|"
				+ this.getPayeeAccountNo() + this.getPayeeAccountName() + "|" + this.getPayeeBankNo() + "|" + this.getPayeeBankName() + "|" 
				+ this.getCurCode() + "|" + this.getAmount() + "|" + this.getUrgencyFlag() + "|" + this.getPurpose();
	}
	
}
