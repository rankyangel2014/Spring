package com.jsjn.jnf.bean.bo.integration.jsyh.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

/**
 * 江苏银行CT机 返回报文头
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
		    "succ_flag",
		    "ret_code",
		    "ret_info",
		    "ext_info",
		    "file_flag",
		    "reserved"})
public class JsResBaseHead {

	private String tr_code; // 交易码

	private String cms_corp_no; //公共返回，企业可不用

	private String user_no; //公共返回，企业可不用

	private String org_code; //公共返回，企业可不用

	private String serial_no; // 公共返回，企业可不用

	private String req_no; // 企业ERP的流水号，原样返回

	private String tr_acdt; // 交易日期 格式YYYYMMDD

	private String tr_time; // 交易时间 格式hhmmss
	
	private String succ_flag; // 是否成功标识         0:表示成功   1:表示通讯机超时  8:表示主机结果未知    其它:交易失败

	private String ret_code; // 返回码   0000表示成功，正常返回

	private String ret_info; // 返回信息

	private String ext_info; // 返回附加信息

	private String file_flag; // 文件标识 0-报文1-文件

	private String reserved; // 保留字段

	public String getTr_code() {
		return tr_code;
	}

	public void setTr_code(String tr_code) {
		this.tr_code = tr_code;
	}

	public String getCms_corp_no() {
		return cms_corp_no;
	}

	public void setCms_corp_no(String cms_corp_no) {
		this.cms_corp_no = cms_corp_no;
	}

	public String getUser_no() {
		return user_no;
	}

	public void setUser_no(String user_no) {
		this.user_no = user_no;
	}

	public String getOrg_code() {
		return org_code;
	}

	public void setOrg_code(String org_code) {
		this.org_code = org_code;
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

	public String getSucc_flag() {
		return succ_flag;
	}

	public void setSucc_flag(String succ_flag) {
		this.succ_flag = succ_flag;
	}

	public String getRet_code() {
		return ret_code;
	}

	public void setRet_code(String ret_code) {
		this.ret_code = ret_code;
	}

	public String getRet_info() {
		return ret_info;
	}

	public void setRet_info(String ret_info) {
		this.ret_info = ret_info;
	}

	public String getExt_info() {
		return ext_info;
	}

	public void setExt_info(String ext_info) {
		this.ext_info = ext_info;
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
}
