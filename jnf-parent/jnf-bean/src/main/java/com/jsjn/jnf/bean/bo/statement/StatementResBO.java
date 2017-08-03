package com.jsjn.jnf.bean.bo.statement;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

/**
 * 商户对账 返回报文类
 * 
 * @author yincy
 *
 */
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class StatementResBO extends BaseOpenResBO<StatementResDataBO> {

	private static final long serialVersionUID = 1L;

	private StatementResDataBO resData;

	public StatementResDataBO getResData() {
		return resData;
	}

	public void setResData(StatementResDataBO resData) {
		this.resData = resData;
	}
}
