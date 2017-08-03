package com.jsjn.skylark.bean;

import java.util.ArrayList;

import com.jsjn.platform.driver.serialize.CSerializer;

public class BaseDto<T> extends CSerializer {

	private static final long serialVersionUID = 1L;
	private String orgType; // 机构类型
	private String orgNo; // 机构码
	private Boolean noRecNotice = false;// 查询不到记录，是否通知前台，默认通知
	private Boolean isUseCurOrgNo = true;// 是否使用当前登录用户机构号,默认使用
	private Boolean isSafeCheckOrg = false;// 是否对当前机构做安全检查
	private Integer count = 0;// 记录数
	private Integer flag; // 操作标志
	private Long start; // 起始页数
	private String _accDate;
	private String jsonData;
	private String optFlagInter; // 平台接口操作标志 0：新增，1：修改,2：新增+修改，3：删除
	private String isJsonSingle;// 是否执行jsonQueryForSingle函数

	private ArrayList<T> recList; // 数据集

	public String get_accDate() {
		return _accDate;
	}

	public void set_accDate(String _accDate) {
		this._accDate = _accDate;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public Long getStart() {
		return start;
	}

	public void setStart(Long start) {
		this.start = start;
	}

	public String getJsonData() {
		return jsonData;
	}

	public void setJsonData(String jsonData) {
		this.jsonData = jsonData;
	}

	public Boolean getNoRecNotice() {
		return noRecNotice;
	}

	public void setNoRecNotice(Boolean noRecNotice) {
		this.noRecNotice = noRecNotice;
	}

	public Boolean getIsUseCurOrgNo() {
		return isUseCurOrgNo;
	}

	public void setIsUseCurOrgNo(Boolean isUseCurOrgNo) {
		this.isUseCurOrgNo = isUseCurOrgNo;
	}

	public Boolean getIsSafeCheckOrg() {
		return isSafeCheckOrg;
	}

	public void setIsSafeCheckOrg(Boolean isSafeCheckOrg) {
		this.isSafeCheckOrg = isSafeCheckOrg;
	}

	public ArrayList<T> getRecList() {
		return recList;
	}

	public void setRecList(ArrayList<T> recList) {
		this.recList = recList;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getOrgType() {
		return orgType;
	}

	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}

	public String getOptFlagInter() {
		return optFlagInter;
	}

	public void setOptFlagInter(String optFlagInter) {
		this.optFlagInter = optFlagInter;
	}

	public String getIsJsonSingle() {
		return isJsonSingle;
	}

	public void setIsJsonSingle(String isJsonSingle) {
		this.isJsonSingle = isJsonSingle;
	}

}
