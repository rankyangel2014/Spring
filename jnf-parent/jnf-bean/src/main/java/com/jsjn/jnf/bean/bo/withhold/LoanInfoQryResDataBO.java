package com.jsjn.jnf.bean.bo.withhold;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * 
 * @author ThinkPad
 * 贷款信息查询返回BO
 *
 */
public class LoanInfoQryResDataBO extends BaseDTO<LoanInfoQryResDataBO>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1710882997778451734L;
	
	/**
	 * 客户名称
	 */
	
	private String custName;
	/**
	 * 客户号
	 */
	private String custNo;
	/**
	 * 机构号
	 */
	private String insttuId;
	
	/**
	 * 客户类型
	 */
	private String custType;
	
	/**
	 * 证件类型
	 */
	private String idType;
	
	/**
	 * 证件号码
	 */
	private String idNo;
	
	/**
	 * 贷款合同号
	 */
	private String contNo;
	
	/**
	 * 借据号
	 */
	private String loanNo;
	
	/**
	 * 还款方式
	 */
	private String repayType;
	
	/**
	 * 贷款本金
	 */
	private String osPrcp;
	
	/**
	 * 剩余本金
	 */
	private String resPrcp;
	
	/**
	 * 起息日
	 */
	private String startDate;
	
	
	/**
	 * 到息日
	 */
	private String endDate;


	public String getCustName() {
		return custName;
	}


	public void setCustName(String custName) {
		this.custName = custName;
	}


	public String getCustType() {
		return custType;
	}


	public void setCustType(String custType) {
		this.custType = custType;
	}


	public String getIdType() {
		return idType;
	}


	public void setIdType(String idType) {
		this.idType = idType;
	}


	public String getIdNo() {
		return idNo;
	}


	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}


	public String getContNo() {
		return contNo;
	}


	public void setContNo(String contNo) {
		this.contNo = contNo;
	}


	public String getLoanNo() {
		return loanNo;
	}


	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}


	public String getRepayType() {
		return repayType;
	}


	public void setRepayType(String repayType) {
		this.repayType = repayType;
	}


	public String getOsPrcp() {
		return osPrcp;
	}


	public void setOsPrcp(String osPrcp) {
		this.osPrcp = osPrcp;
	}


	public String getResPrcp() {
		return resPrcp;
	}


	public void setResPrcp(String resPrcp) {
		this.resPrcp = resPrcp;
	}


	public String getStartDate() {
		return startDate;
	}


	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}


	public String getEndDate() {
		return endDate;
	}


	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	
	public String getCustNo() {
		return custNo;
	}


	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}


	public String getInsttuId() {
		return insttuId;
	}


	public void setInsttuId(String insttuId) {
		this.insttuId = insttuId;
	}
}
