package com.jsjn.jnf.bean.bo.orgBusiness;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

/**
 * 机构支持业务查询
 * 
 * @author xiekx
 */
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class OrgBusinessResBO extends BaseOpenResBO<OrgBusinessResDataBO> {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3504326484984717203L;

	/**
	 * 接口响应具体参数(一条)
	 */
	private OrgBusinessResDataBO resData;

	public OrgBusinessResDataBO getResData() {
		return resData;
	}

	public void setResData(OrgBusinessResDataBO resData) {
		this.resData = resData;
	}

}
