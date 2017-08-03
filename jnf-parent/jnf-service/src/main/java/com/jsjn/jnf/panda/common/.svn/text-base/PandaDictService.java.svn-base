package com.jsjn.jnf.panda.common;

import java.util.List;




import com.jsjn.jnf.bean.dto.assist.DictDto;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "pandaDictService", serviceType = ServiceType.CommonBean)
public class PandaDictService {
	
	private DictService dictService=(DictService)ParseSpring.context.getBean("dictServiceImpl");
	
	@PandaMethod(mName = "getSysConfigByTypes", dscrpt = "获取系统参数", RegID = "getSysConfigByTypes")
	public List<DictDto> getSysConfigByTypes(DictDto dto) {
		return dictService.getSysConfigByTypes(dto);
	}

	@PandaMethod(mName = "qryDictInfo", dscrpt = "查询系统所有配置参数", RegID = "qryDictInfo")
    public List<DictDto> qryDictInfo(DictDto dictDto) {
        return dictService.qryDictInfo(dictDto);
    }
	
	@PandaMethod(mName = "addDictInfo", dscrpt = "新增系统配置参数", RegID = "addDictInfo")
	public int addDictInfo(DictDto dto) {
	    return dictService.addDictInfo(dto);
	}
	
	@PandaMethod(mName = "updateDictInfo", dscrpt = "修改系统配置参数", RegID = "updateDictInfo")
	public int updateDictInfo(DictDto dto) {
		return dictService.updateDictInfo(dto);
	}
	
}
