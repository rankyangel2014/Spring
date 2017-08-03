package com.jsjn.jnf.bean.bo.integration.jsyh.request;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

/**
 * 江苏银行CT机   对外支付接口  报体
 * @author yincy
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
		    "pay_acno", 
		    "pay_cur_code", 
		    "pay_acname",
			"as_flag", 
			"as_acno", 
			"as_acname", 
			"cert_type", 
			"cert_no",
			"rcv_acno", 
			"rcv_cur_code", 
			"rcv_acname", 
			"rcv_bank_no",
			"rcv_bank_name",
			"amt", 
			"bank_flag", 
			"urgency_flag", 
			"purpose",
			"postscript"})
public class JsReqSinglePaymentTradeBody {
	private String pay_acno; // 付款账号

	private String pay_cur_code; // 付款币种

	private String pay_acname; // 付款户名

	private String as_flag; // 账簿标志

	private String as_acno; // 账簿号

	private String as_acname; // 账簿名称

	private String cert_type; // 凭证种类

	private String cert_no; // 凭证号

	private String rcv_acno; // 收款行号

	private String rcv_cur_code; // 收款币种

	private String rcv_acname; // 收款户名

	private String rcv_bank_no; // 收款行号

	private String rcv_bank_name; // 收款行名

	private BigDecimal amt; // 交易金额  N(16,2)

	private String bank_flag; // 银行标志

	private String urgency_flag; // 加急标志

	private String purpose; // 用途

	private String postscript; // 附言

	public String getPay_acno() {
		return pay_acno;
	}

	public void setPay_acno(String pay_acno) {
		this.pay_acno = pay_acno;
	}

	public String getPay_cur_code() {
		return pay_cur_code;
	}

	public void setPay_cur_code(String pay_cur_code) {
		this.pay_cur_code = pay_cur_code;
	}

	public String getPay_acname() {
		return pay_acname;
	}

	public void setPay_acname(String pay_acname) {
		this.pay_acname = pay_acname;
	}

	public String getAs_flag() {
		return as_flag;
	}

	public void setAs_flag(String as_flag) {
		this.as_flag = as_flag;
	}

	public String getAs_acno() {
		return as_acno;
	}

	public void setAs_acno(String as_acno) {
		this.as_acno = as_acno;
	}

	public String getAs_acname() {
		return as_acname;
	}

	public void setAs_acname(String as_acname) {
		this.as_acname = as_acname;
	}

	public String getCert_type() {
		return cert_type;
	}

	public void setCert_type(String cert_type) {
		this.cert_type = cert_type;
	}

	public String getCert_no() {
		return cert_no;
	}

	public void setCert_no(String cert_no) {
		this.cert_no = cert_no;
	}

	public String getRcv_acno() {
		return rcv_acno;
	}

	public void setRcv_acno(String rcv_acno) {
		this.rcv_acno = rcv_acno;
	}

	public String getRcv_cur_code() {
		return rcv_cur_code;
	}

	public void setRcv_cur_code(String rcv_cur_code) {
		this.rcv_cur_code = rcv_cur_code;
	}

	public String getRcv_acname() {
		return rcv_acname;
	}

	public void setRcv_acname(String rcv_acname) {
		this.rcv_acname = rcv_acname;
	}

	public String getRcv_bank_no() {
		return rcv_bank_no;
	}

	public void setRcv_bank_no(String rcv_bank_no) {
		this.rcv_bank_no = rcv_bank_no;
	}

	public String getRcv_bank_name() {
		return rcv_bank_name;
	}

	public void setRcv_bank_name(String rcv_bank_name) {
		this.rcv_bank_name = rcv_bank_name;
	}

	public BigDecimal getAmt() {
		return amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	public String getBank_flag() {
		return bank_flag;
	}

	public void setBank_flag(String bank_flag) {
		this.bank_flag = bank_flag;
	}

	public String getUrgency_flag() {
		return urgency_flag;
	}

	public void setUrgency_flag(String urgency_flag) {
		this.urgency_flag = urgency_flag;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getPostscript() {
		return postscript;
	}

	public void setPostscript(String postscript) {
		this.postscript = postscript;
	}

}
