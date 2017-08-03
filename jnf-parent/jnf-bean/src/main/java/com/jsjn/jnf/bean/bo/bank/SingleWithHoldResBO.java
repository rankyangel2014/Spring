package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

/**
 * 单笔代扣 返回报文类
 * 
 * @author yincy
 * 
 */
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SingleWithHoldResBO extends BaseOpenResBO<SingleWithHoldResDataBO> {

	private static final long serialVersionUID = 1L;

	private SingleWithHoldResDataBO resData;

	public SingleWithHoldResDataBO getResData() {
		return resData;
	}

	public void setResData(SingleWithHoldResDataBO resData) {
		this.resData = resData;
	}

}
