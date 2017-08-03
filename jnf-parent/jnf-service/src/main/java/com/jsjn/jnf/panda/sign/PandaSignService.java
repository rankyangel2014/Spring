package com.jsjn.jnf.panda.sign;

import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.service.sign.SignService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "pandaSignService", serviceType = ServiceType.CommonBean)
public class PandaSignService {

	private SignService signService = (SignService) ParseSpring.context
			.getBean("signService");

	@PandaMethod(mName = "sign", dscrpt = "签约", RegID = "sign")
	public String  sign(SignTempInfoDto tempDto) throws Exception {
		return signService.sign(tempDto);
	}
}
