package com.jsjn.jnf.bean.bo.integration;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * 卡BIN查询请求对象
 * 
 * @author xiekx
 * 
 */
@XmlRootElement(name = "message")
public class CardBinReqDto extends CommonMessageReq {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String accountNo;// 账号

	/**
	 * 默认构造函数
	 */
	public CardBinReqDto() {
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	@Override
	public String toString() {
		return "[orgNo=" + super.getOrgNo() + ", tranCd=" + super.getTranCd()
				+ ", tranDt=" + super.getTranDt() + "accountNo=" + accountNo
				+ "]";
	}
}
