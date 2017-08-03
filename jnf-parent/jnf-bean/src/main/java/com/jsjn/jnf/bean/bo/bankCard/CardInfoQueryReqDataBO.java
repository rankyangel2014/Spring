/**
 * 
 */
package com.jsjn.jnf.bean.bo.bankCard;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.validator.constraints.CheckBankNo;

/**
 * 卡BIN查询
 * 
 * @author xiekx
 */
public class CardInfoQueryReqDataBO {

	/**
	 * 机构号
	 */
	@NotBlank(message = "机构号不能为空")
	private String orgNo;

	/**
	 * 银行卡卡号(请求)
	 */
	@CheckBankNo(message = "银行卡号输入错误")
	private String bankCardNo;

	public String getBankCardNo() {
		return bankCardNo;
	}

	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

}
