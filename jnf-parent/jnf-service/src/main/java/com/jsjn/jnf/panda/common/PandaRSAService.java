package com.jsjn.jnf.panda.common;

import com.jsjn.jnf.common.security.SignatureServiceHandler;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "pandaRSAService", serviceType = ServiceType.CommonBean)
public class PandaRSAService {
	
	private SignatureServiceHandler signatureServiceHandler=(SignatureServiceHandler)ParseSpring.context.getBean("signatureServiceHandler");
	
	@PandaMethod(mName = "RSASign", dscrpt = "RSA加签", RegID = "RSASign")
	public String RSASign(String signContent,String log) {
		return signatureServiceHandler.sign(signContent);
	}


}
