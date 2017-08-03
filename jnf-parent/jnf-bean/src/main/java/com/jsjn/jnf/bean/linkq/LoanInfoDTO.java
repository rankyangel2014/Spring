package com.jsjn.jnf.bean.linkq;

import java.util.ArrayList;

import com.jsjn.jnf.common.linkq.LinkQBaseDTO;

/**
 * 查询贷款相关DTO
 * 
 * @author CodmerYin
 * 
 */
public class LoanInfoDTO extends LinkQBaseDTO {

	private static final long serialVersionUID = 1L;

	private String orgNo;//机构号
	private String custManagerNo;// 客户经理编号
	private String custName;// 客户名称
	private String custType;// 客户类型
	private String paperType;// 证件类型
	private String paperNo;// 证件号码
	private String contNoExt;// 贷款合同号
	private String repayTyp;// 还款方式
	private String intStartDtS;// 起息日（起）
	private String intStartDtE;// 起息日（止）
	private String loanNo;// 借据号
	private String custNo;// 客户号
	private String intStartDt;// 起息日
	private String lastDueDt;// 到期日
	private Double prcpOrig;// 贷款本金
	private Double prcpBal;// 剩余本金
	private String recourse; //是否绑定利息保证金代扣
	private String isBatchPay; //是否参加批量代扣
	private int payStartDay; //金农付代扣启动提前天数
	private String orderType;//排序方式
	private String setlFlg;//结清标识：Y:是 N:否

	private String signStatus;// 签约状态
	private String cardSignNo;// 签约协议号
	private String payChannel;// 支付渠道
	private ArrayList<LoanInfoDTO> resultList;

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getSetlFlg() {
		return setlFlg;
	}

	public void setSetlFlg(String setlFlg) {
		this.setlFlg = setlFlg;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getCustManagerNo() {
		return custManagerNo;
	}

	public void setCustManagerNo(String custManagerNo) {
		this.custManagerNo = custManagerNo;
	}

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

	public String getPaperType() {
		return paperType;
	}

	public void setPaperType(String paperType) {
		this.paperType = paperType;
	}

	public String getPaperNo() {
		return paperNo;
	}

	public void setPaperNo(String paperNo) {
		this.paperNo = paperNo;
	}

	public String getContNoExt() {
		return contNoExt;
	}

	public void setContNoExt(String contNoExt) {
		this.contNoExt = contNoExt;
	}

	public String getRepayTyp() {
		return repayTyp;
	}

	public void setRepayTyp(String repayTyp) {
		this.repayTyp = repayTyp;
	}

	public String getIntStartDtS() {
		return intStartDtS;
	}

	public void setIntStartDtS(String intStartDtS) {
		this.intStartDtS = intStartDtS;
	}

	public String getIntStartDtE() {
		return intStartDtE;
	}

	public void setIntStartDtE(String intStartDtE) {
		this.intStartDtE = intStartDtE;
	}

	public String getLoanNo() {
		return loanNo;
	}

	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}

	public String getCustNo() {
		return custNo;
	}

	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}

	public String getIntStartDt() {
		return intStartDt;
	}

	public void setIntStartDt(String intStartDt) {
		this.intStartDt = intStartDt;
	}

	public String getLastDueDt() {
		return lastDueDt;
	}

	public void setLastDueDt(String lastDueDt) {
		this.lastDueDt = lastDueDt;
	}

	public Double getPrcpOrig() {
		return prcpOrig;
	}

	public void setPrcpOrig(Double prcpOrig) {
		this.prcpOrig = prcpOrig;
	}

	public Double getPrcpBal() {
		return prcpBal;
	}

	public void setPrcpBal(Double prcpBal) {
		this.prcpBal = prcpBal;
	}

	public String getRecourse() {
		return recourse;
	}

	public void setRecourse(String recourse) {
		this.recourse = recourse;
	}

	public String getIsBatchPay() {
		return isBatchPay;
	}

	public void setIsBatchPay(String isBatchPay) {
		this.isBatchPay = isBatchPay;
	}

	public int getPayStartDay() {
		return payStartDay;
	}

	public void setPayStartDay(int payStartDay) {
		this.payStartDay = payStartDay;
	}

	public ArrayList<LoanInfoDTO> getResultList() {
		return resultList;
	}

	public void setResultList(ArrayList<LoanInfoDTO> resultList) {
		this.resultList = resultList;
	}

	public String getSignStatus() {
		return signStatus;
	}

	public void setSignStatus(String signStatus) {
		this.signStatus = signStatus;
	}

	public String getPayChannel() {
		return payChannel;
	}

	public void setPayChannel(String payChannel) {
		this.payChannel = payChannel;
	}

	public String getCardSignNo() {
		return cardSignNo;
	}

	public void setCardSignNo(String cardSignNo) {
		this.cardSignNo = cardSignNo;
	}

}
