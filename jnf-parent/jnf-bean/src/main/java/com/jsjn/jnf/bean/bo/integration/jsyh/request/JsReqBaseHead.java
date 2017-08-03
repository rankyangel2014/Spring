package com.jsjn.jnf.bean.bo.integration.jsyh.request;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import com.jsjn.jnf.common.utils.DateUtils;

/**
 * 江苏银行CT机 请求报文头
 * 
 * 必填项：tr_code req_no tr_acdt tr_time file_flag
 * 可选：reserved
 * 
 * @author yincy
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { 
		    "tr_code", 
		    "cms_corp_no", 
		    "user_no", 
		    "org_code",
		    "serial_no",
		    "req_no",
		    "tr_acdt",
		    "tr_time",
		    "channel",
		    "sign",
		    "file_flag",
		    "reserved"})
public class JsReqBaseHead {

	private String tr_code; // 交易码

	private String cms_corp_no = ""; // 现金管理客户号 企业不需要赋企，由银企前置机进行赋值

	private String user_no = ""; // 用户号 企业不需要赋企，由银企前置机进行赋值。

	private String org_code = ""; // 机构号 企业不需要赋企，由银企前置机进行赋值

	private String serial_no = ""; // 交易流水号 送空,由现金管理系统产生

	private String req_no; // 请求号 企业ERP的流水号（无实际用处）

	private String tr_acdt = DateUtils.getDate("yyyyMMdd"); // 交易日期 格式YYYYMMDD

	private String tr_time = DateUtils.getTime("hhmmss"); // 交易时间 格式hhmmss

	private String channel = "5"; // 渠道标识 ERP送‘5’

	private String sign = ""; // 签名标识 0-报文未签名 1-报文已签名 企业送空，由银企前置进行传送.

	private String file_flag; // 文件标识 0-报文1-文件

	private String reserved = ""; // 保留字段

	public String getTr_code() {
		return tr_code;
	}

	public void setTr_code(String tr_code) {
		this.tr_code = tr_code;
	}

	public String getCms_corp_no() {
		return cms_corp_no;
	}

	public String getUser_no() {
		return user_no;
	}

	public String getOrg_code() {
		return org_code;
	}

	public String getSerial_no() {
		return serial_no;
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

	public String getTr_time() {
		return tr_time;
	}

	public void setTr_time(String tr_time) {
		this.tr_time = tr_time;
	}

	public String getFile_flag() {
		return file_flag;
	}

	public void setFile_flag(String file_flag) {
		this.file_flag = file_flag;
	}

	public String getReserved() {
		return reserved;
	}

	public void setReserved(String reserved) {
		this.reserved = reserved;
	}

	public String getChannel() {
		return channel;
	}

	public String getSign() {
		return sign;
	}
}
