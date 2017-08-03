/**
 * 
 */
package com.jsjn.jnf.bean.bo.cardBin;

import org.hibernate.validator.constraints.Length;

import com.jsjn.jnf.common.validator.constraints.CheckBankNo;


/**
 * @author ZSMJ
 * 卡BIN查询请求/发送实体参数
 */
public class CardBinQueryReqDataBO{
	/**
	 * 银行卡卡号(请求)
	 */
	@Length(max=40)
	@CheckBankNo(message="银行卡号输入错误")
	private String bankCardNo;

	public String getBankCardNo() {
		return bankCardNo;
	}

	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}
	
}
