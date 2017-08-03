package com.jsjn.jnf.bean.bo.bank;

import org.hibernate.validator.constraints.Length;

import com.jsjn.jnf.common.validator.constraints.CheckBankNo;


/**
 * @author yincy
 * 商户请求报文   reqData
 */
public class RealtimeBalQueryReqDataBO {
	/**
	 * 账号  (银行卡卡号)
	 */
	@Length(max=40)
	@CheckBankNo(message="银行卡号不正确")
	private String accountNo;
	
	/**
	 * 币种 (默认为：01-人民币)
	 */
	private String curCode;

	public String getCurCode() {
		return curCode;
	}

	public void setCurCode(String curCode) {
		this.curCode = curCode;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
}
