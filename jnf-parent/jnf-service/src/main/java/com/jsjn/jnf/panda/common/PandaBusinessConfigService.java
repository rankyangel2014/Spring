/**
 * 
 */
package com.jsjn.jnf.panda.common;

import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.service.assist.BusinessConfigService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ
 * 
 */
@PandaService(serviceName = "pandaBusinessConfigService", serviceType = ServiceType.CommonBean)
public class PandaBusinessConfigService {

	private BusinessConfigService businessConfigService = (BusinessConfigService) ParseSpring.context.getBean("businessConfigServiceImpl");

	@PandaMethod(mName = "queryBussinessConfig", dscrpt = "获取商户配置信息", RegID = "queryBussinessConfig")
	public BizConfigDto getSysConfigByTypes(BizConfigDto dto) throws BussinessException {
		return businessConfigService.queryBussinessConfig(dto);
	}

	@PandaMethod(mName = "saveBussinessConfig", dscrpt = "保存商户配置信息", RegID = "saveBussinessConfig")
	public BizConfigDto saveBussinessConfig(BizConfigDto dto) throws Exception {
		return businessConfigService.saveBussinessConfig(dto);
	}

	@PandaMethod(mName = "queryBussinessConfigByMid", dscrpt = "查询当前商户接入配置", RegID = "queryBussinessConfigByMid")
	public BizConfigDto queryBussinessConfigByMid(BizConfigDto dto) throws BussinessException {
		String mid = dto.getMid();
		return businessConfigService.queryBussinessConfigByMid(mid);
	}

}
