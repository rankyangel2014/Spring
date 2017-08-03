package com.jsjn.jnf.bean.bo.statement;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 商户对账 请求报文数据类
 * 
 * @author yincy
 * 
 */
public class StatementReqDataBO {
	/**
	 * 对账日期
	 */
	@NotBlank(message = "对账日期不能为空")
	private String verifyDate;

	/**
	 * 文件名称
	 */
	@NotBlank(message = "文件名称不能为空")
	private String fileName;

	public String getVerifyDate() {
		return verifyDate;
	}

	public void setVerifyDate(String verifyDate) {
		this.verifyDate = verifyDate;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}
