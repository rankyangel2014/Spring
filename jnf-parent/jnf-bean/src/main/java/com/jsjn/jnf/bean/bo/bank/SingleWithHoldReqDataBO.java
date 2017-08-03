package com.jsjn.jnf.bean.bo.bank;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.validator.constraints.CheckAmount;
import com.jsjn.jnf.common.validator.constraints.CheckIdNo;

/**
 * 单笔代扣 请求报文数据类
 * 
 * @author yincy
 * 
 */
public class SingleWithHoldReqDataBO {

	/**
	 * 业务编号（商户流水号），唯一
	 */
	@NotBlank(message = "实际业务编号不能为空")
	private String serialNo;

	/**
	 * 小贷公司机构号
	 */
	@NotBlank(message = "小贷公司机构号不能为空")
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
	private String cardSignNo;

	/**
	 * 姓名
	 */
	@NotBlank(message = "姓名不能为空")
	private String custName;

	/**
	 * 身份证号不能为空
	 */
	@NotBlank(message = "身份证号不能为空")
	@CheckIdNo(message = "身份证号输入不正确")
	private String custIdNo;

	/**
	 * 交易金额
	 */
	@CheckAmount(min = Global.AMT_MIN, max = Global.AMT_MAX)
	private BigDecimal amount;

	/**
	 * 交易币种
	 */
	private String curCode;

	/**
	 * 是否批量代扣
	 */
	private String isBatched;
	/**
	 * 短信发送内容
	 */
	@NotBlank(message = "备注不能为空")
	private String remark;

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
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

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustIdNo() {
		return custIdNo;
	}

	public void setCustIdNo(String custIdNo) {
		this.custIdNo = custIdNo;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getCurCode() {
		return curCode;
	}

	public void setCurCode(String curCode) {
		this.curCode = curCode;
	}

	public String getIsBatched() {
		return isBatched;
	}

	public void setIsBatched(String isBatched) {
		this.isBatched = isBatched;
	}

	//二次验签用
	public String secCheckString() {
		return this.getSerialNo() + "|" + this.getOrgNo() + "|" + this.getLoanNo() + "|" + this.getCardSignNo() + "|"
				+ this.getCustName() + "|" + this.getCustIdNo() + "|" + this.getAmount() + "|" + this.getCurCode();
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
