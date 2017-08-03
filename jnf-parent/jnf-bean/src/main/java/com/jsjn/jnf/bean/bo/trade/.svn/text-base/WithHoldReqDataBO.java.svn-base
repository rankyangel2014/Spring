/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.validator.constraints.CheckAmount;
import com.jsjn.jnf.common.validator.constraints.CheckBankNo;
import com.jsjn.jnf.common.validator.constraints.CheckCustName;

/**
 * @author ZSMJ
 * 代扣请求/发送实体参数
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class WithHoldReqDataBO {
	
	/**
	 * 实际业务编号(请求)
	 */
	@NotBlank(message="实际业务编号不能为空")
	private String serialNo;
	
	/**
	 * 贷款合同号(请求)
	 */
	@NotBlank(message="贷款合同号不能为空")
	private String loanNo;
	
	/**
	 * 金农付银行卡绑定签约序号(请求)
	 */
	@NotBlank(message="金农付银行卡绑定签约序号不能为空")
	private String cardSignNo;
	
	/**
	 * 金农付客户编号(请求)
	 */
	@NotBlank(message="客户编号不能为空")
	private String custNo;
	
	/**
	 * 姓名(请求)
	 */
	@NotBlank(message="客户姓名不能为空")
	@CheckCustName(message="用户名输入不正确")
	private String custName;
	
	/**
	 * 银行名称(请求)
	 */
	@NotBlank(message="银行名称不能为空")
	private String bankName;
	
	/**
	 * 银行卡号(请求)
	 */
	@NotBlank(message="银行卡号不能为空")
	@CheckBankNo(message="银行卡号输入错误")
	private String bankCardNo;
	
	/**
	 * 代扣金额(请求)
	 */
	@CheckAmount(min = Global.AMT_MIN, max = Global.AMT_MAX)
	private BigDecimal amount;

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getLoanNo() {
		return loanNo;
	}

	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}

	public String getCardSignNo() {
		return cardSignNo;
	}

	public void setCardSignNo(String cardSignNo) {
		this.cardSignNo = cardSignNo;
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

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBankCardNo() {
		return bankCardNo;
	}

	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
	//比较数据
	public String secCheckString() {
		return this.getSerialNo() + "|" + this.getLoanNo() + "|" + this.getCardSignNo() + "|" + this.getCustNo() + "|"
				+ this.getCustName() + this.getBankName() + "|" + this.getBankCardNo() + "|" + this.getAmount();
	}
	
}
