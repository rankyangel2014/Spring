package com.jsjn.jnf.bean.dto.base;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

//import com.jsjn.platform.driver.serialize.CSerializer;

/**
 * DTO基类
 * 
 * @author lilong
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
public class BaseDTO<T> implements Serializable {

	private static final long serialVersionUID = 1L;

	private long total = 0;// 记录数

	private Integer flag; // 操作标志

	private Integer start = 0; // 起始页数

	private Integer limit = -1; //

	private List<T> root;

	private String resCode;

	private String resMsg;

	private boolean isNewRecord = false;

	public boolean getIsNewRecord() {
		return isNewRecord;
	}

	public void setIsNewRecord(boolean isNewRecord) {
		this.isNewRecord = isNewRecord;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

//	public BaseDTO<T>[] getRoot() {
//		return root;
//	}
//
//	public void setRoot(BaseDTO<T>[] root) {
//		this.root = root;
//	}

	public String getResCode() {
		return resCode;
	}

	public List<T> getRoot() {
    return root;
  }

  public void setRoot(List<T> root) {
    this.root = root;
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

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

}