package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;

/**
 * 批量代扣 请求报文数据类
 * 
 * @author xiekx
 * 
 */
public class BatchWithHoldReqDataBO {

	@NotBlank(message = "批次号不能为空")
	private String batchNo;//批次号（由真实发起的业务层提供，同时也是防重复编号（唯一））
	@NotBlank(message = "MD5签名不能为空")
	private String sign;//MD5签名（文件内容的MD5签名）
	@NotBlank(message = "文件名不能为空")
	private String fileName;//文件名称（文件名称，FTP下载使用）

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}
