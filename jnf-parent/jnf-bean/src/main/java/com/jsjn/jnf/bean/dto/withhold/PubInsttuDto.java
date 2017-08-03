package com.jsjn.jnf.bean.dto.withhold;

import java.io.Serializable;
import java.util.List;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * 小微贷机构DTO
 * 
 * @author xiekx
 * 
 */
public class PubInsttuDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String insttuId;// 机构ID
	private String outPutResult;// 不传参默认返回'INSTTU_TY, INSTTU_ID
	private String insttuName;// 机构名称
	private String insttuTy;// 机构类型
	private String insttuLev;// 机构级别
	private String insttuArea;// 机构区域
	private String insttuStat;// 机构状态
	private String isDepart;// 机构0/ 部门1
	private String insttuAttr;// 机构属性-0:网点机构1:管理机构，
	private String startRow;// 分页-开始数
	private String maxRows;// 分页-每页条数

	public PubInsttuDto() {
		this.insttuId = "";
		this.outPutResult = "";
		this.insttuName = "";
		this.insttuTy = "";
		this.insttuLev = "";
		this.insttuArea = "";
		this.insttuStat = "";
		this.isDepart = "";
		this.insttuAttr = "";
		this.startRow = "";
		this.maxRows = "";
	}

	public String getInsttuId() {
		return insttuId;
	}

	public void setInsttuId(String insttuId) {
		this.insttuId = insttuId;
	}

	public String getInsttuName() {
		return insttuName;
	}

	public void setInsttuName(String insttuName) {
		this.insttuName = insttuName;
	}

	public String getInsttuTy() {
		return insttuTy;
	}

	public void setInsttuTy(String insttuTy) {
		this.insttuTy = insttuTy;
	}

	public String getInsttuLev() {
		return insttuLev;
	}

	public void setInsttuLev(String insttuLev) {
		this.insttuLev = insttuLev;
	}

	public String getInsttuArea() {
		return insttuArea;
	}

	public void setInsttuArea(String insttuArea) {
		this.insttuArea = insttuArea;
	}

	public String getInsttuStat() {
		return insttuStat;
	}

	public void setInsttuStat(String insttuStat) {
		this.insttuStat = insttuStat;
	}

	public String getIsDepart() {
		return isDepart;
	}

	public void setIsDepart(String isDepart) {
		this.isDepart = isDepart;
	}

	public String getInsttuAttr() {
		return insttuAttr;
	}

	public void setInsttuAttr(String insttuAttr) {
		this.insttuAttr = insttuAttr;
	}

	public String getStartRow() {
		return startRow;
	}

	public void setStartRow(String startRow) {
		this.startRow = startRow;
	}

	public String getMaxRows() {
		return maxRows;
	}

	public void setMaxRows(String maxRows) {
		this.maxRows = maxRows;
	}

	public String getOutPutResult() {
		return outPutResult;
	}

	public void setOutPutResult(String outPutResult) {
		this.outPutResult = outPutResult;
	}

}
