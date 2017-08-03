package com.jsjn.jnf.bean.bo.integration.jsyh.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

/**
 * 江苏银行CT机 资金归集上存余额查询 返回报文报体
 * 
 * @author yincy
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
		"self_bal",
		"use_bal",
		"upp_bal",
		"bal",
		"ac_name",
		"gather_bal",
		"serial_record",
		"total",
		"record_num",
		"acname"})
public class JsResCashSweepQueryBody {

	private String self_bal; // 自身余额    上存+账户余额

	private String use_bal; // 可用余额

	private String upp_bal; // 上存金额

	private String bal; // 账户余额

	private String ac_name; // 账户名称
	
	private String gather_bal; // 归集资金 签约了资金归集的主账号才有效

	/**
	 * 归集子账户信息       签约了资金归集的主账号才有效
	 * acno|cur_code|acname|upp_bal|self_bal|dr_pile|cr_pile|bal|
	 * 账号|币种|户名|上存余额|自身余额|贷方积数|借方积数|余额
	 */
	private String serial_record;

	private String total; // 归集子账号数量
	
	private String record_num; // 归集子账号数量 = total
	
	private String acname; // 账户名称 = ac_name

	public String getSelf_bal() {
		return self_bal;
	}

	public void setSelf_bal(String self_bal) {
		this.self_bal = self_bal;
	}

	public String getUse_bal() {
		return use_bal;
	}

	public void setUse_bal(String use_bal) {
		this.use_bal = use_bal;
	}

	public String getUpp_bal() {
		return upp_bal;
	}

	public void setUpp_bal(String upp_bal) {
		this.upp_bal = upp_bal;
	}

	public String getBal() {
		return bal;
	}

	public void setBal(String bal) {
		this.bal = bal;
	}

	public String getAc_name() {
		return ac_name;
	}

	public void setAc_name(String ac_name) {
		this.ac_name = ac_name;
	}

	public String getGather_bal() {
		return gather_bal;
	}

	public void setGather_bal(String gather_bal) {
		this.gather_bal = gather_bal;
	}

	public String getSerial_record() {
		return serial_record;
	}

	public void setSerial_record(String serial_record) {
		this.serial_record = serial_record;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getRecord_num() {
		return record_num;
	}

	public void setRecord_num(String record_num) {
		this.record_num = record_num;
	}

	public String getAcname() {
		return acname;
	}

	public void setAcname(String acname) {
		this.acname = acname;
	}

}
