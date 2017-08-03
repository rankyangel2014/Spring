package com.jsjn.jnf.bean.bo.withhold;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;
import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;
/**
 * 查询机构提现卡号 响应报文
 * 
 * @author yuh
 * 
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class QueryOrgCardNoResBo extends BaseOpenResBO<QueryOrgCardNoResDataBo>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private QueryOrgCardNoResDataBo	resData;

	public QueryOrgCardNoResDataBo getResData() {
		return resData;
	}

	public void setResData(QueryOrgCardNoResDataBo resData) {
		this.resData = resData;
	}
	
	
	
}
