package com.jsjn.jnf.bean.bo.integration.jsyh.request;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

/**
 * 江苏银行CT机    查询流水状态   请求报体
 * @author yincy
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
			"cert_no", 
			"req_no",
			"tr_acdt",
			"cms_corp_no"})
public class JsReqFlowStateQueryBody {
	private String cert_no; // 凭证号  企业ERP[账务]流水号

	private String req_no = ""; // 请求号 企业ERP［请求］流水号  PS:暂且用不到,默认置为空
	
	private String tr_acdt; //交易日期
	
	private String cms_corp_no = ""; //前置机自己赋值  企业接口可没有

	public String getCert_no() {
		return cert_no;
	}

	public void setCert_no(String cert_no) {
		this.cert_no = cert_no;
	}

	public String getReq_no() {
		return req_no;
	}

	public void setReq_no(String req_no) {
		this.req_no = req_no;
	}

	public String getTr_acdt() {
		return tr_acdt;
	}

	public void setTr_acdt(String tr_acdt) {
		this.tr_acdt = tr_acdt;
	}

	public String getCms_corp_no() {
		return cms_corp_no;
	}

	public void setCms_corp_no(String cms_corp_no) {
		this.cms_corp_no = cms_corp_no;
	}
	
}
