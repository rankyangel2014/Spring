package com.jsjn.jnf.bean.bo.integration.jsyh.request;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 江苏银行CT机     查询流水状态  请求报文
 * @author yincy
 *
 */
@XmlRootElement(name="ap")
@XmlAccessorType(XmlAccessType.FIELD)
public class JsReqFlowStateQuery extends JsReqBase<JsReqFlowStateQueryBody>{
	private JsReqFlowStateQueryBody body;
	
	public JsReqFlowStateQuery(){
		super();
		this.body = new JsReqFlowStateQueryBody();
	}
	
	@Override
	public JsReqFlowStateQueryBody getBody() {
		return body;
	}

	@Override
	public void setBody(JsReqFlowStateQueryBody body) {
		this.body = body;
	}
}
