package com.jsjn.jnf.bean.bo.withhold;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 查询机构提现卡号 请求报文数据类
 * 
 * @author yuh
 * 
 */
public class QueryOrgCardNoReqDataBo {
	@NotBlank(message="机构号不能为空")
	private String orgNo;

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}
}
