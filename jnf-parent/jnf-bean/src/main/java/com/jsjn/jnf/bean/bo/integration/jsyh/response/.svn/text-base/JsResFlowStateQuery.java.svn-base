package com.jsjn.jnf.bean.bo.integration.jsyh.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 江苏银行CT机    查询流水状态  返回报文
 * @author yincy
 *
 */
@XmlRootElement(name="ap")
@XmlAccessorType(XmlAccessType.FIELD)
public class JsResFlowStateQuery extends JsResBase<JsResFlowStateQueryBody>{
	private JsResFlowStateQueryBody body;
	
	public JsResFlowStateQuery(){
		super();
		this.body = new JsResFlowStateQueryBody();
	}
	
	@Override
	public JsResFlowStateQueryBody getBody() {
		return body;
	}

	@Override
	public void setBody(JsResFlowStateQueryBody body) {
		this.body = body;
	}
}
