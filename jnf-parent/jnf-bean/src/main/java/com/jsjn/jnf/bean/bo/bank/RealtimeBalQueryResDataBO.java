package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * 查询账号实时余额    商户返回报文    
 * @author yincy
 *
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
			"accountNo", 
			"curCode",
			"accountName",
			"acBalance",
			"uppBalance",
			"useBalance",
			"freezeBalance",
			"selfBalance",
			"bankNo",
			"bankName"})
public class RealtimeBalQueryResDataBO{
	
	/**
	 * 账号（银行卡卡号）
	 */
	private String accountNo;
	/**
	 * 币种
	 */
	private String curCode;
	/**
	 * 账户名称
	 */
	private String accountName;
	/**
	 * 账户余额（卡上实际余额）
	 */
	private String acBalance;
	/**
	 * 上存余额（签约资金归集子账户有效，其它类型为0.00）
	 */
	private String uppBalance;
	/**
	 * 可用余额（可支配余额）= 账户余额 + 上存余额 - 冻结余额
	 */
	private String useBalance;
	/**
	 * 冻结余额
	 */
	private String freezeBalance;
	/**
	 * 自身余额 =  账户余额 + 上存余额
	 */
	private String selfBalance;
	/**
	 * 联行号  预留字段
	 */
	private String bankNo;
	/**
	 * 账号所属银行名称 预留字段
	 */
	private String bankName;
	
	
	public String getSelfBalance() {
		return selfBalance;
	}
	public void setSelfBalance(String selfBalance) {
		this.selfBalance = selfBalance;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getCurCode() {
		return curCode;
	}
	public void setCurCode(String curCode) {
		this.curCode = curCode;
	}
	public String getAccountName() {
		return accountName;
	}
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}
	public String getAcBalance() {
		return acBalance;
	}
	public void setAcBalance(String acBalance) {
		this.acBalance = acBalance;
	}
	public String getUppBalance() {
		return uppBalance;
	}
	public void setUppBalance(String uppBalance) {
		this.uppBalance = uppBalance;
	}
	public String getUseBalance() {
		return useBalance;
	}
	public void setUseBalance(String useBalance) {
		this.useBalance = useBalance;
	}
	public String getFreezeBalance() {
		return freezeBalance;
	}
	public void setFreezeBalance(String freezeBalance) {
		this.freezeBalance = freezeBalance;
	}
	public String getBankNo() {
		return bankNo;
	}
	public void setBankNo(String bankNo) {
		this.bankNo = bankNo;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
}
