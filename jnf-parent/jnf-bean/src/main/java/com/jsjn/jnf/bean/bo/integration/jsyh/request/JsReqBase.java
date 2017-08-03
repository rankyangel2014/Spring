package com.jsjn.jnf.bean.bo.integration.jsyh.request;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

/**
 * 江苏银行CT机  请求报文基类
 * @author yincy
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class JsReqBase<T> {
	private JsReqBaseHead head;
	
	public JsReqBase(){
		this.head = new JsReqBaseHead();
	}

	public void setHead(JsReqBaseHead head) {
		this.head = head;
	}

	public JsReqBaseHead getHead() {
		return head;
	}
	
	public abstract T getBody();
		
    public abstract void setBody(T body); 
}
