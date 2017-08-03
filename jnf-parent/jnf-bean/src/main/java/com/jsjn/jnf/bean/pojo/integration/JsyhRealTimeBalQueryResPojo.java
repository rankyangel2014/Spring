package com.jsjn.jnf.bean.pojo.integration;

/**
 * 账户余额查询 业务层 --> 集成层 返回参数
 * 
 * @author xiekx
 * 
 */
public class JsyhRealTimeBalQueryResPojo {

	/**
	 * 交易状态 对应com.jsjn.jnf.common.config.TradeCode中的状态
	 */
	private String tradeCode;

	/**
	 * 失败原因 交易失败才有效
	 */
	private String failReason;

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
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

	public String getFreezeBal() {
		return freezeBal;
	}

	public void setFreezeBal(String freezeBal) {
		this.freezeBal = freezeBal;
	}

	public String getUseBalance() {
		return useBalance;
	}

	public void setUseBalance(String useBalance) {
		this.useBalance = useBalance;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	private String accountName;//账户名称
	private String accountNo;//账户号
	private String curCode;//币种
	private String freezeBal;//冻结金额
	private String useBalance;//可用余额
	private String balance;//账户余额

	public JsyhRealTimeBalQueryResPojo() {
	}

	public JsyhRealTimeBalQueryResPojo(String tradeCode) {
		this.tradeCode = tradeCode;
	}

	public JsyhRealTimeBalQueryResPojo(String tradeCode, String failReason) {
		this.tradeCode = tradeCode;
		this.failReason = failReason;
	}

	public String getTradeCode() {
		return tradeCode;
	}

	public void setTradeCode(String tradeCode) {
		this.tradeCode = tradeCode;
	}

	public String getFailReason() {
		return failReason;
	}

	public void setFailReason(String failReason) {
		this.failReason = failReason;
	}
}
