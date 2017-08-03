package com.jsjn.jnf.panda.admin.fee;

import java.util.List;

import com.jsjn.jnf.bean.bo.fee.XmlFlowDataBO;
import com.jsjn.jnf.service.fee.XmlFlowService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 
 * @author Administrator
 *
 */
@PandaService(serviceName = "pandaXmlFlowService", serviceType = ServiceType.CommonBean)
public class PandaXmlFlowService {
	
	private XmlFlowService xfs = (XmlFlowService) ParseSpring.context.getBean("xmlFlowServiceImpl");
	
	@PandaMethod(mName = "qryXmlFlow", dscrpt = "查询报文流水及费用信息", RegID = "qryXmlFlow")
	public List<XmlFlowDataBO> qryXmlFlow(XmlFlowDataBO dto) throws Exception {
		
		return xfs.qryXmlFlow(dto);
	}
	
}
