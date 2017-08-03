package com.jsjn.jnf.panda.common;

import java.util.List;




import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.service.assist.ChannelService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "PandaChannelService", serviceType = ServiceType.CommonBean)
public class PandaChannelService {
	
	private ChannelService channelService=(ChannelService)ParseSpring.context.getBean("channelServiceImpl");
	
	@PandaMethod(mName = "queryChannel", dscrpt = "查询系统所有配置渠道", RegID = "queryChannel")
    public List<ChannelDto> queryChannel() {
        return channelService.queryChannel();
    }
	
	@PandaMethod(mName = "addChannel", dscrpt = "新增配置渠道", RegID = "addChannel")
	public int addChannel(ChannelDto dto) {
	    return channelService.addChannel(dto);
	}
	
	@PandaMethod(mName = "updateChannel", dscrpt = "修改配置渠道", RegID = "updateChannel")
	public int updateChannel(ChannelDto dto) {
		return channelService.updateChannel(dto);
	}
	
	@PandaMethod(mName = "delChannel", dscrpt = "删除配置渠道", RegID = "delChannel")
	public int delChannel(ChannelDto dto) {
		return channelService.delChannel(dto);
	}
	
}
