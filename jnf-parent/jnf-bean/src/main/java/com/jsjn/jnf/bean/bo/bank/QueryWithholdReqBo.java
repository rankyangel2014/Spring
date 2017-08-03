package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class QueryWithholdReqBo extends BaseOpenReqBO{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private QueryWithholdReqDataBo reqData;

	/**
	 * @return the reqData
	 */
	public QueryWithholdReqDataBo getReqData() {
		return reqData;
	}

	/**
	 * @param reqData the reqData to set
	 */
	public void setReqData(QueryWithholdReqDataBo reqData) {
		this.reqData = reqData;
	}



	
	

}
