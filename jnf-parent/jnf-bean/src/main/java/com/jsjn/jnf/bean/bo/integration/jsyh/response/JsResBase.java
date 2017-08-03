package com.jsjn.jnf.bean.bo.integration.jsyh.response;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

/**
 * 江苏银行CT机  返回报文基类
 * @author yincy
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class JsResBase<T> {
	private JsResBaseHead head;
	
	public JsResBase(){
		this.head = new JsResBaseHead();
	}

	public void setHead(JsResBaseHead head) {
		this.head = head;
	}

	public JsResBaseHead getHead() {
		return head;
	}
	
	public abstract T getBody();
		
    public abstract void setBody(T body); 
}
