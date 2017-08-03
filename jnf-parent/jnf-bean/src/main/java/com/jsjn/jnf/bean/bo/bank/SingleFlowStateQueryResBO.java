package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;


/**
 * 单笔支付流水状态查询  商户返回报文
 * @author yincy
 *
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SingleFlowStateQueryResBO extends BaseOpenResBO<SingleFlowStateQueryResDataBO> {

	private static final long serialVersionUID = 1L;
	
	private SingleFlowStateQueryResDataBO resData;

	public SingleFlowStateQueryResDataBO getResData() {
		return resData;
	}

	public void setResData(SingleFlowStateQueryResDataBO resData) {
		this.resData = resData;
	}
}
