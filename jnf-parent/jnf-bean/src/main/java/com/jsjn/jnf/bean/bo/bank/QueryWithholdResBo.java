package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class QueryWithholdResBo extends BaseOpenResBO<QueryWithholdDataResBo>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private QueryWithholdDataResBo resData;

	/**
	 * @return the resData
	 */
	public QueryWithholdDataResBo getResData() {
		return resData;
	}

	/**
	 * @param resData the resData to set
	 */
	public void setResData(QueryWithholdDataResBo resData) {
		this.resData = resData;
	}

	
	
	
}
