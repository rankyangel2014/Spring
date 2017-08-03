package com.jsjn.jnf.panda.admin.config;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.FeeConfigDto;
import com.jsjn.jnf.service.assist.FeeConfigService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 
 * @author Administrator
 * 
 */
@PandaService(serviceName = "configServicePanda", serviceType = ServiceType.CommonBean)
public class PandaConfigService {

	private FeeConfigService fcs = (FeeConfigService) ParseSpring.context
			.getBean("feeConfigServiceImpl");

	@PandaMethod(mName = "qryFeeConfig", dscrpt = "查询计费信息", RegID = "qryFeeConfig")
	public List<FeeConfigDto> qryFeeConfig(FeeConfigDto dto) throws Exception {

		return fcs.qryFeeConfig(dto);
	}

	@PandaMethod(mName = "qryFeeConfigList", dscrpt = "查询计费信息", RegID = "qryFeeConfigList")
	public List<FeeConfigDto> qryFeeConfigList(FeeConfigDto dto)
			throws Exception {

		return fcs.qryFeeConfigList(dto);
	}

	@PandaMethod(mName = "addFeeConfig", dscrpt = "新增计费信息", RegID = "addFeeConfig")
	public int addFeeConfig(FeeConfigDto dto) throws Exception {

		return fcs.addFeeConfig(dto);
	}

	@PandaMethod(mName = "updateFeeConfig", dscrpt = "修改计费信息", RegID = "updateFeeConfig")
	public int updateFeeConfig(FeeConfigDto dto) throws Exception {

		return fcs.updateFeeConfig(dto);
	}

	@PandaMethod(mName = "delFeeConfig", dscrpt = "删除计费信息", RegID = "delFeeConfig")
	public int delFeeConfig(FeeConfigDto dto) throws Exception {
		String id = dto.getId();
		return fcs.delFeeConfig(id);
	}

}
