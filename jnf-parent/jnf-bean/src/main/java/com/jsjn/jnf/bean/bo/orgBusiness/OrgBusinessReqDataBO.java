package com.jsjn.jnf.bean.bo.orgBusiness;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 机构支持业务查询
 * 
 * @author xiekx
 */
public class OrgBusinessReqDataBO {
	/**
	 * 机构号(请求)
	 */
	@NotBlank(message = "机构号不能为空")
	private String orgNo;

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

}
