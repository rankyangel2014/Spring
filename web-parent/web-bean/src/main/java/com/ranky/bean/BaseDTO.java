package com.ranky.bean;

import java.io.Serializable;
import java.util.List;

/**
 * DTO基类
 * 
 * @author xiekx
 * 
 */
public class BaseDTO<T> implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer totalCount;// 记录数
	private Integer page; // 起始页数
	private String sort; //
	private Integer limit; //
	private List<T> root;
	private String resCode;
	private String resMsg;

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public List<T> getRoot() {
		return root;
	}

	public void setRoot(List<T> root) {
		this.root = root;
	}

	public String getResCode() {
		return resCode;
	}

	public void setResCode(String resCode) {
		this.resCode = resCode;
	}

	public String getResMsg() {
		return resMsg;
	}

	public void setResMsg(String resMsg) {
		this.resMsg = resMsg;
	}

	public Integer getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

}