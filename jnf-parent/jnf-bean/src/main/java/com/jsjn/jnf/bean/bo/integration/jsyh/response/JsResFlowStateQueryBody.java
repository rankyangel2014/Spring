package com.jsjn.jnf.bean.bo.integration.jsyh.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

/**
 * 江苏银行CT机 查询流水状态 返回报文报体
 * 
 * @author yincy
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
		"stat",
		"serial_no",
		"req_no",
		"cert_no",
		"cms_corp_no",
		"tr_acdt",
		"tr_time",
		"amt",
		"fee_amt",
		"error_info"})
public class JsResFlowStateQueryBody {
	
	/**
	 * 流水状态
	 * 9-交易成功 6－交易失败 8－交易结果未知 3－银行落地处理中
	 */
	private String stat;
	
	/**
	 * 现金管理平台流水号
	 */
	private String serial_no;
	
	/**
	 * 请求号 
	 * 企业ERP［请求］流水号
	 */
	private String req_no;
	
	/**
	 * 凭证号
	 * 企业ERP[账务]流水号
	 */
	private String cert_no;
	
	/**
	 * 客户号
	 */
	private String cms_corp_no;
	
	/**
	 * 交易日期
	 */
	private String tr_acdt;
	
	/**
	 * 交易时间
	 */
	private String tr_time;
	
	/**
	 * 交易金额
	 */
	private String amt;
	
	/**
	 * 手续费
	 */
	private String fee_amt;
	
	/**
	 * 错误信息
	 */
	private String error_info;

	public String getStat() {
		return stat;
	}

	public void setStat(String stat) {
		this.stat = stat;
	}

	public String getSerial_no() {
		return serial_no;
	}

	public void setSerial_no(String serial_no) {
		this.serial_no = serial_no;
	}

	public String getReq_no() {
		return req_no;
	}

	public void setReq_no(String req_no) {
		this.req_no = req_no;
	}

	public String getCert_no() {
		return cert_no;
	}

	public void setCert_no(String cert_no) {
		this.cert_no = cert_no;
	}

	public String getCms_corp_no() {
		return cms_corp_no;
	}

	public void setCms_corp_no(String cms_corp_no) {
		this.cms_corp_no = cms_corp_no;
	}

	public String getTr_acdt() {
		return tr_acdt;
	}

	public void setTr_acdt(String tr_acdt) {
		this.tr_acdt = tr_acdt;
	}

	public String getTr_time() {
		return tr_time;
	}

	public void setTr_time(String tr_time) {
		this.tr_time = tr_time;
	}

	public String getAmt() {
		return amt;
	}

	public void setAmt(String amt) {
		this.amt = amt;
	}

	public String getFee_amt() {
		return fee_amt;
	}

	public void setFee_amt(String fee_amt) {
		this.fee_amt = fee_amt;
	}

	public String getError_info() {
		return error_info;
	}

	public void setError_info(String error_info) {
		this.error_info = error_info;
	}

}
